import type { ReactNode } from 'react'

// ── L'écran reconstruit ──────────────────────────────────────────────────────
// Le système visuel central de la charte v2 (charte-graphique.md section 6) :
// un résultat Google redessiné dans la charte, jamais une capture brute, avec
// le curseur du logo qui pointe ce qui compte. Composant serveur, sans
// animation, sans dépendance : cf. le bloc `.screen` de charte-visuelle.html.

export interface ResultatEcran {
  url: string
  titre: string
  description: ReactNode
  /** Le résultat qui représente le client : surligné en 100, sa description
   *  porte le problème (en alerte). */
  vous?: boolean
}

interface EcranReconstruitProps {
  /** Requête tapée dans la barre, affichée après « google.fr · ». */
  requete: string
  resultats: ResultatEcran[]
  className?: string
}

export function EcranReconstruit({ requete, resultats, className }: EcranReconstruitProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 560,
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
    >
      {/* Barre d'adresse — aplat 100, 28 px, l'URL en petit texte */}
      <div
        style={{
          background: 'var(--surface-3)',
          height: 28,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          fontSize: '0.75rem',
          color: 'var(--ink-2)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        google.fr · {requete}
      </div>

      <div style={{ padding: '16px 18px' }}>
        {resultats.map((r, i) => (
          <div
            key={r.url}
            style={{
              padding: '9px 0',
              borderBottom: i < resultats.length - 1 ? '1px solid var(--line)' : 'none',
              ...(r.vous
                ? { background: 'var(--surface-3)', margin: '0 -18px', padding: '9px 18px' }
                : {}),
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--ink-2)' }}>{r.url}</div>
            <div
              style={{
                fontSize: '1.02rem',
                fontWeight: 600,
                color: r.vous ? 'var(--ink)' : 'var(--brand)',
                margin: '2px 0',
              }}
            >
              {r.titre}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-2)' }}>{r.description}</div>
          </div>
        ))}
      </div>

      {/* Curseur du logo : rotation 12°, largeur 1/12 du cadre, pointe le
          dernier résultat (le vôtre). */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        style={{
          position: 'absolute',
          width: '8.3333%',
          aspectRatio: '1 / 1',
          right: '9%',
          bottom: '10%',
          transform: 'rotate(12deg)',
        }}
      >
        <path
          d="M5 3 L5 19 L9.5 15.6 L12.4 21.5 L15.2 20.2 L12.3 14.4 L18 13.6 Z"
          style={{ fill: 'var(--ink)', stroke: 'var(--surface)' }}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/** Ce qui signale le problème dans une description : toujours en alerte, jamais en décoration. */
export function Flag({ children }: { children: ReactNode }) {
  return <span style={{ color: 'var(--alerte)', fontWeight: 700 }}>{children}</span>
}
