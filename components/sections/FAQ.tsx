'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { getHomeFaqs } from '@/data/faq'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded overflow-hidden"
      style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-left"
        style={{ padding: '1.1rem 1.3rem', background: 'none', border: 'none', cursor: 'pointer', gap: '1rem' }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)', flex: 1 }}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{ flexShrink: 0, display: 'flex', color: open ? 'var(--brand)' : 'var(--ink-3)' }}
          aria-hidden
        >
          <ChevronDown size={17} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
            animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3, ease: EASE }, opacity: { duration: 0.2 } }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.3rem 1.3rem', color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).faq

  return (
    <section style={{ backgroundColor: 'var(--surface)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }} aria-labelledby="faq-heading">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
          <div>
            <div
              className="mb-3"
              style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
            >
              {d.label}
            </div>
            <h2
              id="faq-heading"
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
          </div>

          <div className="flex flex-col gap-2.5">
            {getHomeFaqs(lang).map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
