import { ACTIONS, DEMO, ENDPOINT_ESPACE, FORMAT_CLE, estDemo } from '@/lib/espace'

/* Relais de l'Espace 123digital (02/11) : le téléphone n'appelle jamais Google directement.
   La clé voyage dans le corps (jamais dans une URL journalisée), l'Apps Script la vérifie. */

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const ENTETES = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' }
const json = (corps: unknown, status = 200) => Response.json(corps, { status, headers: ENTETES })

export async function POST(request: Request) {
  let corps: Record<string, unknown>
  try {
    corps = await request.json()
  } catch {
    return json({ ok: false, error: 'json' }, 400)
  }
  const cle = String(corps.cle ?? '')
  const action = String(corps.action ?? '')
  if (!(ACTIONS as readonly string[]).includes(action)) return json({ ok: false, error: 'action' }, 400)

  if (estDemo(cle)) {
    // Démonstration : rien n'est écrit nulle part.
    return json(action === 'donnees' ? DEMO : { ok: true, demo: true })
  }
  if (!FORMAT_CLE.test(cle)) return json({ ok: false, error: 'cle' }, 403)

  const reste = { ...corps }
  delete reste.cle
  const arret = new AbortController()
  const minuterie = setTimeout(() => arret.abort(), 20_000)
  try {
    const r = await fetch(ENDPOINT_ESPACE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reste, k: cle, action }),
      redirect: 'follow',
      cache: 'no-store',
      signal: arret.signal,
    })
    const texte = await r.text()
    try {
      return json(JSON.parse(texte))
    } catch {
      // Page HTML de Google : script pas encore autorisé (installer() à lancer) ou en panne.
      console.error('espace: réponse non JSON', r.status, texte.slice(0, 120))
      return json({ ok: false, error: 'branchement' }, 502)
    }
  } catch (err) {
    console.error('espace:', err instanceof Error ? err.name : err)
    return json({ ok: false, error: 'reseau' }, 504)
  } finally {
    clearTimeout(minuterie)
  }
}
