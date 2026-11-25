import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getServices, type ServiceData } from '@/data/services'
import { t, type Locale } from '@/lib/i18n'

// 27/10 : textes courts pour les encarts bento (une phrase, mots-clés en pastilles).
interface CardCopy { shortDesc: string; chips: string[] }

const cardCopyFR: Record<string, CardCopy> = {
  'seo':                      { shortDesc: "Vos clients vous trouvent en tête de Google.", chips: ['Google', 'Pages locales', 'Avis clients'] },
  'publicite-en-ligne':       { shortDesc: "Chaque euro de pub se mesure en appels.", chips: ['Google Ads', 'Meta Ads', 'ROI mesuré'] },
  'community-management':     { shortDesc: "Vos réseaux vivent chaque semaine.", chips: ['Instagram', 'Facebook', 'LinkedIn'] },
  'creation-site-web':        { shortDesc: "Votre site fait sonner le téléphone.", chips: ['Devis en ligne', "Mobile d'abord", 'Rapide'] },
  'branding':                 { shortDesc: "Votre image inspire confiance au premier regard.", chips: ['Logo', 'Charte', 'Supports'] },
  'automatisation-marketing': { shortDesc: "Chaque demande est suivie et relancée.", chips: ['Suivi des leads', 'Relances', 'IA'] },
}

const cardCopyEN: Record<string, CardCopy> = {
  'seo':                      { shortDesc: "Customers find you at the top of Google.", chips: ['Google', 'Local pages', 'Reviews'] },
  'publicite-en-ligne':       { shortDesc: "Every ad euro is measured in calls.", chips: ['Google Ads', 'Meta Ads', 'ROI tracked'] },
  'community-management':     { shortDesc: "Your social channels stay alive every week.", chips: ['Instagram', 'Facebook', 'LinkedIn'] },
  'creation-site-web':        { shortDesc: "Your website makes the phone ring.", chips: ['Online quote', 'Mobile first', 'Fast'] },
  'branding':                 { shortDesc: "Your image earns trust at first glance.", chips: ['Logo', 'Guidelines', 'Materials'] },
  'automatisation-marketing': { shortDesc: "Every request is tracked and followed up.", chips: ['Lead tracking', 'Follow-ups', 'AI'] },
}

// Ordre des 2 familles, dans l'ordre de la maquette
const ATTRACT_IDS = ['seo', 'publicite-en-ligne', 'community-management']
const CONVERT_IDS = ['creation-site-web', 'branding', 'automatisation-marketing']

function ServiceCard({ service, copy, learnMoreLabel, learnMoreSuffix }: { service: ServiceData; copy: CardCopy; learnMoreLabel: string; learnMoreSuffix: string }) {
  return (
    <div
      className="rounded flex flex-col"
      style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: 'clamp(1rem, 3.5vw, 1.6rem)' }}
    >
      <div className="relative h-[120px] lg:h-[160px] w-full mb-2">
        <Image
          src={`/images/illustrations/service-${service.id}.webp`}
          alt=""
          fill
          sizes="(min-width: 1024px) 200px, 45vw"
          style={{ objectFit: 'contain', objectPosition: 'left center' }}
        />
      </div>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(1.02rem, 3.9vw, 1.3rem)', color: 'var(--ink)', marginBottom: '0.35rem', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 'clamp(0.85rem, 2.9vw, 0.98rem)', fontWeight: 500, color: 'var(--ink-2)', lineHeight: 1.35, marginBottom: '0.8rem', flex: 1 }}>
        {copy.shortDesc}
      </p>
      {/* Pastilles sur une seule ligne, jamais empilées (Moshé 27/10) : on glisse si elles débordent. */}
      <ul className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '0.3rem', WebkitMaskImage: 'linear-gradient(90deg, #000 85%, transparent)', maskImage: 'linear-gradient(90deg, #000 85%, transparent)' }}>
        {copy.chips.map((c) => (
          <li key={c} className="shrink-0 whitespace-nowrap" style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--brand-strong)', backgroundColor: 'var(--surface-3)', borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>{c}</li>
        ))}
      </ul>
      <Link
        href={service.href}
        aria-label={`${learnMoreLabel} ${learnMoreSuffix} ${service.title}`}
        className="btn-contour"
        style={{ marginTop: '0.875rem' }}
      >
        {learnMoreLabel}
        <ArrowRight size={14} aria-hidden />
      </Link>
    </div>
  )
}

function ServiceFamily({ title, ids, services, copy, learnMoreLabel, learnMoreSuffix }: {
  title: string; ids: string[]; services: ServiceData[]; copy: Record<string, CardCopy>; learnMoreLabel: string; learnMoreSuffix: string
}) {
  const items = ids
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is ServiceData => Boolean(s))

  return (
    <div className="mb-5 sm:mb-8 last:mb-0">
      <p style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', marginBottom: '0.9rem' }}>
        {title}
      </p>
      {/* 2 colonnes des le telephone : en 1 colonne la section faisait 2 ecrans. */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {items.map((service) => (
          <ServiceCard key={service.id} service={service} copy={copy[service.id]} learnMoreLabel={learnMoreLabel} learnMoreSuffix={learnMoreSuffix} />
        ))}
      </div>
    </div>
  )
}

export function Services({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).services
  const services = getServices(lang)
  const copy = lang === 'en' ? cardCopyEN : cardCopyFR
  const learnMoreSuffix = lang === 'en' ? 'about' : 'sur'

  return (
    <section
      id="section-services"
      aria-labelledby="services-heading"
      style={{ backgroundColor: 'var(--surface-3)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="flex items-center gap-2 mb-3"
          style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
        >
          {d.label}
        </div>

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
        <p style={{ color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: 'clamp(1.1rem, 4vw, 2.5rem)' }}>{d.sub}</p>

        <ServiceFamily title={d.familyAttract} ids={ATTRACT_IDS} services={services} copy={copy} learnMoreLabel={d.learnMore} learnMoreSuffix={learnMoreSuffix} />
        <ServiceFamily title={d.familyConvert} ids={CONVERT_IDS} services={services} copy={copy} learnMoreLabel={d.learnMore} learnMoreSuffix={learnMoreSuffix} />
      </div>
    </section>
  )
}
