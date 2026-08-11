'use client'

import { useState } from 'react'
import Link from 'next/link'

interface VillePoint {
  slug: string
  nom: string
  departement: string
  x: number
  y: number
  priority: 'high' | 'medium' | 'low'
}

// Coordonnées approximatives normalisées (0-100) de la région ARA
// Origine: haut-gauche = NW de la région, bas-droite = SE
const villesARAPoints: VillePoint[] = [
  { slug: 'lyon', nom: 'Lyon', departement: 'Rhône (69)', x: 42, y: 32, priority: 'high' },
  { slug: 'grenoble', nom: 'Grenoble', departement: 'Isère (38)', x: 60, y: 52, priority: 'high' },
  { slug: 'saint-etienne', nom: 'Saint-Étienne', departement: 'Loire (42)', x: 36, y: 44, priority: 'high' },
  { slug: 'clermont-ferrand', nom: 'Clermont-Ferrand', departement: 'Puy-de-Dôme (63)', x: 22, y: 38, priority: 'high' },
  { slug: 'annecy', nom: 'Annecy', departement: 'Haute-Savoie (74)', x: 66, y: 28, priority: 'high' },
  { slug: 'chambery', nom: 'Chambéry', departement: 'Savoie (73)', x: 62, y: 38, priority: 'medium' },
  { slug: 'valence', nom: 'Valence', departement: 'Drôme (26)', x: 44, y: 62, priority: 'medium' },
  { slug: 'villeurbanne', nom: 'Villeurbanne', departement: 'Rhône (69)', x: 45, y: 31, priority: 'medium' },
  { slug: 'bourg-en-bresse', nom: 'Bourg-en-Bresse', departement: 'Ain (01)', x: 52, y: 18, priority: 'medium' },
  { slug: 'annemasse', nom: 'Annemasse', departement: 'Haute-Savoie (74)', x: 72, y: 22, priority: 'medium' },
  { slug: 'thonon-les-bains', nom: 'Thonon-les-Bains', departement: 'Haute-Savoie (74)', x: 76, y: 16, priority: 'low' },
  { slug: 'roanne', nom: 'Roanne', departement: 'Loire (42)', x: 28, y: 26, priority: 'low' },
  { slug: 'albertville', nom: 'Albertville', departement: 'Savoie (73)', x: 70, y: 42, priority: 'low' },
  { slug: 'oyonnax', nom: 'Oyonnax', departement: 'Ain (01)', x: 58, y: 12, priority: 'low' },
]

