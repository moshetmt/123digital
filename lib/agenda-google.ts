/**
 * Prise de rendez-vous branchée sur le Google Agenda de Maurice (calendrier
 * `primary`, fuseau Europe/Paris). Jeton OAuth perso dans CALENDAR_TOKEN_JSON
 * (format google-auth : client_id, client_secret, refresh_token), scope
 * calendar.events seulement : pas de freebusy, on lit les événements et on en
 * déduit les créneaux occupés.
 *
 * Règles (décision de l'opérateur, 25/10) : lundi à jeudi, 17 h 00 et 17 h 30,
 * 15 min, sur les 10 prochains jours proposables, au moins 4 h après la demande.
 */

const FUSEAU = 'Europe/Paris'
const API = 'https://www.googleapis.com/calendar/v3'
const HEURES: Array<[number, number]> = [[17, 0], [17, 30]]
const JOURS_PROPOSES = 10
const DELAI_MS = 4 * 60 * 60 * 1000
export const DUREE_MS = 15 * 60 * 1000

export interface Occupe {
  debut: Date
  fin: Date
}

// ── Dates en heure de Paris ──────────────────────────────────────────────────

const PARTIES = new Intl.DateTimeFormat('en-GB', {
  timeZone: FUSEAU,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
})

function partiesParis(t: Date) {
  const p: Record<string, string> = {}
  for (const x of PARTIES.formatToParts(t)) p[x.type] = x.value
  return { a: +p.year, m: +p.month, j: +p.day, h: +p.hour, mi: +p.minute, s: +p.second }
}

/** Instant UTC correspondant à une heure murale de Paris (été comme hiver). */
function instantParis(a: number, m: number, j: number, h: number, mi: number): Date {
  const devine = Date.UTC(a, m - 1, j, h, mi)
  const p = partiesParis(new Date(devine))
  const decalage = Date.UTC(p.a, p.m - 1, p.j, p.h, p.mi, p.s) - devine
  return new Date(devine - decalage)
}

function chevauche(debut: Date, fin: Date, occupes: Occupe[]): boolean {
  return occupes.some((o) => debut < o.fin && fin > o.debut)
}

/** Créneaux libres, du plus proche au plus lointain. Pure : ni horloge ni réseau. */
export function creneauxLibres(maintenant: Date, occupes: Occupe[]): Date[] {
  const plancher = maintenant.getTime() + DELAI_MS
  const res: Date[] = []
  const d = partiesParis(maintenant)
  let jour = Date.UTC(d.a, d.m - 1, d.j)
  let proposes = 0
  while (proposes < JOURS_PROPOSES) {
    const date = new Date(jour)
    const semaine = date.getUTCDay()
    if (semaine >= 1 && semaine <= 4) {
      proposes++
      for (const [h, mi] of HEURES) {
        const debut = instantParis(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), h, mi)
        const fin = new Date(debut.getTime() + DUREE_MS)
        if (debut.getTime() >= plancher && !chevauche(debut, fin, occupes)) res.push(debut)
      }
    }
    jour += 86400000
  }
  return res
}

// ── Libellés français ────────────────────────────────────────────────────────

const JOUR = new Intl.DateTimeFormat('fr-FR', { timeZone: FUSEAU, weekday: 'long', day: 'numeric', month: 'long' })
const HEURE = new Intl.DateTimeFormat('fr-FR', { timeZone: FUSEAU, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

/** « mardi 28 octobre » */
export function libelleJour(d: Date): string {
  return JOUR.format(d)
}

/** « 17 h 00 » */
export function libelleHeure(d: Date): string {
  return HEURE.format(d).replace(':', ' h ')
}

/** « mardi 28 octobre, 17 h 00 » */
export function libelleCreneau(d: Date): string {
  return `${libelleJour(d)}, ${libelleHeure(d)}`
}

// ── Téléphone ────────────────────────────────────────────────────────────────

/** Numéro français (06 52 09 23 01, +33 6…, 0033…), rendu « 06 52 09 23 01 », sinon null. */
export function normaliserTelephone(brut: string): string | null {
  let c = brut.replace(/[\s.\-()]/g, '')
  if (c.startsWith('+33')) c = '0' + c.slice(3)
  else if (c.startsWith('0033')) c = '0' + c.slice(4)
  if (!/^0[1-9]\d{8}$/.test(c)) return null
  return c.replace(/(\d{2})(?=\d)/g, '$1 ')
}

// ── Google Agenda ────────────────────────────────────────────────────────────

interface JetonStocke {
  client_id: string
  client_secret: string
  refresh_token: string
}

/** Jeton d'accès frais à partir du refresh_token ; null si la variable manque. */
export async function jetonAcces(): Promise<string | null> {
  const brut = process.env.CALENDAR_TOKEN_JSON
  if (!brut) return null
  const j = JSON.parse(brut) as JetonStocke
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: j.client_id,
      client_secret: j.client_secret,
      refresh_token: j.refresh_token,
      grant_type: 'refresh_token',
    }),
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`jeton Google ${res.status}`)
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

export interface EvenementGoogle {
  status?: string
  transparency?: string
  start?: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
}

/** Événements qui bloquent un créneau : ni annulés, ni « disponible », ni journée entière. */
export function extraireOccupes(items: EvenementGoogle[]): Occupe[] {
  const res: Occupe[] = []
  for (const e of items) {
    if (e.status === 'cancelled' || e.transparency === 'transparent') continue
    if (!e.start?.dateTime || !e.end?.dateTime) continue
    res.push({ debut: new Date(e.start.dateTime), fin: new Date(e.end.dateTime) })
  }
  return res
}

export async function listerOccupes(du: Date, au: Date, jeton: string): Promise<Occupe[]> {
  const q = new URLSearchParams({
    timeMin: du.toISOString(),
    timeMax: au.toISOString(),
    singleEvents: 'true',
    maxResults: '250',
    fields: 'items(status,transparency,start,end)',
  })
  const res = await fetch(`${API}/calendars/primary/events?${q}`, {
    headers: { Authorization: `Bearer ${jeton}` },
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`agenda events.list ${res.status}`)
  const data = (await res.json()) as { items?: EvenementGoogle[] }
  return extraireOccupes(data.items ?? [])
}

export interface RendezVous {
  debut: Date
  prenom: string
  tel: string
  email: string
  page: string
}

/** events.insert sur primary. Pas d'attendees : un jeton perso n'envoie pas d'invitations. */
export async function creerRendezVous(rdv: RendezVous, jeton: string): Promise<void> {
  const fin = new Date(rdv.debut.getTime() + DUREE_MS)
  const demande = new Intl.DateTimeFormat('fr-FR', {
    timeZone: FUSEAU, day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date())
  const description = [
    `Email : ${rdv.email || 'non renseigné'}`,
    `Page : ${rdv.page}`,
    `Demande du ${demande}`,
    'Réservé en ligne sur 123digital.fr',
  ].join('\n')
  const res = await fetch(`${API}/calendars/primary/events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${jeton}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      summary: `Appel découverte : ${rdv.prenom}, ${rdv.tel}`,
      description,
      start: { dateTime: rdv.debut.toISOString(), timeZone: FUSEAU },
      end: { dateTime: fin.toISOString(), timeZone: FUSEAU },
      reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 10 }] },
    }),
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`agenda events.insert ${res.status}`)
}
