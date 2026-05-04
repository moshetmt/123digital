import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, contactPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact — Maurice Timsit, consultant digital Lyon | 123 Digital',
  description:
    'Contactez Maurice Timsit pour discuter de votre projet digital. Réponse sous 24h. Email, téléphone ou formulaire de contact.',
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Contact — 123 Digital',
    description: 'Contactez Maurice Timsit pour votre projet digital. Réponse sous 24h.',
    url: `${BASE_URL}/contact`,
  },
}

const moyensDeContact = [
  {
    label: 'Email',
    valeur: 'maurice@123digital.fr',
    href: 'mailto:maurice@123digital.fr',
    desc: 'Réponse sous 24h en semaine',
  },
  {
    label: 'Audit gratuit',
    valeur: 'Réserver un créneau',
    href: '/audit-gratuit',
    desc: '30 min d\'échange sans engagement',
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

      {/* Hero */}
      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Contact' },
              ]}
            />
          </div>

          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.7)',
              fontWeight: 700,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Réponse sous 24h
          </div>

          <h1
            className="font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              color: '#E1E0CC',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Parlons de votre<br />
            <em
              style={{
                color: '#00FF87',
                fontStyle: 'italic',
                fontFamily: 'var(--font-instrument-serif)',
              }}
            >
              projet.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'rgba(225,224,204,0.65)' }}
          >
            Que vous ayez un projet précis ou juste une question, je suis disponible pour en discuter. La meilleure façon de commencer est l&apos;audit gratuit de 30 minutes — pas de commercial, juste de l&apos;utile.
          </p>
        </div>
      </section>

      {/* Moyens de contact */}
      <section
        className="bg-black"
        style={{ padding: '2rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
            {moyensDeContact.map((moyen) => (
              <Link
                key={moyen.label}
                href={moyen.href}
                target={moyen.href.startsWith('http') ? '_blank' : undefined}
                rel={moyen.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block p-8"
                style={{ backgroundColor: '#080808' }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#00FF87',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  {moyen.label}
                </div>
                <div
                  className="font-display font-normal group-hover:text-[#00FF87] transition-colors mb-2"
                  style={{ fontSize: '1.1rem', color: '#E1E0CC' }}
                >
                  {moyen.valeur}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(225,224,204,0.5)' }}>
                  {moyen.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2
                className="font-display font-normal mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#E1E0CC', lineHeight: 1.1 }}
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
                    <span style={{ color: '#00FF87', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(225,224,204,0.65)', lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2
                className="font-display font-normal mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#E1E0CC', lineHeight: 1.1 }}
              >
                Basé à Lyon,<br />disponible partout
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(225,224,204,0.65)', lineHeight: 1.7 }}>
                Je travaille principalement avec des entreprises d&apos;Auvergne-Rhône-Alpes (Lyon, Grenoble, Saint-Étienne, Annecy, Chambéry, Clermont-Ferrand) mais j&apos;interviens sur toute la France en 100% distanciel.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(225,224,204,0.65)', lineHeight: 1.7, marginTop: '1rem' }}>
                Les réunions se tiennent par visioconférence (Google Meet). Les projets avancent sans déplacements inutiles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
