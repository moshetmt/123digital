import { NextResponse } from 'next/server'

/**
 * Réception du formulaire d'audit gratuit (home) et envoi par email via Resend.
 * L'API key vit dans RESEND_API_KEY (.env.local en dev, variables Vercel en prod).
 * Sans clé, la route répond 503 : le formulaire affiche son état d'erreur au lieu
 * de perdre la demande en silence.
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
  const tel = clean(body.tel)
  const site = clean(body.site)
  const besoin = clean(body.besoin)
  const message = clean(body.message)

  if (!prenom || !nom || !besoin || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY absente : demande non envoyée')
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  const to = process.env.CONTACT_TO || 'mochetimsit@gmail.com'
  const besoinLabel = BESOIN_LABELS[besoin] || besoin

  const text = [
    `Prénom : ${prenom}`,
    `Nom : ${nom}`,
    `Email : ${email}`,
    `Téléphone : ${tel || '(non renseigné)'}`,
    `Site web : ${site || '(non renseigné)'}`,
    `Besoin : ${besoinLabel}`,
    '',
    'Message :',
    message || '(vide)',
  ].join('\n')

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
      reply_to: email,
      subject: `Demande d'audit — ${prenom} ${nom} (${besoinLabel})`,
      text,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error(`[contact] Resend ${res.status} : ${detail.slice(0, 300)}`)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
