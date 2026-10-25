// Négociation de contenu pour les agents IA (acceptmarkdown.com) : un client qui préfère
// text/markdown à text/html reçoit la page en Markdown. Sans dépendance, car le proxy
// l'importe à chaque requête concernée.

function qualites(accept: string) {
  const q = new Map<string, { q: number; rang: number }>()
  accept.split(',').forEach((partie, rang) => {
    const [type, ...params] = partie.trim().toLowerCase().split(';').map((s) => s.trim())
    const p = params.find((x) => x.startsWith('q='))
    const valeur = p ? Number(p.slice(2)) : 1
    if (type && !Number.isNaN(valeur) && !q.has(type)) q.set(type, { q: valeur, rang })
  })
  return q
}

/** Vrai si le client demande du Markdown plus volontiers que du HTML (égalité : le premier cité gagne). */
export function prefereMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false
  const q = qualites(accept)
  const md = q.get('text/markdown')
  if (!md || md.q <= 0) return false
  const html = q.get('text/html') ?? q.get('text/*') ?? q.get('*/*')
  if (!html || html.q < md.q) return true
  return html.q === md.q && md.rang < html.rang
}
