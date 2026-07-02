'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ── Animated counter ──────────────────────────────────────────────────────────

function Counter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = Math.round(1800 / 16)
    const id = setInterval(() => {
      frame++
      setCount(Math.floor((1 - Math.pow(1 - frame / total, 3)) * target))
      if (frame >= total) { setCount(target); clearInterval(id) }
    }, 16)
    return () => clearInterval(id)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

function getStats(lang: 'fr' | 'en') {
  if (lang === 'en') return [
    { target: 50,  prefix: '+', suffix: '',  label: 'SMEs supported' },
    { target: 47,  prefix: '+', suffix: '%', label: 'avg traffic growth' },
    { target: 100, prefix: '',  suffix: '%', label: 'delivered on time' },
  ]
  return [
    { target: 50,  prefix: '+', suffix: '',  label: 'PME accompagnées' },
    { target: 47,  prefix: '+', suffix: '%', label: 'trafic moyen' },
    { target: 100, prefix: '',  suffix: '%', label: 'livrés en délais' },
  ]
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).hero
  const stats = getStats(lang)
  return (
    <section
      id="section-hero"
      className="relative bg-black"
      style={{ minHeight: '100svh', padding: 'clamp(10px, 1.5vw, 22px)' }}
      aria-label="Section hero"
    >
      {/* ── Inset rounded container ── */}
      <div
        className="relative w-full flex flex-col overflow-hidden"
        style={{
          minHeight: 'calc(100svh - clamp(20px, 3vw, 44px))',
          borderRadius: 'clamp(14px, 2vw, 30px)',
          backgroundColor: '#080705', /* fallback si la vidéo ne charge pas */
        }}
      >
        {/* ── Video background ── */}
        {/*
          ⚠️  CORS / Google Drive :
          Les fichiers Google Drive sont servis depuis drive.usercontent.google.com
          avec des headers CORS restrictifs. Le navigateur peut bloquer la lecture
          si l'origine n'est pas autorisée. Si la vidéo ne s'affiche pas :
          → Héberger sur un CDN (Cloudflare R2, AWS S3, Vercel Blob)
          → Ou utiliser un service vidéo dédié (Mux, Vimeo, Cloudflare Stream)
        */}
        <video
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          preload="auto"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* ── Dark overlay — assure la lisibilité du texte sur la vidéo ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ backgroundColor: 'rgba(0,0,0,0.52)' }}
        />

        {/* Gradient vignette — renforce haut/bas */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.72) 100%)',
          }}
        />

        {/* Noise overlay — grain cinématographique */}
        <div
          className="absolute inset-0 noise-overlay pointer-events-none"
          aria-hidden
          style={{ opacity: 0.55, mixBlendMode: 'overlay' }}
        />

        {/* ── Top-right — availability indicator ── */}
        <motion.div
          className="absolute z-10 flex items-center gap-3"
          style={{ top: '1.5rem', right: '1.75rem' }}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span
            className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase"
            style={{ color: 'rgba(225,224,204,0.55)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: '#00FF87',
                boxShadow: '0 0 8px #00FF87',
              }}
              aria-hidden
            />
            {d.badge}
          </span>
        </motion.div>

        {/* ── Spacer (cinematic atmosphere) ── */}
        <div className="flex-1 min-h-[40px]" />

        {/* ── Bottom content ── */}
        <div className="relative z-10 px-5 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-end">

            {/* Giant heading */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: PULL_EASE, delay: 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.15em', alignItems: 'inherit' }}
              >
                <h1
                  aria-label={`${d.line1} ${d.line2} — ${d.byline}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    margin: 0,
                    color: '#DEDBC8',
                  }}
                >
                  {lang === 'en' ? (
                    <>One expert. One <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>strategy</em>.</>
                  ) : (
                    <>Un expert. Une <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>stratégie</em>.</>
                  )}<br />
                  <span style={{ color: '#00FF87' }}>
                    {lang === 'en' ? (
                      <>Real <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#00FF87' }}>results</em>.</>
                    ) : (
                      <>Des <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>résultats</em>.</>
                    )}
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                    color: '#DEDBC8',
                    opacity: 0.55,
                    margin: '0.6em 0 0',
                    letterSpacing: '0.04em',
                  }}
                >
                  {lang === 'en' ? '123 Digital — ' : d.byline.split('Par M. Timsit')[0]}
                  <a
                    href="https://www.linkedin.com/in/mauricetimsit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
                  >
                    {lang === 'en' ? 'By M. Timsit' : 'Par M. Timsit'}
                  </a>
                </p>
              </motion.div>
            </div>

            {/* Right: description + CTA + stats */}
            <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 items-center lg:items-start">

              <motion.p
                className="text-sm sm:text-base leading-snug max-w-xs"
                style={{ color: 'rgba(225,224,204,0.7)', lineHeight: 1.2 }}
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: PULL_EASE }}
              >
                {d.description}
              </motion.p>

              {/* CTA pill */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: PULL_EASE }}
              >
                <Link
                  href={lang === 'en' ? '/en/audit' : '#contact'}
                  className="group inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 font-medium text-sm transition-all duration-300 hover:gap-3 w-fit"
                  style={{ backgroundColor: '#DEDBC8', color: '#000' }}
                >
                  {d.cta}
                  <span
                    className="flex items-center justify-center rounded-full w-8 h-8 transition-transform duration-300 group-hover:scale-110 shrink-0"
                    style={{ backgroundColor: '#000' }}
                  >
                    <ArrowRight
                      size={14}
                      style={{ color: '#DEDBC8', transform: 'rotate(-45deg)' }}
                      aria-hidden
                    />
                  </span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-5 sm:gap-7 flex-wrap justify-center lg:justify-start"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                {stats.map(({ target, prefix, suffix, label }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span
                      className="font-display font-bold tabular-nums text-lg sm:text-xl"
                      style={{ color: '#E1E0CC' }}
                    >
                      <Counter target={target} prefix={prefix} suffix={suffix} />
                    </span>
                    <span
                      className="text-[10px] sm:text-[11px] leading-tight"
                      style={{ color: 'rgba(225,224,204,0.4)' }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Footnote */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4 text-center lg:text-left"
            style={{
              fontSize: '0.65rem',
              color: 'rgba(225,224,204,0.38)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {d.footnote}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
