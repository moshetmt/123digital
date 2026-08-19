import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
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
      images: article.image
        ? [{ url: `${BASE_URL}${article.image}`, width: 1200, height: 628, alt: article.titre }]
        : [{ url: `${BASE_URL}/images/og-image.svg`, width: 1200, height: 630, alt: article.titre }],
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
            color: 'var(--ink)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            borderLeft: '3px solid var(--brand)',
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
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            {section.titre}
          </h2>
          {section.texte && (
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              {section.texte}
            </p>
          )}
        </div>
      )

    case 'h3':
      return (
        <div style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>
          <h3
            className="font-display font-extrabold mb-3"
            style={{ fontSize: '1.2rem', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            {section.titre}
          </h3>
          {section.texte && (
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              {section.texte}
            </p>
          )}
        </div>
      )

    case 'paragraphe':
      return (
        <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {section.texte}
        </p>
      )

    case 'liste':
      return (
        <div style={{ marginBottom: '2rem' }}>
          {section.titre && (
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              {section.titre}
            </p>
          )}
          <ul className="space-y-3">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
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
              color: 'var(--ink-2)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Questions fréquentes
          </div>
          {/* Accordeon natif : la liste depliee allongeait l'article sans
              raison. Le schema FAQPage de la page reste inchange. */}
          <div className="flex flex-col gap-1.5">
            {section.faqs?.map(({ question, reponse }, i) => (
              <details key={i} className="group rounded-xl" style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}>
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none font-extrabold" style={{ fontSize: '0.92rem', color: 'var(--ink)', padding: '0.8rem 1rem' }}>
                  {question}
                  <span aria-hidden className="shrink-0 transition-transform group-open:rotate-45" style={{ color: 'var(--brand)', fontSize: '1.2rem', lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.86rem', padding: '0 1rem 0.85rem' }}>
                  {reponse}
                </p>
              </details>
            ))}
          </div>
        </div>
      )

    case 'resume':
      return (
        <div
          style={{
            marginBottom: '2rem',
            marginTop: '3rem',
            padding: '1.5rem 2rem',
            backgroundColor: 'var(--brand-tint)',
            border: '1px solid var(--brand-line)',
          }}
        >
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--brand)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            {section.titre ?? 'En résumé'}
          </div>
          <ul className="space-y-2">
            {section.items?.map((item, i) => (
              <li key={i} style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
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
            border: '1px solid var(--line)',
            textAlign: 'center',
          }}
        >
          {section.titre && (
            <p className="font-display font-extrabold mb-3" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>
              {section.titre}
            </p>
          )}
          {section.texte && (
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginBottom: '1.5rem' }}>
              {section.texte}
            </p>
          )}
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              borderRadius: 999,
              padding: '0.75rem 1.75rem',
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
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
      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}>
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
                color: 'var(--brand)',
                fontWeight: 700,
              }}
            >
              {article.categorie}
            </span>
            <span style={{ color: 'var(--ink-3)', fontSize: '0.8rem' }}>
              {new Date(article.datePublication).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span style={{ color: 'var(--ink-3)', fontSize: '0.8rem' }}>
              {article.tempsLecture} min de lecture
            </span>
          </div>

          <h1
            className="font-display font-extrabold mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: 'var(--ink)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {article.titre}
          </h1>

          <p
            style={{
              color: 'var(--ink-2)',
              lineHeight: 1.7,
              fontSize: '1rem',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '2rem',
            }}
          >
            {article.description}
          </p>
        </div>
      </section>

      {/* Image de couverture */}
      <section className="bg-background" style={{ padding: '0 1.5rem 3rem' }}>
        <div className="mx-auto max-w-3xl">
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1200 / 628', overflow: 'hidden' }}>
            <Image
              src={article.image}
              alt={article.titre}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Contenu article */}
      <article
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}
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
              backgroundColor: 'var(--brand-tint)',
              border: '1px solid var(--brand-line)',
              textAlign: 'center',
            }}
          >
            <p
              className="font-display font-extrabold mb-3"
              style={{ fontSize: '1.3rem', color: 'var(--ink)' }}
            >
              Prêt à passer à l&apos;action ?
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Un audit gratuit de 30 minutes pour voir où vous en êtes et ce qui peut changer rapidement.
            </p>
            <Link
              href="/audit-gratuit"
              style={{
                display: 'inline-block',
                borderRadius: 999,
                padding: '0.85rem 2rem',
                backgroundColor: 'var(--brand)',
                color: 'var(--on-brand)',
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
          <div style={{ marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.25rem 0.65rem',
                    border: '1px solid var(--line)',
                    color: 'var(--ink-3)',
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
              Autres articles
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--line)' }}>
              {autresArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block p-6"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                >
                  <div
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--brand)',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {a.categorie}
                  </div>
                  <h3
                    className="font-display font-extrabold group-hover:text-[var(--brand)] transition-colors"
                    style={{ fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.3, marginBottom: '0.5rem' }}
                  >
                    {a.titre}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>
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
