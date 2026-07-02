export interface PortfolioProject {
  id: string
  title: string
  category: string
  sector: string
  description: string
  results: string
  tags: string[]
  featured: boolean
  screenshot?: string
  url?: string
}

export const projects: PortfolioProject[] = [
  {
    id: 'boulangerie-artisane',
    title: 'Boulangerie Artisane',
    category: 'SEO local + Création web',
    sector: 'Artisanat & Restauration',
    description:
      "Refonte complète du site web et mise en place d'une stratégie SEO local pour une boulangerie parisienne voulant attirer plus de clients du quartier.",
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
    results: 'ROAS 4,2x — Communauté Instagram x3',
    tags: ['Meta Ads', 'Community Management', 'Instagram', 'E-commerce'],
    featured: false,
  },
  {
    id: 'rhone-deconstruction',
    title: 'Rhône Déconstruction',
    category: 'Création web + SEO local',
    sector: 'BTP & Démolition',
    description:
      'Création du site vitrine et stratégie SEO local pour une entreprise de démolition et déconstruction basée à Lyon, visant à capter des chantiers en Auvergne-Rhône-Alpes.',
    results: '+180% de visibilité locale — 1ère position sur les requêtes clés à Lyon',
    tags: ['SEO local', 'Création web', 'BTP', 'Lyon'],
    featured: true,
    url: 'https://rhone-deconstruction.fr',
  },
  {
    id: 'aplus-audition',
    title: 'A+ Audition',
    category: 'Création web + SEO local',
    sector: 'Santé & Audioprothèse',
    description:
      "Refonte du site et optimisation SEO local pour un cabinet d'audioprothèse à Cannes, avec mise en avant des aides auditives remboursées et des services de bilan auditif.",
    results: '+240% de trafic organique — Top 3 sur les requêtes audioprothèse Cannes',
    tags: ['SEO local', 'Création web', 'Santé', 'Cannes'],
    featured: true,
    url: 'https://aplusaudition.fr',
  },
]
