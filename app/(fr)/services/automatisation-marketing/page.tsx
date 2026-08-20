import type { Metadata } from 'next'
import Link from 'next/link'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BlocsDepliants } from '@/components/ui/BlocsDepliants'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Automatisation Marketing PME — Gagnez 5h/semaine',
  description:
    'Automatisez vos emails, CRM et relances clients pour générer des leads 24h/24. Automatisation marketing pour PME à Lyon par Maurice Timsit. Audit gratuit.',
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

const sectionStyle = { padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }
const labelStyle = {
  fontSize: '0.65rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--ink-2)',
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

      <PageBanner
        icone="zap"
        image={{ src: '/images/services/automatisation-marketing.jpg', priority: true }}
        title="Automatisation marketing PME. Des leads même quand vous dormez."
        highlight="Des leads même quand vous dormez."
        sub="Des systèmes qui travaillent pour votre PME 24 h/24 : qualification des leads, nurturing par email, CRM structuré. Votre pipeline tourne pendant que vous faites votre métier."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Voir comment ça fonctionne</BannerCta>
            <BannerCtaLine href="/blog/automatisation-marketing-pme-debutant">Lire le guide</BannerCtaLine>
          </>
        }
      >
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: 'oklch(0.985 0.003 150 / 78%)' }}>
          10 h gagnées par semaine en moyenne
        </p>
      </PageBanner>

      {/* Ce qu'on automatise */}
      <section className="bg-background" style={{ ...sectionStyle, borderTop: 0 }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ce qu&apos;on automatise</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Automatisation marketing PME : les tâches qui disparaissent
          </h2>
          <BlocsDepliants
            items={automations.map((a) => ({ titre: a.title, texte: a.desc }))}
          />
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ma méthode</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Mise en place de l&apos;automatisation en 4 étapes
          </h2>
          <BlocsDepliants
            items={steps.map((s) => ({ etiquette: s.num, titre: s.title, texte: s.desc }))}
          />
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Investissement</div>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Combien coûte l&apos;automatisation marketing pour une PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Un système d&apos;automatisation de base est généralement rentabilisé en 2 à 3 mois — entre
            le temps récupéré et les leads supplémentaires générés.{' '}
            <Link href="/blog/automatisation-marketing-pme-debutant" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
              Guide complet pour démarrer →
            </Link>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingTiers.map((t) => (
              <div key={t.label} className="rounded-2xl p-4 sm:p-6" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700, marginBottom: '0.75rem' }}>{t.label}</div>
                <div className="font-display font-extrabold mb-3" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>{t.price}</div>
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
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Automatisation marketing PME — vos questions
          </h2>
          {/* Accordeon natif : la liste depliee pesait environ 1000 px sur
              telephone. Le schema FAQPage de la page reste inchange. */}
          <div className="flex flex-col gap-1.5">
            {faqs.map(({ question, answer }, i) => (
              <details key={i} className="group rounded-xl" style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}>
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none font-extrabold" style={{ fontSize: '0.95rem', color: 'var(--ink)', padding: '0.85rem 1rem' }}>
                  {question}
                  <span aria-hidden className="shrink-0 transition-transform group-open:rotate-45" style={{ color: 'var(--brand)', fontSize: '1.2rem', lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.88rem', padding: '0 1rem 0.9rem' }}>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pour aller plus loin */}
      <section className="bg-background" style={{ ...sectionStyle, paddingBottom: '3rem' }}>
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
                className="hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                style={{ padding: '0.5rem 1rem', border: '1px solid var(--line)', color: 'var(--ink-2)', fontSize: '0.82rem', borderRadius: '0.25rem' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA />
    </>
  )
}
