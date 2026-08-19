/**
 * Donnees du CV interactif servi sur /portfolio et /en/portfolio.
 *
 * Page destinee aux recruteurs uniquement : elle est en `noindex`, absente du
 * sitemap et non liee depuis le Header ou le Footer. Ne pas l'y ajouter.
 *
 * Source de verite : les deux PDF servis depuis /public, dates du 05 et du
 * 09/06/2026. Intitules, dates, chiffres et libelles ci-dessous sont recopies
 * de ces fichiers. Un recruteur ouvre la page et le PDF cote a cote : si le
 * PDF change, ce fichier change avec lui, sinon les deux se contredisent.
 */

export type CvLocale = 'fr' | 'en'

export interface CvStat {
  value: string
  label: string
}

export interface CvProject {
  id: string
  name: string
  /** Secteur + ville, une ligne */
  context: string
  role: string
  /** Le resultat le plus fort, affiche en pastille sur la carte */
  headline: string
  /** 3 a 4 puces detaillant la mission */
  bullets: string[]
  stack: string[]
  /** Cles de filtre, doivent exister dans `work.filters` */
  disciplines: string[]
  url: string
}

export interface CvExperience {
  role: string
  org: string
  period: string
  /** Phrase de cadrage, en italique dans le PDF */
  context?: string
  /** Liste de clients, mention `freelance`... affichee sous l'organisation */
  note?: string
  bullets: string[]
}

export interface CvEducation {
  degree: string
  school: string
  period: string
  detail?: string
}

export interface CvLanguage {
  name: string
  level: string
}

export interface CvContent {
  identity: {
    name: string
    role: string
    availability: string
    location: string
    email: string
    phone: string
    phoneHref: string
    linkedin: string
    cvFile: string
    portraitAlt: string
  }
  nav: {
    backToSite: string
    backHref: string
    switchLabel: string
    switchHref: string
  }
  intro: {
    kicker: string
    body: string
    traitsLabel: string
    /** Nom du profil restitue par le test, mis en avant */
    traitsProfile: string
    /**
     * D'ou vient le profil. Un trait de personnalite affirme sans source se lit
     * comme de l'auto-evaluation : ici c'est le resultat d'un test passe, la
     * mention de l'editeur est ce qui lui donne son poids.
     */
    traitsSource: string
    /** Lien vers le profil complet chez l'editeur, si disponible */
    traitsSourceUrl?: string
    traits: string[]
  }
  stats: CvStat[]
  work: {
    heading: string
    sub: string
    filterAll: string
    filters: { key: string; label: string }[]
    openSite: string
    closeLabel: string
    detailIntro: string
    stackLabel: string
    emptyLabel: string
    projects: CvProject[]
  }
  experience: {
    heading: string
    items: CvExperience[]
  }
  skills: {
    heading: string
    toolsLabel: string
    tools: string[]
    skillsLabel: string
    items: string[]
  }
  education: {
    heading: string
    items: CvEducation[]
    languagesLabel: string
    languages: CvLanguage[]
  }
  contact: {
    heading: string
    body: string
    emailCta: string
    linkedinCta: string
    pdfCta: string
  }
}

// Francais ───────────────────────────────────────────────────────────────────

