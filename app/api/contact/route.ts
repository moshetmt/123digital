import { NextResponse, after } from 'next/server'
import { leadEmailHtml, leadEmailSubject, leadEmailText } from '@/lib/lead-email'

/**
 * Réception du formulaire d'audit (composant CTA, présent sur toutes les pages
 * commerciales). Chaque demande part vers deux destinations indépendantes :
 *
 *  1. Google Sheet « 123digital - LEADS » via un webhook Apps Script
 *     (_scripts/leads-webhook.gs) — même système que Clim69.
 *  2. Email via Resend.
 *
 * Les deux écritures sont isolées : si l'une échoue, l'autre part quand même et
 * la réponse reste 200. Un lead perdu coûte plus cher qu'un canal muet.
 *
 * Elles partent APRÈS la réponse, via after(). Mesuré le 20/08 sur un envoi
 * réel en production : 8,3 s de bouton qui tourne, dont 7,5 s passées à
 * attendre Google et Resend. Le visiteur n'a aucune raison de patienter pendant
 * que deux services tiers se répondent : la validation seule décide de la
 * réponse, et Vercel maintient la fonction en vie pour terminer les écritures.
 * Corollaire assumé : un échec des deux canaux n'est plus visible du visiteur,
 * il n'apparaît que dans les journaux, en LEAD PERDU.
 */

const MAX_LEN = 2000

const BESOIN_LABELS: Record<string, string> = {
  visibilite: 'Être mieux placé sur Google',
  site: 'Un site web (création ou refonte)',
  ads: 'De la publicité en ligne',
  autre: 'Autre / je ne sais pas encore',
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_LEN) : ''
}

interface Lead {
  prenom: string
  nom: string
  email: string
  tel: string
  site: string
  besoin: string
  besoinLabel: string
  message: string
  page: string
  landing: string
  source: string
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot : un humain ne remplit jamais ce champ. On journalise quand même
  // la tentative dans le Sheet (besoin = "REJETÉ anti-spam", aucun email
  // envoyé) pour distinguer un bot d'un vrai lead perdu, puis on répond "ok"
  // pour ne pas signaler au bot que sa soumission est écartée. Si l'écriture
  // échoue, rien de plus : appendToSheet avale déjà ses propres erreurs.
  if (clean(body.hp)) {
    const spamLead: Lead = {
      prenom: clean(body.prenom),
      nom: clean(body.nom),
      email: clean(body.email),
      tel: clean(body.tel),
      site: clean(body.site),
      besoin: clean(body.besoin) || 'spam',
      besoinLabel: 'REJETÉ anti-spam',
      message: clean(body.message),
      page: clean(body.page) || '/',
      landing: clean(body.landing),
      source: clean(body.source) || 'direct',
    }
    after(async () => {
      await appendToSheet(spamLead)
    })
    return NextResponse.json({ ok: true })
  }

  const prenom = clean(body.prenom)
  const email = clean(body.email)
  const tel = clean(body.tel)
  const besoin = clean(body.besoin)

  // Formulaire a 3 lignes : email et telephone sont chacun facultatifs, mais
  // au moins un des deux doit etre exploitable (email valide, ou au moins
  // 6 chiffres de telephone).
  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const telValide = tel.replace(/\D/g, '').length >= 6

  if (!prenom || !besoin || !(emailValide || telValide)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const landing = clean(body.landing)
  const page = clean(body.page) || '/'

  const lead: Lead = {
    prenom,
    nom: '',
    email,
    tel,
    site: '',
    besoin,
    besoinLabel: BESOIN_LABELS[besoin] || besoin,
    message: '',
    // Page du formulaire et page d'arrivée restent deux colonnes distinctes :
    // les fusionner casserait le regroupement « pages qui convertissent ».
    page,
    landing: landing && landing !== page ? landing : '',
    source: clean(body.source) || 'direct',
  }

  after(async () => {
    const debut = Date.now()
    const [sheet, mail] = await Promise.all([appendToSheet(lead), sendEmail(lead)])
    console.log(
      `[contact] ecritures terminees en ${Date.now() - debut} ms — sheet ${sheet ? 'ok' : 'ECHEC'}, mail ${mail ? 'ok' : 'ECHEC'}`,
    )
    if (!sheet && !mail) {
      console.error(`[contact] LEAD PERDU, les deux canaux ont echoue : ${JSON.stringify(lead)}`)
    }
  })

  return NextResponse.json({ ok: true })
}

// ── Google Sheet ──────────────────────────────────────────────────────────────

async function appendToSheet(lead: Lead): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL
  if (!url) {
    console.error('[contact] SHEETS_WEBHOOK_URL absente : lead non enregistré dans le Sheet')
    return false
  }

  const debut = Date.now()
  try {
    // Apps Script répond 302 vers googleusercontent : fetch suit la redirection
    // par défaut, mais un timeout évite qu'un webhook lent bloque la réponse.
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret: process.env.SHEETS_WEBHOOK_SECRET || '',
        prenom: lead.prenom,
        nom: lead.nom,
        email: lead.email,
        tel: lead.tel,
        site: lead.site,
        besoin: lead.besoinLabel,
        message: lead.message,
        page: lead.page,
        landing: lead.landing,
        source: lead.source,
      }),
      signal: AbortSignal.timeout(15000),
    })

    const text = await res.text()
    console.log(`[contact] Sheet ${res.status} en ${Date.now() - debut} ms`)
    if (!res.ok || !text.includes('"ok":true')) {
      console.error(`[contact] Sheet ${res.status} : ${text.slice(0, 300)}`)
      return false
    }
    return true
  } catch (err) {
    console.error(`[contact] Sheet injoignable : ${String(err).slice(0, 300)}`)
    return false
  }
}

// ── Email ─────────────────────────────────────────────────────────────────────

async function sendEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY absente : pas de notification email')
    return false
  }

  const to = process.env.CONTACT_TO || 'contact@123digital.fr'
  const debut = Date.now()

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Domaine 123digital.fr vérifié chez Resend : l'expéditeur porte la
        // marque et la livraison n'est plus limitée à l'adresse du compte,
        // contrairement à l'adresse de test onboarding@resend.dev.
        from: process.env.CONTACT_FROM || '123digital <contact@123digital.fr>',
        to: [to],
        // reply_to seulement si un email a ete fourni : le lead peut n'avoir
        // laisse que son telephone, Resend refuse une chaine vide.
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject: leadEmailSubject(lead),
        html: leadEmailHtml(lead),
        // Version texte pour les clients qui refusent le HTML, et pour éviter
        // qu'un message sans alternative parte en indésirable.
        text: leadEmailText(lead),
      }),
      signal: AbortSignal.timeout(15000),
    })

    console.log(`[contact] Resend ${res.status} en ${Date.now() - debut} ms`)
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[contact] Resend ${res.status} : ${detail.slice(0, 300)}`)
      return false
    }
    return true
  } catch (err) {
    console.error(`[contact] Resend injoignable : ${String(err).slice(0, 300)}`)
    return false
  }
}
