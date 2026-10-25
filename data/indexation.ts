/**
 * Quelles pages geographiques restent indexables.
 *
 * 🔴 FICHIER GENERE, ne pas editer a la main.
 * Source : `_seo-decision-indexation.csv`, lui-meme derive de Search Console.
 * Regenere par le script de decision quand on remesure.
 *
 * POURQUOI. Au 19/08/2026, le site publiait 168 pages geographiques pour
 * **5 clics en 90 jours**. 131 d'entre elles sont passees en `noindex` :
 * elles etaient indexees par Google et jamais montrees, ce qui est le
 * comportement normal face a des pages qui se ressemblent a 77 %.
 *
 * REGLE APPLIQUEE, verifiable ligne par ligne dans le CSV :
 *   1. gardee si >= 30 impressions sur 90 jours ;
 *   2. la page ville parente d'une page ville x service gardee est gardee
 *      aussi, sinon on desindexe le seul lien interne qui y menait ;
 *   3. tout le reste passe en `noindex`. **Aucune page n'est supprimee** : une
 *      page desindexee se re-indexe, une page supprimee se re-ecrit.
 *
 * Les 37 pages gardees couvrent **88,5 % des impressions** et 2 des 3 clics.
 * Le clic perdu est sur /nice, 8 impressions en 90 jours.
 *
 * ⚠️ `follow` reste a `true`. Le site fait 200 pages, tres loin d'un enjeu de
 * budget d'exploration, et laisser circuler le maillage protege les pages
 * gardees pendant que Google reevalue. A rebasculer si le site grossit.
 */

// Genere le 19/08/2026.
// 25/10/2026, decision de l'operateur (etude du 25/10) : les 13 pages hors Auvergne-Rhone-Alpes
// encore gardees (Paris, Marseille, Toulouse, Bordeaux, Nantes, Rennes) passent en noindex :
// 1 148 impressions et 1 clic en 90 jours, axe geographique arrete le 20/08. Retirees a la main ;
// une regeneration depuis le CSV ne doit pas les remettre.
export const PAGES_INDEXABLES: ReadonlySet<string> = new Set([
  '/albertville',
  '/albertville/creation-site-web',
  '/annecy',
  '/annecy/creation-site-web',
  '/annemasse',
  '/annemasse/seo',
  '/bourg-en-bresse',
  '/bourg-en-bresse/community-management',
  '/clermont-ferrand',
  '/clermont-ferrand/publicite-en-ligne',
  '/lyon',
  '/lyon/branding',
  '/macon',
  '/macon/seo',
  '/oyonnax',
  '/oyonnax/community-management',
  '/oyonnax/publicite-en-ligne',
  '/roanne',
  '/roanne/seo',
  '/saint-etienne',
  '/saint-etienne/community-management',
  '/saint-etienne/creation-site-web',
  '/valence',
  '/valence/automatisation-marketing',
])

/** Une page geographique non listee ci-dessus ne doit ni etre indexee, ni
 *  figurer au sitemap. Les deux doivent suivre la meme liste, sans quoi on
 *  declare a Google une page qu'on lui demande d'ignorer. */
export function estIndexable(chemin: string): boolean {
  return PAGES_INDEXABLES.has(chemin)
}
