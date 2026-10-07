import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, articleSchema } from '@/lib/schema'
import { articles, getArticleBySlug } from '@/data/blog'
import { RenderSection } from '@/components/sections/ContenuRedactionnel'
import { CTA } from '@/components/sections/CTA'

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
        : [{ url: `${BASE_URL}/images/og-image.png`, width: 1200, height: 630, alt: article.titre }],
    },
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

      <PageBanner
        icone="pen-line"
        image={{ src: article.image, priority: true }}
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: article.categorie },
            ]}
          />
        }
        title={article.titre}
        sub={article.description}
        ballRadius={22}
      >
        <p style={{ marginTop: '0.9rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-2)' }}>
          {article.categorie} · {new Date(article.datePublication).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })} · {article.tempsLecture} min de lecture
        </p>
      </PageBanner>

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
                borderRadius: '0.25rem',
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
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}>
              {article.tags.join(' · ')}
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
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
      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
