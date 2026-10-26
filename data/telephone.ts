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
}

const SITES: Record<string, string> = {
  'mishpacha-tours': '/images/realisations/mishpacha-tours-telephone.webp',
  clim69: '/images/realisations/clim69-telephone.webp',
  'aplus-audition': '/images/realisations/aplusaudition-telephone.webp',
}

const INSTA = 'https://www.instagram.com/chabadoncampuslyon/'
const H = '/images/realisations/habad/'
const HABAD: Omit<Ecran, 'href' | 'lien'>[] = [
  { id: 'habad-cours-lundi', titre: 'Story · Cours du lundi', secteur: 'Habad Étudiants Lyon', src: `${H}cours-lundi.webp` },
  { id: 'habad-reel-critique', titre: 'Reel · Critique gastronomique', secteur: 'Habad Étudiants Lyon', src: `${H}critique.jpg`, video: `${H}critique.mp4` },
  { id: 'habad-farbrengen', titre: 'Story · Farbrengen', secteur: 'Habad Étudiants Lyon', src: `${H}farbrengen.webp` },
  { id: 'habad-bbq', titre: 'Story · BBQ de rentrée', secteur: 'Habad Étudiants Lyon', src: `${H}bbq.webp` },
  { id: 'habad-roch-hachana', titre: 'Story · Roch Hachana', secteur: 'Habad Étudiants Lyon', src: `${H}roch-hachana.webp` },
  { id: 'habad-reel-soukka', titre: 'Reel · Soirée soukka', secteur: 'Habad Étudiants Lyon', src: `${H}soukka-reel.jpg`, video: `${H}soukka-reel.mp4` },
  { id: 'habad-lausanne', titre: 'Story · Shabbat à Lausanne', secteur: 'Habad Étudiants Lyon', src: `${H}lausanne.webp` },
  { id: 'habad-tsedaka', titre: 'Story · Tsedaka', secteur: 'Habad Étudiants Lyon', src: `${H}tsedaka.webp` },
  { id: 'habad-soukka', titre: 'Story · Soukka complet', secteur: 'Habad Étudiants Lyon', src: `${H}soukka.webp` },
  { id: 'habad-ohel', titre: 'Story · Chez le Rabbi', secteur: 'Habad Étudiants Lyon', src: `${H}ohel.webp` },
]

export const ecrans: Ecran[] = [
  ...projects
    .filter((p) => p.url && SITES[p.id])
    .map((p) => ({ id: p.id, titre: p.title, secteur: p.sector, src: SITES[p.id], href: p.url!, lien: 'site' as const })),
  ...HABAD.map((e) => ({ ...e, href: INSTA, lien: 'instagram' as const })),
]
