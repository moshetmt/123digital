import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
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

const d = t('en')

export const metadata: Metadata = {
  title: d.realisations.title,
  description: d.realisations.description,
  alternates: {
    canonical: `${BASE_URL}/en/realisations`,
    ...languesPour('/en/realisations'),
  },
}

// The 3 real metrics, identical to the Results bar on the homepage (Results.tsx).
// Do not invent others: only these are verified. Clim69 no longer has a figure
// here: the client does not want their amounts made public.
const metrics = [
  { value: '+180%', caption: 'local visibility in 5 months (Rhône Déconstruction)' },
  { value: '+240%', caption: 'organic traffic (A+ Audition, Cannes)' },
  { value: '50+', caption: 'businesses supported since 2017' },
]

export default function CaseStudiesPage() {
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Home', path: '/en' },
      { name: d.nav.realisations, path: '/en/realisations' },
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
              { label: d.nav.home, href: '/en' },
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
            <BannerCtaLine href="/en/audit">{d.hero.ctaQuote}</BannerCtaLine>
          </>
        }
      />

      {/* Proof — the page's one dark section, gradation of the logo's 3 tones */}
      <section
        id="realisations-metrics"
        aria-label={d.results.label}
        style={{ backgroundColor: 'var(--dark)', padding: 'clamp(2.25rem, 6vw, 3.5rem) 1.5rem' }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-center">
          {metrics.map((m, i) => (
            /* Three figures on a 2-column grid: the last one spans the full
               width so it does not sit alone in a half row. */
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

      {/* Client cases — the 3 only verifiable cases, data/portfolio.ts */}
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
                      href="/en/audit"
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

      {/* Final CTA — the page's one solid green block */}
      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA lang="en" />
    </>
  )
}
