import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, serviceSchema } from '@/lib/schema'
import { services } from '@/data/services'
import { languesPour } from '@/data/hreflang'

export const metadata: Metadata = {
  title: 'Services digitaux Lyon — SEO, Web & Ads | 123 Digital',
  description:
    'Services digitaux pour PME à Lyon et en Auvergne-Rhône-Alpes : SEO, création de site, Google Ads, branding et automatisation. Un seul expert, une stratégie cohérente pour votre croissance.',
  alternates: { canonical: `${BASE_URL}/services`, ...languesPour('/services') },
  openGraph: {
    title: 'Services digitaux pour PME | 123 Digital Lyon',
    description: 'SEO, création site web, Google Ads, branding et automatisation à Lyon : un seul expert, des résultats mesurables pour votre PME.',
    url: `${BASE_URL}/services`,
  },
}

const serviceDetails = [
  {
    id: 'creation-site-web',
    tagline: 'Votre meilleur commercial, disponible 24h/24',
    pour: 'PME qui veulent remplacer un site vieillissant ou créer leur première présence digitale efficace',
    inclus: ['Design sur mesure mobile-first', 'Optimisation SEO intégrée', 'Formulaires de conversion', 'Score performance 90+', 'Livraison en 3 à 6 semaines'],
  },
  {
    id: 'seo',
    tagline: 'Soyez trouvé avant vos concurrents',
    pour: 'PME qui veulent des clients organiques sans payer la publicité indéfiniment',
    inclus: ['Audit SEO technique complet', 'Stratégie de mots-clés locaux', 'Optimisation des pages clés', 'Netlinking qualitatif', 'Rapport mensuel transparent'],
  },
  {
    id: 'publicite-en-ligne',
    tagline: 'Clients qualifiés dès la première semaine',
    pour: 'PME qui veulent des résultats rapides et mesurables, avec un ROI clair',
    inclus: ['Google Ads Search et Display', 'Meta Ads (Facebook + Instagram)', 'Ciblage géolocalisé', 'A/B testing créatifs', 'Reporting hebdomadaire'],
  },
  {
    id: 'branding',
    tagline: 'Une identité qui inspire confiance',
    pour: 'PME qui veulent professionnaliser leur image et se différencier durablement',
    inclus: ['Logo et charte graphique', 'Guide de marque complet', 'Templates réseaux sociaux', 'Papeterie professionnelle', 'Positionnement et copywriting'],
  },
  {
    id: 'community-management',
    tagline: 'Vos réseaux, gérés comme si vous l\'aviez fait vous-même',
    pour: 'PME qui n\'ont pas le temps de gérer leurs réseaux sociaux mais savent que c\'est important',
    inclus: ['Stratégie éditoriale mensuelle', 'Création des visuels et textes', 'Publication régulière', 'Modération et réponses', 'Rapport d\'engagement mensuel'],
  },
  {
    id: 'automatisation-marketing',
    tagline: 'Votre marketing qui travaille pendant que vous dormez',
    pour: 'PME qui veulent convertir plus sans travailler plus, grâce aux séquences automatisées',
    inclus: ['Audit de vos processus actuels', 'Mise en place Make / n8n / HubSpot', 'Séquences email et SMS', 'Intégration CRM', 'Formation et documentation'],
  },
]

const serviceImages: Record<string, string> = {
  'creation-site-web': '/images/services/creation-site-web.jpg',
  seo: '/images/services/seo.jpg',
  'publicite-en-ligne': '/images/services/publicite-en-ligne.jpg',
  branding: '/images/services/branding.jpg',
  'community-management': '/images/services/community-management.jpg',
  'automatisation-marketing': '/images/services/automatisation-marketing.jpg',
}

const faqs = [
  {
    question: 'Proposez-vous des forfaits ou des prestations à la carte ?',
    answer: 'Les deux. Je propose des accompagnements mensuels (SEO, community management, publicité) et des prestations en one-shot (création de site, branding, audit). Pour les clients qui veulent une approche globale, je propose un accompagnement croissance qui combine plusieurs services avec une vision cohérente.',
  },
  {
    question: 'Puis-je commencer par un seul service et en ajouter d\'autres ensuite ?',
    answer: 'Absolument, et c\'est même souvent la meilleure approche. La majorité de mes clients commencent par une création de site ou un audit SEO, puis ajoutent des services au fil des résultats. Il n\'y a pas d\'engagement forcé.',
  },
  {
    question: 'Comment se passe le suivi et la communication ?',
    answer: 'Un point mensuel minimum par visio ou téléphone, un accès direct par WhatsApp ou email pour les questions, et un rapport de performance mensuel sur tous les services actifs. Vous n\'avez jamais un account manager junior comme interlocuteur — c\'est toujours moi, Maurice.',
  },
  {
    question: 'Travaillez-vous uniquement avec des PME lyonnaises ?',
    answer: 'Je suis basé à Lyon et je travaille prioritairement avec des PME de la région Auvergne-Rhône-Alpes. Étant 100% en distanciel, j\'interviens aussi sur toute la France pour les clients qui le souhaitent.',
  },
]

