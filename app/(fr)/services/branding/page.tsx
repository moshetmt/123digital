import type { Metadata } from 'next'
import Link from 'next/link'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { GrilleCartes, GrilleEtapes } from '@/components/sections/Grilles'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqListe } from '@/components/sections/FaqListe'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Branding & Identité Visuelle PME — Logo & Charte | 123Digital',
  description:
    'Création d\'identité visuelle pour PME : logo, charte graphique, positionnement de marque. Une image cohérente et mémorable qui inspire confiance. Devis en 24h.',
  alternates: { canonical: `${BASE_URL}/services/branding` },
}

const deliverables = [
  { title: 'Logo & déclinaisons', desc: 'Logo principal + versions alternatives (horizontal, vertical, icône), livrés dans tous les formats web et print (SVG, PNG, PDF, EPS).' },
  { title: 'Charte graphique', desc: 'Palette de couleurs, typographies, règles d\'utilisation et exemples d\'application — pour que votre image reste cohérente sur tous les supports.' },
  { title: 'Positionnement de marque', desc: 'Territoire de marque, promesse client, valeurs et différenciation. Le fondement stratégique qui donne du sens à votre identité visuelle.' },
  { title: 'Copywriting de marque', desc: 'Tagline, texte "à propos", valeurs formulées — les mots qui parlent à vos clients et vous distinguent de la concurrence.' },
]

const steps = [
  {
    num: '01',
    title: 'Stratégie de marque',
    desc: 'On commence par comprendre votre positionnement, votre cible et vos concurrents. Cette étape définit les axes créatifs avant qu\'un seul trait soit tracé — c\'est ce qui rend un logo signifiant, pas juste joli.',
  },
  {
    num: '02',
    title: 'Exploration créative',
    desc: 'Je vous présente 2 à 3 directions visuelles distinctes avec leurs justifications stratégiques. Vous choisissez la direction qui vous ressemble et qu\'on affine ensemble.',
  },
  {
    num: '03',
    title: 'Affinement & brand book',
    desc: 'On perfectionne la direction retenue : couleurs définitives, typographies, variantes du logo. Le brand book documente tout pour une application cohérente dans le temps.',
  },
  {
    num: '04',
    title: 'Livraison & application',
    desc: 'Tous les fichiers sources (vous êtes propriétaire). Application sur les premiers supports : site web, réseaux sociaux, carte de visite. Formation à l\'utilisation de votre charte.',
  },
]

const pricingTiers = [
  {
    label: 'Logo professionnel',
    price: 'À partir de 800 €',
    desc: 'Logo sur mesure avec 2 directions créatives initiales, 2 rounds de retouches inclus. Livraison dans tous les formats. Vous êtes propriétaire des fichiers sources.',
    delay: '10 à 14 jours',
  },
  {
    label: 'Identité visuelle complète',
    price: 'À partir de 2 000 €',
    desc: 'Logo + charte graphique complète (couleurs, typos, règles) + brand book + positionnement de marque. La fondation pour une présence cohérente sur tous les canaux.',
    delay: '3 semaines',
  },
  {
    label: 'Identité + supports',
    price: 'À partir de 2 800 €',
    desc: 'Tout le pack identité complète + application sur les premiers supports : site web, templates réseaux sociaux, carte de visite, signature email.',
    delay: '4 à 5 semaines',
  },
]

