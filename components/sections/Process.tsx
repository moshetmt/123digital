'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Lightbulb, Rocket, TrendingUp, type LucideIcon } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface Step {
  num: string
  Icon: LucideIcon
  title: string
  description: string
}

function getSteps(lang: 'fr' | 'en'): Step[] {
  if (lang === 'en') return [
    { num: '01', Icon: Search,    title: 'Audit & Discovery',  description: 'Full analysis of your digital presence: website, SEO, advertising, social. Identifying blockers and quick-win growth opportunities.' },
    { num: '02', Icon: Lightbulb, title: 'Custom Strategy',    description: 'Prioritised action plan tailored to your sector, budget and goals. No generic template — a real roadmap built around your business.' },
    { num: '03', Icon: Rocket,    title: 'Execution',          description: 'Concrete implementation: development, optimisations, campaigns. I lead or co-lead depending on your preferences.' },
    { num: '04', Icon: TrendingUp,title: 'Continuous Growth',  description: 'Performance analysis, regular adjustments and iterations. What works is amplified; what holds you back is fixed.' },
  ]
  return [
    { num: '01', Icon: Search,    title: 'Audit & Diagnostic',    description: 'Analyse complète de votre présence digitale : site, SEO, publicité, réseaux. Identification des freins et des opportunités de croissance rapide.' },
    { num: '02', Icon: Lightbulb, title: 'Stratégie sur mesure',  description: "Plan d'action priorisé selon votre secteur, votre budget et vos objectifs. Pas de modèle générique — une vraie feuille de route." },
    { num: '03', Icon: Rocket,    title: 'Exécution & Déploiement', description: 'Mise en œuvre concrète : développement, optimisations, campagnes. Je pilote ou co-pilote selon vos préférences.' },
    { num: '04', Icon: TrendingUp,title: 'Optimisation continue', description: 'Analyse des performances, ajustements et itérations régulières. Ce qui fonctionne est amplifié, ce qui freine est corrigé.' },
  ]
}

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

// Italic accent pull-up — Fraunces
function ItalicPullUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const words = text.split(' ')
  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.18em', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
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

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { Icon } = step

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
      className="flex flex-col rounded-2xl"
      style={{
        backgroundColor: '#212121',
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '1.75rem',
        minHeight: '240px',
      }}
    >
      {/* Step number + icon row */}
      <div className="flex items-center justify-between mb-5">
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'rgba(225,224,204,0.35)',
          }}
        >
          {step.num}
        </span>
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 36,
            height: 36,
            backgroundColor: 'rgba(0,255,135,0.08)',
            border: '1px solid rgba(0,255,135,0.16)',
          }}
        >
          <Icon
            size={16}
            strokeWidth={1.6}
            style={{ color: '#00FF87' }}
            aria-hidden
          />
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-normal mb-3 leading-tight"
        style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
          letterSpacing: '-0.02em',
          color: '#E1E0CC',
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: '#9ca3af' }}
      >
        {step.description}
      </p>
    </motion.div>
  )
}

export function Process({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).process
  const steps = getSteps(lang)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="section-process"
      className="bg-black"
      style={{ padding: '7rem 1.5rem' }}
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl" ref={ref}>

        {/* Header */}
        <motion.div
          className="mb-14 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Eyebrow with green dot */}
          <div
            className="flex items-center gap-2 mb-5"
            style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: '#00FF87' }}
              aria-hidden
            />
            {d.label}
          </div>

          {/* Heading */}
          <h2
            id="process-heading"
            className="font-display font-normal"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            <WordPullUp text={lang === 'en' ? 'A process in four' : 'Un processus en quatre'} delay={0.05} />
            {' '}
            <ItalicPullUp text={lang === 'en' ? 'acts.' : 'actes.'} delay={0.55} />
          </h2>
        </motion.div>

        {/* Connector line — draws left→right as section enters view */}
        <div
          style={{
            position: 'relative',
            height: 1,
            backgroundColor: 'rgba(225,224,204,0.06)',
            marginBottom: '2rem',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#00FF87',
              transformOrigin: 'left',
              willChange: 'transform',
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: PULL_EASE }}
          />
        </div>

        {/* 2×2 card grid — same style as Services */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
