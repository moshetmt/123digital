import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BASE_URL, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

// Page « référencement IA / GEO » demandée par l'opérateur le 25/10/2026 (« consultant SEO IA,
// on doit créer une page et être l'expert »). Page nationale, pas géographique (règle du 12/10).
// Demande (Keyword Planner, France, 25/10) : geo seo 2 900, agence geo 1 600, seo ia 480,
// référencement ia 390, consultant geo 210, référencement chatgpt 170, « consultant seo ia » : 0.
// SERP du 25/10 : « geo seo » = Generative Engine Optimization (pas le SEO local).
// Ne cannibalise pas /consultant-ia-lyon (projets IA, automatisation, formation).
// Aucun résultat client revendiqué : 123digital n'est pas encore cité sur les questions
// commerciales (mesure openseo du 23/10). Chiffres d'études = sources visibles en bas de page.

const PATH = '/referencement-ia'
const TITLE = 'Référencement IA et GEO : être cité par ChatGPT | 123 Digital'
const DESCRIPTION =
  'Référencement IA (GEO) : comment ChatGPT, Gemini et les réponses IA de Google choisissent les entreprises qu’ils citent, et la méthode pour y entrer. Audit gratuit.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${BASE_URL}${PATH}` },
}

const SOURCES = [
  { label: 'Ahrefs, « 1 mois d’AI Overviews en France et déjà −23,1 % de taux de clics », 2026', href: 'https://ahrefs.com/fr/blog/baisse-clics-ai-overviews-france/' },
  { label: 'Zarla, « AI Visibility Index », août 2026 (1 851 entreprises locales)', href: 'https://www.zarla.com/guides/ai-visibility-index' },
  { label: 'LYVIA, « Baromètre 2026 : 37,7 % des PME françaises sont invisibles pour l’IA », août 2026', href: 'https://lyv-ia.com/articles/barometre-visibilite-ia-pme-2026' },
  { label: 'Leptidigital, étude Similarweb sur les marques citées par ChatGPT', href: 'https://www.leptidigital.fr/webmarketing/seo/etude-geo-marques-citees-chatgpt-plus-de-visites-90829/' },
  { label: 'Journal du Net, « GEO : comment suivre et optimiser sa visibilité IA »', href: 'https://www.journaldunet.com/seo/1555503-geo-comment-suivre-et-optimiser-sa-visibilite-ia/' },
]

const faqs = [
  {
    q: 'Qu’est-ce que le référencement IA, ou GEO ?',
    a: 'Le GEO (Generative Engine Optimization) est le travail qui fait citer votre entreprise dans les réponses de ChatGPT, Gemini, Perplexity et des réponses IA de Google. Le SEO vise une place dans la liste des résultats ; le GEO vise une place dans la réponse écrite par l’IA.',
  },
  {
    q: 'Le GEO remplace-t-il le SEO ?',
    a: 'Non. ChatGPT et les réponses IA de Google cherchent sur le web avant de répondre, et s’appuient sur les pages que les moteurs connaissent. Un site absent de Google a peu de chances d’être lu. Et même bien placé, rien n’est acquis : dans l’étude Zarla d’août 2026, moins de la moitié des entreprises déjà dans les 20 premiers résultats Google étaient citées par une IA.',
  },
  {
    q: 'Peut-on payer pour être recommandé par ChatGPT ?',
    a: 'Non, il n’existe pas d’emplacement payant dans une réponse de ChatGPT à une question comme « quel est le meilleur consultant à Lyon ». Ce qui fait la différence : votre place sur Google, vos avis, les sites tiers qui parlent de vous et des pages qui répondent exactement à la question posée.',
  },
  {
    q: 'Comment savoir si ChatGPT parle de mon entreprise ?',
    a: 'On pose les questions de vos clients, toujours les mêmes, à plusieurs IA, plusieurs fois, et on note qui est cité et sur quelles sources. Une seule réponse ne prouve rien : les IA changent de réponse d’un jour à l’autre. Je fais ce relevé chaque semaine pour mes clients.',
  },
  {
    q: 'Combien de temps pour être cité par une IA ?',
    a: 'Il faut d’abord que Google vous classe et que d’autres sites parlent de vous, ce qui prend plusieurs mois. Les corrections techniques, comme laisser les robots des IA lire votre site, se font en un jour. Je ne garantis aucune citation : je mesure et je vous montre l’évolution.',
  },
]

const h2Style = { fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }
const pClass = 'text-base leading-relaxed mb-4'
const pStyle = { color: 'var(--ink-2)' }

