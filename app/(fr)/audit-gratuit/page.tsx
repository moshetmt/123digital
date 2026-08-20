import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Check, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqListe } from '@/components/sections/FaqListe'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { AuditSimulator } from '@/components/sections/AuditSimulator'
import { CTA } from '@/components/sections/CTA'
import { BASE_URL, breadcrumbSchema, auditPageSchema } from '@/lib/schema'
import { languesPour } from '@/data/hreflang'

export const metadata: Metadata = {
  title: 'Audit digital gratuit Lyon — 30 min sans engagement',
  description:
    'Audit digital gratuit de 30 min avec Maurice Timsit. SEO, UX et publicité : pourquoi votre site PME ne convertit pas. Réservez votre créneau gratuit.',
  alternates: { canonical: `${BASE_URL}/audit-gratuit`, ...languesPour('/audit-gratuit') },
  openGraph: {
    title: 'Audit digital gratuit 30 min | 123 Digital',
    description:
      'Audit digital gratuit sans engagement. Identifiez pourquoi votre site ne génère pas de clients.',
    url: `${BASE_URL}/audit-gratuit`,
  },
}

const ceQueJanalysee = [
  {
    titre: 'Votre site web',
    points: [
      'Vitesse de chargement (Core Web Vitals)',
      'Clarté du message et de l\'offre',
      'Parcours de conversion (appel à l\'action)',
      'Compatibilité mobile',
    ],
  },
  {
    titre: 'Votre SEO',
    points: [
      'Positionnement actuel sur vos mots-clés cibles',
      'Optimisation technique on-page',
      'Google Business Profile',
      'Opportunités SEO locales non exploitées',
    ],
  },
  {
    titre: 'Votre publicité',
    points: [
      'Analyse de vos campagnes existantes (si applicable)',
      'Opportunités Google Ads / Meta Ads pour votre secteur',
      'Estimation du coût par lead dans votre marché',
      'Quick wins publicitaires immédiats',
    ],
  },
  {
    titre: 'Votre stratégie',
    points: [
      'Positionnement vs vos 3 principaux concurrents',
      'Canaux d\'acquisition sous-exploités',
      'Plan d\'action priorisé par impact et effort',
      'Estimation des résultats attendus',
    ],
  },
]

const etapes = [
  {
    num: '01',
    titre: 'Vous réservez',
    desc: 'Choisissez un créneau de 30 minutes dans le calendrier. Pas de formulaire long — juste votre nom, email et URL de site.',
  },
  {
    num: '02',
    titre: 'Je prépare',
    desc: 'Avant l\'appel, j\'analyse votre site, votre présence SEO et votre secteur. Vous n\'avez rien à préparer.',
  },
  {
    num: '03',
    titre: 'On se parle',
    desc: 'Appel vidéo de 30 minutes. Je vous présente mes observations et vous pose des questions sur vos objectifs.',
  },
  {
    num: '04',
    titre: 'Vous repartez avec un plan',
    desc: 'À la fin de l\'appel, vous avez les 3 actions prioritaires pour développer votre présence digitale. Sans jargon.',
  },
]

const faqs = [
  {
    q: 'L\'audit est-il vraiment gratuit et sans engagement ?',
    a: 'Oui, complètement. Pas de carte bancaire, pas de relance agressive. Si au bout de l\'appel vous souhaitez travailler ensemble, on en discute. Sinon, vous repartez avec vos insights et c\'est tout.',
  },
  {
    q: 'Mon entreprise est-elle trop petite pour bénéficier d\'un audit ?',
    a: 'Non. J\'accompagne des TPE de 1 à 10 personnes comme des PME de 50 à 200 salariés. Les problèmes digitaux sont souvent similaires, c\'est l\'échelle des solutions qui change.',
  },
  {
    q: 'Dois-je préparer quelque chose avant l\'appel ?',
    a: 'Rien de spécial. Si vous avez accès à Google Analytics ou à vos comptes publicitaires, c\'est utile mais pas obligatoire. L\'essentiel est que vous puissiez me parler de vos objectifs.',
  },
  {
    q: 'L\'audit couvre quelle zone géographique ?',
    a: 'J\'accompagne principalement les entreprises d\'Auvergne-Rhône-Alpes (Lyon, Grenoble, Saint-Étienne, Annecy...) mais j\'interviens sur toute la France en distanciel.',
  },
  {
    q: 'Que se passe-t-il si on décide de travailler ensemble après l\'audit ?',
    a: 'On définit ensemble un périmètre de mission adapté à vos besoins et votre budget. Pas de contrat long terme imposé — je propose des missions ponctuelles et des accompagnements mensuels selon ce qui vous convient.',
  },
]

