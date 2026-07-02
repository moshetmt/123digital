export interface VilleData {
  slug: string
  nom: string
  nomComplet: string
  region: string
  population: number
  departement: string
  priority: 'high' | 'medium' | 'low'
  description: string
  keywords: string[]
}

export const villesARA: VilleData[] = [
  {
    slug: 'lyon',
    nom: 'Lyon',
    nomComplet: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    population: 522228,
    departement: 'Rhône (69)',
    priority: 'high',
    description: 'première métropole de la région Auvergne-Rhône-Alpes',
    keywords: ['consultant digital Lyon', 'agence digitale Lyon', 'SEO Lyon', 'création site web Lyon'],
  },
  {
    slug: 'grenoble',
    nom: 'Grenoble',
    nomComplet: 'Grenoble',
    region: 'Auvergne-Rhône-Alpes',
    population: 158198,
    departement: 'Isère (38)',
    priority: 'high',
    description: 'capitale des Alpes françaises',
    keywords: ['consultant digital Grenoble', 'agence digitale Grenoble', 'SEO Grenoble', 'création site web Grenoble'],
  },
  {
    slug: 'saint-etienne',
    nom: 'Saint-Étienne',
    nomComplet: 'Saint-Étienne',
    region: 'Auvergne-Rhône-Alpes',
    population: 172023,
    departement: 'Loire (42)',
    priority: 'high',
    description: 'deuxième ville de la région Auvergne-Rhône-Alpes',
    keywords: ['consultant digital Saint-Étienne', 'agence digitale Saint-Étienne', 'SEO Saint-Étienne'],
  },
  {
    slug: 'clermont-ferrand',
    nom: 'Clermont-Ferrand',
    nomComplet: 'Clermont-Ferrand',
    region: 'Auvergne-Rhône-Alpes',
    population: 147678,
    departement: 'Puy-de-Dôme (63)',
    priority: 'high',
    description: 'capitale de l\'Auvergne',
    keywords: ['consultant digital Clermont-Ferrand', 'agence digitale Clermont-Ferrand', 'SEO Clermont-Ferrand'],
  },
  {
    slug: 'annecy',
    nom: 'Annecy',
    nomComplet: 'Annecy',
    region: 'Auvergne-Rhône-Alpes',
    population: 126924,
    departement: 'Haute-Savoie (74)',
    priority: 'high',
    description: 'perle des Alpes, ville touristique et économique dynamique',
    keywords: ['consultant digital Annecy', 'agence digitale Annecy', 'SEO Annecy', 'création site web Annecy'],
  },
  {
    slug: 'chambery',
    nom: 'Chambéry',
    nomComplet: 'Chambéry',
    region: 'Auvergne-Rhône-Alpes',
    population: 58919,
    departement: 'Savoie (73)',
    priority: 'medium',
    description: 'préfecture de la Savoie, au cœur des Alpes',
    keywords: ['consultant digital Chambéry', 'agence digitale Chambéry', 'SEO Chambéry'],
  },
  {
    slug: 'valence',
    nom: 'Valence',
    nomComplet: 'Valence',
    region: 'Auvergne-Rhône-Alpes',
    population: 62492,
    departement: 'Drôme (26)',
    priority: 'medium',
    description: 'porte de la Provence, ville en plein essor économique',
    keywords: ['consultant digital Valence', 'agence digitale Valence', 'SEO Valence'],
  },
  {
    slug: 'villeurbanne',
    nom: 'Villeurbanne',
    nomComplet: 'Villeurbanne',
    region: 'Auvergne-Rhône-Alpes',
    population: 147706,
    departement: 'Rhône (69)',
    priority: 'medium',
    description: 'ville dynamique de la métropole lyonnaise',
    keywords: ['consultant digital Villeurbanne', 'agence digitale Villeurbanne', 'SEO Villeurbanne'],
  },
  {
    slug: 'bourg-en-bresse',
    nom: 'Bourg-en-Bresse',
    nomComplet: 'Bourg-en-Bresse',
    region: 'Auvergne-Rhône-Alpes',
    population: 40190,
    departement: 'Ain (01)',
    priority: 'medium',
    description: 'préfecture de l\'Ain, ville à l\'économie diversifiée',
    keywords: ['consultant digital Bourg-en-Bresse', 'agence digitale Bourg-en-Bresse', 'SEO Bourg-en-Bresse'],
  },
  {
    slug: 'annemasse',
    nom: 'Annemasse',
    nomComplet: 'Annemasse',
    region: 'Auvergne-Rhône-Alpes',
    population: 36091,
    departement: 'Haute-Savoie (74)',
    priority: 'medium',
    description: 'ville frontalière Suisse, bassin d\'emploi franco-genevois',
    keywords: ['consultant digital Annemasse', 'agence digitale Annemasse', 'SEO Annemasse'],
  },
  {
    slug: 'thonon-les-bains',
    nom: 'Thonon-les-Bains',
    nomComplet: 'Thonon-les-Bains',
    region: 'Auvergne-Rhône-Alpes',
    population: 34447,
    departement: 'Haute-Savoie (74)',
    priority: 'low',
    description: 'ville lacustre sur les rives du lac Léman',
    keywords: ['consultant digital Thonon-les-Bains', 'agence digitale Thonon-les-Bains'],
  },
  {
    slug: 'roanne',
    nom: 'Roanne',
    nomComplet: 'Roanne',
    region: 'Auvergne-Rhône-Alpes',
    population: 34137,
    departement: 'Loire (42)',
    priority: 'low',
    description: 'ville industrielle et gastronomique du département de la Loire',
    keywords: ['consultant digital Roanne', 'agence digitale Roanne', 'SEO Roanne'],
  },
  {
    slug: 'oyonnax',
    nom: 'Oyonnax',
    nomComplet: 'Oyonnax',
    region: 'Auvergne-Rhône-Alpes',
    population: 22341,
    departement: 'Ain (01)',
    priority: 'low',
    description: 'capitale mondiale du plastique, pôle industriel de l\'Ain',
    keywords: ['consultant digital Oyonnax', 'agence digitale Oyonnax'],
  },
  {
    slug: 'macon',
    nom: 'Mâcon',
    nomComplet: 'Mâcon',
    region: 'Bourgogne-Franche-Comté',
    population: 33342,
    departement: 'Saône-et-Loire (71)',
    priority: 'low',
    description: 'porte de la Bourgogne, au cœur du vignoble mâconnais',
    keywords: ['consultant digital Mâcon', 'agence digitale Mâcon', 'SEO Mâcon'],
  },
  {
    slug: 'albertville',
    nom: 'Albertville',
    nomComplet: 'Albertville',
    region: 'Auvergne-Rhône-Alpes',
    population: 19303,
    departement: 'Savoie (73)',
    priority: 'low',
    description: 'ville olympique en porte des Alpes',
    keywords: ['consultant digital Albertville', 'agence digitale Albertville'],
  },
]

