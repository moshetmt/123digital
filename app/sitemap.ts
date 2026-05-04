import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/schema'
import { allVilles, villesARA } from '@/data/villes'
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
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
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

  // Pages villes — priorité selon importance
  const villeRoutes: MetadataRoute.Sitemap = allVilles.map((ville) => ({
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
      villeServiceRoutes.push({
        url: `${BASE_URL}/${ville.slug}/${service.id}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: basePriority,
      })
    }
  }

  return [...staticRoutes, ...villeRoutes, ...villeServiceRoutes]
}
