import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
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
        breadcrumb={
          <Breadcrumb tone="vert"
            items={[
              { label: d.nav.home, href: '/en' },
              { label: d.nav.realisations },
            ]}
          />
        }
        title={`${d.realisations.heading1} ${d.realisations.heading2}`}
        highlight="promises."
        sub={d.realisations.intro}
        actions={
          <>
            <BannerCta href={PHONE_TEL}>{PHONE_DISPLAY}</BannerCta>
            <BannerCtaLine href="/en/audit">{d.hero.ctaQuote}</BannerCtaLine>
          </>
        }
      />

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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {projects.map((project) => {
              const domain = project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null
              return (
                <article
                  key={project.id}
                  className="flex flex-col rounded"
                  style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', padding: '1.5rem', gap: '0.6rem' }}
                >
                  {/* The screenshot, set in a simplified browser frame: never a
                      raw capture (charte v2, section 6). */}
                  {project.screenshot && (
                    <div
                      className="overflow-hidden rounded"
                      style={{ border: '1px solid var(--line)', marginBottom: '0.4rem' }}
                    >
                      <div
                        style={{
                          background: 'var(--surface-3)',
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 10px',
                          fontSize: '0.72rem',
                          color: 'var(--ink-2)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {domain ?? project.title}
                      </div>
                      <div className="relative" style={{ aspectRatio: '16 / 10' }}>
                        <Image
                          src={project.screenshot}
                          alt={`Homepage of the ${project.title} website, built by 123 Digital`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      </div>
                    </div>
                  )}
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
                    {project.sector}
                  </span>
                  <h3 className="font-sans font-extrabold" style={{ fontSize: '1.15rem', color: 'var(--ink)', lineHeight: 1.2 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>{project.category}</p>

                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>{project.results}</p>

                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{project.description}</p>

                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-2)', marginTop: '0.2rem' }}>
                    {project.tags.join(' · ')}
                  </p>

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
