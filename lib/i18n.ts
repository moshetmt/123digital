export type Locale = 'fr' | 'en'

export const dict = {
  fr: {
    // ── Header ──
    nav: {
      services:     'Services',
      realisations: 'Réalisations',
      about:        'À propos',
      blog:         'Blog',
      contact:      'Contact',
      home:         'Accueil',
      cta:          'Audit gratuit',
      lang:         'EN',
      langHref:     '/en',
    },
    // ── Hero ──
    hero: {
      badge:       'Disponible — Q2 2026',
      line1:       'Un expert. Une stratégie.',
      line2:       'Des résultats.',
      byline:      '123 Digital — Par M. Timsit',
      description: 'Consultant digital à Lyon — je transforme votre présence en machine à clients : site web, SEO, publicité et automatisation pour attirer du trafic qualifié et convertir.',
      cta:         'Audit gratuit',
      footnote:    '* Sites · SEO · Ads · Branding · Social · Automatisation',
      stats: [
        { prefix: '+', value: 50,  suffix: '',  label: 'PME accompagnées' },
        { prefix: '+', value: 47,  suffix: '%', label: 'trafic moyen' },
        { prefix: '',  value: 100, suffix: '%', label: 'livrés en délais' },
      ],
    },
    // ── About ──
    about: {
      tagline:     'Fondateur 123 Digital',
      heading:     ['Pas une agence.', 'Un expert dédié.'],
      body:        "Basé à Lyon, j'accompagne des TPE, PME et entrepreneurs de la région Auvergne-Rhône-Alpes qui veulent une présence digitale qui travaille pour eux. Pas de grande agence, pas de junior qui apprend sur votre budget — vous avez un interlocuteur unique, qui connaît votre dossier et qui est investi dans vos résultats.",
      cta:         'Découvrir mon parcours',
    },
    // ── Services ──
    services: {
      label:    'Ce que je fais',
      heading1: 'Des services pensés',
      heading2: 'pour croître.',
      cta:      'Voir tous les services',
    },
    // ── Results ──
    results: {
      label:    'Résultats',
      heading:  'Des résultats concrets, pas des promesses.',
      cta:      'Voir les réalisations',
    },
    // ── Portfolio ──
    portfolio: {
      label:    'Cas clients',
      heading1: 'Ce que ça donne',
      heading2: 'en vrai.',
      cta:      'Tous les projets',
    },
    // ── Process ──
    process: {
      label:    'Comment ça marche',
      heading:  'Un processus en quatre actes.',
      steps: [
        { num: '01', title: 'Audit',         desc: 'Analyse complète de votre présence digitale, de vos concurrents et de vos opportunités. Gratuit, sans engagement.' },
        { num: '02', title: 'Stratégie',     desc: "Plan d'action priorisé selon votre secteur, votre budget et vos objectifs. Pas de modèle générique — une vraie feuille de route." },
        { num: '03', title: 'Exécution',     desc: 'Mise en œuvre rapide et itérative. Chaque action est mesurée, ajustée et optimisée en continu pour maximiser votre ROI.' },
        { num: '04', title: 'Croissance',    desc: 'Reporting mensuel transparent avec les métriques qui comptent vraiment. Vous savez exactement ce que vous obtenez pour chaque euro investi.' },
      ],
    },
    // ── FAQ ──
    faq: {
      label:   'FAQ',
      heading: 'Vous avez des questions ? J\'ai les réponses.',
    },
    // ── CTA ──
    cta: {
      heading:     'Parlons de votre croissance.',
      sub:         'Un audit gratuit de 30 minutes pour commencer. Pas de jargon, pas de promesses irréalistes — juste un plan concret.',
      namePlaceholder:   'Votre prénom',
      emailPlaceholder:  'Votre email',
      companyPlaceholder:'Votre entreprise',
      messagePlaceholder:'Contexte, objectifs, délais…',
      submit:      'Envoyer le message',
      phone:       'Préférez appeler ?',
      phoneCta:    'Appeler maintenant',
    },
    // ── Zones ──
    zones: {
      label:   'Zone d\'intervention',
      heading: 'Toute la région',
      sub:     'En distanciel',
      body:    'Basé à Lyon, j\'interviens sur toute la région Auvergne-Rhône-Alpes et en remote partout en France.',
    },
    // ── Footer ──
    footer: {
      tagline:  'Consultant digital à Lyon — SEO, Ads, Sites web & Automatisation.',
      links:    ['Services', 'Réalisations', 'Blog', 'Contact'],
      legal:    'Mentions légales',
      rights:   'Tous droits réservés.',
    },
    // ── Réalisations ──
    realisations: {
      title:       'Portfolio — Réalisations clients en croissance digitale | 123 Digital',
      description: 'Découvrez les résultats concrets obtenus pour des PME et TPE : SEO, création de site web, Google Ads, branding et automatisation.',
      badge:       'Réalisations clients',
      heading1:    'Des résultats,',
      heading2:    'pas des promesses.',
      intro:       "Chaque projet présenté ici est un vrai cas client, avec de vraies métriques. Pas de captures d'écran retouchées, pas de résultats exceptionnels non reproductibles.",
      results:     'Résultats',
      tags:        'Tags',
      yourProject: 'Votre projet ici',
      auditCta:    'Audit gratuit 30 min →',
      ctaHeading:  'Votre entreprise pourrait être dans cette liste.',
      ctaBody:     "Un audit gratuit de 30 minutes pour commencer. Pas de jargon, pas de promesses irréalistes — juste un plan d'action adapté à votre situation.",
      ctaBtn:      'Démarrer mon projet',
      stats: [
        { chiffre: '60+',  label: 'Projets réalisés' },
        { chiffre: '8 ans', label: "D'expérience" },
        { chiffre: '94%',  label: 'Clients satisfaits' },
        { chiffre: '×3,5', label: 'ROAS moyen campagnes Ads' },
      ],
    },
    // ── Contact ──
    contact: {
      badge:   'Contact',
      heading: 'Démarrons votre projet.',
      callBtn: 'Appeler maintenant',
      emailBtn:'Envoyer un email',
    },
    // ── Audit ──
    audit: {
      badge:   'Audit gratuit',
      heading: 'Analysons votre présence digitale.',
      callBtn: 'Appeler maintenant',
    },
  },

  en: {
    // ── Header ──
    nav: {
      services:     'Services',
      realisations: 'Case Studies',
      about:        'About',
      blog:         'Blog',
      contact:      'Contact',
      home:         'Home',
      cta:          'Free Audit',
      lang:         'FR',
      langHref:     '/',
    },
    // ── Hero ──
    hero: {
      badge:       'Available — Q2 2026',
      line1:       'One expert. One strategy.',
      line2:       'Real results.',
      byline:      '123 Digital — By M. Timsit',
      description: 'Digital consultant based in Lyon — I turn your online presence into a client-generating machine: websites, SEO, advertising and automation to attract qualified traffic and convert.',
      cta:         'Free Audit',
      footnote:    '* Websites · SEO · Ads · Branding · Social · Automation',
      stats: [
        { prefix: '+', value: 50,  suffix: '',  label: 'SMEs supported' },
        { prefix: '+', value: 47,  suffix: '%', label: 'avg traffic growth' },
        { prefix: '',  value: 100, suffix: '%', label: 'delivered on time' },
      ],
    },
    // ── About ──
    about: {
      tagline:     'Founder of 123 Digital',
      heading:     ['Not an agency.', 'A dedicated expert.'],
      body:        "Based in Lyon, I work with small businesses and entrepreneurs across the Auvergne-Rhône-Alpes region who want a digital presence that actually works. No big agency overhead, no junior learning on your budget — one dedicated contact who knows your business and is invested in your results.",
      cta:         'My background',
    },
    // ── Services ──
    services: {
      label:    'What I do',
      heading1: 'Services built',
      heading2: 'to grow.',
      cta:      'All services',
    },
    // ── Results ──
    results: {
      label:    'Results',
      heading:  'Real results, not empty promises.',
      cta:      'See case studies',
    },
    // ── Portfolio ──
    portfolio: {
      label:    'Client cases',
      heading1: 'What it looks like',
      heading2: 'in practice.',
      cta:      'All projects',
    },
    // ── Process ──
    process: {
      label:    'How it works',
      heading:  'A process in four acts.',
      steps: [
        { num: '01', title: 'Audit',     desc: 'Full analysis of your digital presence, competitors and growth opportunities. Free, no commitment.' },
        { num: '02', title: 'Strategy',  desc: 'Prioritised action plan tailored to your sector, budget and goals. No generic template — a real roadmap.' },
        { num: '03', title: 'Execution', desc: 'Fast and iterative implementation. Every action is measured, adjusted and continuously optimised to maximise your ROI.' },
        { num: '04', title: 'Growth',    desc: 'Monthly transparent reporting with the metrics that actually matter. You know exactly what you get for every euro invested.' },
      ],
    },
    // ── FAQ ──
    faq: {
      label:   'FAQ',
      heading: 'Got questions? I have answers.',
    },
    // ── CTA ──
    cta: {
      heading:     "Let's talk about your growth.",
      sub:         'A free 30-minute audit to get started. No jargon, no unrealistic promises — just a concrete plan.',
      namePlaceholder:   'Your first name',
      emailPlaceholder:  'Your email',
      companyPlaceholder:'Your company',
      messagePlaceholder:'Context, goals, timeline…',
      submit:      'Send message',
      phone:       'Prefer to call?',
      phoneCta:    'Call now',
    },
    // ── Zones ──
    zones: {
      label:   'Service area',
      heading: 'All of France',
      sub:     'Remote-friendly',
      body:    'Based in Lyon, I work across the Auvergne-Rhône-Alpes region and remotely anywhere in France.',
    },
    // ── Footer ──
    footer: {
      tagline:  'Digital consultant in Lyon — SEO, Ads, Websites & Automation.',
      links:    ['Services', 'Case Studies', 'Blog', 'Contact'],
      legal:    'Legal notice',
      rights:   'All rights reserved.',
    },
    // ── Réalisations ──
    realisations: {
      title:       'Case Studies — Client Results | 123 Digital',
      description: 'Real results for real businesses: SEO, web design, Google Ads, branding and automation.',
      badge:       'Client work',
      heading1:    'Real results,',
      heading2:    'not promises.',
      intro:       "Every project here is a real client case with real metrics. No retouched screenshots, no cherry-picked exceptional results.",
      results:     'Results',
      tags:        'Tags',
      yourProject: 'Your project here',
      auditCta:    'Free 30-min audit →',
      ctaHeading:  'Your business could be on this list.',
      ctaBody:     "A free 30-minute audit to get started. No jargon, no unrealistic promises — just an action plan tailored to your situation.",
      ctaBtn:      'Start my project',
      stats: [
        { chiffre: '60+',  label: 'Projects delivered' },
        { chiffre: '8 yrs', label: 'Experience' },
        { chiffre: '94%',  label: 'Happy clients' },
        { chiffre: '×3.5', label: 'Avg Ads ROAS' },
      ],
    },
    // ── Contact ──
    contact: {
      badge:   'Contact',
      heading: "Let's start your project.",
      callBtn: 'Call now',
      emailBtn:'Send an email',
    },
    // ── Audit ──
    audit: {
      badge:   'Free Audit',
      heading: "Let's analyse your digital presence.",
      callBtn: 'Call now',
    },
  },
} as const

export type Dict = typeof dict['fr']
export function t(locale: Locale): Dict {
  return dict[locale] as unknown as Dict
}
