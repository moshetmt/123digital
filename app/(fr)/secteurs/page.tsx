import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UtensilsCrossed, Stethoscope, Hammer, ShoppingBag, Scale,
  Home, Wrench, Sparkles, BarChart3, Truck, type LucideIcon,
} from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { secteurs } from '@/data/secteurs'

// Correspondance nom d'icone -> composant lucide (catalogue icones.js.org).
// Regle du proprietaire : jamais d'emoji dans l'interface.
const ICONES: Record<string, LucideIcon> = {
  UtensilsCrossed, Stethoscope, Hammer, ShoppingBag, Scale,
  Home, Wrench, Sparkles, BarChart3, Truck,
}

function SecteurIcon({ name }: { name: string }) {
  const Icon = ICONES[name] ?? Sparkles
  return (
    <span
      className="grid place-items-center rounded-xl shrink-0"
      style={{ width: 42, height: 42, backgroundColor: 'var(--brand-tint)', color: 'var(--brand)' }}
    >
      <Icon size={21} aria-hidden />
    </span>
  )
}

export const metadata: Metadata = {
  title: 'Croissance digitale par secteur d\'activité — PME & TPE | 123 Digital',
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
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: "Secteurs d'activité" },
            ]}
          />
        }
        eyebrow="Expertise sectorielle"
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
                className="group block rounded-2xl"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)', padding: 'clamp(1.1rem, 3.5vw, 1.75rem)' }}
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

                <div className="flex flex-wrap gap-2 mb-4">
                  {secteur.solutions.slice(0, 2).map((sol, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.25rem 0.6rem',
                        border: '1px solid var(--line)',
                        color: 'var(--ink-2)',
                        fontSize: '0.72rem',
                      }}
                    >
                      {sol}
                    </span>
                  ))}
                </div>

                <div
                  className="group-hover:text-[var(--brand)] transition-colors"
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    color: 'var(--ink-3)',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  Voir la stratégie →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Votre secteur n&apos;est pas dans la liste ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            J&apos;accompagne les PME de tous secteurs. Prenons 30 minutes pour explorer ensemble comment développer votre activité en ligne.
          </p>
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              borderRadius: 999,
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Audit gratuit 30 min
          </Link>
        </div>
      </section>
    </>
  )
}
