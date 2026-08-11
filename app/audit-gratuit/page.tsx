import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { AuditSimulator } from '@/components/sections/AuditSimulator'
import { BASE_URL, breadcrumbSchema, auditPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Audit digital gratuit 30 min — Trouvez pourquoi votre site ne convertit pas | 123 Digital',
  description:
    'Audit digital gratuit de 30 minutes avec Maurice Timsit. Analyse SEO, UX, publicité et stratégie. Identifiez les 3 actions les plus rentables pour votre entreprise. Sans engagement.',
  alternates: { canonical: `${BASE_URL}/audit-gratuit` },
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

      {/* Hero */}
      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Audit gratuit' },
              ]}
            />
          </div>

          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.7)',
              fontWeight: 700,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Gratuit · Sans engagement · 30 minutes
          </div>

          <h1
            className="font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              color: '#E1E0CC',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Votre audit digital<br />
            <em
              style={{
                color: '#00FF87',
                fontStyle: 'italic',
                fontFamily: 'var(--font-instrument-serif)',
              }}
            >
              offert.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed mb-4 max-w-2xl"
            style={{ color: 'rgba(225,224,204,0.65)' }}
          >
            En 30 minutes, j&apos;identifie pourquoi votre site ne génère pas autant de clients qu&apos;il le devrait — et je vous donne les 3 actions prioritaires pour changer ça. Analyse concrète, pas de discours commercial.
          </p>

          <div
            className="flex flex-wrap gap-4 mb-8"
            style={{ fontSize: '0.8rem', color: 'rgba(225,224,204,0.5)' }}
          >
            {['✓ Aucune carte bancaire', '✓ Pas de relance commerciale', '✓ Résultats actionnables'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {/* CTA principal */}
          <div
            className="p-8 mb-8"
            style={{
              backgroundColor: 'rgba(0,255,135,0.05)',
              border: '1px solid rgba(0,255,135,0.2)',
              maxWidth: '480px',
            }}
          >
            <p
              className="font-display font-normal mb-6"
              style={{ fontSize: '1.2rem', color: '#E1E0CC' }}
            >
              Réservez votre créneau gratuit
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(225,224,204,0.6)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Choisissez un créneau de 30 minutes dans l&apos;agenda. Je prépare l&apos;analyse de votre site avant l&apos;appel.
            </p>
            <Link
              href="https://cal.com/mauricetimsit/audit-gratuit"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '1rem',
                backgroundColor: '#00FF87',
                color: '#080808',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Choisir mon créneau →
            </Link>
            <p style={{ fontSize: '0.75rem', color: 'rgba(225,224,204,0.35)', marginTop: '0.75rem', textAlign: 'center' }}>
              Réponse sous 24h si aucun créneau ne convient
            </p>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'rgba(225,224,204,0.4)' }}>
            Ou écrivez-moi directement :{' '}
            <Link
              href="mailto:contact@123digital.fr"
              className="hover:text-[#00FF87] transition-colors"
              style={{ color: 'rgba(225,224,204,0.55)', textDecoration: 'underline' }}
            >
              contact@123digital.fr
            </Link>
          </p>
        </div>
      </section>

      {/* Ce que j'analyse */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.5)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Ce que je regarde
          </div>
          <h2
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Une analyse complète<br />
            <span style={{ color: 'rgba(225,224,204,0.5)' }}>en 30 minutes.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
            {ceQueJanalysee.map((bloc) => (
              <div
                key={bloc.titre}
                className="p-8"
                style={{ backgroundColor: '#080808' }}
              >
                <h3
                  className="font-display font-normal mb-4"
                  style={{ fontSize: '1.1rem', color: '#00FF87' }}
                >
                  {bloc.titre}
                </h3>
                <ul className="space-y-2">
                  {bloc.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: 'rgba(225,224,204,0.3)', flexShrink: 0, marginTop: '0.1rem' }}>—</span>
                      <span style={{ fontSize: '0.87rem', color: 'rgba(225,224,204,0.6)', lineHeight: 1.5 }}>
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
        className="bg-black"
        style={{ padding: '4rem 1.5rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(225,224,204,0.5)',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                }}
              >
                Pas encore prêt à réserver ?
              </div>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#E1E0CC', lineHeight: 1.1 }}
              >
                Trouvez votre stratégie<br />en 3 questions.
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'rgba(225,224,204,0.55)', lineHeight: 1.7 }}>
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
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.5)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Comment ça se passe
          </div>
          <h2
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            De la réservation<br />
            <span style={{ color: 'rgba(225,224,204,0.5)' }}>au plan d&apos;action.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
            {etapes.map((etape) => (
              <div
                key={etape.num}
                className="p-8"
                style={{ backgroundColor: '#080808' }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: 'rgba(225,224,204,0.3)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  {etape.num}
                </div>
                <h3
                  className="font-display font-normal mb-3"
                  style={{ fontSize: '1.1rem', color: '#E1E0CC' }}
                >
                  {etape.titre}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(225,224,204,0.6)', lineHeight: 1.65 }}>
                  {etape.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-3xl">
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(225,224,204,0.5)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Questions fréquentes
          </div>
          <h2
            className="font-display font-normal mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Tout ce que vous voulez savoir<br />sur l&apos;audit gratuit
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ q, a }, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(225,224,204,0.08)', paddingTop: '2rem' }}>
                <dt className="font-display font-normal mb-3" style={{ fontSize: '1.05rem', color: '#E1E0CC' }}>
                  {q}
                </dt>
                <dd style={{ color: 'rgba(225,224,204,0.65)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)', textAlign: 'center' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Prêt à savoir ce qui bloque<br />votre croissance ?
          </h2>
          <p style={{ color: 'rgba(225,224,204,0.6)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            30 minutes. Gratuit. Sans jargon. Avec un plan d&apos;action concret à la fin.
          </p>
          <Link
            href="https://cal.com/mauricetimsit/audit-gratuit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              backgroundColor: '#00FF87',
              color: '#080808',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Réserver mon audit gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
