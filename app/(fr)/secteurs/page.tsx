import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { secteurs } from '@/data/secteurs'

export const metadata: Metadata = {
  title: 'Croissance digitale par secteur d\'activité — PME & TPE | 123 Digital',
  description:
    'Stratégies digitales sur mesure pour chaque secteur : restaurant, artisan BTP, cabinet médical, commerce, agence immobilière et plus. Expert consultant digital Lyon.',
  alternates: { canonical: `${BASE_URL}/secteurs` },
  openGraph: {
    title: 'Croissance digitale par secteur d\'activité | 123 Digital',
    description:
      'Stratégies digitales adaptées à chaque métier. Maurice Timsit, consultant digital à Lyon, accompagne les PME de tous secteurs.',
    url: `${BASE_URL}/secteurs`,
  },
}

export default function SecteursPage() {
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Secteurs d\'activité', path: '/secteurs' },
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
                { label: 'Secteurs d\'activité' },
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
            Expertise sectorielle
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
            Votre secteur.<br />
            <em
              style={{
                color: 'var(--brand)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
              }}
            >
              Sa stratégie digitale.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            Chaque secteur a ses propres codes, ses propres clients et ses propres leviers de croissance. Je ne propose pas de solutions génériques — j&apos;adapte chaque stratégie aux réalités de votre métier.
          </p>
        </div>
      </section>

      {/* Grille secteurs */}
      <section
        className="bg-background"
        style={{ padding: '2rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {secteurs.map((secteur) => (
              <Link
                key={secteur.slug}
                href={`/secteurs/${secteur.slug}`}
                className="group block p-8"
                style={{ backgroundColor: 'var(--surface-2)' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span style={{ fontSize: '2rem' }}>{secteur.emoji}</span>
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
                      {secteur.nomPluriel}
                    </div>
                    <h2
                      className="font-display font-normal group-hover:text-[var(--brand)] transition-colors"
                      style={{ fontSize: '1.3rem', color: 'var(--ink)', lineHeight: 1.2 }}
                    >
                      {secteur.nom}
                    </h2>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                  {secteur.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {secteur.solutions.slice(0, 2).map((sol, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.25rem 0.6rem',
                        border: '1px solid var(--line)',
                        color: 'var(--ink-2)',
                        fontSize: '0.72rem',
                      }}
                    >
                      {sol}
                    </span>
                  ))}
                </div>

                <div
                  className="group-hover:text-[var(--brand)] transition-colors"
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    color: 'var(--ink-3)',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  Voir la stratégie →
                </div>
              </Link>
            ))}
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
            Votre secteur n&apos;est pas dans la liste ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            J&apos;accompagne les PME de tous secteurs. Prenons 30 minutes pour explorer ensemble comment développer votre activité en ligne.
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
            Audit gratuit 30 min
          </Link>
        </div>
      </section>
    </>
  )
}
