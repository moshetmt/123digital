'use client'

import { useEffect, useRef } from 'react'
import { ICONES, type NomIcone } from '@/lib/icones-pong'

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
//      vitesse et son moment de depart separement, aucune ne suit l'autre ;
//   4. le decor tourne partout, y compris sur un appareil regle sur « reduire
//      les animations ». Decision du 20/08, apres l'avoir vu fige sur le poste
//      de l'operateur : c'est un decor de fond, personne ne le lit, et le
//      reglage est souvent mis pour la vitesse et non pour le confort. Ne pas
//      remettre de garde prefers-reduced-motion ici. Le canvas continue de
//      s'arreter hors ecran et onglet cache, pour la batterie.
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
// #FAFBFA, l'equivalent exact de --on-brand. Ecrit en hexadecimal et non en
// oklch : le canvas des Safari anterieurs a 16.4 et des navigateurs Android
// anterieurs a Chromium 111 refuse oklch en silence et garde le noir par
// defaut, si bien que le Pong disparaissait sous le voile vert de la banniere.
// Le CSS, lui, accepte oklch depuis bien plus longtemps — d'ou une panne qui ne
// touchait que les vieux telephones. Ne pas repasser cette valeur en oklch.
const WHITE = '#FAFBFA'

// Rejoue une icone lucide dans le canvas. Les icones sont decrites dans un
// carre de 24 sur 24 avec un trait de 2 : on met l'echelle a la taille de la
// balle et le trait suit.
function dessinerIcone(ctx: CanvasRenderingContext2D, nom: NomIcone, rayon: number) {
  const echelle = (rayon * 2) / 24
  ctx.save()
  ctx.scale(echelle, echelle)
  ctx.translate(-12, -12)
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  for (const noeud of ICONES[nom]) {
    if (noeud.t === 'path') {
      ctx.stroke(new Path2D(String(noeud.d)))
    } else if (noeud.t === 'circle') {
      ctx.beginPath()
      ctx.arc(Number(noeud.cx), Number(noeud.cy), Number(noeud.r), 0, Math.PI * 2)
      // Les pastilles pleines de lucide portent fill="currentColor".
      if (noeud.fill) ctx.fill()
      else ctx.stroke()
    } else if (noeud.t === 'line') {
      ctx.beginPath()
      ctx.moveTo(Number(noeud.x1), Number(noeud.y1))
      ctx.lineTo(Number(noeud.x2), Number(noeud.y2))
      ctx.stroke()
    } else if (noeud.t === 'rect') {
      ctx.beginPath()
      ctx.roundRect(
        Number(noeud.x),
        Number(noeud.y),
        Number(noeud.width),
        Number(noeud.height),
        Number(noeud.rx ?? 0),
      )
      ctx.stroke()
    } else if (noeud.t === 'polyline' || noeud.t === 'polygon') {
      const points = String(noeud.points)
        .trim()
        .split(/\s+/)
        .map(Number)
      ctx.beginPath()
      for (let i = 0; i < points.length; i += 2) {
        if (i === 0) ctx.moveTo(points[0], points[1])
        else ctx.lineTo(points[i], points[i + 1])
      }
      if (noeud.t === 'polygon') ctx.closePath()
      ctx.stroke()
    }
  }

  ctx.restore()
}

export function PongCanvas({
  ballRadius = 30,
  icone = 'search',
}: {
  ballRadius?: number
  icone?: NomIcone
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const R = ballRadius
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

      // La balle porte l'icone du sujet de la page : loupe pour le
      // referencement, palette pour le branding, eclair pour l'automatisation.
      ctx!.save()
      ctx!.translate(ball.x, ball.y)
      ctx!.strokeStyle = WHITE
      ctx!.fillStyle = WHITE
      dessinerIcone(ctx!, icone, R)
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
      if (raf !== null || !onScreen || document.hidden) return
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
      if (document.hidden) {
        pause()
        return
      }
      // Au retour sur l'onglet, on remesure au lieu de croire le dernier etat
      // connu de l'IntersectionObserver. Un navigateur qui n'a rien peint
      // pendant l'absence a pu laisser onScreen a faux, et play() refusait
      // alors de repartir tant que la banniere ne refranchissait pas le seuil :
      // le decor restait fige sur sa derniere image, l'onglet bien en vue.
      const rect = canvas!.getBoundingClientRect()
      onScreen = rect.bottom > 0 && rect.top < window.innerHeight
      play()
    }

    layout()
    draw()

    // ResizeObserver plutot que l'evenement resize de la fenetre : sur mobile,
    // la barre d'adresse qui se replie change la hauteur de la banniere sans
    // toujours declencher resize, et le Pong restait alors calcule sur une
    // hauteur perimee.
    const tailleObs = new ResizeObserver(onResize)
    tailleObs.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)

    const observer = new IntersectionObserver(
      (entries) => {
        // La derniere entree, pas la premiere : un defilement rapide peut
        // grouper deux franchissements de la meme cible dans un seul appel.
        onScreen = entries[entries.length - 1].isIntersecting
        if (onScreen) play()
        else pause()
      },
      { threshold: 0.1 },
    )
    observer.observe(canvas)

    play()

    return () => {
      pause()
      observer.disconnect()
      tailleObs.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ballRadius, icone])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
    />
  )
}
