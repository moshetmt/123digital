import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Publicité en Ligne PME — Google Ads & Meta Ads | 123Digital',
  description:
    'Gestion Google Ads et Meta Ads pour PME : campagnes ciblées, ROI mesurable dès la 1ère semaine. Budget maîtrisé, reporting hebdomadaire, sans frais cachés.',
  alternates: { canonical: `${BASE_URL}/services/publicite-en-ligne` },
}

const platforms = [
  { name: 'Google Ads Search', desc: 'Apparaissez en premier quand vos clients cherchent activement vos services. Le canal le plus direct pour capter une intention d\'achat.' },
  { name: 'Meta Ads (Facebook & Instagram)', desc: 'Touchez votre audience idéale selon l\'âge, les intérêts et la localisation. Idéal pour la notoriété et les offres visuelles.' },
  { name: 'Retargeting', desc: 'Reconvertissez les visiteurs qui n\'ont pas contacté lors de leur première visite. Le coût d\'acquisition le plus bas de la publicité en ligne.' },
  { name: 'Tracking & Attribution', desc: 'Chaque euro est tracé. Appels, formulaires, achats — vous savez exactement d\'où viennent vos clients et combien ils coûtent.' },
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
    desc: 'Tests sur les visuels, les textes et les audiences. On apprend vite ce qui convertit — et on coupe ce qui ne convertit pas. Optimisation des enchères selon les données réelles.',
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
    question: 'Google Ads ou Meta Ads — quel canal choisir pour ma PME ?',
    answer:
      'Google Ads capte une demande existante : la personne cherche déjà votre service. C\'est idéal pour les artisans, les professionnels de santé, les services urgents. Meta Ads (Facebook & Instagram) crée la demande en touchant des personnes susceptibles d\'être intéressées — excellent pour les restaurants, les commerces, les formations et les services qui se choisissent sur l\'image. Les deux combinés donnent presque toujours les meilleurs résultats.',
  },
  {
    question: 'Comment mesure-t-on qu\'une campagne publicitaire est rentable ?',
    answer:
      'On met en place un suivi des conversions complet : appels téléphoniques, soumissions de formulaires, achats en ligne. La métrique clé est le coût par acquisition (CPA) — ce que coûte un nouveau client. Si vous dépensez 30 € en publicité pour acquérir un client qui vous rapporte 300 €, votre ROAS est de 10 : très rentable. On ajuste les campagnes chaque semaine pour améliorer ce ratio.',
  },
  {
    question: 'Puis-je arrêter ou modifier mes campagnes à tout moment ?',
    answer:
      'Oui, sans pénalité. Vous pouvez augmenter, réduire ou couper le budget médias quand vous voulez. Pour la gestion, je travaille sans engagement à long terme au-delà d\'une période de rodage de 2 mois (nécessaire pour que les algorithmes apprennent et optimisent). Après ça, vous restez libre.',
  },
  {
    question: 'Faut-il obligatoirement une landing page dédiée ou ma page d\'accueil suffit ?',
    answer:
      'Une landing page dédiée multiplie généralement le taux de conversion par 2 à 5. La page d\'accueil parle de tout — la landing page ne parle que de l\'offre de l\'annonce, sans distraction. Je peux créer des landing pages optimisées dans le cadre de la gestion des campagnes, ou intégrer ça à une prestation de création de site.',
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

export default function PubliciteEnLignePage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Publicité en ligne PME — Google Ads & Meta Ads', description: 'Gestion de campagnes Google Ads et Meta Ads pour PME avec ROI mesurable.', path: '/services/publicite-en-ligne' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Publicité en ligne', path: '/services/publicite-en-ligne' }]),
        faqSchema,
      ]} />

      {/* Hero */}
      <section className="bg-background" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            Service · Google Ads · Meta Ads
          </div>
          <h1 className="font-display font-extrabold mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: 'var(--ink)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Publicité en ligne pour PME<br />
            <span style={{ color: 'var(--brand)' }}>ROI mesurable dès la 1ère semaine.</span>
          </h1>
          <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--ink-2)' }}>
            Google Ads et Meta Ads pilotés par la donnée. Chaque euro investi est tracé,
            optimisé et justifié. Fini les campagnes qui brûlent le budget sans résultat.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-display font-bold" style={{ color: 'var(--brand)' }}>×3</span>
            <span className="text-sm" style={{ color: 'var(--ink-2)' }}>retour sur investissement publicitaire moyen</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}>
              Audit campagnes gratuit
            </Link>
            <Link href="/services/seo" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8 hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors" style={{ border: '1px solid var(--line)', color: 'var(--ink-2)' }}>
              Voir aussi le SEO →
            </Link>
          </div>
        </div>
      </section>

      {/* Plateformes */}
      <section className="bg-background" style={{ ...sectionStyle, paddingTop: '0' }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Plateformes gérées</div>
          <h2 className="font-display font-extrabold mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Publicité en ligne multi-canal pour PME
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms.map((p) => (
              <div key={p.name} className="rounded-2xl p-7" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: 'var(--brand)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h3 className="font-display font-extrabold text-base mb-2" style={{ color: 'var(--ink)' }}>{p.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ma méthode</div>
          <h2 className="font-display font-extrabold mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Campagnes publicitaires PME en 4 étapes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {steps.map((s) => (
              <div key={s.num} className="p-8" style={{ backgroundColor: 'var(--surface-2)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--brand)', fontWeight: 700, marginBottom: '1rem' }}>{s.num}</div>
                <h3 className="font-display font-extrabold mb-3" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{s.title}</h3>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingTiers.map((t) => (
              <div key={t.label} className="rounded-2xl p-7" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700, marginBottom: '0.75rem' }}>{t.label}</div>
                <div className="font-display font-extrabold mb-3" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>{t.price}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>{t.desc}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', fontWeight: 600 }}>{t.delay}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-3xl">
          <div style={labelStyle}>Questions fréquentes</div>
          <h2 className="font-display font-extrabold mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Publicité en ligne PME — vos questions
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
                <dt className="font-display font-extrabold mb-3" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{question}</dt>
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
              { label: 'Guide Google Ads PME — démarrer sans se ruiner', href: '/blog/google-ads-pme-debuter' },
              { label: 'Combiner avec le SEO pour durer →', href: '/services/seo' },
              { label: 'Un site qui convertit vos clics →', href: '/services/creation-site-web' },
              { label: 'Audit de vos campagnes existantes →', href: '/audit-gratuit' },
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
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.025em' }}>
            Des clients qualifiés<br />dès la première semaine.
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--ink-2)' }}>Budget maîtrisé · Reporting hebdomadaire · Sans engagement long terme</p>
          <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}>
            Analyser mes campagnes gratuitement
          </Link>
        </div>
      </section>
    </>
  )
}
