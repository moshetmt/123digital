import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema } from '@/lib/schema'
import { articles, categories } from '@/data/blog'
import { languesPour } from '@/data/hreflang'

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
          <div className="flex flex-wrap gap-3">
            <span
              style={{
                padding: '0.35rem 0.9rem',
                backgroundColor: 'var(--brand-tint)',
                border: '1px solid var(--brand-line)',
                color: 'var(--brand)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Tous ({articles.length})
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                style={{
                  padding: '0.35rem 0.9rem',
                  border: '1px solid var(--line)',
                  color: 'var(--ink-2)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'default',
                }}
              >
                {cat} ({articles.filter((a) => a.categorie === cat).length})
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Liste articles */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="space-y-px" style={{ border: '1px solid var(--line)', borderBottom: 'none' }}>
            {articlesTriees.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col sm:flex-row sm:items-start gap-6 p-8"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '160px',
                    height: '100px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={article.image}
                    alt={article.titre}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-3)',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {new Date(article.datePublication).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--brand)',
                      fontWeight: 700,
                      marginTop: '0.4rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {article.tempsLecture} min
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-2)',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {article.categorie}
                  </div>

                  <h2
                    className="font-display font-extrabold mb-3 group-hover:text-[var(--brand)] transition-colors"
                    style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', color: 'var(--ink)', lineHeight: 1.25 }}
                  >
                    {article.titre}
                  </h2>

                  <p style={{ fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.15rem 0.5rem',
                          backgroundColor: 'var(--surface-3)',
                          border: '1px solid var(--line)',
                          color: 'var(--ink-3)',
                          fontSize: '0.7rem',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="group-hover:text-[var(--brand)] transition-colors"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--ink-3)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                    marginTop: '0.2rem',
                  }}
                >
                  Lire →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA newsletter/audit */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Besoin d&apos;un regard expert<br />sur votre situation ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Ces articles vous donnent les bases — mais chaque entreprise est différente. Un audit gratuit de 30 minutes pour analyser votre cas spécifique.
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
            Audit gratuit 30 min
          </Link>
        </div>
      </section>
    </>
  )
}
