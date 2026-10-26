/**
 * Donnees de la page /portfolio et /en/portfolio (gabarit refait le 26/10/2026,
 * colonne fixe a gauche, fond encre).
 *
 * Page en `noindex`, absente du sitemap et non liee depuis le Header ou le
 * Footer. Ne pas l'y ajouter.
 *
 * Les realisations viennent de `data/portfolio.ts` (meme source que l'accueil
 * et /realisations). Ce fichier ne porte que les textes propres a la page et la
 * traduction anglaise des realisations.
 *
 * Decisions du 26/10/2026 : Fondation France-Israel retiree, 123 Digital en
 * premier, plus aucun chiffre invérifiable (le bandeau +48 %, 525 000, +340 %,
 * 12+ est supprime). Trois preuves seulement, chacune ouvre sa source.
 */

export type CvLocale = 'fr' | 'en'

export interface CvExperience {
  role: string
  org: string
  period: string
  /** Phrase de cadrage, en italique */
  context?: string
  /** Mention affichee sous l'organisation */
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

/** Traduction d'une realisation de `data/portfolio.ts`, cle = `id`. */
export interface CvProjectText {
  sector: string
  description: string
  results: string
  tags: string[]
}

export interface CvContent {
  identity: {
    name: string
    role: string
    /** Deux lignes de presentation sous le titre, colonne de gauche */
    pitch: string
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
    switchAria: string
    menuLabel: string
    about: string
    proofs: string
    work: string
    experience: string
    contact: string
  }
  intro: {
    body: string
    traitsLabel: string
    /** Nom du profil restitue par le test, mis en avant */
    traitsProfile: string
    /** D'ou vient le profil : sans la source, ces mots se lisent comme de l'auto-evaluation. */
    traitsSource: string
    traitsSourceUrl?: string
    traits: string[]
  }
  proofs: {
    heading: string
    /** `{note}` et `{nombre}` sont remplaces par la valeur de `lib/avis-google.ts` */
    reviewsLabel: string
    reviewsSource: string
    reviewsHref: string
    /** `{n}` est remplace par le nombre de realisations */
    workLabel: string
    workSource: string
    languagesLabel: string
    languagesSource: string
    languagesHref: string
  }
  work: {
    heading: string
    openSite: string
    openInstagram: string
    openCase: string
    resultLabel: string
    /** Absent en francais : les textes de `data/portfolio.ts` sont en francais */
    projects?: Record<string, CvProjectText>
  }
  experience: {
    heading: string
    items: CvExperience[]
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
    phoneCta: string
    pdfCta: string
  }
}

const GOOGLE_FICHE = 'https://maps.google.com/?cid=16644184183429277275'

// Francais ───────────────────────────────────────────────────────────────────

const fr: CvContent = {
  identity: {
    name: 'Maurice Timsit',
    role: 'Consultant en marketing digital freelance · SEO, sites, Google Ads, IA',
    pitch: 'Je fais trouver les PME sur Google : sites rapides, référencement local et publicité suivie à l’appel près.',
    availability: 'Disponible pour de nouveaux projets',
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
    switchAria: 'English version',
    menuLabel: 'Sections de la page',
    about: 'À propos',
    proofs: 'Preuves',
    work: 'Réalisations',
    experience: 'Parcours',
    contact: 'Contact',
  },
  intro: {
    body: 'Je suis consultant en marketing digital à Lyon et je travaille seul, du premier audit jusqu’aux résultats. Je construis des sites rapides sur téléphone, je les fais remonter sur Google et je pilote des campagnes Google Ads où chaque appel est compté. J’utilise l’IA chaque jour pour chercher, produire et automatiser, et chaque réalisation ci-dessous s’ouvre en ligne.',
    traitsLabel: 'Personnalité',
    traitsProfile: 'Profil Promoteur',
    traitsSource: 'Résultat du test AssessFirst',
    traits: ['Proactif', 'Fédérateur', 'Orienté résultats', 'Adaptable', 'Force de proposition'],
  },
  proofs: {
    heading: 'Preuves',
    reviewsLabel: '{note} sur Google, {nombre} avis',
    reviewsSource: 'Ouvrir la fiche Google',
    reviewsHref: GOOGLE_FICHE,
    workLabel: '{n} réalisations en ligne, cliquables',
    workSource: 'Voir les réalisations',
    languagesLabel: 'Un site en 4 langues',
    languagesSource: 'mishpachatours.com',
    languagesHref: 'https://mishpachatours.com',
  },
  work: {
    heading: 'Réalisations',
    openSite: 'Voir le site',
    openInstagram: 'Voir sur Instagram',
    openCase: 'Voir l’étude de cas',
    resultLabel: 'Résultat :',
  },
  experience: {
    heading: 'Parcours',
    items: [
      {
        role: 'Fondateur, consultant web et marketing digital',
        org: '123 Digital',
        period: '2017 → aujourd’hui',
        note: 'Freelance, Lyon',
        bullets: [
          'SEO local et fiche Google : pages, avis et informations tenus à jour pour sortir dans les recherches de la ville.',
          'Sites web avec une page par métier et par ville, rapides sur téléphone.',
          'Google Ads avec les appels et les demandes de devis comptés, pour savoir ce que rapporte chaque euro.',
        ],
      },
      {
        role: 'Coordinateur projets et social media',
        org: 'Chabad On Campus',
        period: 'févr. 2017 → aujourd’hui',
        context:
          'Environnement associatif et bénévole, j’ai professionnalisé la communication digitale et structuré l’acquisition sur le long terme.',
        bullets: [
          'Coordination d’événements étudiants.',
          'Animation des réseaux sociaux Instagram et TikTok.',
          'Coordination terrain et communication autour des inscriptions.',
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
    heading: 'Parlons de votre projet.',
    body: 'Basé à Lyon, disponible pour de nouveaux projets. Réponse sous 24 heures.',
    emailCta: 'Écrire un mail',
    linkedinCta: 'LinkedIn',
    phoneCta: 'Appeler',
    pdfCta: 'Télécharger le CV',
  },
}

// English ────────────────────────────────────────────────────────────────────

const en: CvContent = {
  identity: {
    name: 'Maurice Timsit',
    role: 'Freelance digital marketing consultant · SEO, websites, Google Ads, AI',
    pitch: 'I help small businesses get found on Google: fast websites, local SEO and ads tracked down to the phone call.',
    availability: 'Available for new projects',
    location: 'Lyon, France',
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
    switchAria: 'Version française',
    menuLabel: 'Page sections',
    about: 'About',
    proofs: 'Proof',
    work: 'Work',
    experience: 'Experience',
    contact: 'Contact',
  },
  intro: {
    body: 'I am a digital marketing consultant based in Lyon, working on my own from the first audit to the results. I build websites that load fast on a phone, get them ranking on Google and run Google Ads campaigns where every call is counted. I use AI every day to research, produce and automate, and every project below opens live.',
    traitsLabel: 'Personality',
    traitsProfile: 'Promoter profile',
    traitsSource: 'Result of the AssessFirst assessment',
    traits: ['Proactive', 'Team-builder', 'Results-driven', 'Adaptable', 'Self-starter'],
  },
  proofs: {
    heading: 'Proof',
    reviewsLabel: '{note} on Google, {nombre} reviews',
    reviewsSource: 'Open the Google listing',
    reviewsHref: GOOGLE_FICHE,
    workLabel: '{n} projects live, clickable',
    workSource: 'See the work',
    languagesLabel: 'A website in 4 languages',
    languagesSource: 'mishpachatours.com',
    languagesHref: 'https://mishpachatours.com',
  },
  work: {
    heading: 'Work',
    openSite: 'Visit the site',
    openInstagram: 'See on Instagram',
    openCase: 'Read the case study',
    resultLabel: 'Result:',
    projects: {
      'mishpacha-tours': {
        sector: 'Tourism · Lyon',
        description:
          'Name, logo and a four-language website for a guide who shows Jewish Lyon to families visiting from abroad.',
        results: 'A first tour request from Google the day after launch, with no advertising',
        tags: ['Web build', 'SEO', 'Logo', 'Lyon'],
      },
      clim69: {
        sector: 'Air conditioning · Villeurbanne',
        description: 'Google Ads account built from scratch, site rebuild, 19 local pages, call and quote tracking.',
        results: 'Every euro of advertising returns several, calls and quotes tracked every day',
        tags: ['Google Ads', 'Site rebuild', 'Local SEO', 'Villeurbanne'],
      },
      'aplus-audition': {
        sector: 'Healthcare and hearing aids · Cannes',
        description:
          'Site rebuild and local SEO for a hearing aid practice in Cannes, highlighting reimbursed hearing aids and hearing tests.',
        results: 'Site rebuilt, local SEO structure in place for hearing aid searches in Cannes.',
        tags: ['Local SEO', 'Web build', 'Healthcare', 'Cannes'],
      },
      'habad-etudiants-lyon': {
        sector: 'Student association · Lyon',
        description:
          'Brand guidelines, Instagram carousels and stories, WhatsApp statuses, event sign-up forms and attendee tracking.',
        results: 'A recognizable identity, posts every week, sign-ups tracked',
        tags: ['Instagram', 'Brand guidelines', 'Sign-ups', 'Lyon'],
      },
      mdj17: {
        sector: 'Youth association · Paris 17th',
        description:
          'A logo where the 17 hides in a menorah, Latin and Hebrew typefaces, colors, a compass-drawn flame, stories and a guidelines deck.',
        results: 'An identity kit a designer can read and defend, and stories you recognize at first glance',
        tags: ['Brand guidelines', 'Logo', 'Instagram', 'Paris 17th'],
      },
      'cours-anglais-esthetique': {
        sector: 'Teaching · Vocational high school',
        description:
          'A tool that produces a teacher’s English worksheets for four beauty-care classes: student sheet, teacher notes and test, ready to photocopy in grayscale.',
        results: 'A worksheet requested in one sentence, a PDF ready for the school photocopier',
        tags: ['Custom tool', 'Teaching material', 'English', 'Beauty care'],
      },
      'reels-habad-etudiants-lyon': {
        sector: 'Student association · Lyon',
        description:
          'Filming, editing, subtitles, sound and framing of a student association’s Instagram reels: back-to-school BBQ and a Sukkot street interview.',
        results: 'A 75-second reel at 10,000 views for an account of about 1,000 followers, with no advertising',
        tags: ['Reels', 'Instagram', 'Editing', 'Lyon'],
      },
    },
  },
  experience: {
    heading: 'Experience',
    items: [
      {
        role: 'Founder, web and digital marketing consultant',
        org: '123 Digital',
        period: '2017 → present',
        note: 'Freelance, Lyon',
        bullets: [
          'Local SEO and Google Business Profile: pages, reviews and listing details kept current to show up in local searches.',
          'Websites with one page per trade and per city, fast on a phone.',
          'Google Ads with calls and quote requests counted, to know what every euro brings back.',
        ],
      },
      {
        role: 'Project and Social Media Coordinator',
        org: 'Chabad On Campus',
        period: 'Feb. 2017 → present',
        context:
          'Non-profit volunteer environment: I professionalized digital communications and built a long-term acquisition structure.',
        bullets: [
          'Student event coordination.',
          'Instagram and TikTok management.',
          'Field coordination and communications around registrations.',
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
    heading: 'Let us talk about your project.',
    body: 'Based in Lyon, available for new projects. I reply within 24 hours.',
    emailCta: 'Send an email',
    linkedinCta: 'LinkedIn',
    phoneCta: 'Call',
    pdfCta: 'Download the resume',
  },
}

export const cvContent: Record<CvLocale, CvContent> = { fr, en }

/**
 * Captures propres a cette page, refaites le 26/10/2026 (Playwright, 1440 x 900,
 * bandeau cookies refuse). Les `*-maquette.webp` de `data/portfolio.ts` restent
 * celles de l'accueil et de /realisations : ne pas les ecraser avec ces captures.
 */
export const cvCaptures: Record<string, string> = {
  'mishpacha-tours': '/images/realisations/mishpacha-tours-capture.webp',
  clim69: '/images/realisations/clim69-capture.webp',
  'aplus-audition': '/images/realisations/aplus-audition-capture.webp',
}
