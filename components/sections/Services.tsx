'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { getServices, type ServiceData } from '@/data/services'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface CardCopy { shortDesc: string; chips: string[] }

const cardCopyFR: Record<string, CardCopy> = {
  'seo':                      { shortDesc: 'Positionner votre entreprise en tête des résultats Google, là où vos clients cherchent.', chips: ['Google', 'Pages locales', 'Avis clients'] },
  'publicite-en-ligne':       { shortDesc: 'Campagnes Google Ads et Meta Ads pilotées au retour sur investissement, pas au clic.', chips: ['Google Ads', 'Meta Ads', 'ROI mesuré'] },
  'community-management':     { shortDesc: 'Vos réseaux sociaux gérés proprement pour bâtir une audience fidèle et locale.', chips: ['Instagram', 'Facebook', 'LinkedIn'] },
  'creation-site-web':        { shortDesc: "Des sites rapides, clairs, pensés pour qu'on vous appelle, pas pour faire joli.", chips: ['Devis en ligne', "Mobile d'abord", 'Rapide'] },
  'branding':                 { shortDesc: 'Logo, couleurs, supports : une image professionnelle et cohérente qui inspire confiance.', chips: ['Logo', 'Charte', 'Supports'] },
  'automatisation-marketing': { shortDesc: 'Vos demandes de devis rangées, suivies et relancées automatiquement. Rien ne se perd.', chips: ['Suivi des leads', 'Relances', 'IA'] },
}

const cardCopyEN: Record<string, CardCopy> = {
  'seo':                      { shortDesc: 'Rank your business at the top of Google results, right where your customers search.', chips: ['Google', 'Local pages', 'Reviews'] },
  'publicite-en-ligne':       { shortDesc: 'Google Ads and Meta Ads campaigns steered by return on investment, not by clicks.', chips: ['Google Ads', 'Meta Ads', 'ROI tracked'] },
  'community-management':     { shortDesc: 'Your social channels managed properly to build a loyal, local audience.', chips: ['Instagram', 'Facebook', 'LinkedIn'] },
  'creation-site-web':        { shortDesc: 'Fast, clear websites built to make the phone ring, not just to look nice.', chips: ['Online quote', 'Mobile first', 'Fast'] },
  'branding':                 { shortDesc: 'Logo, colours, materials: a professional, consistent image that builds trust.', chips: ['Logo', 'Guidelines', 'Materials'] },
  'automatisation-marketing': { shortDesc: 'Your quote requests sorted, tracked and followed up automatically. Nothing gets lost.', chips: ['Lead tracking', 'Follow-ups', 'AI'] },
}

// Ordre des 2 familles, dans l'ordre de la maquette
const ATTRACT_IDS = ['seo', 'publicite-en-ligne', 'community-management']
const CONVERT_IDS = ['creation-site-web', 'branding', 'automatisation-marketing']

function ServiceCard({ service, copy, index, learnMoreLabel }: { service: ServiceData; copy: CardCopy; index: number; learnMoreLabel: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="rounded-2xl flex flex-col"
      style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)', padding: 'clamp(0.85rem, 3vw, 1.4rem)' }}
    >
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(0.92rem, 3.4vw, 1.05rem)', color: 'var(--ink)', marginBottom: '0.3rem', lineHeight: 1.2 }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 'clamp(0.78rem, 2.6vw, 0.87rem)', color: 'var(--ink-2)', lineHeight: 1.45, marginBottom: '0.7rem', flex: 1 }}>
        {copy.shortDesc}
      </p>
      {/* Les pastilles disparaissent sous 640 px : a 2 colonnes sur telephone
          elles s'empilaient et doublaient la hauteur de chaque carte. */}
      <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
        {copy.chips.map((chip) => (
          <span
            key={chip}
            style={{ backgroundColor: 'var(--surface-3)', color: 'var(--ink-2)', borderRadius: 999, padding: '0.25rem 0.65rem', fontSize: '0.72rem', fontWeight: 600 }}
          >
            {chip}
          </span>
        ))}
      </div>
      <Link
        href={service.href}
        className="font-bold w-fit"
        style={{ color: 'var(--brand-strong)', fontSize: 'clamp(0.78rem, 2.6vw, 0.875rem)' }}
      >
        {learnMoreLabel} →
      </Link>
    </motion.div>
  )
}

function ServiceFamily({ title, ids, services, copy, learnMoreLabel, offset }: {
  title: string; ids: string[]; services: ServiceData[]; copy: Record<string, CardCopy>; learnMoreLabel: string; offset: number
}) {
  const items = ids
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is ServiceData => Boolean(s))

  return (
    <div className="mb-8 last:mb-0">
      <p style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', marginBottom: '0.9rem' }}>
        {title}
      </p>
      {/* 2 colonnes des le telephone : en 1 colonne la section faisait 2 ecrans. */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {items.map((service, i) => (
          <ServiceCard key={service.id} service={service} copy={copy[service.id]} index={offset + i} learnMoreLabel={learnMoreLabel} />
        ))}
      </div>
    </div>
  )
}

export function Services({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).services
  const services = getServices(lang)
  const copy = lang === 'en' ? cardCopyEN : cardCopyFR
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="section-services"
      aria-labelledby="services-heading"
      style={{ backgroundColor: 'var(--surface)', padding: 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem' }}
    >
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
          style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
        >
          {d.label}
        </motion.div>

        <h2
          id="services-heading"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            marginBottom: '0.5rem',
          }}
        >
          {d.heading}
        </h2>
        <p style={{ color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: '2.5rem' }}>{d.sub}</p>

        <ServiceFamily title={d.familyAttract} ids={ATTRACT_IDS} services={services} copy={copy} learnMoreLabel={d.learnMore} offset={0} />
        <ServiceFamily title={d.familyConvert} ids={CONVERT_IDS} services={services} copy={copy} learnMoreLabel={d.learnMore} offset={3} />
      </div>
    </section>
  )
}
