'use client'

import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ─── Constants ─────────────────────────────────────────────────────────────

const T = {
  I: '#00F0F0', O: '#F0A000', T: '#A000F0',
  S: '#00FF87', Z: '#F00000', L: '#F0A000', J: '#0060FF',
} as const
type TK = keyof typeof T

type FilterType = 'RECRUTEUR' | 'CLIENT' | 'PARTENAIRE' | null

// ─── Data ──────────────────────────────────────────────────────────────────

const EXP: {
  title: string; period: string; role: string; desc: string
  kpis: string[]; piece: TK; size: 'lg' | 'md' | 'sm'
  tags: Array<'RECRUTEUR' | 'CLIENT' | 'PARTENAIRE'>
}[] = [
  {
    title: '123Digital',
    period: '2023 – présent',
    role: 'Fondateur & Directeur',
    desc: "Création et direction d'une agence digitale full-stack. Stratégie, développement web, SEO, publicité et automatisation pour TPE/PME de la région Auvergne-Rhône-Alpes.",
    kpis: ['15+ clients', '6 services', 'Région ARA'],
    piece: 'S', size: 'lg',
    tags: ['CLIENT', 'RECRUTEUR'],
  },
  {
    title: 'Fondation France-Israël',
    period: '2024 – présent',
    role: 'Responsable Stratégie Digitale',
    desc: "Direction de la transformation numérique d'une fondation nationale. Campagnes data-driven, 3 plateformes gérées.",
    kpis: ['Stratégie nationale', '3 plateformes', 'Data-driven'],
    piece: 'I', size: 'md',
    tags: ['RECRUTEUR', 'PARTENAIRE'],
  },
  {
    title: 'Chabad On Campus',
    period: '2017 – présent',
    role: 'Chef de projet & Social Media',
    desc: "9 ans de gestion de projet long terme, social media et coordination d'événements pour une communauté nationale de 600+ adhérents.",
    kpis: ['9 ans', '600+ adhérents', 'National'],
    piece: 'T', size: 'md',
    tags: ['RECRUTEUR'],
  },
  {
    title: 'Kedem Europe / Bartenura',
    period: '2017 – présent',
    role: 'Responsable Production',
    desc: "Management d'équipes de production pour la marque n°1 mondiale du vin cacher.",
    kpis: ['8 saisons', '15+ / équipe', 'N°1 mondial'],
    piece: 'L', size: 'md',
    tags: ['RECRUTEUR', 'PARTENAIRE'],
  },
  {
    title: 'EASYBAZAR',
    period: '2022',
    role: 'Digital Manager',
    desc: 'Amazon + WordPress. +40% visibilité.',
    kpis: ['+40% visibilité'],
    piece: 'J', size: 'sm',
    tags: ['RECRUTEUR', 'CLIENT'],
  },
  {
    title: 'LABRANDA / Jaguar',
    period: '2021',
    role: 'Responsable événementiel',
    desc: 'Séjour VIP Jaguar, hôtel 4★ Gran Canaria.',
    kpis: ['Luxe international'],
    piece: 'O', size: 'sm',
    tags: ['RECRUTEUR', 'PARTENAIRE'],
  },
  {
    title: 'Green Energie France',
    period: '2021',
    role: 'Business Developer',
    desc: 'Prospection B2B, développement commercial.',
    kpis: ['10 mois', 'B2B'],
    piece: 'Z', size: 'sm',
    tags: ['RECRUTEUR'],
  },
  {
    title: 'Sofitel Agadir',
    period: '2019',
    role: 'Superviseur & Relation Client',
    desc: 'Supervision équipe restauration, établissement 5★.',
    kpis: ['Sofitel 5★', 'Maroc'],
    piece: 'I', size: 'sm',
    tags: ['RECRUTEUR'],
  },
]

const SKILLS: { label: string; dots: number; piece: TK; icon: string }[] = [
  { label: 'SEO / Référencement', dots: 5, piece: 'S', icon: '◈' },
  { label: 'Web Design & Dev',    dots: 4, piece: 'I', icon: '◉' },
  { label: 'Stratégie Digitale',  dots: 5, piece: 'T', icon: '◆' },
  { label: 'Management',          dots: 4, piece: 'L', icon: '◐' },
  { label: 'Community Mgmt',      dots: 4, piece: 'J', icon: '◈' },
  { label: 'IA & Automation',     dots: 4, piece: 'O', icon: '◉' },
]

