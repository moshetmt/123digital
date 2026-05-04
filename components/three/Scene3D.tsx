'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Wireframe material ────────────────────────────────────────────────────────

function WireMat({ opacity = 0.55 }: { opacity?: number }) {
  return <meshBasicMaterial wireframe color="#ffffff" opacity={opacity} transparent />
}

// ── Shape: Monitor ────────────────────────────────────────────────────────────

function Monitor() {
  return (
    <group>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[2.3, 1.45, 0.08]} />
        <WireMat />
      </mesh>
      <mesh position={[0, 0.42, 0.06]}>
        <boxGeometry args={[2.0, 1.18, 0.01]} />
        <WireMat opacity={0.22} />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.11, 0.44, 0.08]} />
        <WireMat />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[0.95, 0.075, 0.48]} />
        <WireMat />
      </mesh>
    </group>
  )
}

// ── Shape: Bar chart ──────────────────────────────────────────────────────────

function BarChart() {
  const bars = [0.5, 0.85, 0.62, 1.22, 0.95, 0.72, 1.35]
  const bw = 0.21
  const gap = 0.1
  const total = bars.length * (bw + gap) - gap
  return (
    <group>
      {bars.map((h, i) => (
        <mesh key={i} position={[i * (bw + gap) - total / 2 + bw / 2, h / 2 - 0.7, 0]}>
          <boxGeometry args={[bw, h, 0.15]} />
          <WireMat />
        </mesh>
      ))}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[total + 0.3, 0.025, 0.025]} />
        <WireMat opacity={0.35} />
      </mesh>
      <mesh position={[-total / 2 - 0.1, 0.05, 0]}>
        <boxGeometry args={[0.025, 1.55, 0.025]} />
        <WireMat opacity={0.35} />
      </mesh>
    </group>
  )
}

// ── Shape: Gear ───────────────────────────────────────────────────────────────

function Gear() {
  const teeth = 12
  const r = 0.78
  return (
    <group>
      <mesh>
        <torusGeometry args={[r, 0.07, 6, 40]} />
        <WireMat />
      </mesh>
      <mesh>
        <torusGeometry args={[0.26, 0.055, 6, 20]} />
        <WireMat />
      </mesh>
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i / teeth) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * (r + 0.14), Math.sin(a) * (r + 0.14), 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.22, 0.14, 0.07]} />
            <WireMat />
          </mesh>
        )
      })}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 4) * Math.PI * 2]}>
          <boxGeometry args={[r * 1.6, 0.04, 0.04]} />
          <WireMat opacity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

// ── Shape: Diamond ────────────────────────────────────────────────────────────

function Diamond() {
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <WireMat />
      </mesh>
      <mesh scale={0.52} rotation={[0.4, 0.4, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <WireMat opacity={0.2} />
      </mesh>
    </group>
  )
}

// ── Shape: Rocket ─────────────────────────────────────────────────────────────

function Rocket() {
  return (
    <group rotation={[0, 0, 0.12]}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 1.65, 8]} />
        <WireMat />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <coneGeometry args={[0.32, 0.82, 8]} />
        <WireMat />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <coneGeometry args={[0.22, 0.36, 8]} />
        <WireMat />
      </mesh>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.2, -0.44, Math.sin(a) * 0.2]} rotation={[0, a, 0.15]}>
            <boxGeometry args={[0.05, 0.56, 0.4]} />
            <WireMat />
          </mesh>
        )
      })}
    </group>
  )
}

// ── Section config ─────────────────────────────────────────────────────────────

type ShapeId = 'monitor' | 'barchart' | 'gear' | 'diamond' | 'rocket'

export const SECTION_IDS = [
  'section-hero',
  'section-services',
  'section-process',
  'section-portfolio',
  'section-cta',
] as const

