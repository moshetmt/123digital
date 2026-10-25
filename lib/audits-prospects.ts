// Pages d'audit par prospect (/audit/<domaine>, 25/10/2026). Les données vivent dans
// data/audits-prospects.json, écrit par `node _scripts/audits-prospects.mjs`. Ce fichier ne
// l'importe pas : la page, la route et le test lui passent la liste, pour que node --test
// le charge sans alias ni import JSON.

export interface Constat {
  titre: string
  texte: string
}

export interface AuditProspect {
  domaine: string
  nom: string
  metier: string
  ville: string
  constats: Constat[]
  capture: boolean
  date: string
}

/** L'audit du domaine demandé, ou undefined pour tout ce qui n'est pas un domaine de la liste. */
export function trouverAudit(audits: AuditProspect[], domaine: unknown): AuditProspect | undefined {
  if (typeof domaine !== 'string') return undefined
  return audits.find((a) => a.domaine === domaine.trim().toLowerCase())
}
