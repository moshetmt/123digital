'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Variants } from 'framer-motion'
import { projects } from '@/data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ── Parse results string into metric + sub-description ────────────────────────
// "+320% de visibilité locale en 4 mois" → { metric: "+320%", sub: "de visibilité locale en 4 mois" }
// "ROAS 4,2x — Communauté Instagram ×3"  → { metric: "ROAS 4,2x", sub: "Communauté Instagram ×3" }

function parseResult(results: string): { metric: string; sub: string } {
  if (results.includes('—')) {
    const [a, b] = results.split('—')
    return { metric: a.trim(), sub: b?.trim() ?? '' }
  }
  const match = results.match(/^([+×]?[\d,.]+\s*[%×xhm]?)/)
  if (match) {
    return { metric: match[1].trim(), sub: results.slice(match[0].length).trim() }
  }
  return { metric: results, sub: '' }
}

// ── WordPullUp ────────────────────────────────────────────────────────────────

function WordPullUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const words = text.split(' ')
  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.18em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.85, ease: PULL_EASE, delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { metric, sub } = parseResult(project.results)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, rotate: -3, y: 20 }}
      animate={inView ? { opacity: 1, rotate: 0, y: 0 } : {}}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 0 1px var(--brand-line), 0 24px 48px oklch(0.30 0.02 95 / 0.09)',
      }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
      role="listitem"
      className="flex flex-col rounded-2xl relative overflow-hidden"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        padding: '1.75rem',
        minHeight: '280px',
        willChange: 'transform',
        cursor: 'default',
      }}
    >
      {/* Hover overlay — monte du bas */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        initial={{ y: '100%', opacity: 0 }}
        whileHover={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: '40%',
          background: 'linear-gradient(to top, var(--brand-tint) 0%, transparent 100%)',
        }}
        aria-hidden
      />
      {/* Metric — vert var(--brand) comme Results, font-bold cohérent */}
      <div className="mb-5">
        <p
          className="font-display font-bold leading-none"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--brand)',
            letterSpacing: '-0.04em',
            fontFeatureSettings: '"tnum"',
            marginBottom: '0.25rem',
          }}
        >
          {metric}
        </p>
        {sub && (
          <p style={{ fontSize: '0.72rem', color: 'var(--ink-2)' }}>
            {sub}
          </p>
        )}
      </div>

      {/* Sector */}
      <span
        style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ink-3)',
          display: 'block',
          marginBottom: '0.5rem',
        }}
      >
        {project.sector}
      </span>

      {/* Title */}
      <h3
        className="font-display font-normal leading-snug"
        style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          letterSpacing: '-0.01em',
          color: 'var(--ink)',
          marginBottom: '0.75rem',
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="text-xs leading-relaxed flex-1"
        style={{ color: 'var(--ink-2)' }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium"
            style={{
              backgroundColor: 'var(--brand-tint)',
              color: 'var(--brand)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

// ── Portfolio section ─────────────────────────────────────────────────────────

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="section-portfolio"
      className="bg-background"
      style={{ padding: '7rem 1.5rem' }}
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-7xl" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        >
          <div>
            {/* Eyebrow with green dot */}
            <div
              className="flex items-center gap-2 mb-5"
              style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 700 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--brand)' }}
                aria-hidden
              />
              Réalisations
            </div>

            {/* Heading — word pull-up bicolore */}
            <h2
              id="portfolio-heading"
              className="font-display font-normal"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', color: 'var(--ink)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              <WordPullUp text="Résultats concrets." delay={0.05} />
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-60 shrink-0"
            style={{ color: 'var(--ink-2)' }}
          >
            Voir tout
            <ArrowRight size={14} aria-hidden />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 text-xs italic"
          style={{ color: 'var(--ink-3)' }}
        >
          * Projets présentés avec accord des clients ou à titre illustratif.
        </motion.p>
      </div>
    </section>
  )
}