const MILESTONES = [
  {
    year: '2017',
    title: 'Première mission internationale',
    desc: 'Bartenura — leader mondial vin cacher. Début du management d\'équipes en conditions réelles.',
    color: T.L,
  },
  {
    year: '2019',
    title: 'Terrain sur 2 pays en 2 mois',
    desc: 'Sofitel Agadir 5★ + missions Portugal. Développement de l\'adaptabilité culturelle et opérationnelle.',
    color: T.I,
  },
  {
    year: '2021',
    title: 'Diversification : B2B + luxe international',
    desc: 'Green Energie France + LABRANDA/Jaguar. Deux univers, une seule constante : la performance.',
    color: T.T,
  },
  {
    year: '2022',
    title: 'Pivot digital',
    desc: 'EASYBAZAR — Amazon & WordPress. La transition vers le digital full-stack s\'accélère.',
    color: T.J,
  },
  {
    year: '2023 →',
    title: 'Création 123Digital + mandat national',
    desc: 'Fondation d\'une agence + prise en charge de la stratégie digitale de la Fondation France-Israël.',
    color: T.S,
  },
]

// ─── Magic UI : Interactive Grid Pattern ───────────────────────────────────
// Adapted from magicui.design — two-layer CSS grid with mouse-proximity reveal

function InteractiveGridPattern({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -9999, y: -9999 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])

  const onLeave = useCallback(() => setPos({ x: -9999, y: -9999 }), [])

  const grid: CSSProperties = {
    backgroundImage: [
      'linear-gradient(rgba(0,255,135,0.06) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(0,255,135,0.06) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '40px 40px',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Base grid — always visible */}
      <div style={{ ...grid, position: 'absolute', inset: 0 }} />
      {/* Revealed layer near cursor */}
      <div
        style={{
          ...grid,
          backgroundImage: [
            'linear-gradient(rgba(0,255,135,0.18) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,255,135,0.18) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '40px 40px',
          position: 'absolute', inset: 0,
          WebkitMaskImage: `radial-gradient(circle 280px at ${pos.x}px ${pos.y}px, black, transparent)`,
          maskImage:        `radial-gradient(circle 280px at ${pos.x}px ${pos.y}px, black, transparent)`,
        }}
      />
    </div>
  )
}

// ─── Aceternity : Spotlight ────────────────────────────────────────────────
// Adapted from ui.aceternity.com/components/spotlight

function Spotlight({ parentRef }: { parentRef: React.RefObject<HTMLElement | null> }) {
  const [pos, setPos] = useState({ x: '30%', y: '40%' })

  useEffect(() => {
    const el = parentRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      setPos({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` })
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [parentRef])

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
        background: `radial-gradient(550px circle at ${pos.x} ${pos.y}, rgba(0,255,135,0.09), transparent 40%)`,
        transition: 'background 0.05s linear',
      }}
    />
  )
}

// ─── Aceternity : TypewriterEffect ────────────────────────────────────────
// Adapted from ui.aceternity.com/components/typewriter-effect

function TypewriterEffect({ text, delay = 0.4 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.08 } },
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ─── CountUp ───────────────────────────────────────────────────────────────

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const dur = 1800
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Magic UI : Aurora Background ─────────────────────────────────────────
// Adapted from magicui.design — animated radial gradient blobs

function AuroraBackground({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '5%', left: '15%',
            width: '55%', height: '65%',
            background: 'radial-gradient(ellipse, rgba(0,255,135,0.09) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 35, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{
            position: 'absolute', top: '25%', right: '5%',
            width: '45%', height: '55%',
            background: 'radial-gradient(ellipse, rgba(0,240,240,0.05) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, 40, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
          style={{
            position: 'absolute', bottom: '5%', left: '35%',
            width: '40%', height: '45%',
            background: 'radial-gradient(ellipse, rgba(160,0,240,0.04) 0%, transparent 60%)',
            filter: 'blur(55px)',
          }}
        />
      </div>
      {children}
    </div>
  )
}

// ─── TetriIcon ─────────────────────────────────────────────────────────────

function TetriIcon({ piece }: { piece: TK }) {
  const color = T[piece]
  const grids: Record<TK, number[][]> = {
    I: [[1,1,1,1]],
    O: [[1,1],[1,1]],
    T: [[1,1,1],[0,1,0]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]],
    L: [[1,0],[1,0],[1,1]],
    J: [[0,1],[0,1],[1,1]],
  }
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
      {grids[piece].map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 2 }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{ width: 6, height: 6, backgroundColor: cell ? color : 'transparent', border: cell ? `1px solid ${color}88` : 'none' }} />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── SkillDots ─────────────────────────────────────────────────────────────

function SkillDots({ dots, color }: { dots: number; color: string }) {
  return (
    <span style={{ letterSpacing: '0.15em', fontSize: '0.65rem' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < dots ? color : 'rgba(255,255,255,0.15)' }}>
          {i < dots ? '●' : '○'}
        </span>
      ))}
    </span>
  )
}

// ─── Aceternity : Card Hover Effect ───────────────────────────────────────
// Adapted from ui.aceternity.com — border glow that follows cursor

function HoverGlowCard({
  children, color, style, className,
}: {
  children: ReactNode; color: string; style?: CSSProperties; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={className}
      style={{
        position: 'relative',
        '--glow-color': color,
        ...style,
      } as CSSProperties}
    >
      {/* Glow border layer */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 1, opacity: 0,
          background: `radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), ${color}22, transparent 60%)`,
          transition: 'opacity 0.25s',
        }}
        className="card-glow-layer"
      />
      <style>{`.card-glow-card:hover .card-glow-layer { opacity: 1 !important; }`}</style>
      {children}
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

export function FondateurPage() {
  const [filter, setFilter] = useState<FilterType>(null)

  // Refs for GSAP timeline (Section 5)
  const timelineSectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  // Hero spotlight ref
  const heroRef = useRef<HTMLElement>(null)

  // ── GSAP : Timeline section ─────────────────────────────────────────────
  useGSAP(() => {
    if (!timelineSectionRef.current || !lineRef.current) return

    // Line draws as scroll progresses
    gsap.fromTo(
      lineRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineSectionRef.current,
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1,
        },
      }
    )

    // Cards slide in alternating directions
    milestoneRefs.current.forEach((el, i) => {
      if (!el) return
      const isMobile = window.innerWidth < 768
      const fromX = isMobile ? -50 : i % 2 === 0 ? -80 : 80
      gsap.fromTo(
        el,
        { x: fromX, opacity: 0, willChange: 'transform' },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Dots scale in
    dotRefs.current.forEach((dot) => {
      if (!dot) return
      gsap.fromTo(
        dot,
        { scale: 0 },
        {
          scale: 1, duration: 0.4, ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: timelineSectionRef, dependencies: [] })

  // ScrollTrigger.refresh() after mount
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      clearTimeout(id)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const visible = (tags: string[]) => !filter || tags.includes(filter)

  // ────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ backgroundColor: '#080808', color: '#F5F5F5', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO SCOREBOARD
          Breakpoints: 375px stack, 768px+ side-by-side, 1440px max-w-4xl
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        {/* Magic UI Interactive Grid */}
        <InteractiveGridPattern />
        {/* Aceternity Spotlight */}
        <Spotlight parentRef={heroRef} />

        {/* Bottom vignette */}
        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(transparent, #080808)', pointerEvents: 'none', zIndex: 4 }} />

        <div className="mx-auto w-full" style={{ maxWidth: '52rem', padding: 'clamp(2rem, 8vw, 3rem)', position: 'relative', zIndex: 5 }}>

          {/* ── Scoreboard frame ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              border: '1px solid rgba(0,255,135,0.25)',
              borderRadius: 6,
              padding: 'clamp(1.5rem, 5vw, 2.5rem)',
              background: 'rgba(0,255,135,0.02)',
              backdropFilter: 'blur(2px)',
              boxShadow: '0 0 60px rgba(0,255,135,0.04), 0 1px 0 rgba(0,255,135,0.15) inset',
            }}
          >
            {/* Row 1 — player / score labels */}
            <div className="grid grid-cols-2" style={{ marginBottom: '0.5rem' }}>
              <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(0,255,135,0.5)' }}>PLAYER 1</span>
              <span className="font-mono text-right" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(0,255,135,0.5)' }}>HIGH SCORE</span>
            </div>

            {/* Row 2 — name / agency */}
            <div className="grid grid-cols-2 items-baseline" style={{ marginBottom: '1.5rem' }}>
              <h1 className="font-mono font-bold" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#00FF87', letterSpacing: '0.05em' }}>
                <TypewriterEffect text="MAURICE TIMSIT" delay={0.5} />
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="font-mono font-bold text-right"
                style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#00FF87', letterSpacing: '0.05em' }}
              >
                123DIGITAL
              </motion.div>
            </div>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.2, duration: 0.6, ease: 'easeOut' }}
              style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.4), transparent)', marginBottom: '1.25rem', transformOrigin: 'left' }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: 'rgba(245,245,245,0.65)',
                marginBottom: '1.75rem',
              }}
            >
              Fondateur &amp; Stratège Digital
            </motion.p>

            {/* Row 3 — stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4"
              style={{ gap: 'clamp(1rem, 4vw, 2rem)' }}
            >
              {[
                { label: 'LEVEL', value: 'EXPERT', isText: true },
                { label: 'SCORE', value: 8, suffix: ' ANS', isText: false },
                { label: 'LINES', value: 60, suffix: '+', isText: false },
                { label: 'COUNTRIES', value: 8, suffix: '', isText: false },
              ].map(({ label, value, suffix, isText }) => (
                <div key={label}>
                  <div className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(0,255,135,0.45)', marginBottom: 6 }}>
                    {label}
                  </div>
                  <div className="font-mono font-bold" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#F5F5F5', letterSpacing: '0.06em' }}>
                    {isText ? String(value) : <><CountUp to={value as number} />{suffix}</>}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — FILTRE VISITEUR
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div className="mx-auto" style={{ maxWidth: '52rem' }}>
          <div className="flex flex-wrap items-center gap-3">
            {([null, 'RECRUTEUR', 'CLIENT', 'PARTENAIRE'] as FilterType[]).map((f) => {
              const active = filter === f
              const label = f === null ? 'TOUS' : f
              return (
                <motion.button
                  key={label}
                  onClick={() => setFilter(f)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 1.1rem',
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.7rem', letterSpacing: '0.14em', fontWeight: 700,
                    border: `1px solid ${active ? '#00FF87' : 'rgba(255,255,255,0.15)'}`,
                    backgroundColor: 'transparent',
                    color: active ? '#00FF87' : 'rgba(245,245,245,0.5)',
                    borderRadius: 3, cursor: 'pointer',
                    boxShadow: active ? '0 0 16px rgba(0,255,135,0.18)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '0.45rem' }}>{active ? '●' : '○'}</span>
                  {label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — BENTO GRID (Aceternity inspired)
          Desktop: 3-col, 123Digital spans 2. Mobile: 1-col.
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(1rem, 3vw, 2rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)' }}>
        <div className="mx-auto" style={{ maxWidth: '72rem' }}>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono mb-10"
            style={{ fontSize: '0.6rem', letterSpacing: '0.24em', color: 'rgba(0,255,135,0.4)' }}
          >
            // EXPÉRIENCES.log
          </motion.div>

          {/* Grid — 1 col mobile / 3 col md+ */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '0.75rem',
            }}
            className="md:bento-grid"
          >
            <style>{`
              @media (min-width: 768px) {
                .md\\:bento-grid { grid-template-columns: repeat(3, 1fr); }
                .bento-lg { grid-column: span 2; }
              }
            `}</style>

            {EXP.map((exp, i) => {
              const color = T[exp.piece]
              const isVis = visible(exp.tags)
              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={exp.size === 'lg' ? 'bento-lg' : ''}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderLeft: `2px solid ${color}`,
                    borderRadius: 6,
                    padding: exp.size === 'lg' ? 'clamp(1.25rem, 3vw, 1.75rem)' : 'clamp(1rem, 2.5vw, 1.4rem)',
                    position: 'relative',
                    opacity: isVis ? 1 : 0.12,
                    filter: isVis ? 'none' : 'grayscale(1)',
                    transition: 'opacity 0.3s ease, filter 0.3s ease, box-shadow 0.25s ease',
                    cursor: 'default',
                  }}
                  whileHover={isVis ? { boxShadow: `0 0 32px ${color}20, 0 4px 32px rgba(0,0,0,0.5)` } : {}}
                >
                  {/* Badge piece */}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <TetriIcon piece={exp.piece} />
                  </div>

                  {/* Period */}
                  <div className="font-mono" style={{ fontSize: '0.58rem', color: 'rgba(245,245,245,0.3)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    {exp.period}
                  </div>

                  {/* Title + role */}
                  <div style={{ paddingRight: '2.5rem', marginBottom: '0.6rem' }}>
                    <div style={{ fontSize: exp.size === 'lg' ? '1.05rem' : '0.92rem', fontWeight: 700, color: '#F5F5F5', marginBottom: 2 }}>
                      {exp.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color, fontWeight: 500 }}>
                      {exp.role}
                    </div>
                  </div>

                  {/* Description — shown for lg/md */}
                  {exp.size !== 'sm' && (
                    <p style={{ fontSize: '0.78rem', color: 'rgba(245,245,245,0.5)', lineHeight: 1.65, marginBottom: '0.9rem' }}>
                      {exp.desc}
                    </p>
                  )}

                  {/* KPIs */}
                  <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '0.75rem' }}>
                    {exp.kpis.map((k) => (
                      <span key={k} className="font-mono" style={{ fontSize: '0.6rem', padding: '2px 7px', backgroundColor: `${color}0d`, border: `1px solid ${color}25`, color, borderRadius: 2 }}>
                        {k}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="font-mono" style={{
                        fontSize: '0.5rem', padding: '1px 5px', letterSpacing: '0.1em', borderRadius: 2,
                        backgroundColor: filter === tag ? 'rgba(0,255,135,0.1)' : 'rgba(255,255,255,0.04)',
                        color: filter === tag ? '#00FF87' : 'rgba(245,245,245,0.25)',
                        border: `1px solid ${filter === tag ? 'rgba(0,255,135,0.3)' : 'rgba(255,255,255,0.07)'}`,
                      }}>
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

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — COMPÉTENCES (3×2 desktop, 2×3 mobile)
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div className="mx-auto" style={{ maxWidth: '52rem' }}>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono mb-12"
            style={{ fontSize: '0.6rem', letterSpacing: '0.24em', color: 'rgba(0,255,135,0.4)' }}
          >
            // COMPÉTENCES.stack
          </motion.div>

          {/* 2 cols mobile / 3 cols md+ */}
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '0.75rem' }}>
            {SKILLS.map((skill, i) => {
              const color = T[skill.piece]
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ boxShadow: `0 0 28px ${color}18` }}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 6,
                    padding: 'clamp(1rem, 3vw, 1.4rem)',
                    display: 'flex', flexDirection: 'column', gap: '0.75rem',
                    transition: 'box-shadow 0.25s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.2rem', color }}>{skill.icon}</span>
                    <TetriIcon piece={skill.piece} />
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.68rem', color: '#F5F5F5', fontWeight: 600, marginBottom: '0.35rem', letterSpacing: '0.04em' }}>
                      {skill.label}
                    </div>
                    <SkillDots dots={skill.dots} color={color} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — TIMELINE GSAP
          Desktop: alternating left/right cards.
          Mobile (< 768px): left-aligned single column.
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={timelineSectionRef}
        style={{ padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}
      >
        <div className="mx-auto" style={{ maxWidth: '72rem' }}>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono mb-16"
            style={{ fontSize: '0.6rem', letterSpacing: '0.24em', color: 'rgba(0,255,135,0.4)' }}
          >
            // MILESTONES.timeline
          </motion.div>

          {/* ── Desktop timeline (md+) ── */}
          <div className="hidden md:block" style={{ position: 'relative' }}>
            {/* Vertical line track (background) */}
            <div style={{
              position: 'absolute', left: 'calc(50% - 1px)',
              top: 0, bottom: 0, width: 2,
              backgroundColor: 'rgba(0,255,135,0.08)',
            }} />
            {/* Animated line fill */}
            <div
              ref={lineRef}
              style={{
                position: 'absolute', left: 'calc(50% - 1px)',
                top: 0, width: 2, height: '0%',
                backgroundColor: '#00FF87',
                boxShadow: '0 0 8px rgba(0,255,135,0.5)',
                willChange: 'height',
              }}
            />

            {MILESTONES.map((m, i) => (
              <div key={m.year} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: '0 1.5rem', marginBottom: '4rem', alignItems: 'start' }}>
                {/* Left slot */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {i % 2 === 0 && (
                    <div
                      ref={el => { milestoneRefs.current[i] = el }}
                      style={{ maxWidth: '360px', willChange: 'transform' }}
                    >
                      <TimelineCard milestone={m} align="right" />
                    </div>
                  )}
                </div>

                {/* Center — dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1.25rem' }}>
                  <div
                    ref={el => { dotRefs.current[i] = el }}
                    style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: m.color, boxShadow: `0 0 14px ${m.color}80`, flexShrink: 0 }}
                  />
                  <div className="font-mono" style={{ fontSize: '0.58rem', color: m.color, marginTop: 8, letterSpacing: '0.1em' }}>
                    {m.year}
                  </div>
                </div>

                {/* Right slot */}
                <div>
                  {i % 2 !== 0 && (
                    <div
                      ref={el => { milestoneRefs.current[i] = el }}
                      style={{ maxWidth: '360px', willChange: 'transform' }}
                    >
                      <TimelineCard milestone={m} align="left" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Mobile timeline (< md) ── */}
          <div
            className="md:hidden"
            style={{ paddingLeft: '2rem', borderLeft: '2px solid rgba(0,255,135,0.12)', position: 'relative' }}
          >
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: '2.5rem', position: 'relative' }}
              >
                {/* Dot */}
                <div style={{ position: 'absolute', left: '-2.6rem', top: '1.1rem', width: 12, height: 12, borderRadius: '50%', backgroundColor: m.color, boxShadow: `0 0 10px ${m.color}70` }} />
                <TimelineCard milestone={m} align="left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — NEXT LEVEL CTA
          Magic UI Aurora Background
      ══════════════════════════════════════════════════════════════════ */}
      <AuroraBackground>
        <section style={{ padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 3rem)', position: 'relative', zIndex: 2 }}>
          <div className="mx-auto text-center" style={{ maxWidth: '40rem' }}>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                  color: '#F5F5F5',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 60px rgba(0,255,135,0.15), 0 0 120px rgba(0,255,135,0.08)',
                  marginBottom: '2rem',
                }}
              >
                NEXT<br />
                <span style={{ color: '#00FF87' }}>LEVEL</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                color: 'rgba(245,245,245,0.55)',
                marginBottom: '3rem',
              }}
            >
              La partie continue chez vous.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.8rem 2rem',
                  backgroundColor: '#00FF87', color: '#000',
                  fontFamily: 'ui-monospace, monospace', fontSize: '0.76rem',
                  fontWeight: 700, letterSpacing: '0.1em',
                  borderRadius: 3, textDecoration: 'none',
                  boxShadow: '0 0 24px rgba(0,255,135,0.3)',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                DÉMARRER UNE MISSION →
              </Link>
              <Link
                href="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.8rem 2rem',
                  backgroundColor: 'transparent', color: 'rgba(245,245,245,0.7)',
                  fontFamily: 'ui-monospace, monospace', fontSize: '0.76rem',
                  fontWeight: 700, letterSpacing: '0.1em',
                  border: '1px solid rgba(245,245,245,0.2)', borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              >
                ← VOIR LE SITE
              </Link>
            </motion.div>
          </div>
        </section>
      </AuroraBackground>

    </div>
  )
}

// ─── Timeline Card (used in Section 5) ────────────────────────────────────

function TimelineCard({ milestone, align }: {
  milestone: typeof MILESTONES[number]
  align: 'left' | 'right'
}) {
  const { color, year, title, desc } = milestone
  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: align === 'left' ? `2px solid ${color}` : undefined,
        borderRight: align === 'right' ? `2px solid ${color}` : undefined,
        borderRadius: 6,
        padding: '1.25rem 1.4rem',
      }}
    >
      <div className="font-mono" style={{ fontSize: '0.58rem', color, letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
        {year}
      </div>
      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F5F5F5', marginBottom: '0.5rem', lineHeight: 1.3 }}>
        {title}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.5)', lineHeight: 1.65 }}>
        {desc}
      </p>
    </div>
  )
}
