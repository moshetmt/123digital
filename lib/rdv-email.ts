/**
 * Mails d'un rendez-vous réservé en ligne : la notification à Maurice reprend
 * le gabarit des leads (lib/lead-email.ts), la confirmation au visiteur est un
 * texte court signé Maurice Timsit.
 */
import { leadEmailHtml, leadEmailText, type LeadEmail } from '@/lib/lead-email'
import { libelleHeure, libelleJour } from '@/lib/agenda-google'

export const TEL_MAURICE = '06 52 09 23 01'

export interface RdvEmail {
  prenom: string
  tel: string
  email: string
  debut: Date
  page: string
  landing: string
  source: string
}

/** Libellé commun au Sheet (colonne besoin) et aux mails : « Rendez-vous mardi 28 octobre 17 h 00 ». */
export function rdvBesoin(debut: Date): string {
  return `Rendez-vous ${libelleJour(debut)} ${libelleHeure(debut)}`
}

function enLead(rdv: RdvEmail): LeadEmail {
  return {
    prenom: rdv.prenom,
    nom: '',
    email: rdv.email,
    tel: rdv.tel,
    site: '',
    besoinLabel: rdvBesoin(rdv.debut),
    message: 'Appel découverte de 15 min réservé en ligne, déjà noté dans votre agenda.',
    page: rdv.page,
    landing: rdv.landing,
    source: rdv.source,
  }
}

export function rdvSujetOperateur(rdv: RdvEmail): string {
  return `Rendez-vous : ${rdv.prenom}, ${libelleJour(rdv.debut)} à ${libelleHeure(rdv.debut)}`
}

export function rdvHtmlOperateur(rdv: RdvEmail): string {
  return leadEmailHtml(enLead(rdv))
}

export function rdvTexteOperateur(rdv: RdvEmail): string {
  return leadEmailText(enLead(rdv))
}

export function rdvSujetVisiteur(rdv: RdvEmail): string {
  return `Votre rendez-vous ${libelleJour(rdv.debut)} à ${libelleHeure(rdv.debut)}`
}

function paragraphesVisiteur(rdv: RdvEmail): string[] {
  return [
    `Bonjour ${rdv.prenom},`,
    `C'est noté : ${libelleJour(rdv.debut)} à ${libelleHeure(rdv.debut)}, je vous appelle au ${rdv.tel}. Quinze minutes pour parler de votre activité et de ce qui peut vous ramener des clients.`,
    `Un imprévu ? Un SMS ou un appel au ${TEL_MAURICE} et on décale.`,
    'À très vite,',
    'Maurice Timsit\n123digital, Lyon',
  ]
}

export function rdvTexteVisiteur(rdv: RdvEmail): string {
  return paragraphesVisiteur(rdv).join('\n\n')
}

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function rdvHtmlVisiteur(rdv: RdvEmail): string {
  const p = paragraphesVisiteur(rdv)
    .map((t) => `<p style="margin:0 0 14px;color:#123F27;font-size:15px;line-height:22px;">${esc(t).replace(/\n/g, '<br>')}</p>`)
    .join('\n')
  return `<div style="padding:24px 12px;background:#F6FAF7;font-family:Arial,Helvetica,sans-serif;"><div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #CDE6D8;border-radius:4px;padding:24px;">${p}</div></div>`
}