const faqs = [
  {
    question: 'Quelle est la différence entre un logo et une identité visuelle complète ?',
    answer:
      'Un logo, c\'est le symbole graphique de votre marque. L\'identité visuelle, c\'est tout ce qui constitue votre "look" : le logo, les couleurs de marque, les typographies, les règles d\'utilisation, les templates. Un logo seul sans charte, ça produit souvent des incohérences — chaque support est différent, l\'effet de marque ne se construit pas. Pour une PME sérieuse, l\'identité complète est l\'investissement qui tient dans le temps.',
  },
  {
    question: 'J\'ai déjà un logo, pouvez-vous juste créer la charte graphique ?',
    answer:
      'Oui, si le logo existant est de qualité suffisante (vecteur propre, police correcte). On évalue ensemble si votre logo actuel est une bonne base. Si oui, je construis la charte autour. Si le logo présente des problèmes structurels, je vous le dis honnêtement — parfois il vaut mieux repartir sur une base saine que de construire une charte sur un logo bancal.',
  },
  {
    question: 'En quoi un bon branding influence-t-il mes ventes ?',
    answer:
      'Une identité cohérente crée de la reconnaissance et de la confiance. Les clients se souviennent de vous, vous recommandent plus facilement et perçoivent plus de valeur dans votre offre — ce qui vous permet de justifier des tarifs plus élevés que vos concurrents. Un rebranding bien mené génère souvent une hausse du panier moyen avant même de toucher à l\'acquisition. C\'est un investissement qui se rentabilise rapidement si votre offre est solide.',
  },
  {
    question: 'Les fichiers sources du logo m\'appartiennent-ils après la prestation ?',
    answer:
      'Oui, 100%. Je livre tous les fichiers sources — AI (Adobe Illustrator), EPS, SVG, PNG en plusieurs résolutions, PDF. Vous êtes propriétaire de votre identité visuelle et pouvez travailler avec n\'importe quel autre prestataire ensuite. Je ne pratique pas la rétention de fichiers pour vous fidéliser de force.',
  },
  {
    question: 'Travaillez-vous aussi sur les supports de communication (flyers, kakemonos, etc.) ?',
    answer:
      'Oui, dans le cadre du pack "Identité + supports" ou en option sur les autres formules. Je crée cartes de visite, flyers, présentations PowerPoint, kakemonos et tous les supports print ou digitaux dans le respect de votre charte. C\'est la cohérence de l\'ensemble qui rend une marque forte.',
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

export default function BrandingPage() {
  return (
    <>
      <JsonLd schema={[
        serviceSchema({ name: 'Branding & Identité Visuelle PME', description: 'Création d\'identité visuelle et positionnement de marque pour PME.', path: '/services/branding' }),
        breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Branding & Identité', path: '/services/branding' }]),
        faqSchema,
      ]} />

      <PageBanner
        icone="palette"
        image={{ src: '/images/services/branding.jpg', priority: true }}
        title="Branding & identité visuelle PME. Une image qui inspire confiance."
        highlight="Une image qui inspire confiance."
        sub="Votre identité visuelle est le premier filtre de confiance de vos prospects. Des identités de marque cohérentes sur tous les supports, du site web aux réseaux sociaux."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Discuter de mon projet</BannerCta>
            <BannerCtaLine href="/realisations">Voir les réalisations</BannerCtaLine>
          </>
        }
      ></PageBanner>

      {/* Livrables */}
      <section className="bg-background" style={{ ...sectionStyle, borderTop: 0 }}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Ce que vous recevez</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Identité visuelle PME complète et cohérente
          </h2>
          <GrilleCartes items={deliverables.map((d) => ({ titre: d.title, texte: d.desc }))} />
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Mon processus</div>
          <h2 className="font-display font-extrabold mb-5 sm:mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Création d&apos;identité visuelle en 4 étapes
          </h2>
          <GrilleEtapes items={steps.map((s) => ({ titre: s.title, texte: s.desc }))} />
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-background" style={sectionStyle}>
        <div className="mx-auto max-w-5xl">
          <div style={labelStyle}>Investissement</div>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Combien coûte un branding professionnel pour une PME ?
          </h2>
          <p className="mb-10 max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Un logo sérieux commence à 800 €. En dessous, vous obtenez un résultat générique issu
            d&apos;un outil IA ou d&apos;un freelance junior. Ce n&apos;est pas un jugement — c&apos;est
            ce que vous verrez en comparant les résultats sur le long terme.
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
            Branding PME — vos questions
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
                { label: 'Voir les réalisations de branding', href: '/realisations' },
                { label: 'Appliquer votre identité sur un site web', href: '/services/creation-site-web' },
                { label: 'Gérer votre image sur les réseaux', href: '/services/community-management' },
                { label: 'Qui je suis — à propos', href: '/a-propos' },
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
