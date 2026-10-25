import Link from 'next/link'
import { FaqListe } from '@/components/sections/FaqListe'
import type { BlogSection } from '@/data/blog'

/**
 * Rendu des sections rédactionnelles (blog, pages problème). Un seul renderer
 * pour tout contenu structuré en `BlogSection[]`.
 */
/** Transforme les liens [ancre](/chemin) d'un texte en liens internes. */
function avecLiens(texte?: string) {
  if (!texte) return texte
  return texte.split(/(\[[^\]]+\]\(\/[^)]*\))/).map((morceau, i) => {
    const m = morceau.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/)
    if (!m) return morceau
    return (
      <Link key={i} href={m[2]} className="underline" style={{ textUnderlineOffset: 3 }}>
        {m[1]}
      </Link>
    )
  })
}

// ─── Section renderers ────────────────────────────────────────────────────────

export function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case 'intro':
      return (
        <p
          className="text-base leading-relaxed"
          style={{
            color: 'var(--ink)',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            borderLeft: '3px solid var(--brand)',
            paddingLeft: '1.5rem',
            marginBottom: 'clamp(1.2rem, 4vw, 2rem)',
          }}
        >
          {section.texte}
        </p>
      )

    case 'h2':
      return (
        <div style={{ marginBottom: 'clamp(1rem, 3.5vw, 1.6rem)', marginTop: 'clamp(1.6rem, 5vw, 2.5rem)' }}>
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            {section.titre}
          </h2>
          {section.texte && (
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, fontSize: '0.95rem' }}>
              {section.texte}
            </p>
          )}
        </div>
      )

    case 'h3':
      return (
        <div style={{ marginBottom: 'clamp(0.8rem, 3vw, 1.2rem)', marginTop: 'clamp(1.2rem, 4vw, 1.8rem)' }}>
          <h3
            className="font-display font-extrabold mb-3"
            style={{ fontSize: '1.2rem', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            {section.titre}
          </h3>
          {section.texte && (
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, fontSize: '0.95rem' }}>
              {section.texte}
            </p>
          )}
        </div>
      )

    case 'paragraphe':
      return (
        <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {avecLiens(section.texte)}
        </p>
      )

    case 'liste':
      return (
        <div style={{ marginBottom: 'clamp(1rem, 3.5vw, 1.6rem)' }}>
          {section.titre && (
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              {section.titre}
            </p>
          )}
          <ul className="space-y-1.5 sm:space-y-3">
            {section.items?.map((item, i) => {
              // Étape numérotée « 1. … » : le numéro remplace la flèche.
              const etape = item.match(/^(\d+)\.\s+([^]*)$/)
              return (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '0.1rem', fontWeight: 800, minWidth: etape ? '1.4em' : undefined }}>
                    {etape ? `${etape[1]}.` : '→'}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                    {etape ? etape[2] : item}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )

    case 'faq':
      return (
        <div style={{ marginBottom: 'clamp(1.2rem, 4vw, 2rem)', marginTop: 'clamp(1.6rem, 5vw, 2.5rem)' }}>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Questions fréquentes
          </div>
          {/* Accordeon natif : la liste depliee allongeait l'article sans
              raison. Le schema FAQPage de la page reste inchange. */}
          <FaqListe items={(section.faqs ?? []).map((f) => ({ question: f.question, answer: f.reponse }))} />
        </div>
      )

    case 'resume':
      return (
        <div
          style={{
            marginBottom: 'clamp(1rem, 3.5vw, 1.6rem)',
            marginTop: 'clamp(1.4rem, 5vw, 2.5rem)',
            padding: 'clamp(1rem, 4vw, 1.5rem)',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--brand-tint)',
            border: '1px solid var(--brand-line)',
          }}
        >
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--brand)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            {section.titre ?? 'En résumé'}
          </div>
          <ul className="space-y-2">
            {section.items?.map((item, i) => (
              <li key={i} style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'cta':
      return (
        <div
          style={{
            marginBottom: 'clamp(1rem, 3.5vw, 1.6rem)',
            padding: 'clamp(1.1rem, 4vw, 1.75rem)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--line)',
            backgroundColor: 'var(--surface-2)',
          }}
        >
          {section.titre && (
            <p className="font-display font-extrabold mb-3" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>
              {section.titre}
            </p>
          )}
          {section.texte && (
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginBottom: '1.5rem' }}>
              {section.texte}
            </p>
          )}
          <Link
            href="/audit-gratuit"
            style={{
              display: 'inline-block',
              borderRadius: 'var(--radius)',
              padding: '0.75rem 1.75rem',
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Audit gratuit 30 min
          </Link>
        </div>
      )

    default:
      return null
  }
}

