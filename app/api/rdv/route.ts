import { NextResponse, after } from 'next/server'
import {
  creerRendezVous, creneauxLibres, jetonAcces, libelleCreneau, libelleHeure, libelleJour,
  listerOccupes, normaliserTelephone,
} from '@/lib/agenda-google'
import {
  rdvBesoin, rdvHtmlOperateur, rdvHtmlVisiteur, rdvSujetOperateur, rdvSujetVisiteur,
  rdvTexteOperateur, rdvTexteVisiteur, type RdvEmail,
} from '@/lib/rdv-email'

/**
 * Prise de rendez-vous (composant ReserverCreneau). GET : créneaux libres lus
 * dans l'agenda de Maurice. POST : revérifie que le créneau est encore libre,
 * l'écrit dans l'agenda, puis (après la réponse, comme /api/contact) l'enregistre
 * dans le Sheet des leads et envoie les mails.
 *
 * Sans CALENDAR_TOKEN_JSON le GET renvoie une liste vide et le composant retombe
 * sur le lien /audit-gratuit. RDV_DEMO=1 renvoie 3 créneaux fictifs (captures),
 * jamais en production.
 */

export const dynamic = 'force-dynamic'
// Agenda (jeton, lecture, écriture) puis Sheet et mails après la réponse : la limite
// de 10 s par défaut coupait le travail d'after() avant la ligne du Sheet (test du 25/10).
export const maxDuration = 30

const FENETRE_MS = 21 * 24 * 60 * 60 * 1000
const OPERATEUR = 'mochetimsit@gmail.com'

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, 300) : ''
}

function reponseCreneaux(dates: Date[]) {
  return NextResponse.json({ creneaux: dates.map((d) => ({ iso: d.toISOString(), libelle: libelleCreneau(d) })) })
}

export async function GET() {
  const maintenant = new Date()
  if (process.env.RDV_DEMO === '1') return reponseCreneaux(creneauxLibres(maintenant, []).slice(0, 3))
  try {
    const jeton = await jetonAcces()
    if (!jeton) return NextResponse.json({ creneaux: [] })
    const occupes = await listerOccupes(maintenant, new Date(maintenant.getTime() + FENETRE_MS), jeton)
    return reponseCreneaux(creneauxLibres(maintenant, occupes))
  } catch (err) {
    console.error(`[rdv] agenda illisible : ${String(err).slice(0, 300)}`)
    return NextResponse.json({ creneaux: [] })
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const prenom = clean(body.prenom)
  const tel = normaliserTelephone(clean(body.tel))
  const email = clean(body.email)
  const debut = new Date(clean(body.debut))
  if (!prenom) return NextResponse.json({ ok: false, champ: 'prenom' }, { status: 400 })
  if (!tel) return NextResponse.json({ ok: false, champ: 'tel' }, { status: 400 })
  if (Number.isNaN(debut.getTime())) return NextResponse.json({ ok: false, champ: 'debut' }, { status: 400 })

  const jeton = await jetonAcces()
  if (!jeton) return NextResponse.json({ ok: false }, { status: 503 })

  // Le créneau doit encore figurer parmi les libres : règles métier et agenda revérifiés ensemble.
  const maintenant = new Date()
  const occupes = await listerOccupes(maintenant, new Date(maintenant.getTime() + FENETRE_MS), jeton)
  const libre = creneauxLibres(maintenant, occupes).some((d) => d.getTime() === debut.getTime())
  if (!libre) return NextResponse.json({ ok: false, raison: 'creneau_pris' }, { status: 409 })

  const page = clean(body.page) || '/'
  await creerRendezVous({ debut, prenom, tel, email, page }, jeton)

  const landing = clean(body.landing)
  const rdv: RdvEmail = {
    prenom, tel, email, debut, page,
    landing: landing && landing !== page ? landing : '',
    source: clean(body.source) || 'direct',
  }

  after(async () => {
    const [sheet, mail, confirmation] = await Promise.all([
      appendToSheet(rdv),
      envoyerMail(OPERATEUR, rdvSujetOperateur(rdv), rdvHtmlOperateur(rdv), rdvTexteOperateur(rdv), email || undefined),
      email ? envoyerMail(email, rdvSujetVisiteur(rdv), rdvHtmlVisiteur(rdv), rdvTexteVisiteur(rdv)) : Promise.resolve(true),
    ])
    console.log(`[rdv] sheet ${sheet ? 'ok' : 'ECHEC'}, mail ${mail ? 'ok' : 'ECHEC'}, confirmation ${confirmation ? 'ok' : 'ECHEC'}`)
  })

  return NextResponse.json({ ok: true, jour: libelleJour(debut), heure: libelleHeure(debut), tel })
}

// ── Google Sheet (même webhook que /api/contact) ──────────────────────────────

async function appendToSheet(rdv: RdvEmail): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL
  if (!url) {
    console.error('[rdv] SHEETS_WEBHOOK_URL absente : rendez-vous non enregistré dans le Sheet')
    return false
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret: process.env.SHEETS_WEBHOOK_SECRET || '',
        prenom: rdv.prenom,
        nom: '',
        email: rdv.email,
        tel: rdv.tel,
        site: '',
        besoin: rdvBesoin(rdv.debut),
        message: '',
        page: rdv.page,
        landing: rdv.landing,
        source: rdv.source,
      }),
      signal: AbortSignal.timeout(15000),
    })
    const text = await res.text()
    if (!res.ok || !text.includes('"ok":true')) {
      console.error(`[rdv] Sheet ${res.status} : ${text.slice(0, 300)}`)
      return false
    }
    return true
  } catch (err) {
    console.error(`[rdv] Sheet injoignable : ${String(err).slice(0, 300)}`)
    return false
  }
}

// ── Email (Resend, même mécanique que /api/contact) ───────────────────────────

async function envoyerMail(to: string, subject: string, html: string, text: string, replyTo?: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[rdv] RESEND_API_KEY absente : pas de mail')
    return false
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || '123digital <contact@123digital.fr>',
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[rdv] Resend ${res.status} : ${detail.slice(0, 300)}`)
      return false
    }
    return true
  } catch (err) {
    console.error(`[rdv] Resend injoignable : ${String(err).slice(0, 300)}`)
    return false
  }
}
