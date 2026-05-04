import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Création de Site Web PME Lyon — Sites qui Convertissent | 123 Digital',
  description:
    'Création de site web sur mesure pour PME à Lyon : site vitrine, e-commerce, landing page. Rapide, optimisé SEO, conçu pour convertir. Devis gratuit.',
  alternates: { canonical: `${BASE_URL}/services/creation-site-web` },
}

const features = [
  { title: 'Design sur mesure', desc: 'Interface unique, adaptée à votre marque et à vos clients.' },
  { title: 'Mobile-first', desc: '100% responsive — 70% du trafic vient du mobile.' },
  { title: 'SEO intégré', desc: 'Structure technique optimisée pour Google dès le lancement.' },
  { title: 'Rapide à charger', desc: 'Score performance élevé — crucial pour le SEO et l\'expérience.' },
  { title: 'Orienté conversion', desc: 'Parcours utilisateur pensé pour transformer les visiteurs en leads.' },
  { title: 'Livré en 72h', desc: 'Première version livrée en 72 heures pour les projets standards.' },
]

export default function CreationSiteWebPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Création de site web PME Lyon', description: 'Création de sites web performants et optimisés pour les PME à Lyon.', path: '/services/creation-site-web' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Création de site web', path: '/services/creation-site-web' }]),
      ]} />

      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Service · Création Web
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Création de site web<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>qui convertit vos visiteurs.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            Votre site web est votre meilleur commercial — disponible 24h/24. Je conçois des sites
            web sur mesure pour les PME lyonnaises : rapides, optimisés SEO, et pensés pour
            transformer chaque visiteur en client potentiel.
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Devis gratuit en 24h
          </Link>
        </div>
      </section>

      <section className="bg-black" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Ce qui fait la différence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl p-6" style={{ backgroundColor: '#212121', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 className="font-display font-normal text-base mb-2" style={{ color: '#E1E0CC' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black" style={{ padding: '0 1.5rem 8rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mx-auto max-w-2xl text-center" style={{ paddingTop: '5rem' }}>
          <h2 className="font-display font-normal mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#E1E0CC', letterSpacing: '-0.025em' }}>
            Votre site web en 72h à Lyon
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(225,224,204,0.5)' }}>Devis gratuit · Livraison rapide · SEO inclus</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Obtenir un devis gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
