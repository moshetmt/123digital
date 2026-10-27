import Link from 'next/link'
import Image from 'next/image'
import { Clock, type LucideIcon } from 'lucide-react'

// ── Grilles de contenu ────────────────────────────────────────────────────────
// Le vocabulaire visuel de l'accueil, disponible pour les pages internes.
//
// Pourquoi elles existent : les pages service alignaient des cartes larges avec
// cinq a huit lignes de texte, puis on a essaye de tout replier en accordeon.
// Les deux etaient mauvais. L'accueil, lui, tient parce que ses cartes sont
// petites : deux colonnes des le telephone, titre a 0,9 rem, texte a 0,8 rem.
// Charte v2 : rayon 4 px, aucune ombre, chips en texte separe par un point
// median (toujours visible, y compris sur telephone).

interface Carte {
  /** Rend la carte cliquable, avec le lien de fin comme sur l accueil. */
  href?: string
  lienLabel?: string
  titre: string
  texte: string
  /** Mots courts, affiches en texte separe par « · ». */
  chips?: string[]
  /** Ligne discrete en bas de carte : delai, prix, precision. */
  note?: string
}

function CarteCompacte({ carte, accent, Icone }: { carte: Carte; accent?: string; Icone?: LucideIcon }) {
  return (
    <div
      className="rounded flex flex-col"
      style={{
        backgroundColor: 'var(--surface-3)',
        border: '1px solid var(--line)',
        padding: 'clamp(0.85rem, 3vw, 1.4rem)',
      }}
    >
      {Icone && (
        // Tuile carree a angles de 4 px (jamais un cercle) : le picto fait ~55 % de la tuile, rien n'est rogne.
        <div
          aria-hidden
          className="rounded flex items-center justify-center"
          style={{ width: 40, height: 40, backgroundColor: 'var(--brand-tint)', color: 'var(--brand-strong)', marginBottom: '0.7rem' }}
        >
          <Icone size={22} strokeWidth={1.9} />
        </div>
      )}
      {accent && (
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brand-strong)',
            fontWeight: 800,
            marginBottom: '0.4rem',
          }}
        >
          {accent}
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(0.92rem, 3.4vw, 1.05rem)',
          color: 'var(--ink)',
          marginBottom: '0.3rem',
          lineHeight: 1.2,
        }}
      >
        {carte.titre}
      </h3>

      <p
        style={{
          fontSize: 'clamp(0.78rem, 2.6vw, 0.87rem)',
          color: 'var(--ink-2)',
          lineHeight: 1.45,
          flex: 1,
        }}
      >
        {carte.texte}
      </p>

      {carte.chips && carte.chips.length > 0 && (
        <div className="mt-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-2)' }}>
          {carte.chips.join(' · ')}
        </div>
      )}

      {carte.href && (
        <Link
          href={carte.href}
          className="btn-contour"
          style={{ marginTop: '0.8rem' }}
        >
          {carte.lienLabel ?? 'En savoir plus'}
        </Link>
      )}

      {carte.note && (
        <div style={{ marginTop: '0.7rem', fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-3)' }}>
          {carte.note}
        </div>
      )}
    </div>
  )
}

/** Grille de cartes, deux colonnes des le telephone comme sur l'accueil. */
export function GrilleCartes({
  items,
  colonnes = 3,
  icones,
}: {
  items: Carte[]
  /** Un picto lucide par carte, dans l'ordre. Optionnel. */
  icones?: LucideIcon[]
  /** Nombre de colonnes sur grand ecran. Toujours 2 sur telephone. */
  colonnes?: 2 | 3 | 4
}) {
  const large = colonnes === 4 ? 'lg:grid-cols-4' : colonnes === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'

  return (
    <div className={`grid grid-cols-2 ${large} gap-2.5 sm:gap-4`}>
      {items.map((carte, i) => (
        <CarteCompacte key={carte.titre} carte={carte} Icone={icones?.[i]} />
      ))}
    </div>
  )
}

/** Etapes numerotees, meme dessin que la methode de l'accueil. */
const ETAPE_IMAGES = ['etape-1-appel', 'etape-2-plan', 'etape-3-mise-en-oeuvre', 'etape-4-resultats']

export function GrilleEtapes({ items, illustrees = false }: { items: Carte[]; /** Reprend les 4 scenes illustrees de l'accueil (etape-1 a 4). */ illustrees?: boolean }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {items.map((etape, i) => (
        <EtapeCarte key={etape.titre} etape={etape} index={i} illustre={illustrees && i < 4} />
      ))}
    </div>
  )
}

function EtapeCarte({ etape, index, illustre }: { etape: Carte; index: number; illustre?: boolean }) {
  return (
    <div
      className="rounded"
      style={{
        backgroundColor: 'var(--surface-3)',
        border: '1px solid var(--line)',
        padding: 'clamp(0.8rem, 3vw, 1.25rem)',
      }}
    >
      {illustre && (
        <div className="relative h-[110px] lg:h-[150px] w-full mb-2">
          <Image
            src={`/images/illustrations/${ETAPE_IMAGES[index]}.webp`}
            alt=""
            fill
            sizes="(min-width: 1024px) 200px, 45vw"
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
          />
        </div>
      )}
      {/* Numero en texte plein, jamais en pastille ronde (charte v2, section 6). */}
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: '1.15rem',
          color: 'var(--brand)',
          letterSpacing: '-0.02em',
          marginBottom: '0.4rem',
        }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(0.88rem, 3.2vw, 1rem)',
          color: 'var(--ink)',
          marginBottom: '0.25rem',
          lineHeight: 1.2,
        }}
      >
        {etape.titre}
      </h3>
      <p style={{ fontSize: 'clamp(0.76rem, 2.6vw, 0.85rem)', color: 'var(--ink-2)', lineHeight: 1.4 }}>
        {etape.texte}
      </p>
    </div>
  )
}

interface Tarif {
  label: string
  price: string
  desc: string
  delay: string
}

/** Formules de prix en cartes : formule, prix en gros, texte, delai avec horloge. */
export function GrilleTarifs({ items, prefixeDelai = '' }: { items: Tarif[]; prefixeDelai?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
      {items.map((t) => (
        <div
          key={t.label}
          className="rounded flex flex-col"
          style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: 'clamp(1rem, 3.5vw, 1.5rem)' }}
        >
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800, marginBottom: '0.5rem' }}>
            {t.label}
          </div>
          <div
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(1.35rem, 5vw, 1.6rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '0.7rem' }}
          >
            {t.price}
          </div>
          <p style={{ fontSize: 'clamp(0.82rem, 2.8vw, 0.9rem)', color: 'var(--ink-2)', lineHeight: 1.5, flex: 1 }}>{t.desc}</p>
          <div
            className="flex items-center gap-2"
            style={{ marginTop: '0.9rem', paddingTop: '0.8rem', borderTop: '1px solid var(--line)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-2)' }}
          >
            <Clock size={15} strokeWidth={2} aria-hidden style={{ color: 'var(--brand)', flexShrink: 0 }} />
            {prefixeDelai}{t.delay}
          </div>
        </div>
      ))}
    </div>
  )
}
