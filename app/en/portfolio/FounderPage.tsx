import Image from 'next/image'
import Link from 'next/link'
import { Phone, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { t } from '@/lib/i18n'

const PHONE_TEL = 'tel:+33652092301'
const PHONE_DISPLAY = '06 52 09 23 01'

export function FounderPage() {
  const lang = 'en' as const
  const d = t(lang)

  return (
    <>
      {/* Hero — the founder, with a call to action on the first screen */}
      <section
        id="founder-hero"
        className="bg-background"
        style={{ padding: 'clamp(1.75rem, 5vw, 3rem) 1.5rem clamp(2rem, 5vw, 3rem)' }}
      >
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
          <div className="flex justify-center md:justify-start order-first">
            <div
              className="relative overflow-hidden rounded-full shrink-0"
              style={{ width: 96, height: 96, border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)' }}
            >
              <Image src="/portraitmaurice.png" alt="Maurice Timsit" fill sizes="96px" style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
            </div>
          </div>

          <div>
            <div
              className="inline-flex items-center gap-2 mb-3"
              style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
              {d.founderPage.kicker}
            </div>

            <h1
              className="font-sans font-extrabold mb-3"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', color: 'var(--ink)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
            >
              {d.about.heading}
            </h1>

            <p className="text-base leading-relaxed max-w-xl mb-6" style={{ color: 'var(--ink-2)' }}>
              {d.about.body}
            </p>

            <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section
        id="founder-positioning"
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3rem) 1.5rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-10">
          <h2
            className="font-sans font-extrabold"
            style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--ink)' }}
          >
            {d.founderPage.positioningHeading}
          </h2>
          <div>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '1rem' }}>{d.founderPage.positioningBody}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[d.hero.check1, d.hero.check2, d.hero.check3].map((check) => (
                <li key={check} className="inline-flex items-center gap-1.5" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-2)' }}>
                  <Check size={15} style={{ color: 'var(--brand)', flexShrink: 0 }} aria-hidden />
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Results — the 3 verifiable cases, as a numbered progression */}
      <section
        id="founder-cas"
        className="bg-background"
        style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-4xl">
          <h2
            className="font-sans font-extrabold mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--ink)', maxWidth: '30ch' }}
          >
            {d.founderPage.casesHeading}
          </h2>
          <p className="mb-8" style={{ color: 'var(--ink-2)', maxWidth: '55ch' }}>{d.founderPage.casesSub}</p>

          <div className="flex flex-col gap-4">
            {projects.map((project, i) => {
              const domain = project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null
              return (
                <article
                  key={project.id}
                  className="flex flex-col sm:flex-row gap-4 rounded-2xl"
                  style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)', padding: '1.5rem' }}
                >
                  <span
                    className="flex items-center justify-center rounded-full font-extrabold shrink-0"
                    style={{ width: 40, height: 40, backgroundColor: 'var(--brand)', color: 'var(--on-brand)', fontSize: '0.95rem' }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 flex flex-col gap-1.5">
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
                      {project.sector} · {project.category}
                    </span>
                    <h3 className="font-sans font-extrabold" style={{ fontSize: '1.1rem', color: 'var(--ink)', lineHeight: 1.2 }}>
                      {project.title}
                    </h3>
                    <div
                      className="inline-flex items-center gap-1.5 w-fit"
                      style={{ backgroundColor: 'var(--brand-tint)', color: 'var(--brand-strong)', borderRadius: 12, padding: '0.5rem 0.75rem', fontSize: '0.83rem', fontWeight: 700, marginTop: '0.15rem' }}
                    >
                      <Check size={14} aria-hidden style={{ flexShrink: 0 }} />
                      {project.results}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55, marginTop: '0.15rem' }}>{project.description}</p>

                    <div className="flex flex-wrap gap-1.5" style={{ marginTop: '0.1rem' }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{ backgroundColor: 'var(--surface-3)', color: 'var(--ink-2)', borderRadius: 999, padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontWeight: 600 }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--line)' }}>
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
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA — the page's one solid green block */}
      <section
        id="founder-cta"
        style={{ backgroundColor: 'var(--brand)', padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-sans font-extrabold mb-3"
            style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)', color: 'var(--on-brand)', lineHeight: 1.12 }}
          >
            {d.founderPage.finalHeading}
          </h2>
          <p style={{ color: 'oklch(0.985 0.003 150 / 88%)', marginBottom: '2rem', lineHeight: 1.65, maxWidth: '48ch', marginLeft: 'auto', marginRight: 'auto' }}>
            {d.founderPage.finalBody}
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
              {d.founderPage.finalCtaBtn} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
