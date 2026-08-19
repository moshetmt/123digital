import { BASE_URL } from '@/lib/schema'

/**
 * hreflang : declaration des versions linguistiques.
 *
 * 🔴 AUJOURD'HUI CE MODULE N'EMET RIEN, ET C'EST VOULU. Voir `EN_INDEXABLE`.
 *
 * ÉTAT CONSTATÉ LE 19/08/2026, avant d'ecrire une ligne :
 *   - les 8 pages `/en` sont en `noindex, nofollow`, par une decision explicite
 *     du layout `app/en/layout.tsx` (« exclues de l'index pour eviter la
 *     cannibalisation des pages FR ») ;
 *   - 5 de ces 8 pages n'ont AUCUN H1 ;
 *   - 3 font moins de 300 mots (222, 182 et 101) ;
 *   - `/en` a recu 1 impression en 90 jours ;
 *   - le layout `/en` declarait deja `alternates.languages`, mais ca ne sortait
 *     JAMAIS dans le HTML : chaque page enfant redefinit `alternates`, ce qui
 *     ecrase l'objet du layout en entier. Verifie, 0 occurrence de `hreflang`
 *     sur les 210 pages fabriquees.
 *
 * 🔑 POURQUOI ON NE POSE PAS hreflang MAINTENANT.
 * Google exige que la cible d'un hreflang soit **indexable**. Une paire dont un
 * cote est en `noindex` est purement et simplement ignoree. Poser hreflang vers
 * `/en` aujourd'hui produirait donc du balisage mort, et surtout ca donnerait
 * l'illusion que le sujet est traite.
 *
 * L'ORDRE CORRECT, si l'operateur decide d'ouvrir la version anglaise :
 *   1. donner un H1 unique aux 5 pages qui n'en ont pas ;
 *   2. etoffer les 3 pages sous 300 mots ;
 *   3. corriger la canonical de `/en/portfolio`, qui pointe aujourd'hui vers la
 *      page d'accueil FRANCAISE : une canonical inter-langue supprime la page
 *      de l'index a elle seule ;
 *   4. retirer le `noindex` du layout `/en` ;
 *   5. **et seulement la**, passer `EN_INDEXABLE` a `true` ci-dessous.
 * hreflang est la DERNIERE etape, jamais la premiere.
 *
 * CE QUE CE MODULE GARANTIT quand il est actif, et qui sont les trois pieges
 * qui font echouer un hreflang :
 *   - **auto-reference** : chaque page se cite elle-meme dans son propre
 *     groupe. Sans ca, Google ignore TOUT le groupe.
 *   - **reciprocite** : les deux cotes sont derives de la meme table `PAIRES`,
 *     donc A pointe vers B si et seulement si B pointe vers A. Une paire
 *     unilaterale est jetee.
 *   - **x-default** : pointe vers le francais, marche principale.
 */

// ⛔ Ne passer a `true` qu'apres les etapes 1 a 4 ci-dessus. Le mettre a `true`
// avec `/en` encore en `noindex` ne casse rien, mais ne sert a rien non plus.
export const EN_INDEXABLE = false

/**
 * Les seules pages qui existent dans les deux langues. Une page absente d'ici
 * n'a pas de jumelle et ne doit porter AUCUN hreflang : les ~200 pages
 * geographiques francaises sont dans ce cas.
 */
const PAIRES: ReadonlyArray<readonly [string, string]> = [
  ['/', '/en'],
  ['/a-propos', '/en/about'],
  ['/audit-gratuit', '/en/audit'],
  ['/blog', '/en/blog'],
  ['/contact', '/en/contact'],
  ['/realisations', '/en/realisations'],
  ['/services', '/en/services'],
]

function absolu(chemin: string): string {
  return chemin === '/' ? BASE_URL : `${BASE_URL}${chemin}`
}

/**
 * À etaler dans le `alternates` d'une page :
 *   alternates: { canonical: `${BASE_URL}/services`, ...languesPour('/services') }
 *
 * Rend un objet vide tant que `EN_INDEXABLE` est faux, ou si le chemin n'a pas
 * de jumelle. Aucun appelant n'a donc a connaitre l'etat de la version anglaise.
 */
export function languesPour(chemin: string): { languages?: Record<string, string> } {
  if (!EN_INDEXABLE) return {}
  const paire = PAIRES.find(([fr, en]) => fr === chemin || en === chemin)
  if (!paire) return {}
  const [fr, en] = paire
  return {
    languages: {
      fr: absolu(fr),
      en: absolu(en),
      'x-default': absolu(fr),
    },
  }
}
