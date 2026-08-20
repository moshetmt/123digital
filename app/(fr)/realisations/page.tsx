import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { projects } from '@/data/portfolio'
import { t } from '@/lib/i18n'
import { languesPour } from '@/data/hreflang'
import { CTA } from '@/components/sections/CTA'

const PHONE_TEL = 'tel:+33652092301'
const PHONE_DISPLAY = '06 52 09 23 01'

export const metadata: Metadata = {
  title: 'Réalisations — Résultats SEO & Web pour PME | 123 Digital',
  description:
    'Résultats concrets pour PME : SEO, site web, Google Ads. Projets de Maurice Timsit et performances mesurées pour ses clients lyonnais.',
  alternates: { canonical: `${BASE_URL}/realisations`, ...languesPour('/realisations') },
  openGraph: {
    title: 'Portfolio — 123 Digital',
    description: 'Réalisations et résultats concrets pour des PME en croissance digitale.',
    url: `${BASE_URL}/realisations`,
  },
}

// Les 3 métriques réelles, identiques à la bande Résultats de l'accueil (Results.tsx).
// Ne pas en inventer d'autres : seules celles-ci sont vérifiées. Clim69 n'a plus
// de chiffre ici : le client refuse que ses montants soient publics.
const metrics = [
  { value: '+180%', caption: 'de visibilité locale en 5 mois (Rhône Déconstruction)' },
  { value: '+240%', caption: 'de trafic organique (A+ Audition, Cannes)' },
  { value: '50+', caption: 'entreprises accompagnées depuis 2017' },
]

export default function PortfolioPage() {
  const lang = 'fr' as const
  const d = t(lang)

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: d.nav.realisations, path: '/realisations' },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        icone="trophy"
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: d.nav.home, href: '/' },
              { label: d.nav.realisations },
            ]}
          />
        }
        title={`${d.realisations.heading1} ${d.realisations.heading2}`}
        highlight={d.realisations.heading2}
        sub={d.realisations.intro}
        actions={
          <>
            <BannerCta href={PHONE_TEL}>{PHONE_DISPLAY}</BannerCta>
            <BannerCtaLine href="/audit-gratuit">{d.hero.ctaQuote}</BannerCtaLine>
          </>
        }
      />

      {/* Preuve — unique section sombre de la page, gradation des 3 tons du logo */}
      <section
        id="realisations-metrics"
        aria-label={d.results.label}
        style={{ backgroundColor: 'var(--dark)', padding: 'clamp(2.25rem, 6vw, 3.5rem) 1.5rem' }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-center">
          {metrics.map((m, i) => (
            /* Trois chiffres sur une grille a 2 colonnes : le dernier prend
               toute la largeur pour ne pas rester seul dans un demi-rang. */
            <div key={m.caption} className={i === metrics.length - 1 ? 'col-span-2 lg:col-span-1' : undefined}>
              <div
                className="font-sans font-extrabold"
                style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)', letterSpacing: '-0.02em', color: `var(--vert-${[3, 2, 1, 2][i % 4]})` }}
              >
                {m.value}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--cream-2)', lineHeight: 1.45, marginTop: '0.4rem' }}>{m.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cas clients — les 3 seuls cas vérifiables, data/portfolio.ts */}
      <section
        id="realisations-cas"
        className="bg-background"
        style={{ padding: 'clamp(2.5rem, 6vw, 4.5rem) 1.5rem' }}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className="font-sans font-extrabold mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--ink)', maxWidth: '30ch' }}
          >
            {d.caseStudiesPage.sectionHeading}
          </h2>
          <p className="mb-8" style={{ color: 'var(--ink-2)', maxWidth: '55ch' }}>{d.caseStudiesPage.sectionSub}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => {
              const domain = project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null
              return (
                <article
                  key={project.id}
                  className="flex flex-col rounded-2xl"
                  style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)', padding: '1.5rem', gap: '0.6rem' }}
                >
                  {/* La capture du site livré. `data/portfolio.ts` prévoyait le
                      champ `screenshot` depuis le début, mais aucun projet ne le
                      renseignait et aucune image n'existait : la page qui montre
                      le travail d'une agence web ne montrait aucun site.
                      Captures faites le 20/08 en 1440x900, haut de page. */}
                  {project.screenshot && (
                    <div
                      className="relative overflow-hidden rounded-xl"
                      style={{ aspectRatio: '16 / 10', border: '1px solid var(--line)', marginBottom: '0.4rem' }}
                    >
                      <Image
                        src={project.screenshot}
                        alt={`Page d'accueil du site ${project.title}, réalisé par 123 Digital`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      />
                    </div>
                  )}
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
                    {project.sector}
                  </span>
                  <h3 className="font-sans font-extrabold" style={{ fontSize: '1.15rem', color: 'var(--ink)', lineHeight: 1.2 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>{project.category}</p>

                  <div
                    className="inline-flex items-center gap-1.5 w-fit"
                    style={{ backgroundColor: 'var(--brand-tint)', color: 'var(--brand-strong)', borderRadius: 12, padding: '0.55rem 0.8rem', fontSize: '0.85rem', fontWeight: 700, marginTop: '0.2rem' }}
                  >
                    <Check size={15} aria-hidden style={{ flexShrink: 0 }} />
                    {project.results}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{project.description}</p>

                  <div className="flex flex-wrap gap-1.5" style={{ marginTop: '0.2rem' }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ backgroundColor: 'var(--surface-3)', color: 'var(--ink-2)', borderRadius: 999, padding: '0.22rem 0.65rem', fontSize: '0.72rem', fontWeight: 600 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2" style={{ marginTop: 'auto', paddingTop: '0.9rem', borderTop: '1px solid var(--line)' }}>
                    {domain && project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-bold"
                        style={{ color: 'var(--brand-strong)' }}
                      >
                        {domain} <ArrowUpRight size={14} aria-hidden />
                      </a>
                    ) : <span />}
                    <Link
                      href="/audit-gratuit"
                      className="inline-flex items-center gap-1 text-sm font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      {d.caseStudiesPage.sameResultCta} <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
