import type { ReactNode } from 'react'
import Link from 'next/link'
import { PongCanvas } from '@/components/sections/PongCanvas'

// ── Banniere de page ──────────────────────────────────────────────────────────
// Fond vert de marque anime par le Pong, titre avec un mot detache, corps en
// 800, deux boutons rectangulaires.
//
// ⛔ Pas d'« ecran reconstruit » ici : la carte de resultats Google posee a
// droite par la charte v2 a ete retiree le 09/09 sur decision de l'operateur
// (« on comprend rien, ca tombe pas sous le sens »). Ne pas la remettre.
//
// ⚠️ Le decor Pong avait ete retire par la charte v2 le 08/09 : l'operateur l'a
// redemande le 09/09 (« j'adorais ca »). Ne pas le resupprimer sans un mot
// explicite de sa part. Le decor vit dans PongCanvas, partage avec Hero.
//
// `icone`, `image` et `ballRadius` restent acceptes pour ne pas casser les
// ~19 pages qui les passent encore : ils ne sont pas lus par ce composant.

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
  /** Alignement du bloc de texte. Centre par defaut, comme l'accueil. */
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
  align = 'center',
  children,
}: PageBannerProps) {
  const centre = align === 'center'

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        padding: 'clamp(2.25rem, 6vw, 4.5rem) 1.5rem',
        color: 'var(--on-brand)',
        background:
          'radial-gradient(120% 85% at 12% 0%, var(--brand-light) 0%, transparent 58%), ' +
          'radial-gradient(110% 90% at 92% 100%, var(--brand-deep) 0%, transparent 62%), ' +
          'var(--brand)',
      }}
    >
      <PongCanvas />

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(88% 58% at 30% 46%, oklch(0.395 0.112 155 / 72%) 0%, oklch(0.395 0.112 155 / 34%) 58%, oklch(0.395 0.112 155 / 0%) 100%)',
        }}
      />

      <div className={`relative mx-auto w-full max-w-4xl ${centre ? 'text-center' : ''}`}>
        <div>
          {breadcrumb && <div className="mb-4">{breadcrumb}</div>}

          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.6vw, 2.75rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--on-brand)',
              maxWidth: '22ch',
              margin: centre ? `0 auto ${sub ? '0.85rem' : '1.1rem'}` : `0 0 ${sub ? '0.85rem' : '1.1rem'}`,
            }}
          >
            {detacher(title, highlight)}
          </h1>

          {sub && (
            <p
              style={{
                fontSize: 'clamp(0.95rem, 3.2vw, 1.08rem)',
                color: 'oklch(0.985 0.003 150 / 86%)',
                maxWidth: '58ch',
                marginBottom: 'clamp(1rem, 3.5vw, 1.5rem)',
                marginLeft: centre ? 'auto' : undefined,
                marginRight: centre ? 'auto' : undefined,
                lineHeight: 1.55,
              }}
            >
              {sub}
            </p>
          )}

          {actions && (
            <div className={`flex flex-wrap items-center gap-3 ${centre ? 'justify-center' : ''}`}>
              {actions}
            </div>
          )}

          {children}
        </div>

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
      <span style={{ color: 'var(--brand-tint)' }}>{highlight}</span>
      {reste.join(highlight)}
    </>
  )
}

/** Bouton principal de banniere : blanc sur le vert du fond, rayon 4 px. */
export function BannerCta({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'inline-flex items-center gap-2 rounded font-bold whitespace-nowrap px-5 py-2.5 text-[0.92rem] transition duration-150 active:scale-[0.97]'
  const style = { backgroundColor: 'var(--on-brand)', color: 'var(--brand-deep)' }

  return href.startsWith('/') ? (
    <Link href={href} className={className} style={style}>{children}</Link>
  ) : (
    <a href={href} className={className} style={style}>{children}</a>
  )
}

/** Bouton secondaire : contour clair, fond transparent, sur le vert du fond. */
export function BannerCtaLine({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'inline-flex items-center gap-2 rounded font-bold whitespace-nowrap px-5 py-2.5 text-[0.92rem] transition duration-150 active:scale-[0.97]'
  const style = { border: '1px solid oklch(0.985 0.003 150 / 55%)', color: 'var(--on-brand)' }

  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href} className={className} style={style}>{children}</Link>
  ) : (
    <a href={href} className={className} style={style}>{children}</a>
  )
}
