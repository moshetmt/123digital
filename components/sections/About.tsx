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
    <section style={{ backgroundColor: 'var(--surface)', padding: '0 1.5rem clamp(2rem, 5vw, 3.5rem)' }} aria-labelledby="about-heading">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto grid grid-cols-[76px_1fr] sm:grid-cols-[120px_1fr] gap-3.5 sm:gap-6 items-center rounded-2xl"
        style={{ maxWidth: '48rem', backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', padding: 'clamp(1rem, 3.5vw, 1.75rem)' }}
      >
        {/* Portrait a cote du texte des le telephone : empile, il ajoutait
            120 px de hauteur pour rien. */}
        <div
          className="relative overflow-hidden rounded-full shrink-0 w-[76px] h-[76px] sm:w-[120px] sm:h-[120px]"
          style={{ border: '2px solid var(--line-strong)' }}
        >
          <Image
            src="/portraitmaurice.jpg"
            alt={lang === 'en' ? 'Maurice Timsit, digital consultant in Lyon' : 'Maurice Timsit, consultant digital à Lyon'}
            fill
            sizes="(max-width: 640px) 76px, 120px"
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        <div className="text-left">
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
