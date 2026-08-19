'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { villesARA } from '@/data/villes'
import { estIndexable } from '@/data/indexation'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Les villes ARA encore indexables, dans l'ordre de data/villes.ts, plafonnées à 9.
// 🔑 Le filtre n'est pas cosmétique : depuis le 19/08, Grenoble, Chambéry et
// Villeurbanne sont en `noindex` faute de demande mesurée. Les lier depuis la
// page d'accueil enverrait les visiteurs, et le maillage interne, vers des pages
// qu'on a décidé de retirer de l'index. Cette liste et `data/indexation.ts`
// doivent toujours dire la même chose.
const CHIP_VILLES = villesARA.filter((v) => estIndexable(`/${v.slug}`)).slice(0, 9)

export function Zones({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).zones
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="zones"
      style={{ backgroundColor: 'var(--surface)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-4xl text-center"
      >
        <div
          className="mb-3"
          style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
        >
          {d.label}
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            marginBottom: '1.75rem',
          }}
        >
          {d.heading}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {CHIP_VILLES.map((ville) => (
            <Link
              key={ville.slug}
              href={`/${ville.slug}`}
              className="chip-link"
              style={{
                backgroundColor: 'var(--surface-3)',
                color: 'var(--ink-2)',
                borderRadius: 999,
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {ville.nom}
            </Link>
          ))}
          <span
            style={{
              backgroundColor: 'var(--brand-tint)',
              color: 'var(--brand-strong)',
              borderRadius: 999,
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            {d.franceWide}
          </span>
        </div>
      </motion.div>

      <style>{`
        .chip-link { transition: background-color 0.2s ease, color 0.2s ease; }
        .chip-link:hover { background-color: var(--brand-tint) !important; color: var(--brand-strong) !important; }
      `}</style>
    </section>
  )
}
