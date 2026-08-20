'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// ── FAQ des pages internes ────────────────────────────────────────────────────
// Meme dessin que la FAQ de l'accueil (components/sections/FAQ.tsx) : carte
// arrondie, question en gras, chevron qui pivote, reponse qui se deroule.
// Les pages internes servaient jusqu'au 20/08 des <details> bruts avec un « + »
// en bout de ligne : meme fonction, mais un rendu qui n'avait rien a voir avec
// le reste du site.

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Question {
  question: string
  answer: string
}

function Item({ question, answer }: Question) {
  const [ouvert, setOuvert] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}
    >
      <button
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        className="w-full flex items-center justify-between text-left"
        style={{ padding: '1rem 1.2rem', background: 'none', border: 'none', cursor: 'pointer', gap: '1rem' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: 'var(--ink)',
            flex: 1,
            lineHeight: 1.35,
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: ouvert ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{ flexShrink: 0, display: 'flex', color: ouvert ? 'var(--brand)' : 'var(--ink-3)' }}
          aria-hidden
        >
          <ChevronDown size={17} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {ouvert && (
          <motion.div
            key="reponse"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3, ease: EASE }, opacity: { duration: 0.2 } }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.2rem 1.2rem', color: 'var(--ink-2)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqListe({ items }: { items: Question[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((q) => (
        <Item key={q.question} question={q.question} answer={q.answer} />
      ))}
    </div>
  )
}
