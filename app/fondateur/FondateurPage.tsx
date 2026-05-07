'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── Types ─────────────────────────────────────────────────────────────────

type FilterType = 'RECRUTEUR' | 'CLIENT' | 'PARTENAIRE' | null

const TETRI_COLORS = {
  I: '#00F0F0',
  O: '#F0F000',
  T: '#A000F0',
  S: '#00F000',
  Z: '#F00000',
  L: '#F0A000',
  J: '#0000F0',
} as const

type TetriPiece = keyof typeof TETRI_COLORS

// ─── Data ──────────────────────────────────────────────────────────────────

const experiences: {
  title: string
  period: string
  role: string
  description: string
  kpis: string[]
  piece: TetriPiece
  tags: Array<'RECRUTEUR' | 'CLIENT' | 'PARTENAIRE'>
}[] = [
  {
    title: '123Digital',
    period: '2023 – présent',
    role: 'Fondateur & Directeur',
    description: "Création et direction d'une agence digitale full-stack spécialisée TPE/PME",
    kpis: ['15+ clients accompagnés', '6 services', 'Région ARA'],
    piece: 'S',
    tags: ['CLIENT', 'RECRUTEUR'],
  },
  {
    title: 'Fondation France-Israël',
    period: '2024 – présent',
    role: 'Responsable Stratégie Digitale',
    description: "Direction de la transformation numérique d'une fondation nationale",
    kpis: ['Stratégie nationale', '3 plateformes gérées', 'Campagnes data-driven'],
    piece: 'I',
    tags: ['RECRUTEUR', 'PARTENAIRE'],
  },
  {
    title: 'Chabad On Campus',
    period: '2017 – présent',
    role: 'Chef de projet & Social Media',
    description: "Gestion de projet long terme, social media, coordination d'événements",
    kpis: ['9 ans', '600+ adhérents', 'Communauté nationale'],
    piece: 'T',
    tags: ['RECRUTEUR'],
  },
  {
    title: 'Kedem Europe / Bartenura',
    period: '2017 – présent',
    role: 'Responsable Production',
    description: "Management d'équipes de production pour la marque n°1 mondiale du vin cacher (Moscato Bartenura)",
    kpis: ['8 saisons', '15+ personnes / équipe', 'Leader mondial vin cacher'],
    piece: 'L',
    tags: ['RECRUTEUR', 'PARTENAIRE'],
  },
  {
    title: 'EASYBAZAR',
    period: '2022',
    role: 'Digital Manager',
    description: 'Gestion des plateformes de vente en ligne (Amazon, WordPress)',
    kpis: ['Amazon + WordPress', '+40% visibilité en ligne'],
    piece: 'J',
    tags: ['RECRUTEUR', 'CLIENT'],
  },
  {
    title: 'Green Energie France',
    period: '2021',
    role: 'Business Developer',
    description: 'Prospection B2B et développement commercial dans les énergies vertes',
    kpis: ['10 mois', 'Prospection B2B', 'Développement commercial'],
    piece: 'Z',
    tags: ['RECRUTEUR'],
  },
  {
    title: 'LABRANDA / Jaguar Event',
    period: '2021',
    role: 'Responsable événementiel',
    description: "Coordination d'un séjour VIP pour Jaguar dans un hôtel 4 étoiles",
    kpis: ['Hôtel 4★ Gran Canaria', 'Client Jaguar', '2 semaines'],
    piece: 'O',
    tags: ['RECRUTEUR', 'PARTENAIRE'],
  },
  {
    title: 'Sofitel Agadir',
    period: '2019',
    role: 'Superviseur équipe & relation client',
    description: 'Supervision équipe restauration dans un établissement 5 étoiles au Maroc',
    kpis: ['Sofitel 5★', 'Supervision restauration', 'Maroc'],
    piece: 'I',
    tags: ['RECRUTEUR'],
  },
]

const skills: { label: string; level: number; piece: TetriPiece }[] = [
  { label: 'SEO / Référencement', level: 0.9, piece: 'S' },
  { label: 'Web Design & Dev', level: 0.8, piece: 'I' },
  { label: 'Stratégie Digitale', level: 0.95, piece: 'T' },
  { label: 'Management', level: 0.85, piece: 'L' },
  { label: 'Community Mgmt', level: 0.75, piece: 'J' },
  { label: 'IA & Automation', level: 0.8, piece: 'O' },
]

const achievements = [
  { emoji: '🏆', code: 'LEADER MONDIAL', desc: "Bartenura, marque n°1 vin cacher", color: TETRI_COLORS.O },
  { emoji: '🌍', code: '8 PAYS', desc: 'Missions : France, Italie, Espagne, Portugal, Maroc…', color: TETRI_COLORS.I },
  { emoji: '⚡', code: '9 ANS DE JEU', desc: 'Expérience terrain depuis 2016', color: TETRI_COLORS.T },
  { emoji: '🎯', code: 'FULL STACK', desc: 'De la stratégie au code', color: TETRI_COLORS.S },
]

