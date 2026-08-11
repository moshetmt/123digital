'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ── CountUp ───────────────────────────────────────────────────────────────────

function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const val = value * eased
      setDisplay(Number.isInteger(value) ? Math.round(val) : parseFloat(val.toFixed(1)))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, duration])

  const formatted = Number.isInteger(value) ? Math.round(display) : display.toFixed(1)
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}

// ── WordsPullUp ───────────────────────────────────────────────────────────────

function WordsPullUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <div ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '0.22em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: PULL_EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

// ── MetricCard — extracted component so hooks are called at top level ─────────

interface Metric {
  prefix: string
  value: number
  suffix: string
  desc: string
}

function MetricCard({ m, index }: { m: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface-2)', borderRadius: '1.25rem', padding: '2rem 1.75rem' }}
    >
      {/* Number — electric green */}
      <div
        className="font-display font-bold mb-3"
        style={{
          fontSize: 'clamp(2.6rem, 5vw, 3.6rem)',
          color: 'var(--brand)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          fontFeatureSettings: '"tnum"',
        }}
      >
        <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
      </div>

      {/* Description */}
      <div style={{ color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.4, minHeight: '2.4em' }}>
        {m.desc}
      </div>

      {/* Green bar */}
      <div
        className="mt-5 overflow-hidden"
        style={{ height: 2, backgroundColor: 'var(--surface-3)', borderRadius: 2 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: '70%' } : {}}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.4, ease: EASE }}
          style={{
            height: '100%',
            background: 'linear-gradient(to right, var(--brand), var(--brand-tint))',
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const metrics: Metric[] = [
  { prefix: '+', value: 150, suffix: '%', desc: 'croissance trafic organique moyenne' },
  { prefix: '×', value: 3,   suffix: '',  desc: 'retour sur investissement publicitaire moyen' },
  { prefix: '',  value: 72,  suffix: 'h', desc: 'pour livrer votre première version de site' },
  { prefix: '',  value: 100, suffix: '%', desc: 'clients satisfaits — ou remboursés' },
]

// ── Results ───────────────────────────────────────────────────────────────────

export function Results() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="resultats"
      className="bg-background"
      style={{ padding: '7rem 1.5rem' }}
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-7xl" ref={ref}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-5"
          style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 700 }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--brand)' }} aria-hidden />
          Résultats
        </motion.div>

        {/* Heading */}
        <h2
          id="results-heading"
          className="font-display text-center mx-auto mb-20"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            letterSpacing: '-0.025em',
            maxWidth: '22ch',
            lineHeight: 1.05,
          }}
        >
          <WordsPullUp text="Des résultats concrets, pas des promesses." delay={0.1} />
        </h2>

        {/* Metrics grid */}
        <div
          className="grid gap-4 mb-20"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {metrics.map((m, i) => (
            <MetricCard key={i} m={m} index={i} />
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
          className="relative mx-auto"
          style={{ backgroundColor: 'var(--surface-2)', borderRadius: '1.25rem', padding: '2.5rem 2rem', maxWidth: '720px' }}
        >
          {/* Green italic quote mark */}
          <div
            className="absolute"
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              fontSize: '5rem',
              color: 'var(--brand)',
              lineHeight: 0.6,
              top: '1.25rem',
              left: '1.5rem',
            }}
            aria-hidden
          >
            &ldquo;
          </div>

          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: 'var(--ink)',
              fontSize: '1.35rem',
              lineHeight: 1.4,
              margin: '0 0 1.75rem',
              paddingLeft: '1rem',
            }}
          >
            Maurice a transformé notre site vitrine en vrai outil commercial.
            En 3 mois, notre trafic a doublé et nos demandes de devis ont triplé.
          </p>

          <div className="flex items-center gap-3" style={{ paddingLeft: '1rem' }}>
            <div
              className="shrink-0"
              style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand), var(--line-strong))' }}
              aria-hidden
            />
            <div>
              <div style={{ color: 'var(--ink)', fontSize: '0.85rem', fontWeight: 700 }}>Gérant</div>
              <div style={{ color: 'var(--ink-2)', fontSize: '0.75rem' }}>Entreprise de services B2B</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
