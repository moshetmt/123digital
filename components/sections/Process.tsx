'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Step { title: string; desc: string }

function getSteps(lang: 'fr' | 'en'): Step[] {
  if (lang === 'en') return [
    { title: 'Discovery call',       desc: '30 minutes, free. We talk about your business, your customers, what is holding you back.' },
    { title: 'Costed action plan',   desc: 'A clear quote: what, how much, when, and what it should bring in.' },
    { title: 'Implementation',       desc: 'I build, I launch, I steer. You keep running your business.' },
    { title: 'Results every month',  desc: 'A monthly update in plain language: what was done, what it brought in.' },
  ]
  return [
    { title: 'Appel découverte',        desc: '30 minutes, gratuit. On parle de votre métier, vos clients, ce qui bloque.' },
    { title: "Plan d'action chiffré",   desc: 'Un devis clair : quoi, combien, quand, et ce que ça doit rapporter.' },
    { title: 'Mise en œuvre',           desc: 'Je construis, je lance, je pilote. Vous continuez à faire tourner votre entreprise.' },
    { title: 'Résultats chaque mois',   desc: 'Un point mensuel en français courant : ce qui a été fait, ce que ça a rapporté.' },
  ]
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="rounded-2xl"
      style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', padding: '1.25rem' }}
    >
      <div
        className="flex items-center justify-center rounded-full mb-3"
        style={{ width: 34, height: 34, backgroundColor: 'var(--brand)', color: 'var(--on-brand)', fontWeight: 800, fontSize: '0.9rem' }}
        aria-hidden
      >
        {index + 1}
      </div>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.3rem' }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
        {step.desc}
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
      style={{ backgroundColor: 'var(--surface-3)', padding: '5rem 1.5rem' }}
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div
            className="mb-3"
            style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
          >
            {d.label}
          </div>
          <h2
            id="process-heading"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
            }}
          >
            {d.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
