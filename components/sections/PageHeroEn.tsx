import { PageBanner } from '@/components/sections/PageBanner'

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
 *
 * Depuis le 20/08 il n'est plus qu'un adaptateur : le rendu vient de
 * `PageBanner`, la bannière verte partagée par tout le site. Les cinq pages
 * anglaises suivent donc automatiquement les évolutions de la version française.
 */
type Props = {
  kicker: string
  title: string
  intro: string
  points?: readonly string[]
}

export function PageHeroEn({ title, intro, points }: Props) {
  return (
    <PageBanner title={title} sub={intro}>
      {points && points.length > 0 && (
        <ul
          className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
          style={{ fontSize: '0.85rem', color: 'oklch(0.985 0.003 150 / 88%)', lineHeight: 1.45 }}
        >
          {points.map((p) => (
            <li
              key={p}
              className="rounded-xl"
              style={{
                backgroundColor: 'oklch(0.985 0.003 150 / 12%)',
                border: '1px solid oklch(0.985 0.003 150 / 22%)',
                padding: '0.7rem 0.85rem',
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </PageBanner>
  )
}
