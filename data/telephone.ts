import { projects } from '@/data/portfolio'

// Captures telephone (390 px) prises le 26/10/2026 sur les sites en ligne, pour
// l'iPhone des realisations de /portfolio.
export const ECRANS: Record<string, string> = {
  'mishpacha-tours': '/images/realisations/mishpacha-tours-telephone.webp',
  clim69: '/images/realisations/clim69-telephone.webp',
  'aplus-audition': '/images/realisations/aplusaudition-telephone.webp',
}

export const sitesEnTelephone = projects.filter((p) => p.url && ECRANS[p.id])
