// ── Liste depliante ───────────────────────────────────────────────────────────
// Les pages service alignaient des grilles de cartes ou chaque description
// occupait cinq a huit lignes : une seule section pesait un ecran entier de
// telephone. Ici le titre reste visible, le texte se replie. Meme motif que les
// FAQ du site, en <details> natif : aucun JavaScript, et Google indexe le
// contenu replie normalement.

interface Bloc {
  /** Numero ou categorie affichee avant le titre : « 01 », « Google Ads ». */
  etiquette?: string
  titre: string
  texte: string
  /** Ligne discrete sous le texte : delai, prix, precision. */
  note?: string
}

export function BlocsDepliants({ items }: { items: Bloc[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((bloc) => (
        <details
          key={bloc.titre}
          className="group rounded-xl"
          style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}
        >
          <summary
            className="flex items-center justify-between gap-3 cursor-pointer list-none"
            style={{ padding: '0.85rem 1rem' }}
          >
            <span className="flex flex-col gap-0.5">
              {bloc.etiquette && (
                <span
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--brand)',
                    fontWeight: 800,
                  }}
                >
                  {bloc.etiquette}
                </span>
              )}
              <span className="font-extrabold" style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                {bloc.titre}
              </span>
            </span>
            <span
              aria-hidden
              className="shrink-0 transition-transform group-open:rotate-45"
              style={{ color: 'var(--brand)', fontSize: '1.2rem', lineHeight: 1 }}
            >
              +
            </span>
          </summary>

          <div style={{ padding: '0 1rem 0.9rem' }}>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.88rem' }}>{bloc.texte}</p>
            {bloc.note && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)' }}>
                {bloc.note}
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
