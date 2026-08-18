'use client'

import { useRef, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Phone, Check, CircleCheck, Clock } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const PHONE_TEL = 'tel:+33652092301'
const PHONE_DISPLAY = '06 52 09 23 01'

// ── Statut « En direct » — même logique que la maquette validée : ─────────────
// fermé du vendredi 15h30 au samedi 23h30, heure de Paris. `useSyncExternalStore`
// lit l'horloge du navigateur (un système externe à React) : snapshot serveur
// stable à "ouvert" pour le HTML statique, snapshot client réel une fois monté,
// resynchronisé chaque minute — sans jamais appeler setState dans un effet.

function computeClosed(): boolean {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  const day = now.getDay()
  const minutes = now.getHours() * 60 + now.getMinutes()
  return (day === 5 && minutes >= 930) || (day === 6 && minutes < 1410)
}

function subscribeToClock(callback: () => void) {
  const id = setInterval(callback, 60_000)
  return () => clearInterval(id)
}

function getServerClosedSnapshot() {
  return false
}

function StatusCard({ lang }: { lang: Locale }) {
  const d = t(lang).hero
  const isClosed = useSyncExternalStore(subscribeToClock, computeClosed, getServerClosedSnapshot)

  return (
    <div
      className="rounded-3xl"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        boxShadow: '0 8px 30px var(--shadow-soft)',
        padding: '1.5rem',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)' }}>
          {d.statusCity}
        </span>
        <span
          style={{
            backgroundColor: 'var(--brand-tint)',
            color: 'var(--brand-strong)',
            borderRadius: 999,
            padding: '0.25rem 0.6rem',
            fontSize: '0.65rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {d.statusLive}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-1.5">
        {isClosed ? (
          <Clock size={18} style={{ color: 'var(--ink-4)' }} strokeWidth={2} aria-hidden />
        ) : (
          <CircleCheck size={18} style={{ color: 'var(--brand)' }} strokeWidth={2} aria-hidden />
        )}
        <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
          {isClosed ? d.statusClosed : d.statusOpen}
        </span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', marginBottom: '1.15rem' }}>
        {isClosed ? d.statusClosedNote : d.statusOpenNote}
      </p>

      <a
        href={PHONE_TEL}
        className="flex items-center justify-center gap-2 w-full rounded-full font-bold"
        style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.85rem', fontSize: '1rem' }}
      >
        <Phone size={16} aria-hidden />
        {PHONE_DISPLAY}
      </a>
      <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)', textAlign: 'center', marginTop: '0.85rem', lineHeight: 1.5 }}>
        {d.statusHours}
      </p>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).hero
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const checks = [d.check1, d.check2, d.check3]

  return (
    <section
      ref={ref}
      id="section-hero"
      style={{ backgroundColor: 'var(--surface)', padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem' }}
      aria-label="Section hero"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center">
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto lg:mx-0"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem, 4.6vw, 3.25rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              color: 'var(--ink)',
              maxWidth: '19ch',
              marginBottom: '1rem',
            }}
          >
            {d.h1}
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mx-auto lg:mx-0"
            style={{ fontSize: '1.1rem', color: 'var(--ink-2)', maxWidth: '58ch', marginBottom: '1.75rem' }}
          >
            {d.sub}
          </motion.p>

          <motion.div
            initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-6"
          >
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.9rem 1.6rem', boxShadow: '0 2px 10px var(--brand-line)' }}
            >
              <Phone size={16} aria-hidden />
              {d.ctaCall}
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ border: '2px solid var(--line-strong)', color: 'var(--ink)', padding: '0.8rem 1.5rem' }}
            >
              {d.ctaQuote}
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2"
            role="list"
          >
            {checks.map((label) => (
              <li key={label} className="flex items-center gap-1.75" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-2)' }}>
                <Check size={16} style={{ color: 'var(--brand)', flexShrink: 0 }} strokeWidth={3} aria-hidden />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          <StatusCard lang={lang} />
        </motion.div>
      </div>
    </section>
  )
}
