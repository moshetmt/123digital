import Link from 'next/link'
import { villesARA } from '@/data/villes'
import { estIndexable } from '@/data/indexation'
import { t, type Locale } from '@/lib/i18n'

// Les villes ARA encore indexables, dans l'ordre de data/villes.ts, plafonnées à 9.
// 🔑 Le filtre n'est pas cosmétique : depuis le 19/08, Grenoble, Chambéry et
// Villeurbanne sont en `noindex` faute de demande mesurée. Les lier depuis la
// page d'accueil enverrait les visiteurs, et le maillage interne, vers des pages
// qu'on a décidé de retirer de l'index. Cette liste et `data/indexation.ts`
// doivent toujours dire la même chose.
const CHIP_VILLES = villesARA.filter((v) => estIndexable(`/${v.slug}`)).slice(0, 9)

export function Zones({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).zones

  return (
    <section
      id="zones"
      style={{ backgroundColor: 'var(--surface)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-3"
          style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
        >
          {d.label}
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            marginBottom: '1.25rem',
          }}
        >
          {d.heading}
        </h2>

        <p style={{ color: 'var(--ink-2)', fontSize: '0.95rem', lineHeight: 1.8 }}>
          {CHIP_VILLES.map((ville) => (
            <span key={ville.slug}>
              <Link href={`/${ville.slug}`} className="zone-link" style={{ color: 'var(--ink-2)' }}>
                {ville.nom}
              </Link>
              {' · '}
            </span>
          ))}
          <span style={{ color: 'var(--brand)', fontWeight: 700 }}>{d.franceWide}</span>
        </p>
      </div>

      <style>{`
        .zone-link { transition: color 0.15s ease; }
        @media (hover: hover) {
          .zone-link:hover { color: var(--brand); }
        }
      `}</style>
    </section>
  )
}
