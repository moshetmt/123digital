import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, articleSchema } from '@/lib/schema'
import { articles, getArticleBySlug, type BlogSection } from '@/data/blog'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: `${article.titre} | 123 Digital`,
    description: article.description,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: article.titre,
      description: article.description,
      type: 'article',
      url: `${BASE_URL}/blog/${slug}`,
      publishedTime: article.datePublication,
      modifiedTime: article.dateModification,
    },
  }
}

// ─── Section renderers ────────────────────────────────────────────────────────

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case 'intro':
      return (
        <p
          className="text-base leading-relaxed"
          style={{
            color: 'rgba(225,224,204,0.75)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            borderLeft: '3px solid #00FF87',
            paddingLeft: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {section.texte}
        </p>
      )

    case 'h2':
      return (
        <div style={{ marginBottom: '2rem', marginTop: '3rem' }}>
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#E1E0CC', lineHeight: 1.2 }}
          >
            {section.titre}
          </h2>
          {section.texte && (
            <p style={{ color: 'rgba(225,224,204,0.65)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              {section.texte}
            </p>
          )}
        </div>
      )

    case 'h3':
      return (
        <div style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>
          <h3
            className="font-display font-normal mb-3"
            style={{ fontSize: '1.2rem', color: '#E1E0CC', lineHeight: 1.2 }}
          >
            {section.titre}
          </h3>
          {section.texte && (
            <p style={{ color: 'rgba(225,224,204,0.65)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              {section.texte}
            </p>
          )}
        </div>
      )

    case 'paragraphe':
      return (
        <p style={{ color: 'rgba(225,224,204,0.65)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {section.texte}
        </p>
      )

    case 'liste':
      return (
        <div style={{ marginBottom: '2rem' }}>
          {section.titre && (
            <p style={{ fontWeight: 700, color: '#E1E0CC', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              {section.titre}
            </p>
          )}
          <ul className="space-y-3">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span style={{ color: '#00FF87', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(225,224,204,0.65)', lineHeight: 1.6 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'faq':
      return (
        <div style={{ marginBottom: '2.5rem', marginTop: '3rem' }}>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.5)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Questions fréquentes
          </div>
          <dl className="space-y-6">
            {section.faqs?.map(({ question, reponse }, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(225,224,204,0.08)', paddingTop: '1.5rem' }}>
                <dt className="font-display font-normal mb-2" style={{ fontSize: '1rem', color: '#E1E0CC' }}>
                  {question}
                </dt>
                <dd style={{ color: 'rgba(225,224,204,0.6)', lineHeight: 1.75, fontSize: '0.9rem' }}>
                  {reponse}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )

    case 'resume':
      return (
        <div
          style={{
            marginBottom: '2rem',
            marginTop: '3rem',
            padding: '1.5rem 2rem',
            backgroundColor: 'rgba(0,255,135,0.04)',
            border: '1px solid rgba(0,255,135,0.15)',
          }}
        >
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#00FF87',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            {section.titre ?? 'En résumé'}
          </div>
          <ul className="space-y-2">
            {section.items?.map((item, i) => (
              <li key={i} style={{ fontSize: '0.88rem', color: 'rgba(225,224,204,0.7)', lineHeight: 1.6 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'cta':
      return (
        <div
          style={{
            marginBottom: '2rem',
            padding: '2rem',
            border: '1px solid rgba(225,224,204,0.1)',
            textAlign: 'center',
          }}
        >
          {section.titre && (
            <p className="font-display font-normal mb-3" style={{ fontSize: '1.1rem', color: '#E1E0CC' }}>
              {section.titre}
            </p>
          )}
          {section.texte && (
            <p style={{ fontSize: '0.88rem', color: 'rgba(225,224,204,0.6)', marginBottom: '1.5rem' }}>
              {section.texte}
            </p>
          )}
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              backgroundColor: '#00FF87',
              color: '#080808',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Audit gratuit 30 min
          </Link>
        </div>
      )

    default:
      return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const autresArticles = articles
    .filter((a) => a.slug !== slug)
    .sort((a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime())
    .slice(0, 3)

  const schemas = [
    articleSchema({
      title: article.titre,
      description: article.description,
      path: `/blog/${article.slug}`,
      datePublished: article.datePublication,
      dateModified: article.dateModification,
      image: article.image,
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: article.titre, path: `/blog/${article.slug}` },
    ]),
  ]

  const faqSections = article.contenu.filter((s) => s.type === 'faq')
  if (faqSections.length > 0) {
    const allFaqs = faqSections.flatMap((s) => s.faqs ?? [])
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map(({ question, reponse }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: reponse },
      })),
    })
  }

  return (
    <>
      <JsonLd schema={schemas} />

      {/* Hero article */}
      <section className="bg-black" style={{ padding: '9rem 1.5rem 4rem' }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: article.categorie },
              ]}
            />
          </div>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#00FF87',
                fontWeight: 700,
              }}
            >
              {article.categorie}
            </span>
            <span style={{ color: 'rgba(225,224,204,0.35)', fontSize: '0.8rem' }}>
              {new Date(article.datePublication).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span style={{ color: 'rgba(225,224,204,0.35)', fontSize: '0.8rem' }}>
              {article.tempsLecture} min de lecture
            </span>
          </div>

          <h1
            className="font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#E1E0CC',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {article.titre}
          </h1>

          <p
            style={{
              color: 'rgba(225,224,204,0.6)',
              lineHeight: 1.7,
              fontSize: '1rem',
              borderBottom: '1px solid rgba(225,224,204,0.06)',
              paddingBottom: '2rem',
            }}
          >
            {article.description}
          </p>
        </div>
      </section>

      {/* Contenu article */}
      <article
        className="bg-black"
        style={{ padding: '2rem 1.5rem 6rem' }}
      >
        <div className="mx-auto max-w-3xl">
          {article.contenu.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}

          {/* CTA en fin d'article */}
          <div
            style={{
              marginTop: '4rem',
              padding: '2.5rem',
              backgroundColor: 'rgba(0,255,135,0.04)',
              border: '1px solid rgba(0,255,135,0.2)',
              textAlign: 'center',
            }}
          >
            <p
              className="font-display font-normal mb-3"
              style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
            >
              Prêt à passer à l&apos;action ?
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(225,224,204,0.6)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Un audit gratuit de 30 minutes pour voir où vous en êtes et ce qui peut changer rapidement.
            </p>
            <Link
              href="/audit-gratuit"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                backgroundColor: '#00FF87',
                color: '#080808',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Audit gratuit 30 min
            </Link>
          </div>

          {/* Tags */}
          <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(225,224,204,0.06)', paddingTop: '1.5rem' }}>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.25rem 0.65rem',
                    border: '1px solid rgba(225,224,204,0.1)',
                    color: 'rgba(225,224,204,0.4)',
                    fontSize: '0.75rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Articles similaires */}
      {autresArticles.length > 0 && (
        <section
          className="bg-black"
          style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
        >
          <div className="mx-auto max-w-5xl">
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(225,224,204,0.5)',
                fontWeight: 700,
                marginBottom: '2rem',
              }}
            >
              Autres articles
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
              {autresArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block p-6"
                  style={{ backgroundColor: '#080808' }}
                >
                  <div
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#00FF87',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {a.categorie}
                  </div>
                  <h3
                    className="font-display font-normal group-hover:text-[#00FF87] transition-colors"
                    style={{ fontSize: '1rem', color: '#E1E0CC', lineHeight: 1.3, marginBottom: '0.5rem' }}
                  >
                    {a.titre}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(225,224,204,0.4)' }}>
                    {a.tempsLecture} min →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
