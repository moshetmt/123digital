import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqListe } from '@/components/sections/FaqListe'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { GrilleCartes } from '@/components/sections/Grilles'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { allVilles, villesARA, villeInsights } from '@/data/villes'
import { estIndexable } from '@/data/indexation'
import { services } from '@/data/services'
import { secteurs } from '@/data/secteurs'
import { CTA } from '@/components/sections/CTA'

interface PageProps {
  params: Promise<{ ville: string }>
}

export async function generateStaticParams() {
  return allVilles.map((v) => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ville: villeSlug } = await params
  const ville = allVilles.find((v) => v.slug === villeSlug)
  if (!ville) return {}

  // 🔴 LYON EST UN CAS PARTICULIER, ET C'EST MESURE.
  // Au 19/08, `/lyon` et `/consultant-digital-lyon` portaient un title
  // STRICTEMENT IDENTIQUE. Deux pages pour une requete : Google n'en a choisi
  // aucune, les deux font ZERO impression, et il sert `/bourg-en-bresse` sur
  // 31 requetes lyonnaises a la place.
  // Les donnees montrent deux familles distinctes, toutes deux captees par la
  // mauvaise page : « consultant / cabinet / conseil » et « agence ». On donne
  // donc une page a chacune plutot que de les faire se concurrencer :
  //   /consultant-digital-lyon -> « consultant digital lyon » (URL = requete)
  //   /lyon                    -> « agence digitale lyon », famille qui pese
  //                               `agence transformation digitale lyon`,
  //                               `agence growth hacking lyon`,
  //                               `agence conseil digital lyon`,
  //                               `agence performance digitale lyon`.
  // ⛔ Ne pas realigner les deux titles : c'est precisement ce qui les rendait
  // invisibles.
  const estLyon = villeSlug === 'lyon'
  const title = estLyon
    ? 'Agence digitale Lyon : SEO, site web, Google Ads | 123 Digital'
    // Format court, volontairement. L'ancien, « Consultant Digital {Ville} —
    // Expert Croissance PME | 123 Digital », faisait 72 caracteres sur
    // Bourg-en-Bresse : Google coupait la marque ET une partie du qualificatif.
    // Ici on garde ce que la requete contient vraiment, « consultant digital »
    // plus le nom de la ville, et rien de plus.
    : `Consultant digital à ${ville.nom} | 123 Digital`
  const description = estLyon
    ? 'Agence digitale à Lyon pour PME : référencement, création de site, publicité en ligne et automatisation. Audit gratuit de 30 min, sans engagement.'
    : `Maurice Timsit, expert en croissance digitale à ${ville.nom} : création de site web, SEO, Google Ads et automatisation pour PME. Audit gratuit 30 min, sans engagement.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${villeSlug}` },
    // Les pages geographiques sans demande mesuree sortent de l'index. La liste
    // vient de Search Console, pas d'une intuition : cf. data/indexation.ts.
    // `follow` reste vrai pour ne pas couper le maillage vers les pages gardees.
    ...(estIndexable(`/${villeSlug}`) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${villeSlug}`,
    },
  }
}

export default async function VillePage({ params }: PageProps) {
  const { ville: villeSlug } = await params
  const ville = allVilles.find((v) => v.slug === villeSlug)
  if (!ville) notFound()

  const isARA = villesARA.some((v) => v.slug === ville.slug)
  const insight = villeInsights[ville.slug]

  const faqs = [
    {
      question: `Qu'est-ce qu'un consultant digital à ${ville.nom} ?`,
      answer: `Un consultant digital à ${ville.nom} est un expert qui aide les PME et TPE locales à développer leur présence en ligne : site web, SEO, publicité Google/Meta, réseaux sociaux et automatisation. Contrairement à une agence, vous avez un interlocuteur unique investi dans vos résultats.`,
    },
    {
      question: `Combien coûte un consultant digital à ${ville.nom} ?`,
      answer: `Les tarifs dépendent des missions. Un audit digital est gratuit chez 123 Digital. Les projets de création de site démarrent à partir de quelques milliers d'euros. SEO et gestion de campagnes sont proposés en accompagnement mensuel. Contactez-moi pour un devis personnalisé.`,
    },
    {
      question: `Quel est le délai pour voir des résultats en SEO à ${ville.nom} ?`,
      answer: `Les premiers effets du SEO se font sentir en 3 à 6 mois selon la concurrence dans votre secteur à ${ville.nom}. La publicité Google Ads génère des leads dès les premières semaines.`,
    },
    {
      question: `Intervenez-vous uniquement à ${ville.nom} ?`,
      answer: `Je suis basé à Lyon et j'accompagne prioritairement les entreprises de la région Auvergne-Rhône-Alpes${isARA ? `, dont ${ville.nom}` : ''}. Étant 100% en distanciel, j'interviens également sur toute la France.`,
    },
    {
      question: `Quels secteurs d'activité accompagnez-vous à ${ville.nom} ?`,
      answer: `J'accompagne les PME de tous secteurs à ${ville.nom} : restaurants, artisans BTP, commerces de proximité, cabinets médicaux et juridiques, agences immobilières, garages, salons de beauté, experts-comptables et entreprises de transport. Chaque secteur a ses spécificités digitales que je connais bien.`,
    },
  ]

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: `Consultant digital ${ville.nom}`, path: `/${ville.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        icone="map-pin"
        image={{ src: `/images/villes/${ville.slug}.jpg`, priority: true }}
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: `${ville.nom}` },
            ]}
          />
        }

        title={`Consultant digital à ${ville.nom}`}
        highlight={`à ${ville.nom}`}
        sub={`Maurice Timsit accompagne les PME de ${ville.nom} (${ville.description}) dans leur croissance digitale : site web qui convertit, SEO local, publicité Google et Meta, branding et automatisation. Un seul interlocuteur, des résultats mesurables.`}
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/a-propos">Qui suis-je ?</BannerCtaLine>
          </>
        }
      >
        {/* Paragraphe de contexte local : c'est lui qui distingue une page ville
            d'une autre aux yeux de Google. Il reste dans la banniere, en blanc. */}
        <p
          style={{
            marginTop: '1.1rem',
            fontSize: '0.85rem',
            lineHeight: 1.65,
            maxWidth: '62ch',
            color: 'var(--ink-2)',
          }}
        >
          {ville.population.toLocaleString('fr-FR')} habitants · {ville.departement} · {ville.region}.{' '}
          Les entreprises de {ville.nom} cherchent un{' '}
          {ville.keywords[0] ?? `consultant digital à ${ville.nom}`}
          {ville.keywords[2] ? `, un expert en ${ville.keywords[2]}` : ''} ou un accompagnement
          complet pour se démarquer en ligne. Je connais les spécificités de ce marché et
          j&apos;adapte chaque stratégie à la taille et au secteur de votre entreprise.
          {/* /lyon est la page « agence » : renvoi vers la page « consultant ». */}
          {ville.slug === 'lyon' && (
            <>
              {' '}Vous cherchez un consultant plutôt qu&apos;une agence ? Découvrez le{' '}
              <Link href="/consultant-digital-lyon" className="underline underline-offset-2">
                consultant digital à Lyon
              </Link>
              .
            </>
          )}
          {/* Les requêtes SEO de l'Ain vont à la page dédiée (12/10) ; ces deux pages gardent le généraliste. */}
          {(ville.slug === 'bourg-en-bresse' || ville.slug === 'oyonnax') && (
            <>
              {' '}Pour le référencement, voir la page{' '}
              <Link href="/consultant-seo-bourg-en-bresse" className="underline underline-offset-2">
                consultant SEO à Bourg-en-Bresse et dans l&apos;Ain
              </Link>
              .
            </>
          )}
        </p>
      </PageBanner>

      {/* Marché local — contenu unique pour les villes prioritaires */}
      {insight && (
        <section
          className="bg-background"
          style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
        >
          <div className="mx-auto max-w-5xl">
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-2)',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              Le marché à {ville.nom}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {insight.marche}
              </p>
              <div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--brand)',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  Mon approche à {ville.nom}
                </div>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {insight.angle}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services disponibles */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Services disponibles à {ville.nom}
          </div>
          <h2
            className="font-display font-extrabold mb-5 sm:mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Ce que je fais pour votre<br />entreprise à {ville.nom}
          </h2>

          <GrilleCartes
            items={services.map((service) => ({
              // Page ville x service en noindex : la carte mène à la page service générale (diagnostic du 25/10).
              href: estIndexable(`/${ville.slug}/${service.id}`) ? `/${ville.slug}/${service.id}` : `/services/${service.id}`,
              titre: `${service.title} à ${ville.nom}`,
              texte: service.description,
            }))}
          />
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-3xl">
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Questions fréquentes
          </div>
          <h2
            className="font-display font-extrabold mb-5 sm:mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Consultant digital à {ville.nom} : vos questions
          </h2>
          {/* Accordeon natif : la liste depliee pesait environ 1000 px sur
              telephone. Le schema FAQPage de la page reste inchange. */}
          <FaqListe items={faqs} />
        </div>
      </section>

      {/* Secteurs accompagnés */}
      <section
        className="bg-background"
        style={{ padding: '3rem 1.5rem 4rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              marginBottom: '1rem',
              fontWeight: 700,
            }}
          >
            Secteurs accompagnés à {ville.nom}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}>
            {secteurs.map((s, i) => (
              <span key={s.slug}>
                <Link href={`/secteurs/${s.slug}`} className="hover:text-[var(--brand)] transition-colors" style={{ color: 'var(--ink-2)' }}>
                  {s.nom}
                </Link>
                {i < secteurs.length - 1 && ' · '}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Villes proches (interlinking) */}
      {isARA && (
        <section
          className="bg-background"
          style={{ padding: '3rem 1.5rem', borderTop: '1px solid var(--line)' }}
        >
          <div className="mx-auto max-w-5xl">
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-3)',
                marginBottom: '1rem',
                fontWeight: 700,
              }}
            >
              Autres villes de la région
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}>
              {(() => {
                const proches = villesARA.filter((v) => v.slug !== ville.slug && estIndexable(`/${v.slug}`)).slice(0, 8)
                return proches.map((v, i) => (
                  <span key={v.slug}>
                    <Link href={`/${v.slug}`} className="hover:text-[var(--brand)] transition-colors" style={{ color: 'var(--ink-2)' }}>
                      {v.nom}
                    </Link>
                    {i < proches.length - 1 && ' · '}
                  </span>
                ))
              })()}
            </p>
          </div>
        </section>
      )}

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
