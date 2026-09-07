export interface PortfolioProject {
  id: string
  title: string
  category: string
  sector: string
  description: string
  results: string
  /** Version courte du resultat, pour les emplacements etroits (carte de
   *  preuve du hero). Decouper `results` automatiquement amputait la
   *  punchline la plus forte. */
  metric?: string
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
    id: 'clim69',
    title: 'Clim69',
    category: 'SEA + Refonte web',
    sector: 'Climatisation · Villeurbanne',
    description:
      'Compte Google Ads monté de zéro, refonte du site, 19 pages locales, suivi des appels et devis.',
    // Le client ne veut pas que ses montants soient publics. Le resultat est
    // donc exprime en rapport, jamais en euros : ne pas remettre les montants,
    // et ne pas se contenter de « rentable », qui est le minimum attendu.
    results: 'Chaque euro de publicité en rapporte plusieurs, appels et devis suivis chaque jour',
    metric: 'Pub qui rapporte',
    tags: ['Google Ads', 'Refonte web', 'SEO local', 'Villeurbanne'],
    featured: true,
    url: 'https://clim69.fr',
    screenshot: '/images/realisations/clim69.webp',
  },
  {
    id: 'rhone-deconstruction',
    title: 'Rhône Déconstruction',
    category: 'Création web + SEO local',
    sector: 'BTP & Démolition',
    description:
      'Création du site vitrine et stratégie SEO local pour une entreprise de démolition et déconstruction basée à Lyon, visant à capter des chantiers en Auvergne-Rhône-Alpes.',
    // Décision opérateur du 20/08 : aucun chiffre client nommé sur le site.
    // Le résultat se décrit sans pourcentage, jamais en inventant un montant.
    results: 'Site créé, structure SEO locale déployée pour capter les recherches à Lyon.',
    tags: ['SEO local', 'Création web', 'BTP', 'Lyon'],
    featured: true,
    url: 'https://rhone-deconstruction.fr',
    screenshot: '/images/realisations/rhone-deconstruction.webp',
  },
  {
    id: 'aplus-audition',
    title: 'A+ Audition',
    category: 'Création web + SEO local',
    sector: 'Santé & Audioprothèse',
    description:
      "Refonte du site et optimisation SEO local pour un cabinet d'audioprothèse à Cannes, avec mise en avant des aides auditives remboursées et des services de bilan auditif.",
    // Décision opérateur du 20/08 : aucun chiffre client nommé sur le site.
    results: 'Site refondu, structure SEO locale déployée pour les recherches audioprothèse à Cannes.',
    tags: ['SEO local', 'Création web', 'Santé', 'Cannes'],
    featured: true,
    url: 'https://aplusaudition.fr',
    screenshot: '/images/realisations/aplusaudition.webp',
  },
]
