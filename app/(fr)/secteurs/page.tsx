import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UtensilsCrossed, Stethoscope, Hammer, ShoppingBag, Scale,
  Home, Wrench, Sparkles, BarChart3, Truck, type LucideIcon,
} from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { secteurs } from '@/data/secteurs'
import { CTA } from '@/components/sections/CTA'

// Correspondance nom d'icone -> composant lucide (catalogue icones.js.org).
// Regle du proprietaire : jamais d'emoji dans l'interface.
const ICONES: Record<string, LucideIcon> = {
  UtensilsCrossed, Stethoscope, Hammer, ShoppingBag, Scale,
  Home, Wrench, Sparkles, BarChart3, Truck,
}

function SecteurIcon({ name }: { name: string }) {
  const Icon = ICONES[name] ?? Sparkles
  return <Icon size={26} strokeWidth={1.5} style={{ color: 'var(--brand)', flexShrink: 0 }} aria-hidden />
}

export const metadata: Metadata = {
  title: 'Croissance digitale par secteur d\'activité · PME & TPE | 123 Digital',
  description:
    'Stratégies digitales sur mesure pour chaque secteur : restaurant, artisan BTP, cabinet médical, commerce, agence immobilière et plus. Expert consultant digital Lyon.',
  alternates: { canonical: `${BASE_URL}/secteurs` },
  openGraph: {
    title: 'Croissance digitale par secteur d\'activité | 123 Digital',
    description:
      'Stratégies digitales adaptées à chaque métier. Maurice Timsit, consultant digital à Lyon, accompagne les PME de tous secteurs.',
    url: `${BASE_URL}/secteurs`,
  },
}

export default function SecteursPage() {
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Secteurs d\'activité', path: '/secteurs' },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        icone="store"
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: "Secteurs d'activité" },
            ]}
          />
        }
        title="Votre secteur. Sa stratégie digitale."
        highlight="Sa stratégie digitale."
        sub="Chaque secteur a ses codes, ses clients et ses leviers de croissance. Pas de solution générique : j&apos;adapte chaque stratégie aux réalités de votre métier."
        actions={<BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>}
      />

      {/* Grille secteurs */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {secteurs.map((secteur) => (
              <Link
                key={secteur.slug}
                href={`/secteurs/${secteur.slug}`}
                className="group block rounded"
                style={{ backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: 'clamp(1.1rem, 3.5vw, 1.75rem)' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <SecteurIcon name={secteur.icon} />
                  <div>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--brand)',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                      }}
                    >
                      {secteur.nomPluriel}
                    </div>
                    <h2
                      className="font-display font-extrabold group-hover:text-[var(--brand)] transition-colors"
                      style={{ fontSize: '1.3rem', color: 'var(--ink)', lineHeight: 1.2 }}
                    >
                      {secteur.nom}
                    </h2>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                  {secteur.description}
                </p>

                <p style={{ fontSize: '0.72rem', color: 'var(--ink-2)', marginBottom: '1rem' }}>
                  {secteur.solutions.slice(0, 2).join(' · ')}
                </p>

                <div
                  className="btn-contour group-hover:bg-[var(--surface-2)]"
                >
                  Voir la stratégie →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
