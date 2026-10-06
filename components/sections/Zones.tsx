import Link from 'next/link'
import Image from 'next/image'
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

        {/* Tuiles photo des villes (public/images/villes/<slug>.jpg) : défilement
            horizontal sur téléphone, une rangée à partir de lg. */}
        <div className="flex gap-2.5 overflow-x-auto snap-x -mx-6 px-6 pb-2 lg:grid lg:grid-cols-9 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0">
          {CHIP_VILLES.map((ville) => (
            <Link
              key={ville.slug}
              href={`/${ville.slug}`}
              className="zone-tile relative overflow-hidden rounded shrink-0 snap-start"
              style={{ height: 150, border: '1px solid var(--line)' }}
            >
              <Image
                src={`/images/villes/${ville.slug}.jpg`}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
              {/* Voile vert 950 en bas pour le nom, lisible sur toute photo. */}
              <span
                className="absolute inset-x-0 bottom-0 px-2 py-1.5"
                style={{ backgroundColor: 'rgba(19, 24, 20, 0.78)', color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.2 }}
              >
                {ville.nom}
              </span>
            </Link>
          ))}
        </div>
        <p style={{ color: 'var(--brand)', fontWeight: 700, fontSize: '0.95rem', marginTop: '1rem' }}>{d.franceWide}</p>
      </div>

      <style>{`
        .zone-tile { width: 128px; }
        @media (min-width: 1024px) { .zone-tile { width: auto; } }
        .zone-tile img { transition: transform 0.25s ease; }
        @media (hover: hover) {
          .zone-tile:hover img { transform: scale(1.04); }
        }
      `}</style>
    </section>
  )
}
