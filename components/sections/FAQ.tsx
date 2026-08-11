'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { homeFaqs } from '@/data/faq'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

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

// ── FAQ item — AnimatePresence accordion ──────────────────────────────────────

function FAQItem({
  question,
  answer,
  delay = 0,
}: {
  question: string
  answer: string
  delay?: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        borderRadius: '0.75rem',
        border: '1px solid var(--line)',
        backgroundColor: 'var(--surface-2)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-left"
        style={{
          padding: '1rem 1.25rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          gap: '1rem',
        }}
      >
        <span
          className="text-sm font-medium leading-snug flex-1"
          style={{ color: 'var(--ink)' }}
        >
          {question}
        </span>

        {/* Chevron — rotates 0° → 180° */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            color: open ? 'var(--brand)' : 'var(--ink-3)',
            willChange: 'transform',
          }}
          aria-hidden
        >
          <ChevronDown size={16} strokeWidth={2} />
        </motion.span>
      </button>

      {/* Content — AnimatePresence for height:auto animation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.32, ease: EASE },
              opacity: { duration: 0.22 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="text-sm leading-relaxed"
              style={{
                padding: '0 1.25rem 1.25rem',
                color: 'var(--ink-2)',
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── FAQ section ───────────────────────────────────────────────────────────────

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="bg-background"
      style={{ padding: '7rem 1.5rem' }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: heading */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col justify-start"
          >
            {/* Eyebrow */}
            <div
              className="flex items-center gap-2 mb-6"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--brand)' }}
                aria-hidden
              />
              Questions fréquentes
            </div>

            {/* Heading */}
            <h2
              id="faq-heading"
              className="font-display font-normal mb-6"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                color: 'var(--ink)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              <WordPullUp text="Vous avez des questions ? J'ai les réponses." delay={0.05} />
            </h2>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: 'var(--ink-2)' }}
            >
              Vous ne trouvez pas ce que vous cherchez ? Contactez-moi directement ou
              réservez un audit gratuit — on répond à tout en 30 minutes.
            </p>
          </motion.div>

          {/* Right: accordion items */}
          <div className="flex flex-col gap-2">
            {homeFaqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                delay={isInView ? i * 0.07 : 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
