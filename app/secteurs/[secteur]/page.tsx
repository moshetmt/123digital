import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { secteurs, getSecteurBySlug } from '@/data/secteurs'

interface PageProps {
  params: Promise<{ secteur: string }>
}

export async function generateStaticParams() {
  return secteurs.map((s) => ({ secteur: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { secteur: secteurSlug } = await params
  const secteur = getSecteurBySlug(secteurSlug)
  if (!secteur) return {}

  const title = `Marketing digital pour ${secteur.nomPluriel} — Expert PME | 123 Digital`
  const description = `Stratégie digitale sur mesure pour les ${secteur.nomPluriel.toLowerCase()} : ${secteur.solutions.slice(0, 2).join(', ')}. Audit gratuit 30 min avec Maurice Timsit, consultant digital à Lyon.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/secteurs/${secteurSlug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/secteurs/${secteurSlug}`,
    },
  }
}

export default async function SecteurPage({ params }: PageProps) {
  const { secteur: secteurSlug } = await params
  const secteur = getSecteurBySlug(secteurSlug)
  if (!secteur) notFound()

  const autresSecteurs = secteurs.filter((s) => s.slug !== secteur.slug)

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Secteurs d\'activité', path: '/secteurs' },
      { name: secteur.nom, path: `/secteurs/${secteur.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: secteur.faqs.map(({ question, reponse }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: reponse },
      })),
    },
  ]

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
                { label: 'Secteurs', href: '/secteurs' },
                { label: secteur.nom },
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
            {secteur.emoji} Secteur · {secteur.nom}
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
            Marketing digital<br />
            <em
              style={{
                color: '#00FF87',
                fontStyle: 'italic',
                fontFamily: 'var(--font-instrument-serif)',
              }}
            >
              pour les {secteur.nomPluriel.toLowerCase()}
            </em>
          </h1>

          <p
            className="text-base leading-relaxed mb-8 max-w-2xl"
            style={{ color: 'rgba(225,224,204,0.65)' }}
          >
            {secteur.description}
          </p>

          <div className="flex gap-4 flex-wrap">
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
            <Link
              href="/secteurs"
              className="hover:border-[#00FF87] hover:text-[#00FF87] transition-colors"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                border: '1px solid rgba(225,224,204,0.2)',
                color: 'rgba(225,224,204,0.7)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              ← Tous les secteurs
            </Link>
          </div>
        </div>
      </section>

      {/* Problèmes identifiés */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
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
                Ce que vous vivez
              </div>
              <ul className="space-y-4">
                {secteur.problemes.map((probleme, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'rgba(225,224,204,0.3)', marginTop: '0.1rem', flexShrink: 0 }}>✕</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(225,224,204,0.65)', lineHeight: 1.6 }}>
                      {probleme}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
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
                Ce que je mets en place
              </div>
              <ul className="space-y-4">
                {secteur.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: '#00FF87', marginTop: '0.1rem', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(225,224,204,0.65)', lineHeight: 1.6 }}>
                      {solution}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
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
            Résultats concrets
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
            {secteur.resultats.map((resultat, i) => (
              <div
                key={i}
                className="p-6"
                style={{ backgroundColor: '#080808' }}
              >
                <p style={{ fontSize: '0.9rem', color: '#E1E0CC', lineHeight: 1.6 }}>
                  {resultat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-3xl">
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
          <h2
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            {secteur.nomPluriel} & digital —<br />vos questions
          </h2>
          <dl className="space-y-8">
            {secteur.faqs.map(({ question, reponse }, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(225,224,204,0.08)', paddingTop: '2rem' }}>
                <dt className="font-display font-normal mb-3" style={{ fontSize: '1.05rem', color: '#E1E0CC' }}>
                  {question}
                </dt>
                <dd style={{ color: 'rgba(225,224,204,0.65)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {reponse}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Autres secteurs */}
      <section
        className="bg-black"
        style={{ padding: '3rem 1.5rem 4rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.4)',
              marginBottom: '1rem',
              fontWeight: 700,
            }}
          >
            Autres secteurs
          </p>
          <div className="flex flex-wrap gap-3">
            {autresSecteurs.map((s) => (
              <Link
                key={s.slug}
                href={`/secteurs/${s.slug}`}
                className="hover:text-[#00FF87] hover:border-[#00FF87] transition-colors"
                style={{
                  padding: '0.4rem 0.9rem',
                  border: '1px solid rgba(225,224,204,0.12)',
                  color: 'rgba(225,224,204,0.55)',
                  fontSize: '0.8rem',
                }}
              >
                {s.emoji} {s.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Développez votre {secteur.nom.toLowerCase()}<br />grâce au digital ?
          </h2>
          <p style={{ color: 'rgba(225,224,204,0.6)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Un audit gratuit de 30 minutes pour identifier les 3 leviers les plus rentables pour votre {secteur.nom.toLowerCase()}. Sans engagement, sans jargon.
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
            Demander mon audit gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
