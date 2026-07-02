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

const villesARAPoints: VillePoint[] = [
  { slug: 'lyon',            nom: 'Lyon',             departement: 'Rhône (69)',         x: 42, y: 32, priority: 'high' },
  { slug: 'grenoble',       nom: 'Grenoble',          departement: 'Isère (38)',          x: 60, y: 52, priority: 'high' },
  { slug: 'saint-etienne',  nom: 'Saint-Étienne',     departement: 'Loire (42)',          x: 36, y: 44, priority: 'high' },
  { slug: 'clermont-ferrand', nom: 'Clermont-Ferrand', departement: 'Puy-de-Dôme (63)',  x: 22, y: 38, priority: 'high' },
  { slug: 'annecy',         nom: 'Annecy',            departement: 'Haute-Savoie (74)',   x: 66, y: 28, priority: 'high' },
  { slug: 'chambery',       nom: 'Chambéry',          departement: 'Savoie (73)',         x: 62, y: 38, priority: 'medium' },
  { slug: 'valence',        nom: 'Valence',           departement: 'Drôme (26)',          x: 44, y: 62, priority: 'medium' },
  { slug: 'villeurbanne',   nom: 'Villeurbanne',      departement: 'Rhône (69)',          x: 45, y: 31, priority: 'medium' },
  { slug: 'bourg-en-bresse', nom: 'Bourg-en-Bresse',  departement: 'Ain (01)',           x: 52, y: 18, priority: 'medium' },
  { slug: 'annemasse',      nom: 'Annemasse',         departement: 'Haute-Savoie (74)',   x: 72, y: 22, priority: 'medium' },
  { slug: 'thonon-les-bains', nom: 'Thonon-les-Bains', departement: 'Haute-Savoie (74)', x: 76, y: 16, priority: 'low' },
  { slug: 'roanne',         nom: 'Roanne',            departement: 'Loire (42)',          x: 28, y: 26, priority: 'low' },
  { slug: 'albertville',    nom: 'Albertville',       departement: 'Savoie (73)',         x: 70, y: 42, priority: 'low' },
  { slug: 'oyonnax',        nom: 'Oyonnax',           departement: 'Ain (01)',            x: 58, y: 12, priority: 'low' },
]

function getRadius(priority: VillePoint['priority']) {
  return priority === 'high' ? 9 : priority === 'medium' ? 6.5 : 4.5
}

function getColor(slug: string, active: string | null, priority: VillePoint['priority']) {
  if (slug === active) return '#00FF87'
  return priority === 'high'
    ? 'rgba(225,224,204,0.8)'
    : priority === 'medium'
      ? 'rgba(225,224,204,0.5)'
      : 'rgba(225,224,204,0.3)'
}

