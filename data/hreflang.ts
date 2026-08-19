import { BASE_URL } from '@/lib/schema'

/**
 * hreflang : declaration des versions linguistiques.
 *
 * ✅ ACTIF DEPUIS LE 19/08/2026. Six paires reciproques, verifiees.
 *
 * CE QU'ON A TROUVE EN ARRIVANT, et qui explique pourquoi rien ne marchait :
 *   - le layout racine declarait `languages: { 'fr-FR': BASE_URL }`, ce qui
 *     FUYAIT sur toute page sans `alternates` propre, si bien que /portfolio
 *     annoncait que sa version francaise etait la page d'accueil ;
 *   - ce meme layout disait `fr-FR` la ou les pages /en disaient `fr`, pour la
 *     MEME URL : deux codes pour une page suffisent a faire jeter le groupe ;
 *   - les 6 pages francaises jumelles ne declaraient rien en retour, et une
 *     paire ou un seul cote parle est ignoree ;
 *   - la page d'accueil n'avait aucun `alternates` propre ;
 *   - aucun `x-default` nulle part ;
 *   - et surtout, les 8 pages `/en` etaient en `noindex`, donc cibles
 *     non indexables : Google ignore un hreflang qui pointe vers elles.
 *
 * CE QU'IL A FALLU FAIRE AVANT D'ACTIVER, dans cet ordre :
 *   1. un `h1` et une introduction propres sur les 4 pages qui n'en avaient pas
 *      (`PageHeroEn`), ce qui les fait passer de 182-251 a 251-428 mots ;
 *   2. retirer le `noindex` global du layout `/en` ;
 *   3. **et seulement la**, passer `EN_INDEXABLE` a `true`.
 * hreflang est la DERNIERE etape, jamais la premiere.
 *
 * ⚠️ CE QUI RESTE VOLONTAIREMENT FERME : `/en/blog` garde son `noindex` et n'a
 * pas de paire, ses 9 articles etant tous en francais. Et les deux pages
 * `/portfolio` du groupe `(cv)` sont des pages privees, `noindex` par consigne
 * explicite dans leur propre fichier : ne pas les rouvrir.
 *
 * CE QUE CE MODULE GARANTIT, et qui sont les trois pieges
 * qui font echouer un hreflang :
 *   - **auto-reference** : chaque page se cite elle-meme dans son propre
 *     groupe. Sans ca, Google ignore TOUT le groupe.
 *   - **reciprocite** : les deux cotes sont derives de la meme table `PAIRES`,
 *     donc A pointe vers B si et seulement si B pointe vers A. Une paire
 *     unilaterale est jetee.
 *   - **x-default** : pointe vers le francais, marche principale.
 */

// ⛔ Si on repasse un jour `/en` en `noindex`, remettre ce drapeau a `false`
// dans le meme changement : un hreflang vers une page non indexable est ignore
// par Google, et laisse croire que le sujet est traite.
export const EN_INDEXABLE = true

/**
 * Les seules pages qui existent dans les deux langues. Une page absente d'ici
 * n'a pas de jumelle et ne doit porter AUCUN hreflang : les ~200 pages
 * geographiques francaises sont dans ce cas.
 */
const PAIRES: ReadonlyArray<readonly [string, string]> = [
  ['/', '/en'],
  ['/a-propos', '/en/about'],
  ['/audit-gratuit', '/en/audit'],
  ['/contact', '/en/contact'],
  ['/realisations', '/en/realisations'],
  ['/services', '/en/services'],
  // ⛔ PAS de paire pour le blog. `/en/blog` existe comme page, mais les 9
  // articles de `data/blog.ts` sont tous en francais : le fichier n'a meme pas
  // de champ de langue par article. Une page d'index anglaise qui ne liste que
  // des articles francais est une coquille, et la declarer comme la version
  // anglaise de /blog serait faux. Elle reste en `noindex` tant qu'aucun
  // article n'est traduit. La rajouter ici le jour ou il y en aura.
]

/**
 * Les pages anglaises a declarer au sitemap. Derivees de `PAIRES`, jamais
 * ecrites a la main : une page indexable absente du sitemap et une page au
 * sitemap qui est en `noindex` sont deux facons de se contredire devant Google.
 * `/en/blog` n'y est pas, puisqu'il n'est pas dans `PAIRES`.
 */
export const PAGES_EN_INDEXABLES: readonly string[] = EN_INDEXABLE
  ? PAIRES.map(([, en]) => en)
  : []

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
