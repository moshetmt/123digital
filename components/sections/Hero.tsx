'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Phone, Check } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const PHONE_TEL = 'tel:+33652092301'

// ── Pong de fond ──────────────────────────────────────────────────────────────
// Banniere retournee (validee le 19/08) : le vert du logo passe en fond, tout le
// texte passe en blanc, et une partie de Pong tourne derriere, en blanc. Aucun
// fichier n'est charge : les canvas restent transparents et laissent voir le
// degrade CSS, ce qui coute zero octet et ne touche pas au LCP.
//
// Trois regles imposees par l'operateur :
//   1. aucune trainee — on efface au lieu de repeindre ;
//   2. vitesse d'arcade, exprimee en pixels par seconde et non par image, donc
//      identique sur un ecran 60 Hz ou 120 Hz ;
//   3. les deux raquettes sont independantes — chacune tire sa destination, sa
//      vitesse et son moment de depart separement, aucune ne suit l'autre.
// La balle rebondit aussi sur les bords : l'echange ne s'interrompt jamais, meme
// quand une raquette n'est pas au rendez-vous.
//
// Inversion sur le bouton blanc : le canvas de fond est sous le texte, il ne
// peut donc pas se voir a travers un bouton opaque. La scene est dessinee une
// seconde fois, en vert, dans un canvas place A L'INTERIEUR du bouton, decale de
// la distance qui separe le bouton du haut de la banniere. Le bouton, qui coupe
// ce qui deborde, sert de pochoir : la balle traverse et change de couleur pile
// sur le bord de la pastille.

const BALL_SPEED = 150   // px/s
const PADDLE_SPEED = 260 // px/s — regle par simulation : 2 interceptions sur 3
const BALL_R = 10
const PADDLE_W = 7
const MARGIN = 14
const WHITE = 'oklch(0.985 0.003 150)'
const GREEN = 'oklch(0.395 0.112 155)'

export function Hero({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).hero
  const ref = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLCanvasElement>(null)
  const holeRef = useRef<HTMLCanvasElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    const section = ref.current
    const bg = bgRef.current
    const hole = holeRef.current
    const button = buttonRef.current
    const bgCtx = bg?.getContext('2d')
    const holeCtx = hole?.getContext('2d')
    if (!section || !bg || !hole || !button || !bgCtx || !holeCtx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let offsetX = 0
    let offsetY = 0
    let raf: number | null = null
    let last = 0
    let sinceMeasure = 0
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

    // Position du bouton dans le repere de la banniere. Recalculee au
    // redimensionnement et deux fois par seconde : une police qui finit de
    // charger ou un texte qui passe sur deux lignes deplace la pastille.
    function measureHole() {
      const heroBox = section!.getBoundingClientRect()
      const buttonBox = button!.getBoundingClientRect()
      offsetX = heroBox.left - buttonBox.left
      offsetY = heroBox.top - buttonBox.top

      const bw = Math.max(buttonBox.width, 1)
      const bh = Math.max(buttonBox.height, 1)
      hole!.width = Math.round(bw * dpr)
      hole!.height = Math.round(bh * dpr)
      holeCtx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function layout() {
      const rect = bg!.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(rect.width, 1)
      h = Math.max(rect.height, 1)
      bg!.width = Math.round(w * dpr)
      bg!.height = Math.round(h * dpr)
      bgCtx!.setTransform(dpr, 0, 0, dpr, 0, 0)

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

      measureHole()
    }

    // Une seule description de la scene, peinte dans les deux canvas : en blanc
    // sur le vert, en vert dans la fenetre du bouton. Le decalage aligne les
    // deux reperes, la balle reste donc une seule et meme balle.
    function paint(ctx: CanvasRenderingContext2D, color: string, dx: number, dy: number) {
      ctx.save()
      ctx.translate(dx, dy)

      ctx.strokeStyle = color
      ctx.globalAlpha = 0.22
      ctx.lineWidth = 2
      ctx.setLineDash([7, 13])
      ctx.beginPath()
      ctx.moveTo(w / 2, 0)
      ctx.lineTo(w / 2, h)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.globalAlpha = 1

      ctx.fillStyle = color
      ctx.fillRect(MARGIN, pads[0].y - pads[0].height / 2, PADDLE_W, pads[0].height)
      ctx.fillRect(w - MARGIN - PADDLE_W, pads[1].y - pads[1].height / 2, PADDLE_W, pads[1].height)

      // La balle est une loupe, choisie le 19/08 contre le logo Google et un G
      // typographique : elle dit la recherche sans emprunter une marque, et son
      // trait reste lisible en mouvement la ou quatre couleurs se brouillent.
      ctx.save()
      ctx.translate(ball.x, ball.y)
      ctx.strokeStyle = color
      ctx.lineWidth = Math.max(2, BALL_R * 0.28)
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.arc(-BALL_R * 0.18, -BALL_R * 0.18, BALL_R * 0.62, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(BALL_R * 0.26, BALL_R * 0.26)
      ctx.lineTo(BALL_R * 0.78, BALL_R * 0.78)
      ctx.stroke()
      ctx.restore()

      ctx.restore()
    }

    function draw() {
      bgCtx!.clearRect(0, 0, w, h)
      paint(bgCtx!, WHITE, 0, 0)

      holeCtx!.clearRect(0, 0, hole!.width, hole!.height)
      paint(holeCtx!, GREEN, offsetX, offsetY)
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

      sinceMeasure += dt
      if (sinceMeasure > 0.5) {
        sinceMeasure = 0
        measureHole()
      }

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
    observer.observe(bg)

    if (!reduced) play()

    return () => {
      pause()
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

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
      <canvas
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
      />

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
            {/* Boutons inverses : le vert est passe en fond, l'appel devient donc
                blanc sur vert. `overflow-hidden` fait de la pastille le pochoir
                qui decoupe la balle verte. */}
            <a
              ref={buttonRef}
              href={PHONE_TEL}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full font-bold"
              style={{
                backgroundColor: 'var(--on-brand)',
                color: 'var(--brand-deep)',
                padding: '0.9rem 1.6rem',
                boxShadow: '0 2px 14px oklch(0.145 0 0 / 22%)',
              }}
            >
              <canvas ref={holeRef} aria-hidden className="pointer-events-none absolute inset-0" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <Phone size={16} aria-hidden />
                {d.ctaCall}
              </span>
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
