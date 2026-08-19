import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { AuditSimulator } from '@/components/sections/AuditSimulator'
import { CTA } from '@/components/sections/CTA'
import { BASE_URL, breadcrumbSchema, auditPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Audit digital gratuit Lyon — 30 min sans engagement',
  description:
    'Audit digital gratuit de 30 min avec Maurice Timsit. SEO, UX et publicité : pourquoi votre site PME ne convertit pas. Réservez votre créneau gratuit.',
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
      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}>
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
              color: 'var(--ink-2)',
              fontWeight: 700,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            Gratuit · Sans engagement · 30 minutes
          </div>

          <h1
            className="font-display font-extrabold mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              color: 'var(--ink)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Votre audit digital<br />
            <em
              style={{
                color: 'var(--brand)',
              }}
            >
              offert.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed mb-4 max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            En 30 minutes, j&apos;identifie pourquoi votre site ne génère pas autant de clients qu&apos;il le devrait — et je vous donne les 3 actions prioritaires pour changer ça. Analyse concrète, pas de discours commercial.
          </p>

          <div
            className="flex flex-wrap gap-4 mb-8"
            style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}
          >
            {['Aucune carte bancaire', 'Pas de relance commerciale', 'Résultats actionnables'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {/* CTA principal */}
          <div
            className="mb-6 rounded-2xl"
            style={{
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--line)',
              boxShadow: '0 8px 30px var(--shadow-soft)',
              maxWidth: '480px',
              padding: '1.35rem',
            }}
          >
            <p
              className="font-display font-extrabold mb-1.5"
              style={{ fontSize: '1.1rem', color: 'var(--ink)' }}
            >
              Démarrez votre audit par téléphone
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', marginBottom: '0.9rem', lineHeight: 1.5 }}>
              Un appel de 30 minutes suffit. Je prépare l&apos;analyse de votre site avant l&apos;échange.
            </p>
            <a
              href="tel:+33652092301"
              className="hover:opacity-85 transition-opacity"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                backgroundColor: 'var(--brand)',
                color: 'var(--on-brand)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.95rem',
                padding: '1rem',
                borderRadius: 999,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              <Phone size={17} aria-hidden />
              Appeler maintenant
            </a>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)', marginTop: '0.75rem', textAlign: 'center' }}>
              +33 6 52 09 23 01 — disponible en semaine
            </p>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)' }}>
            Ou écrivez-moi directement :{' '}
            <Link
              href="mailto:contact@123digital.fr"
              className="hover:text-[var(--brand)] transition-colors"
              style={{ color: 'var(--ink-2)', textDecoration: 'underline' }}
            >
              contact@123digital.fr
            </Link>
          </p>
        </div>
      </section>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {ceQueJanalysee.map((bloc) => (
              <div
                key={bloc.titre}
                className="p-8"
                style={{ backgroundColor: 'var(--surface-2)' }}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {etapes.map((etape) => (
              <div
                key={etape.num}
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
          <div className="flex flex-col gap-1.5">
            {faqs.map(({ q, a }, i) => (
              <details key={i} className="group rounded-xl" style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}>
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none font-extrabold" style={{ fontSize: '0.95rem', color: 'var(--ink)', padding: '0.85rem 1rem' }}>
                  {q}
                  <span aria-hidden className="shrink-0 transition-transform group-open:rotate-45" style={{ color: 'var(--brand)', fontSize: '1.2rem', lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.88rem', padding: '0 1rem 0.9rem' }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
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
