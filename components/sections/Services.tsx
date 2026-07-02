'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getServices } from '@/data/services'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Detailed bullet items per service
const serviceItemsFR: Record<string, string[]> = {
  'creation-site-web':        ['Site vitrine', 'E-commerce', 'Landing page conversion', 'Responsive mobile-first'],
  'seo':                      ['Audit technique', 'Optimisation contenu', 'Netlinking', 'SEO IA / SGE ready'],
  'publicite-en-ligne':       ['Google Ads', 'Meta Ads', 'Retargeting', 'Tracking & attribution'],
  'branding':                 ['Identité visuelle', 'Positionnement', 'Copywriting', 'Charte graphique'],
  'community-management':     ['Stratégie réseaux sociaux', 'Création de contenu', 'Gestion des comptes', 'Reporting mensuel'],
  'automatisation-marketing': ['Emailing & funnels', 'CRM setup', 'GA4 & dashboards', 'Maintenance & hébergement'],
}

const serviceItemsEN: Record<string, string[]> = {
  'creation-site-web':        ['Showcase site', 'E-commerce', 'Conversion landing page', 'Mobile-first responsive'],
  'seo':                      ['Technical audit', 'Content optimisation', 'Link building', 'AI / SGE ready'],
  'publicite-en-ligne':       ['Google Ads', 'Meta Ads', 'Retargeting', 'Tracking & attribution'],
  'branding':                 ['Visual identity', 'Positioning', 'Copywriting', 'Brand guidelines'],
  'community-management':     ['Social media strategy', 'Content creation', 'Account management', 'Monthly reporting'],
  'automatisation-marketing': ['Email & funnels', 'CRM setup', 'GA4 & dashboards', 'Maintenance & hosting'],
}

function getServiceItems(lang: 'fr' | 'en'): Record<string, string[]> {
  return lang === 'en' ? serviceItemsEN : serviceItemsFR
}

// Italic accent pull-up — Fraunces
function ItalicPullUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const words = text.split(' ')
  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.18em', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: PULL_EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Word pull-up
function WordPullUp({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: i < text.split(' ').length - 1 ? '0.18em' : 0 }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: PULL_EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Service card
function ServiceCard({ service, index, items }: { service: import('@/data/services').ServiceData; index: number; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 0 1px rgba(0,255,135,0.14), 0 28px 56px rgba(0,0,0,0.55)',
      }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      className="rounded-2xl overflow-hidden relative"
      style={{ backgroundColor: '#212121', willChange: 'transform', cursor: 'default' }}
    >
      {/* Liquid glass glow — visible on hover via parent whileHover cascade */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,255,135,0.07) 0%, transparent 65%)',
        }}
        aria-hidden
      />
      <div
        className="relative flex flex-col gap-4"
        style={{ padding: '1.75rem', minHeight: '320px' }}
      >
        {/* Number */}
        <div
          className="text-xs font-bold tracking-widest"
          style={{ color: 'rgba(225,224,204,0.4)', letterSpacing: '0.1em' }}
        >
          {num}
        </div>

        {/* Title */}
        <h3
          className="font-display font-normal leading-tight"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            letterSpacing: '-0.02em',
            color: '#E1E0CC',
            minHeight: '3em',
          }}
        >
          {service.title}
        </h3>

        {/* Bullet list with green check circles */}
        <ul className="flex flex-col gap-2 flex-1" role="list">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5"
              style={{ color: '#9ca3af', fontSize: '0.82rem' }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,255,135,0.12)',
                  color: '#00FF87',
                }}
                aria-hidden
              >
                {/* Inline check SVG to avoid import issues */}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Learn more link */}
        <Link
          href={service.href}
          className="group inline-flex items-center gap-1.5 font-bold text-sm mt-2 transition-all duration-300 hover:gap-2.5 w-fit"
          style={{ color: '#E1E0CC', fontSize: '0.8rem' }}
        >
          En savoir plus
          <span
            className="inline-flex transition-transform duration-300 group-hover:rotate-0"
            style={{ transform: 'rotate(-45deg)' }}
            aria-hidden
          >
            <ArrowRight size={12} />
          </span>
        </Link>
      </div>
    </motion.div>
  )
}


export function Services({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).services
  const services = getServices(lang)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="section-services"
      aria-labelledby="services-heading"
      className="relative bg-black"
      style={{ padding: '7rem 1.5rem 6rem', minHeight: '100vh' }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 bg-noise pointer-events-none"
        aria-hidden
        style={{ opacity: 0.15 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl" ref={ref}>

        {/* Eyebrow with green dot */}
        <div
          className="flex items-center gap-2 mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: '#00FF87' }}
            aria-hidden
          />
          {d.label}
        </div>

        {/* Heading */}
        <h2
          id="services-heading"
          className="font-display font-normal mb-16"
          style={{
            fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '38ch',
          }}
        >
          <WordPullUp
            text={lang === 'en' ? 'A complete digital growth' : 'Un système complet de croissance'}
            delay={0.05}
            style={{ color: '#E1E0CC' }}
          />
          {' '}
          <ItalicPullUp text={lang === 'en' ? 'system.' : 'digitale.'} delay={0.45} />
          {' '}
          <WordPullUp
            text={lang === 'en' ? 'Everything you need. One' : 'Tout ce dont vous avez besoin. Un seul'}
            delay={0.5}
            style={{ color: '#E1E0CC' }}
          />
          {' '}
          <ItalicPullUp text="expert." delay={0.9} />
        </h2>

        {/* Cards grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          <style>{`
            @media (max-width: 980px) { #services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 640px) { #services-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div
            id="services-grid"
            className="col-span-3 grid gap-4"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} items={getServiceItems(lang)[service.id] ?? []} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 sm:mt-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full font-medium text-sm transition-all duration-300 hover:gap-3"
            style={{
              backgroundColor: '#DEDBC8',
              color: '#000',
              padding: '0.5rem 0.5rem 0.5rem 1.5rem',
            }}
          >
            {lang === 'en' ? 'Free audit — no cost' : "Audit gratuit — c'est gratuit"}
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
          <p style={{ fontSize: '0.78rem', color: 'rgba(225,224,204,0.4)' }}>
            {lang === 'en' ? 'Reply within 24h · No commitment · 30 min' : 'Réponse sous 24h · Sans engagement · 30 min'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
