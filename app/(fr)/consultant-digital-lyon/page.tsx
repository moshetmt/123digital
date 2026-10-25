import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: { absolute: 'Consultant marketing digital à Lyon | 123 Digital' },
  description:
    'Maurice Timsit, consultant marketing digital à Lyon : SEO, site web, Google Ads pour PME. Un seul interlocuteur. Audit offert en 30 min.',
  alternates: { canonical: `${BASE_URL}/consultant-digital-lyon` },
  openGraph: {
    title: 'Consultant marketing digital à Lyon | 123 Digital',
    description: 'Maurice Timsit, consultant marketing digital à Lyon : SEO, site web, Google Ads pour PME. Un seul interlocuteur.',
    url: `${BASE_URL}/consultant-digital-lyon`,
  },
}

const services = [
  { title: 'Création de site web', desc: 'Sites performants qui convertissent vos visiteurs en clients.', href: '/services/creation-site-web' },
  { title: 'SEO & Référencement', desc: 'Apparaissez en premier sur Google quand vos clients cherchent.', href: '/services/seo' },
  { title: 'Publicité en ligne', desc: 'Google Ads et Meta Ads avec ROI mesurable dès la première semaine.', href: '/services/publicite-en-ligne' },
  { title: 'Branding & Identité', desc: 'Une identité visuelle qui inspire confiance et se souvient.', href: '/services/branding' },
  { title: 'Community Management', desc: 'Réseaux sociaux gérés pour bâtir une audience qui achète.', href: '/services/community-management' },
  { title: 'Automatisation Marketing', desc: 'Prospects qualifiés en continu, même quand vous dormez.', href: '/services/automatisation-marketing' },
]

const zones = [
  'Lyon 1er', 'Lyon 2e', 'Lyon 3e', 'Lyon 6e', 'Lyon 7e', 'Lyon 8e',
  'Villeurbanne', 'Caluire-et-Cuire', 'Bron', 'Vénissieux',
  'Saint-Priest', 'Décines', 'Rillieux-la-Pape', 'Écully',
]

const faqs = [
  {
    q: 'Qu\'est-ce qu\'un consultant digital à Lyon ?',
    a: 'Un consultant digital à Lyon est un expert indépendant qui aide les PME et TPE lyonnaises à développer leur présence en ligne : site web, SEO, publicité Google/Meta, réseaux sociaux et automatisation marketing. Contrairement à une agence, vous avez un interlocuteur unique investi dans vos résultats.',
  },
  {
    q: 'Combien coûte un consultant digital à Lyon ?',
    a: 'Les tarifs varient selon les missions. Un audit digital est gratuit chez 123 Digital. Les projets de création de site démarrent à partir de quelques milliers d\'euros. Le SEO et la gestion de campagnes sont proposés sous forme d\'accompagnement mensuel. Contactez-moi pour un devis personnalisé.',
  },
  {
    q: 'Intervenez-vous uniquement à Lyon ?',
    a: 'Je suis basé à Lyon et j\'accompagne prioritairement les entreprises de la métropole lyonnaise et de la région Auvergne-Rhône-Alpes. Étant 100% en distanciel, j\'interviens également sur toute la France.',
  },
  {
    q: 'Quel est le délai pour voir des résultats en SEO à Lyon ?',
    a: 'Les premiers effets du SEO se font sentir en 3 à 6 mois selon la concurrence dans votre secteur à Lyon. La publicité Google Ads génère des leads dès les premières semaines. Un site web optimisé améliore immédiatement votre crédibilité.',
  },
]

export default function ConsultantDigitalLyonPage() {
  const jsonLd = [
    serviceSchema({
      name: 'Consultant Digital Lyon · 123 Digital',
      description: 'Services de croissance digitale pour PME à Lyon : SEO, création de site, publicité en ligne et automatisation.',
      path: '/consultant-digital-lyon',
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Consultant Digital Lyon', path: '/consultant-digital-lyon' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ]

  return (
    <>
      <JsonLd schema={jsonLd} />

      <PageBanner
        icone="map-pin"
        title="Consultant digital à Lyon"
        highlight="à Lyon"
        sub="Vous dirigez une PME ou une TPE à Lyon et vous voulez attirer plus de clients en ligne ? Site web, SEO, publicité, branding et automatisation, sous un seul expert."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/services">Voir les services</BannerCtaLine>
          </>
        }
      />

      {/* Pourquoi un consultant digital à Lyon */}
      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-8"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Pourquoi choisir un consultant digital<br />
            <span style={{ color: 'var(--brand)' }}>plutôt qu&apos;une agence à Lyon ?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'Un interlocuteur unique', desc: 'Pas de compte manager qui transmet à un junior. Vous travaillez directement avec l\'expert qui connaît votre dossier.' },
              { num: '02', title: 'Orienté résultats', desc: 'Pas de rapports de 40 pages. Je pilote votre croissance avec des métriques concrètes : leads, trafic qualifié, ROI.' },
              { num: '03', title: 'Flexible et réactif', desc: 'Pas de tunnel administratif. Décisions rapides, ajustements en temps réel, disponibilité directe.' },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded p-7"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <div className="text-xs font-bold mb-4" style={{ color: 'var(--ink-3)', letterSpacing: '0.1em' }}>{item.num}</div>
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <Link
            href="/blog/consultant-digital-ou-agence-lyon"
            className="btn-contour mt-8"
          >
            Lire le comparatif complet agence vs consultant à Lyon →
          </Link>
          <Link href="/consultant-ia-lyon" className="btn-contour mt-8 ml-3">
            Projets IA et automatisation à Lyon →
          </Link>
        </div>
      </section>

      {/* Stratégie et marketing digital */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-3xl">
          <h2
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Stratégie et marketing digital<br />
            <span style={{ color: 'var(--brand)' }}>pour PME lyonnaises</span>
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            <p>
              Un consultant en marketing digital commence par la stratégie, pas par l&apos;outil. Avant de parler site,
              annonces ou réseaux sociaux, je regarde trois choses : ce que vos clients tapent sur Google quand ils ont
              besoin de vous, ce qu&apos;ils voient en arrivant sur votre site depuis leur téléphone, et ce qui les fait
              appeler, ou partir.
            </p>
            <p>
              De là sort une stratégie digitale à votre taille : quelques pages qui répondent aux vraies recherches de vos
              clients à Lyon, une fiche Google entretenue, des annonces Google Ads seulement quand elles rapportent plus
              qu&apos;elles ne coûtent, et un suivi des demandes pour savoir d&apos;où viennent vos clients.
            </p>
            <p>
              Ce travail de consulting digital s&apos;adresse aux artisans, commerces et PME de la métropole lyonnaise qui
              n&apos;ont pas besoin d&apos;une équipe de vingt personnes, mais d&apos;un interlocuteur qui connaît leur dossier
              et fait le travail lui-même. Le premier rendez-vous est un audit offert de 30 minutes, sur votre site.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Services de croissance digitale<br />
            <span style={{ color: 'var(--brand)' }}>pour PME à Lyon</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col rounded p-6 transition-opacity duration-300 hover:opacity-90"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <h3
                  className="font-display font-extrabold text-base mb-2 group-hover:text-[var(--ink)] transition-colors"
                  style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Zones d&apos;intervention à Lyon et région
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--ink-2)' }}>
            Consultant digital 100% distanciel : j&apos;accompagne les PME sur toute la métropole lyonnaise
            et la région Auvergne-Rhône-Alpes, ainsi que toute la France.
          </p>
          <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
            {zones.join(' · ')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-3xl">
          <h2
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="rounded p-6"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
