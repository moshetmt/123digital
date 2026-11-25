// Dates réelles de dernière modification des pages, pour le <lastmod> du sitemap (25/10/2026).
// Une page prend la date du dernier commit qui touche ses fichiers (page + données).
// À relancer après un changement de contenu :  node _scripts/dates-pages.mjs
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const date = (...chemins) =>
  execFileSync('git', ['log', '-1', '--format=%cs', '--', ...chemins], { encoding: 'utf8' }).trim()

const f = (r) => `app/(fr)/${r}`
const dates = {
  '/': date(f('page.tsx'), 'components/sections'),
  '/a-propos': date(f('a-propos')),
  '/audit-gratuit': date(f('audit-gratuit')),
  '/contact': date(f('contact')),
  '/realisations': date(f('realisations/page.tsx'), 'data/etudes-de-cas.ts'),
  '/consultant-digital-lyon': date(f('consultant-digital-lyon')),
  '/consultant-seo-bourg-en-bresse': date(f('consultant-seo-bourg-en-bresse')),
  '/consultant-seo-lyon': date(f('consultant-seo-lyon')),
  '/referencement-ia': date(f('referencement-ia')),
  '/consultant-ia-lyon': date(f('consultant-ia-lyon')),
  '/services': date(f('services/page.tsx'), 'data/services.ts'),
  '/blog': date(f('blog/page.tsx'), 'data/blog.ts'),
  '/problemes': date(f('problemes/page.tsx'), 'data/problemes.ts', 'data/problemes'),
  '/secteurs': date(f('secteurs/page.tsx'), 'data/secteurs.ts'),
  realisation: date(f('realisations/[slug]'), 'data/etudes-de-cas.ts'),
  secteur: date(f('secteurs/[secteur]'), 'data/secteurs.ts'),
  ville: date(f('[ville]/page.tsx'), 'data/villes.ts'),
  villeService: date(f('[ville]/[service]'), 'data/villes.ts', 'data/services.ts'),
  en: date('app/en'),
}
for (const id of ['automatisation-marketing', 'branding', 'community-management', 'creation-site-web', 'publicite-en-ligne', 'seo'])
  dates[`/services/${id}`] = date(f(`services/${id}`), 'data/services.ts')

writeFileSync('data/dates-pages.json', JSON.stringify(dates, null, 2) + '\n')
console.log(dates)
