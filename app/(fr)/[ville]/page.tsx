import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { allVilles, villesARA, villeInsights } from '@/data/villes'
import { services } from '@/data/services'
import { secteurs } from '@/data/secteurs'

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

  const title = `Consultant Digital ${ville.nom} — Expert Croissance PME | 123 Digital`
  const description = `Maurice Timsit, expert en croissance digitale à ${ville.nom} : création de site web, SEO, Google Ads et automatisation pour PME. Audit gratuit 30 min, sans engagement.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${villeSlug}` },
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

      {/* Hero */}
      <section className="relative bg-background" style={{ padding: '9rem 1.5rem 6rem', overflow: 'hidden' }}>
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={`/images/villes/${ville.slug}.jpg`}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.5 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, oklch(0.30 0.02 95 / 0.07) 0%, oklch(0.30 0.02 95 / 0.13) 60%, var(--on-brand) 100%)' }}
          />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: `${ville.nom}` },
              ]}
            />
          </div>

          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            {ville.region} · {ville.departement}
          </div>

          <h1
            className="font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              color: 'var(--ink)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Consultant digital<br />
            <em
              style={{
                color: 'var(--brand)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
              }}
            >
              à {ville.nom}
            </em>
          </h1>

          <p
            className="text-base leading-relaxed mb-4 max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            Maurice Timsit accompagne les PME de {ville.nom} ({ville.description}) dans leur croissance digitale : site web qui convertit, SEO local, publicité Google et Meta, branding et automatisation. Un seul interlocuteur, des résultats mesurables.
          </p>
          <p
            className="text-sm max-w-2xl"
            style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}
          >
            {ville.population.toLocaleString('fr-FR')} habitants · {ville.departement} · {ville.region}.{' '}
            Les entreprises de {ville.nom} cherchent un{' '}
            {ville.keywords[0] ?? `consultant digital à ${ville.nom}`}
            {ville.keywords[2] ? `, un expert en ${ville.keywords[2]}` : ''} ou un accompagnement
            complet pour se démarquer en ligne. Je connais les spécificités de ce marché et
            j&apos;adapte chaque stratégie à la taille et au secteur de votre entreprise.
          </p>

          <div className="flex gap-4 flex-wrap mt-8">
            <Link
              href="/audit-gratuit"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                backgroundColor: 'var(--brand)',
                color: 'var(--ink)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Audit gratuit 30 min
            </Link>
            <Link
              href="/a-propos"
              className="hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                border: '1px solid var(--line)',
                color: 'var(--ink-2)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Qui suis-je ?
            </Link>
          </div>
        </div>
      </section>

      {/* Marché local — contenu unique pour les villes prioritaires */}
      {insight && (
        <section
          className="bg-background"
          style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.75, fontSize: '0.95rem' }}>
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
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.75, fontSize: '0.95rem' }}>
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
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
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
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Ce que je fais pour votre<br />entreprise à {ville.nom}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/${ville.slug}/${service.id}`}
                className="group block p-8"
                style={{ backgroundColor: 'var(--surface-2)' }}
              >
                <div
                  className="mb-4 group-hover:text-[var(--brand)] transition-colors"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}
                >
                  {service.shortDesc}
                </div>
                <h3
                  className="font-display font-normal mb-3 group-hover:text-[var(--brand)] transition-colors"
                  style={{ fontSize: '1.25rem', color: 'var(--ink)', lineHeight: 1.2 }}
                >
                  {service.title}<br />
                  <span style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>à {ville.nom}</span>
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  {service.description}
                </p>
                <div
                  className="mt-4 group-hover:text-[var(--brand)] transition-colors"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--ink-3)', textTransform: 'uppercase', fontWeight: 700 }}
                >
                  En savoir plus →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Résultats concrets */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { chiffre: '60+', label: 'Projets réalisés' },
              { chiffre: '8 ans', label: 'D\'expérience' },
              { chiffre: '94%', label: 'Clients satisfaits' },
              { chiffre: '3–6 mois', label: 'Pour voir les résultats SEO' },
            ].map(({ chiffre, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-display font-normal mb-2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--brand)', lineHeight: 1 }}
                >
                  {chiffre}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
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
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Consultant digital à {ville.nom} — vos questions
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
                <dt className="font-display font-normal mb-3" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
                  {question}
                </dt>
                <dd style={{ color: 'var(--ink-2)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
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
          <div className="flex flex-wrap gap-3">
            {secteurs.map((s) => (
              <Link
                key={s.slug}
                href={`/secteurs/${s.slug}`}
                className="hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                style={{
                  padding: '0.4rem 0.9rem',
                  border: '1px solid var(--line)',
                  color: 'var(--ink-2)',
                  fontSize: '0.8rem',
                }}
              >
                {s.emoji} {s.nom}
              </Link>
            ))}
          </div>
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
            <div className="flex flex-wrap gap-3">
              {villesARA
                .filter((v) => v.slug !== ville.slug)
                .slice(0, 8)
                .map((v) => (
                  <Link
                    key={v.slug}
                    href={`/${v.slug}`}
                    className="hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                    style={{
                      padding: '0.4rem 0.9rem',
                      border: '1px solid var(--line)',
                      color: 'var(--ink-2)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {v.nom}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Prêt à développer votre activité<br />à {ville.nom} ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Un audit gratuit de 30 minutes pour identifier les 3 actions les plus rentables pour votre entreprise. Sans engagement, sans jargon.
          </p>
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--brand)',
              color: 'var(--ink)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Demander mon audit gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
