import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Community Management Lyon — Réseaux qui convertissent',
  description:
    'Gestion réseaux sociaux pour PME : stratégie éditoriale, création de contenu, community management. Transformez vos abonnés en clients. Contactez-moi.',
  alternates: { canonical: `${BASE_URL}/services/community-management` },
}

const platforms = [
  { name: 'Instagram', desc: 'Contenu visuel, stories et reels pour les marques B2C. Le canal de choix pour les commerces, restaurants, artisans et services à image forte.' },
  { name: 'LinkedIn', desc: 'Personal branding et lead generation B2B. Pour les consultants, dirigeants et PME qui vendent à d\'autres entreprises.' },
  { name: 'Facebook', desc: 'Communauté locale, annonces d\'événements et gestion de page. Toujours pertinent pour les commerces de proximité et la clientèle senior.' },
  { name: 'Reporting mensuel', desc: 'Tableau de bord lisible : portée, engagement, abonnés gagnés, leads générés. Ce qui compte, pas ce qui impressionne.' },
]

const steps = [
  {
    num: '01',
    title: 'Audit & stratégie',
    desc: 'Analyse de vos comptes actuels, de vos concurrents locaux et de votre audience cible. On définit ensemble les 2 canaux prioritaires, les objectifs mensuels et les indicateurs de succès.',
  },
  {
    num: '02',
    title: 'Ligne éditoriale',
    desc: 'Ton de voix, thèmes de contenu récurrents, formats adaptés à chaque plateforme et calendrier éditorial mensuel. La cohérence est la clé — le contenu aléatoire ne construit pas de communauté.',
  },
  {
    num: '03',
    title: 'Production & publication',
    desc: 'Création des visuels, rédaction des légendes et publication aux horaires optimaux. Chaque post est pensé pour générer de l\'engagement et renforcer votre image de marque.',
  },
  {
    num: '04',
    title: 'Engagement & reporting',
    desc: 'Réponse aux commentaires et messages, modération de la communauté, rapport mensuel des performances et plan du mois suivant. Vous restez impliqué autant que vous le souhaitez.',
  },
]

const pricingTiers = [
  {
    label: 'Pack Essentiel',
    price: 'À partir de 500 €/mois',
    desc: '2 réseaux sociaux, 12 publications par mois, création des visuels et textes, planning éditorial et rapport mensuel.',
    delay: 'Démarrage en 1 semaine',
  },
  {
    label: 'Pack Performance',
    price: 'À partir de 850 €/mois',
    desc: '3 réseaux sociaux, 20 publications par mois, stories, engagement actif, coordination avec des campagnes Meta Ads. Pour construire une communauté qui génère des leads.',
    delay: 'Démarrage en 1 semaine',
  },
  {
    label: 'Pack Influence locale',
    price: 'Sur devis',
    desc: 'Présence complète sur tous vos canaux, personal branding du dirigeant, production vidéo, partenariats avec influenceurs locaux et campagnes sponsorisées intégrées.',
    delay: 'Selon la stratégie',
  },
]

