'use client'

import { useEffect, useRef } from 'react'

// ── Pong de fond ──────────────────────────────────────────────────────────────
// Le decor anime des bannieres : une partie de Pong sans fin, dessinee au trait
// blanc sur le vert de marque. Aucun fichier n'est charge, le canvas reste
// transparent et laisse voir le degrade CSS de la banniere.
//
// Regles imposees par l'operateur (19/08) :
//   1. aucune trainee — on efface au lieu de repeindre ;
//   2. vitesse d'arcade, exprimee en pixels par seconde et non par image, donc
//      identique sur un ecran 60 Hz ou 120 Hz ;
//   3. les deux raquettes sont independantes — chacune tire sa destination, sa
//      vitesse et son moment de depart separement, aucune ne suit l'autre.
// La balle rebondit aussi sur les bords : l'echange ne s'interrompt jamais, meme
// quand une raquette n'est pas au rendez-vous.
//
// La balle est une loupe. L'inversion de couleur dans le bouton blanc a ete
// essayee puis retiree le 20/08 : l'operateur la trouve laide. Ne pas la
// remettre.

const BALL_SPEED = 150   // px/s
const PADDLE_SPEED = 260 // px/s — regle par simulation : 2 interceptions sur 3
const PADDLE_W = 7
const MARGIN = 14
const WHITE = 'oklch(0.985 0.003 150)'

export function PongCanvas({ ballRadius = 30 }: { ballRadius?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const R = ballRadius
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

      ctx!.strokeStyle = WHITE
      ctx!.globalAlpha = 0.22
      ctx!.lineWidth = 2
      ctx!.setLineDash([7, 13])
      ctx!.beginPath()
      ctx!.moveTo(w / 2, 0)
      ctx!.lineTo(w / 2, h)
      ctx!.stroke()
      ctx!.setLineDash([])
      ctx!.globalAlpha = 1

      ctx!.fillStyle = WHITE
      ctx!.fillRect(MARGIN, pads[0].y - pads[0].height / 2, PADDLE_W, pads[0].height)
      ctx!.fillRect(w - MARGIN - PADDLE_W, pads[1].y - pads[1].height / 2, PADDLE_W, pads[1].height)

      ctx!.save()
      ctx!.translate(ball.x, ball.y)
      ctx!.strokeStyle = WHITE
      ctx!.lineWidth = Math.max(2, R * 0.22)
      ctx!.lineCap = 'round'
      ctx!.beginPath()
      ctx!.arc(-R * 0.18, -R * 0.18, R * 0.62, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.moveTo(R * 0.26, R * 0.26)
      ctx!.lineTo(R * 0.78, R * 0.78)
      ctx!.stroke()
      ctx!.restore()
    }

    function update(dt: number) {
      ball.angle += (Math.random() - 0.5) * 0.25 * dt

      // Garde-fou : sans lui la derive aleatoire finit par rendre la course
      // verticale et la loupe fait l'ascenseur au milieu de la banniere.
      const vx = Math.cos(ball.angle)
      if (Math.abs(vx) < 0.32) {
        ball.angle = Math.atan2(Math.sin(ball.angle), vx < 0 ? -0.32 : 0.32)
      }

      ball.x += Math.cos(ball.angle) * BALL_SPEED * dt
      ball.y += Math.sin(ball.angle) * BALL_SPEED * dt

      if (ball.y < R) {
        ball.y = R
        ball.angle = -ball.angle + (Math.random() - 0.5) * 0.15
      }
      if (ball.y > h - R) {
        ball.y = h - R
        ball.angle = -ball.angle + (Math.random() - 0.5) * 0.15
      }

      const faces = [MARGIN + PADDLE_W, w - MARGIN - PADDLE_W]
      pads.forEach((p, i) => {
        const goingLeft = Math.cos(ball.angle) < 0
        const towardThis = i === 0 ? goingLeft : !goingLeft
        const inFront = Math.abs(ball.y - p.y) < p.height / 2 + R
        const reached = i === 0 ? ball.x - R < faces[0] : ball.x + R > faces[1]

        if (towardThis && reached && inFront) {
          ball.x = i === 0 ? faces[0] + R : faces[1] - R
          ball.angle = Math.PI - ball.angle + ((ball.y - p.y) / p.height) * 0.55
        }
      })

      if (ball.x < R) {
        ball.x = R
        ball.angle = Math.PI - ball.angle
      }
      if (ball.x > w - R) {
        ball.x = w - R
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
  }, [ballRadius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
    />
  )
}
