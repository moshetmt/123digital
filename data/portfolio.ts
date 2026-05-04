export interface PortfolioProject {
  id: string
  title: string
  category: string
  sector: string
  description: string
  results: string
  tags: string[]
  featured: boolean
}

export const projects: PortfolioProject[] = [
  {
    id: 'boulangerie-artisane',
    title: 'Boulangerie Artisane',
    category: 'SEO local + Création web',
    sector: 'Artisanat & Restauration',
    description:
      'Refonte complète du site web et mise en place d\'une stratégie SEO local pour une boulangerie parisienne voulant attirer plus de clients du quartier.',
    results: '+320% de visibilité locale en 4 mois',
    tags: ['SEO local', 'Création web', 'Google My Business'],
    featured: true,
  },
  {
    id: 'cabinet-comptable',
    title: 'Cabinet Comptable Indépendant',
    category: 'SEO + Google Ads',
    sector: 'Services B2B',
    description:
      'Stratégie digitale complète pour un cabinet comptable cherchant à générer des leads qualifiés : référencement naturel et campagnes Google Ads ciblées.',
    results: '+68% de leads qualifiés en 3 mois',
    tags: ['SEO', 'Google Ads', 'Landing page'],
    featured: true,
  },
  {
    id: 'boutique-mode',
    title: 'Boutique Mode Éco-responsable',
    category: 'Meta Ads + Community Management',
    sector: 'E-commerce & Retail',
    description:
      'Stratégie social media et campagnes Meta Ads pour une boutique de mode indépendante voulant développer ses ventes en ligne.',
    results: 'ROAS 4,2x — Communauté Instagram ×3',
    tags: ['Meta Ads', 'Community Management', 'Instagram'],
    featured: true,
  },
]
