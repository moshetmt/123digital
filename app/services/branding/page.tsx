import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Branding & Identité Visuelle Lyon — PME & TPE | 123 Digital',
  description:
    'Création d\'identité visuelle pour PME à Lyon : logo, charte graphique, positionnement. Une image cohérente qui inspire confiance et se souvient.',
  alternates: { canonical: `${BASE_URL}/services/branding` },
}

const deliverables = [
  { title: 'Logo & Déclinaisons', desc: 'Logo principal + versions alternatives, formats web et print.' },
  { title: 'Charte graphique', desc: 'Couleurs, typographies, règles d\'utilisation — cohérence garantie.' },
  { title: 'Positionnement', desc: 'Votre territoire de marque, votre promesse, votre ton de voix.' },
  { title: 'Copywriting', desc: 'Textes de marque : tagline, about, valeurs — qui parlent à vos clients.' },
]

export default function BrandingPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Branding & Identité Visuelle Lyon', description: 'Création d\'identité visuelle et positionnement de marque pour PME à Lyon.', path: '/services/branding' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Branding & Identité', path: '/services/branding' }]),
      ]} />

      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Service · Branding Lyon
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Branding & Identité visuelle<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>une image qui inspire confiance.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            Votre identité visuelle est le premier filtre de confiance de vos prospects. Je crée
            des identités de marque mémorables pour les PME lyonnaises — cohérentes sur tous les
            supports, du site web aux réseaux sociaux.
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Discuter de mon projet
          </Link>
        </div>
      </section>

      <section className="bg-black" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Ce que vous recevez
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((d) => (
              <div key={d.title} className="rounded-2xl p-7" style={{ backgroundColor: '#212121', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 className="font-display font-normal text-base mb-2" style={{ color: '#E1E0CC' }}>{d.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
