import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PongCanvas } from '@/components/sections/PongCanvas'
import type { NomIcone } from '@/lib/icones-pong'

// ── Banniere de page ──────────────────────────────────────────────────────────
// Avant le 20/08, chaque page ecrivait sa propre banniere a la main : seize
// heros differents, et l'accueil qui partait tout seul de son cote a chaque
// refonte. Tout passe desormais par ce composant. Une seule regle : si une page
// a besoin d'une variante, on ajoute une prop ici, on ne recopie pas la section.
//
// Fond vert de marque, texte blanc, partie de Pong derriere. Le mot mis en
// valeur du titre passe en vert pale.

interface PageBannerProps {
  /** Icone portee par la balle du Pong : le sujet de la page. */
  icone?: NomIcone
  /** Titre de la page. Le h1 unique. */
  title: string
  /** Mot ou fin de phrase a detacher en vert pale, s'il apparait dans le titre. */
  highlight?: string
  /** Une a deux phrases. Au-dela, c'est du contenu de section, pas de banniere. */
  sub?: string
  /** Fil d'Ariane, deja rendu par la page appelante. */
  breadcrumb?: ReactNode
  /** Boutons, en general <BannerCta> et <BannerCtaLine>. */
  actions?: ReactNode
  /** L'accueil est centre, les pages internes sont alignees a gauche. */
  align?: 'left' | 'center'
  /** Diametre de la loupe. 30 par defaut, 22 sur les bannieres courtes. */
  ballRadius?: number
  /** Photo de fond, fondue dans le vert. Les images des services et des villes
   *  dormaient dans public/images sans etre affichees nulle part. */
  image?: { src: string; alt?: string; priority?: boolean }
  /** Contenu libre sous les boutons (puces de reassurance, chiffre cle). */
  children?: ReactNode
}

export function PageBanner({
  icone,
  title,
  highlight,
  sub,
  breadcrumb,
  actions,
  align = 'left',
  ballRadius = 30,
  image,
  children,
}: PageBannerProps) {
  const centered = align === 'center'

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        padding: 'clamp(1.5rem, 5vw, 3.5rem) 1.5rem clamp(1.75rem, 5vw, 3.5rem)',
        color: 'var(--on-brand)',
        background:
          'radial-gradient(120% 85% at 12% 0%, var(--brand-light) 0%, transparent 58%), ' +
          'radial-gradient(110% 90% at 92% 100%, var(--brand-deep) 0%, transparent 62%), ' +
          'var(--brand)',
      }}
    >
      {/* Photo posee sous le Pong, desaturee et fondue dans le vert : elle donne
          le lieu ou le metier sans jamais concurrencer le titre blanc. */}
      {image && (
        <div aria-hidden className="absolute inset-0 -z-30">
          <Image
            src={image.src}
            alt=""
            fill
            priority={image.priority}
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.16, filter: 'grayscale(0.6) brightness(0.75)' }}
          />
        </div>
      )}

      <PongCanvas ballRadius={ballRadius} icone={icone} />

      {/* Voile vert, pas noir : il assombrit a peine le centre pour que le texte
          blanc reste net quand la loupe passe derriere, et laisse les bords
          libres pour les raquettes. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(88% 58% at 50% 46%, oklch(0.395 0.112 155 / 72%) 0%, oklch(0.395 0.112 155 / 34%) 58%, oklch(0.395 0.112 155 / 0%) 100%)',
        }}
      />

      <div className={`relative mx-auto max-w-4xl ${centered ? 'text-center' : ''}`}>
        {breadcrumb && <div className="mb-4">{breadcrumb}</div>}

        <h1
          className={centered ? 'mx-auto' : ''}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4.4vw, 3rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--on-brand)',
            maxWidth: '22ch',
            marginBottom: sub ? '0.85rem' : '1.1rem',
          }}
        >
          {detacher(title, highlight)}
        </h1>

        {sub && (
          <p
            className={centered ? 'mx-auto' : ''}
            style={{
              fontSize: 'clamp(0.95rem, 3.2vw, 1.08rem)',
              color: 'oklch(0.985 0.003 150 / 86%)',
              maxWidth: '58ch',
              marginBottom: 'clamp(1rem, 3.5vw, 1.5rem)',
              lineHeight: 1.5,
            }}
          >
            {sub}
          </p>
        )}

        {actions && (
          <div className={`flex flex-wrap items-center gap-3 ${centered ? 'justify-center' : ''}`}>
            {actions}
          </div>
        )}

        {children}
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
      <span style={{ color: 'var(--vert-pale)' }}>{highlight}</span>
      {reste.join(highlight)}
    </>
  )
}

/** Bouton principal de banniere : blanc sur vert, le plus contraste de la page. */
export function BannerCta({ href, children }: { href: string; children: ReactNode }) {
  const inner = (
    <>
      {children}
    </>
  )
  // Compact sur telephone : c'est a cette taille que deux boutons tiennent
  // encore cote a cote au lieu de s'empiler.
  const className =
    'inline-flex items-center gap-2 rounded-full font-bold whitespace-nowrap px-4 py-2.5 text-[0.86rem] sm:px-6 sm:py-3 sm:text-[0.95rem]'
  const style = {
    backgroundColor: 'var(--on-brand)',
    color: 'var(--brand-deep)',
    boxShadow: '0 2px 14px oklch(0.145 0 0 / 22%)',
  }

  return href.startsWith('/') ? (
    <Link href={href} className={className} style={style}>{inner}</Link>
  ) : (
    <a href={href} className={className} style={style}>{inner}</a>
  )
}

/** Bouton secondaire : contour blanc, fond transparent. */
export function BannerCtaLine({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'inline-flex items-center gap-2 rounded-full font-bold whitespace-nowrap px-4 py-2.5 text-[0.86rem] sm:px-5 sm:py-3 sm:text-[0.95rem]'
  const style = {
    border: '1.5px solid oklch(0.985 0.003 150 / 55%)',
    color: 'var(--on-brand)',
  }

  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href} className={className} style={style}>{children}</Link>
  ) : (
    <a href={href} className={className} style={style}>{children}</a>
  )
}
