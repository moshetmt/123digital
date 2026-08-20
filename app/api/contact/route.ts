import { NextResponse } from 'next/server'

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
  source: string
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot : un humain ne remplit jamais ce champ. On répond "ok" pour ne pas
  // signaler au bot que sa soumission est écartée.
  if (clean(body.hp)) {
    return NextResponse.json({ ok: true })
  }

  const prenom = clean(body.prenom)
  const nom = clean(body.nom)
  const email = clean(body.email)
  const besoin = clean(body.besoin)

  if (!prenom || !nom || !besoin || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const landing = clean(body.landing)
  const page = clean(body.page) || '/'

  const lead: Lead = {
    prenom,
    nom,
    email,
    tel: clean(body.tel),
    site: clean(body.site),
    besoin,
    besoinLabel: BESOIN_LABELS[besoin] || besoin,
    message: clean(body.message),
    // La page d'atterrissage est ajoutée quand elle diffère de la page du
    // formulaire : c'est elle qui a été achetée en publicité.
    page: landing && landing !== page ? `${page} (arrivée : ${landing})` : page,
    source: clean(body.source) || 'direct',
  }

  const [sheet, mail] = await Promise.all([appendToSheet(lead), sendEmail(lead)])

  if (!sheet && !mail) {
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

// ── Google Sheet ──────────────────────────────────────────────────────────────

async function appendToSheet(lead: Lead): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL
  if (!url) {
    console.error('[contact] SHEETS_WEBHOOK_URL absente : lead non enregistré dans le Sheet')
    return false
  }

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
        source: lead.source,
      }),
      signal: AbortSignal.timeout(15000),
    })

    const text = await res.text()
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

  // Destinataire par defaut = l'adresse proprietaire du compte Resend.
  // Tant que le domaine 123digital.fr n'est pas verifie chez Resend, l'expediteur
  // de secours onboarding@resend.dev ne peut livrer QU'A cette adresse : viser
  // une autre boite ferait echouer chaque demande.
  const to = process.env.CONTACT_TO || 'contact@123digital.fr'

  const text = [
    `Prénom : ${lead.prenom}`,
    `Nom : ${lead.nom}`,
    `Email : ${lead.email}`,
    `Téléphone : ${lead.tel || '(non renseigné)'}`,
    `Site web : ${lead.site || '(non renseigné)'}`,
    `Besoin : ${lead.besoinLabel}`,
    `Page : ${lead.page}`,
    `Source : ${lead.source}`,
    '',
    'Message :',
    lead.message || '(vide)',
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // onboarding@resend.dev fonctionne sans vérifier de domaine ;
        // passer à un expéditeur @123digital.fr une fois le domaine vérifié chez Resend.
        from: '123digital.fr <onboarding@resend.dev>',
        to: [to],
        reply_to: lead.email,
        subject: `Demande d'audit — ${lead.prenom} ${lead.nom} (${lead.besoinLabel})`,
        text,
      }),
      signal: AbortSignal.timeout(15000),
    })

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
