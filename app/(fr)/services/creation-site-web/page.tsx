import type { Metadata } from 'next'
import Link from 'next/link'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { GrilleCartes, GrilleEtapes } from '@/components/sections/Grilles'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqListe } from '@/components/sections/FaqListe'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Création Site Web PME · Sites qui Convertissent | 123Digital',
  description:
    'Création de site web sur mesure pour PME : site vitrine, e-commerce, landing page. Rapide, optimisé SEO, livré en 3 à 6 semaines. Devis gratuit sous 24h.',
  alternates: { canonical: `${BASE_URL}/services/creation-site-web` },
}

const features = [
  { title: 'Design sur mesure', desc: 'Interface unique, adaptée à votre marque et à vos clients.' },
  { title: 'Mobile-first', desc: '100% responsive : 70% du trafic vient du mobile.' },
  { title: 'SEO intégré', desc: 'Structure technique optimisée pour Google dès le lancement.' },
  { title: 'Rapide à charger', desc: 'Score performance 90+, crucial pour le SEO et l\'expérience.' },
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
    desc: 'Maquettes sur mesure, alignées sur votre image de marque. Vous validez avant qu\'une ligne de code soit écrite, pas de mauvaise surprise.',
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
      'J\'utilise Next.js (React) pour les sites à hautes performances et Webflow pour les sites vitrines simples. Ces technologies donnent des scores PageSpeed 90+ et une structure SEO propre, sans les problèmes de sécurité et de maintenance de WordPress. Votre site vous appartient entièrement.',
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
      'Je vous conseille et configure l\'hébergement, mais le contrat est à votre nom : vous êtes propriétaire à 100%. Pour un site Next.js, Vercel est l\'option recommandée : rapide, fiable, gratuit pour les petits volumes. Pour Webflow, l\'hébergement est inclus dans l\'abonnement Webflow.',
  },
  {
    question: 'Que se passe-t-il si le design ne me convient pas ?',
    answer:
      'On ne part jamais en développement sans que vous ayez validé les maquettes. Je propose deux rounds de retouches inclus dans le prix. Si après validation vous changez d\'avis en cours de développement, les modifications majeures sont facturées au temps passé, on en discute toujours en amont.',
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

const sectionStyle = { padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }
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

      <PageBanner
        icone="code-xml"
        image={{ src: '/images/services/creation-site-web.jpg', priority: true }}
        title="Création de site web PME qui convertit vos visiteurs."
        highlight="qui convertit vos visiteurs."
        sub="Votre site web est votre meilleur commercial, disponible 24 h/24. Des sites sur mesure pour les PME : rapides, optimisés SEO, pensés pour transformer un visiteur en client."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Devis gratuit en 24 h</BannerCta>
            <BannerCtaLine href="/realisations">Voir les réalisations</BannerCtaLine>
          </>
        }
      ></PageBanner>

      {/* Ce qui fait la différence */}
      <section className="bg-background" style={{ ...sectionStyle, borderTop: 0 }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ce qui fait la différence</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Un site web PME construit pour générer des clients
          </h2>
          <GrilleCartes items={features.map((f) => ({ titre: f.title, texte: f.desc }))} />
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ma méthode</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Création de site web en 4 étapes
          </h2>
          <GrilleEtapes items={steps.map((s) => ({ titre: s.title, texte: s.desc }))} />
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Investissement</div>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Combien coûte la création d&apos;un site web PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Un site web sérieux pour une PME coûte entre 1 500 et 5 000 €. En dessous, vous obtenez
            un template, pas un outil commercial. Au-dessus de 8 000 €, vous payez des frais de
            structure d&apos;une grande agence.{' '}
            <Link href="/blog/site-web-pme-prix-guide" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
              Guide complet des prix →
            </Link>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingTiers.map((t) => (
              <div key={t.label} className="rounded p-4 sm:p-6" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700, marginBottom: '0.75rem' }}>{t.label}</div>
                <div className="font-display font-extrabold mb-3" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>{t.price}</div>
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
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Création de site web PME : vos questions
          </h2>
          {/* Accordeon natif : la liste depliee pesait environ 1000 px sur
              telephone. Le schema FAQPage de la page reste inchange. */}
          <FaqListe items={faqs} />
        </div>
      </section>

      {/* Pour aller plus loin */}
      <section className="bg-background" style={{ ...sectionStyle, paddingBottom: '3rem' }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Pour aller plus loin</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)' }}>
            {(() => {
              const liens = [
                { label: 'Guide des prix : combien coûte un site web PME ?', href: '/blog/site-web-pme-prix-guide' },
                { label: 'Quand refondre votre site web ?', href: '/blog/refonte-site-web-quand-pourquoi' },
                { label: 'Ajouter le SEO après la création', href: '/services/seo' },
                { label: 'Voir le portfolio de réalisations', href: '/realisations' },
              ]
              return liens.map((link, i) => (
                <span key={link.href}>
                  <Link href={link.href} className="hover:text-[var(--brand)] transition-colors" style={{ color: 'var(--ink-2)' }}>
                    {link.label}
                  </Link>
                  {i < liens.length - 1 && ' · '}
                </span>
              ))
            })()}
          </p>
        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