export function VillesMap({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const [active, setActive] = useState<string | null>(null)

  const activeVille = villesARAPoints.find((v) => v.slug === active)

  function toggle(slug: string) {
    setActive((prev) => (prev === slug ? null : slug))
  }

  return (
    <div className="relative" style={{ maxWidth: '640px', margin: '0 auto' }}>

      {/* Carte SVG */}
      <div style={{ position: 'relative', border: '1px solid rgba(225,224,204,0.08)', backgroundColor: '#0d0d0d' }}>
        <svg
          viewBox="0 0 100 80"
          style={{ width: '100%', display: 'block', touchAction: 'manipulation' }}
          aria-label="Carte des villes ARA"
        >
          {/* Fond région */}
          <path
            d="M10,10 L20,5 L40,3 L60,5 L80,10 L90,25 L88,50 L80,70 L60,75 L40,78 L20,72 L8,55 L6,35 Z"
            fill="rgba(225,224,204,0.02)"
            stroke="rgba(225,224,204,0.06)"
            strokeWidth="0.5"
          />

          {/* Lignes connexion depuis Lyon */}
          {villesARAPoints.filter((v) => v.slug !== 'lyon').map((v) => {
            const lyon = villesARAPoints.find((p) => p.slug === 'lyon')!
            return (
              <line
                key={`line-${v.slug}`}
                x1={lyon.x} y1={lyon.y}
                x2={v.x}    y2={v.y}
                stroke={v.slug === active ? 'rgba(0,255,135,0.3)' : 'rgba(225,224,204,0.04)'}
                strokeWidth="0.3"
                strokeDasharray="1,2"
              />
            )
          })}

          {/* Points villes — touch-friendly (zone de clic agrandie) */}
          {villesARAPoints.map((ville) => {
            const r = getRadius(ville.priority)
            const isActive = ville.slug === active
            return (
              <g
                key={ville.slug}
                style={{ cursor: 'pointer' }}
                onClick={() => toggle(ville.slug)}
                onMouseEnter={() => setActive(ville.slug)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Zone de clic invisible agrandie pour le tactile */}
                <circle cx={ville.x} cy={ville.y} r={Math.max(r + 6, 10)} fill="transparent" />

                {/* Halo actif */}
                {isActive && (
                  <circle
                    cx={ville.x} cy={ville.y}
                    r={r + 4}
                    fill="rgba(0,255,135,0.1)"
                    stroke="rgba(0,255,135,0.3)"
                    strokeWidth="0.5"
                  />
                )}

                {/* Point */}
                <circle
                  cx={ville.x} cy={ville.y}
                  r={r}
                  fill={getColor(ville.slug, active, ville.priority)}
                />

                {/* Label priorité haute */}
                {ville.priority === 'high' && (
                  <text
                    x={ville.x + r + 1.5}
                    y={ville.y + 1}
                    style={{
                      fontSize: '3.5px',
                      fill: isActive ? '#00FF87' : 'rgba(225,224,204,0.6)',
                      fontFamily: 'var(--font-sans)',
                      userSelect: 'none',
                      pointerEvents: 'none',
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
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {(lang === 'en' ? [
            { label: 'High priority',   color: 'rgba(225,224,204,0.8)', size: 8 },
            { label: 'Mid priority',    color: 'rgba(225,224,204,0.5)', size: 6 },
            { label: 'Lower priority',  color: 'rgba(225,224,204,0.3)', size: 4 },
          ] : [
            { label: 'Priorité haute',   color: 'rgba(225,224,204,0.8)', size: 8 },
            { label: 'Priorité moyenne', color: 'rgba(225,224,204,0.5)', size: 6 },
            { label: 'Priorité basse',   color: 'rgba(225,224,204,0.3)', size: 4 },
          ]).map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div style={{ width: l.size, height: l.size, borderRadius: '50%', backgroundColor: l.color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.62rem', color: 'rgba(225,224,204,0.35)' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info ville sélectionnée */}
      <div
        style={{
          minHeight: '90px',
          padding: '1.25rem 1.5rem',
          border: '1px solid rgba(225,224,204,0.08)',
          borderTop: 'none',
          backgroundColor: '#0d0d0d',
        }}
      >
        {activeVille ? (
          <div className="flex items-center justify-between gap-4">
            <div>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00FF87', fontWeight: 700, marginBottom: '0.25rem' }}>
                {activeVille.departement}
              </div>
              <div className="font-display font-normal" style={{ fontSize: '1.3rem', color: '#E1E0CC' }}>
                {activeVille.nom}
              </div>
            </div>
            <Link
              href={`/${activeVille.slug}`}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: '#00FF87',
                color: '#080808',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                flexShrink: 0,
                display: 'inline-block',
                textDecoration: 'none',
              }}
            >
              Voir →
            </Link>
          </div>
        ) : (
          <p style={{ fontSize: '0.85rem', color: 'rgba(225,224,204,0.35)', fontStyle: 'italic', lineHeight: 1.5 }}>
            {lang === 'en' ? 'Tap or click a city on the map' : 'Touchez ou cliquez une ville sur la carte'}
          </p>
        )}
      </div>

      {/* Pills villes — liens directs */}
      <div style={{ marginTop: '1.5rem' }}>
        <div className="flex flex-wrap gap-2">
          {villesARAPoints.map((ville) => (
            <Link
              key={ville.slug}
              href={`/${ville.slug}`}
              style={{
                padding: '0.35rem 0.85rem',
                border: `1px solid ${active === ville.slug ? '#00FF87' : 'rgba(225,224,204,0.12)'}`,
                color: active === ville.slug ? '#00FF87' : 'rgba(225,224,204,0.5)',
                fontSize: '0.78rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                display: 'inline-block',
              }}
              onMouseEnter={() => setActive(ville.slug)}
              onMouseLeave={() => setActive(null)}
            >
              {ville.nom}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}