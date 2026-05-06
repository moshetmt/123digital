import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Automatisation Marketing PME — Leads 24h/24 sans effort | 123Digital',
  description:
    'Automatisation marketing pour PME : emails automatiques, CRM, funnels, rappels clients. Gagnez 10h/semaine et générez des leads même quand vous dormez.',
  alternates: { canonical: `${BASE_URL}/services/automatisation-marketing` },
}

const automations = [
  { title: 'Emailing & séquences', desc: 'Séquences de nurturing qui guident vos prospects vers l\'achat sans action manuelle : bienvenue, relance devis, suivi après devis, fidélisation.' },
  { title: 'CRM setup', desc: 'HubSpot, Brevo ou Notion — pipeline commercial structuré pour ne plus perdre de lead. Vous voyez où en est chaque prospect à tout moment.' },
  { title: 'Funnels de conversion', desc: 'Parcours client complet de la landing page à la prise de RDV, 100% automatisé. Chaque étape est optimisée pour maximiser le taux de conversion.' },
  { title: 'Rappels & réduction no-shows', desc: 'SMS et emails de rappel automatiques avant les rendez-vous. Réduit les absences de 60 à 70% — mesurable dès la première semaine.' },
  { title: 'Make.com / n8n / Zapier', desc: 'Connexions sur mesure entre vos outils existants : formulaire site → CRM, paiement → notification Slack, avis Google → tableau de bord.' },
  { title: 'GA4 & dashboards', desc: 'Tableau de bord en temps réel pour piloter votre croissance à la donnée — sans passer 2h dans Google Analytics chaque semaine.' },
]

const steps = [
  {
    num: '01',
    title: 'Audit des processus',
    desc: 'On cartographie vos flux actuels : comment arrivent vos leads, comment vous les qualifiez, comment vous les suivez. Cette étape révèle les tâches répétitives à automatiser en priorité.',
  },
  {
    num: '02',
    title: 'Architecture du système',
    desc: 'Sélection des outils adaptés à votre budget et à votre structure. Je ne recommande pas les outils les plus chers mais les plus adaptés — souvent des solutions gratuites ou à moins de 50 €/mois.',
  },
  {
    num: '03',
    title: 'Construction des séquences',
    desc: 'Création des emails, triggers, conditions et intégrations selon votre parcours client réel. Chaque automation est testée sur des scénarios réels avant d\'être mise en production.',
  },
  {
    num: '04',
    title: 'Formation & maintenance',
    desc: 'Formation à la supervision et aux ajustements — vous n\'avez pas besoin de moi pour modifier un email ou ajouter une étape. Documentation complète livrée avec chaque projet.',
  },
]

const pricingTiers = [
  {
    label: 'Pack Démarrage',
    price: 'À partir de 600 €',
    desc: 'Mise en place d\'un système d\'automatisation de base : email de bienvenue, relance devis, rappel de rendez-vous. Outils inclus : Brevo ou HubSpot Free.',
    delay: 'Opérationnel en 1 à 2 semaines',
  },
  {
    label: 'Pack Croissance',
    price: 'À partir de 1 200 €',
    desc: 'Système complet : nurturing multi-étapes, CRM configuré, intégrations entre vos outils, funnels de conversion et tableau de bord GA4. ROI généralement visible en moins de 3 mois.',
    delay: 'Opérationnel en 3 à 4 semaines',
  },
  {
    label: 'Maintenance mensuelle',
    price: 'À partir de 150 €/mois',
    desc: 'Suivi, optimisation et ajustements de vos automations existantes. Ajout de nouvelles séquences, mise à jour des intégrations et rapport de performance mensuel.',
    delay: 'Continu',
  },
]

