import type { ReactNode } from 'react'
import Link from 'next/link'
import { EcranReconstruit, Flag } from '@/components/sections/EcranReconstruit'

// ── Banniere de page ──────────────────────────────────────────────────────────
// Charte v2 (section 6) : fond blanc, titre a gauche avec un mot en 600, corps
// en 800, deux boutons rectangulaires. A droite sur desktop / en dessous sur
// mobile : un ecran reconstruit, version courte a deux resultats, avec le
// titre de la page comme requete.
//
// `icone`, `image` et `ballRadius` restent acceptes pour ne pas casser les
// ~19 pages qui les passent encore (le decor Pong et la photo de fond ont
// disparu) : ils ne sont plus lus par ce composant.

interface PageBannerProps {
  /** Ancien decor Pong : non lu, garde pour compatibilite des appelants. */
  icone?: string
  /** Titre de la page. Le h1 unique. */
  title: string
  /** Mot ou fin de phrase a detacher en 600, s'il apparait dans le titre. */
  highlight?: string
  /** Une a deux phrases. Au-dela, c'est du contenu de section, pas de banniere. */
  sub?: string
  /** Fil d'Ariane, deja rendu par la page appelante. */
  breadcrumb?: ReactNode
  /** Boutons, en general <BannerCta> et <BannerCtaLine>. */
  actions?: ReactNode
  /** Toutes les bannieres s'alignent a gauche (charte v2, section 6). */
  align?: 'left' | 'center'
  /** Ancien diametre de la loupe : non lu, garde pour compatibilite. */
  ballRadius?: number
  /** Ancienne photo de fond : non lue, gardee pour compatibilite. */
  image?: { src: string; alt?: string; priority?: boolean }
  /** Contenu libre sous les boutons (puces de reassurance, chiffre cle). */
  children?: ReactNode
}

export function PageBanner({
  title,
  highlight,
  sub,
  breadcrumb,
  actions,
  children,
}: PageBannerProps) {
  const requete = title.replace(/\.$/, '').toLowerCase()

  return (
    <section style={{ background: 'var(--surface)', padding: 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem' }}>
      <div className="mx-auto w-full max-w-6xl grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          {breadcrumb && <div className="mb-4">{breadcrumb}</div>}

          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.6vw, 2.75rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              maxWidth: '22ch',
              marginBottom: sub ? '0.85rem' : '1.1rem',
            }}
          >
            {detacher(title, highlight)}
          </h1>

          {sub && (
            <p
              style={{
                fontSize: 'clamp(0.95rem, 3.2vw, 1.08rem)',
                color: 'var(--ink-2)',
                maxWidth: '58ch',
                marginBottom: 'clamp(1rem, 3.5vw, 1.5rem)',
                lineHeight: 1.55,
              }}
            >
              {sub}
            </p>
          )}

          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}

          {children}
        </div>

        <EcranReconstruit
          requete={requete}
          resultats={[
            {
              url: 'concurrent-lyon.fr',
              titre: `${title.replace(/\.$/, '')} · Devis gratuit`,
              description: 'Fiche complète, en tête des résultats.',
            },
            {
              url: 'votre-site.fr',
              titre: 'Accueil',
              description: <><Flag>Page 3.</Flag> Ni ville, ni métier dans le titre.</>,
              vous: true,
            },
          ]}
          className="lg:justify-self-end"
        />
      </div>
    </section>
  )
}

// Le mot detache est cherche tel quel dans le titre : pas de decoupage
// automatique, l'appelant decide ce qu'il veut mettre en avant.
function detacher(title: string, highlight?: string): ReactNode {
  if (!highlight || !title.includes(highlight)) return title

  const [avant, ...reste] = title.split(highlight)
  return (
    <>
      {avant}
      <span style={{ color: 'var(--brand)' }}>{highlight}</span>
      {reste.join(highlight)}
    </>
  )
}

/** Bouton principal de banniere : plein 600, rayon 4 px. */
export function BannerCta({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'inline-flex items-center gap-2 rounded font-bold whitespace-nowrap px-5 py-2.5 text-[0.92rem] transition duration-150 active:scale-[0.97]'
  const style = { backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }

  return href.startsWith('/') ? (
    <Link href={href} className={className} style={style}>{children}</Link>
  ) : (
    <a href={href} className={className} style={style}>{children}</a>
  )
}

/** Bouton secondaire : contour 600, fond transparent. */
export function BannerCtaLine({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'inline-flex items-center gap-2 rounded font-bold whitespace-nowrap px-5 py-2.5 text-[0.92rem] transition duration-150 active:scale-[0.97]'
  const style = { border: '1px solid var(--brand)', color: 'var(--brand)' }

  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href} className={className} style={style}>{children}</Link>
  ) : (
    <a href={href} className={className} style={style}>{children}</a>
  )
}
