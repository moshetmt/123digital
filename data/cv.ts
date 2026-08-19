/**
 * Donnees du CV interactif servi sur /portfolio et /en/portfolio.
 *
 * Page destinee aux recruteurs uniquement : elle est en `noindex`, absente du
 * sitemap et non liee depuis le Header ou le Footer. Ne pas l'y ajouter.
 *
 * Source de verite : le CV PDF de Maurice Timsit (public/cv-maurice-timsit-fr.pdf).
 * Les chiffres ci-dessous doivent rester identiques a ceux du PDF, un recruteur
 * compare les deux. Si le PDF change, ce fichier change avec lui.
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
  /** 3 puces detaillant la mission */
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
  /** `freelance`, liste de clients... affiche sous l'organisation */
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
    role: 'Marketing digital · SEO · Analytics · IA et automatisation',
    availability: 'Disponible · CDI',
    location: 'Lyon · Paris · Remote',
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
    body: "Profil marketing digital oriente execution : SEO, contenu, tracking et reporting. J'utilise l'IA au quotidien pour chercher, produire plus vite, analyser des donnees et automatiser des workflows. Les cinq projets ci-dessous sont en ligne, cliquables et verifiables.",
  },
  stats: [
    { value: '+48%', label: 'de trafic organique en un an, Fondation France-Israël' },
    { value: '525 000', label: 'impressions Search Console sur la periode' },
    { value: '+340%', label: 'de trafic organique, meilleur resultat client' },
    { value: '12+', label: 'sites deployes depuis 2022' },
  ],
  work: {
    heading: 'Ce que j’ai construit',
    sub: 'Cinq sites en production. Cliquez une carte pour le detail de la mission, le bouton pour ouvrir le site.',
    filterAll: 'Tout',
    filters: [
      { key: 'seo', label: 'SEO' },
      { key: 'ads', label: 'Publicite' },
      { key: 'web', label: 'Creation web' },
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
        role: 'Conception, developpement et SEO',
        headline: '212 pages, concu et code de bout en bout',
        bullets: [
          'Site developpe sous Next.js 15 et React, sans CMS ni template achete.',
          'Architecture SEO a 212 pages : services, secteurs, villes, blog, avec sitemap genere et donnees structurees.',
          'Systeme de design en variables CSS, contrastes verifies AA sur toute la palette.',
          'Deploiement continu sur Vercel depuis GitHub.',
        ],
        stack: ['Next.js', 'React', 'Tailwind', 'Vercel', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://123digital.fr',
      },
      {
        id: 'fondation',
        name: 'Fondation France-Israël',
        context: 'Fondation reconnue d’utilite publique · Paris',
        role: 'Charge de marketing digital',
        headline: '+48% de trafic organique, 7 682 clics',
        bullets: [
          'Pilotage SEO et analytics : +48% de trafic, 525 000 impressions Search Console, 7 682 clics organiques.',
          'Production de contenus et coordination editoriale : +40% d’engagement, 30% de temps de production en moins grace a l’IA.',
          'Reporting mensuel GA4 et Search Console, avec recommandations SEO et editoriales.',
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
        headline: 'Chaque euro de publicite en rapporte plusieurs',
        bullets: [
          'Compte Google Ads monte de zero : structure, mots-cles, negatifs, enchere sur conversion.',
          'Refonte complete du site et 19 pages locales pour couvrir la zone d’intervention.',
          'Suivi des appels et des demandes de devis, verifie chaque jour.',
        ],
        stack: ['Google Ads', 'GA4', 'Tag Manager', 'Next.js'],
        disciplines: ['ads', 'web'],
        url: 'https://clim69.fr',
      },
      {
        id: 'rhone-deconstruction',
        name: 'Rhône Déconstruction',
        context: 'BTP et demolition · Lyon',
        role: 'Creation du site et SEO local',
        headline: '+180% d’impressions en 5 mois, +30% de leads',
        bullets: [
          'Creation du site vitrine pour une entreprise de demolition en Auvergne-Rhone-Alpes.',
          'Strategie SEO locale : +180% d’impressions Search Console en cinq mois.',
          '+30% de demandes entrantes sur la meme periode.',
        ],
        stack: ['SEO local', 'WordPress', 'Search Console'],
        disciplines: ['web', 'seo'],
        url: 'https://rhone-deconstruction.fr',
      },
      {
        id: 'aplus-audition',
        name: 'A+ Audition',
        context: 'Sante et audioprothese · Cannes',
        role: 'Refonte et SEO local',
        headline: '1re position sur « audioprothesiste Cannes » en 3 mois',
        bullets: [
          'Refonte du site d’un cabinet d’audioprothese, avec mise en avant des aides auditives remboursees.',
          'Optimisation SEO locale : premiere position sur la requete principale en trois mois.',
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
        bullets: [
          'Pilotage SEO et analytics : +48% de trafic, 525 000 impressions Search Console, 7 682 clics organiques.',
          'Production de contenus et coordination editoriale : +40% d’engagement, 30% de temps de production en moins via l’IA.',
          'Reporting mensuel GA4 et Search Console, recommandations SEO et contenu.',
        ],
      },
      {
        role: 'Consultant digital indépendant',
        org: 'Freelance / 123Digital',
        period: '2022 → aujourd’hui',
        note: 'Fondation France-Israël · Rhône Déconstruction · A+ Audition · Clim69',
        bullets: [
          'Meilleur resultat : +340% de trafic organique, conversion multipliee par 2,5, plus de 12 sites deployes.',
          'Rhône Déconstruction : +180% d’impressions Search Console en cinq mois, +30% de leads.',
          'A+ Audition : premiere position locale sur « audioprothesiste Cannes » en trois mois.',
        ],
      },
      {
        role: 'Coordinateur projets et social media',
        org: 'Chabad On Campus',
        period: 'févr. 2017 → aujourd’hui',
        note: 'freelance',
        bullets: [
          'Organisation d’evenements jusqu’a 500 participants : cadrage, budget, execution.',
          'Animation des reseaux sociaux : portee multipliee par 2, +25% d’inscriptions, 1 000 abonnes Instagram et TikTok.',
          'Optimisation du tunnel d’acquisition : engagement passe de 2,1% a 5,4%.',
        ],
      },
    ],
  },
  skills: {
    heading: 'Compétences et outils',
    toolsLabel: 'Outils',
    tools: [
      'GA4',
      'Search Console',
      'Tag Manager',
      'Looker Studio',
      'Google Ads',
      'HubSpot CRM',
      'WordPress',
      'Next.js',
      'Tailwind',
      'n8n',
      'ChatGPT / Claude',
    ],
    skillsLabel: 'Compétences',
    items: [
      'SEO on-page',
      'SEO local',
      'Content marketing',
      'Web analytics',
      'Reporting KPI',
      'Acquisition digitale',
      'Growth marketing',
      'Marketing ops',
      'Workflows IA',
      'Social media',
    ],
  },
  education: {
    heading: 'Formation',
    items: [
      {
        degree: 'Master 2 Marketing digital',
        school: 'INSEEC MSc',
        period: '2023 – 2024',
        detail: 'Mémoire : « L’impact de la digitalisation sur la performance des TPE/PME »',
      },
      { degree: 'Master 1 Marketing digital', school: 'INSEEC MSc', period: '2022 – 2023' },
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
    body: 'Disponible pour un CDI a Lyon, Paris ou en remote. Reponse sous 24 heures.',
    emailCta: 'Écrire un mail',
    linkedinCta: 'Profil LinkedIn',
    pdfCta: 'Télécharger le CV',
  },
}

// English ────────────────────────────────────────────────────────────────────

const en: CvContent = {
  identity: {
    name: 'Maurice Timsit',
    role: 'Digital marketing · SEO · Analytics · AI and automation',
    availability: 'Open to full-time roles',
    location: 'Lyon · Paris · Remote',
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
    body: 'Execution-focused digital marketing profile: SEO, content, tracking and reporting. I use AI daily to research, ship faster, analyse data and automate workflows. The five projects below are live, clickable and verifiable.',
  },
  stats: [
    { value: '+48%', label: 'organic traffic in one year, Fondation France-Israël' },
    { value: '525,000', label: 'Search Console impressions over the period' },
    { value: '+340%', label: 'organic traffic, best client result' },
    { value: '12+', label: 'websites shipped since 2022' },
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
        name: 'Fondation France-Israël',
        context: 'Public-interest foundation · Paris',
        role: 'Digital marketing manager',
        headline: '+48% organic traffic, 7,682 clicks',
        bullets: [
          'SEO and analytics ownership: +48% traffic, 525,000 Search Console impressions, 7,682 organic clicks.',
          'Content production and editorial coordination: +40% engagement, 30% less production time using AI.',
          'Monthly GA4 and Search Console reporting, with SEO and editorial recommendations.',
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
        headline: '+180% impressions in 5 months, +30% leads',
        bullets: [
          'Built the site for a demolition company operating across Auvergne-Rhône-Alpes.',
          'Local SEO strategy: +180% Search Console impressions in five months.',
          '+30% inbound requests over the same period.',
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
        headline: 'Rank 1 on « audioprothésiste Cannes » in 3 months',
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
    heading: 'Experience',
    items: [
      {
        role: 'Digital marketing manager',
        org: 'Fondation France-Israël',
        period: 'Jan 2024 → present',
        bullets: [
          'SEO and analytics ownership: +48% traffic, 525,000 Search Console impressions, 7,682 organic clicks.',
          'Content production and editorial coordination: +40% engagement, 30% less production time using AI.',
          'Monthly GA4 and Search Console reporting, SEO and content recommendations.',
        ],
      },
      {
        role: 'Independent digital consultant',
        org: 'Freelance / 123Digital',
        period: '2022 → present',
        note: 'Fondation France-Israël · Rhône Déconstruction · A+ Audition · Clim69',
        bullets: [
          'Best result: +340% organic traffic, conversion up 2.5x, 12+ sites shipped.',
          'Rhône Déconstruction: +180% Search Console impressions in five months, +30% leads.',
          'A+ Audition: rank 1 locally on « audioprothésiste Cannes » within three months.',
        ],
      },
      {
        role: 'Project and social media coordinator',
        org: 'Chabad On Campus',
        period: 'Feb 2017 → present',
        note: 'freelance',
        bullets: [
          'Ran events for up to 500 attendees: scoping, budget, execution.',
          'Social media: reach doubled, +25% sign-ups, 1,000 Instagram and TikTok followers.',
          'Acquisition funnel: engagement from 2.1% to 5.4%.',
        ],
      },
    ],
  },
  skills: {
    heading: 'Skills and tools',
    toolsLabel: 'Tools',
    tools: [
      'GA4',
      'Search Console',
      'Tag Manager',
      'Looker Studio',
      'Google Ads',
      'HubSpot CRM',
      'WordPress',
      'Next.js',
      'Tailwind',
      'n8n',
      'ChatGPT / Claude',
    ],
    skillsLabel: 'Skills',
    items: [
      'On-page SEO',
      'Local SEO',
      'Content marketing',
      'Web analytics',
      'KPI reporting',
      'Digital acquisition',
      'Growth marketing',
      'Marketing ops',
      'AI workflows',
      'Social media',
    ],
  },
  education: {
    heading: 'Education',
    items: [
      {
        degree: 'MSc Digital Marketing, year 2',
        school: 'INSEEC MSc',
        period: '2023 – 2024',
        detail: 'Thesis: "The impact of digitalisation on the performance of small businesses"',
      },
      { degree: 'MSc Digital Marketing, year 1', school: 'INSEEC MSc', period: '2022 – 2023' },
      { degree: 'BSc Marketing and Sales', school: 'Montpellier Management', period: '2020 – 2021' },
      { degree: 'Two-year sales diploma (BTS NDRC)', school: 'CNED', period: '2018 – 2020' },
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
    body: 'Open to a permanent role in Lyon, Paris or remote. I reply within 24 hours.',
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
