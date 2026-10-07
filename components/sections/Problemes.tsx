import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { problemes, famillesLabels } from '@/data/problemes'

// Accueil : les requêtes chaudes, en liste compacte. Une ligne par problème,
// deux colonnes dès le téléphone. Les pages vivent sous /problemes.

export function Problemes() {
  return (
    <section
      id="section-problemes"
      aria-labelledby="problemes-heading"
      style={{ backgroundColor: 'var(--surface-2)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--line)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="flex items-center gap-2 mb-3"
          style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
        >
          Problèmes fréquents
        </div>
        <h2
          id="problemes-heading"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2.1rem)', letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '0.6rem' }}
        >
          Quelque chose coince aujourd’hui ?
        </h2>
        <p style={{ fontSize: 'clamp(0.85rem, 2.6vw, 0.95rem)', color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: '60ch', marginBottom: 'clamp(1rem, 3vw, 1.6rem)' }}>
          Le diagnostic à faire vous-même en dix minutes, puis ce que je fais si vous préférez confier.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {problemes.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/problemes/${p.slug}`}
                className="group flex items-center justify-between gap-3 rounded"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--line)', padding: '0.8rem 1rem', minHeight: 56 }}
              >
                <span>
                  <span style={{ display: 'block', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 800, marginBottom: '0.15rem' }}>
                    {famillesLabels[p.famille]}
                  </span>
                  <span className="group-hover:text-[var(--brand)] transition-colors" style={{ fontWeight: 700, fontSize: 'clamp(0.88rem, 2.6vw, 0.95rem)', color: 'var(--ink)', lineHeight: 1.3 }}>
                    {p.titre}
                  </span>
                </span>
                <ArrowRight size={16} aria-hidden style={{ color: 'var(--brand-strong)', flexShrink: 0 }} />
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
          <Link href="/problemes" className="font-bold" style={{ color: 'var(--brand-strong)' }}>
            Tous les problèmes fréquents
          </Link>
        </p>
      </div>
    </section>
  )
}
