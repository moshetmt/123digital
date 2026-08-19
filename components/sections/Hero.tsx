'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Phone, Check } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const PHONE_TEL = 'tel:+33652092301'

// ── Pong de fond ──────────────────────────────────────────────────────────────
// Banniere retournee (validee le 19/08) : le vert du logo passe en fond, tout
// le texte passe en blanc, et une partie de Pong tourne derriere, en blanc.
// Aucun fichier n'est charge : le canvas reste transparent et laisse voir le
// degrade CSS, ce qui coute zero octet et ne touche pas au LCP.
//
// Trois regles imposees par l'operateur :
//   1. aucune trainee — on efface au lieu de repeindre ;
//   2. vitesse d'arcade, exprimee en pixels par seconde et non par image, donc
//      identique sur un ecran 60 Hz ou 120 Hz ;
//   3. les deux raquettes sont independantes — chacune tire sa destination, sa
//      vitesse et son moment de depart separement, aucune ne suit l'autre.
// La balle rebondit aussi sur les bords : l'echange ne s'interrompt jamais,
// meme quand une raquette n'est pas au rendez-vous.

const BALL_SPEED = 150   // px/s
const PADDLE_SPEED = 260 // px/s — regle par simulation : 2 interceptions sur 3
const BALL_R = 6
const PADDLE_W = 7
const MARGIN = 14
const WHITE = 'oklch(0.985 0.003 150)'

function PongBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf: number | null = null
    let last = 0
    let onScreen = true
    let started = false

    const ball = { x: 0, y: 0, angle: 0 }
    const pads = [
      { y: 0, target: 0, height: 0, wait: 0, speed: PADDLE_SPEED },
      { y: 0, target: 0, height: 0, wait: 0, speed: PADDLE_SPEED },
    ]

    function newTarget(p: (typeof pads)[number]) {
      const half = p.height / 2
      // Trois fois sur quatre la raquette vise la hauteur ou se trouve la balle,
      // une fois sur quatre elle part au hasard. Sans cette part d'interet, a
      // cette vitesse elle ne toucherait presque plus rien.
      const base =
        Math.random() < 0.25
          ? Math.random() * h
          : ball.y + (Math.random() - 0.5) * h * 0.18
      p.target = Math.max(half, Math.min(h - half, base))
      p.wait = 0.3 + Math.random() * 1.1
      p.speed = PADDLE_SPEED * (0.55 + Math.random() * 0.95)
    }

    function layout() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(rect.width, 1)
      h = Math.max(rect.height, 1)
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      pads.forEach((p) => {
        p.height = Math.max(52, Math.min(104, h * 0.19))
      })

      if (!started) {
        started = true
        ball.x = w / 2
        ball.y = h / 2
        ball.angle = (Math.random() < 0.5 ? 0 : Math.PI) + (Math.random() - 0.5) * 0.9
        pads.forEach((p, i) => {
          p.y = h * (i === 0 ? 0.35 : 0.65)
          newTarget(p)
        })
      } else {
        pads.forEach((p) => {
          p.y = Math.max(p.height / 2, Math.min(h - p.height / 2, p.y))
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      ctx!.strokeStyle = 'oklch(0.985 0.003 150 / 22%)'
      ctx!.lineWidth = 2
      ctx!.setLineDash([7, 13])
      ctx!.beginPath()
      ctx!.moveTo(w / 2, 0)
      ctx!.lineTo(w / 2, h)
      ctx!.stroke()
      ctx!.setLineDash([])

      ctx!.fillStyle = WHITE
      ctx!.fillRect(MARGIN, pads[0].y - pads[0].height / 2, PADDLE_W, pads[0].height)
      ctx!.fillRect(w - MARGIN - PADDLE_W, pads[1].y - pads[1].height / 2, PADDLE_W, pads[1].height)

      ctx!.beginPath()
      ctx!.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2)
      ctx!.fill()
    }

    function update(dt: number) {
      ball.angle += (Math.random() - 0.5) * 0.25 * dt

      // Garde-fou : sans lui la derive aleatoire finit par rendre la course
      // verticale et la balle fait l'ascenseur au milieu de la banniere.
      const vx = Math.cos(ball.angle)
      if (Math.abs(vx) < 0.32) {
        ball.angle = Math.atan2(Math.sin(ball.angle), vx < 0 ? -0.32 : 0.32)
      }

      ball.x += Math.cos(ball.angle) * BALL_SPEED * dt
      ball.y += Math.sin(ball.angle) * BALL_SPEED * dt

      if (ball.y < BALL_R) {
        ball.y = BALL_R
        ball.angle = -ball.angle + (Math.random() - 0.5) * 0.15
      }
      if (ball.y > h - BALL_R) {
        ball.y = h - BALL_R
        ball.angle = -ball.angle + (Math.random() - 0.5) * 0.15
      }

      const faces = [MARGIN + PADDLE_W, w - MARGIN - PADDLE_W]
      pads.forEach((p, i) => {
        const goingLeft = Math.cos(ball.angle) < 0
        const towardThis = i === 0 ? goingLeft : !goingLeft
        const inFront = Math.abs(ball.y - p.y) < p.height / 2 + BALL_R
        const reached = i === 0 ? ball.x - BALL_R < faces[0] : ball.x + BALL_R > faces[1]

        if (towardThis && reached && inFront) {
          ball.x = i === 0 ? faces[0] + BALL_R : faces[1] - BALL_R
          ball.angle = Math.PI - ball.angle + ((ball.y - p.y) / p.height) * 0.55
        }
      })

      if (ball.x < BALL_R) {
        ball.x = BALL_R
        ball.angle = Math.PI - ball.angle
      }
      if (ball.x > w - BALL_R) {
        ball.x = w - BALL_R
        ball.angle = Math.PI - ball.angle
      }

      pads.forEach((p) => {
        p.wait -= dt
        if (p.wait <= 0 && Math.abs(p.target - p.y) < 2) newTarget(p)
        const step = p.speed * dt
        p.y =
          Math.abs(p.target - p.y) <= step
            ? p.target
            : p.y + Math.sign(p.target - p.y) * step
      })
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      update(dt)
      draw()
      raf = requestAnimationFrame(frame)
    }

    function play() {
      if (raf !== null || !onScreen || document.hidden || reduced) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    function pause() {
      if (raf !== null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    function onResize() {
      layout()
      draw()
    }

    function onVisibility() {
      if (document.hidden) pause()
      else play()
    }

    layout()
    draw()

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0].isIntersecting
        if (onScreen) play()
        else pause()
      },
      { threshold: 0.1 },
    )
    observer.observe(canvas)

    if (!reduced) play()

    return () => {
      pause()
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
    />
  )
}