export default function ReferencementIaPage() {
  const jsonLd = [
    serviceSchema({
      name: 'Référencement IA (GEO)',
      description:
        'Visibilité d’une entreprise dans les réponses de ChatGPT, Gemini, Perplexity et des réponses IA de Google : mesure, technique, contenu, avis et mentions tierces.',
      path: PATH,
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Référencement IA', path: PATH },
    ]),
    faqPageSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
  ]

  return (
    <>
      <JsonLd schema={jsonLd} />

      <PageBanner
        icone="search"
        title="Référencement IA : être cité par ChatGPT, Gemini et Google"
        highlight="ChatGPT, Gemini et Google"
        sub="Vos clients posent la question à une IA avant d’ouvrir un site. Je mesure ce que les IA répondent sur votre métier, et je travaille pour que votre entreprise fasse partie de la réponse."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/consultant-seo-lyon">Le SEO d’abord</BannerCtaLine>
          </>
        }
      />

      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem 3rem' }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm mb-6" style={{ color: 'var(--ink-3, var(--ink-2))' }}>
            Par Maurice Timsit, consultant SEO à Lyon. Mis à jour le 25 octobre 2026.
          </p>
          <p className={pClass} style={{ ...pStyle, color: 'var(--ink)', fontWeight: 600 }}>
            Le référencement IA, ou GEO, consiste à faire citer votre entreprise dans les réponses de ChatGPT,
            Gemini, Perplexity et des réponses IA affichées en haut de Google. Une IA ne cite pas au hasard : elle
            reprend des entreprises déjà visibles sur Google, souvent notées, et dont d’autres sites parlent. Mon
            travail consiste à mesurer ce que les IA répondent sur votre métier, puis à corriger ce qui vous en
            écarte.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ce qui a changé en France depuis juillet 2026
          </h2>
          <p className={pClass} style={pStyle}>
            Google affiche ses réponses IA en France depuis le 22 juillet 2026. Ahrefs a suivi 963 sites français :
            sur ceux dont plus d’un cinquième des requêtes déclenchent une réponse IA, le taux de clic médian a
            baissé de 23,1 % en neuf jours. Sur l’ensemble du panel, la baisse médiane des clics est de 8,8 %, et
            de 12,3 % pour les sites en .fr. Être en première page compte toujours, mais une partie des clients lit
            la réponse et ne clique plus.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Comment une IA choisit les entreprises qu’elle cite
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-3" style={pStyle}>
            <li>
              <strong>Il faut déjà être sur Google.</strong> L’étude Zarla d’août 2026 a interrogé ChatGPT et Google
              AI Mode sur 1 851 entreprises locales, toutes dans les 20 premiers résultats Google de leur métier et
              de leur ville. Moins de la moitié (43,65 %) ont été citées par au moins une des deux IA.
            </li>
            <li>
              <strong>Le nombre d’avis départage.</strong> Dans la même étude, les entreprises citées avaient une
              médiane de 444 avis Google, contre 192 pour les autres. La note, elle, ne départage presque pas : 4,9
              contre 4,8.
            </li>
            <li>
              <strong>Une IA ne répond pas comme l’autre.</strong> Seules 9,8 % des entreprises étaient citées par
              les deux IA à la fois. Mesurer sur un seul outil ne dit rien des autres.
            </li>
            <li>
              <strong>Être cité amène des visites, souvent par Google.</strong> D’après Similarweb, une marque citée
              par ChatGPT a 2,5 fois plus de chances d’être visitée dans la semaine, et plus de la moitié de ces
              visites passent par une recherche du nom sur Google. Votre nom doit donc vous retrouver sans confusion.
            </li>
          </ul>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ce que j’ai mesuré sur mon propre site
          </h2>
          <p className={pClass} style={pStyle}>
            Je teste la méthode sur 123 Digital avant de la vendre. Le 23 octobre 2026, j’ai posé six questions à
            ChatGPT et Gemini. Sur les questions génériques (« meilleure agence Google Ads à Lyon », « consultant IA
            à Lyon »), 123 Digital n’apparaît pas : le site est jeune et peu cité ailleurs. Sur la question qui
            reprend exactement les mots de mes pages (consultant digital indépendant à Lyon pour un artisan qui veut
            un site, du référencement, Google Ads et sa fiche Google), ChatGPT me cite en deuxième position sur
            quatre. Le mécanisme est là : une IA retrouve la page qui répond mot pour mot à la question. Le reste
            du travail, c’est la place sur Google, les avis et les mentions.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ma méthode en cinq étapes
          </h2>
          <ol className="list-decimal pl-6 mb-4 space-y-3" style={pStyle}>
            <li>
              <strong>Mesurer.</strong> Une liste fixe de questions que vos clients posent, sur ChatGPT, Gemini,
              Perplexity et les réponses IA de Google. Je note qui est cité et quelles sources l’IA utilise.
            </li>
            <li>
              <strong>Laisser les IA lire votre site.</strong> Robots des IA autorisés, pages indexées par Google,
              fichier llms.txt, données structurées (FAQ, entreprise, personne) cohérentes avec votre fiche Google.
            </li>
            <li>
              <strong>Répondre aux questions avec leurs mots.</strong> Une page par question qui compte, avec la
              réponse dans les deux premières phrases, vos services nommés, votre ville et des faits vérifiables.
            </li>
            <li>
              <strong>Faire parler de vous ailleurs.</strong> Avis Google réguliers, annuaires que les IA citent,
              classements, partenaires. La plupart des sources qu’une IA cite ne sont pas le site de l’entreprise.
            </li>
            <li>
              <strong>Suivre chaque semaine.</strong> Les réponses changent vite. Je relance les mêmes questions et
              je vous montre l’évolution, sans conclure sur une seule réponse.
            </li>
          </ol>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Prix
          </h2>
          <p className={pClass} style={pStyle}>
            L’audit gratuit de 30 minutes inclut un premier relevé : ce que deux IA répondent aujourd’hui sur votre
            métier et votre ville. Le travail GEO se fait ensuite avec l’accompagnement SEO, qui démarre à 450 € par
            mois (voir{' '}
            <Link href="/services/seo" className="underline">SEO et référencement</Link>), devis précis après
            l’audit. Pour des projets d’intelligence artificielle dans votre entreprise (automatisation, formation),
            voir plutôt{' '}
            <Link href="/consultant-ia-lyon" className="underline">consultant IA à Lyon</Link>.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ce que je ne promets pas
          </h2>
          <p className={pClass} style={pStyle}>
            Personne ne contrôle la réponse d’une IA. Je ne garantis aucune citation et je ne vends pas de « place
            dans ChatGPT ». Je mesure, je corrige ce qui vous écarte des réponses, et je vous montre chaque semaine
            ce qui a bougé.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Sources
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-sm" style={pStyle}>
            {SOURCES.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener" className="underline">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display font-extrabold mb-10" style={h2Style}>
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="rounded p-6"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
