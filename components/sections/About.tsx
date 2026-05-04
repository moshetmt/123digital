'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ── WordsPullUpMultiStyle ─────────────────────────────────────────────────────

interface Segment {
  text: string
  style?: React.CSSProperties
  serif?: boolean
}

function WordsPullUpMultiStyle({ segments, delay = 0 }: { segments: Segment[]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  let wordIdx = 0
  return (
    <div ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {segments.map((seg, segI) =>
        seg.text.split(' ').map((word, i) => {
          const idx = wordIdx++
          return (
            <span
              key={`${segI}-${i}`}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                paddingRight: '0.22em',
                fontFamily: seg.serif ? 'var(--font-instrument-serif), serif' : undefined,
                fontStyle: seg.serif ? 'italic' : undefined,
              }}
            >
              <motion.span
                style={{ display: 'inline-block', ...(seg.style ?? {}) }}
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: delay + idx * 0.05, ease: PULL_EASE }}
              >
                {word}
              </motion.span>
            </span>
          )
        })
      )}
    </div>
  )
}

// ── WordOpacity — scroll-linked per-word opacity (replaces char-level) ────────
// Char-level fragmentation caused layout bugs (one-line overflow, no wrapping).
// Word-level is reliable: normal inline text flow, wraps at natural word boundaries.

function WordOpacity({
  word,
  index,
  total,
  scrollYProgress,
  trailingSpace,
}: {
  word: string
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  trailingSpace: boolean
}) {
  const start = (index / total) * 0.85
  const end = Math.min(start + 1.8 / total, 1)
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1])
  return (
    <motion.span style={{ opacity }}>
      {word}
      {trailingSpace ? ' ' : ''}
    </motion.span>
  )
}

// ── ScrollRevealText ──────────────────────────────────────────────────────────

function ScrollRevealText({
  text,
  style,
}: {
  text: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.2'],
  })
  const words = text.split(' ')

  return (
    <p
      ref={ref}
      style={{
        ...style,
        display: 'block',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {words.map((word, i) => (
        <WordOpacity
          key={i}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
          trailingSpace={i < words.length - 1}
        />
      ))}
    </p>
  )
}

// ── Meta data ─────────────────────────────────────────────────────────────────

const meta = [
  { label: 'Basé à',      value: 'Lyon · Remote France' },
  { label: 'Expérience',  value: '8+ ans · 60+ projets' },
  { label: 'Engagement',  value: '1 expert, 1 dossier' },
]

// ── About ─────────────────────────────────────────────────────────────────────

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="apropos"
      className="bg-black"
      style={{ padding: '7rem 1.5rem' }}
      aria-labelledby="about-heading"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden mx-auto text-center"
        style={{
          backgroundColor: '#101010',
          borderRadius: '2rem',
          maxWidth: '1280px',
          padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 2rem)',
        }}
      >
        {/* Green radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,255,135,0.04), transparent 50%)' }}
        />

        {/* Eyebrow */}
        <div
          className="relative flex items-center justify-center gap-2 mb-8"
          style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#00FF87' }} aria-hidden />
          Expert croissance digitale
        </div>

        {/* Heading */}
        <h2
          id="about-heading"
          className="relative font-display font-normal mx-auto mb-10"
          style={{
            fontSize: 'clamp(1.8rem, 4.2vw, 3.6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            color: '#E1E0CC',
            maxWidth: '24ch',
          }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Je suis Maurice Timsit,',   style: { color: '#E1E0CC' } },
              { text: 'consultant digital à Lyon.', style: { color: '#E1E0CC' }, serif: true },
              { text: 'Je construis des systèmes qui attirent du trafic, convertissent des visiteurs et optimisent vos résultats dans le temps.', style: { color: '#E1E0CC' } },
            ]}
            delay={0.1}
          />
        </h2>

        {/* Scroll-reveal body paragraph */}
        <ScrollRevealText
          text="Basé à Lyon, j'accompagne des TPE, PME et entrepreneurs de la région Auvergne-Rhône-Alpes qui veulent une présence digitale qui travaille pour eux. Pas de grande agence, pas de junior qui apprend sur votre budget — vous avez un interlocuteur unique, qui connaît votre dossier et qui est investi dans vos résultats."
          style={{
            color: '#DEDBC8',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            maxWidth: '56ch',
            margin: '0 auto 3rem',
          }}
        />

        {/* Meta pills */}
        <div
          className="relative inline-flex items-center gap-6 flex-wrap justify-center"
          style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(225,224,204,0.08)', borderRadius: '999px' }}
        >
          {meta.map((m, i) => (
            <div key={m.label} className="flex items-center gap-6">
              <div className="flex flex-col gap-0.5 text-left">
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.4)' }}>
                  {m.label}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#E1E0CC', fontWeight: 700 }}>
                  {m.value}
                </span>
              </div>
              {i < meta.length - 1 && (
                <div
                  className="hidden sm:block"
                  style={{ width: 1, height: 24, backgroundColor: 'rgba(225,224,204,0.1)' }}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