export function VillesMap() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const hoveredVille = villesARAPoints.find((v) => v.slug === (hovered ?? selected))

  function getRadius(priority: VillePoint['priority']) {
    return priority === 'high' ? 8 : priority === 'medium' ? 6 : 4
  }

  function getColor(slug: string, priority: VillePoint['priority']) {
    if (slug === (hovered ?? selected)) return 'var(--brand)'
    return priority === 'high'
      ? 'var(--ink)'
      : priority === 'medium'
        ? 'var(--ink-2)'
        : 'var(--ink-3)'
  }

  return (
    <div className="relative" style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Carte SVG */}
      <div
        style={{
          position: 'relative',
          border: '1px solid var(--line)',
          backgroundColor: 'var(--surface-2)',
        }}
      >
        <svg
          viewBox="0 0 100 80"
          style={{ width: '100%', display: 'block' }}
          aria-label="Carte des villes ARA"
        >
          {/* Fond région simplifié — tracé approximatif ARA */}
          <path
            d="M10,10 L20,5 L40,3 L60,5 L80,10 L90,25 L88,50 L80,70 L60,75 L40,78 L20,72 L8,55 L6,35 Z"
            fill="var(--ink-4)"
            stroke="var(--ink-4)"
            strokeWidth="0.5"
          />

          {/* Lignes de connexion depuis Lyon */}
          {villesARAPoints
            .filter((v) => v.slug !== 'lyon')
            .map((v) => {
              const lyon = villesARAPoints.find((p) => p.slug === 'lyon')!
              return (
                <line
                  key={`line-${v.slug}`}
                  x1={lyon.x}
                  y1={lyon.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={v.slug === (hovered ?? selected) ? 'var(--brand)' : 'var(--ink-4)'}
                  strokeWidth="0.3"
                  strokeDasharray="1,2"
                />
              )
            })}

          {/* Points villes */}
          {villesARAPoints.map((ville) => {
            const r = getRadius(ville.priority)
            const isActive = ville.slug === (hovered ?? selected)
            return (
              <g
                key={ville.slug}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(ville.slug)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(ville.slug === selected ? null : ville.slug)}
              >
                {/* Halo pour les villes actives */}
                {isActive && (
                  <circle
                    cx={ville.x}
                    cy={ville.y}
                    r={r + 4}
                    fill="var(--brand)"
                    stroke="var(--brand)"
                    strokeWidth="0.5"
                  />
                )}

                {/* Point principal */}
                <circle
                  cx={ville.x}
                  cy={ville.y}
                  r={r}
                  fill={getColor(ville.slug, ville.priority)}
                  style={{ transition: 'fill 0.15s ease, r 0.15s ease' }}
                />

                {/* Label pour les villes high priority */}
                {ville.priority === 'high' && (
                  <text
                    x={ville.x + r + 1.5}
                    y={ville.y + 1}
                    style={{
                      fontSize: '3.5px',
                      fill: isActive ? 'var(--brand)' : 'var(--ink-2)',
                      fontFamily: 'var(--font-syne)',
                      userSelect: 'none',
                    }}
                  >
                    {ville.nom}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Légende */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}
        >
          {[
            { label: 'Priorité haute', color: 'var(--ink)', size: 8 },
            { label: 'Priorité moyenne', color: 'var(--ink-2)', size: 6 },
            { label: 'Priorité basse', color: 'var(--ink-3)', size: 4 },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div
                style={{
                  width: l.size,
                  height: l.size,
                  borderRadius: '50%',
                  backgroundColor: l.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '0.62rem', color: 'var(--ink-3)' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip / info ville */}
      <div
        style={{
          minHeight: '100px',
          padding: '1.5rem',
          border: '1px solid var(--line)',
          borderTop: 'none',
          backgroundColor: 'var(--surface-2)',
          transition: 'all 0.15s ease',
        }}
      >
        {hoveredVille ? (
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--brand)',
                  fontWeight: 700,
                  marginBottom: '0.3rem',
                }}
              >
                {hoveredVille.departement}
              </div>
              <div
                className="font-display font-normal"
                style={{ fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.5rem' }}
              >
                {hoveredVille.nom}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)' }}>
                Cliquez pour voir les services disponibles à {hoveredVille.nom}
              </p>
            </div>
            <Link
              href={`/${hoveredVille.slug}`}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: 'var(--brand)',
                color: 'var(--ink)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                flexShrink: 0,
                display: 'inline-block',
              }}
            >
              Voir →
            </Link>
          </div>
        ) : (
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', fontStyle: 'italic' }}>
            Survolez ou cliquez une ville pour en savoir plus
          </p>
        )}
      </div>

      {/* Liste rapide toutes villes */}
      <div style={{ marginTop: '1.5rem' }}>
        <div className="flex flex-wrap gap-2">
          {villesARAPoints.map((ville) => (
            <Link
              key={ville.slug}
              href={`/${ville.slug}`}
              style={{
                padding: '0.3rem 0.75rem',
                border: `1px solid ${hovered === ville.slug || selected === ville.slug ? 'var(--brand)' : 'var(--ink-4)'}`,
                color: hovered === ville.slug || selected === ville.slug ? 'var(--brand)' : 'var(--ink-2)',
                fontSize: '0.75rem',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={() => setHovered(ville.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              {ville.nom}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
