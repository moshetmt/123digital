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
    // ── Barre de confiance + callbar ──
    header: {
      trustLocation: 'Lyon & Auvergne-Rhône-Alpes',
      trustProof:    '50+ entreprises accompagnées',
      trustSince:    'depuis 2017',
      trustReply:    'Réponse sous 24h',
    },
    callBar: {
      label: 'Appeler',
    },
    // ── Hero ──
    hero: {
      h1:              'Vos clients vous cherchent sur Google. Faites-vous trouver.',
      sub:             'Sites web, référencement et publicité en ligne pour les artisans, commerces et PME. Un interlocuteur unique à Lyon, des résultats mesurés chaque mois, expliqués sans jargon.',
      ctaCall:         'Appeler maintenant',
      // Libelles courts : sur telephone, les deux boutons ne tiennent cote a
      // cote qu a cette longueur. Au-dela de 640 px on revient aux longs.
      ctaCallShort:    'Appeler',
      ctaQuote:        'Demander un devis gratuit',
      ctaQuoteShort:   'Devis gratuit',
      check1:          'Un seul interlocuteur, zéro sous-traitance',
      check2:          'Devis clair avant tout engagement',
      check3:          'Résultats mesurés chaque mois',
      statusCity:      'Lyon · Villeurbanne',
      statusLive:      'En direct',
      statusOpen:      'Ouvert',
      statusClosed:    'Fermé',
      statusOpenNote:  'On répond maintenant · réponse sous 24h',
      statusClosedNote:'Laissez un message · rappel sous 24h',
      statusHours:     'Nos vraies disponibilités, pas une promesse de façade : fermé du vendredi après-midi au samedi soir, disponible le reste de la semaine.',
    },
    // ── About ──
    about: {
      label:   'Expert croissance digitale',
      heading: 'Votre interlocuteur : Maurice Timsit',
      body:    "Consultant en marketing digital à Lyon, Master 2 Marketing Digital (INSEEC). J'accompagne les PME depuis 2017 : sites, Google, publicité, automatisation. Vous me parlez à moi, du premier appel au reporting mensuel.",
    },
    // ── Services ──
    services: {
      label:         'Services',
      heading:       "Ce qu'on peut faire pour votre entreprise",
      sub:           'Six métiers, une seule logique : que votre téléphone sonne.',
      familyAttract: 'Attirer des clients',
      familyConvert: 'Transformer les visiteurs en clients',
      learnMore:     'En savoir plus',
    },
    // ── Results ──
    results: {
      label: 'Résultats',
    },
    // ── Portfolio ──
    portfolio: {
      label:   'Cas clients',
      heading: 'Des résultats réels, vérifiables en ligne',
      cta:     'Tous les projets',
    },
    // ── Process ──
    process: {
      label:   'Méthode',
      heading: 'Du premier appel aux résultats',
    },
    // ── FAQ ──
    faq: {
      label:   'FAQ',
      heading: 'Vous avez des questions ? J\'ai les réponses.',
    },
    // ── CTA ──
    cta: {
      heading:          'Parlons de votre entreprise',
      sub:              "Votre prénom, un moyen de vous joindre, votre besoin. Je vous rappelle sous 24h avec un premier avis honnête : parfois, la bonne réponse est « vous n'avez pas besoin de moi ».",
      altPhone:         'Vous préférez parler tout de suite ?',
      firstName:        'Prénom',
      emailLabel:       'Email professionnel',
      phoneLabel:       'Téléphone',
      contactLabel:     'Email ou téléphone',
      contactHint:      'un des deux suffit',
      needLabel:        'Votre besoin',
      needPH:           'Choisir',
      submit:           'Être rappelé sous 24h',
      sending:          'Envoi en cours…',
      sendError:        "L'envoi a échoué. Réessayez dans un instant.",
      successTitle:     'Demande reçue.',
      reassurance1:     'Devis gratuit',
      reassurance2:     'Sans engagement',
      reassurance3:     'Réponse sous 24h',
    },
    // ── Zones ──
    zones: {
      label:      "Zone d'intervention",
      heading:    'À Lyon, et partout en France à distance',
      franceWide: 'France entière à distance',
    },
    // ── Footer ──
    footer: {
      tagline:       'Marketing digital pour PME : sites, référencement, publicité en ligne. Lyon & Auvergne-Rhône-Alpes.',
      servicesTitle: 'Services',
      resultsTitle:  'Résultats',
      contactTitle:  'Contact',
      rights:        'Tous droits réservés.',
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
    // ── Réalisations (refonte 18/08, densité + conversion) ──
    caseStudiesPage: {
      sectionHeading: 'Trois secteurs, la même méthode.',
      sectionSub:     "Chaque résultat est vérifiable en ligne, sur le site du client.",
      sameResultCta:  'Obtenir le même résultat',
      finalHeading:   'Votre entreprise pourrait être la prochaine.',
      finalBody:      "Un audit gratuit de 30 minutes pour commencer. Pas de jargon, pas de promesses irréalistes, juste un plan d'action adapté à votre situation.",
      finalCtaBtn:    'Démarrer mon projet',
    },
    // ── Portfolio / Fondateur (refonte 18/08) ──
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
    // ── Trust bar + callbar ──
    header: {
      trustLocation: 'Lyon & Auvergne-Rhône-Alpes region',
      trustProof:    '50+ businesses supported',
      trustSince:    'since 2017',
      trustReply:    'Reply within 24h',
    },
    callBar: {
      label: 'Call',
    },
    // ── Hero ──
    hero: {
      h1:              'Your customers are searching for you on Google. Get found.',
      sub:             'Websites, SEO and online advertising for tradespeople, shops and SMEs. One dedicated contact in Lyon, results measured every month, explained without jargon.',
      ctaCall:         'Call now',
      ctaCallShort:    'Call',
      ctaQuote:        'Request a free quote',
      ctaQuoteShort:   'Free quote',
      check1:          'One dedicated contact, zero subcontracting',
      check2:          'Clear quote before any commitment',
      check3:          'Results measured every month',
      statusCity:      'Lyon · Villeurbanne',
      statusLive:      'Live',
      statusOpen:      'Open',
      statusClosed:    'Closed',
      statusOpenNote:  'Answering now · reply within 24h',
      statusClosedNote:'Leave a message · callback within 24h',
      statusHours:     "Real availability, not a facade promise: closed from Friday afternoon to Saturday evening, available the rest of the week.",
    },
    // ── About ──
    about: {
      label:   'Digital growth expert',
      heading: 'Your contact: Maurice Timsit',
      body:    "Digital marketing consultant in Lyon, Master's in Digital Marketing (INSEEC). I've supported SMEs since 2017: websites, Google, advertising, automation. You talk to me directly, from the first call to the monthly report.",
    },
    // ── Services ──
    services: {
      label:         'Services',
      heading:       'What I can do for your business',
      sub:           'Six specialities, one logic: making your phone ring.',
      familyAttract: 'Attract clients',
      familyConvert: 'Turn visitors into clients',
      learnMore:     'Learn more',
    },
    // ── Results ──
    results: {
      label: 'Results',
    },
    // ── Portfolio ──
    portfolio: {
      label:   'Client cases',
      heading: 'Real results, verifiable online',
      cta:     'All projects',
    },
    // ── Process ──
    process: {
      label:   'Method',
      heading: 'From the first call to results',
    },
    // ── FAQ ──
    faq: {
      label:   'FAQ',
      heading: 'Got questions? I have answers.',
    },
    // ── CTA ──
    cta: {
      heading:          "Let's talk about your business",
      sub:              "Your first name, a way to reach you, what you need. I'll call you back within 24h with an honest first opinion: sometimes the right answer is “you don't need me”.",
      altPhone:         'Prefer to talk right away?',
      firstName:        'First name',
      emailLabel:       'Professional email',
      phoneLabel:       'Phone',
      contactLabel:     'Email or phone',
      contactHint:      'either one is fine',
      needLabel:        'Your need',
      needPH:           'Choose',
      submit:           'Get a callback within 24h',
      sending:          'Sending…',
      sendError:        'Something went wrong. Please try again in a moment.',
      successTitle:     'Request received.',
      reassurance1:     'Free quote',
      reassurance2:     'No commitment',
      reassurance3:     'Reply within 24h',
    },
    // ── Zones ──
    zones: {
      label:      'Service area',
      heading:    'Based in Lyon, and everywhere in France remotely',
      franceWide: 'All of France, remote',
    },
    // ── Footer ──
    footer: {
      tagline:       'Digital marketing for SMEs: websites, SEO, online advertising. Lyon & Auvergne-Rhône-Alpes.',
      servicesTitle: 'Services',
      resultsTitle:  'Results',
      contactTitle:  'Contact',
      rights:        'All rights reserved.',
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
    // ── Case studies (rebuild 18/08, density + conversion) ──
    caseStudiesPage: {
      sectionHeading: 'Three sectors, one method.',
      sectionSub:     "Every result below is verifiable online, on the client's own site.",
      sameResultCta:  'Get the same result',
      finalHeading:   'Your business could be next.',
      finalBody:      'A free 30 minute audit to get started. No jargon, no unrealistic promises, just an action plan tailored to your situation.',
      finalCtaBtn:    'Start my project',
    },
    // ── Portfolio / Founder (rebuild 18/08) ──
  },
} as const

export type Dict = typeof dict['fr']
export function t(locale: Locale): Dict {
  return dict[locale] as unknown as Dict
}
