export type ServiceIconName =
  | 'Globe'
  | 'Search'
  | 'Target'
  | 'Palette'
  | 'Users'
  | 'Zap'

export interface ServiceData {
  id: string
  title: string
  shortDesc: string
  description: string
  icon: ServiceIconName
  href: string
}

const servicesFR: ServiceData[] = [
  {
    id: 'creation-site-web',
    title: 'Création de site web',
    shortDesc: 'Des sites qui convertissent.',
    description: 'Sites web performants, rapides et conçus pour transformer vos visiteurs en clients qualifiés.',
    icon: 'Globe',
    href: '/services/creation-site-web',
  },
  {
    id: 'seo',
    title: 'SEO & Référencement',
    shortDesc: 'Soyez trouvé sur Google.',
    description: 'Stratégies SEO sur mesure pour positionner votre entreprise en tête des résultats de recherche.',
    icon: 'Search',
    href: '/services/seo',
  },
  {
    id: 'publicite-en-ligne',
    title: 'Publicité en ligne',
    shortDesc: 'Clients qualifiés sur demande.',
    description: 'Campagnes Google Ads et Meta Ads optimisées pour un retour sur investissement maximal.',
    icon: 'Target',
    href: '/services/publicite-en-ligne',
  },
  {
    id: 'branding',
    title: 'Branding & Identité',
    shortDesc: "Une image qui marque les esprits.",
    description: "Création d'identité visuelle cohérente et mémorable pour vous différencier durablement.",
    icon: 'Palette',
    href: '/services/branding',
  },
  {
    id: 'community-management',
    title: 'Community Management',
    shortDesc: 'Une audience engagée.',
    description: 'Gestion professionnelle de vos réseaux sociaux pour bâtir une communauté fidèle et qualifiée.',
    icon: 'Users',
    href: '/services/community-management',
  },
  {
    id: 'automatisation-marketing',
    title: 'Automatisation Marketing',
    shortDesc: 'Votre marketing en pilote auto.',
    description: "Systèmes d'automatisation pour nourrir vos prospects et convertir sans effort manuel.",
    icon: 'Zap',
    href: '/services/automatisation-marketing',
  },
]

const servicesEN: ServiceData[] = [
  {
    id: 'creation-site-web',
    title: 'Website Design',
    shortDesc: 'Sites that convert.',
    description: 'Fast, high-performing websites designed to turn visitors into qualified leads.',
    icon: 'Globe',
    href: '/services/creation-site-web',
  },
  {
    id: 'seo',
    title: 'SEO & Search',
    shortDesc: 'Get found on Google.',
    description: 'Tailored SEO strategies to rank your business at the top of search results.',
    icon: 'Search',
    href: '/services/seo',
  },
  {
    id: 'publicite-en-ligne',
    title: 'Online Advertising',
    shortDesc: 'Qualified clients on demand.',
    description: 'Optimised Google Ads and Meta Ads campaigns for maximum return on investment.',
    icon: 'Target',
    href: '/services/publicite-en-ligne',
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    shortDesc: 'An image that sticks.',
    description: 'Consistent, memorable visual identity to set your business apart for the long term.',
    icon: 'Palette',
    href: '/services/branding',
  },
  {
    id: 'community-management',
    title: 'Social Media Management',
    shortDesc: 'An engaged audience.',
    description: 'Professional management of your social channels to build a loyal, qualified community.',
    icon: 'Users',
    href: '/services/community-management',
  },
  {
    id: 'automatisation-marketing',
    title: 'Marketing Automation',
    shortDesc: 'Your marketing on autopilot.',
    description: 'Automation systems to nurture prospects and convert without manual effort.',
    icon: 'Zap',
    href: '/services/automatisation-marketing',
  },
]

export const services = servicesFR

export function getServices(lang: 'fr' | 'en'): ServiceData[] {
  return lang === 'en' ? servicesEN : servicesFR
}
