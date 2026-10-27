import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BASE_URL, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'
import Image from 'next/image'
import { NoteGoogle } from '@/components/sections/NoteGoogle'
import { ProchainCreneau } from '@/components/sections/ProchainCreneau'

// Page « consultant SEO Lyon » validée par l'opérateur le 25/10/2026 (étude du 25/10).
// Demande : « consultant seo lyon » 1 300 recherches/mois, concurrence faible (Keyword Planner,
// France, 25/10). Intention : une PERSONNE indépendante, pas une agence.
// Ne cannibalise pas : /services/seo (le service, ses formules), /consultant-digital-lyon
// (généraliste : site, pub, SEO), /referencement-ia (être cité par les IA).
// Prix : /services/seo et 00-brief/offering.md (audit SEO à partir de 500 €, accompagnement
// à partir de 450 €/mois, engagement 3 mois). Aucun chiffre client nommé (décision du 20/08).

const PATH = '/consultant-seo-lyon'
const TITLE = 'Consultant SEO à Lyon, indépendant | 123 Digital'
const DESCRIPTION =
  'Maurice Timsit, consultant SEO indépendant à Lyon : vous parlez à la personne qui fait le travail. Fiche Google, pages, suivi Search Console. Audit gratuit 30 min.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${BASE_URL}${PATH}` },
}

const faqs = [
  {
    q: 'Pourquoi un consultant SEO plutôt qu’une agence à Lyon ?',
    a: 'Avec un consultant, la personne qui vous répond au téléphone est celle qui travaille sur votre site. Une agence ajoute un chef de projet entre vous et le travail, ce qui se justifie pour un gros site e-commerce ou plusieurs marques. Pour un artisan, un commerce ou une PME lyonnaise, un consultant suffit dans la grande majorité des cas.',
  },
  {
    q: 'Combien coûte un consultant SEO à Lyon ?',
    a: 'L’audit de 30 minutes est gratuit. Un audit SEO complet démarre à 500 €, l’accompagnement mensuel à 450 € par mois avec un engagement de 3 mois. Le détail est sur la page du service SEO.',
  },
  {
    q: 'En combien de temps mon entreprise apparaît-elle sur Google à Lyon ?',
    a: 'Comptez 3 à 6 mois selon la concurrence sur votre métier et votre quartier. La fiche Google bouge souvent plus tôt que le site. Je ne garantis aucune position : je vous montre chaque mois l’évolution dans Search Console.',
  },
  {
    q: 'Faut-il une page par arrondissement ou par commune de la Métropole ?',
    a: 'Seulement là où vous travaillez vraiment et où vous avez quelque chose à raconter : des chantiers, des clients, des photos. Des pages identiques où seul le nom du quartier change sont traitées comme des doublons par Google.',
  },
  {
    q: 'Le référencement sur Google suffit-il, maintenant que les gens demandent à ChatGPT ?',
    a: 'C’est la base : ChatGPT et les réponses IA de Google cherchent sur le web avant de répondre, et un site absent de Google a peu de chances d’être cité. Le travail pour être cité dans ChatGPT, Gemini et les réponses IA de Google s’ajoute ensuite, il est détaillé sur la page référencement IA.',
  },
]

const h2Style = { fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }
const pClass = 'text-base leading-relaxed mb-4'
const pStyle = { color: 'var(--ink-2)' }

