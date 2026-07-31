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

// Seuls les cas vérifiables (site en ligne) sont présentés.
// Décision opérateur du 31/07 : les 3 cas illustratifs ont été retirés
// (audit concurrence 2026-07-29, implication n°1). Ne pas en réinventer.
export const projects: PortfolioProject[] = [
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