// Hero: centered and LARGE — like Apple showing the product
// Others: shifted to the side, smaller
const SECTIONS: Array<{ shape: ShapeId; x: number; y: number; scale: number }> = [
  { shape: 'monitor',  x:  0.0, y: -0.2, scale: 1.8 },
  { shape: 'barchart', x: -4.2, y:  0.0, scale: 1.15 },
  { shape: 'gear',     x:  4.2, y:  0.0, scale: 1.15 },
  { shape: 'diamond',  x: -4.2, y:  0.2, scale: 1.2 },
  { shape: 'rocket',   x:  3.0, y: -0.2, scale: 1.05 },
]

// ── Scene content ─────────────────────────────────────────────────────────────

function SceneContent({
  mouseX,
  mouseY,
  sectionIdx,
}: {
  mouseX: number
  mouseY: number
  sectionIdx: number
}) {
  const outerRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)

  const [shape, setShape] = useState<ShapeId>('monitor')
  const targetX = useRef(0)
  const targetY = useRef(-0.2)
  const targetScale = useRef(1.8)
  const currentScale = useRef(1.8)

  const phase = useRef<'idle' | 'out' | 'in'>('idle')
  const progress = useRef(0)
  const pending = useRef({ shape: 'monitor' as ShapeId, x: 0, y: -0.2, scale: 1.8 })

  useEffect(() => {
    const cfg = SECTIONS[sectionIdx] ?? SECTIONS[0]
    if (cfg.shape !== shape) {
      pending.current = cfg
      if (phase.current === 'idle') {
        phase.current = 'out'
        progress.current = 0
      }
    } else {
      targetX.current = cfg.x
      targetY.current = cfg.y
      targetScale.current = cfg.scale
    }
  }, [sectionIdx, shape])

  useFrame((_, delta) => {
    if (!outerRef.current || !innerRef.current) return

    outerRef.current.rotation.y += delta * 0.28

    outerRef.current.position.x += (targetX.current - outerRef.current.position.x) * 0.04
    outerRef.current.position.y += (targetY.current - outerRef.current.position.y) * 0.04

    innerRef.current.rotation.x += (mouseY * 0.5 - innerRef.current.rotation.x) * 0.055
    innerRef.current.rotation.y += (mouseX * 0.4 - innerRef.current.rotation.y) * 0.055

    if (phase.current === 'out') {
      progress.current = Math.min(progress.current + delta * 3.5, 1)
      currentScale.current += (0 - currentScale.current) * 0.12
      outerRef.current.scale.setScalar(Math.max(currentScale.current, 0))
      if (progress.current >= 1) {
        setShape(pending.current.shape)
        targetX.current = pending.current.x
        targetY.current = pending.current.y
        targetScale.current = pending.current.scale
        phase.current = 'in'
        progress.current = 0
        currentScale.current = 0
      }
    } else if (phase.current === 'in') {
      progress.current = Math.min(progress.current + delta * 2.2, 1)
      currentScale.current += (targetScale.current - currentScale.current) * 0.1
      outerRef.current.scale.setScalar(currentScale.current)
      if (progress.current >= 1) phase.current = 'idle'
    } else {
      currentScale.current += (targetScale.current - currentScale.current) * 0.04
      outerRef.current.scale.setScalar(currentScale.current)
    }
  })

  return (
    <group ref={outerRef} position={[0, -0.2, 0]} scale={1.8}>
      <group ref={innerRef}>
        {shape === 'monitor'  && <Monitor />}
        {shape === 'barchart' && <BarChart />}
        {shape === 'gear'     && <Gear />}
        {shape === 'diamond'  && <Diamond />}
        {shape === 'rocket'   && <Rocket />}
      </group>
    </group>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function Scene3D() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [sectionIdx, setSectionIdx] = useState(0)

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2)
      setMouseY((e.clientY / window.innerHeight - 0.5) * -2)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTION_IDS.forEach((id, idx) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSectionIdx(idx) },
        { threshold: 0.3 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent mouseX={mouseX} mouseY={mouseY} sectionIdx={sectionIdx} />
      </Canvas>
    </div>
  )
}
