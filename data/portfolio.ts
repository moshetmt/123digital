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
    id: 'mishpacha-tours',
    title: 'Mishpacha Tours',
    category: 'Création web + SEO + Logo',
    sector: 'Tourisme · Lyon',
    description:
      'Nom, logo et site en quatre langues pour une guide qui fait visiter le Lyon juif à des familles venues de l’étranger.',
    results: 'Une première demande de séjour venue de Google le lendemain de la mise en ligne, sans publicité',
    metric: 'Demande dès le lendemain',
    tags: ['Création web', 'SEO', 'Logo', 'Lyon'],
    featured: true,
    url: 'https://mishpachatours.com',
    screenshot: '/images/realisations/mishpacha-tours-maquette.webp',
  },
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
    screenshot: '/images/realisations/clim69-maquette.webp',
  },
  // Rhône Déconstruction retiré le 06/10 (décision opérateur) : le site du client
  // est en erreur 500 chez son hébergeur. Entrée et étude de cas dans l'historique git.
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
    screenshot: '/images/realisations/aplusaudition-maquette.webp',
  },
  {
    id: 'habad-etudiants-lyon',
    title: 'Habad Étudiants Lyon',
    category: 'Réseaux sociaux + Charte',
    sector: 'Association étudiante · Lyon',
    description:
      'Charte graphique, carrousels et stories Instagram, statuts WhatsApp, formulaires d\'inscription aux événements et suivi des inscrits.',
    results: 'Une identité reconnaissable, des posts chaque semaine, des inscriptions suivies',
    metric: 'Posts chaque semaine',
    tags: ['Instagram', 'Charte graphique', 'Inscriptions', 'Lyon'],
    featured: true,
    url: 'https://www.instagram.com/chabadoncampuslyon/',
    screenshot: '/images/realisations/habad-etudiants-lyon-maquette.webp',
  },
  {
    id: 'mdj17',
    title: 'Maison des Jeunes 17',
    category: 'Charte graphique + Réseaux sociaux',
    sector: 'Association jeunesse · Paris 17e',
    description:
      'Logo où le 17 se cache dans une menorah, typographie latin et hébreu, couleurs, flamme tracée au compas, stories et présentation de la charte.',
    results: 'Un kit d’identité qu’un graphiste peut lire et défendre, et des stories reconnaissables au premier coup d’œil',
    metric: 'Une identité à elle',
    tags: ['Charte graphique', 'Logo', 'Instagram', 'Paris 17e'],
    featured: true,
    url: 'https://www.instagram.com/maisondesjeunes17/',
    screenshot: '/images/realisations/mdj17-maquette.webp',
  },
  {
    id: 'cours-anglais-esthetique',
    title: 'Cours 2.0',
    category: 'Outil sur mesure + Supports pédagogiques',
    sector: 'Enseignement · Lycée professionnel',
    description:
      'Un outil qui fabrique les fiches d’anglais d’une enseignante pour quatre filières d’esthétique : fiche élève, document professeur et test, prêts à photocopier en niveaux de gris.',
    results: 'Un support demandé en une phrase, un PDF prêt pour la photocopieuse du lycée',
    metric: 'Une phrase, un PDF',
    tags: ['Outil sur mesure', 'Supports de cours', 'Anglais', 'Esthétique'],
    featured: true,
    screenshot: '/images/realisations/cours-anglais-esthetique-maquette.webp',
  },
]
