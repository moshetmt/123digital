'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, X } from 'lucide-react'
import type { CvContent } from '@/data/cv'
import { cvScreenshots } from '@/data/cv'

/**
 * Bloc realisations du CV interactif : filtres par discipline et fiche detail
 * en modale. Seul composant client de la page, tout le reste est statique.
 */
export function CvWork({ work }: { work: CvContent['work'] }) {
  const [filter, setFilter] = useState<string>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? work.projects : work.projects.filter((p) => p.disciplines.includes(filter))),
    [filter, work.projects],
  )

  const open = openId ? work.projects.find((p) => p.id === openId) ?? null : null
  const close = useCallback(() => setOpenId(null), [])

  // Verrou de defilement + Echap pendant que la modale est ouverte.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const chips = [{ key: 'all', label: work.filterAll }, ...work.filters]

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label={work.heading}>
        {chips.map((chip) => {
          const active = filter === chip.key
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => setFilter(chip.key)}
              aria-pressed={active}
              className="rounded-full transition-colors"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: `1px solid ${active ? 'transparent' : 'var(--line-strong)'}`,
                backgroundColor: active ? 'var(--brand)' : 'transparent',
                color: active ? 'var(--on-brand)' : 'var(--ink-2)',
              }}
            >
              {chip.label}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p style={{ color: 'var(--ink-3)' }}>{work.emptyLabel}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {visible.map((project) => (
            <li key={project.id}>
              <article
                className="cv-card h-full flex flex-col overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  boxShadow: '0 8px 30px var(--shadow-soft)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(project.id)}
                  aria-haspopup="dialog"
                  className="text-left"
                  style={{ display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  {/* Cadre navigateur : la capture est le sujet de la carte */}
                  <span
                    className="block relative overflow-hidden"
                    style={{ aspectRatio: '16 / 10', backgroundColor: 'var(--surface-3)' }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5"
                      style={{ height: 22, padding: '0 0.6rem', backgroundColor: 'var(--surface-3)', borderBottom: '1px solid var(--line)' }}
                      aria-hidden
                    >
                      <span className="rounded-full" style={{ width: 7, height: 7, backgroundColor: 'var(--ink-4)' }} />
                      <span className="rounded-full" style={{ width: 7, height: 7, backgroundColor: 'var(--ink-4)' }} />
                      <span className="rounded-full" style={{ width: 7, height: 7, backgroundColor: 'var(--ink-4)' }} />
                      <span
                        className="ml-2 truncate"
                        style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--ink-3)' }}
                      >
                        {project.url.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    </span>
                    <Image
                      src={cvScreenshots[project.id]}
                      alt={`Capture du site ${project.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="cv-shot"
                      style={{ objectFit: 'cover', objectPosition: 'top center', paddingTop: 22 }}
                    />
                  </span>

                  <span className="block" style={{ padding: '1.15rem 1.25rem 0.5rem' }}>
                    <span
                      className="block"
                      style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}
                    >
                      {project.context}
                    </span>
                    <span
                      className="block font-sans font-extrabold"
                      style={{ fontSize: '1.15rem', color: 'var(--ink)', lineHeight: 1.2, margin: '0.3rem 0 0.15rem' }}
                    >
                      {project.name}
                    </span>
                    <span className="block" style={{ fontSize: '0.83rem', color: 'var(--ink-2)' }}>
                      {project.role}
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        backgroundColor: 'var(--brand-tint)',
                        color: 'var(--brand-strong)',
                        borderRadius: 12,
                        padding: '0.45rem 0.7rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        marginTop: '0.7rem',
                      }}
                    >
                      {project.headline}
                    </span>
                  </span>
                </button>

                <div
                  className="mt-auto flex items-center justify-between gap-3 flex-wrap"
                  style={{ padding: '0.85rem 1.25rem 1.1rem' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(project.id)}
                    aria-haspopup="dialog"
                    style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    {work.detailIntro}
                  </button>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                    style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-strong)' }}
                  >
                    {work.openSite} <ArrowUpRight size={14} aria-hidden />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {open ? <CvWorkDialog project={open} work={work} onClose={close} /> : null}
    </>
  )
}

function CvWorkDialog({
  project,
  work,
  onClose,
}: {
  project: CvContent['work']['projects'][number]
  work: CvContent['work']
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'oklch(0.195 0.006 155 / 55%)', padding: '0 0 0 0' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 24px 70px var(--shadow-soft)' }}
      >
        <div className="relative" style={{ aspectRatio: '16 / 9', backgroundColor: 'var(--surface-3)' }}>
          <Image
            src={cvScreenshots[project.id]}
            alt={`Capture du site ${project.name}`}
            fill
            sizes="(max-width: 640px) 100vw, 672px"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={work.closeLabel}
            className="absolute rounded-full inline-flex items-center justify-center"
            style={{ top: 12, right: 12, width: 34, height: 34, backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', cursor: 'pointer', color: 'var(--ink)' }}
          >
            <X size={17} aria-hidden />
          </button>
        </div>

        <div style={{ padding: '1.4rem 1.5rem 1.6rem' }}>
          <p style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
            {project.context}
          </p>
          <h3 className="font-sans font-extrabold" style={{ fontSize: '1.5rem', color: 'var(--ink)', lineHeight: 1.15, margin: '0.3rem 0 0.2rem' }}>
            {project.name}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', marginBottom: '0.9rem' }}>{project.role}</p>

          <ul className="flex flex-col gap-2" style={{ listStyle: 'none', padding: 0, margin: '0 0 1.2rem' }}>
            {project.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2.5"
                style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.6 }}
              >
                <span className="rounded-full shrink-0" style={{ width: 6, height: 6, marginTop: '0.5rem', backgroundColor: 'var(--brand)' }} aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>

          <p style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', marginBottom: '0.45rem' }}>
            {work.stackLabel}
          </p>
          <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '1.4rem' }}>
            {project.stack.map((tool) => (
              <span
                key={tool}
                style={{ backgroundColor: 'var(--surface-3)', color: 'var(--ink-2)', borderRadius: 999, padding: '0.25rem 0.7rem', fontSize: '0.74rem', fontWeight: 600 }}
              >
                {tool}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full font-bold"
            style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.75rem 1.35rem', fontSize: '0.88rem' }}
          >
            {work.openSite} <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}
