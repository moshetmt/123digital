import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema } from '@/lib/schema'
import { articles, categories } from '@/data/blog'
import { languesPour } from '@/data/hreflang'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Blog — Conseils marketing digital pour PME | 123 Digital',
  description:
    "Guides pratiques SEO, création de site web, Google Ads et automatisation pour PME. Conseils concrets par Maurice Timsit, consultant digital à Lyon.",
  alternates: { canonical: `${BASE_URL}/blog`, ...languesPour('/blog') },
  openGraph: {
    title: 'Blog — Conseils marketing digital PME | 123 Digital',
    description: 'Articles pratiques sur le SEO, Google Ads et la croissance digitale pour les PME.',
    url: `${BASE_URL}/blog`,
  },
}

export default function BlogPage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  ]

  const articlesTriees = [...articles].sort(
    (a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
  )

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        icone="pen-line"
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Blog' },
            ]}
          />
        }
        title="Le digital pour PME, expliqué clairement."
        highlight="expliqué clairement."
        sub="Des guides pratiques sur le SEO, la publicité en ligne, la création de site et l&apos;automatisation. Écrits pour des chefs d&apos;entreprise, pas pour des développeurs."
        actions={<BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>}
      />

      {/* Catégories */}
      <section
        className="bg-background"
        style={{ padding: '1.5rem 1.5rem 0', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)' }}>
            {[
              `Tous (${articles.length})`,
              ...categories.map((cat) => `${cat} (${articles.filter((a) => a.categorie === cat).length})`),
            ].join(' · ')}
          </p>
        </div>
      </section>

      {/* Liste articles */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {articlesTriees.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col rounded overflow-hidden"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
                  <Image
                    src={article.image}
                    alt={article.titre}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="flex flex-col flex-1" style={{ padding: 'clamp(0.9rem, 3vw, 1.3rem)' }}>
                  <div
                    className="flex items-center gap-2 mb-1.5"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
                  >
                    {article.categorie}
                    <span style={{ color: 'var(--ink-4)' }}>·</span>
                    <span style={{ color: 'var(--ink-3)' }}>{article.tempsLecture} min</span>
                  </div>

                  <h2
                    className="group-hover:text-[var(--brand)] transition-colors"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(1rem, 2.6vw, 1.2rem)', letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.25, marginBottom: '0.4rem' }}
                  >
                    {article.titre}
                  </h2>

                  <p style={{ fontSize: 'clamp(0.8rem, 2.6vw, 0.87rem)', color: 'var(--ink-2)', lineHeight: 1.5, flex: 1 }}>
                    {article.description}
                  </p>

                  <div
                    className="flex items-center justify-between"
                    style={{ marginTop: '0.9rem', fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 700 }}
                  >
                    <span>
                      {new Date(article.datePublication).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="group-hover:text-[var(--brand)] transition-colors" style={{ color: 'var(--brand-strong)' }}>Lire →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
