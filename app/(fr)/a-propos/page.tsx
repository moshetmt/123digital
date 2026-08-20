import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BASE_URL, personSchema, breadcrumbSchema } from '@/lib/schema'
import { languesPour } from '@/data/hreflang'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'À propos — Maurice Timsit, expert digital Lyon',
  description:
    "Maurice Timsit, consultant digital Lyon spécialisé PME : SEO, site web, Google Ads. 8 ans d'expérience au service de votre croissance. Échangeons.",
  alternates: { canonical: `${BASE_URL}/a-propos`, ...languesPour('/a-propos') },
}

const expertise = [
  'SEO & référencement naturel',
  'Création de sites web performants',
  'Google Ads & Meta Ads',
  'Branding & identité visuelle',
  'Community Management',
  'Automatisation marketing (Make, n8n, HubSpot)',
  'Analytics & pilotage data (GA4)',
  'Growth hacking PME',
]

const values = [
  { title: 'Résultats avant tout', desc: 'Pas de jargon, pas de rapport de 40 pages. Des chiffres concrets : trafic, leads, chiffre d\'affaires.' },
  { title: 'Un seul interlocuteur', desc: 'Vous ne parlez pas à un account manager. Je pilote moi-même votre projet, du début à la fin.' },
  { title: 'Transparence totale', desc: 'Vous savez ce que je fais, pourquoi je le fais, et quel impact ça a. Accès complet aux outils.' },
]

export default function AProposPage() {
  return (
    <>
      <JsonLd schema={[
        personSchema(),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'À propos', path: '/a-propos' }]),
      ]} />

      <PageBanner
        icone="user-round"
        image={{ src: '/images/hero.jpg', priority: true }}
        title="Maurice Timsit, consultant digital à Lyon."
        highlight="consultant digital à Lyon."
        sub="Depuis 8 ans, j&apos;aide les PME et les entrepreneurs à construire une présence digitale qui travaille pour eux. Pas une agence, pas un junior : un expert senior qui connaît votre dossier."
        actions={
          <>
            <BannerCta href="/#contact">Discutons de votre projet</BannerCta>
            <BannerCtaLine href="https://www.linkedin.com/in/mauricetimsit/">LinkedIn</BannerCtaLine>
          </>
        }
      >
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', lineHeight: 1.65, maxWidth: '62ch', color: 'oklch(0.985 0.003 150 / 78%)' }}>
          Basé à Lyon, j&apos;accompagne des entreprises de la métropole et de toute la France.
          Mon approche : comprendre votre activité avant de toucher au digital.
        </p>
      </PageBanner>

      {/* Valeurs */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-extrabold mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Mon approche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl p-7" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-extrabold mb-8" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Expertise technique
          </h2>
          <div className="flex flex-wrap gap-2">
            {expertise.map((e) => (
              <span key={e} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--brand-tint)', color: 'var(--brand)', border: '1px solid var(--brand-line)' }}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
