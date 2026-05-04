import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Community Management Lyon — Réseaux Sociaux PME | 123 Digital',
  description:
    'Gestion de vos réseaux sociaux à Lyon : stratégie, création de contenu, Instagram, LinkedIn, Facebook. Audience engagée qui génère des clients.',
  alternates: { canonical: `${BASE_URL}/services/community-management` },
}

const platforms = [
  { name: 'Instagram', desc: 'Contenu visuel engageant, stories, reels — pour les marques B2C à Lyon.' },
  { name: 'LinkedIn', desc: 'Personal branding, B2B lead gen — pour les consultants et dirigeants.' },
  { name: 'Facebook', desc: 'Communauté locale, publicités sociales, gestion de la page entreprise.' },
  { name: 'Reporting mensuel', desc: 'Tableau de bord clair : portée, engagement, leads générés.' },
]

export default function CommunityManagementPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Community Management Lyon', description: 'Gestion professionnelle des réseaux sociaux pour PME à Lyon.', path: '/services/community-management' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Community Management', path: '/services/community-management' }]),
      ]} />

      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Service · Social Media Lyon
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Community Management<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>une audience qui achète.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            Vos réseaux sociaux gérés par un expert à Lyon. Contenu régulier et qualitatif,
            engagement authentique, stratégie orientée conversion — pas juste des likes.
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Audit réseaux gratuit
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
