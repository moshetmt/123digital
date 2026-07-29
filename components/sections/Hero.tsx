'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ── Animated counter ──────────────────────────────────────────────────────────

function Counter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = Math.round(1800 / 16)
    const id = setInterval(() => {
      frame++
      setCount(Math.floor((1 - Math.pow(1 - frame / total, 3)) * target))
      if (frame >= total) { setCount(target); clearInterval(id) }
    }, 16)
    return () => clearInterval(id)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

function getStats(lang: 'fr' | 'en') {
  if (lang === 'en') return [
    { target: 50,  prefix: '+', suffix: '',  label: 'SMEs supported' },
    { target: 47,  prefix: '+', suffix: '%', label: 'avg traffic growth' },
    { target: 100, prefix: '',  suffix: '%', label: 'delivered on time' },
  ]
  return [
    { target: 50,  prefix: '+', suffix: '',  label: 'PME accompagnées' },
    { target: 47,  prefix: '+', suffix: '%', label: 'trafic moyen' },
    { target: 100, prefix: '',  suffix: '%', label: 'livrés en délais' },
  ]
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).hero
  const stats = getStats(lang)
  return (
    <section
      id="section-hero"
      className="relative bg-background"
      style={{ minHeight: '88svh', padding: 'clamp(10px, 1.5vw, 22px)' }}
      aria-label="Section hero"
    >
      {/* ── Inset rounded container — version claire ── */}
      <div
        className="relative w-full flex flex-col justify-center overflow-hidden"
        style={{
          minHeight: 'calc(88svh - clamp(20px, 3vw, 44px))',
          borderRadius: 'clamp(14px, 2vw, 30px)',
          backgroundColor: 'var(--surface-2)',
          border: '1px solid var(--line)',
        }}
      >
        {/* Halo vert très dilué — ancrage bas gauche */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'radial-gradient(120% 90% at 6% 108%, var(--brand-tint) 0%, transparent 62%)',
          }}
        />

        {/* Voile ivoire chaud — réchauffe le blanc de la carte */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'linear-gradient(to bottom, oklch(0.945 0.014 96 / 0.55) 0%, transparent 42%)',
          }}
        />

        {/* Grain très discret */}
        <div
          className="absolute inset-0 bg-noise pointer-events-none"
          aria-hidden
          style={{ opacity: 0.22 }}
        />

        {/* ── Top-right — availability indicator ── */}
        <motion.div
          className="absolute z-10 flex items-center gap-3"
          style={{ top: '1.5rem', right: '1.75rem' }}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span
            className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase"
            style={{ color: 'var(--ink-2)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: 'var(--brand)' }}
              aria-hidden
            />
            {d.badge}
          </span>
        </motion.div>

        {/* ── Filet vert — motif typographique ── */}
        <div
          className="relative z-10 mx-5 sm:mx-8 lg:mx-10 mb-6 sm:mb-8"
          aria-hidden
          style={{
            height: 1,
            background:
              'linear-gradient(to right, var(--brand) 0%, var(--brand-line) 22%, var(--line) 100%)',
          }}
        />

        {/* ── Bottom content ── */}
        <div className="relative z-10 px-5 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-end">

            {/* Giant heading */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: PULL_EASE, delay: 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.15em', alignItems: 'inherit' }}
              >
                <h1
                  aria-label={`${d.line1} ${d.line2} — ${d.byline}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    margin: 0,
                    color: 'var(--ink)',
                  }}
                >
                  {lang === 'en' ? (
                    <>One expert. One <em className="rule-underline" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>strategy</em>.</>
                  ) : (
                    <>Un expert. Une <em className="rule-underline" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>stratégie</em>.</>
                  )}<br />
                  <span style={{ color: 'var(--brand)' }}>
                    {lang === 'en' ? (
                      <>Real <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--brand)' }}>results</em>.</>
                    ) : (
                      <>Des <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>résultats</em>.</>
                    )}
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                    color: 'var(--ink-3)',
                    margin: '0.6em 0 0',
                    letterSpacing: '0.04em',
                  }}
                >
                  {lang === 'en' ? '123 Digital — ' : d.byline.split('Par M. Timsit')[0]}
                  <a
                    href="https://www.linkedin.com/in/mauricetimsit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}
                  >
                    {lang === 'en' ? 'By M. Timsit' : 'Par M. Timsit'}
                  </a>
                </p>
              </motion.div>
            </div>

            {/* Right: description + CTA + stats */}
            <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 items-center lg:items-start">

              <motion.p
                className="text-sm sm:text-base leading-snug max-w-xs"
                style={{ color: 'var(--ink-2)', lineHeight: 1.2 }}
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: PULL_EASE }}
              >
                {d.description}
              </motion.p>

              {/* CTA pill */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: PULL_EASE }}
              >
                <Link
                  href={lang === 'en' ? '/en/audit' : '#contact'}
                  className="group inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 font-medium text-sm transition-all duration-300 hover:gap-3 w-fit"
                  style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}
                >
                  {d.cta}
                  <span
                    className="flex items-center justify-center rounded-full w-8 h-8 transition-transform duration-300 group-hover:scale-110 shrink-0"
                    style={{ backgroundColor: 'var(--on-brand)' }}
                  >
                    <ArrowRight
                      size={14}
                      style={{ color: 'var(--brand)', transform: 'rotate(-45deg)' }}
                      aria-hidden
                    />
                  </span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-5 sm:gap-7 flex-wrap justify-center lg:justify-start"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                {stats.map(({ target, prefix, suffix, label }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span
                      className="font-display font-bold tabular-nums text-lg sm:text-xl"
                      style={{ color: 'var(--ink)' }}
                    >
                      <Counter target={target} prefix={prefix} suffix={suffix} />
                    </span>
                    <span
                      className="text-[10px] sm:text-[11px] leading-tight"
                      style={{ color: 'var(--ink-3)' }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Footnote */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4 text-center lg:text-left"
            style={{
              fontSize: '0.65rem',
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {d.footnote}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
