import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema } from '@/lib/schema'
import { articles, categories } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Blog — Conseils marketing digital pour PME | 123 Digital',
  description:
    "Guides pratiques SEO, création de site web, Google Ads et automatisation pour PME. Conseils concrets par Maurice Timsit, consultant digital à Lyon.",
  alternates: { canonical: `${BASE_URL}/blog` },
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

      {/* Hero */}
      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Blog' },
              ]}
            />
          </div>

          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.7)',
              fontWeight: 700,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Marketing digital · PME · Sans jargon
          </div>

          <h1
            className="font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              color: '#E1E0CC',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Le digital pour PME,<br />
            <em
              style={{
                color: '#00FF87',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
              }}
            >
              expliqué clairement.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'rgba(225,224,204,0.65)' }}
          >
            Des guides pratiques sur le SEO, la publicité en ligne, la création de site et l&apos;automatisation. Écrits pour des chefs d&apos;entreprise, pas pour des développeurs.
          </p>
        </div>
      </section>

      {/* Catégories */}
      <section
        className="bg-black"
        style={{ padding: '1.5rem 1.5rem 0', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-3">
            <span
              style={{
                padding: '0.35rem 0.9rem',
                backgroundColor: 'rgba(0,255,135,0.1)',
                border: '1px solid rgba(0,255,135,0.3)',
                color: '#00FF87',
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
                  border: '1px solid rgba(225,224,204,0.12)',
                  color: 'rgba(225,224,204,0.55)',
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
        className="bg-black"
        style={{ padding: '3rem 1.5rem 6rem' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="space-y-px" style={{ border: '1px solid rgba(225,224,204,0.06)', borderBottom: 'none' }}>
            {articlesTriees.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col sm:flex-row sm:items-start gap-6 p-8"
                style={{
                  backgroundColor: '#080808',
                  borderBottom: '1px solid rgba(225,224,204,0.06)',
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(225,224,204,0.4)',
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
                      color: '#00FF87',
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
                      color: 'rgba(225,224,204,0.45)',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {article.categorie}
                  </div>

                  <h2
                    className="font-display font-normal mb-3 group-hover:text-[#00FF87] transition-colors"
                    style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', color: '#E1E0CC', lineHeight: 1.25 }}
                  >
                    {article.titre}
                  </h2>

                  <p style={{ fontSize: '0.87rem', color: 'rgba(225,224,204,0.55)', lineHeight: 1.6 }}>
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.15rem 0.5rem',
                          backgroundColor: 'rgba(225,224,204,0.04)',
                          border: '1px solid rgba(225,224,204,0.07)',
                          color: 'rgba(225,224,204,0.35)',
                          fontSize: '0.7rem',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="group-hover:text-[#00FF87] transition-colors"
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(225,224,204,0.3)',
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
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Besoin d&apos;un regard expert<br />sur votre situation ?
          </h2>
          <p style={{ color: 'rgba(225,224,204,0.6)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Ces articles vous donnent les bases — mais chaque entreprise est différente. Un audit gratuit de 30 minutes pour analyser votre cas spécifique.
          </p>
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              backgroundColor: '#00FF87',
              color: '#080808',
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
