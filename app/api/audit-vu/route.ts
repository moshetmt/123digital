import { NextResponse, after } from 'next/server'
import { BASE_URL } from '@/lib/schema'
import { trouverAudit } from '@/lib/audits-prospects'
import audits from '@/data/audits-prospects.json'

// Signal d'ouverture d'une page d'audit (/audit/<domaine>) : un mail court à Moshé par Resend,
// même mécanique que app/api/contact/route.ts. Tout domaine absent du JSON est refusé. Aucune
// autre écriture. L'envoi part après la réponse (after), comme pour le formulaire.

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const audit = trouverAudit(audits, body.domaine)
  if (!audit) return NextResponse.json({ ok: false }, { status: 400 })

  const page = `${BASE_URL}/audit/${audit.domaine}`
  const quand = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

  after(async () => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[audit-vu] RESEND_API_KEY absente : pas de signal pour', audit.domaine)
      return
    }
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || '123digital <contact@123digital.fr>',
        to: ['mochetimsit@gmail.com'],
        subject: `Audit ouvert : ${audit.domaine}`,
        text: [`Domaine : ${audit.domaine}`, `Ouvert le : ${quand} (Paris)`, `Page : ${page}`].join('\n'),
      }),
      signal: AbortSignal.timeout(15000),
    }).catch((err) => {
      console.error(`[audit-vu] Resend injoignable : ${String(err).slice(0, 300)}`)
      return null
    })
    if (res && !res.ok) console.error(`[audit-vu] Resend ${res.status} pour ${audit.domaine}`)
  })

  return NextResponse.json({ ok: true })
}
