import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { projects } from '@/data/portfolio'
import { t } from '@/lib/i18n'
import { languesPour } from '@/data/hreflang'

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

      {/* Hero — CTA visible on the first screen */}
      <section
        id="realisations-hero"
        className="bg-background"
        style={{ padding: 'clamp(1.75rem, 5vw, 3rem) 1.5rem clamp(2rem, 5vw, 3rem)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-5">
            <Breadcrumb
              items={[
                { label: d.nav.home, href: '/en' },
                { label: d.nav.realisations },
              ]}
            />
          </div>

          <div
            className="inline-flex items-center gap-2 mb-4"
            style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            {d.realisations.badge}
          </div>

          <h1
            className="font-sans font-extrabold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.6rem)', color: 'var(--ink)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: '18ch' }}
          >
            {d.realisations.heading1}{' '}
            <span style={{ color: 'var(--brand)' }}>{d.realisations.heading2}</span>
          </h1>

          <p className="text-base leading-relaxed max-w-xl mb-6" style={{ color: 'var(--ink-2)' }}>
            {d.realisations.intro}
          </p>

          <div className="flex flex-wrap gap-3 mb-5">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full font-bold transition-colors"
              style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.85rem 1.5rem', fontSize: '0.92rem' }}
            >
              <Phone size={16} aria-hidden /> {PHONE_DISPLAY}
            </a>
            <Link
              href="/en/audit"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-colors hover:bg-[var(--surface-3)]"
              style={{ border: '2px solid var(--line-strong)', color: 'var(--ink)', padding: '0.8rem 1.4rem', fontSize: '0.92rem' }}
            >
              {d.hero.ctaQuote} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[d.hero.check1, d.hero.check2, d.hero.check3].map((check) => (
              <li key={check} className="inline-flex items-center gap-1.5" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-2)' }}>
                <Check size={15} style={{ color: 'var(--brand)', flexShrink: 0 }} aria-hidden />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </section>

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
      <section
        id="realisations-cta"
        style={{ backgroundColor: 'var(--brand)', padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-sans font-extrabold mb-3"
            style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)', color: 'var(--on-brand)', lineHeight: 1.12 }}
          >
            {d.caseStudiesPage.finalHeading}
          </h2>
          <p style={{ color: 'oklch(0.985 0.003 150 / 88%)', marginBottom: '2rem', lineHeight: 1.65, maxWidth: '48ch', marginLeft: 'auto', marginRight: 'auto' }}>
            {d.caseStudiesPage.finalBody}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ backgroundColor: 'var(--on-brand)', color: 'var(--brand-strong)', padding: '0.85rem 1.5rem', fontSize: '0.92rem' }}
            >
              <Phone size={16} aria-hidden /> {PHONE_DISPLAY}
            </a>
            <Link
              href="/en/audit"
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ border: '2px solid oklch(0.985 0.003 150 / 55%)', color: 'var(--on-brand)', padding: '0.8rem 1.4rem', fontSize: '0.92rem' }}
            >
              {d.caseStudiesPage.finalCtaBtn} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
