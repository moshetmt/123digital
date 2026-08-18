'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function About({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).about
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ backgroundColor: 'var(--surface)', padding: '0 1.5rem 5rem' }} aria-labelledby="about-heading">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-6 items-center rounded-2xl"
        style={{ maxWidth: '48rem', backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', padding: '1.75rem' }}
      >
        <div
          className="relative mx-auto sm:mx-0 overflow-hidden rounded-full shrink-0"
          style={{ width: 120, height: 120, border: '2px solid var(--line-strong)' }}
        >
          <Image
            src="/portraitmaurice.jpg"
            alt={lang === 'en' ? 'Maurice Timsit, digital consultant in Lyon' : 'Maurice Timsit, consultant digital à Lyon'}
            fill
            sizes="120px"
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        <div className="text-center sm:text-left">
          <h2
            id="about-heading"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.35rem' }}
          >
            {d.heading}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
            {d.body}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
