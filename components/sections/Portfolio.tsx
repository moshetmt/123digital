import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, type PortfolioProject } from '@/data/portfolio'
import { t, type Locale } from '@/lib/i18n'

function ProjectCard({ project }: { project: PortfolioProject }) {
  const domain = project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null

  return (
    <article
      className="flex flex-col rounded-2xl"
      style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)', padding: 'clamp(1rem, 3.5vw, 1.5rem)', gap: '0.45rem' }}
    >
      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
        {project.sector}
      </span>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>
        {project.title}
      </h3>
      <div
        style={{
          backgroundColor: 'var(--brand-tint)',
          color: 'var(--brand-strong)',
          borderRadius: 12,
          padding: '0.6rem 0.85rem',
          fontSize: '0.87rem',
          fontWeight: 700,
          width: 'fit-content',
        }}
      >
        {project.results}
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.45 }}>
        {project.description}
      </p>
      {domain && project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-bold mt-1"
          style={{ color: 'var(--brand-strong)' }}
        >
          {domain} <ArrowUpRight size={14} aria-hidden />
        </a>
      )}
    </article>
  )
}

export function Portfolio({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).portfolio

  return (
    <section
      id="section-portfolio"
      style={{ backgroundColor: 'var(--surface)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6 mb-5 sm:mb-10"
        >
          <div>
            <div
              className="mb-3"
              style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
            >
              {d.label}
            </div>
            <h2
              id="portfolio-heading"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
                maxWidth: '30ch',
              }}
            >
              {d.heading}
            </h2>
          </div>

          <Link
            href={lang === 'en' ? '/en/realisations' : '/realisations'}
            className="inline-flex items-center gap-2 text-sm font-bold shrink-0"
            style={{ color: 'var(--ink-2)' }}
          >
            {d.cta}
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
