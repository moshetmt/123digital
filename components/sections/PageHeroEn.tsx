/**
 * Hero des pages anglaises.
 *
 * POURQUOI IL EXISTE. Les pages /en rendaient directement les composants de
 * section, qui commencent tous par un `h2`. Résultat mesuré le 19/08 sur le HTML
 * fabriqué : cinq pages anglaises sans AUCUN `h1`, et trois sous 300 mots
 * (222, 182 et 101). Une page sans `h1` n'a pas de sujet déclaré, et une page
 * mince en anglais aurait reproduit, dans l'autre langue, exactement ce qu'on a
 * passé la journée à retirer côté français.
 *
 * Ce composant donne à chaque page anglaise un titre unique, une introduction
 * qui dit ce que le visiteur y trouve, et de quoi tenir devant une page
 * française équivalente. Le texte est propre à chaque page, jamais un gabarit
 * rempli avec le nom de la page.
 */
type Props = {
  kicker: string
  title: string
  intro: string
  points?: readonly string[]
}

export function PageHeroEn({ kicker, title, intro, points }: Props) {
  return (
    <section
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'clamp(1.5rem, 5vw, 3rem) 1.5rem clamp(1rem, 3vw, 2rem)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="mx-auto max-w-3xl">
        <div
          className="mb-3 flex items-center gap-2"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-2)',
            fontWeight: 700,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: 'var(--brand)' }}
            aria-hidden
          />
          {kicker}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 4.2vw, 2.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: 'var(--ink)',
            marginBottom: '0.9rem',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 3vw, 1.08rem)',
            color: 'var(--ink-2)',
            lineHeight: 1.55,
            maxWidth: '62ch',
          }}
        >
          {intro}
        </p>

        {points && points.length > 0 && (
          <ul
            className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3"
            style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.45 }}
          >
            {points.map((p) => (
              <li
                key={p}
                className="rounded-xl"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  padding: '0.75rem 0.9rem',
                }}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
