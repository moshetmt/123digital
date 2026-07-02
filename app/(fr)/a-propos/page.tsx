import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, personSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'À propos — Maurice Timsit, expert digital Lyon',
  description:
    "Maurice Timsit, consultant digital Lyon spécialisé PME : SEO, site web, Google Ads. 8 ans d'expérience au service de votre croissance. Échangeons.",
  alternates: { canonical: `${BASE_URL}/a-propos` },
}

const expertise = [
  'SEO & référencement naturel',
  'Création de sites web performants',
  'Google Ads & Meta Ads',
  'Branding & identité visuelle',
  'Community Management',
  'Automatisation marketing (Make, n8n, HubSpot)',
  'Analytics & pilotage data (GA4)',
  'Growth hacking PME',
]

const values = [
  { title: 'Résultats avant tout', desc: 'Pas de jargon, pas de rapport de 40 pages. Des chiffres concrets : trafic, leads, chiffre d\'affaires.' },
  { title: 'Un seul interlocuteur', desc: 'Vous ne parlez pas à un account manager. Je pilote moi-même votre projet, du début à la fin.' },
  { title: 'Transparence totale', desc: 'Vous savez ce que je fais, pourquoi je le fais, et quel impact ça a. Accès complet aux outils.' },
]

export default function AProposPage() {
  return (
    <>
      <JsonLd schema={[
        personSchema(),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'À propos', path: '/a-propos' }]),
      ]} />

      {/* Hero */}
      <section className="relative bg-black" style={{ padding: '9rem 1.5rem 6rem', overflow: 'hidden' }}>
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.45 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 55%, #000 100%)' }}
          />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
                Expert croissance digitale · Lyon
              </div>
              <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                Maurice Timsit<br />
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(225,224,204,0.7)' }}>
                  consultant digital à Lyon.
                </span>
              </h1>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(225,224,204,0.65)' }}>
                Depuis 8 ans, j&apos;aide les PME et entrepreneurs à construire une présence digitale
                qui travaille pour eux. Pas une agence, pas un junior — un expert senior qui connaît
                votre dossier et qui est personnellement investi dans vos résultats.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(225,224,204,0.55)' }}>
                Basé à Lyon, j&apos;accompagne des entreprises de la métropole lyonnaise et de toute
                la France. Mon approche : comprendre votre business avant de toucher au digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
                  Discutons de votre projet
                </Link>
                <a
                  href="https://www.linkedin.com/in/mauricetimsit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm h-12 px-8 transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(225,224,204,0.8)' }}
                >
                  LinkedIn →
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: '8+', label: 'ans d\'expérience' },
                { num: '60+', label: 'projets livrés' },
                { num: '100%', label: 'projets en délais' },
                { num: 'Lyon', label: 'basé à' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#00FF87', letterSpacing: '-0.03em' }}>{s.num}</div>
                  <div className="text-xs" style={{ color: 'rgba(225,224,204,0.45)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-black" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Mon approche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl p-7" style={{ backgroundColor: '#212121', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 className="font-display font-normal text-base mb-3" style={{ color: '#E1E0CC' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-black" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display font-normal mb-8" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Expertise technique
          </h2>
          <div className="flex flex-wrap gap-2">
            {expertise.map((e) => (
              <span key={e} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(0,255,135,0.07)', color: 'rgba(0,255,135,0.7)', border: '1px solid rgba(0,255,135,0.15)' }}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black" style={{ padding: '6rem 1.5rem 8rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-normal mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#E1E0CC', letterSpacing: '-0.025em' }}>
            Prêt à collaborer ?
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(225,224,204,0.5)' }}>
            Audit gratuit · 30 min · Sans engagement
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Prendre contact
          </Link>
        </div>
      </section>
    </>
  )
}
