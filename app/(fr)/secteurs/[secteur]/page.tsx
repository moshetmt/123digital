import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqListe } from '@/components/sections/FaqListe'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { secteurs, getSecteurBySlug, scenesSecteurs } from '@/data/secteurs'
import { getProblemeBySlug } from '@/data/problemes'
import { services } from '@/data/services'
import { villesARA } from '@/data/villes'
import { estIndexable } from '@/data/indexation'
import { CTA } from '@/components/sections/CTA'

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

  const title = `${secteur.seoTitle ?? `Marketing digital pour ${secteur.nomPluriel}`} | 123 Digital`
  const description = secteur.seoDescription ?? secteur.description

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

const CHIP =
  'inline-flex items-center min-h-[44px] px-4 rounded font-bold text-[0.85rem] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand-strong)]'
const CHIP_STYLE = { backgroundColor: 'var(--surface-3)', color: 'var(--ink)', borderRadius: '9999px' }

const SECTION_PAD = 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem'

const EYEBROW = {
  fontSize: '0.65rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: '1.25rem',
} as const

// Liste de points ; au-delà de 4, le reste se replie dans un <details> natif (sans JavaScript).
function Points({
  items,
  icone,
  couleur,
  texte,
}: {
  items: string[]
  icone: 'check' | 'x'
  couleur: string
  texte: string
}) {
  const Icone = icone === 'check' ? Check : X
  const rendre = (liste: string[]) =>
    liste.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <Icone size={16} strokeWidth={3} aria-hidden style={{ color: couleur, marginTop: '0.15rem', flexShrink: 0 }} />
        <span style={{ fontSize: '0.92rem', color: texte, lineHeight: 1.6 }}>{t}</span>
      </li>
    ))
  const debut = items.slice(0, 4)
  const reste = items.slice(4)

  return (
    <>
      <ul className="space-y-4">{rendre(debut)}</ul>
      {reste.length > 0 && (
        <details className="mt-4">
          <summary
            className="inline-flex items-center min-h-[44px] cursor-pointer font-bold"
            style={{ fontSize: '0.85rem', color: texte, textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Voir tout
          </summary>
          <ul className="space-y-4 mt-3">{rendre(reste)}</ul>
        </details>
      )}
    </>
  )
}

export default async function SecteurPage({ params }: PageProps) {
  const { secteur: secteurSlug } = await params
  const secteur = getSecteurBySlug(secteurSlug)
  if (!secteur) notFound()

  // Minuscule sur la premiere lettre seulement : « artisans BTP », pas « artisans btp ».
  const nomMin = secteur.nomPluriel.charAt(0).toLowerCase() + secteur.nomPluriel.slice(1)
  const autresSecteurs = secteurs.filter((s) => s.slug !== secteur.slug)
  const villesLiees = villesARA.filter((v) => v.priority === 'high' && estIndexable(`/${v.slug}`))
  const scene = scenesSecteurs[secteur.slug]
  const cartesProblemes = secteur.problemesLies.flatMap((slug) => {
    const page = getProblemeBySlug(slug)
    return page ? [{ slug, titre: page.titre }] : []
  })
  const prestations = secteur.services.flatMap((id) => services.find((x) => x.id === id) ?? [])

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

      <PageBanner
        icone="store"
        align="left"
        illustration={
          scene
            ? { src: `/images/illustrations/secteurs/${secteur.slug}.webp`, width: scene[0], height: scene[1], compactMobile: true }
            : undefined
        }
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Secteurs', href: '/secteurs' },
              { label: secteur.nom },
            ]}
          />
        }

        title={`Marketing digital pour les ${nomMin}`}
        highlight={`pour les ${nomMin}`}
        sub={secteur.description}
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/secteurs">Tous les secteurs</BannerCtaLine>
          </>
        }
      />

      {/* Le visiteur choisit son problème : trois pages dédiées, plus la sortie vers l'audit */}
      <section className="bg-background" style={{ padding: SECTION_PAD }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            Votre problème du moment
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" role="list">
            {cartesProblemes.map((c) => (
              <li key={c.slug} className="flex">
                <Link
                  href={`/problemes/${c.slug}`}
                  className="flex w-full flex-col justify-between gap-4 rounded transition-colors hover:border-[var(--brand)]"
                  style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: '1.1rem', minHeight: '44px' }}
                >
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.3, color: 'var(--ink)' }}>
                    {c.titre}
                  </span>
                  <ArrowRight size={18} strokeWidth={2.5} aria-hidden style={{ color: 'var(--brand)' }} />
                </Link>
              </li>
            ))}
            <li className="flex">
              <Link
                href="/audit-gratuit"
                className="flex w-full flex-col justify-between gap-4 rounded transition-colors hover:border-[var(--brand)]"
                style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: '1.1rem', minHeight: '44px' }}
              >
                <span>
                  <span className="block" style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.3, color: 'var(--ink)' }}>
                    Autre chose ?
                  </span>
                  <span className="block mt-1" style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.4 }}>
                    Audit gratuit 30 min
                  </span>
                </span>
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden style={{ color: 'var(--brand)' }} />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Deux panneaux qui se répondent */}
      <section className="bg-background" style={{ backgroundColor: 'var(--surface-3)',  padding: '0 1.5rem clamp(2.25rem, 6vw, 4.5rem)' }}>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded"
            style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: 'clamp(1.25rem, 4vw, 2rem)' }}
          >
            <h2 style={{ ...EYEBROW, color: 'var(--ink-2)' }}>Ce que vous vivez</h2>
            <Points items={secteur.problemes} icone="x" couleur="var(--ink-3)" texte="var(--ink-2)" />
          </div>
          <div
            className="rounded"
            style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: 'clamp(1.25rem, 4vw, 2rem)' }}
          >
            <h2 style={{ ...EYEBROW, color: 'var(--on-brand)' }}>Ce que je mets en place</h2>
            <Points items={secteur.solutions} icone="check" couleur="var(--on-brand)" texte="var(--on-brand)" />
          </div>
        </div>
      </section>

      {/* Prestations concernées */}
      <section className="bg-background" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            Les prestations concernées
          </h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {prestations.map((x) => (
              <li key={x.id}>
                <Link href={x.href} className={CHIP} style={CHIP_STYLE}>
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-3xl">
          <div style={{ ...EYEBROW, color: 'var(--ink-2)', marginBottom: '1.5rem' }}>Questions fréquentes</div>
          <h2
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            {secteur.nomPluriel} & digital :<br />vos questions
          </h2>
          {/* Accordeon natif : la liste depliee pesait environ 1000 px sur
              telephone. Le schema FAQPage de la page reste inchange. */}
          <FaqListe items={secteur.faqs.map((f) => ({ question: f.question, answer: f.reponse }))} />
        </div>
      </section>

      {/* Zones d'intervention : seules les villes dont la page est indexable */}
      <section className="bg-background" style={{ padding: SECTION_PAD, borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <div style={{ ...EYEBROW, color: 'var(--ink-2)', marginBottom: '1.5rem' }}>Zones d&apos;intervention</div>
          <h2
            className="font-display font-extrabold mb-5"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            {secteur.nomPluriel} en Auvergne-Rhône-Alpes
          </h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {villesLiees.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}`} className={CHIP} style={CHIP_STYLE}>
                  {v.nom}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Autres secteurs */}
      <section className="bg-background" style={{ padding: '2.5rem 1.5rem 4rem', borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <h2 style={{ ...EYEBROW, color: 'var(--ink-3)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>Autres secteurs</h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {autresSecteurs.map((s) => (
              <li key={s.slug}>
                <Link href={`/secteurs/${s.slug}`} className={CHIP} style={CHIP_STYLE}>
                  {s.nom}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulaire : composant unique CTA.tsx, déjà présent avant la refonte et non fourni par le layout */}
      <CTA />
    </>
  )
}
