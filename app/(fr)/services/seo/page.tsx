import type { Metadata } from 'next'
import Link from 'next/link'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { GrilleCartes, GrilleEtapes } from '@/components/sections/Grilles'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqListe } from '@/components/sections/FaqListe'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'SEO Lyon PME — Référencement naturel 1ère page Google',
  description:
    'Expert SEO pour PME à Lyon : audit technique, mots-clés locaux, contenu et netlinking. Passez en 1ère page Google durablement. Audit SEO gratuit.',
  alternates: { canonical: `${BASE_URL}/services/seo` },
}

const steps = [
  {
    num: '01',
    title: 'Audit SEO complet',
    desc: 'Analyse technique (vitesse, indexation, Core Web Vitals), audit contenu et analyse du profil de liens. Vous recevez un rapport clair avec les freins identifiés et les opportunités prioritaires.',
  },
  {
    num: '02',
    title: 'Stratégie de mots-clés',
    desc: 'Sélection des requêtes à fort potentiel commercial pour votre secteur et votre zone géographique. On cible les mots-clés que vos clients tapent réellement, pas ceux qui semblent évidents.',
  },
  {
    num: '03',
    title: 'Optimisation & contenu',
    desc: 'Corrections techniques, réécriture des balises, création de pages optimisées et maillage interne. Chaque action est priorisée par impact attendu sur votre trafic.',
  },
  {
    num: '04',
    title: 'Netlinking & suivi mensuel',
    desc: 'Acquisition de liens de qualité pour renforcer l\'autorité de votre domaine. Reporting mensuel transparent avec évolution des positions, trafic et conversions.',
  },
]

const pricingTiers = [
  {
    label: 'Audit SEO',
    price: 'À partir de 500 €',
    desc: 'Audit technique complet, rapport de mots-clés prioritaires et plan d\'action détaillé. Idéal avant de lancer un chantier SEO ou une refonte de site.',
    delay: 'Livré en 7 à 10 jours',
  },
  {
    label: 'Accompagnement SEO mensuel',
    price: 'À partir de 450 €/mois',
    desc: 'Suivi mensuel : optimisations, création de contenu ciblé, netlinking et rapport de performance. Résultats visibles en 3 à 6 mois selon la concurrence.',
    delay: 'Engagement 3 mois minimum',
  },
  {
    label: 'SEO + Création de contenu',
    price: 'À partir de 700 €/mois',
    desc: 'Tout l\'accompagnement mensuel plus la rédaction de 2 à 4 articles ou pages optimisées par mois. Pour accélérer l\'autorité thématique et le trafic organique.',
    delay: 'Engagement 3 mois minimum',
  },
]