export default function AuditGratuitPage() {
  const schemas = [
    auditPageSchema(),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Audit gratuit', path: '/audit-gratuit' },
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
      <JsonLd schema={schemas} />

      <PageBanner
        icone="search"
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Audit gratuit' },
            ]}
          />
        }
        title="Votre audit digital offert."
        highlight="offert."
        sub="En 30 minutes, j&apos;identifie pourquoi votre site ne génère pas autant de clients qu&apos;il le devrait, et je vous donne les trois actions prioritaires pour changer ça. Analyse concrète, pas de discours commercial."
      />

      {/* Formulaire d'audit — P0-2 de l'audit UX : la page vers laquelle tous
          les CTA convergent doit permettre d'agir sans téléphoner */}
      <CTA />

      {/* Ce que j'analyse */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
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
            Ce que je regarde
          </div>
          <h2
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Une analyse complète<br />
            <span style={{ color: 'var(--brand)' }}>en 30 minutes.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
            {ceQueJanalysee.map((bloc) => (
              <div
                key={bloc.titre}
                className="rounded-2xl"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)', padding: 'clamp(1rem, 3vw, 1.6rem)' }}
              >
                <h3
                  className="font-display font-extrabold mb-4"
                  style={{ fontSize: '1.1rem', color: 'var(--brand)' }}
                >
                  {bloc.titre}
                </h3>
                <ul className="space-y-2">
                  {bloc.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: 'var(--ink-3)', flexShrink: 0, marginTop: '0.1rem' }}>—</span>
                      <span style={{ fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulateur interactif */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
                Pas encore prêt à réserver ?
              </div>
              <h2
                className="font-display font-extrabold mb-4"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--ink)', lineHeight: 1.1 }}
              >
                Trouvez votre stratégie<br />en 3 questions.
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>
                Répondez à 3 questions rapides sur votre situation — vous obtiendrez une recommandation personnalisée avant même de me parler.
              </p>
            </div>
            <div>
              <AuditSimulator />
            </div>
          </div>
        </div>
      </section>

      {/* Les 4 étapes */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
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
            Comment ça se passe
          </div>
          <h2
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            De la réservation<br />
            <span style={{ color: 'var(--brand)' }}>au plan d&apos;action.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
            {etapes.map((etape) => (
              <div
                key={etape.num}
                className="rounded-2xl"
                style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)', padding: 'clamp(1rem, 3vw, 1.6rem)' }}
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
                  {etape.num}
                </div>
                <h3
                  className="font-display font-extrabold mb-3"
                  style={{ fontSize: '1.1rem', color: 'var(--ink)' }}
                >
                  {etape.titre}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  {etape.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
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
            className="font-display font-extrabold mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Tout ce que vous voulez savoir<br />sur l&apos;audit gratuit
          </h2>
          {/* Accordeon natif : la liste depliee pesait environ 1000 px sur
              telephone. Le schema FAQPage de la page reste inchange. */}
          <FaqListe items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>

      {/* CTA final */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Prêt à savoir ce qui bloque<br />votre croissance ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            30 minutes. Gratuit. Sans jargon. Avec un plan d&apos;action concret à la fin.
          </p>
          <a
            href="tel:+33652092301"
            className="hover:opacity-85 transition-opacity"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '14px 28px',
              borderRadius: 999,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <Phone size={17} aria-hidden />
              Appeler maintenant
          </a>
        </div>
      </section>
    </>
  )
}