const faqs = [
  {
    question: 'Ai-je besoin d\'un CRM pour commencer à automatiser mon marketing ?',
    answer:
      'Non, pas forcément. Les automations les plus impactantes pour une PME (rappels de rendez-vous, relance devis, email de bienvenue) peuvent fonctionner avec des outils simples comme Brevo ou même Google Sheets + Make. Le CRM devient utile quand vous avez plus de 20 à 30 leads actifs à suivre simultanément. On commence toujours par ce qui rapporte le plus vite, pas par l\'outil le plus complet.',
  },
  {
    question: 'Quels outils d\'automatisation utilisez-vous et pourquoi ?',
    answer:
      'Je sélectionne les outils selon votre budget et votre cas d\'usage, pas selon ma commission. Pour l\'emailing : Brevo (excellent rapport qualité/prix pour les PME françaises). Pour les intégrations : Make.com (plus puissant que Zapier au même prix). Pour le CRM : HubSpot Free pour commencer, Pipedrive ou Notion si le budget est limité. Je ne recommande jamais des outils à 500 €/mois à une PME qui commence.',
  },
  {
    question: 'L\'automatisation est-elle accessible pour une très petite structure (artisan, indépendant) ?',
    answer:
      'Oui, et c\'est souvent là que le ROI est le plus visible. Un artisan qui automatise ses rappels de rendez-vous économise immédiatement les no-shows (jusqu\'à 70% de réduction). Un indépendant qui automatise sa relance devis augmente son taux de signature sans rien faire de plus. Les premières automations peuvent être mises en place en moins d\'une journée avec des outils gratuits.',
  },
  {
    question: 'Comment s\'assurer que mes emails automatiques ne tombent pas dans les spams ?',
    answer:
      'La délivrabilité dépend de plusieurs facteurs techniques : authentification SPF, DKIM et DMARC du domaine, réputation de l\'expéditeur, qualité de la liste et contenu des emails. Je configure ces éléments lors de la mise en place et je surveille les taux d\'ouverture et de rebond. Un bon système d\'automatisation commence avec des taux d\'ouverture de 25 à 40% — en dessous, il faut investiguer.',
  },
  {
    question: 'Qu\'est-ce qu\'un funnel de vente automatisé concrètement ?',
    answer:
      'C\'est le parcours qu\'un prospect fait depuis sa première interaction avec vous jusqu\'à l\'achat — entièrement automatisé. Exemple : visite votre site → remplit un formulaire → reçoit immédiatement un email avec votre brochure → 2 jours plus tard reçoit un email de témoignage client → 5 jours plus tard reçoit une invitation à un appel de 20 min → prend RDV via Calendly → reçoit un rappel la veille. Tout ça se passe sans que vous leviez le petit doigt.',
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

const sectionStyle = { padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }
const labelStyle = {
  fontSize: '0.65rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'rgba(225,224,204,0.5)',
  fontWeight: 700,
  marginBottom: '1.5rem',
}

export default function AutomatisationMarketingPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Automatisation Marketing PME', description: 'Systèmes d\'automatisation marketing pour PME : emailing, CRM, funnels, intégrations.', path: '/services/automatisation-marketing' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Automatisation Marketing', path: '/services/automatisation-marketing' }]),
        faqSchema,
      ]} />

      {/* Hero */}
      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Service · Automatisation Marketing
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Automatisation marketing PME<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>des leads même quand vous dormez.</span>
          </h1>
          <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            Je construis des systèmes marketing qui travaillent pour votre PME 24h/24.
            Qualification automatique des leads, nurturing par email, CRM structuré —
            votre pipeline commercial tourne en autonomie pendant que vous faites votre métier.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-display font-bold" style={{ color: '#00FF87' }}>10h</span>
            <span className="text-sm" style={{ color: 'rgba(225,224,204,0.5)' }}>gagnées par semaine en moyenne</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
              Voir comment ça fonctionne
            </Link>
            <Link href="/blog/automatisation-marketing-pme-debutant" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8 hover:border-[#00FF87] hover:text-[#00FF87] transition-colors" style={{ border: '1px solid rgba(225,224,204,0.2)', color: 'rgba(225,224,204,0.7)' }}>
              Lire le guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Ce qu'on automatise */}
      <section className="bg-black" style={{ ...sectionStyle, paddingTop: '0' }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ce qu&apos;on automatise</div>
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Automatisation marketing PME : les tâches qui disparaissent
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

      {/* Méthodologie */}
      <section className="bg-black" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ma méthode</div>
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Mise en place de l&apos;automatisation en 4 étapes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
            {steps.map((s) => (
              <div key={s.num} className="p-8" style={{ backgroundColor: '#080808' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(225,224,204,0.3)', fontWeight: 700, marginBottom: '1rem' }}>{s.num}</div>
                <h3 className="font-display font-normal mb-3" style={{ fontSize: '1.1rem', color: '#E1E0CC' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(225,224,204,0.6)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-black" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Investissement</div>
          <h2 className="font-display font-normal mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Combien coûte l&apos;automatisation marketing pour une PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'rgba(225,224,204,0.6)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Un système d&apos;automatisation de base est généralement rentabilisé en 2 à 3 mois — entre
            le temps récupéré et les leads supplémentaires générés.{' '}
            <Link href="/blog/automatisation-marketing-pme-debutant" style={{ color: '#00FF87', textDecoration: 'underline' }}>
              Guide complet pour démarrer →
            </Link>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingTiers.map((t) => (
              <div key={t.label} className="rounded-2xl p-7" style={{ backgroundColor: '#212121', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00FF87', fontWeight: 700, marginBottom: '0.75rem' }}>{t.label}</div>
                <div className="font-display font-normal mb-3" style={{ fontSize: '1.3rem', color: '#E1E0CC' }}>{t.price}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#9ca3af' }}>{t.desc}</p>
                <div style={{ fontSize: '0.75rem', color: 'rgba(225,224,204,0.4)', fontWeight: 600 }}>{t.delay}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black" style={sectionStyle}>
        <div className="mx-auto max-w-3xl">
          <div style={labelStyle}>Questions fréquentes</div>
          <h2 className="font-display font-normal mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#E1E0CC', letterSpacing: '-0.02em' }}>
            Automatisation marketing PME — vos questions
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(225,224,204,0.08)', paddingTop: '2rem' }}>
                <dt className="font-display font-normal mb-3" style={{ fontSize: '1.05rem', color: '#E1E0CC' }}>{question}</dt>
                <dd style={{ color: 'rgba(225,224,204,0.65)', lineHeight: 1.75, fontSize: '0.95rem' }}>{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pour aller plus loin */}
      <section className="bg-black" style={{ ...sectionStyle, paddingBottom: '3rem' }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Pour aller plus loin</div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Guide automatisation marketing pour PME →', href: '/blog/automatisation-marketing-pme-debutant' },
              { label: 'Générer des leads avec la publicité →', href: '/services/publicite-en-ligne' },
              { label: 'SEO pour un trafic organique durable →', href: '/services/seo' },
              { label: 'Discuter de votre cas →', href: '/audit-gratuit' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#00FF87] hover:border-[#00FF87] transition-colors"
                style={{ padding: '0.5rem 1rem', border: '1px solid rgba(225,224,204,0.12)', color: 'rgba(225,224,204,0.6)', fontSize: '0.82rem', borderRadius: '0.25rem' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-black" style={{ padding: '4rem 1.5rem 7rem', borderTop: '1px solid rgba(225,224,204,0.06)', textAlign: 'center' }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display font-normal mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#E1E0CC', letterSpacing: '-0.025em' }}>
            Votre marketing en pilote automatique.<br />
            <span style={{ color: 'rgba(225,224,204,0.55)' }}>Vous, sur votre métier.</span>
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(225,224,204,0.5)' }}>Système opérationnel en 1 à 3 semaines · Formation incluse · ROI en 2 à 3 mois</p>
          <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: '#DEDBC8', color: '#000' }}>
            Analyser mes processus gratuitement
          </Link>
        </div>
      </section>
    </>
  )
}
