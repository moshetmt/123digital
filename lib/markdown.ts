import TurndownService from 'turndown'

// Conversion d'une page rendue en Markdown pour les agents IA : seul le <main> est gardé
// (ni menu, ni pied de page, ni bandeau cookies), liens rendus absolus.

const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' })
turndown.remove(['script', 'style', 'noscript', 'svg', 'iframe', 'form', 'button', 'template'] as (keyof HTMLElementTagNameMap)[])
// Les images passent par une règle ajoutée : la règle « image » intégrée l'emporte sur remove().
turndown.addRule('sansImage', { filter: ['img', 'picture', 'video'], replacement: () => '' })

export function htmlVersMarkdown(html: string, url: string): string {
  const origine = new URL(url).origin
  const titre = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()
  const corps =
    html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html.match(/<body[\s\S]*?<\/body>/i)?.[0] ?? html
  const absolu = corps.replace(/href="\/(?!\/)/g, `href="${origine}/`)
  let md = turndown.turndown(absolu).replace(/\n{3,}/g, '\n\n').trim()
  if (!/^# /m.test(md) && titre) md = `# ${titre}\n\n${md}`
  return `${md}\n\n---\n\nVersion Markdown de ${url}. Index du site pour les agents : ${origine}/llms.txt\n`
}

export function markdown404(chemin: string, origine: string): string {
  return [
    '# Page introuvable (404)',
    '',
    `Aucune page n'existe à l'adresse \`${chemin}\` sur 123digital.fr.`,
    '',
    `- Index du site pour les agents : ${origine}/llms.txt`,
    `- Plan du site : ${origine}/sitemap.xml`,
    `- Accueil : ${origine}/`,
    `- Contact : ${origine}/contact`,
    '',
  ].join('\n')
}
