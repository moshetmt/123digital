import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema } from '@/lib/schema'
import { problemes, famillesLabels, type FamilleProbleme } from '@/data/problemes'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Un problème précis avec votre site ou vos pubs ? | 123 Digital',
  description:
    'Site disparu de Google, formulaire muet, Google Ads qui ne rapportent rien, fiche Google suspendue, faux avis : le diagnostic en 10 minutes et ce que je fais pour vous.',
  alternates: { canonical: `${BASE_URL}/problemes` },
  openGraph: {
    title: 'Un problème précis avec votre site ou vos pubs ? | 123 Digital',
    description: 'Le diagnostic en 10 minutes, problème par problème, par Maurice Timsit, consultant digital à Lyon.',
    url: `${BASE_URL}/problemes`,
  },
}

const ordreFamilles: FamilleProbleme[] = ['panne', 'argent', 'reputation', 'projet']

export default function ProblemesPage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Problèmes', path: '/problemes' },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Problèmes' },
            ]}
          />
        }
        title="Vous avez un problème précis. Voici par où commencer."
        highlight="Voici par où commencer."
        sub="Chaque page part de ce que vous tapez dans Google le jour où ça coince, vous donne le diagnostic à faire vous-même, puis ce que je fais si vous préférez confier."
        actions={<BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>}
      />

      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}
      >
        <div className="mx-auto max-w-5xl">
          {ordreFamilles.map((famille) => {
            const pages = problemes.filter((p) => p.famille === famille)
            if (pages.length === 0) return null
            return (
              <div key={famille} style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                <h2
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-2)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  {famillesLabels[famille]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {pages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/problemes/${p.slug}`}
                      className="group flex flex-col rounded"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        border: '1px solid var(--line)',
                        padding: 'clamp(0.9rem, 3vw, 1.3rem)',
                      }}
                    >
                      <h3
                        className="group-hover:text-[var(--brand)] transition-colors"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 800,
                          fontSize: 'clamp(1rem, 2.6vw, 1.2rem)',
                          letterSpacing: '-0.01em',
                          color: 'var(--ink)',
                          lineHeight: 1.25,
                          marginBottom: '0.4rem',
                        }}
                      >
                        {p.titre}
                      </h3>
                      <p style={{ fontSize: 'clamp(0.8rem, 2.6vw, 0.87rem)', color: 'var(--ink-2)', lineHeight: 1.5, flex: 1 }}>
                        {p.reponse}
                      </p>
                      <div
                        className="flex items-center justify-between"
                        style={{ marginTop: '0.9rem', fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 700 }}
                      >
                        <span>{p.tempsLecture} min de lecture</span>
                        <span className="group-hover:text-[var(--brand)] transition-colors" style={{ color: 'var(--brand-strong)' }}>
                          Lire →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Formulaire : composant unique CTA.tsx, partagé par tout le site */}
      <CTA />
    </>
  )
}
