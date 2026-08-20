/**
 * Provenance des leads.
 *
 * Le visiteur arrive rarement sur la page où il remplit le formulaire :
 * il atterrit sur /publicite-en-ligne depuis une annonce, puis clique vers
 * /contact. Lire `location.search` au moment de l'envoi renvoie donc une chaîne
 * vide pour la majorité des leads payants. On mémorise la provenance dès la
 * première page vue et on la relit à la soumission.
 *
 * Règle de conservation : un nouveau clic payant écrase l'ancien (Google Ads
 * attribue au dernier clic), un passage direct ne l'écrase pas. La fenêtre de
 * 90 jours correspond à la durée de validité d'un gclid pour l'import de
 * conversions hors ligne.
 */

const KEY = '123d_lead_source'
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

/** Paramètres qui signalent un clic payant ou une campagne taguée. */
const PAID_PARAMS = /(gclid|gbraid|wbraid|msclkid|fbclid|ttclid|li_fat_id|gad_source|utm_)/i

interface StoredSource {
  value: string
  landing: string
  at: number
}

function read(): StoredSource | null {
  try {
    const raw = window.sessionStorage.getItem(KEY) ?? window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredSource
    if (!parsed?.value || Date.now() - parsed.at > MAX_AGE_MS) return null
    return parsed
  } catch {
    return null
  }
}

function write(entry: StoredSource) {
  try {
    const raw = JSON.stringify(entry)
    window.localStorage.setItem(KEY, raw)
    window.sessionStorage.setItem(KEY, raw)
  } catch {
    // Navigation privée ou stockage refusé : le lead partira sans provenance
    // plutôt que de casser la page.
  }
}

/** À appeler à chaque page vue. Ne fait rien côté serveur. */
export function captureLeadSource() {
  if (typeof window === 'undefined') return

  const search = window.location.search
  const landing = window.location.pathname
  const existing = read()

  if (search.length > 1 && PAID_PARAMS.test(search)) {
    write({ value: search, landing, at: Date.now() })
    return
  }

  if (existing) return

  let value = 'direct'
  const ref = document.referrer
  if (ref) {
    try {
      const host = new URL(ref).hostname
      if (host && host !== window.location.hostname) value = host
    } catch {
      /* referrer illisible : on reste sur "direct" */
    }
  }
  write({ value, landing, at: Date.now() })
}

/** Provenance mémorisée, prête à écrire dans la colonne Source du Sheet. */
export function readLeadSource(): { source: string; landing: string } {
  if (typeof window === 'undefined') return { source: '', landing: '' }
  const stored = read()
  if (!stored) return { source: 'direct', landing: window.location.pathname }
  return { source: stored.value, landing: stored.landing }
}
