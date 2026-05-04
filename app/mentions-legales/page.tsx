import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Mentions légales — 123 Digital',
  description: 'Mentions légales, politique de confidentialité et informations légales du site 123digital.fr.',
  alternates: { canonical: `${BASE_URL}/mentions-legales` },
  robots: { index: false, follow: true },
}

export default function MentionsLegalesPage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Mentions légales', path: '/mentions-legales' },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schemas} />

      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Mentions légales' },
              ]}
            />
          </div>

          <h1
            className="font-display font-normal mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#E1E0CC', lineHeight: 1.1 }}
          >
            Mentions légales
          </h1>

          <div className="space-y-10" style={{ color: 'rgba(225,224,204,0.7)', lineHeight: 1.8, fontSize: '0.92rem' }}>

            <section>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
              >
                Éditeur du site
              </h2>
              <p>
                Le site 123digital.fr est édité par :<br />
                <strong style={{ color: '#E1E0CC' }}>Maurice Timsit</strong><br />
                Consultant en croissance digitale — Entrepreneur individuel<br />
                Siège social : Lyon (69), France<br />
                Email : <a href="mailto:maurice@123digital.fr" style={{ color: '#00FF87' }}>maurice@123digital.fr</a><br />
                SIRET : en cours d&apos;immatriculation
              </p>
            </section>

            <section>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
              >
                Hébergement
              </h2>
              <p>
                Ce site est hébergé par :<br />
                <strong style={{ color: '#E1E0CC' }}>Vercel Inc.</strong><br />
                340 Pine Street, Suite 701<br />
                San Francisco, CA 94104, États-Unis<br />
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00FF87' }}>vercel.com</a>
              </p>
            </section>

            <section>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
              >
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, illustrations, design) est la propriété exclusive de Maurice Timsit, sauf mention contraire. Toute reproduction, totale ou partielle, est interdite sans autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
              >
                Données personnelles & RGPD
              </h2>
              <p>
                Les données collectées via les formulaires de contact (nom, email) sont utilisées uniquement pour répondre à vos demandes. Elles ne sont ni vendues ni transmises à des tiers. Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                Pour exercer ces droits : <a href="mailto:maurice@123digital.fr" style={{ color: '#00FF87' }}>maurice@123digital.fr</a>
              </p>
            </section>

            <section>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
              >
                Cookies
              </h2>
              <p>
                Ce site utilise des cookies techniques essentiels au fonctionnement du site. Aucun cookie publicitaire ou de tracking tiers n&apos;est déposé sans votre consentement. L&apos;analyse des statistiques, si activée, est effectuée de manière anonyme.
              </p>
            </section>

            <section>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
              >
                Responsabilité
              </h2>
              <p>
                Maurice Timsit s&apos;efforce de maintenir les informations de ce site à jour mais ne peut garantir leur exactitude à tout moment. La responsabilité du site ne saurait être engagée pour tout dommage direct ou indirect résultant de l&apos;utilisation de ces informations.
              </p>
            </section>

            <section>
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: '1.3rem', color: '#E1E0CC' }}
              >
                Droit applicable
              </h2>
              <p>
                Ce site est soumis au droit français. Tout litige relatif à son utilisation relève de la compétence exclusive des tribunaux français.
              </p>
            </section>

            <p style={{ fontSize: '0.8rem', color: 'rgba(225,224,204,0.35)', marginTop: '3rem', borderTop: '1px solid rgba(225,224,204,0.06)', paddingTop: '1.5rem' }}>
              Dernière mise à jour : mai 2026
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
