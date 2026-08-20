/**
 * Notification email envoyée à chaque lead.
 *
 * Même gabarit que celui de Clim69 (bandeau, lignes label/valeur, bloc
 * d'action, pied de page technique), aux couleurs de 123digital. Tables et
 * styles en ligne : Gmail et Outlook ignorent les feuilles de style et une
 * bonne partie du CSS moderne.
 */

const BRAND = '#00713D'
const BRAND_DEEP = '#0B3D25'
const BRAND_TINT = '#E8F1EB'
const SURFACE = '#F4F6F2'
const LINE = '#E0E4DE'
const HAIRLINE = '#EEF2EC'
const INK = '#233028'
const INK_SOFT = '#7C857E'
const INK_LABEL = '#5A635C'
const ON_BRAND = '#FAFBFA'

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1_bPq_JAZq9qRPZFQNqzys4oCV2Po3u111y3Yn1Jd46M/edit'

export interface LeadEmail {
  prenom: string
  nom: string
  email: string
  tel: string
  site: string
  besoinLabel: string
  message: string
  page: string
  landing: string
  source: string
}

/** Un message de lead peut contenir du HTML : les spammeurs en envoient. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function recuLe(): string {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
}

function ligne(label: string, valeurHtml: string): string {
  return `<tr><td style="background:${BRAND_TINT};border-left:4px solid ${BRAND};padding:8px 14px;color:${BRAND_DEEP};font-size:13px;font-weight:bold;">${esc(label)}</td></tr>
<tr><td style="background:#ffffff;border-left:4px solid ${BRAND};border-bottom:1px solid ${HAIRLINE};padding:9px 14px 12px 26px;color:${INK};font-size:14px;line-height:20px;">${valeurHtml}</td></tr>`
}

function bouton(href: string, texte: string, plein: boolean): string {
  const fond = plein ? BRAND : '#ffffff'
  const couleur = plein ? ON_BRAND : BRAND
  return `<a href="${esc(href)}" style="display:inline-block;background:${fond};color:${couleur};border:1px solid ${BRAND};text-decoration:none;font-size:14px;font-weight:bold;padding:11px 20px;border-radius:4px;margin:0 8px 8px 0;">${esc(texte)}</a>`
}

function pied(label: string, valeur: string): string {
  return `<div style="color:${INK_SOFT};font-size:12px;line-height:18px;word-break:break-all;"><span style="color:${INK_LABEL};font-weight:bold;">${esc(label)} :</span> ${esc(valeur)}</div>`
}

export function leadEmailSubject(lead: LeadEmail): string {
  return `Lead 123digital — ${lead.besoinLabel} — ${lead.prenom} ${lead.nom}`.trim()
}

export function leadEmailHtml(lead: LeadEmail): string {
  const nomComplet = `${lead.prenom} ${lead.nom}`.trim()
  const telHtml = lead.tel
    ? `<a href="tel:${esc(lead.tel.replace(/\s/g, ''))}" style="color:${BRAND};text-decoration:none;font-weight:bold;">${esc(lead.tel)}</a>`
    : `<span style="color:${INK_SOFT};">non renseigné</span>`
  const siteHtml = lead.site
    ? `<a href="${esc(lead.site)}" style="color:${BRAND};text-decoration:none;font-weight:bold;">${esc(lead.site)}</a>`
    : `<span style="color:${INK_SOFT};">non renseigné</span>`
  const messageHtml = lead.message
    ? esc(lead.message).replace(/\n/g, '<br>')
    : `<span style="color:${INK_SOFT};">vide</span>`

  const sujetReponse = encodeURIComponent(`Votre demande sur 123digital.fr`)
  const boutons = [
    lead.tel ? bouton(`tel:${lead.tel.replace(/\s/g, '')}`, `Appeler ${lead.prenom}`, true) : '',
    bouton(`mailto:${lead.email}?subject=${sujetReponse}`, 'Répondre par email', !lead.tel),
  ].join('')

  return `<div style="margin:0;padding:24px 12px;background:${SURFACE};font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid ${LINE};border-radius:8px;">
<tr><td style="background:${BRAND};padding:22px 24px;text-align:center;border-radius:8px 8px 0 0;">
<div style="color:${ON_BRAND};font-size:19px;font-weight:bold;letter-spacing:1px;">NOUVEAU LEAD</div>
<div style="color:#A9CFBA;font-size:13px;padding-top:5px;">Nouvelle demande depuis 123digital.fr</div>
</td></tr>
<tr><td style="padding:20px 24px 8px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
${ligne('Nom', esc(nomComplet))}
${ligne('Email', `<a href="mailto:${esc(lead.email)}" style="color:${BRAND};text-decoration:none;font-weight:bold;">${esc(lead.email)}</a>`)}
${ligne('Téléphone', telHtml)}
${ligne('Site web', siteHtml)}
${ligne('Besoin', esc(lead.besoinLabel))}
${ligne('Message', messageHtml)}
</table>
</td></tr>
<tr><td style="padding:12px 24px 4px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F1F7F3;border:1px solid #BBD9C6;border-radius:6px;">
<tr><td style="padding:16px 18px;">
<div style="color:${BRAND_DEEP};font-size:14px;font-weight:bold;letter-spacing:.5px;">RAPPELER SOUS 24 H</div>
<div style="color:#4A5A50;font-size:13px;line-height:19px;padding:7px 0 12px;">C'est la promesse affichée sur le site. Passé ce délai, le prospect a déjà appelé quelqu'un d'autre.</div>
${boutons}
</td></tr></table>
</td></tr>
<tr><td style="padding:16px 24px 22px;">
<div style="border-top:1px solid ${LINE};padding-top:12px;">
${pied('Page', lead.page)}
${lead.landing ? pied('Arrivée', lead.landing) : ''}
${pied('Source', lead.source)}
${pied('Reçu le', recuLe())}
<div style="padding-top:10px;"><a href="${SHEET_URL}" style="color:${BRAND};font-size:12px;font-weight:bold;text-decoration:none;">Ouvrir le tableau des leads</a></div>
</div>
</td></tr>
</table>
</div>`
}

export function leadEmailText(lead: LeadEmail): string {
  return [
    'Nouvelle demande depuis 123digital.fr',
    '-------------------------------------',
    `Nom : ${lead.prenom} ${lead.nom}`.trim(),
    `Email : ${lead.email}`,
    `Téléphone : ${lead.tel || 'non renseigné'}`,
    `Site web : ${lead.site || 'non renseigné'}`,
    `Besoin : ${lead.besoinLabel}`,
    `Message : ${lead.message || 'vide'}`,
    '',
    `Page : ${lead.page}`,
    lead.landing ? `Arrivée : ${lead.landing}` : '',
    `Source : ${lead.source}`,
    `Reçu le : ${recuLe()}`,
    '',
    `Tableau des leads : ${SHEET_URL}`,
  ]
    .filter(Boolean)
    .join('\n')
}
