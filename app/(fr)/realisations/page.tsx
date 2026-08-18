import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { projects } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Réalisations — Résultats SEO & Web pour PME | 123 Digital',
  description:
    'Résultats concrets pour PME : SEO, site web, Google Ads. Projets de Maurice Timsit et performances mesurées pour ses clients lyonnais.',
  alternates: { canonical: `${BASE_URL}/realisations` },
  openGraph: {
    title: 'Portfolio — 123 Digital',
    description: 'Réalisations et résultats concrets pour des PME en croissance digitale.',
    url: `${BASE_URL}/realisations`,
  },
}

const stats = [
  { chiffre: '60+', label: 'Projets réalisés' },
  { chiffre: '8 ans', label: 'D\'expérience' },
  { chiffre: '94%', label: 'Clients satisfaits' },
  { chiffre: '×3,5', label: 'ROAS moyen campagnes Ads' },
]

export default function PortfolioPage() {
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Portfolio', path: '/realisations' },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      {/* Hero */}
      <section className="bg-background" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Portfolio' },
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
            Réalisations clients
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
            Des résultats,<br />
            <em
              style={{
                color: 'var(--brand)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
              }}
            >
              pas des promesses.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            Chaque projet présenté ici est un vrai cas client, avec de vraies métriques. Pas de captures d&apos;écran retouchées, pas de résultats exceptionnels non reproductibles.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section
        className="bg-background"
        style={{ padding: '3rem 1.5rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ chiffre, label }) => (
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

      {/* Projets */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-8"
                style={{ backgroundColor: 'var(--surface-2)' }}
              >
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--brand)',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                      }}
                    >
                      {project.category}
                    </div>
                    <h2
                      className="font-display font-normal"
                      style={{ fontSize: '1.25rem', color: 'var(--ink)', lineHeight: 1.2 }}
                    >
                      {project.title}
                    </h2>
                  </div>
                  <div
                    style={{
                      padding: '0.25rem 0.7rem',
                      border: '1px solid var(--line)',
                      color: 'var(--ink-2)',
                      fontSize: '0.7rem',
                      flexShrink: 0,
                    }}
                  >
                    {project.sector}
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                  {project.description}
                </p>

                <div
                  className="font-display font-normal"
                  style={{
                    fontSize: '1rem',
                    color: 'var(--brand)',
                    marginBottom: '1rem',
                  }}
                >
                  ✓ {project.results}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.2rem 0.6rem',
                        backgroundColor: 'var(--surface-3)',
                        border: '1px solid var(--line)',
                        color: 'var(--ink-3)',
                        fontSize: '0.72rem',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Carte "Votre projet ici" */}
            <Link
              href="/audit-gratuit"
              className="group block p-8"
              style={{
                backgroundColor: 'var(--surface-2)',
                borderTop: 'none',
              }}
            >
              <div
                className="flex items-center justify-center h-full flex-col text-center gap-4"
                style={{ minHeight: '260px' }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '1px solid var(--brand-line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand)',
                    fontSize: '1.5rem',
                  }}
                >
                  +
                </div>
                <div>
                  <div
                    className="font-display font-normal mb-2 group-hover:text-[var(--brand)] transition-colors"
                    style={{ fontSize: '1.1rem', color: 'var(--ink)' }}
                  >
                    Votre projet ici
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-2)' }}>
                    Audit gratuit 30 min →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Votre entreprise pourrait<br />être dans cette liste.
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Un audit gratuit de 30 minutes pour commencer. Pas de jargon, pas de promesses irréalistes — juste un plan d&apos;action adapté à votre situation.
          </p>
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Démarrer mon projet
          </Link>
        </div>
      </section>
    </>
  )
}