// ─── Sub-components ────────────────────────────────────────────────────────

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.05 } },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function TetriIcon({ piece }: { piece: TetriPiece }) {
  const color = TETRI_COLORS[piece]
  const grids: Record<TetriPiece, number[][]> = {
    I: [[1, 1, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[1, 1, 1], [0, 1, 0]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    L: [[1, 0], [1, 0], [1, 1]],
    J: [[0, 1], [0, 1], [1, 1]],
  }
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
      {grids[piece].map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 2 }}>
          {row.map((cell, ci) => (
            <div
              key={ci}
              style={{
                width: 7,
                height: 7,
                backgroundColor: cell ? color : 'transparent',
                border: cell ? `1px solid ${color}99` : 'none',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export function FondateurPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null)

  const toggleFilter = (filter: FilterType) => {
    setActiveFilter(prev => (prev === filter ? null : filter))
  }

  const isVisible = (tags: string[]) => !activeFilter || tags.includes(activeFilter)

  const bgStyle: React.CSSProperties = {
    backgroundColor: '#080808',
    backgroundImage: [
      'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '32px 32px',
  }

  return (
    <div style={bgStyle} className="min-h-screen">

      {/* ── Section 1 : Scoreboard ──────────────────────────────────────────── */}
      <section style={{ padding: '8rem 1.5rem 4rem' }}>
        <div className="mx-auto" style={{ maxWidth: '48rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              border: '2px solid #00FF87',
              borderRadius: 4,
              padding: 'clamp(1.25rem, 4vw, 2rem)',
              backgroundColor: 'rgba(0,255,135,0.02)',
              boxShadow: '0 0 40px rgba(0,255,135,0.06), inset 0 0 40px rgba(0,255,135,0.02)',
            }}
          >
            {/* Top row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-mono mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(0,255,135,0.55)' }}>
                  PLAYER 1
                </div>
                <div className="font-mono font-bold" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.25rem)', color: '#00FF87', letterSpacing: '0.06em' }}>
                  <TypewriterText text="MAURICE TIMSIT" delay={0.4} />
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(0,255,135,0.55)' }}>
                  HIGH SCORE
                </div>
                <div className="font-mono font-bold" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.25rem)', color: '#00FF87', letterSpacing: '0.06em' }}>
                  <TypewriterText text="123DIGITAL" delay={1.1} />
                </div>
              </div>
            </div>

            <div style={{ height: 1, backgroundColor: 'rgba(0,255,135,0.18)', margin: '1rem 0' }} />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'LEVEL', value: 'EXPERT', delay: 1.7 },
                { label: 'SCORE', value: '8 ANS', delay: 2.0 },
                { label: 'LINES', value: '60+ PROJETS', delay: 2.3 },
              ].map(({ label, value, delay }) => (
                <div key={label}>
                  <div className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: 'rgba(0,255,135,0.45)', marginBottom: 4 }}>
                    {label}
                  </div>
                  <div className="font-mono font-bold" style={{ fontSize: 'clamp(0.75rem, 1.8vw, 1rem)', color: '#E1E0CC', letterSpacing: '0.08em' }}>
                    <TypewriterText text={value} delay={delay} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }}
            className="mt-8 text-center"
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              color: '#E1E0CC',
              letterSpacing: '-0.01em',
            }}
          >
            Fondateur &amp; Stratège Digital
          </motion.h1>
        </div>
      </section>

      {/* ── Section 2 : Filtre visiteur ────────────────────────────────────── */}
      <section style={{ padding: '1rem 1.5rem 2.5rem' }}>
        <div className="mx-auto" style={{ maxWidth: '48rem' }}>
          <div className="flex flex-wrap justify-center gap-3">
            {(['RECRUTEUR', 'CLIENT', 'PARTENAIRE'] as const).map((filter) => (
              <motion.button
                key={filter}
                onClick={() => toggleFilter(filter)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '0.45rem 1.4rem',
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                  border: activeFilter === filter
                    ? '2px solid #00FF87'
                    : '2px solid rgba(255,255,255,0.18)',
                  backgroundColor: activeFilter === filter
                    ? 'rgba(0,255,135,0.1)'
                    : 'transparent',
                  color: activeFilter === filter ? '#00FF87' : 'rgba(225,224,204,0.55)',
                  cursor: 'pointer',
                  borderRadius: 2,
                  boxShadow: activeFilter === filter ? '0 0 14px rgba(0,255,135,0.22)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                [ {filter} ]
              </motion.button>
            ))}
          </div>

          {activeFilter && (
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-3 font-mono"
              style={{ fontSize: '0.62rem', color: 'rgba(0,255,135,0.45)', letterSpacing: '0.1em' }}
            >
              FILTRE : {activeFilter} — cliquez à nouveau pour désactiver
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Section 3 : Expériences Tetriminos ─────────────────────────────── */}
      <section style={{ padding: '2rem 1.5rem 5rem' }}>
        <div className="mx-auto" style={{ maxWidth: '64rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono mb-8"
            style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(0,255,135,0.45)' }}
          >
            // EXPÉRIENCES.log
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.map((exp, i) => {
              const color = TETRI_COLORS[exp.piece]
              const visible = isVisible(exp.tags)
              return (
                <motion.div
                  key={exp.title}
                  initial={{ y: -60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, delay: i * 0.1 }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 0 28px ${color}35, 0 6px 28px rgba(0,0,0,0.55)`,
                  }}
                  style={{
                    backgroundColor: '#0e0e0e',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderLeft: `4px solid ${color}`,
                    borderRadius: 4,
                    padding: '1.4rem',
                    position: 'relative',
                    opacity: visible ? 1 : 0.15,
                    filter: visible ? 'none' : 'grayscale(1)',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                  }}
                >
                  {/* Piece badge */}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <TetriIcon piece={exp.piece} />
                  </div>

                  {/* Header */}
                  <div style={{ paddingRight: '3rem', marginBottom: '0.7rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#E1E0CC', marginBottom: 2 }}>
                      {exp.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color, fontWeight: 600 }}>
                      {exp.role}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(225,224,204,0.38)', letterSpacing: '0.08em', marginTop: 3 }}>
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.8rem', color: 'rgba(225,224,204,0.6)', lineHeight: 1.6, marginBottom: '0.9rem' }}>
                    {exp.description}
                  </p>

                  {/* KPIs */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exp.kpis.map((kpi) => (
                      <span
                        key={kpi}
                        className="font-mono"
                        style={{
                          fontSize: '0.62rem',
                          padding: '2px 8px',
                          backgroundColor: `${color}10`,
                          border: `1px solid ${color}28`,
                          color,
                          borderRadius: 2,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono"
                        style={{
                          fontSize: '0.52rem',
                          padding: '1px 6px',
                          backgroundColor: activeFilter === tag ? 'rgba(0,255,135,0.12)' : 'rgba(255,255,255,0.04)',
                          color: activeFilter === tag ? '#00FF87' : 'rgba(225,224,204,0.28)',
                          border: `1px solid ${activeFilter === tag ? 'rgba(0,255,135,0.35)' : 'rgba(255,255,255,0.07)'}`,
                          borderRadius: 2,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4 : Compétences colonnes ───────────────────────────────── */}
      <section style={{ padding: '4rem 1.5rem 5rem' }}>
        <div className="mx-auto" style={{ maxWidth: '56rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono mb-12"
            style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(0,255,135,0.45)' }}
          >
            // COMPÉTENCES.stack
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {skills.map((skill, i) => {
              const color = TETRI_COLORS[skill.piece]
              return (
                <div key={skill.label} className="flex flex-col items-center gap-3">
                  <div
                    style={{
                      width: 40,
                      height: 128,
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.12, ease: 'easeOut' }}
                      style={{
                        width: '100%',
                        height: `${skill.level * 100}%`,
                        backgroundColor: color,
                        transformOrigin: 'bottom',
                        boxShadow: `0 0 10px ${color}50`,
                        backgroundImage:
                          'repeating-linear-gradient(transparent, transparent 29px, rgba(0,0,0,0.35) 29px, rgba(0,0,0,0.35) 32px)',
                      }}
                    />
                    {[25, 50, 75].map((pct) => (
                      <div
                        key={pct}
                        style={{
                          position: 'absolute',
                          bottom: `${pct}%`,
                          left: 0,
                          right: 0,
                          height: 1,
                          backgroundColor: 'rgba(0,0,0,0.35)',
                          pointerEvents: 'none',
                        }}
                      />
                    ))}
                  </div>

                  <div
                    className="font-mono text-center"
                    style={{ fontSize: '0.58rem', color: 'rgba(225,224,204,0.45)', lineHeight: 1.4, letterSpacing: '0.04em' }}
                  >
                    {skill.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Section 5 : Achievements ────────────────────────────────────────── */}
      <section style={{ padding: '4rem 1.5rem 5rem' }}>
        <div className="mx-auto" style={{ maxWidth: '56rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono mb-10"
            style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(0,255,135,0.45)' }}
          >
            // ACHIEVEMENTS.json
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.code}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.04, boxShadow: `0 0 22px ${a.color}28` }}
                style={{
                  backgroundColor: '#0e0e0e',
                  border: `1px solid ${a.color}28`,
                  borderRadius: 4,
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{a.emoji}</div>
                <div
                  className="font-mono font-bold"
                  style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: a.color, marginBottom: '0.5rem' }}
                >
                  {a.code}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'rgba(225,224,204,0.48)', lineHeight: 1.5 }}>
                  {a.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6 : Game Over CTA ───────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem 8rem' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '40rem' }}>
          <motion.div
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="font-mono font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 3.2rem)',
              color: '#00FF87',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
            }}
          >
            GAME OVER ?
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
              color: '#E1E0CC',
              marginBottom: '3rem',
            }}
          >
            La partie continue chez vous.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.8rem',
                backgroundColor: '#00FF87',
                color: '#000',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.76rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                borderRadius: 2,
                textDecoration: 'none',
              }}
            >
              LANCER UNE MISSION →
            </Link>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.8rem',
                backgroundColor: 'transparent',
                color: '#E1E0CC',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.76rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                border: '2px solid rgba(225,224,204,0.28)',
                borderRadius: 2,
                textDecoration: 'none',
              }}
            >
              VOIR LE SITE →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
