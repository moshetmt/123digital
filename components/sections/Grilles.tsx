'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Grilles de contenu ────────────────────────────────────────────────────────
// Le vocabulaire visuel de l'accueil, disponible pour les pages internes.
//
// Pourquoi elles existent : les pages service alignaient des cartes larges avec
// cinq a huit lignes de texte, puis on a essaye de tout replier en accordeon.
// Les deux etaient mauvais. L'accueil, lui, tient parce que ses cartes sont
// petites : deux colonnes des le telephone, titre a 0,9 rem, texte a 0,8 rem,
// bordure fine et ombre douce. On reprend exactement ce reglage ici.

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Carte {
  titre: string
  texte: string
  /** Pastilles courtes, masquees sur telephone comme sur l'accueil. */
  chips?: string[]
  /** Ligne discrete en bas de carte : delai, prix, precision. */
  note?: string
}

function CarteCompacte({ carte, index, accent }: { carte: Carte; index: number; accent?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      className="rounded-2xl flex flex-col"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        boxShadow: '0 8px 30px var(--shadow-soft)',
        padding: 'clamp(0.85rem, 3vw, 1.4rem)',
      }}
    >
      {accent && (
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brand-strong)',
            fontWeight: 800,
            marginBottom: '0.4rem',
          }}
        >
          {accent}
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(0.92rem, 3.4vw, 1.05rem)',
          color: 'var(--ink)',
          marginBottom: '0.3rem',
          lineHeight: 1.2,
        }}
      >
        {carte.titre}
      </h3>

      <p
        style={{
          fontSize: 'clamp(0.78rem, 2.6vw, 0.87rem)',
          color: 'var(--ink-2)',
          lineHeight: 1.45,
          flex: 1,
        }}
      >
        {carte.texte}
      </p>

      {carte.chips && carte.chips.length > 0 && (
        <div className="hidden sm:flex flex-wrap gap-1.5 mt-3">
          {carte.chips.map((chip) => (
            <span
              key={chip}
              style={{
                backgroundColor: 'var(--surface-3)',
                color: 'var(--ink-2)',
                borderRadius: 999,
                padding: '0.25rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 600,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {carte.note && (
        <div style={{ marginTop: '0.7rem', fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-3)' }}>
          {carte.note}
        </div>
      )}
    </motion.div>
  )
}

/** Grille de cartes, deux colonnes des le telephone comme sur l'accueil. */
export function GrilleCartes({
  items,
  colonnes = 3,
}: {
  items: Carte[]
  /** Nombre de colonnes sur grand ecran. Toujours 2 sur telephone. */
  colonnes?: 2 | 3 | 4
}) {
  const large = colonnes === 4 ? 'lg:grid-cols-4' : colonnes === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'

  return (
    <div className={`grid grid-cols-2 ${large} gap-2.5 sm:gap-4`}>
      {items.map((carte, i) => (
        <CarteCompacte key={carte.titre} carte={carte} index={i} />
      ))}
    </div>
  )
}

/** Etapes numerotees, meme dessin que la methode de l'accueil. */
export function GrilleEtapes({ items }: { items: Carte[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {items.map((etape, i) => (
        <EtapeCarte key={etape.titre} etape={etape} index={i} />
      ))}
    </div>
  )
}

function EtapeCarte({ etape, index }: { etape: Carte; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="rounded-2xl"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        padding: 'clamp(0.8rem, 3vw, 1.25rem)',
      }}
    >
      <div
        className="flex items-center justify-center rounded-full mb-2"
        style={{
          width: 28,
          height: 28,
          backgroundColor: 'var(--brand)',
          color: 'var(--on-brand)',
          fontWeight: 800,
          fontSize: '0.82rem',
        }}
        aria-hidden
      >
        {index + 1}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(0.88rem, 3.2vw, 1rem)',
          color: 'var(--ink)',
          marginBottom: '0.25rem',
          lineHeight: 1.2,
        }}
      >
        {etape.titre}
      </h3>
      <p style={{ fontSize: 'clamp(0.76rem, 2.6vw, 0.85rem)', color: 'var(--ink-2)', lineHeight: 1.4 }}>
        {etape.texte}
      </p>
    </motion.div>
  )
}

/** Bande sombre a chiffres, comme la bande Resultats de l'accueil. */
export function BandeChiffres({ items }: { items: { valeur: string; legende: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ backgroundColor: 'var(--dark)', padding: 'clamp(1.6rem, 5vw, 4rem) 1.5rem' }}>
      <div
        ref={ref}
        className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center"
      >
        {items.map((chiffre, i) => (
          <motion.div
            key={chiffre.legende}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            className={items.length === 3 && i === 2 ? 'col-span-2 lg:col-span-1' : undefined}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)',
                letterSpacing: '-0.02em',
                color: `var(--vert-${[3, 2, 1, 2][i % 4]})`,
              }}
            >
              {chiffre.valeur}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--cream-2)', lineHeight: 1.45, marginTop: '0.4rem' }}>
              {chiffre.legende}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
