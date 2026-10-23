import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BASE_URL, serviceSchema, breadcrumbSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Consultant IA Lyon · Projets IA, automatisation, formation PME | 123 Digital',
  description:
    'Maurice Timsit, consultant IA à Lyon pour artisans et PME : projets d’intelligence artificielle, automatisation des tâches et formation des équipes. Audit gratuit 30 min.',
  alternates: { canonical: `${BASE_URL}/consultant-ia-lyon` },
  openGraph: {
    title: 'Consultant IA à Lyon · 123 Digital',
    description: 'Projets IA, automatisation et formation des équipes pour les PME de Lyon et de la région.',
    url: `${BASE_URL}/consultant-ia-lyon`,
  },
}

const besoins = [
  {
    num: '01',
    title: 'Projets d’intelligence artificielle',
    desc: 'Vous avez une idée ou une tâche qui vous prend des heures. On la regarde ensemble, on décide si l’IA la règle, et je construis l’outil : assistant qui répond à vos clients, tri de vos demandes, rédaction de vos devis ou de vos fiches.',
  },
  {
    num: '02',
    title: 'Automatisation des tâches',
    desc: 'Les demandes de devis, les relances, les messages d’anniversaire, les fiches à imprimer : tout ce qui se répète passe dans un programme. Vous gardez la main sur l’envoi, l’outil prépare le reste.',
  },
  {
    num: '03',
    title: 'Formation de votre équipe',
    desc: 'Chaque outil livré s’accompagne d’une prise en main sur vos vrais dossiers, pas d’un cours général sur ChatGPT. Votre équipe sait l’utiliser et le corriger sans moi.',
  },
]

const preuves = [
  {
    titre: 'Un climatiseur de la métropole lyonnaise',
    desc: 'Chaque demande de devis reçue par le site atterrit dans une feuille Google que le gérant lit sur son téléphone, avec un filtre qui écarte les envois suspects. Le programme est écrit sur mesure, sans abonnement.',
    href: '/realisations/clim69',
    label: 'Voir le chantier Clim69',
  },
  {
    titre: 'Une association étudiante à Lyon',
    desc: 'Les inscriptions aux repas passent par un formulaire qui gère le nombre de places et se ferme avant les fêtes. Les messages d’anniversaire sont préparés par un outil, puis envoyés par un humain depuis son propre numéro.',
    href: '/realisations/habad-etudiants-lyon',
    label: 'Voir le chantier Habad Étudiants Lyon',
  },
  {
    titre: 'Des cours d’anglais pour esthéticiennes',
    desc: 'Les fiches de cours sont produites par un script, un PDF par fiche, dessiné pour l’impression en noir et blanc. L’enseignante change le contenu, le script refait la mise en page.',
    href: '/realisations/cours-anglais-esthetique',
    label: 'Voir le chantier Cours 2.0',
  },
  {
    titre: '123 Digital elle-même',
    desc: 'Mon activité tourne sur des outils IA que j’ai construits : audits de comptes Google Ads, rapports, montage de vidéos, illustrations. Je vends ce que j’utilise tous les jours.',
    href: '/realisations',
    label: 'Voir toutes les réalisations',
  },
]

const etapes = [
  { num: '1', title: 'Audit gratuit de 30 minutes', desc: 'Vous me racontez votre semaine. On repère les tâches qui reviennent et celles qui vous coûtent des clients.' },
  { num: '2', title: 'Un cas d’usage, pas dix', desc: 'On choisit la tâche qui rapporte le plus une fois automatisée. Je vous dis ce que ça coûte et ce que ça enlève de votre semaine.' },
  { num: '3', title: 'Construction en quelques semaines', desc: 'Je construis l’outil avec vos vraies données, vous le testez, on corrige. Vous restez propriétaire du code et des comptes.' },
  { num: '4', title: 'Prise en main de l’équipe', desc: 'Une session sur vos dossiers, un mode d’emploi court, et je reste joignable après la livraison.' },
]

