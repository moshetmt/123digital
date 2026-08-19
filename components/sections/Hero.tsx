'use client'

import { useRef, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Phone, Check, CircleCheck, Clock } from 'lucide-react'
import { projects } from '@/data/portfolio'
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

// ── Carte de preuve ───────────────────────────────────────────────────────────
// Remplace l'ancienne carte « Ouvert / En direct ». Motif importe de depann69,
// ou la disponibilite immediate EST la question d'achat. Pour du conseil, non :
// personne ne choisit son consultant selon qu'il decroche a la seconde.
// Ce qui convertit, d'apres les donnees : les resultats clients chiffres et
// verifiables (les etudes de cas sectorielles convertissent jusqu'a 5 fois
// mieux que des promesses generiques). On montre donc les 3 dossiers reels.
function ProofCard({ lang }: { lang: Locale }) {
  const d = t(lang).hero
  return (
    <div
      className="rounded-3xl"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        boxShadow: '0 8px 30px var(--shadow-soft)',
        padding: 'clamp(1rem, 3.5vw, 1.5rem)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)' }}>
          {lang === 'en' ? 'Client results' : 'Résultats clients'}
        </span>
        <span
          style={{
            backgroundColor: 'var(--brand-tint)', color: 'var(--brand-strong)', borderRadius: 999,
            padding: '0.25rem 0.6rem', fontSize: '0.65rem', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}
        >
          {lang === 'en' ? 'Verifiable' : 'Vérifiables'}
        </span>
      </div>

      {/* Chiffre court par dossier : decouper `results` automatiquement
          amputait la punchline de Clim69 (le benefice net). */}
      <ul className="flex flex-col gap-2 mb-4">
        {projects.slice(0, 3).map((p) => (
          <li key={p.id} className="flex items-baseline justify-between gap-3">
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--ink)' }}>{p.title}</span>
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--brand-strong)', textAlign: 'right', whiteSpace: 'nowrap' }}>
              {p.metric ?? p.results}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={PHONE_TEL}
        className="flex items-center justify-center gap-2 w-full rounded-full font-bold whitespace-nowrap"
        style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.75rem', fontSize: '0.98rem' }}
      >
        <Phone size={16} aria-hidden />
        {PHONE_DISPLAY}
      </a>
    </div>
  )
}

function StatusCardAncienne({ lang }: { lang: Locale }) {
  const d = t(lang).hero
  const isClosed = useSyncExternalStore(subscribeToClock, computeClosed, getServerClosedSnapshot)

  return (
    <div
      className="rounded-3xl"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        boxShadow: '0 8px 30px var(--shadow-soft)',
        padding: 'clamp(1rem, 3.5vw, 1.5rem)',
      }}
    >
      <div className="flex items-center justify-between mb-2.5 sm:mb-4">
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
      <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', marginBottom: '0.8rem', lineHeight: 1.4 }}>
        {isClosed ? d.statusClosedNote : d.statusOpenNote}
      </p>

      <a
        href={PHONE_TEL}
        className="flex items-center justify-center gap-2 w-full rounded-full font-bold whitespace-nowrap"
        style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.75rem', fontSize: '0.98rem' }}
      >
        <Phone size={16} aria-hidden />
        {PHONE_DISPLAY}
      </a>
      {/* Le detail des horaires est masque sur telephone : trois lignes de
          texte fin pour une information deja portee par "Ouvert" au-dessus. */}
      <p className="hidden sm:block" style={{ fontSize: '0.75rem', color: 'var(--ink-3)', textAlign: 'center', marginTop: '0.85rem', lineHeight: 1.5 }}>
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
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: 'var(--surface)', padding: 'clamp(1.5rem, 5vw, 4rem) 1.5rem' }}
      aria-label="Section hero"
    >
      {/* ── Fond de banniere ──────────────────────────────────────────────
          La banniere avait le meme blanc que le reste de la page et ne se
          detachait pas. Deux couches :
          1. une video muette en boucle si `public/videos/hero.mp4` existe ;
          2. un degrade de marque en dessous, qui sert de repli et reste
             visible si le fichier manque ou si le visiteur economise ses
             donnees. Le voile clair par-dessus garantit la lisibilite du
             texte en encre, quelle que soit la video posee. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 15% 0%, var(--brand-tint) 0%, transparent 55%), ' +
              'radial-gradient(90% 80% at 100% 100%, var(--surface-3) 0%, transparent 60%), ' +
              'var(--surface)',
          }}
        />
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/hero-poster.jpg"
          style={{ opacity: 0.34 }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, oklch(0.968 0.005 150 / 0.62) 0%, oklch(0.968 0.005 150 / 0.80) 60%, var(--surface) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 lg:gap-14 items-center">
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
            style={{ fontSize: 'clamp(0.95rem, 3.2vw, 1.1rem)', color: 'var(--ink-2)', maxWidth: '58ch', marginBottom: 'clamp(1rem, 4vw, 1.75rem)', lineHeight: 1.5 }}
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-1.5"
            role="list"
          >
            {/* Grille a 3 colonnes des `sm` : en flex-wrap la 3e puce tombait
                seule sur une 2e ligne des que la fenetre passait sous 1280 px. */}
            {checks.map((label) => (
              <li key={label} className="flex items-start gap-1.5" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-2)', lineHeight: 1.35 }}>
                <Check size={15} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 2 }} strokeWidth={3} aria-hidden />
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
          <ProofCard lang={lang} />
        </motion.div>
      </div>
    </section>
  )
}
