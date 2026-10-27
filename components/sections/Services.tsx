import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getServices, type ServiceData } from '@/data/services'
import { t, type Locale } from '@/lib/i18n'

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

function ServiceCard({ service, copy, learnMoreLabel, learnMoreSuffix }: { service: ServiceData; copy: CardCopy; learnMoreLabel: string; learnMoreSuffix: string }) {
  return (
    <div
      className="rounded flex flex-col"
      style={{ backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: 'clamp(0.85rem, 3vw, 1.4rem)' }}
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
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(0.92rem, 3.4vw, 1.05rem)', color: 'var(--ink)', marginBottom: '0.3rem', lineHeight: 1.2 }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 'clamp(0.78rem, 2.6vw, 0.87rem)', color: 'var(--ink-2)', lineHeight: 1.45, marginBottom: '0.7rem', flex: 1 }}>
        {copy.shortDesc}
      </p>
      <p style={{ color: 'var(--ink-2)', fontSize: '0.78rem', marginBottom: '0.7rem' }}>
        {copy.chips.join(' · ')}
      </p>
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
      style={{ backgroundColor: 'var(--surface)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
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