const faqs = [
  {
    question: 'Combien de publications par semaine sont nécessaires pour être visible sur les réseaux ?',
    answer:
      'La régularité compte plus que la fréquence. 3 publications par semaine bien ciblées et visuellement cohérentes valent mieux que 10 posts génériques. Sur LinkedIn, 2 à 3 publications par semaine suffisent pour bâtir une présence forte. Sur Instagram, 4 à 5 publications et quelques stories quotidiennes donnent les meilleurs résultats. On adapte le rythme à votre budget et à votre capacité à fournir de la matière (photos, actualités).',
  },
  {
    question: 'Créez-vous les visuels ou dois-je vous les fournir ?',
    answer:
      'Je crée tous les visuels dans le cadre de la prestation — templates graphiques basés sur votre charte, montages photos, infographies et couvertures de stories. Si vous avez des photos de votre activité (locaux, équipe, réalisations), c\'est un plus que j\'intègre dans le contenu. Si vous n\'en avez pas, je travaille avec des images libres de droits sélectionnées pour coller à votre univers.',
  },
  {
    question: 'Comment gérez-vous les commentaires négatifs ou les messages difficiles ?',
    answer:
      'Je modère les commentaires selon une charte de community management qu\'on établit ensemble. Pour les commentaires négatifs, la règle est toujours de répondre professionnellement et calmement — ignorer ou supprimer un commentaire légitime aggrave toujours la situation. Pour les cas sensibles (litige client, crise de réputation), je vous remonte l\'alerte immédiatement et on gère ensemble.',
  },
  {
    question: 'Les réseaux sociaux génèrent-ils vraiment des clients pour une PME locale ?',
    answer:
      'Oui, mais pas de la même façon que le SEO ou Google Ads. Les réseaux construisent la notoriété et la confiance sur votre zone locale — les gens vous voient régulièrement, s\'habituent à votre marque, puis font appel à vous le moment venu. Les résultats les plus directs viennent des offres ponctuelles, des événements et des campagnes Meta Ads coordonnées avec le contenu organique.',
  },
  {
    question: 'Je n\'ai aucun abonné pour l\'instant — est-il trop tôt pour faire appel à vous ?',
    answer:
      'Non, c\'est même le meilleur moment. Construire une communauté depuis zéro avec une bonne stratégie dès le départ est plus efficace que de corriger une présence existante mal positionnée. Les 3 à 6 premiers mois sont consacrés à poser les bases — identité visuelle cohérente, ton de voix défini, premiers 200 abonnés ciblés. Ensuite, la croissance s\'accélère.',
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

export default function CommunityManagementPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Community Management PME', description: 'Gestion professionnelle des réseaux sociaux pour PME.', path: '/services/community-management' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Community Management', path: '/services/community-management' }]),
        faqSchema,
      ]} />

      {/* Hero */}
      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            Service · Social Media PME
          </div>
          <h1 className="font-display font-extrabold mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: 'var(--ink)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Community management PME<br />
            <span style={{ color: 'var(--brand)' }}>une audience qui achète.</span>
          </h1>
          <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--ink-2)' }}>
            Vos réseaux sociaux gérés par un expert. Contenu régulier et qualitatif, stratégie
            orientée conversion — pas juste des likes. Une communauté locale qui vous reconnaît
            et vous recommande.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-display font-bold" style={{ color: 'var(--brand)' }}>×4</span>
            <span className="text-sm" style={{ color: 'var(--ink-2)' }}>engagement moyen vs comptes non gérés</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}>
              Audit réseaux gratuit
            </Link>
            <Link href="/services/publicite-en-ligne" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8 hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors" style={{ border: '1px solid var(--line)', color: 'var(--ink-2)' }}>
              Ajouter Meta Ads →
            </Link>
          </div>
        </div>
      </section>

      {/* Plateformes */}
      <section className="bg-background" style={{ ...sectionStyle, paddingTop: '0' }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Plateformes gérées</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Réseaux sociaux PME : les bons canaux, pas tous les canaux
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms.map((p) => (
              <div key={p.name} className="rounded-2xl p-4 sm:p-6" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
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
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Gestion de vos réseaux sociaux en 4 étapes
          </h2>
          <div className="grid grid-cols-2 gap-2" style={{ backgroundColor: 'var(--line)' }}>
            {steps.map((s) => (
              <div key={s.num} className="p-3 sm:p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-2)' }}>
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
            Combien coûte la gestion de réseaux sociaux pour une PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Un community management sérieux, c&apos;est une prestation mensuelle récurrente — pas un one-shot.
            La cohérence dans le temps est ce qui construit la notoriété locale. Les formules
            ci-dessous incluent la stratégie, la création et la publication.
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
            Community management PME — vos questions
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
              { label: 'Booster vos posts avec Meta Ads →', href: '/services/publicite-en-ligne' },
              { label: 'Créer une identité visuelle cohérente →', href: '/services/branding' },
              { label: 'Automatiser vos séquences de suivi →', href: '/services/automatisation-marketing' },
              { label: 'Demander un audit de vos réseaux →', href: '/audit-gratuit' },
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
            Vos réseaux, gérés comme<br />si vous l&apos;aviez fait vous-même.
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--ink-2)' }}>Stratégie + création + publication · Reporting mensuel · Sans engagement long terme</p>
          <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full font-medium text-sm h-12 px-8" style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}>
            Audit réseaux gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