const faqs = [
  {
    q: 'Qu’est-ce qu’un consultant IA à Lyon pour une PME ?',
    a: 'Un consultant IA à Lyon aide une petite entreprise à utiliser l’intelligence artificielle sur ses tâches concrètes : répondre aux demandes, trier les messages, préparer des devis, produire des documents. Chez 123 Digital, le consultant construit lui-même l’outil, forme l’équipe et reste l’interlocuteur unique du début à la fin.',
  },
  {
    q: 'Quels projets IA sont réalistes pour un artisan ou une PME ?',
    a: 'Ceux qui partent d’une tâche répétée : les demandes de devis à classer, les relances à envoyer, les fiches ou les messages à rédiger, les rendez-vous à confirmer. Un projet IA réaliste se construit en quelques semaines, sur les outils que vous utilisez déjà (Google, WhatsApp, votre site), et votre équipe peut le faire tourner sans moi.',
  },
  {
    q: 'Combien coûte un consultant IA à Lyon ?',
    a: 'L’audit de 30 minutes est gratuit. Ensuite, chaque projet est chiffré à l’avance pour une tâche précise, sans abonnement obligatoire. Vous payez un outil livré, pas des heures de réunion.',
  },
  {
    q: 'Formez-vous les équipes à ChatGPT, Claude ou Gemini ?',
    a: 'Oui, sur vos dossiers réels et dans le cadre d’un projet livré : la prise en main fait partie de la mission. Je n’organise pas de formation générale en salle, et je ne suis pas un organisme de formation certifié Qualiopi.',
  },
  {
    q: 'Quels outils d’IA utilisez-vous ?',
    a: 'Claude, ChatGPT et Gemini pour le texte, les images et le code, Google Apps Script et Python pour les automatisations, et les outils que vous avez déjà : Google Workspace, WhatsApp, votre site. Je choisis l’outil le moins cher qui règle le problème, et souvent c’est un programme maison plutôt qu’un abonnement.',
  },
  {
    q: 'Intervenez-vous uniquement à Lyon ?',
    a: 'Je suis basé à Lyon et j’accompagne en priorité les entreprises de la métropole et de la région Auvergne-Rhône-Alpes. Le travail se fait à distance, j’interviens donc aussi partout en France.',
  },
]

export default function ConsultantIaLyonPage() {
  const jsonLd = [
    serviceSchema({
      name: 'Consultant IA Lyon · 123 Digital',
      description: 'Projets d’intelligence artificielle, automatisation des tâches et formation des équipes pour artisans et PME à Lyon.',
      path: '/consultant-ia-lyon',
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Consultant IA Lyon', path: '/consultant-ia-lyon' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ]

  return (
    <>
      <JsonLd schema={jsonLd} />

      <PageBanner
        icone="cpu"
        title="Consultant IA à Lyon pour artisans et PME"
        highlight="IA à Lyon"
        sub="Projets d’intelligence artificielle, automatisation de vos tâches et formation de votre équipe. Un seul interlocuteur, Maurice Timsit, qui construit lui-même les outils."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/realisations">Voir les réalisations</BannerCtaLine>
          </>
        }
      />

      {/* Réponse directe */}
      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Que fait un consultant IA<br />
            <span style={{ color: 'var(--brand)' }}>pour une PME à Lyon ?</span>
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: 'var(--ink-2)' }}>
            Il prend une tâche qui vous coûte du temps ou des clients, et il la confie à un programme qui
            s&apos;appuie sur l&apos;intelligence artificielle. Je suis Maurice Timsit, consultant digital à Lyon
            depuis 2017. J&apos;accompagne des artisans, des commerçants et des PME sur trois besoins&nbsp;: les projets
            IA, l&apos;automatisation et la formation de l&apos;équipe. Je construis l&apos;outil moi-même, et vous en restez
            propriétaire.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {besoins.map((item) => (
              <div
                key={item.num}
                className="rounded p-7"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <div className="text-xs font-bold mb-4" style={{ color: 'var(--ink-3)', letterSpacing: '0.1em' }}>{item.num}</div>
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preuves */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Ce que j&apos;ai déjà automatisé<br />
            <span style={{ color: 'var(--brand)' }}>pour des entreprises de Lyon</span>
          </h2>
          <p className="text-sm mb-10 max-w-3xl" style={{ color: 'var(--ink-2)' }}>
            Chaque chantier est raconté en détail dans les réalisations, avec ce qui a été construit, ce qui a cassé et ce qui a été refait.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {preuves.map((p) => (
              <div
                key={p.href + p.titre}
                className="flex flex-col rounded p-6"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <h3 className="font-display font-extrabold text-base mb-2" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{p.titre}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-2)' }}>{p.desc}</p>
                <Link href={p.href} className="btn-contour mt-auto self-start">{p.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="bg-background" style={{ padding: '0 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Comment se passe un projet IA avec 123 Digital ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {etapes.map((e) => (
              <div
                key={e.num}
                className="rounded p-6"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <div className="text-xs font-bold mb-4" style={{ color: 'var(--ink-3)', letterSpacing: '0.1em' }}>ÉTAPE {e.num}</div>
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{e.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services/automatisation-marketing" className="btn-contour">Automatisation marketing</Link>
            <Link href="/consultant-digital-lyon" className="btn-contour">Consultant digital à Lyon</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-3xl">
          <h2
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Questions fréquentes sur l&apos;IA pour les PME à Lyon
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="rounded p-6"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
              >
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
