import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, articleSchema } from '@/lib/schema'
import { problemes, getProblemeBySlug, famillesLabels } from '@/data/problemes'
import { RenderSection } from '@/components/sections/ContenuRedactionnel'
import { CTA } from '@/components/sections/CTA'

// Pages « problème × métier » : une requête chaude par page, réponse directe en
// tête, puis le diagnostic. Stratégie du 20/08/2026, chantier 1.

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return problemes.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getProblemeBySlug(slug)
  if (!page) return {}

  return {
    title: `${page.title} | 123 Digital`,
    description: page.description,
    alternates: { canonical: `${BASE_URL}/problemes/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: `${BASE_URL}/problemes/${slug}`,
      publishedTime: page.datePublication,
      modifiedTime: page.dateModification,
      images: [{ url: `${BASE_URL}/images/og-image.png`, width: 1200, height: 630, alt: page.titre }],
    },
  }
}

export default async function ProblemePage({ params }: PageProps) {
  const { slug } = await params
  const page = getProblemeBySlug(slug)
  if (!page) notFound()

  // Les 3 pages suivantes, en boucle : chaque page problème reçoit 3 liens de ses voisines
  // (avant le 25/10, les 3 premières de la liste recevaient tous les liens).
  const i = problemes.findIndex((p) => p.slug === slug)
  const autres = [1, 2, 3].map((k) => problemes[(i + k) % problemes.length]).filter((p) => p.slug !== slug)

  const schemas = [
    articleSchema({
      title: page.title,
      description: page.description,
      path: `/problemes/${page.slug}`,
      datePublished: page.datePublication,
      dateModified: page.dateModification,
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Problèmes', path: '/problemes' },
      { name: page.titre, path: `/problemes/${page.slug}` },
    ]),
  ]

  const faqs = page.contenu.filter((s) => s.type === 'faq').flatMap((s) => s.faqs ?? [])
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, reponse }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: reponse },
      })),
    })
  }

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        align="left"
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Problèmes', href: '/problemes' },
              { label: famillesLabels[page.famille] },
            ]}
          />
        }
        title={page.titre}
        sub={page.reponse}
      >
        <p style={{ marginTop: '0.9rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--on-brand)', opacity: 0.8 }}>
          Mis à jour le{' '}
          {/* Midi : une date ISO nue est lue en UTC et recule d'un jour à l'affichage. */}
          {new Date(`${page.dateModification ?? page.datePublication}T12:00:00`).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}{' '}
          · {page.tempsLecture} min de lecture
        </p>
        <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--on-brand)', opacity: 0.8 }}>
          Par Maurice Timsit,{' '}
          <Link href="/a-propos" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
            consultant digital à Lyon
          </Link>
        </p>
      </PageBanner>

      <article
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}
      >
        <div className="mx-auto max-w-3xl">
          {page.contenu.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}

          {/* Sources officielles citées (champ optionnel, section absente si vide) */}
          {page.sources && page.sources.length > 0 && (
            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
              <h2
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-2)',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                Sources
              </h2>
              <ul className="space-y-1.5">
                {page.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      style={{ color: 'var(--brand-strong)', fontSize: '0.85rem', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Maillage : les pages qui prolongent celle-ci */}
          {page.liens.length > 0 && (
            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
              <p
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-2)',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                Pour aller plus loin
              </p>
              <ul className="space-y-1.5">
                {page.liens.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      style={{ color: 'var(--brand-strong)', fontSize: '0.92rem', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {/* Autres problèmes */}
      {autres.length > 0 && (
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
                marginBottom: '2rem',
              }}
            >
              Autres problèmes fréquents
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
              {autres.map((p) => (
                <Link
                  key={p.slug}
                  href={`/problemes/${p.slug}`}
                  className="group block rounded p-6"
                  style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
                >
                  <div
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--brand-strong)',
                      fontWeight: 800,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {famillesLabels[p.famille]}
                  </div>
                  <h3
                    className="font-sans font-extrabold group-hover:text-[var(--brand)] transition-colors"
                    style={{ fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.3, marginBottom: '0.5rem' }}
                  >
                    {p.titre}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>{p.tempsLecture} min →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formulaire : composant unique CTA.tsx, partagé par tout le site */}
      <CTA />
    </>
  )
}