// « Google » est le seul mot mis en valeur du titre : c'est le mot que le
// visiteur cherche des yeux. Decoupage sur la chaine traduite plutot que deux
// cles i18n, pour que le titre reste une phrase entiere dans le fichier.
function highlightGoogle(text: string): ReactNode {
  const parts = text.split('Google')
  if (parts.length === 1) return text

  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <span style={{ color: 'var(--vert-pale)' }}>Google</span>}
      {part}
    </span>
  ))
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).hero
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const checks = [d.check1, d.check2, d.check3]

  return (
    <section
      ref={ref}
      id="section-hero"
      className="relative isolate overflow-hidden"
      style={{
        padding: 'clamp(1.5rem, 5vw, 4rem) 1.5rem',
        color: 'var(--on-brand)',
        background:
          'radial-gradient(120% 85% at 12% 0%, var(--brand-light) 0%, transparent 58%), ' +
          'radial-gradient(110% 90% at 92% 100%, var(--brand-deep) 0%, transparent 62%), ' +
          'var(--brand)',
      }}
      aria-label="Section hero"
    >
      <PongBackground />

      {/* Voile vert, pas noir : il assombrit a peine le centre pour que le texte
          blanc reste net quand la balle passe derriere, et laisse les bords
          libres pour les raquettes. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(88% 58% at 50% 46%, oklch(0.395 0.112 155 / 72%) 0%, oklch(0.395 0.112 155 / 34%) 58%, oklch(0.395 0.112 155 / 0%) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          <motion.h1
            initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem, 4.6vw, 3.25rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              color: 'var(--on-brand)',
              maxWidth: '19ch',
              marginBottom: '1rem',
            }}
          >
            {highlightGoogle(d.h1)}
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mx-auto"
            style={{
              fontSize: 'clamp(0.95rem, 3.2vw, 1.1rem)',
              color: 'oklch(0.985 0.003 150 / 86%)',
              maxWidth: '58ch',
              marginBottom: 'clamp(1rem, 4vw, 1.75rem)',
              lineHeight: 1.5,
            }}
          >
            {d.sub}
          </motion.p>

          <motion.div
            initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-6"
          >
            {/* Boutons inverses : le vert est passe en fond, l'appel devient
                donc blanc sur vert pour rester l'element le plus contraste. */}
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{
                backgroundColor: 'var(--on-brand)',
                color: 'var(--brand-deep)',
                padding: '0.9rem 1.6rem',
                boxShadow: '0 2px 14px oklch(0.145 0 0 / 22%)',
              }}
            >
              <Phone size={16} aria-hidden />
              {d.ctaCall}
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{
                border: '2px solid oklch(0.985 0.003 150 / 55%)',
                color: 'var(--on-brand)',
                padding: '0.8rem 1.5rem',
              }}
            >
              {d.ctaQuote}
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-1.5"
            role="list"
          >
            {/* Grille a 3 colonnes des `sm` : en flex-wrap la 3e puce tombait
                seule sur une 2e ligne des que la fenetre passait sous 1280 px. */}
            {checks.map((label) => (
              <li
                key={label}
                className="flex items-start gap-1.5"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'oklch(0.985 0.003 150 / 86%)',
                  lineHeight: 1.35,
                }}
              >
                <Check
                  size={15}
                  style={{ color: 'var(--on-brand)', flexShrink: 0, marginTop: 2 }}
                  strokeWidth={3}
                  aria-hidden
                />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
