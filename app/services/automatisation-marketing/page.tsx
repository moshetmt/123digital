import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Automatisation Marketing Lyon — Leads 24h/24 pour PME | 123 Digital',
  description:
    'Automatisation marketing pour PME à Lyon : emailing, CRM, funnels de vente, GA4. Prospects qualifiés en continu, même la nuit. Démo gratuite.',
  alternates: { canonical: `${BASE_URL}/services/automatisation-marketing` },
}

const automations = [
  { title: 'Emailing & séquences', desc: 'Nurturing automatisé qui guide vos prospects vers l\'achat sans effort manuel.' },
  { title: 'CRM setup', desc: 'HubSpot, Brevo ou Notion — pipeline commercial structuré et automatisé.' },
  { title: 'Funnels de conversion', desc: 'Parcours client de la landing page à la prise de RDV, 100% automatisé.' },
  { title: 'GA4 & dashboards', desc: 'Tableau de bord en temps réel pour piloter votre croissance à la donnée.' },
  { title: 'Make.com / n8n', desc: 'Automatisations sur mesure : connectez vos outils, éliminez les tâches répétitives.' },
  { title: 'Maintenance & hébergement', desc: 'Suivi technique continu pour que vos systèmes tournent sans interruption.' },
]

export default function AutomatisationMarketingPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Automatisation Marketing Lyon', description: 'Systèmes d\'automatisation marketing pour PME à Lyon : emailing, CRM, funnels, GA4.', path: '/services/automatisation-marketing' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Automatisation Marketing', path: '/services/automatisation-marketing' }]),
      ]} />

      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Service · Automatisation Lyon
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Automatisation marketing<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>des leads même quand vous dormez.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            Je construis des systèmes marketing qui travaillent pour votre PME lyonnaise 24h/24.
            Qualification automatique des leads, nurturing par email, CRM structuré — votre
            pipeline commercial tourne en autonomie.
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Voir comment ça fonctionne
          </Link>
        </div>
      </section>

      <section className="bg-black" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Ce qu&apos;on automatise pour vous
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {automations.map((a) => (
              <div key={a.title} className="rounded-2xl p-6" style={{ backgroundColor: '#212121', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 className="font-display font-normal text-base mb-2" style={{ color: '#E1E0CC' }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
