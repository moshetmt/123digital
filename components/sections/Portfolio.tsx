import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, type PortfolioProject } from '@/data/portfolio'
import { t, type Locale } from '@/lib/i18n'

function ProjectCard({ project, stepsLabel }: { project: PortfolioProject; stepsLabel: string }) {
  const raw = project.url ? project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : null
  // Un compte Instagram s'affiche en @pseudo, pas en URL complète.
  const domain = raw?.startsWith('instagram.com/') ? `@${raw.split('/')[1]}` : raw

  return (
    <article
      className="flex flex-col rounded shrink-0 snap-start sm:shrink"
      style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: 'clamp(1rem, 3.5vw, 1.5rem)', gap: '0.45rem', width: 'min(82vw, 100%)' }}
    >
      {/* Maquette composée (cadre navigateur + téléphone sur fond pâle) : la carte
          n'ajoute qu'une bordure. */}
      {project.screenshot && (
        <div className="overflow-hidden rounded-[1.375rem]" style={{ border: '1px solid var(--line)', marginBottom: '0.4rem' }}>
          <div className="relative" style={{ aspectRatio: '16 / 10' }}>
            <Image
              src={project.screenshot}
              alt={`${project.title} : ${project.category}, réalisé par 123 Digital`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>
        </div>
      )}
      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
        {project.sector}
      </span>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>
        <Link href={`/realisations/${project.id}`}>{project.title}</Link>
      </h3>
      <div
        style={{
          color: 'var(--brand-strong)',
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
      {/* Le déroulé complet (étapes, choix, versions jetées) vit sur l'étude de cas :
          un bouton plein y mène, le site du client reste en contour. */}
      <div className="flex flex-wrap gap-2 mt-auto" style={{ paddingTop: '0.6rem' }}>
        <Link href={`/realisations/${project.id}`} className="btn-plein">
          {stepsLabel} <ArrowRight size={14} aria-hidden />
        </Link>
        {domain && project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-contour">
            {domain} <ArrowUpRight size={14} aria-hidden />
          </a>
        )}
      </div>
    </article>
  )
}

export function Portfolio({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).portfolio

  return (
    <section
      id="section-portfolio"
      style={{ backgroundColor: 'var(--surface-3)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
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
            className="btn-plein shrink-0"
          >
            {d.cta}
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        {/* Sur téléphone : carrousel horizontal (4 cartes empilées = 5 écrans).
            À partir de sm : grille. */}
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 sm:gap-4 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} stepsLabel={d.steps} />
          ))}
        </div>
      </div>
    </section>
  )
}
