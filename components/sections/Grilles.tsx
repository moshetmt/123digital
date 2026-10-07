import Link from 'next/link'

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

function CarteCompacte({ carte, accent }: { carte: Carte; accent?: string }) {
  return (
    <div
      className="rounded flex flex-col"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        padding: 'clamp(0.85rem, 3vw, 1.4rem)',
      }}
    >
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
          {carte.lienLabel ?? 'En savoir plus'} →
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
}: {
  items: Carte[]
  /** Nombre de colonnes sur grand ecran. Toujours 2 sur telephone. */
  colonnes?: 2 | 3 | 4
}) {
  const large = colonnes === 4 ? 'lg:grid-cols-4' : colonnes === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'

  return (
    <div className={`grid grid-cols-2 ${large} gap-2.5 sm:gap-4`}>
      {items.map((carte) => (
        <CarteCompacte key={carte.titre} carte={carte} />
      ))}
    </div>
  )
}

/** Etapes numerotees, meme dessin que la methode de l'accueil. */
export function GrilleEtapes({ items }: { items: Carte[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {items.map((etape, i) => (
        <EtapeCarte key={etape.titre} etape={etape} index={i} />
      ))}
    </div>
  )
}

function EtapeCarte({ etape, index }: { etape: Carte; index: number }) {
  return (
    <div
      className="rounded"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        padding: 'clamp(0.8rem, 3vw, 1.25rem)',
      }}
    >
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
