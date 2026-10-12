import type { Metadata } from 'next'
import Link from 'next/link'
import { Crosshair, Repeat, Search, Users } from 'lucide-react'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { GrilleCartes, GrilleEtapes, GrilleTarifs } from '@/components/sections/Grilles'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqListe } from '@/components/sections/FaqListe'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Publicité en Ligne PME · Google Ads & Meta Ads | 123 Digital',
  description:
    'Gestion Google Ads et Meta Ads pour PME : campagnes ciblées, ROI mesurable dès la 1ère semaine. Budget maîtrisé, reporting hebdomadaire, sans frais cachés.',
  alternates: { canonical: `${BASE_URL}/services/publicite-en-ligne` },
}

const platforms = [
  { name: 'Google Ads Search', desc: 'Apparaissez en premier quand vos clients cherchent activement vos services. Le canal le plus direct pour capter une intention d\'achat.' },
  { name: 'Meta Ads (Facebook & Instagram)', desc: 'Touchez votre audience idéale selon l\'âge, les intérêts et la localisation. Idéal pour la notoriété et les offres visuelles.' },
  { name: 'Retargeting', desc: 'Reconvertissez les visiteurs qui n\'ont pas contacté lors de leur première visite. Le coût d\'acquisition le plus bas de la publicité en ligne.' },
  { name: 'Tracking & Attribution', desc: 'Chaque euro est tracé. Appels, formulaires, achats : vous savez exactement d\'où viennent vos clients et combien ils coûtent.' },
]

const steps = [
  {
    num: '01',
    title: 'Audit & stratégie',
    desc: 'Analyse de votre marché, de vos concurrents et de vos objectifs. On définit ensemble le bon canal, le bon budget et les bons critères de succès avant de dépenser le premier euro.',
  },
  {
    num: '02',
    title: 'Création des campagnes',
    desc: 'Paramétrage des comptes, rédaction des annonces, sélection des mots-clés (dont les exclusions), définition des audiences et des enchères. Tout est pensé pour éviter les clics inutiles.',
  },
  {
    num: '03',
    title: 'Lancement & tests A/B',
    desc: 'Tests sur les visuels, les textes et les audiences. On apprend vite ce qui convertit, et on coupe ce qui ne convertit pas. Optimisation des enchères selon les données réelles.',
  },
  {
    num: '04',
    title: 'Optimisation continue',
    desc: 'Ajustements hebdomadaires basés sur la donnée. Rapport de performance clair chaque semaine avec le coût par lead, le ROAS et les recommandations pour le mois suivant.',
  },
]

const pricingTiers = [
  {
    label: 'Google Ads local',
    price: 'Honoraires à partir de 350 €/mois',
    desc: 'Gestion de 1 à 2 campagnes Google Ads pour cibler votre zone géographique. Budget médias recommandé : 500 à 1 000 €/mois en sus des honoraires.',
    delay: 'Premiers leads en moins de 2 semaines',
  },
  {
    label: 'Google Ads + Meta Ads',
    price: 'Honoraires à partir de 550 €/mois',
    desc: 'Gestion multi-canal : Google pour capter la demande existante, Meta pour créer de la demande. Budget médias recommandé : 800 à 1 500 €/mois.',
    delay: 'Premiers résultats en 1 semaine',
  },
  {
    label: 'Performance max & Shopping',
    price: 'Sur devis',
    desc: 'Pour les e-commerces et les campagnes à fort volume. Campagnes Performance Max, Google Shopping, remarketing dynamique et optimisation du feed produit.',
    delay: 'Selon la complexité du projet',
  },
]