export const villesFrance: VilleData[] = [
  {
    slug: 'paris',
    nom: 'Paris',
    nomComplet: 'Paris',
    region: 'Île-de-France',
    population: 2161000,
    departement: 'Paris (75)',
    priority: 'high',
    description: 'capitale de la France',
    keywords: ['consultant digital Paris', 'agence digitale Paris', 'SEO Paris'],
  },
  {
    slug: 'marseille',
    nom: 'Marseille',
    nomComplet: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    population: 861635,
    departement: 'Bouches-du-Rhône (13)',
    priority: 'high',
    description: 'deuxième ville de France, capitale du Sud',
    keywords: ['consultant digital Marseille', 'agence digitale Marseille', 'SEO Marseille'],
  },
  {
    slug: 'toulouse',
    nom: 'Toulouse',
    nomComplet: 'Toulouse',
    region: 'Occitanie',
    population: 479553,
    departement: 'Haute-Garonne (31)',
    priority: 'high',
    description: 'ville rose, capitale de l\'aéronautique française',
    keywords: ['consultant digital Toulouse', 'agence digitale Toulouse', 'SEO Toulouse'],
  },
  {
    slug: 'bordeaux',
    nom: 'Bordeaux',
    nomComplet: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    population: 254436,
    departement: 'Gironde (33)',
    priority: 'high',
    description: 'capitale mondiale du vin, ville en plein essor',
    keywords: ['consultant digital Bordeaux', 'agence digitale Bordeaux', 'SEO Bordeaux'],
  },
  {
    slug: 'nantes',
    nom: 'Nantes',
    nomComplet: 'Nantes',
    region: 'Pays de la Loire',
    population: 314138,
    departement: 'Loire-Atlantique (44)',
    priority: 'medium',
    description: 'ville dynamique de l\'Ouest, capitale des Pays de la Loire',
    keywords: ['consultant digital Nantes', 'agence digitale Nantes', 'SEO Nantes'],
  },
  {
    slug: 'lille',
    nom: 'Lille',
    nomComplet: 'Lille',
    region: 'Hauts-de-France',
    population: 232741,
    departement: 'Nord (59)',
    priority: 'medium',
    description: 'métropole du Nord, carrefour européen',
    keywords: ['consultant digital Lille', 'agence digitale Lille', 'SEO Lille'],
  },
  {
    slug: 'strasbourg',
    nom: 'Strasbourg',
    nomComplet: 'Strasbourg',
    region: 'Grand Est',
    population: 284677,
    departement: 'Bas-Rhin (67)',
    priority: 'medium',
    description: 'capitale européenne, entre France et Allemagne',
    keywords: ['consultant digital Strasbourg', 'agence digitale Strasbourg', 'SEO Strasbourg'],
  },
  {
    slug: 'rennes',
    nom: 'Rennes',
    nomComplet: 'Rennes',
    region: 'Bretagne',
    population: 216815,
    departement: 'Ille-et-Vilaine (35)',
    priority: 'medium',
    description: 'capitale bretonne, ville universitaire et tech',
    keywords: ['consultant digital Rennes', 'agence digitale Rennes', 'SEO Rennes'],
  },
  {
    slug: 'nice',
    nom: 'Nice',
    nomComplet: 'Nice',
    region: 'Provence-Alpes-Côte d\'Azur',
    population: 340017,
    departement: 'Alpes-Maritimes (06)',
    priority: 'medium',
    description: 'capitale de la Côte d\'Azur, ville internationale',
    keywords: ['consultant digital Nice', 'agence digitale Nice', 'SEO Nice'],
  },
]