export default function ServicesPage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    ...services.map((s) =>
      serviceSchema({
        name: s.title,
        description: s.description,
        path: s.href,
      })
    ),
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

  const serviceMap = Object.fromEntries(serviceDetails.map((s) => [s.id, s]))

  return (
    <>
      <JsonLd schema={schemas} />

      {/* Hero */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Services' },
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
            Ce que je fais pour vous
          </div>

          <h1
            className="font-display font-extrabold mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              color: 'var(--ink)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Tous vos leviers digitaux,<br />
            <em style={{ color: 'var(--brand)', fontFamily: 'var(--font-serif)' }}>
              pilotés par un seul expert.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            SEO, site web, publicité, branding, réseaux, automatisation. Pas besoin de coordonner 6 prestataires différents — tout est pensé ensemble, par quelqu&apos;un qui connaît votre activité de A à Z.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section
        className="bg-background"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-px" style={{ backgroundColor: 'var(--line)' }}>
            {services.map((service) => {
              const detail = serviceMap[service.id]
              return (
                <article
                  key={service.id}
                  className="group relative"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                >
                  <div
                    className="grid gap-8 p-8 md:p-10"
                    style={{ gridTemplateColumns: '1fr auto' }}
                  >
                    <div>
                      <div
                        className="inline-block mb-4"
                        style={{
                          fontSize: '0.65rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--brand)',
                          fontWeight: 700,
                        }}
                      >
                        {detail?.tagline}
                      </div>

                      <h2
                        className="font-display font-extrabold mb-3"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--ink)', lineHeight: 1.1 }}
                      >
                        {service.title}
                      </h2>

                      <p className="mb-3" style={{ color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {service.description}
                      </p>

                      {detail && (
                        <div className="mb-3">
                          <p
                            style={{
                              fontSize: '0.7rem',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: 'var(--brand)',
                              marginBottom: '0.3rem',
                              fontWeight: 800,
                            }}
                          >
                            Pour qui
                          </p>
                          <p style={{ color: 'var(--ink-2)', fontSize: '0.86rem', lineHeight: 1.45 }}>
                            {detail.pour}
                          </p>
                        </div>
                      )}

                      {/* 2 colonnes des `sm`, le 5e element occupant toute la
                          largeur : une liste de 5 en 2 colonnes laissait sinon
                          une derniere ligne a un seul element. */}
                      {detail?.inclus && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-0.5 mb-4 [&>li:last-child]:sm:col-span-2">
                          {detail.inclus.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5"
                              style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.4 }}
                            >
                              <span style={{ color: 'var(--brand)', flexShrink: 0, fontWeight: 800 }}>→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex gap-3 flex-wrap">
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-2 transition-colors duration-200"
                          style={{
                            padding: '0.65rem 1.5rem',
                            borderRadius: 999,
                            backgroundColor: 'var(--brand)',
                            color: 'var(--on-brand)',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          En savoir plus
                        </Link>
                        <Link
                          href="/audit-gratuit"
                          className="inline-flex items-center gap-2 transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]"
                          style={{
                            padding: '0.65rem 1.5rem',
                            border: '1px solid var(--line)',
                            color: 'var(--ink-2)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Audit gratuit
                        </Link>
                      </div>
                    </div>

                    <div
                      className="hidden md:block"
                      style={{
                        position: 'relative',
                        width: '220px',
                        height: '220px',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={serviceImages[service.id]}
                        alt={service.title}
                        fill
                        sizes="220px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </article>
              )
            })}
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
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Ce que vous vous demandez
          </h2>
          {/* Accordion natif : la liste etait entierement depliee et pesait
              1380 px sur telephone. Le schema FAQPage reste inchange, donc
              les reponses restent lisibles par Google. */}
          <div className="flex flex-col gap-1.5">
            {faqs.map(({ question, answer }, i) => (
              <details
                key={i}
                className="group rounded-xl"
                style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}
              >
                <summary
                  className="flex items-center justify-between gap-3 cursor-pointer list-none font-extrabold"
                  style={{ fontSize: '0.95rem', color: 'var(--ink)', padding: '0.85rem 1rem' }}
                >
                  {question}
                  <span
                    aria-hidden
                    className="shrink-0 transition-transform group-open:rotate-45"
                    style={{ color: 'var(--brand)', fontSize: '1.2rem', lineHeight: 1 }}
                  >
                    +
                  </span>
                </summary>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.88rem', padding: '0 1rem 0.9rem' }}>
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-background"
        style={{
          padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)',
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
        }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Par où commencer ?
          </h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Un audit gratuit de 30 minutes pour identifier les 3 actions les plus rentables pour votre activité. Sans engagement, sans jargon.
          </p>
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              borderRadius: 999,
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
