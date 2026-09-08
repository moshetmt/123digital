import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BASE_URL, personSchema, breadcrumbSchema } from '@/lib/schema'
import { languesPour } from '@/data/hreflang'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'À propos · Maurice Timsit, expert digital Lyon',
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
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', lineHeight: 1.65, maxWidth: '62ch', color: 'var(--ink-2)' }}>
          Basé à Lyon, j&apos;accompagne des entreprises de la métropole et de toute la France.
          Mon approche : comprendre votre activité avant de toucher au digital.
        </p>
      </PageBanner>

      {/* Portrait + bio courte */}
      <section className="bg-background" style={{ padding: '5rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-14 items-center">
          <div className="rounded overflow-hidden" style={{ border: '1px solid var(--line)' }}>
            <Image
              src="/images/maurice-timsit-portrait.jpg"
              alt="Maurice Timsit, consultant digital à Lyon"
              width={1000}
              height={1250}
              sizes="(max-width: 768px) 100vw, 340px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div>
            <h2 className="font-display font-extrabold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              En deux mots
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
              J&apos;ai commencé par vendre du référencement à des commerçants qui ne voyaient pas
              l&apos;intérêt d&apos;un site. Huit ans plus tard, je fais toujours le même métier,
              avec une conviction simple : un site qui ne fait pas sonner le téléphone ne sert à rien.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
              Je travaille seul sur vos dossiers. Pas de commercial qui promet, pas de junior qui
              exécute. Vous m&apos;avez au téléphone, et c&apos;est moi qui touche à votre site,
              à vos campagnes et à vos statistiques.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              Basé à Lyon, j&apos;accompagne surtout des artisans, des commerces et des PME de la
              région, et quelques clients ailleurs en France.
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-extrabold mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Mon approche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {values.map((v) => (
              <div key={v.title} className="rounded p-7" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
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
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>
            {expertise.join(' · ')}
          </p>
        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
