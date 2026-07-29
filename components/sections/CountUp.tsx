'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CountUpProps {
  value: string
  label: string
  duration?: number
}

function parseNumeric(raw: string): { prefix: string; num: number; suffix: string } | null {
  const m = raw.match(/^([+×]?)(\d+(?:[,\.]\d+)?)(.*)$/)
  if (!m) return null
  return {
    prefix: m[1] ?? '',
    num: parseFloat(m[2].replace(',', '.')),
    suffix: m[3] ?? '',
  }
}

function formatNum(n: number, suffix: string): string {
  if (suffix.includes(',') || String(n).includes('.')) {
    return n.toFixed(1).replace('.', ',')
  }
  return String(Math.round(n))
}

export function CountUp({ value, label, duration = 1800 }: CountUpProps) {
  const [displayed, setDisplayed] = useState('0')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const parsed = parseNumeric(value)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.4 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || !parsed) return
    const { num, suffix } = parsed
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(formatNum(eased * num, suffix))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [started, parsed, duration])

  const numberEl = (
    <div
      className="font-display font-normal mb-2"
      style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--brand)', lineHeight: 1 }}
    >
      {parsed ? `${parsed.prefix}${displayed}${parsed.suffix}` : value}
    </div>
  )

  const bar = (
    <div
      style={{
        position: 'relative',
        height: 2,
        borderRadius: 1,
        backgroundColor: 'var(--brand-tint)',
        overflow: 'hidden',
        marginTop: '0.85rem',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--brand)',
          transformOrigin: 'left',
          willChange: 'transform',
        }}
        initial={{ scaleX: 0 }}
        animate={started ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )

  return (
    <div ref={ref} className="text-center">
      {numberEl}
      <div
        style={{
          fontSize: '0.78rem',
          color: 'var(--ink-2)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      {bar}
    </div>
  )
}
