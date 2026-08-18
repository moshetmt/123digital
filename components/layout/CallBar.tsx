'use client'

import { Phone } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const PHONE_TEL = 'tel:+33652092301'
const PHONE_DISPLAY = '06 52 09 23 01'

/**
 * Barre d'appel fixe mobile (< 640px) — reprend `.callbar` de la maquette.
 * z-index au-dessus du header (60 > 50) pour ne jamais passer dessous.
 */
export function CallBar({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).callBar
  return (
    <div
      className="sm:hidden fixed inset-x-0 bottom-0"
      style={{
        zIndex: 60,
        backgroundColor: 'var(--surface-2)',
        borderTop: '1px solid var(--line)',
        padding: '0.6rem 0.85rem',
        boxShadow: '0 -6px 20px var(--shadow-soft)',
      }}
    >
      <a
        href={PHONE_TEL}
        className="flex items-center justify-center gap-2 w-full rounded-full font-bold"
        style={{
          backgroundColor: 'var(--brand)',
          color: 'var(--on-brand)',
          padding: '0.75rem',
          fontSize: '0.92rem',
        }}
      >
        <Phone size={16} aria-hidden />
        {d.label} · {PHONE_DISPLAY}
      </a>
    </div>
  )
}
