import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Création Site Web PME — Sites qui Convertissent | 123Digital',
  description:
    'Création de site web sur mesure pour PME : site vitrine, e-commerce, landing page. Rapide, optimisé SEO, livré en 3 à 6 semaines. Devis gratuit sous 24h.',
  alternates: { canonical: `${BASE_URL}/services/creation-site-web` },
}

const features = [
  { title: 'Design sur mesure', desc: 'Interface unique, adaptée à votre marque et à vos clients.' },
  { title: 'Mobile-first', desc: '100% responsive — 70% du trafic vient du mobile.' },
  { title: 'SEO intégré', desc: 'Structure technique optimisée pour Google dès le lancement.' },
  { title: 'Rapide à charger', desc: 'Score performance 90+ — crucial pour le SEO et l\'expérience.' },
  { title: 'Orienté conversion', desc: 'Parcours utilisateur pensé pour transformer les visiteurs en leads.' },
  { title: 'Livré en 3 à 6 semaines', desc: 'Délai maîtrisé, sans surprise, du brief à la mise en ligne.' },
]

const steps = [
  {
    num: '01',
    title: 'Cadrage & stratégie',
    desc: 'On commence par comprendre votre activité, vos clients cibles et vos concurrents. Cette étape définit l\'architecture du site et les pages prioritaires pour le SEO.',
  },
  {
    num: '02',
    title: 'Design & maquettes',
    desc: 'Maquettes sur mesure, alignées sur votre image de marque. Vous validez avant qu\'une ligne de code soit écrite — pas de mauvaise surprise.',
  },
  {
    num: '03',
    title: 'Développement',
    desc: 'Site rapide (score 90+ PageSpeed), 100% responsive, sécurisé HTTPS, structure SEO correcte. Construit pour durer et évoluer.',
  },
  {
    num: '04',
    title: 'Mise en ligne & formation',
    desc: 'Lancement, vérifications techniques, soumission au moteur de recherche. Formation à la mise à jour et suivi des performances pendant 30 jours.',
  },
]

const pricingTiers = [
  {
    label: 'Site vitrine',
    price: 'À partir de 1 500 €',
    desc: '5 à 8 pages, formulaire de contact, SEO on-page, responsive. Pour les PME qui veulent une présence professionnelle et être trouvées sur Google.',
    delay: '3 à 4 semaines',
  },
  {
    label: 'Site avec fonctionnalités',
    price: 'À partir de 2 500 €',
    desc: 'Blog, portfolio, espace client, réservation en ligne ou catalogue produits. Pour les entreprises qui ont besoin de plus qu\'un site vitrine.',
    delay: '4 à 6 semaines',
  },
  {
    label: 'E-commerce',
    price: 'À partir de 3 500 €',
    desc: 'Boutique en ligne complète, gestion des stocks, paiement sécurisé, fiche produit optimisée SEO. Pour vendre directement depuis votre site.',
    delay: '6 à 8 semaines',
  },
]

