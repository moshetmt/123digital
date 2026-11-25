import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BASE_URL, breadcrumbSchema } from '@/lib/schema'

// Politique de confidentialité (25/10/2026) : page de confiance que les agents IA
// vérifient (/privacy y redirige). Même gabarit que les mentions légales.

export const metadata: Metadata = {
  title: 'Politique de confidentialité · 123 Digital',
  description: 'Quelles données 123digital.fr collecte, pourquoi, chez qui elles sont stockées, combien de temps, et comment exercer vos droits.',
  alternates: { canonical: `${BASE_URL}/confidentialite` },
  robots: { index: false, follow: true },
}

const titre = { fontSize: '1.3rem', color: 'var(--ink)' }
const lien = { color: 'var(--brand)' }

function Bloc({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-extrabold mb-4" style={titre}>{t}</h2>
      {children}
    </section>
  )
}

export default function ConfidentialitePage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Confidentialité', path: '/confidentialite' },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schemas} />
      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)' }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Confidentialité' }]} />
          </div>

          <h1
            className="font-display font-extrabold mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--ink)', lineHeight: 1.1 }}
          >
            Politique de confidentialité
          </h1>

          <div className="space-y-10" style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '0.92rem' }}>
            <Bloc t="Responsable du traitement">
              <p>
                Maurice Timsit, consultant indépendant, 123 Digital, Lyon (69), France. Contact pour toute question sur vos données :{' '}
                <a href="mailto:contact@123digital.fr" style={lien}>contact@123digital.fr</a>.
              </p>
            </Bloc>

            <Bloc t="Données collectées par le formulaire">
              <p>
                Quand vous demandez un audit ou un rappel, le formulaire transmet votre prénom, votre email ou votre téléphone, et la description de votre besoin. S&apos;y ajoutent la page d&apos;où vous écrivez et, si vous êtes arrivé par une annonce ou un lien de campagne, l&apos;identifiant de ce clic (par exemple le paramètre gclid de Google Ads), conservé au plus 90 jours dans votre navigateur.
              </p>
            </Bloc>

            <Bloc t="Pourquoi">
              <p>
                Ces données servent à vous répondre, à suivre votre demande et à savoir quelles pages ou quelles annonces amènent des demandes. Elles ne sont ni vendues, ni louées, ni utilisées pour un envoi en masse. La base légale est votre demande de contact et, pour la mesure, votre consentement.
              </p>
            </Bloc>

            <Bloc t="Où vont les données">
              <p>
                Votre message arrive par email (service d&apos;envoi Resend) dans la messagerie de Maurice Timsit et dans un tableau Google Sheets privé. Le site est hébergé par Vercel. Ces prestataires sont établis aux États-Unis ; les transferts sont encadrés par les garanties prévues par le RGPD (clauses contractuelles types de la Commission européenne ou Data Privacy Framework).
              </p>
            </Bloc>

            <Bloc t="Mesure d'audience et cookies">
              <p>
                Google Analytics et la mesure Google Ads ne déposent de cookies que si vous les acceptez dans le bandeau. Sans accord, Google ne reçoit que des signaux anonymes, sans cookie. Le lien « Cookies » en bas de chaque page permet de changer d&apos;avis. Détail dans les <a href="/mentions-legales#cookies" style={lien}>mentions légales</a>.
              </p>
            </Bloc>

            <Bloc t="Durée de conservation">
              <p>
                Les demandes sont gardées trois ans après le dernier échange, puis supprimées. Si vous devenez client, les documents de facturation sont conservés dix ans, comme la loi l&apos;impose.
              </p>
            </Bloc>

            <Bloc t="Vos droits">
              <p>
                Vous pouvez demander l&apos;accès à vos données, leur correction, leur effacement, leur portabilité, la limitation du traitement ou vous y opposer, en écrivant à{' '}
                <a href="mailto:contact@123digital.fr" style={lien}>contact@123digital.fr</a>. Réponse sous un mois. Si la réponse ne vous convient pas, vous pouvez saisir la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={lien}>cnil.fr</a>).
              </p>
            </Bloc>

            <p style={{ fontSize: '0.8rem', color: 'var(--ink-3)', marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
              Dernière mise à jour : 25 octobre 2026
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
