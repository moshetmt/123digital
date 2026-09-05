'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { t, type Locale } from '@/lib/i18n'

// ── CountUp ───────────────────────────────────────────────────────────────────

function CountUp({ prefix = '', value, suffix = '', duration = 1600 }: { prefix?: string; value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, duration])

  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

interface Metric { prefix: string; value: number; suffix: string; caption: string }

function getMetrics(lang: 'fr' | 'en'): Metric[] {
  // Clim69 n'a plus de chiffre ici : le client refuse que ses montants soient
  // publics. Son resultat reste decrit sans montant dans data/portfolio.ts.
  if (lang === 'en') return [
    { prefix: '+', value: 180, suffix: '%', caption: 'local visibility in 5 months (Rhône Déconstruction)' },
    { prefix: '+', value: 240, suffix: '%', caption: 'organic traffic (A+ Audition, Cannes)' },
    { prefix: '',  value: 50,  suffix: '+', caption: 'businesses supported since 2017' },
  ]
  return [
    { prefix: '+', value: 180, suffix: '%', caption: 'de visibilité locale en 5 mois (Rhône Déconstruction)' },
    { prefix: '+', value: 240, suffix: '%', caption: 'de trafic organique (A+ Audition, Cannes)' },
    { prefix: '',  value: 50,  suffix: '+', caption: 'entreprises accompagnées depuis 2017' },
  ]
}

export function Results({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).results
  const metrics = getMetrics(lang)

  return (
    <section
      id="resultats"
      style={{ backgroundColor: 'var(--dark)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
      aria-label={d.label}
    >
      <div className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-center">
        {metrics.map((m, i) => (
          /* Trois chiffres sur une grille a 2 colonnes : le dernier prend toute
             la largeur pour ne pas rester seul dans un demi-rang. */
          <div
            key={i}
            className={i === metrics.length - 1 ? 'col-span-2 lg:col-span-1' : undefined}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)',
                letterSpacing: '-0.02em',
                /* Gradation des 3 tons du logo, comme les barres */
                color: `var(--vert-${[3, 2, 1, 2][i % 4]})`,
              }}
            >
              <CountUp prefix={m.prefix} value={m.value} suffix={m.suffix} />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--cream-2)', lineHeight: 1.45, marginTop: '0.4rem' }}>
              {m.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
