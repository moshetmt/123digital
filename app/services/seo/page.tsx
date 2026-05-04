import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'SEO & Référencement Lyon — 1ère Page Google pour PME | 123 Digital',
  description:
    'Expert SEO à Lyon : audit technique, optimisation contenu, netlinking et SEO local pour PME et TPE. Résultats en 3-6 mois. Audit SEO gratuit.',
  alternates: { canonical: `${BASE_URL}/services/seo` },
}

const steps = [
  { num: '01', title: 'Audit SEO complet', desc: 'Analyse technique, contenu et profil de liens. Identification des freins et opportunités.' },
  { num: '02', title: 'Stratégie sur mesure', desc: 'Plan d\'action priorisé par impact : mots-clés cibles, contenu à créer, corrections techniques.' },
  { num: '03', title: 'Optimisation & contenu', desc: 'Mise en place des corrections techniques, création de contenu optimisé, maillage interne.' },
  { num: '04', title: 'Netlinking & autorité', desc: 'Acquisition de liens de qualité pour renforcer l\'autorité de votre domaine.' },
]

export default function SeoPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'SEO & Référencement naturel Lyon', description: 'Stratégies SEO sur mesure pour positionner les PME lyonnaises en tête des résultats Google.', path: '/services/seo' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'SEO & Référencement', path: '/services/seo' }]),
      ]} />

      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Service · SEO Lyon
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            SEO & Référencement naturel<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>1ère page Google à Lyon.</span>
          </h1>
          <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            Le premier résultat Google capte 32% des clics. Je positionne votre PME en tête
            des recherches de vos clients à Lyon et en région — trafic qualifié, durable, sans
            dépendre de la publicité.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-display font-bold" style={{ color: '#00FF87' }}>+150%</span>
            <span className="text-sm" style={{ color: 'rgba(225,224,204,0.5)' }}>trafic organique moyen après 6 mois</span>
          </div>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Audit SEO gratuit
          </Link>
        </div>
      </section>

      <section className="bg-black" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            La méthode SEO en 4 étapes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((s) => (
              <div key={s.num} className="rounded-2xl p-7" style={{ backgroundColor: '#212121', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-xs font-bold mb-4" style={{ color: 'rgba(225,224,204,0.35)', letterSpacing: '0.1em' }}>{s.num}</div>
                <h3 className="font-display font-normal text-base mb-2" style={{ color: '#E1E0CC' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