const fr: CvContent = {
  identity: {
    name: 'Maurice Timsit',
    role: 'Chargé de marketing digital · SEO · Contenu · Analytics · IA',
    availability: 'Ouvert aux opportunités',
    location: 'Lyon, France',
    email: 'mochetimsit@gmail.com',
    phone: '06 52 09 23 01',
    phoneHref: 'tel:+33652092301',
    linkedin: 'https://www.linkedin.com/in/mauricetimsit/',
    cvFile: '/cv-maurice-timsit-fr.pdf',
    portraitAlt: 'Portrait de Maurice Timsit',
  },
  nav: {
    backToSite: 'Voir 123digital.fr',
    backHref: '/',
    switchLabel: 'EN',
    switchHref: '/en/portfolio',
  },
  intro: {
    kicker: 'Portfolio interactif',
    body: "Profil en marketing digital orienté exécution, avec une expertise solide en SEO, contenu, tracking et reporting. J'utilise l'IA au quotidien pour rechercher, produire plus vite, analyser des données et automatiser des workflows. Les cinq sites ci-dessous sont en ligne, cliquables et vérifiables.",
    traitsLabel: 'Personnalité',
    traitsProfile: 'Profil Promoteur',
    traitsSource: 'Résultat du test AssessFirst',
    traits: ['Proactif', 'Fédérateur', 'Orienté résultats', 'Adaptable', 'Force de proposition'],
  },
  stats: [
    { value: '+48%', label: 'de trafic qualifié, Fondation France-Israël' },
    { value: '525 000', label: 'impressions Search Console sur la période' },
    { value: '+340%', label: 'de trafic organique, meilleur résultat client' },
    { value: '12+', label: 'sites déployés' },
  ],
  work: {
    heading: 'Ce que j’ai construit',
    sub: 'Cinq sites en production. Cliquez une carte pour le détail de la mission, le bouton pour ouvrir le site.',
    filterAll: 'Tout',
    filters: [
      { key: 'seo', label: 'SEO' },
      { key: 'ads', label: 'Publicité' },
      { key: 'web', label: 'Création web' },
      { key: 'data', label: 'Analytics' },
    ],
    openSite: 'Ouvrir le site',
    closeLabel: 'Fermer',
    detailIntro: 'Ce que j’ai fait',
    stackLabel: 'Outils',
    emptyLabel: 'Aucun projet sur ce filtre.',
    projects: [
      {
        id: '123digital',
        name: '123digital.fr',
        context: 'Projet personnel · Lyon',
        role: 'Conception, développement et SEO',
        headline: '212 pages, conçu et codé de bout en bout',
        bullets: [
          'Site développé sous Next.js 15 et React, sans CMS ni template acheté.',
          'Architecture SEO à 212 pages : services, secteurs, villes, blog, avec sitemap généré et données structurées.',
          'Système de design en variables CSS, contrastes vérifiés AA sur toute la palette.',
          'Déploiement continu sur Vercel depuis GitHub.',
        ],
        stack: ['Next.js', 'React', 'Tailwind', 'Vercel', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://123digital.fr',
      },
      {
        id: 'fondation',
        name: 'Fondation France-Israël',
        context: 'Fondation · Paris',
        role: 'Chargé de marketing digital',
        headline: '+48% de trafic qualifié, 7 682 clics',
        bullets: [
          'Reporting mensuel GA4 et Search Console : +48% de trafic qualifié, 525 000 impressions GSC, 7 682 clics.',
          'Production de contenus et coordination des publications : +40% d’engagement.',
          'Analyse des performances sur deux outils analytics, recommandations SEO et contenu.',
          'Intégration de l’IA pour la veille, la rédaction et le reporting : 30% de temps de production en moins.',
        ],
        stack: ['GA4', 'Search Console', 'Tag Manager', 'Looker Studio', 'WordPress'],
        disciplines: ['seo', 'data'],
        url: 'https://www.fondationfranceisrael.org',
      },
      {
        id: 'clim69',
        name: 'Clim69',
        context: 'Climatisation · Villeurbanne',
        role: 'Google Ads et refonte du site',
        headline: 'Chaque euro de publicité en rapporte plusieurs',
        bullets: [
          'Compte Google Ads monté de zéro : structure, mots-clés, négatifs, enchère sur conversion.',
          'Refonte complète du site et 19 pages locales pour couvrir la zone d’intervention.',
          'Suivi des appels et des demandes de devis, vérifié chaque jour.',
        ],
        stack: ['Google Ads', 'GA4', 'Tag Manager', 'Next.js'],
        disciplines: ['ads', 'web'],
        url: 'https://clim69.fr',
      },
      {
        id: 'rhone-deconstruction',
        name: 'Rhône Déconstruction',
        context: 'BTP et démolition · Lyon',
        role: 'Création du site et SEO local',
        headline: '+180% d’impressions GSC en 5 mois',
        bullets: [
          'Création du site vitrine pour une entreprise de démolition en Auvergne-Rhône-Alpes.',
          'Stratégie SEO locale : +180% d’impressions Search Console en cinq mois.',
          'Suivi des positions et des requêtes chantier par chantier.',
        ],
        stack: ['SEO local', 'WordPress', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://rhone-deconstruction.fr',
      },
      {
        id: 'aplus-audition',
        name: 'A+ Audition',
        context: 'Santé et audioprothèse · Cannes',
        role: 'Refonte et SEO local',
        headline: '1re position locale sur Google en 3 mois',
        bullets: [
          'Refonte du site d’un cabinet d’audioprothèse, avec mise en avant des aides auditives remboursées.',
          'Optimisation SEO locale : première position sur la requête principale en trois mois.',
          'Parcours de prise de rendez-vous pour le bilan auditif.',
        ],
        stack: ['SEO local', 'WordPress', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://aplusaudition.fr',
      },
    ],
  },
  experience: {
    heading: 'Parcours',
    items: [
      {
        role: 'Chargé de marketing digital',
        org: 'Fondation France-Israël',
        period: 'janv. 2024 → aujourd’hui',
        context:
          'Structure établie de longue date, j’ai modernisé l’approche digitale en introduisant des outils d’analytics et l’IA dans des process jusque-là peu structurés.',
        bullets: [
          'Reporting mensuel GA4 et Search Console : +48% de trafic qualifié, 525 000 impressions GSC, 7 682 clics.',
          'Production de contenus et coordination des publications : +40% d’engagement.',
          'Analyse des performances sur deux outils analytics, recommandations SEO et contenu.',
          'Intégration de l’IA pour la veille, la rédaction et le reporting : 30% de temps de production en moins.',
        ],
      },
      {
        role: 'Coordinateur projets et social media',
        org: 'Chabad On Campus',
        period: 'févr. 2017 → aujourd’hui',
        context:
          'Environnement associatif et bénévole, j’ai professionnalisé la communication digitale et structuré l’acquisition sur le long terme.',
        bullets: [
          'Coordination d’événements étudiants jusqu’à 500 participants.',
          'Animation des réseaux sociaux : portée multipliée par 2, 1 000 abonnés Instagram et TikTok, engagement de 2,1% à 5,4%.',
          'Coordination terrain et communication : +25% d’inscriptions.',
        ],
      },
      {
        role: 'Consultant digital indépendant',
        org: '123Digital',
        period: '2017 → aujourd’hui',
        context: 'Accompagnement de structures variées de A à Z, de l’audit jusqu’aux résultats mesurables.',
        bullets: [
          '4 à 5 clients par trimestre : PME, associations, startups, dont Rhône Déconstruction et A+ Audition.',
          'Audits SEO et refonte de contenus : +20% à +50% de trafic organique, +340% sur le meilleur résultat.',
          'Stratégies d’acquisition de A à Z : +30% de leads en moyenne, conversion multipliée par 2,5, tableaux de bord Looker Studio et GA4.',
          'Rhône Déconstruction : +180% d’impressions GSC en cinq mois. A+ Audition : 1re position locale en trois mois. Plus de 12 sites livrés.',
        ],
      },
      {
        role: 'Coordinateur événementiel',
        org: 'Missions internationales',
        period: '2019 → aujourd’hui',
        context: 'Expériences variées en coordination événementielle et hospitality à l’international.',
        bullets: [
          'Organisation d’événements corporate et de séjours internationaux : Maroc, Portugal, Espagne, Italie, Suisse, Hongrie.',
        ],
      },
      {
        role: 'Digital manager',
        org: 'EasyBazar',
        period: 'févr. 2022 → sept. 2022',
        bullets: [
          'Gestion des plateformes de vente en ligne Amazon et WordPress, optimisation des fiches produits, reporting de performance.',
        ],
      },
      {
        role: 'Chargé de développement digital',
        org: 'SoftySoft',
        period: 'mars 2022 → mai 2022',
        bullets: ['Animation LinkedIn, création de contenus et développement de la notoriété digitale.'],
      },
    ],
  },
  skills: {
    heading: 'Compétences et outils',
    toolsLabel: 'Outils',
    tools: [
      'GA4',
      'Google Search Console',
      'Google Tag Manager',
      'Looker Studio',
      'HubSpot CRM',
      'WordPress',
      'Next.js',
      'n8n',
      'Tailwind',
      'ChatGPT',
      'Claude',
    ],
    skillsLabel: 'Compétences',
    items: [
      'SEO on-page',
      'Content marketing',
      'Google Ads',
      'Meta Ads',
      'Social media',
      'Web analytics',
      'Reporting KPI',
      'Marketing ops',
      'Workflows IA',
      'AI-assisted coding',
      'Growth marketing',
      'Acquisition digitale',
      'Traffic management',
    ],
  },
  education: {
    heading: 'Formation',
    items: [
      {
        degree: 'Master 2 Marketing digital',
        school: 'INSEEC MSc',
        period: '2022 – 2024',
        detail: 'Mémoire : « L’impact de la digitalisation sur la performance des TPE/PME »',
      },
      { degree: 'Licence Marketing et vente', school: 'Montpellier Management', period: '2020 – 2021' },
      { degree: 'BTS NDRC', school: 'CNED', period: '2018 – 2020' },
    ],
    languagesLabel: 'Langues',
    languages: [
      { name: 'Français', level: 'C2' },
      { name: 'Anglais', level: 'B2' },
      { name: 'Hébreu', level: 'B2' },
    ],
  },
  contact: {
    heading: 'Parlons du poste.',
    body: 'Basé à Lyon, ouvert aux opportunités. Réponse sous 24 heures.',
    emailCta: 'Écrire un mail',
    linkedinCta: 'Profil LinkedIn',
    pdfCta: 'Télécharger le CV',
  },
}

// English ────────────────────────────────────────────────────────────────────

const en: CvContent = {
  identity: {
    name: 'Maurice Timsit',
    role: 'Digital Marketing Coordinator · SEO · Content · Analytics · AI',
    availability: 'Open to opportunities',
    location: 'Lyon, France · open to relocation to Israel or the US',
    email: 'mochetimsit@gmail.com',
    phone: '+33 6 52 09 23 01',
    phoneHref: 'tel:+33652092301',
    linkedin: 'https://www.linkedin.com/in/mauricetimsit/',
    cvFile: '/cv-maurice-timsit-en.pdf',
    portraitAlt: 'Portrait of Maurice Timsit',
  },
  nav: {
    backToSite: 'Visit 123digital.fr',
    backHref: '/en',
    switchLabel: 'FR',
    switchHref: '/portfolio',
  },
  intro: {
    kicker: 'Interactive portfolio',
    body: 'Execution-focused digital marketing profile with solid expertise in SEO, content, tracking and reporting. I use AI daily to research faster, produce content, analyze data and automate workflows. The five sites below are live, clickable and verifiable.',
    traitsLabel: 'Personality',
    traitsProfile: 'Promoter profile',
    traitsSource: 'Result of the AssessFirst assessment',
    traits: ['Proactive', 'Team-builder', 'Results-driven', 'Adaptable', 'Self-starter'],
  },
  stats: [
    { value: '+48%', label: 'qualified traffic, France-Israel Foundation' },
    { value: '525,000', label: 'Search Console impressions over the period' },
    { value: '+340%', label: 'organic traffic, best client result' },
    { value: '12+', label: 'websites shipped' },
  ],
  work: {
    heading: 'What I have built',
    sub: 'Five sites in production. Click a card for the mission detail, the button to open the site.',
    filterAll: 'All',
    filters: [
      { key: 'seo', label: 'SEO' },
      { key: 'ads', label: 'Paid ads' },
      { key: 'web', label: 'Web build' },
      { key: 'data', label: 'Analytics' },
    ],
    openSite: 'Open the site',
    closeLabel: 'Close',
    detailIntro: 'What I did',
    stackLabel: 'Stack',
    emptyLabel: 'No project under this filter.',
    projects: [
      {
        id: '123digital',
        name: '123digital.fr',
        context: 'Personal project · Lyon',
        role: 'Design, development and SEO',
        headline: '212 pages, designed and coded end to end',
        bullets: [
          'Built with Next.js 15 and React, no CMS and no purchased template.',
          '212-page SEO architecture: services, industries, cities and blog, with generated sitemap and structured data.',
          'CSS-variable design system, AA contrast verified across the palette.',
          'Continuous deployment to Vercel from GitHub.',
        ],
        stack: ['Next.js', 'React', 'Tailwind', 'Vercel', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://123digital.fr',
      },
      {
        id: 'fondation',
        name: 'France-Israel Foundation',
        context: 'Foundation · Paris',
        role: 'Digital Marketing Coordinator',
        headline: '+48% qualified traffic, 7,682 clicks',
        bullets: [
          'Monthly GA4 and Search Console reporting: +48% qualified traffic, 525,000 GSC impressions, 7,682 clicks.',
          'Content production and publication coordination: +40% engagement.',
          'Performance analysis across two analytics tools, SEO and content recommendations.',
          'AI integration for research, writing and reporting: 30% less production time.',
        ],
        stack: ['GA4', 'Search Console', 'Tag Manager', 'Looker Studio', 'WordPress'],
        disciplines: ['seo', 'data'],
        url: 'https://www.fondationfranceisrael.org',
      },
      {
        id: 'clim69',
        name: 'Clim69',
        context: 'Air conditioning · Villeurbanne',
        role: 'Google Ads and site rebuild',
        headline: 'Every euro of ad spend returns several',
        bullets: [
          'Google Ads account built from zero: structure, keywords, negatives, conversion bidding.',
          'Full site rebuild plus 19 local pages covering the service area.',
          'Call and quote-request tracking, reviewed daily.',
        ],
        stack: ['Google Ads', 'GA4', 'Tag Manager', 'Next.js'],
        disciplines: ['ads', 'web'],
        url: 'https://clim69.fr',
      },
      {
        id: 'rhone-deconstruction',
        name: 'Rhône Déconstruction',
        context: 'Construction and demolition · Lyon',
        role: 'Site build and local SEO',
        headline: '+180% GSC impressions in 5 months',
        bullets: [
          'Built the site for a demolition company operating across Auvergne-Rhône-Alpes.',
          'Local SEO strategy: +180% Search Console impressions in five months.',
          'Position and query tracking, project by project.',
        ],
        stack: ['Local SEO', 'WordPress', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://rhone-deconstruction.fr',
      },
      {
        id: 'aplus-audition',
        name: 'A+ Audition',
        context: 'Healthcare and hearing aids · Cannes',
        role: 'Rebuild and local SEO',
        headline: '#1 local Google result in 3 months',
        bullets: [
          'Rebuilt the site of a hearing-aid practice, highlighting reimbursed devices.',
          'Local SEO work: first position on the main query within three months.',
          'Booking path for the hearing assessment.',
        ],
        stack: ['Local SEO', 'WordPress', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://aplusaudition.fr',
      },
    ],
  },
  experience: {
    heading: 'Work experience',
    items: [
      {
        role: 'Digital Marketing Coordinator',
        org: 'France-Israel Foundation',
        period: 'Jan. 2024 → present',
        context:
          'Long-established organization: I modernized the digital approach by introducing analytics tools and AI into previously unstructured processes.',
        bullets: [
          'Monthly GA4 and Search Console reporting: +48% qualified traffic, 525,000 GSC impressions, 7,682 clicks.',
          'Content production and publication coordination: +40% engagement.',
          'Performance analysis across two analytics tools, SEO and content recommendations.',
          'AI integration for research, writing and reporting: 30% less production time.',
        ],
      },
      {
        role: 'Project and Social Media Coordinator',
        org: 'Chabad On Campus',
        period: 'Feb. 2017 → present',
        context:
          'Non-profit volunteer environment: I professionalized digital communications and built a long-term acquisition structure.',
        bullets: [
          'Coordinated student events with up to 500 attendees.',
          'Social media management: reach doubled, 1,000 Instagram and TikTok followers, engagement from 2.1% to 5.4%.',
          'Field coordination and communications: +25% registrations.',
        ],
      },
      {
        role: 'Independent Digital Consultant',
        org: '123Digital',
        period: '2017 → present',
        context: 'End-to-end support for diverse clients, from audit to measurable results.',
        bullets: [
          '4 to 5 clients per quarter: SMBs, nonprofits, startups, including Rhône Déconstruction and A+ Audition.',
          'SEO audits and content revamps: +20% to +50% organic traffic, +340% best result.',
          'Full acquisition strategies: +30% average leads, 2.5x average conversion, Looker Studio and GA4 dashboards.',
          'Rhône Déconstruction: +180% GSC impressions in five months. A+ Audition: #1 local Google result in three months. 12+ sites shipped.',
        ],
      },
      {
        role: 'Event Coordinator',
        org: 'International assignments',
        period: '2019 → present',
        context: 'Varied experience in corporate event coordination and international hospitality.',
        bullets: [
          'Corporate events and international programs: Morocco, Portugal, Spain, Italy, Switzerland, Hungary.',
        ],
      },
      {
        role: 'Digital Manager',
        org: 'EasyBazar',
        period: 'Feb. 2022 → Sept. 2022',
        bullets: [
          'E-commerce platform management on Amazon and WordPress, product listing optimization, performance reporting.',
        ],
      },
      {
        role: 'Digital Development Manager',
        org: 'SoftySoft',
        period: 'Mar. 2022 → May 2022',
        bullets: ['LinkedIn management, content creation and digital brand awareness development.'],
      },
    ],
  },
  skills: {
    heading: 'Skills and tools',
    toolsLabel: 'Tools',
    tools: [
      'GA4',
      'Google Search Console',
      'Google Tag Manager',
      'Looker Studio',
      'HubSpot CRM',
      'WordPress',
      'Next.js',
      'n8n',
      'Tailwind',
      'ChatGPT',
      'Claude',
    ],
    skillsLabel: 'Skills',
    items: [
      'On-page SEO',
      'Content marketing',
      'Google Ads',
      'Meta Ads',
      'Social media',
      'Web analytics',
      'KPI reporting',
      'Marketing ops',
      'AI workflows',
      'AI-assisted coding',
      'Growth marketing',
      'Digital acquisition',
      'Traffic management',
    ],
  },
  education: {
    heading: 'Education',
    items: [
      {
        degree: 'MSc Digital Marketing',
        school: 'INSEEC MSc',
        period: '2022 – 2024',
        detail: 'Thesis: "The impact of digitalization on SMB performance"',
      },
      { degree: 'Bachelor in Marketing and Sales', school: 'Montpellier Management', period: '2020 – 2021' },
      { degree: 'BTS NDRC (Sales)', school: 'CNED', period: '2018 – 2020' },
    ],
    languagesLabel: 'Languages',
    languages: [
      { name: 'French', level: 'C2' },
      { name: 'English', level: 'B2' },
      { name: 'Hebrew', level: 'B2' },
    ],
  },
  contact: {
    heading: 'Let us talk about the role.',
    body: 'Based in Lyon, open to relocation to Israel or the US. I reply within 24 hours.',
    emailCta: 'Send an email',
    linkedinCta: 'LinkedIn profile',
    pdfCta: 'Download the resume',
  },
}

export const cvContent: Record<CvLocale, CvContent> = { fr, en }

/** Les captures vivent dans /public, une par projet, cle = `CvProject.id`. */
export const cvScreenshots: Record<string, string> = {
  '123digital': '/screen-123digital.jpg',
  fondation: '/screen-fondation.jpg',
  clim69: '/screen-clim69.jpg',
  'rhone-deconstruction': '/screen-rhone.jpg',
  'aplus-audition': '/screen-aplus.jpg',
}
