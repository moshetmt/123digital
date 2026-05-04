import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Publicité en Ligne Lyon — Google Ads & Meta Ads PME | 123 Digital',
  description:
    'Campagnes Google Ads et Meta Ads pour PME à Lyon. ROI mesurable dès la 1ère semaine, ciblage précis, gestion experte sans frais d\'agence cachés.',
  alternates: { canonical: `${BASE_URL}/services/publicite-en-ligne` },
}

const platforms = [
  { name: 'Google Ads', desc: 'Apparaissez en premier quand vos clients cherchent activement vos services sur Google.' },
  { name: 'Meta Ads', desc: 'Touchez votre audience idéale sur Facebook et Instagram avec un ciblage précis.' },
  { name: 'Retargeting', desc: 'Reconvertissez les visiteurs qui n\'ont pas acheté lors de leur première visite.' },
  { name: 'Tracking & Attribution', desc: 'Chaque euro est tracé. Vous savez exactement d\'où viennent vos clients.' },
]

export default function PubliciteEnLignePage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Publicité en ligne Lyon — Google Ads & Meta Ads', description: 'Gestion de campagnes Google Ads et Meta Ads pour PME à Lyon avec ROI mesurable.', path: '/services/publicite-en-ligne' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Publicité en ligne', path: '/services/publicite-en-ligne' }]),
      ]} />

      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Service · Google Ads · Meta Ads
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Publicité en ligne à Lyon<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>ROI mesurable dès la 1ère semaine.</span>
          </h1>
          <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            Google Ads et Meta Ads pilotés par la donnée. Chaque euro investi est tracé,
            optimisé et justifié. Fini les campagnes qui brûlent le budget sans résultat.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-display font-bold" style={{ color: '#00FF87' }}>×3</span>
            <span className="text-sm" style={{ color: 'rgba(225,224,204,0.5)' }}>retour sur investissement publicitaire moyen</span>
          </div>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Audit campagnes gratuit
          </Link>
        </div>
      </section>

      <section className="bg-black" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Plateformes gérées
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms.map((p) => (
              <div key={p.name} className="rounded-2xl p-7" style={{ backgroundColor: '#212121', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 className="font-display font-normal text-base mb-2" style={{ color: '#E1E0CC' }}>{p.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
