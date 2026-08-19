import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/schema'
import { allVilles, villesARA } from '@/data/villes'
import { estIndexable } from '@/data/indexation'
import { PAGES_EN_INDEXABLES } from '@/data/hreflang'
import { services } from '@/data/services'
import { secteurs } from '@/data/secteurs'
import { articles } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/audit-gratuit`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.65 },
    { url: `${BASE_URL}/realisations`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/consultant-digital-lyon`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    // Services hub + pages
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...services.map((s) => ({
      url: `${BASE_URL}/services/${s.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    // Blog hub + articles
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...articles.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: a.dateModification ? new Date(a.dateModification) : new Date(a.datePublication),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    // Secteurs hub + pages
    { url: `${BASE_URL}/secteurs`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...secteurs.map((s) => ({
      url: `${BASE_URL}/secteurs/${s.slug}`,
      lastModified: now,
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
      lastModified: now,
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
        lastModified: now,
        changeFrequency: 'monthly',
        priority: basePriority,
      })
    }
  }

  // Version anglaise, ouverte le 19/08. Liste derivee de `data/hreflang.ts`,
  // donc impossible d'y declarer une page qu'on met par ailleurs en `noindex`.
  const enRoutes: MetadataRoute.Sitemap = PAGES_EN_INDEXABLES.map((chemin) => ({
    url: `${BASE_URL}${chemin}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: chemin === '/en' ? 0.8 : 0.6,
  }))

  return [...staticRoutes, ...villeRoutes, ...villeServiceRoutes, ...enRoutes]
}
