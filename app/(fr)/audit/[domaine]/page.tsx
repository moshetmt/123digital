import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { NoteGoogle } from '@/components/sections/NoteGoogle'
import { SignalOuverture } from '@/components/audits/SignalOuverture'
import { BASE_URL } from '@/lib/schema'
import { trouverAudit } from '@/lib/audits-prospects'
import audits from '@/data/audits-prospects.json'

// Page d'audit personnelle d'un prospect (validé par Moshé le 25/10/2026) : son site sur un
// téléphone, ses 2 ou 3 défauts, un appel direct. Le lien est envoyé par mail au patron ; la page
// n'est ni indexée ni dans le sitemap. Données : data/audits-prospects.json (_scripts/audits-prospects.mjs).
// Aucun chiffre ni nom d'un autre client, pas de pastille (règles de Moshé).

const TEL = 'tel:+33652092301'

interface PageProps {
  params: Promise<{ domaine: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return audits.map((a) => ({ domaine: a.domaine }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const audit = trouverAudit(audits, (await params).domaine)
  if (!audit) return {}
  return {
    title: `Ce qu'un client voit sur ${audit.domaine} | 123 Digital`,
    description: `${audit.constats.length === 1 ? 'Un point relevé' : `${audit.constats.length} points relevés`} sur ${audit.domaine} depuis un téléphone, et comment les corriger en quelques heures.`,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical: `${BASE_URL}/audit/${audit.domaine}` },
  }
}

const h2Style = { fontSize: 'clamp(1.35rem, 2.6vw, 1.9rem)', color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.15 }
const pStyle = { color: 'var(--ink-2)', lineHeight: 1.65 }

export default async function AuditProspectPage({ params }: PageProps) {
  const audit = trouverAudit(audits, (await params).domaine)
  if (!audit) notFound()

  const slug = audit.domaine.replaceAll('.', '-')
  // Midi : une date ISO nue est lue en UTC et recule d'un jour à l'affichage.
  const le = new Date(`${audit.date}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const pluriel = audit.constats.length > 1

  return (
    <>
      <SignalOuverture domaine={audit.domaine} />

      <PageBanner
        align="left"
        breadcrumb={
          <p style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.85 }}>
            Regardé le {le} par Moshé Timsit, 123digital
          </p>
        }
        title={`Ce qu'un client voit sur ${audit.domaine}`}
        highlight={audit.domaine}
        sub="Regardé sur un téléphone, comme un client qui vous cherche."
        actions={
          <>
            <BannerCta href={TEL}>Appeler Moshé : 06 52 09 23 01</BannerCta>
            <BannerCtaLine href="#constats">{pluriel ? `Voir les ${audit.constats.length} points` : 'Voir le point relevé'}</BannerCtaLine>
          </>
        }
      />

      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2rem, 5vw, 3rem)' }}>
        <div className={`mx-auto max-w-5xl grid grid-cols-1 gap-10 md:gap-14 ${audit.capture ? 'md:grid-cols-[300px_1fr]' : ''} items-start`}>
          {audit.capture && (
            // Un simple cadre arrondi, pas de mockup : la capture est prise sur un iPhone de 390 px (capture.py --mobile).
            <figure className="mx-auto w-full md:sticky md:top-24" style={{ maxWidth: 300, margin: '0 auto' }}>
              <div style={{ border: '1px solid var(--line-strong)', borderRadius: 28, padding: 8, backgroundColor: 'var(--surface-2)' }}>
                <Image
                  src={`/images/audits/${slug}.jpg`}
                  alt={`Le site ${audit.nom} (${audit.domaine}) tel qu'il s'affiche sur un téléphone`}
                  width={600}
                  height={1298}
                  sizes="(max-width: 768px) 80vw, 300px"
                  priority
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }}
                />
              </div>
              <figcaption style={{ fontSize: '0.78rem', color: 'var(--ink-3)', textAlign: 'center', marginTop: '0.6rem' }}>
                Votre page d&apos;accueil sur un iPhone, le {le}
              </figcaption>
            </figure>
          )}

          <div className="mx-auto w-full max-w-3xl">
            <p className="mb-6" style={{ ...pStyle, color: 'var(--ink)', fontWeight: 600, fontSize: '1.05rem' }}>
              J&apos;ai ouvert {audit.domaine} depuis un téléphone, sans rien connaître de vous, comme le ferait un client
              qui vous cherche. Voilà ce qui lui fait perdre votre trace.
            </p>

            <ol id="constats" style={{ scrollMarginTop: '6rem' }}>
              {audit.constats.map((c, i) => (
                <li
                  key={c.titre}
                  className="grid grid-cols-[2.75rem_1fr] gap-4"
                  style={{ padding: '1.5rem 0', borderTop: '1px solid var(--line)' }}
                >
                  <span
                    aria-hidden
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '2rem', lineHeight: 1, color: 'var(--brand)' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="font-display font-extrabold mb-2" style={h2Style}>
                      {c.titre}
                    </h2>
                    <p className="mb-2" style={pStyle}>
                      {c.texte}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', fontWeight: 600 }}>
                      Vérifiable en dix secondes sur votre téléphone.
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="font-display font-extrabold mt-10 mb-4" style={h2Style}>
              Ce que je propose
            </h2>
            <p className="mb-4" style={pStyle}>
              {pluriel ? 'Ces points se corrigent' : 'Ce point se corrige'} en quelques heures de travail. Pas une refonte, pas un
              nouveau site : vos pages telles qu&apos;elles sont, débarrassées de ce qui fait fuir.
            </p>
            <p className="mb-4" style={pStyle}>
              Vous choisissez qui le fait. Je vous envoie la marche à suivre exacte, point par point, et vous la donnez à
              la personne qui s&apos;occupe de votre site. Si vous préférez que je m&apos;en charge, je vous dis le temps
              que ça prend et ce que ça coûte avant de commencer.
            </p>
            <p className="mb-8" style={pStyle}>
              Première étape : quinze minutes au téléphone, offertes, pour voir ensemble ce qui compte le plus pour vous.
            </p>

            <div
              className="grid grid-cols-[88px_1fr] sm:grid-cols-[110px_1fr] gap-4 sm:gap-6 items-center rounded"
              style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', padding: 'clamp(1rem, 3.5vw, 1.5rem)' }}
            >
              <Image
                src="/images/maurice-timsit-portrait.jpg"
                alt="Moshé Timsit, 123digital, Lyon"
                width={110}
                height={138}
                sizes="(max-width: 640px) 88px, 110px"
                className="rounded"
                style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid var(--line-strong)' }}
              />
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>Moshé Timsit</p>
                <p className="mb-2" style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>
                  123digital, consultant web à Lyon. Vous parlez à la personne qui fait le travail.
                </p>
                <NoteGoogle />
                <div className="flex flex-wrap gap-2.5 mt-4">
                  <a href={TEL} className="btn-plein">
                    Appeler le 06 52 09 23 01
                  </a>
                  <Link href="/audit-gratuit" className="btn-contour">
                    Qu&apos;on en parle 15 min
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
