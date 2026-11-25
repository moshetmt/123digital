import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { cvCaptures, type CvContent } from '@/data/cv'

/**
 * Cartes des realisations de /portfolio, une par projet de `data/portfolio.ts`.
 * Toute la carte est un lien ; au survol elle s'eclaire legerement.
 * Projet sans site (Cours 2.0) : la carte ouvre l'etude de cas.
 */
export function CvWork({ work }: { work: CvContent['work'] }) {
  return (
    <ul className="flex flex-col gap-12 sm:gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {projects.map((project) => {
        const texte = work.projects?.[project.id]
        const sector = texte?.sector ?? project.sector
        const description = texte?.description ?? project.description
        const results = texte?.results ?? project.results
        const tags = texte?.tags ?? project.tags

        const href = project.url ?? `/realisations/${project.id}`
        const externe = Boolean(project.url)
        const libelle = !project.url
          ? work.openCase
          : project.url.includes('instagram.com')
            ? work.openInstagram
            : work.openSite
        const image = cvCaptures[project.id] ?? project.screenshot

        return (
          <li key={project.id}>
            <a
              href={href}
              {...(externe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group grid transition-colors hover:bg-[rgba(205,230,216,0.06)] hover:shadow-[inset_0_0_0_1px_rgba(205,230,216,0.12)] grid-cols-1 sm:grid-cols-[11rem_1fr] gap-4 sm:gap-6 rounded-lg sm:p-4"
            >
              {image ? (
                <div
                  className="overflow-hidden rounded self-start"
                  style={{ border: '1px solid rgba(205, 230, 216, 0.16)' }}
                >
                  <Image
                    src={image}
                    alt=""
                    width={1440}
                    height={900}
                    sizes="(min-width: 640px) 176px, 100vw"
                    style={{ width: '100%', height: 'auto', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
              ) : null}

              <div className="min-w-0">
                <h3
                  className="inline-flex items-baseline gap-1.5 transition-colors group-hover:text-[#6FB791]"
                  style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F2F7F4', lineHeight: 1.3 }}
                >
                  {project.title}
                  <ArrowUpRight
                    size={15}
                    aria-hidden
                    className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#8FA497', fontWeight: 600, marginTop: '0.15rem' }}>{sector}</p>
                <p style={{ fontSize: '0.9rem', color: '#C9D6CE', lineHeight: 1.6, marginTop: '0.55rem' }}>{description}</p>
                <p style={{ fontSize: '0.88rem', color: '#C9D6CE', lineHeight: 1.55, marginTop: '0.5rem' }}>
                  <span style={{ color: '#6FB791', fontWeight: 700 }}>{work.resultLabel} </span>
                  {results}
                </p>
                <p style={{ fontSize: '0.78rem', color: '#8FA497', marginTop: '0.6rem' }}>{tags.join(' · ')}</p>
                <p
                  className="inline-flex items-center gap-1 underline underline-offset-4"
                  style={{ fontSize: '0.84rem', fontWeight: 700, color: '#6FB791', marginTop: '0.7rem', textDecorationColor: 'rgba(111, 183, 145, 0.5)' }}
                >
                  {libelle}
                </p>
              </div>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
