'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: string
  label: string
  duration?: number
}

function parseNumeric(raw: string): { prefix: string; num: number; suffix: string } | null {
  // Matches patterns like: "60+", "8 ans", "94%", "3–6 mois", "×3,5", "+150%", "3,5×"
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
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
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
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * num
      setDisplayed(formatNum(current, suffix))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [started, parsed, duration])

  if (!parsed) {
    return (
      <div ref={ref} className="text-center">
        <div
          className="font-display font-normal mb-2"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#00FF87', lineHeight: 1 }}
        >
          {value}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'rgba(225,224,204,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {label}
        </div>
      </div>
    )
  }

  const { prefix, suffix } = parsed

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-normal mb-2"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#00FF87', lineHeight: 1 }}
      >
        {prefix}{displayed}{suffix}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'rgba(225,224,204,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}