export const allVilles = [...villesARA, ...villesFrance]

export function getVilleBySlug(slug: string): VilleData | undefined {
  return allVilles.find((v) => v.slug === slug)
}

// ─── Contenu enrichi villes prioritaires ────────────────────────────────────
// Contexte économique réel et angle d'accompagnement différencié par ville,
// pour éviter le contenu quasi-dupliqué entre pages [ville] à fort volume.

export interface VilleInsight {
  marche: string
  angle: string
}

export const villeInsights: Record<string, VilleInsight> = {
  lyon: {
    marche:
      "Deuxième métropole économique de France, Lyon concentre une économie diversifiée : santé et biotech (pôle Lyonbiopôle), fintech, logistique — carrefour entre le nord et le sud de l'Europe — et un tissu dense de PME de services. La concurrence digitale y est plus forte que dans le reste de la région, ce qui rend un positionnement SEO précis et une fiche Google Business Profile soignée d'autant plus déterminants.",
    angle:
      "Pour les PME lyonnaises, je combine SEO local ciblé par arrondissement (Lyon 1er à Lyon 9e, Villeurbanne, Caluire-et-Cuire) et créneaux sectoriels moins saturés, plutôt que d'affronter frontalement les mots-clés génériques déjà occupés par les grandes agences du centre-ville.",
  },
  grenoble: {
    marche:
      "Grenoble est un pôle majeur de la microélectronique et de la deep-tech en Europe (CEA-Leti, Minatec, STMicroelectronics), avec un tissu dense de PME industrielles et technologiques B2B. Ce marché demande une approche digitale différente d'une ville à dominante commerce : contenu technique, SEO orienté B2B et présence LinkedIn priment souvent sur le SEO local grand public.",
    angle:
      "J'adapte la stratégie aux PME industrielles et tech grenobloises : SEO orienté requêtes techniques et B2B, mise en avant de références chiffrées, et une présence LinkedIn structurée en complément du site web.",
  },
  'saint-etienne': {
    marche:
      "Ville UNESCO de design depuis 2010, Saint-Étienne a transformé son héritage industriel (armement, textile, rubanerie) en économie créative et manufacturière renouvelée. Les coûts d'acquisition y sont généralement plus bas qu'à Lyon, ce qui rend le SEO local particulièrement rentable pour les artisans et commerces de la ville.",
    angle:
      "Pour les entreprises stéphanoises, je mise sur un SEO local offensif : la concurrence digitale y est moins dense qu'à Lyon, donc les premières positions Google restent accessibles avec un investissement mesuré.",
  },
  'clermont-ferrand': {
    marche:
      "Clermont-Ferrand est historiquement la ville de Michelin et reste un pôle industriel et pharmaceutique important, entouré d'une économie agroalimentaire auvergnate solide. Ce mélange industrie lourde et PME locales crée deux besoins distincts : image de marque professionnelle pour les sous-traitants B2B, et SEO local pour les commerces et artisans.",
    angle:
      "Je distingue clairement les deux approches selon votre profil : branding et présence B2B pour les entreprises liées à l'industrie, SEO local classique pour les commerces et professions de proximité.",
  },
  annecy: {
    marche:
      "Annecy combine une économie touristique forte autour du lac avec un pôle animation et jeu vidéo reconnu internationalement (festival international du film d'animation, studios implantés dans la ville) et la proximité de Genève, qui attire une clientèle transfrontalière à fort pouvoir d'achat. La saisonnalité touristique influence directement les pics de recherche.",
    angle:
      "Pour les commerces et prestataires annéciens, j'intègre la saisonnalité touristique dans la stratégie : visibilité renforcée avant et pendant la haute saison, contenu adapté à une clientèle mixte locale et touristique.",
  },
}