const faqs = [
  {
    question: 'Quelle différence entre le SEO local et le SEO national pour une PME ?',
    answer:
      'Le SEO local cible les recherches géolocalisées ("consultant SEO Lyon", "plombier près de moi"). Il s\'appuie sur Google Business Profile, les pages locales et les citations dans les annuaires. Le SEO national vise des requêtes sans localisation et demande plus d\'autorité. Pour la majorité des PME, le SEO local est le levier le plus rentable et le plus rapide.',
  },
  {
    question: 'Le SEO vaut-il mieux que Google Ads sur le long terme ?',
    answer:
      'Les deux sont complémentaires, pas concurrents. Google Ads génère des leads immédiatement mais s\'arrête dès que vous coupez le budget. Le SEO prend 3 à 6 mois à démarrer mais génère du trafic continu sans coût au clic. Pour une PME, je recommande souvent les deux en parallèle au démarrage, puis de réduire les Ads à mesure que le SEO prend de l\'ampleur.',
  },
  {
    question: 'Mon site existant peut-il être amélioré en SEO ou faut-il tout refaire ?',
    answer:
      'Dans la majorité des cas, l\'amélioration progressive est plus rentable que la refonte. L\'audit identifie les correctifs techniques prioritaires (balises, vitesse, structure), les pages à réécrire et les nouvelles pages à créer. Une refonte n\'est recommandée que si le site a plus de 5 ans ou est construit sur une technologie incompatible avec un bon SEO.',
  },
  {
    question: 'Comment mesurez-vous les résultats de votre prestation SEO ?',
    answer:
      'Chaque mois, vous recevez un rapport avec : l\'évolution des positions sur les mots-clés cibles (via Google Search Console), l\'évolution du trafic organique (GA4), le nombre de leads générés par le canal organique, et les actions réalisées. Pas de jargon — des chiffres lisibles et comparés au mois précédent.',
  },
  {
    question: 'Mon secteur est très concurrentiel — le SEO peut-il vraiment m\'aider ?',
    answer:
      'Presque toujours oui, mais le délai est plus long et la stratégie plus fine. Dans un secteur concurrentiel, on cible d\'abord les requêtes de longue traîne (plus spécifiques, moins compétitives) pour construire l\'autorité, puis on monte progressivement vers les mots-clés principaux. L\'analyse de vos concurrents directs révèle presque toujours des opportunités inexploitées.',
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

export default function SeoPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'SEO & Référencement naturel PME', description: 'Stratégies SEO sur mesure pour positionner les PME en tête des résultats Google.', path: '/services/seo' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'SEO & Référencement', path: '/services/seo' }]),
        faqSchema,
      ]} />

      <PageBanner
        icone="search"
        image={{ src: '/images/services/seo.jpg', priority: true }}
        title="SEO & référencement naturel. 1ère page Google pour votre PME."
        highlight="1ère page Google pour votre PME."
        sub="Le premier résultat Google capte 32 % des clics. Je positionne votre PME en tête des recherches de vos clients : du trafic qualifié, durable, sans dépendre de la publicité."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit SEO gratuit</BannerCta>
            <BannerCtaLine href="/services/creation-site-web">Créer d&apos;abord votre site</BannerCtaLine>
          </>
        }
      >
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-2)' }}>
          +150 % de trafic organique en moyenne après 6 mois
        </p>
      </PageBanner>

      {/* Méthodologie */}
      <section className="bg-background" style={{ ...sectionStyle, borderTop: 0 }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ma méthode SEO</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Référencement naturel PME en 4 étapes
          </h2>
          <GrilleEtapes items={steps.map((s) => ({ titre: s.title, texte: s.desc }))} />
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ce qui est inclus</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Un SEO PME complet, sans zone grise
          </h2>
          <GrilleCartes
            items={[
              { title: 'Audit SEO technique', desc: 'Vitesse, Core Web Vitals, indexation, balises, structure de liens — tout ce que Google évalue en coulisses.' },
              { title: 'Stratégie de mots-clés locaux', desc: 'Requêtes ciblées que vos clients tapent réellement, avec volume et concurrence analysés.' },
              { title: 'Optimisation on-page', desc: 'Balises title, meta description, H1-H3, données structurées et contenu réécrit pour Google et les humains.' },
              { title: 'Création de contenu SEO', desc: 'Pages locales, articles de blog ciblés et pages service pensées pour capter du trafic qualifié.' },
              { title: 'Netlinking qualitatif', desc: 'Liens entrants depuis des sources pertinentes et locales pour renforcer l\'autorité de votre domaine.' },
              { title: 'Rapport mensuel transparent', desc: 'Positions, trafic, leads — chiffres clairs, sans jargon, avec les actions du mois suivant.' },
            ].map((f) => ({ titre: f.title, texte: f.desc }))}
          />
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Investissement</div>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Combien coûte un accompagnement SEO pour une PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Un SEO sérieux ne s&apos;improvise pas en un mois. Les formules ci-dessous reflètent un
            investissement réaliste pour des résultats durables — pas du SEO au rabais qui disparaît
            à la prochaine mise à jour de Google.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingTiers.map((t) => (
              <div key={t.label} className="rounded p-4 sm:p-6" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}>
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
            SEO pour PME — vos questions
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
                { label: 'Guide SEO local pour PME — étape par étape', href: '/blog/seo-local-pme-guide-complet' },
                { label: 'Compléter avec la publicité en ligne', href: '/services/publicite-en-ligne' },
                { label: 'Votre site est optimisé ? Vérifiez', href: '/services/creation-site-web' },
                { label: 'Demander un audit SEO gratuit', href: '/audit-gratuit' },
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
