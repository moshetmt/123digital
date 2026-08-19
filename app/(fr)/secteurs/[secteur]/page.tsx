import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { secteurs, getSecteurBySlug } from '@/data/secteurs'
import { villesARA } from '@/data/villes'

interface PageProps {
  params: Promise<{ secteur: string }>
}

export async function generateStaticParams() {
  return secteurs.map((s) => ({ secteur: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { secteur: secteurSlug } = await params
  const secteur = getSecteurBySlug(secteurSlug)
  if (!secteur) return {}

  const title = `Marketing digital pour ${secteur.nomPluriel} — Expert PME | 123 Digital`
  const description = `Stratégie digitale sur mesure pour les ${secteur.nomPluriel.toLowerCase()} : ${secteur.solutions.slice(0, 2).join(', ')}. Audit gratuit 30 min avec Maurice Timsit, consultant digital à Lyon.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/secteurs/${secteurSlug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/secteurs/${secteurSlug}`,
    },
  }
}

export default async function SecteurPage({ params }: PageProps) {
  const { secteur: secteurSlug } = await params
  const secteur = getSecteurBySlug(secteurSlug)
  if (!secteur) notFound()

  const autresSecteurs = secteurs.filter((s) => s.slug !== secteur.slug)
  const villesPrioritaires = villesARA.filter((v) => v.priority === 'high')

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Secteurs d\'activité', path: '/secteurs' },
      { name: secteur.nom, path: `/secteurs/${secteur.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: secteur.faqs.map(({ question, reponse }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: reponse },
      })),
    },
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        icone="store"
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Secteurs', href: '/secteurs' },
              { label: secteur.nom },
            ]}
          />
        }
        title={`Marketing digital pour les ${secteur.nomPluriel.toLowerCase()}`}
        highlight={`pour les ${secteur.nomPluriel.toLowerCase()}`}
        sub={secteur.description}
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/secteurs">Tous les secteurs</BannerCtaLine>
          </>
        }
      />

      {/* Problèmes identifiés */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
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
                Ce que vous vivez
              </div>
              <ul className="space-y-4">
                {secteur.problemes.map((probleme, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X size={16} strokeWidth={3} aria-hidden style={{ color: 'var(--ink-3)', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                      {probleme}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
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
                Ce que je mets en place
              </div>
              <ul className="space-y-4">
                {secteur.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} strokeWidth={3} aria-hidden style={{ color: 'var(--brand)', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                      {solution}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}
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
            Résultats concrets
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {secteur.resultats.map((resultat, i) => (
              <div
                key={i}
                className="p-6"
                style={{ backgroundColor: 'var(--surface-2)' }}
              >
                <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.6 }}>
                  {resultat}
                </p>
              </div>
            ))}
          </div>
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
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            {secteur.nomPluriel} & digital —<br />vos questions
          </h2>
          {/* Accordeon natif : la liste depliee pesait environ 1000 px sur
              telephone. Le schema FAQPage de la page reste inchange. */}
          <div className="flex flex-col gap-1.5">
            {secteur.faqs.map(({ question, reponse }, i) => (
              <details key={i} className="group rounded-xl" style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}>
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none font-extrabold" style={{ fontSize: '0.95rem', color: 'var(--ink)', padding: '0.85rem 1rem' }}>
                  {question}
                  <span aria-hidden className="shrink-0 transition-transform group-open:rotate-45" style={{ color: 'var(--brand)', fontSize: '1.2rem', lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.88rem', padding: '0 1rem 0.9rem' }}>
                  {reponse}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Zones d'intervention — ARA */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}
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
            Zones d&apos;intervention
          </div>
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            {secteur.nomPluriel} en Auvergne-Rhône-Alpes
          </h2>
          <p
            className="mb-6 max-w-2xl"
            style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7 }}
          >
            J&apos;accompagne les {secteur.nomPluriel.toLowerCase()} de toute la région
            Auvergne-Rhône-Alpes :{' '}
            {villesPrioritaires.map((v) => v.nom).join(', ')} et leurs agglomérations.
            Que vous soyez dans une grande métropole ou une ville moyenne, les enjeux digitaux
            sont les mêmes — et les solutions mises en place sont calibrées pour votre marché local.
          </p>
          <div className="flex flex-wrap gap-3">
            {villesPrioritaires.map((v) => (
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
                {secteur.nom} à {v.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Autres secteurs */}
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
            Autres secteurs
          </p>
          <div className="flex flex-wrap gap-3">
            {autresSecteurs.map((s) => (
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
                {s.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Développez votre {secteur.nom.toLowerCase()}<br />grâce au digital ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Un audit gratuit de 30 minutes pour identifier les 3 leviers les plus rentables pour votre {secteur.nom.toLowerCase()}. Sans engagement, sans jargon.
          </p>
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              borderRadius: 999,
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
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
