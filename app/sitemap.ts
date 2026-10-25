import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/schema'
import { allVilles, villesARA } from '@/data/villes'
import { estIndexable } from '@/data/indexation'
import { PAGES_EN_INDEXABLES } from '@/data/hreflang'
import { services } from '@/data/services'
import { secteurs } from '@/data/secteurs'
import { articles } from '@/data/blog'
import { etudesDeCas } from '@/data/etudes-de-cas'
import { problemes } from '@/data/problemes'
import dates from '@/data/dates-pages.json'

export default function sitemap(): MetadataRoute.Sitemap {
  // Dates réelles (dernier commit des fichiers de la page), régénérées par `node _scripts/dates-pages.mjs`.
  // `new Date()` partout faisait changer 67 lastmod à chaque build : Google ignore un lastmod qui bouge sans cesse.
  const d = (cle: string) => new Date((dates as Record<string, string>)[cle])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: d('/'), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/a-propos`, lastModified: d('/a-propos'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/audit-gratuit`, lastModified: d('/audit-gratuit'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE_URL}/contact`, lastModified: d('/contact'), changeFrequency: 'yearly', priority: 0.65 },
    { url: `${BASE_URL}/realisations`, lastModified: d('/realisations'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/consultant-digital-lyon`, lastModified: d('/consultant-digital-lyon'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE_URL}/consultant-seo-bourg-en-bresse`, lastModified: d('/consultant-seo-bourg-en-bresse'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/consultant-seo-lyon`, lastModified: d('/consultant-seo-lyon'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE_URL}/referencement-ia`, lastModified: d('/referencement-ia'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/consultant-ia-lyon`, lastModified: d('/consultant-ia-lyon'), changeFrequency: 'monthly', priority: 0.9 },
    ...etudesDeCas.map((e) => ({
      url: `${BASE_URL}/realisations/${e.slug}`,
      lastModified: d('realisation'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Services hub + pages
    { url: `${BASE_URL}/services`, lastModified: d('/services'), changeFrequency: 'weekly', priority: 0.9 },
    ...services.map((s) => ({
      url: `${BASE_URL}/services/${s.id}`,
      lastModified: d(`/services/${s.id}`),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    // Blog hub + articles
    { url: `${BASE_URL}/blog`, lastModified: d('/blog'), changeFrequency: 'weekly', priority: 0.7 },
    ...articles.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: a.dateModification ? new Date(a.dateModification) : new Date(a.datePublication),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    // Problèmes hub + pages (intention chaude, chantier du 20/08)
    { url: `${BASE_URL}/problemes`, lastModified: d('/problemes'), changeFrequency: 'weekly', priority: 0.9 },
    ...problemes.map((p) => ({
      url: `${BASE_URL}/problemes/${p.slug}`,
      lastModified: new Date(p.dateModification ?? p.datePublication),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    // Secteurs hub + pages
    { url: `${BASE_URL}/secteurs`, lastModified: d('/secteurs'), changeFrequency: 'monthly', priority: 0.8 },
    ...secteurs.map((s) => ({
      url: `${BASE_URL}/secteurs/${s.slug}`,
      lastModified: d('secteur'),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ]

  // Pages villes — priorité selon importance.
  // 🔑 Filtrées par `estIndexable` : une page en `noindex` qui figure quand même
  // au sitemap est un signal contradictoire, on déclare à Google une page qu'on
  // lui demande d'ignorer. Les deux suivent la même liste, `data/indexation.ts`.
  const villeRoutes: MetadataRoute.Sitemap = allVilles
    .filter((ville) => estIndexable(`/${ville.slug}`))
    .map((ville) => ({
      url: `${BASE_URL}/${ville.slug}`,
      lastModified: d('ville'),
      changeFrequency: 'monthly' as const,
      priority: ville.priority === 'high' ? 0.9 : ville.priority === 'medium' ? 0.8 : 0.7,
    }))

  // Pages ville + service — priorité selon ville
  const villeServiceRoutes: MetadataRoute.Sitemap = []
  for (const ville of allVilles) {
    const isARA = villesARA.some((v) => v.slug === ville.slug)
    const basePriority = isARA
      ? ville.priority === 'high' ? 0.85 : 0.75
      : 0.65
    for (const service of services) {
      if (!estIndexable(`/${ville.slug}/${service.id}`)) continue
      villeServiceRoutes.push({
        url: `${BASE_URL}/${ville.slug}/${service.id}`,
        lastModified: d('villeService'),
        changeFrequency: 'monthly',
        priority: basePriority,
      })
    }
  }

  // Version anglaise, ouverte le 19/08. Liste derivee de `data/hreflang.ts`,
  // donc impossible d'y declarer une page qu'on met par ailleurs en `noindex`.
  const enRoutes: MetadataRoute.Sitemap = PAGES_EN_INDEXABLES.map((chemin) => ({
    url: `${BASE_URL}${chemin}`,
    lastModified: d('en'),
    changeFrequency: 'monthly' as const,
    priority: chemin === '/en' ? 0.8 : 0.6,
  }))

  return [...staticRoutes, ...villeRoutes, ...villeServiceRoutes, ...enRoutes]
}