const faqs = [
  {
    question: 'Quel budget minimum prévoir pour lancer des campagnes publicitaires en ligne ?',
    answer:
      'Je recommande un minimum de 500 €/mois en budget médias (ce que vous payez à Google ou Meta) pour obtenir des données statistiquement significatives et optimiser correctement les campagnes. En dessous de ce seuil, les résultats sont difficiles à interpréter et à améliorer. Mes honoraires de gestion s\'ajoutent à ce budget médias.',
  },
  {
    question: 'Google Ads ou Meta Ads, quel canal choisir pour ma PME ?',
    answer:
      'Google Ads capte une demande existante : la personne cherche déjà votre service. C\'est idéal pour les artisans, les professionnels de santé, les services urgents. Meta Ads (Facebook & Instagram) crée la demande en touchant des personnes susceptibles d\'être intéressées, excellent pour les restaurants, les commerces, les formations et les services qui se choisissent sur l\'image. Les deux combinés donnent presque toujours les meilleurs résultats.',
  },
  {
    question: 'Comment mesure-t-on qu\'une campagne publicitaire est rentable ?',
    answer:
      'On met en place un suivi des conversions complet : appels téléphoniques, soumissions de formulaires, achats en ligne. La métrique clé est le coût par acquisition (CPA) : ce que coûte un nouveau client. Si vous dépensez 30 € en publicité pour acquérir un client qui vous rapporte 300 €, votre ROAS est de 10 : très rentable. On ajuste les campagnes chaque semaine pour améliorer ce ratio.',
  },
  {
    question: 'Puis-je arrêter ou modifier mes campagnes à tout moment ?',
    answer:
      'Oui, sans pénalité. Vous pouvez augmenter, réduire ou couper le budget médias quand vous voulez. Pour la gestion, je travaille sans engagement à long terme au-delà d\'une période de rodage de 2 mois (nécessaire pour que les algorithmes apprennent et optimisent). Après ça, vous restez libre.',
  },
  {
    question: 'Faut-il obligatoirement une landing page dédiée ou ma page d\'accueil suffit ?',
    answer:
      'Une landing page dédiée multiplie généralement le taux de conversion par 2 à 5. La page d\'accueil parle de tout. La landing page ne parle que de l\'offre de l\'annonce, sans distraction. Je peux créer des landing pages optimisées dans le cadre de la gestion des campagnes, ou intégrer ça à une prestation de création de site.',
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

export default function PubliciteEnLignePage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Publicité en ligne PME · Google Ads & Meta Ads', description: 'Gestion de campagnes Google Ads et Meta Ads pour PME avec ROI mesurable.', path: '/services/publicite-en-ligne' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Publicité en ligne', path: '/services/publicite-en-ligne' }]),
        faqSchema,
      ]} />

      <PageBanner
        illustration={{ src: "/images/illustrations/service-publicite-en-ligne.webp", width: 800, height: 800 }}
        icone="megaphone"
        image={{ src: '/images/services/publicite-en-ligne.jpg', priority: true }}
        title="Publicité en ligne pour PME. ROI mesurable dès la 1ère semaine."
        highlight="ROI mesurable dès la 1ère semaine."
        sub="Google Ads et Meta Ads pilotés par la donnée. Chaque euro investi est tracé, optimisé et justifié. Fini les campagnes qui brûlent le budget sans résultat."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit campagnes gratuit</BannerCta>
            <BannerCtaLine href="/services/seo">Voir aussi le SEO</BannerCtaLine>
          </>
        }
      />

      {/* Plateformes */}
      <section className="bg-background" style={{ ...sectionStyle, borderTop: 0 }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Plateformes gérées</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Publicité en ligne multi-canal pour PME
          </h2>
          <GrilleCartes icones={[Search, Users, Repeat, Crosshair]} items={platforms.map((p) => ({ titre: p.name, texte: p.desc }))} />
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ma méthode</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Campagnes publicitaires PME en 4 étapes
          </h2>
          <GrilleEtapes illustrees items={steps.map((s) => ({ titre: s.title, texte: s.desc }))} />
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Investissement</div>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Combien coûte la gestion de publicité en ligne pour une PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Les tarifs ci-dessous correspondent aux honoraires de gestion. Le budget médias (ce que
            vous payez à Google ou Meta) est en sus et reste entièrement sous votre contrôle.{' '}
            <Link href="/blog/google-ads-pme-debuter" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
              Guide Google Ads pour débutants →
            </Link>
          </p>
          <GrilleTarifs items={pricingTiers} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-3xl">
          <div style={labelStyle}>Questions fréquentes</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Publicité en ligne PME : vos questions
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
                { label: 'Guide Google Ads PME · démarrer sans se ruiner', href: '/blog/google-ads-pme-debuter' },
                { label: 'Combiner avec le SEO pour durer', href: '/services/seo' },
                { label: 'Un site qui convertit vos clics', href: '/services/creation-site-web' },
                { label: 'Audit de vos campagnes existantes', href: '/audit-gratuit' },
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
