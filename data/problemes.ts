import type { BlogSection } from './blog'

/**
 * Pages « problème × métier » : une page = une requête chaude, formulée comme la
 * personne la tape le jour où ça lui pose problème (stratégie du 20/08/2026).
 * Preuves admises : cas anonymisés sourcés et méthode. Jamais de chiffre client nommé.
 */
export type FamilleProbleme = 'panne' | 'argent' | 'reputation' | 'projet'

export interface PageProbleme {
  slug: string
  famille: FamilleProbleme
  /** Requête cible, telle qu'on la tape. */
  requete: string
  /** Balise title, 55 à 60 caractères, sans le suffixe de marque. */
  title: string
  /** Meta description, 150 à 160 caractères. */
  description: string
  /** H1. */
  titre: string
  /** Réponse directe en tête de page, 2 à 3 phrases. */
  reponse: string
  datePublication: string
  dateModification?: string
  tempsLecture: number
  contenu: BlogSection[]
  /** Sources officielles citées, avec URL complète. Section « Sources » en bas de page, absente si vide. */
  sources?: Array<{ label: string; url: string }>
  /** Maillage interne proposé, affiché en fin de page. */
  liens: { label: string; href: string }[]
}

export const famillesLabels: Record<FamilleProbleme, string> = {
  panne: 'Quelque chose ne marche plus',
  argent: "De l'argent qui part",
  reputation: 'Réputation',
  projet: 'Un projet à lancer',
}

import { page as siteDisparuGoogle } from './problemes/mon-site-n-apparait-plus-sur-google'
import { page as nouveauSiteInvisible } from './problemes/nouveau-site-invisible-sur-google'
import { page as siteLentMobile } from './problemes/mon-site-est-lent-sur-mobile'
import { page as adsNeRapportentRien } from './problemes/mes-google-ads-ne-rapportent-rien'
import { page as agenceSansResultat } from './problemes/je-paie-une-agence-sans-resultat'
import { page as concurrentSurMonNom } from './problemes/un-concurrent-apparait-sur-mon-nom'
import { page as avisGoogleNegatif } from './problemes/avis-google-negatif-ou-faux-que-faire'
import { page as ficheGoogleSuspendue } from './problemes/fiche-google-suspendue-ou-invisible'
import { page as formulaireSansDemandes } from './problemes/je-ne-recois-plus-les-demandes-de-mon-site'
import { page as siteArtisanDepannage } from './problemes/site-internet-artisan-depannage-qui-fait-appeler'

export const problemes: PageProbleme[] = [
  // Ordre d'affichage : par famille, la panne d'abord.
  siteDisparuGoogle,
  nouveauSiteInvisible,
  siteLentMobile,
  ficheGoogleSuspendue,
  formulaireSansDemandes,
  adsNeRapportentRien,
  agenceSansResultat,
  concurrentSurMonNom,
  avisGoogleNegatif,
  siteArtisanDepannage,
]

export function getProblemeBySlug(slug: string): PageProbleme | undefined {
  return problemes.find((p) => p.slug === slug)
}
