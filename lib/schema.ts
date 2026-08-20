export const BASE_URL = 'https://123digital.fr'

// ─── Primitive union for strict JSON-LD typing ──────────────────────────────

type JsonLdPrimitive = string | number | boolean | null
type JsonLdValue = JsonLdPrimitive | JsonLdObject | JsonLdValue[]
type JsonLdObject = { [key: string]: JsonLdValue }

// ─── Shared domain types ─────────────────────────────────────────────────────

export interface FAQ {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  /** Relative path, e.g. "/services/seo" */
  path: string
}

export interface ServiceSchemaParams {
  name: string
  description: string
  /** Relative path, e.g. "/services/seo" */
  path: string
}

export interface CreativeWorkParams {
  name: string
  description: string
  /** Relative path */
  path: string
  image?: string
  dateCreated?: string
  keywords?: string[]
}

export interface ArticleParams {
  title: string
  description: string
  /** Relative path */
  path: string
  datePublished: string
  dateModified?: string
  image?: string
}

// ─── Person ──────────────────────────────────────────────────────────────────

export function personSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Maurice Timsit',
    alternateName: 'Moshé Timsit',
    url: BASE_URL,
    jobTitle: 'Expert en croissance digitale',
    description:
      'Expert en croissance digitale pour PME et entrepreneurs en France. Spécialiste SEO, création de sites web, publicité en ligne, branding et automatisation marketing.',
    image: `${BASE_URL}/images/og-image.png`,
    worksFor: {
      '@type': 'Organization',
      name: '123 Digital',
      url: BASE_URL,
    },
    knowsAbout: [
      'SEO',
      'Référencement naturel',
      'Création de sites web',
      'Publicité en ligne',
      'Google Ads',
      'Meta Ads',
      'Community Management',
      'Branding',
      'Automatisation marketing',
      'Stratégie digitale',
      'Croissance pour PME',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Consultant en croissance digitale',
      occupationLocation: {
        '@type': 'Country',
        name: 'France',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.linkedin.com/in/mauricetimsit/',
    ],
  }
}

// ─── LocalBusiness ───────────────────────────────────────────────────────────

export function localBusinessSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#business`,
    name: '123 Digital',
    alternateName: '123digital',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.svg`,
    image: `${BASE_URL}/images/og-image.png`,
    description:
      'Consultant en croissance digitale à Lyon pour PME et entrepreneurs. SEO, création de sites web, publicité en ligne, branding, community management et automatisation marketing.',
    founder: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Maurice Timsit',
    },
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lyon',
      addressRegion: 'Auvergne-Rhône-Alpes',
      postalCode: '69000',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.7640,
      longitude: 4.8357,
    },
    areaServed: [
      { '@type': 'City', name: 'Lyon' },
      { '@type': 'City', name: 'Villeurbanne' },
      { '@type': 'City', name: 'Caluire-et-Cuire' },
      { '@type': 'City', name: 'Bron' },
      { '@type': 'State', name: 'Auvergne-Rhône-Alpes' },
      { '@type': 'Country', name: 'France' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de croissance digitale',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Création de site web' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO — Référencement naturel' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Publicité en ligne' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & identité visuelle' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Community Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatisation marketing' } },
      ],
    },
    priceRange: '€€',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'French',
      url: `${BASE_URL}/contact`,
    },
  }
}

// ─── WebSite + SiteLinksSearchBox ────────────────────────────────────────────

export function webSiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: '123 Digital — Maurice Timsit',
    url: BASE_URL,
    description:
      'Portfolio et site vitrine de Maurice Timsit, expert en croissance digitale pour PME et entrepreneurs en France.',
    inLanguage: 'fr-FR',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── Service page ─────────────────────────────────────────────────────────────

export function serviceSchema({ name, description, path }: ServiceSchemaParams): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE_URL}${path}`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#business`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    inLanguage: 'fr-FR',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}${path}`,
    },
  }
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────

export function faqPageSchema(faqs: FAQ[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, path }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `${BASE_URL}${path}`,
    })),
  }
}

// ─── CreativeWork (portfolio project) ────────────────────────────────────────

export function creativeWorkSchema({
  name,
  description,
  path,
  image,
  dateCreated,
  keywords,
}: CreativeWorkParams): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: `${BASE_URL}${path}`,
    ...(image && { image: `${BASE_URL}${image}` }),
    ...(dateCreated && { dateCreated }),
    ...(keywords && { keywords: keywords.join(', ') }),
    creator: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
    },
    inLanguage: 'fr-FR',
  }
}

// ─── ContactPage ─────────────────────────────────────────────────────────────

export function contactPageSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact — 123 Digital',
    url: `${BASE_URL}/contact`,
    description:
      'Contactez Maurice Timsit pour discuter de votre projet digital. Réponse sous 24h.',
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#business`,
    },
    inLanguage: 'fr-FR',
  }
}

// ─── Article (blog) ──────────────────────────────────────────────────────────

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: ArticleParams): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}${path}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(image && { image: `${BASE_URL}${image}` }),
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#business`,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.svg`,
      },
    },
    inLanguage: 'fr-FR',
  }
}

// ─── Audit page (standalone offer) ───────────────────────────────────────────

export function auditPageSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Audit digital gratuit',
    url: `${BASE_URL}/audit-gratuit`,
    description:
      'Audit digital gratuit de 30 minutes pour identifier pourquoi votre site ne génère pas de clients. Analyse SEO, UX, publicité et stratégie.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#business`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
  }
}