const faqs = [
  {
    question: 'Quelle technologie utilisez-vous pour créer les sites web ?',
    answer:
      'J\'utilise Next.js (React) pour les sites à hautes performances et Webflow pour les sites vitrines simples. Ces technologies donnent des scores PageSpeed 90+ et une structure SEO propre — sans les problèmes de sécurité et de maintenance de WordPress. Votre site vous appartient entièrement.',
  },
  {
    question: 'Que dois-je préparer avant de lancer mon projet de site web ?',
    answer:
      'Le minimum pour démarrer : votre logo (ou un brief pour en créer un), vos textes de présentation (je peux vous aider à les rédiger), vos photos ou vidéos, et une idée de ce que vous voulez que les visiteurs fassent sur le site. Le reste, on le cadre ensemble lors du premier appel.',
  },
  {
    question: 'Mon site sera-t-il facile à mettre à jour moi-même ?',
    answer:
      'Oui. Je forme chaque client à la mise à jour de son site lors de la livraison. Pour les sites Webflow, c\'est aussi simple qu\'un traitement de texte. Pour Next.js, je mets en place un CMS (Sanity ou Notion) pour gérer le contenu sans toucher au code.',
  },
  {
    question: 'Proposez-vous l\'hébergement et le nom de domaine ?',
    answer:
      'Je vous conseille et configure l\'hébergement, mais le contrat est à votre nom — vous êtes propriétaire à 100%. Pour un site Next.js, Vercel est l\'option recommandée : rapide, fiable, gratuit pour les petits volumes. Pour Webflow, l\'hébergement est inclus dans l\'abonnement Webflow.',
  },
  {
    question: 'Que se passe-t-il si le design ne me convient pas ?',
    answer:
      'On ne part jamais en développement sans que vous ayez validé les maquettes. Je propose deux rounds de retouches inclus dans le prix. Si après validation vous changez d\'avis en cours de développement, les modifications majeures sont facturées au temps passé — on en discute toujours en amont.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

const sectionStyle = { padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }
const labelStyle = {
  fontSize: '0.65rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--ink-2)',
  fontWeight: 700,
  marginBottom: '1.5rem',
}

export default function CreationSiteWebPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Création de site web PME', description: 'Création de sites web performants et optimisés pour les PME.', path: '/services/creation-site-web' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Création de site web', path: '/services/creation-site-web' }]),
        faqSchema,
      ]} />

      {/* Hero */}
      <section className="bg-background" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            Service · Création Web
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: 'var(--ink)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Création de site web PME<br />
            <span style={{ color: 'var(--brand)' }}>qui convertit vos visiteurs.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--ink-2)' }}>
            Votre site web est votre meilleur commercial — disponible 24h/24. Je conçois des sites
            web sur mesure pour les PME : rapides, optimisés SEO, et pensés pour transformer chaque
            visiteur en client potentiel.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}>
              Devis gratuit en 24h
            </Link>
            <Link href="/realisations" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8 hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors" style={{ border: '1px solid var(--line)', color: 'var(--ink-2)' }}>
              Voir les réalisations →
            </Link>
          </div>
        </div>
      </section>

      {/* Ce qui fait la différence */}
      <section className="bg-background" style={{ ...sectionStyle, paddingTop: '0' }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ce qui fait la différence</div>
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Un site web PME construit pour générer des clients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl p-6" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: 'var(--brand)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h3 className="font-display font-normal text-base mb-2" style={{ color: 'var(--ink)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ma méthode</div>
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Création de site web en 4 étapes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {steps.map((s) => (
              <div key={s.num} className="p-8" style={{ backgroundColor: 'var(--surface-2)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--brand)', fontWeight: 700, marginBottom: '1rem' }}>{s.num}</div>
                <h3 className="font-display font-normal mb-3" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Investissement</div>
          <h2 className="font-display font-normal mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Combien coûte la création d&apos;un site web PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Un site web sérieux pour une PME coûte entre 1 500 et 5 000 €. En dessous, vous obtenez
            un template — pas un outil commercial. Au-dessus de 8 000 €, vous payez des frais de
            structure d&apos;une grande agence.{' '}
            <Link href="/blog/site-web-pme-prix-guide" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
              Guide complet des prix →
            </Link>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingTiers.map((t) => (
              <div key={t.label} className="rounded-2xl p-7" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700, marginBottom: '0.75rem' }}>{t.label}</div>
                <div className="font-display font-normal mb-3" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>{t.price}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>{t.desc}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', fontWeight: 600 }}>Délai : {t.delay}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-3xl">
          <div style={labelStyle}>Questions fréquentes</div>
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Création de site web PME — vos questions
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
                <dt className="font-display font-normal mb-3" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{question}</dt>
                <dd style={{ color: 'var(--ink-2)', lineHeight: 1.75, fontSize: '0.95rem' }}>{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pour aller plus loin */}
      <section className="bg-background" style={{ ...sectionStyle, paddingBottom: '3rem' }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Pour aller plus loin</div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Guide des prix : combien coûte un site web PME ?', href: '/blog/site-web-pme-prix-guide' },
              { label: 'Quand refondre votre site web ?', href: '/blog/refonte-site-web-quand-pourquoi' },
              { label: 'Ajouter le SEO après la création →', href: '/services/seo' },
              { label: 'Voir le portfolio de réalisations →', href: '/realisations' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                style={{ padding: '0.5rem 1rem', border: '1px solid var(--line)', color: 'var(--ink-2)', fontSize: '0.82rem', borderRadius: '0.25rem' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-background" style={{ padding: '4rem 1.5rem 7rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display font-normal mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.025em' }}>
            Votre site web PME,<br />livré en 3 à 6 semaines.
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--ink-2)' }}>Devis gratuit · Design sur mesure · SEO inclus · Vous restez propriétaire</p>
          <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}>
            Obtenir un devis gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
