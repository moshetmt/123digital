import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema, serviceSchema } from '@/lib/schema'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Services digitaux Lyon — SEO, Web & Ads | 123 Digital',
  description:
    'Services digitaux pour PME à Lyon et en Auvergne-Rhône-Alpes : SEO, création de site, Google Ads, branding et automatisation. Un seul expert, une stratégie cohérente pour votre croissance.',
  alternates: { canonical: `${BASE_URL}/services` },
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
        className="bg-black"
        style={{ padding: '9rem 1.5rem 6rem' }}
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
              color: 'rgba(225,224,204,0.7)',
              fontWeight: 700,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            Ce que je fais pour vous
          </div>

          <h1
            className="font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              color: '#E1E0CC',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Tous vos leviers digitaux,<br />
            <em style={{ color: '#00FF87', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
              pilotés par un seul expert.
            </em>
          </h1>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'rgba(225,224,204,0.65)' }}
          >
            SEO, site web, publicité, branding, réseaux, automatisation. Pas besoin de coordonner 6 prestataires différents — tout est pensé ensemble, par quelqu&apos;un qui connaît votre activité de A à Z.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section
        className="bg-black"
        style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
            {services.map((service) => {
              const detail = serviceMap[service.id]
              return (
                <article
                  key={service.id}
                  className="group relative"
                  style={{ backgroundColor: '#080808' }}
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
                          color: '#00FF87',
                          fontWeight: 700,
                        }}
                      >
                        {detail?.tagline}
                      </div>

                      <h2
                        className="font-display font-normal mb-3"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#E1E0CC', lineHeight: 1.1 }}
                      >
                        {service.title}
                      </h2>

                      <p className="mb-6" style={{ color: 'rgba(225,224,204,0.6)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        {service.description}
                      </p>

                      {detail && (
                        <div className="mb-6">
                          <p
                            style={{
                              fontSize: '0.72rem',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: 'rgba(225,224,204,0.4)',
                              marginBottom: '0.75rem',
                              fontWeight: 700,
                            }}
                          >
                            Pour qui
                          </p>
                          <p style={{ color: 'rgba(225,224,204,0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            {detail.pour}
                          </p>
                        </div>
                      )}

                      {detail?.inclus && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
                          {detail.inclus.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2"
                              style={{ fontSize: '0.85rem', color: 'rgba(225,224,204,0.65)' }}
                            >
                              <span style={{ color: '#00FF87', flexShrink: 0 }}>→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex gap-4 flex-wrap">
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-2 transition-colors duration-200"
                          style={{
                            padding: '0.65rem 1.5rem',
                            backgroundColor: '#00FF87',
                            color: '#080808',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                          }}
                        >
                          En savoir plus
                        </Link>
                        <Link
                          href="/audit-gratuit"
                          className="inline-flex items-center gap-2 transition-colors duration-200 hover:border-[#00FF87] hover:text-[#00FF87]"
                          style={{
                            padding: '0.65rem 1.5rem',
                            border: '1px solid rgba(225,224,204,0.2)',
                            color: 'rgba(225,224,204,0.7)',
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
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Ce que vous vous demandez
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(225,224,204,0.08)', paddingTop: '2rem' }}>
                <dt
                  className="font-display font-normal mb-4"
                  style={{ fontSize: '1.1rem', color: '#E1E0CC' }}
                >
                  {question}
                </dt>
                <dd style={{ color: 'rgba(225,224,204,0.65)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-black"
        style={{
          padding: '4rem 1.5rem 6rem',
          borderTop: '1px solid rgba(225,224,204,0.06)',
          textAlign: 'center',
        }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-display font-normal mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Par où commencer ?
          </h2>
          <p style={{ color: 'rgba(225,224,204,0.6)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Un audit gratuit de 30 minutes pour identifier les 3 actions les plus rentables pour votre activité. Sans engagement, sans jargon.
          </p>
          <Link
            href="/audit-gratuit"
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
            Demander mon audit gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
