import { Star } from 'lucide-react'
import { AVIS_GOOGLE } from '@/lib/avis-google'

// Ligne de texte simple, jamais une pastille ni un badge (règle du 19/10).
// tone="vert" : sur fond de marque (bannière). tone="clair" : sur fond clair.
export function NoteGoogle({ tone = 'clair' }: { tone?: 'vert' | 'clair' }) {
  const couleur = tone === 'vert' ? 'var(--on-brand)' : 'var(--ink)'
  const etoile = tone === 'vert' ? 'var(--on-brand)' : 'var(--brand)'
  return (
    <a
      href={AVIS_GOOGLE.url}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-1.5"
      style={{ color: couleur, fontSize: '0.88rem', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
    >
      <span className="inline-flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} style={{ color: etoile }} />
        ))}
      </span>
      {AVIS_GOOGLE.note} sur Google, {AVIS_GOOGLE.nombre} avis
    </a>
  )
}
