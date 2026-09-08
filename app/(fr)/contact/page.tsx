import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTA } from '@/components/sections/CTA'
import { BASE_URL, breadcrumbSchema, contactPageSchema } from '@/lib/schema'
import { languesPour } from '@/data/hreflang'

export const metadata: Metadata = {
  title: 'Contact · Consultant digital Lyon | 123 Digital',
  description:
    'Contactez Maurice Timsit pour discuter de votre projet digital. Réponse sous 24h. Email, téléphone ou formulaire de contact.',
  alternates: { canonical: `${BASE_URL}/contact`, ...languesPour('/contact') },
  openGraph: {
    title: 'Contact · 123 Digital',
    description: 'Contactez Maurice Timsit pour votre projet digital. Réponse sous 24h.',
    url: `${BASE_URL}/contact`,
  },
}

const moyensDeContact = [
  {
    label: 'Email',
    valeur: 'contact@123digital.fr',
    href: 'mailto:contact@123digital.fr',
    desc: 'Réponse sous 24h en semaine',
  },
  {
    label: 'Téléphone',
    valeur: '+33 6 52 09 23 01',
    href: 'tel:+33652092301',
    desc: 'Du lundi au vendredi',
  },
  {
    label: 'LinkedIn',
    valeur: 'linkedin.com/in/mauricetimsit',
    href: 'https://www.linkedin.com/in/mauricetimsit/',
    desc: 'Pour les demandes professionnelles',
  },
]

export default function ContactPage() {
  const schemas = [
    contactPageSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      <PageBanner
        icone="phone"
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Contact' },
            ]}
          />
        }
        title="Parlons de votre projet."
        highlight="projet."
        sub="Que vous ayez un projet précis ou juste une question, je suis disponible pour en discuter. La meilleure façon de commencer reste l&apos;audit gratuit de 30 minutes : pas de commercial, juste de l&apos;utile."
        actions={<BannerCta href="/audit-gratuit">Réserver l&apos;audit gratuit</BannerCta>}
      />

      {/* Moyens de contact */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
            {moyensDeContact.map((moyen) => (
              <Link
                key={moyen.label}
                href={moyen.href}
                target={moyen.href.startsWith('http') ? '_blank' : undefined}
                rel={moyen.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block p-8"
                style={{ backgroundColor: 'var(--surface-2)' }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--brand)',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  {moyen.label}
                </div>
                <div
                  className="font-display font-extrabold group-hover:text-[var(--brand)] transition-colors mb-2"
                  style={{ fontSize: '1.1rem', color: 'var(--ink)' }}
                >
                  {moyen.valeur}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-2)' }}>
                  {moyen.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2
                className="font-display font-extrabold mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--ink)', lineHeight: 1.1 }}
              >
                Ce que vous pouvez<br />attendre
              </h2>
              <ul className="space-y-4">
                {[
                  'Réponse email sous 24h en semaine',
                  'Pas de relance commerciale agressive',
                  'Un échange honnête sur ce qui peut fonctionner pour vous',
                  'Une proposition claire si on décide de travailler ensemble',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--brand)', lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2
                className="font-display font-extrabold mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--ink)', lineHeight: 1.1 }}
              >
                Basé à Lyon,<br />disponible partout
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>
                Je travaille principalement avec des entreprises d&apos;Auvergne-Rhône-Alpes (Lyon, Grenoble, Saint-Étienne, Annecy, Chambéry, Clermont-Ferrand) mais j&apos;interviens sur toute la France en 100% distanciel.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7, marginTop: '1rem' }}>
                Les réunions se tiennent par visioconférence (Google Meet). Les projets avancent sans déplacements inutiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire — P0-3 de l'audit UX : la meta de la page promettait un
          formulaire de contact qui n'existait pas */}
      <CTA />
    </>
  )
}
