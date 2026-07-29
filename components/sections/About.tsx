'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { t, type Locale } from '@/lib/i18n'

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
                fontFamily: seg.serif ? 'var(--font-serif)' : undefined,
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

function getMeta(lang: 'fr' | 'en') {
  if (lang === 'en') return [
    { label: 'Based in',    value: 'Lyon · Remote France' },
    { label: 'Experience',  value: '8+ years' },
    { label: 'Commitment',  value: '1 expert, 1 file' },
  ]
  return [
    { label: 'Basé à',      value: 'Lyon · Remote France' },
    { label: 'Expérience',  value: '8+ ans' },
    { label: 'Engagement',  value: '1 expert, 1 dossier' },
  ]
}

// ── About ─────────────────────────────────────────────────────────────────────

export function About({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).about
  const meta = getMeta(lang)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="apropos"
      className="bg-background"
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
          backgroundColor: 'var(--surface-2)',
          border: '1px solid var(--line)',
          borderRadius: '2rem',
          maxWidth: '1280px',
          padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 2rem)',
        }}
      >
        {/* Green radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(circle at 50% 0%, var(--brand-tint), transparent 50%)' }}
        />

        {/* Eyebrow */}
        <div
          className="relative flex items-center justify-center gap-2 mb-8"
          style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)', fontWeight: 700 }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--brand)' }} aria-hidden />
          {lang === 'en' ? 'Digital Growth Expert' : 'Expert croissance digitale'}
        </div>

        {/* Heading */}
        <h2
          id="about-heading"
          className="relative font-display font-normal mx-auto mb-10"
          style={{
            fontSize: 'clamp(1.8rem, 4.2vw, 3.6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            color: 'var(--ink)',
            maxWidth: '24ch',
          }}
        >
          <WordsPullUpMultiStyle
            segments={lang === 'en' ? [
              { text: "I'm Maurice Timsit,",                  style: { color: 'var(--ink)' } },
              { text: 'digital consultant in Lyon.',           style: { color: 'var(--ink)' }, serif: true },
              { text: 'I build systems that attract traffic, convert visitors and grow your results over time.', style: { color: 'var(--ink)' } },
            ] : [
              { text: 'Je suis Maurice Timsit,',              style: { color: 'var(--ink)' } },
              { text: 'consultant digital à Lyon.',            style: { color: 'var(--ink)' }, serif: true },
              { text: 'Je construis des systèmes qui attirent du trafic, convertissent des visiteurs et optimisent vos résultats dans le temps.', style: { color: 'var(--ink)' } },
            ]}
            delay={0.1}
          />
        </h2>

        {/* Scroll-reveal body paragraph */}
        <ScrollRevealText
          text={d.body}
          style={{
            color: 'var(--ink)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            maxWidth: '56ch',
            margin: '0 auto 3rem',
          }}
        />

        {/* Meta pills */}
        <div
          className="relative inline-flex items-center gap-6 flex-wrap justify-center"
          style={{ padding: '0.75rem 1.5rem', border: '1px solid var(--line)', borderRadius: '999px' }}
        >
          {meta.map((m, i) => (
            <div key={m.label} className="flex items-center gap-6">
              <div className="flex flex-col gap-0.5 text-left">
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                  {m.label}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--ink)', fontWeight: 700 }}>
                  {m.value}
                </span>
              </div>
              {i < meta.length - 1 && (
                <div
                  className="hidden sm:block"
                  style={{ width: 1, height: 24, backgroundColor: 'var(--line-strong)' }}
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
