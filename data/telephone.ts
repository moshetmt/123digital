import { projects } from '@/data/portfolio'

// Ecrans de l'iPhone des realisations de /portfolio : les sites (captures
// telephone du 26/10/2026) puis les stories et reels faits pour Habad
// Etudiants Lyon (demande de Moshe du 27/10, « mes designs sur les iPhone »).
export type Ecran = {
  id: string
  titre: string
  secteur: string
  src: string
  video?: string
  href: string
  lien: 'site' | 'instagram'
  court?: string
}

const SITES: Record<string, string> = {
  'mishpacha-tours': '/images/realisations/mishpacha-tours-telephone.webp',
  clim69: '/images/realisations/clim69-telephone.webp',
  'aplus-audition': '/images/realisations/aplusaudition-telephone.webp',
}

const INSTA = 'https://www.instagram.com/chabadoncampuslyon/'
const H = '/images/realisations/habad/'
const HABAD: Omit<Ecran, 'href' | 'lien'>[] = [
  { id: 'habad-cours-lundi', court: 'Cours lundi', titre: 'Story · Cours du lundi', secteur: 'Habad Étudiants Lyon', src: `${H}cours-lundi.webp` },
  { id: 'habad-reel-critique', court: 'Reel resto', titre: 'Reel · Critique gastronomique', secteur: 'Habad Étudiants Lyon', src: `${H}critique.jpg`, video: `${H}critique.mp4` },
  { id: 'habad-farbrengen', court: 'Farbrengen', titre: 'Story · Farbrengen', secteur: 'Habad Étudiants Lyon', src: `${H}farbrengen.webp` },
  { id: 'habad-bbq', court: 'BBQ', titre: 'Story · BBQ de rentrée', secteur: 'Habad Étudiants Lyon', src: `${H}bbq.webp` },
  { id: 'habad-roch-hachana', court: 'Roch Hachana', titre: 'Story · Roch Hachana', secteur: 'Habad Étudiants Lyon', src: `${H}roch-hachana.webp` },
  { id: 'habad-reel-soukka', court: 'Reel soukka', titre: 'Reel · Soirée soukka', secteur: 'Habad Étudiants Lyon', src: `${H}soukka-reel.jpg`, video: `${H}soukka-reel.mp4` },
  { id: 'habad-lausanne', court: 'Lausanne', titre: 'Story · Shabbat à Lausanne', secteur: 'Habad Étudiants Lyon', src: `${H}lausanne.webp` },
  { id: 'habad-tsedaka', court: 'Tsedaka', titre: 'Story · Tsedaka', secteur: 'Habad Étudiants Lyon', src: `${H}tsedaka.webp` },
  { id: 'habad-soukka', court: 'Soukka', titre: 'Story · Soukka complet', secteur: 'Habad Étudiants Lyon', src: `${H}soukka.webp` },
  { id: 'habad-ohel', court: 'Chez le Rabbi', titre: 'Story · Chez le Rabbi', secteur: 'Habad Étudiants Lyon', src: `${H}ohel.webp` },
]

// L'iPhone ne montre que les sites ; les designs Habad ont leur section en
// stories facon Instagram (choix de Moshe du 27/10).
export const ecrans: Ecran[] = projects
  .filter((p) => p.url && SITES[p.id])
  .map((p) => ({ id: p.id, titre: p.title, secteur: p.sector, src: SITES[p.id], href: p.url!, lien: 'site' as const }))

export const designs: Ecran[] = HABAD.map((e) => ({ ...e, href: INSTA, lien: 'instagram' as const }))
