import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, localBusinessSchema, serviceSchema } from '@/lib/schema'
import { allVilles, villesARA, villeInsights } from '@/data/villes'
import { services } from '@/data/services'

interface PageProps {
  params: Promise<{ ville: string; service: string }>
}

// ─── Service content map ──────────────────────────────────────────────────────

const serviceContent: Record<
  string,
  {
    tagline: (ville: string) => string
    intro: (ville: string) => string
    promise: string
    stat: string
    statLabel: string
    steps: Array<{ num: string; title: string; desc: string }>
    faqs: Array<{ q: (ville: string) => string; a: (ville: string) => string }>
  }
> = {
  'creation-site-web': {
    tagline: (v) => `Un site web qui convertit vos visiteurs en clients à ${v}.`,
    intro: (v) =>
      `Les PME de ${v} ont besoin d'un site rapide, bien référencé et pensé pour transformer les visiteurs en appels et en devis. Je conçois des sites web sur mesure pour les entreprises de ${v} — du design à la mise en ligne en moins de 4 semaines.`,
    promise: 'Livré en moins de 4 semaines',
    stat: '3×',
    statLabel: 'plus de contacts générés en moyenne',
    steps: [
      { num: '01', title: 'Cadrage & stratégie', desc: 'Analyse de vos objectifs, de votre concurrence locale et de vos clients cibles à ${v}.' },
      { num: '02', title: 'Design & maquettes', desc: 'Maquettes sur mesure, alignées sur votre image de marque et optimisées pour la conversion.' },
      { num: '03', title: 'Développement', desc: 'Site rapide (95+ PageSpeed), responsive, sécurisé HTTPS, prêt pour le SEO.' },
      { num: '04', title: 'Mise en ligne & formation', desc: 'Lancement, formation à la mise à jour et suivi des performances pendant 30 jours.' },
    ],
    faqs: [
      {
        q: (v) => `Combien coûte un site web professionnel pour une PME à ${v} ?`,
        a: (v) =>
          `Un site vitrine professionnel à ${v} est proposé à partir de 1 500 € selon la complexité. Ce tarif inclut le design sur mesure, le développement, l'optimisation SEO on-page et la formation à la mise à jour. Un site e-commerce démarre à partir de 2 500 €.`,
      },
      {
        q: (v) => `Combien de temps pour créer un site web pour mon entreprise à ${v} ?`,
        a: (v) =>
          `Le délai moyen de création est de 3 à 4 semaines pour un site vitrine à ${v} : 1 semaine de cadrage et maquettes, 2 semaines de développement, 1 semaine de retouches et mise en ligne. Un site e-commerce prend 5 à 8 semaines.`,
      },
      {
        q: (v) => `Mon site sera-t-il bien référencé sur Google à ${v} ?`,
        a: (v) =>
          `Chaque site que je crée est optimisé SEO dès le départ : structure des balises, vitesse de chargement, données structurées, pages géolocalisées pour ${v}. C'est une base solide pour que Google vous trouve rapidement.`,
      },
    ],
  },
  seo: {
    tagline: (v) => `Soyez en première page de Google pour vos clients à ${v}.`,
    intro: (v) =>
      `Le premier résultat Google capte 32% des clics. J'aide les PME de ${v} à se positionner durablement sur les requêtes de leurs clients — sans dépendre de la publicité. SEO technique, contenu local et netlinking adaptés au marché de ${v}.`,
    promise: 'Résultats visibles en 3 à 6 mois',
    stat: '+150%',
    statLabel: 'trafic organique moyen après 6 mois',
    steps: [
      { num: '01', title: 'Audit SEO complet', desc: 'Analyse technique, contenu et profil de liens. Identification des freins et opportunités locales.' },
      { num: '02', title: 'Stratégie de mots-clés', desc: 'Sélection des requêtes à fort potentiel pour votre secteur et votre zone géographique.' },
      { num: '03', title: 'Optimisation & contenu', desc: 'Corrections techniques, création de contenu optimisé, maillage interne et pages locales.' },
      { num: '04', title: 'Netlinking & suivi', desc: 'Acquisition de liens de qualité, reporting mensuel et ajustements continus.' },
    ],
    faqs: [
      {
        q: (v) => `Combien de temps pour apparaître en première page sur Google à ${v} ?`,
        a: (v) =>
          `En SEO local à ${v}, les premiers effets se font sentir en 3 à 6 mois selon la concurrence dans votre secteur. Certains mots-clés de niche peuvent se positionner en 6 à 8 semaines. Le SEO est un investissement long terme qui génère du trafic durable sans frais publicitaires.`,
      },
      {
        q: (v) => `Quelle est la différence entre le SEO local et le SEO national à ${v} ?`,
        a: (v) =>
          `Le SEO local à ${v} cible les recherches géolocalisées ("plombier ${v}", "restaurant près de moi") et s'appuie sur Google Business Profile, les citations locales et les pages spécifiques à ${v}. C'est ce dont la plupart des PME ont besoin pour générer des clients dans leur zone de chalandise.`,
      },
      {
        q: (v) => `Le SEO vaut-il vraiment mieux que la publicité Google pour une PME à ${v} ?`,
        a: (v) =>
          `Les deux sont complémentaires. Google Ads génère des leads immédiats mais s'arrête dès que vous coupez le budget. Le SEO est plus long à démarrer mais génère du trafic continu sans coût au clic. Pour une PME à ${v}, je recommande souvent de lancer les deux en parallèle, puis de réduire les Ads au fur et à mesure que le SEO prend de l'ampleur.`,
      },
    ],
  },
  'publicite-en-ligne': {
    tagline: (v) => `Des campagnes Google Ads et Meta Ads qui génèrent des clients à ${v}.`,
    intro: (v) =>
      `La publicité en ligne bien gérée est le moyen le plus rapide d'obtenir des clients qualifiés à ${v}. Je conçois et pilote vos campagnes Google Ads et Meta Ads pour maximiser votre retour sur investissement — pas juste des clics.`,
    promise: 'Premiers résultats en moins de 2 semaines',
    stat: '3,5×',
    statLabel: 'ROAS moyen sur les campagnes gérées',
    steps: [
      { num: '01', title: 'Audit & stratégie', desc: 'Analyse de votre marché local, de la concurrence et définition des objectifs de campagne.' },
      { num: '02', title: 'Création des campagnes', desc: 'Paramétrage des comptes, rédaction des annonces, définition des audiences et des budgets.' },
      { num: '03', title: 'Lancement & test', desc: 'Tests A/B sur les visuels et textes, optimisation des enchères, suivi des conversions.' },
      { num: '04', title: 'Optimisation continue', desc: 'Reporting hebdomadaire, ajustements basés sur les données, amélioration du coût par acquisition.' },
    ],
    faqs: [
      {
        q: (v) => `Quel budget minimum prévoir pour la publicité en ligne à ${v} ?`,
        a: (v) =>
          `Pour une PME à ${v}, je recommande un budget minimum de 500 €/mois en médias (ce que vous payez à Google ou Meta) pour avoir des données statistiquement significatives. Mes honoraires de gestion s'ajoutent selon le volume de campagnes. En dessous de ce seuil, les résultats sont difficiles à optimiser.`,
      },
      {
        q: (v) => `Google Ads ou Meta Ads pour mon entreprise à ${v} ?`,
        a: (v) =>
          `Ça dépend de votre activité. Google Ads capte une intention d'achat active ("plombier urgence ${v}") — idéal pour les services et l'urgence. Meta Ads (Facebook/Instagram) crée de la demande et est excellent pour la notoriété, les commerces et les services qui se choisissent sur l'image. Souvent les deux combinés donnent les meilleurs résultats.`,
      },
      {
        q: (v) => `Comment savoir si mes publicités fonctionnent à ${v} ?`,
        a: (v) =>
          `Je mets en place un suivi des conversions complet : appels téléphoniques, formulaires de contact, achats en ligne. Vous recevez un rapport mensuel avec le coût par lead, le ROAS et les recommandations d'optimisation. Pas de jargon — des chiffres clairs.`,
      },
    ],
  },
  branding: {
    tagline: (v) => `Une identité visuelle forte qui vous différencie à ${v}.`,
    intro: (v) =>
      `À ${v}, se différencier de la concurrence est essentiel. Le branding, c'est bien plus qu'un logo — c'est l'ensemble de l'image que vous projetez : visuelle, textuelle, émotionnelle. Je crée des identités cohérentes et mémorables pour les entreprises de ${v} qui veulent marquer les esprits.`,
    promise: 'Identité complète livrée en 3 semaines',
    stat: '89%',
    statLabel: 'des clients perçoivent plus de valeur après un rebranding',
    steps: [
      { num: '01', title: 'Stratégie de marque', desc: 'Positionnement, valeurs, ton de voix et différenciation par rapport à la concurrence locale.' },
      { num: '02', title: 'Identité visuelle', desc: 'Logo, palette de couleurs, typographies et système graphique cohérent.' },
      { num: '03', title: 'Brand book', desc: 'Guide d\'utilisation complet pour assurer la cohérence sur tous vos supports.' },
      { num: '04', title: 'Application', desc: 'Déclinaison sur vos supports : carte de visite, site web, réseaux sociaux, signalétique.' },
    ],
    faqs: [
      {
        q: (v) => `Combien coûte une refonte de logo pour une PME à ${v} ?`,
        a: (v) =>
          `Un logo professionnel pour une PME à ${v} est proposé à partir de 800 €, incluant 3 concepts initiaux, 2 rounds de retouches et la livraison dans tous les formats (SVG, PNG, PDF). Une identité visuelle complète (logo + charte graphique + brand book) démarre à 2 000 €.`,
      },
      {
        q: (v) => `Est-ce vraiment important d'avoir une identité visuelle cohérente à ${v} ?`,
        a: (v) =>
          `Oui. La cohérence visuelle crée de la reconnaissance et de la confiance. Une PME de ${v} avec une identité cohérente sur son site, ses réseaux et ses supports physiques est perçue comme plus professionnelle et peut justifier des tarifs plus élevés. C'est un investissement qui se rentabilise rapidement.`,
      },
      {
        q: (v) => `Mon secteur est-il adapté à un rebranding à ${v} ?`,
        a: (v) =>
          `Tous les secteurs bénéficient d'un branding fort — artisans, restaurateurs, cabinets médicaux, commerces de proximité... Le rebranding est particulièrement impactant lors d'un changement de cible, d'une montée en gamme ou d'un lancement de nouvelle offre à ${v}.`,
      },
    ],
  },
  'community-management': {
    tagline: (v) => `Une présence sur les réseaux sociaux qui construit votre notoriété à ${v}.`,
    intro: (v) =>
      `Les habitants de ${v} sont sur Instagram, Facebook et LinkedIn chaque jour. Je gère vos réseaux sociaux avec une stratégie de contenu locale, des publications régulières et une vraie voix de marque — pour que votre entreprise de ${v} reste dans les esprits.`,
    promise: 'Stratégie + contenu pris en charge',
    stat: '×4',
    statLabel: 'engagement moyen vs comptes non gérés',
    steps: [
      { num: '01', title: 'Audit & stratégie', desc: 'Analyse de vos comptes actuels, de vos concurrents locaux et définition des objectifs.' },
      { num: '02', title: 'Ligne éditoriale', desc: 'Ton de voix, thèmes de contenu, formats et calendrier éditorial mensuel.' },
      { num: '03', title: 'Production & publication', desc: 'Création des visuels, rédaction des légendes et publication aux meilleurs horaires.' },
      { num: '04', title: 'Engagement & reporting', desc: 'Réponse aux commentaires, modération, rapport mensuel des performances.' },
    ],
    faqs: [
      {
        q: (v) => `Quels réseaux sociaux sont les plus efficaces pour une PME à ${v} ?`,
        a: (v) =>
          `Ça dépend de votre secteur. Pour les commerces et la restauration à ${v} : Instagram et Facebook. Pour les services B2B : LinkedIn. Pour les artisans : Facebook et Google Business. Je sélectionne les 2 canaux les plus pertinents pour votre cible locale et les anime avec rigueur.`,
      },
      {
        q: (v) => `Combien de publications par semaine faut-il pour être visible à ${v} ?`,
        a: (v) =>
          `La régularité compte plus que la fréquence. 3 à 4 publications par semaine bien ciblées valent mieux que 10 posts génériques. Je crée un calendrier éditorial adapté à votre activité à ${v} et à vos temps forts saisonniers.`,
      },
      {
        q: (v) => `Est-ce que les réseaux sociaux génèrent vraiment des clients à ${v} ?`,
        a: (v) =>
          `Oui, mais différemment selon les secteurs. Les réseaux sociaux construisent votre notoriété locale et génèrent des recommandations à ${v}. Combinés à une offre ponctuelle ou un appel à l'action clair, ils peuvent générer directement des demandes de devis et des réservations.`,
      },
    ],
  },
  'automatisation-marketing': {
    tagline: (v) => `Automatisez votre marketing et gagnez 10h par semaine à ${v}.`,
    intro: (v) =>
      `Les entrepreneurs de ${v} perdent en moyenne 10 à 15 heures par semaine en tâches marketing répétitives. Je mets en place des systèmes d'automatisation — emails, CRM, rappels, nurturing — pour que votre entreprise de ${v} continue à générer des leads et à fidéliser ses clients, même quand vous ne travaillez pas.`,
    promise: 'Système opérationnel en 3 semaines',
    stat: '10h',
    statLabel: 'gagnées par semaine en moyenne',
    steps: [
      { num: '01', title: 'Audit des processus', desc: 'Cartographie de vos flux actuels : génération de leads, qualification, onboarding, fidélisation.' },
      { num: '02', title: 'Architecture du système', desc: 'Sélection des outils adaptés à votre budget et connexion de vos plateformes existantes.' },
      { num: '03', title: 'Construction des séquences', desc: 'Création des emails, triggers, conditions et intégrations CRM selon votre parcours client.' },
      { num: '04', title: 'Test & formation', desc: 'Tests complets du parcours automatisé, formation à la supervision et aux ajustements.' },
    ],
    faqs: [
      {
        q: (v) => `Quels outils d'automatisation recommandez-vous pour une PME à ${v} ?`,
        a: (v) =>
          `Pour une PME à ${v}, je recommande des outils accessibles selon le budget : Brevo (ex-Sendinblue) pour l'emailing, Notion ou HubSpot Free pour le CRM, Make (ex-Integromat) pour les intégrations avancées. Je sélectionne les outils selon vos besoins, pas les plus chers.`,
      },
      {
        q: (v) => `L'automatisation est-elle vraiment accessible pour une petite entreprise à ${v} ?`,
        a: (v) =>
          `Absolument. J'automatise régulièrement pour des artisans, des restaurateurs et des commerçants à ${v} avec des budgets modestes. Un simple email de rappel de rendez-vous ou une séquence de bienvenue automatisée peut transformer l'expérience client sans compétence technique.`,
      },
      {
        q: (v) => `Quel ROI peut-on attendre de l'automatisation marketing à ${v} ?`,
        a: (v) =>
          `Les résultats les plus fréquents pour les entreprises de ${v} : -70% de no-shows grâce aux rappels automatiques, +30% de taux de réachat grâce aux emails de fidélisation, et 10h/semaine récupérées sur les tâches manuelles. L'investissement est généralement rentabilisé en 2 à 3 mois.`,
      },
    ],
  },
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const params: { ville: string; service: string }[] = []
  for (const ville of allVilles) {
    for (const service of services) {
      params.push({ ville: ville.slug, service: service.id })
    }
  }
  return params
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ville: villeSlug, service: serviceSlug } = await params
  const ville = allVilles.find((v) => v.slug === villeSlug)
  const service = services.find((s) => s.id === serviceSlug)
  if (!ville || !service) return {}

  const title = `${service.title} ${ville.nom} — Expert PME | 123 Digital`
  const description = `Maurice Timsit, expert en ${service.title.toLowerCase()} à ${ville.nom}. ${service.description} Audit gratuit 30 min, sans engagement.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${villeSlug}/${serviceSlug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${villeSlug}/${serviceSlug}`,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VilleServicePage({ params }: PageProps) {
  const { ville: villeSlug, service: serviceSlug } = await params
  const ville = allVilles.find((v) => v.slug === villeSlug)
  const service = services.find((s) => s.id === serviceSlug)
  if (!ville || !service) notFound()

  const content = serviceContent[service.id]
  if (!content) notFound()

  const isARA = villesARA.some((v) => v.slug === ville.slug)
  const autresServices = services.filter((s) => s.id !== service.id)
  const autresVilles = villesARA.filter((v) => v.slug !== ville.slug).slice(0, 6)
  const insight = villeInsights[ville.slug]

  const faqs = content.faqs.map(({ q, a }) => ({
    question: q(ville.nom),
    answer: a(ville.nom),
  }))

  const schemas = [
    localBusinessSchema(),
    serviceSchema({
      name: `${service.title} ${ville.nom}`,
      description: `${service.description} à ${ville.nom}.`,
      path: `/${ville.slug}/${service.id}`,
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: `Consultant digital ${ville.nom}`, path: `/${ville.slug}` },
      { name: service.title, path: `/${ville.slug}/${service.id}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      {/* Hero */}
      <section className="bg-background" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: `${ville.nom}`, href: `/${ville.slug}` },
                { label: service.title },
              ]}
            />
          </div>

          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            {service.shortDesc} · {ville.nom}
          </div>

          <h1
            className="font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              color: 'var(--ink)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            {service.title}<br />
            <em
              style={{
                color: 'var(--brand)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
              }}
            >
              à {ville.nom}
            </em>
          </h1>

          <p
            className="text-base leading-relaxed mb-6 max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            {content.intro(ville.nom)}
          </p>

          {insight && (
            <p
              className="text-sm leading-relaxed mb-6 max-w-2xl"
              style={{ color: 'var(--ink-2)' }}
            >
              {insight.angle}
            </p>
          )}

          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-3">
              <span
                className="font-display font-bold"
                style={{ fontSize: '2rem', color: 'var(--brand)' }}
              >
                {content.stat}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--ink-2)' }}>
                {content.statLabel}
              </span>
            </div>
            <div
              style={{
                padding: '0.35rem 0.9rem',
                border: '1px solid var(--brand-line)',
                color: 'var(--brand)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {content.promise}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/audit-gratuit"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                backgroundColor: 'var(--brand)',
                color: 'var(--on-brand)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Audit gratuit 30 min
            </Link>
            <Link
              href={`/${ville.slug}`}
              className="hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                border: '1px solid var(--line)',
                color: 'var(--ink-2)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              ← Retour {ville.nom}
            </Link>
          </div>
        </div>
      </section>

      {/* Méthode / Étapes */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Ma méthode
          </div>
          <h2
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            {service.title} à {ville.nom}<br />
            <span style={{ color: 'var(--ink-2)' }}>en 4 étapes.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {content.steps.map((step) => (
              <div
                key={step.num}
                className="p-8"
                style={{ backgroundColor: 'var(--surface-2)' }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: 'var(--ink-3)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-display font-normal mb-3"
                  style={{ fontSize: '1.1rem', color: 'var(--ink)' }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  {step.desc.replace('${v}', ville.nom)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-3xl">
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Questions fréquentes
          </div>
          <h2
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            {service.title} à {ville.nom} —<br />vos questions
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
                <dt className="font-display font-normal mb-3" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
                  {question}
                </dt>
                <dd style={{ color: 'var(--ink-2)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Autres services à la même ville */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              marginBottom: '1.5rem',
              fontWeight: 700,
            }}
          >
            Autres services à {ville.nom}
          </p>
          <div className="flex flex-wrap gap-3">
            {autresServices.map((s) => (
              <Link
                key={s.id}
                href={`/${ville.slug}/${s.id}`}
                className="hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                style={{
                  padding: '0.4rem 0.9rem',
                  border: '1px solid var(--line)',
                  color: 'var(--ink-2)',
                  fontSize: '0.8rem',
                }}
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Même service dans d'autres villes ARA */}
      {isARA && autresVilles.length > 0 && (
        <section
          className="bg-background"
          style={{ padding: '2rem 1.5rem 4rem', borderTop: '1px solid var(--line)' }}
        >
          <div className="mx-auto max-w-5xl">
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-3)',
                marginBottom: '1rem',
                fontWeight: 700,
              }}
            >
              {service.title} dans la région
            </p>
            <div className="flex flex-wrap gap-3">
              {autresVilles.map((v) => (
                <Link
                  key={v.slug}
                  href={`/${v.slug}/${service.id}`}
                  className="hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                  style={{
                    padding: '0.4rem 0.9rem',
                    border: '1px solid var(--line)',
                    color: 'var(--ink-2)',
                    fontSize: '0.8rem',
                  }}
                >
                  {service.title} {v.nom}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section
        className="bg-background"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Prêt à lancer votre projet<br />{service.title.toLowerCase()} à {ville.nom} ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Un audit gratuit de 30 minutes pour identifier les 3 actions les plus rentables pour votre entreprise. Sans engagement, sans jargon.
          </p>
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Demander mon audit gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