export default function ConsultantSeoLyonPage() {
  const jsonLd = [
    {
      ...serviceSchema({
        name: 'Consultant SEO à Lyon',
        description:
          'Référencement naturel et SEO local pour les artisans, commerces et PME de Lyon et de la Métropole, par un consultant indépendant.',
        path: PATH,
      }),
      areaServed: [
        { '@type': 'City', name: 'Lyon' },
        { '@type': 'AdministrativeArea', name: 'Métropole de Lyon' },
      ],
    },
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Consultant SEO à Lyon', path: PATH },
    ]),
    faqPageSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
  ]

  return (
    <>
      <JsonLd schema={jsonLd} />

      <PageBanner
        icone="search"
        title="Consultant SEO à Lyon"
        highlight="à Lyon"
        // Visage, note Google et créneau daté au premier écran (étude concurrents du 25/10,
        // validée par l'opérateur). Photo entière en vignette 4:5, jamais recadrée.
        breadcrumb={
          <div className="inline-flex items-center gap-3" style={{ textAlign: 'left' }}>
            <Image
              src="/images/maurice-timsit-portrait.jpg"
              alt="Maurice Timsit, consultant SEO à Lyon"
              width={48}
              height={60}
              priority
              style={{ width: 48, height: 60, borderRadius: 6, border: '2px solid var(--on-brand)' }}
            />
            <span style={{ fontSize: '0.9rem', lineHeight: 1.35 }}>
              <strong>Maurice Timsit</strong>
              <br />
              Consultant SEO à Lyon depuis 2017
            </span>
          </div>
        }
        sub="Maurice Timsit, consultant SEO indépendant à Lyon. J’aide les artisans, commerces et PME de la Métropole à être trouvés sur Google, et je fais le travail moi-même."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/services/seo">Formules et tarifs</BannerCtaLine>
          </>
        }
      >
        <div className="mt-4 flex flex-col items-center gap-2">
          <ProchainCreneau />
          <NoteGoogle tone="vert" />
        </div>
      </PageBanner>

      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem 3rem' }}>
        <div className="mx-auto max-w-3xl">
          <p className={pClass} style={{ ...pStyle, color: 'var(--ink)', fontWeight: 600 }}>
            Je suis Maurice Timsit, consultant SEO indépendant à Lyon, et j’accompagne les PME depuis 2017. Quand un client tape votre
            métier et son quartier sur Google, mon travail est que votre entreprise apparaisse, sur la carte et dans
            les résultats. Vous parlez à la personne qui fait le travail, du premier appel au rapport mensuel.
          </p>
          <p className={pClass} style={pStyle}>
            Cette page parle uniquement du référencement. Pour un site neuf, de la publicité ou un accompagnement
            plus large, voir ma page{' '}
            <Link href="/consultant-digital-lyon" className="underline">consultant digital à Lyon</Link>.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Comment vos clients vous cherchent à Lyon
          </h2>
          <p className={pClass} style={pStyle}>
            Un Lyonnais ne tape presque jamais « plombier Lyon » tout court. Il tape son arrondissement, sa commune
            ou « près de chez moi » : « plombier Lyon 7 », « électricien Villeurbanne », « garage Vénissieux ».
            La Métropole dépasse le million d’habitants et chaque secteur a ses propres concurrents. Je commence
            donc par la liste des requêtes réellement tapées sur votre métier, quartier par quartier, et par celles
            qui vous apportent déjà des affichages dans Search Console.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ce que je travaille, dans l’ordre
          </h2>
          <ol className="list-decimal pl-6 mb-4 space-y-3" style={pStyle}>
            <li>
              <strong>La fiche Google.</strong> C’est elle qui s’affiche sur la carte, au-dessus des sites.
              Catégories, zone de service, services, photos, avis et réponses aux avis. Si elle est suspendue ou
              absente de Maps, lisez{' '}
              <Link href="/problemes/fiche-google-suspendue-ou-invisible" className="underline">
                fiche Google suspendue ou invisible
              </Link>.
            </li>
            <li>
              <strong>Les pages du site.</strong> Une page par métier ou service qui compte, avec les mots que vos
              clients tapent, puis une page par secteur seulement quand vous y avez des chantiers à montrer.
            </li>
            <li>
              <strong>La technique.</strong> Pages indexées, vitesse sur téléphone, balises, sitemap. Je vérifie
              dans Search Console page par page, jamais à l’œil.
            </li>
            <li>
              <strong>Les liens et les mentions.</strong> Annuaires sérieux, partenaires, presse locale. Pas
              d’achat de liens en masse.
            </li>
          </ol>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Des sites réels, vérifiables
          </h2>
          <p className={pClass} style={pStyle}>
            Je ne publie que des projets en ligne que vous pouvez ouvrir. Par exemple le site et la fiche Google
            d’un spécialiste de la climatisation de la région lyonnaise, raconté étape par étape dans{' '}
            <Link href="/realisations/clim69" className="underline">l’étude de cas Clim69</Link>, ou la refonte
            d’un centre auditif dans{' '}
            <Link href="/realisations/aplus-audition" className="underline">l’étude de cas A+ Audition</Link>.
            Tous les projets sont sur la page{' '}
            <Link href="/realisations" className="underline">réalisations</Link>.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Prix et engagement
          </h2>
          <p className={pClass} style={pStyle}>
            Le premier échange est un audit gratuit de 30 minutes. Un audit SEO complet démarre à 500 €.
            L’accompagnement mensuel démarre à 450 € par mois, avec un engagement de 3 mois. Chaque
            mois vous recevez un rapport tiré de Search Console : positions, clics, demandes reçues, et ce que je
            fais le mois suivant. Les formules sont détaillées sur la page{' '}
            <Link href="/services/seo" className="underline">SEO et référencement</Link>.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ce que je ne promets pas
          </h2>
          <p className={pClass} style={pStyle}>
            Je ne garantis ni la première place ni un nombre de visites : personne ne peut le faire honnêtement.
            Je ne publie pas de pages en série et je n’achète pas de liens. Je vous dis, requête par requête, ce
            qui est jouable et en combien de temps.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Et les réponses de ChatGPT ?
          </h2>
          <p className={pClass} style={pStyle}>
            Une partie de vos clients pose maintenant la question à ChatGPT ou lit la réponse IA en haut de Google.
            Ces réponses s’appuient sur ce que les moteurs trouvent sur le web : votre site, vos avis, les sites qui
            parlent de vous. Le SEO reste donc la base, et le travail pour être cité par les IA s’ajoute
            ensuite : voir{' '}
            <Link href="/referencement-ia" className="underline">référencement IA</Link>.
          </p>
        </div>
      </section>

      <section className="bg-background" style={{ backgroundColor: 'var(--surface-3)',  padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display font-extrabold mb-10" style={h2Style}>
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="rounded p-6"
                style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)' }}
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
