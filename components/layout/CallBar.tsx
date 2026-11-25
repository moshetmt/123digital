'use client'

import { Phone } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const PHONE_TEL = 'tel:+33652092301'
const WHATSAPP = 'https://wa.me/33652092301'

/**
 * Deux boutons d'action flottants, en bas a droite.
 *
 * Remplace l'ancienne barre pleine largeur qui affichait le numero en toutes
 * lettres : le numero est deja dans l'en-tete collant, donc le repeter en bas
 * faisait doublon et mangeait de la hauteur utile. Ici, deux pastilles rondes,
 * appel et WhatsApp, sans texte.
 *
 * z-index 60, au-dessus de l'en-tete (50), pour ne jamais passer dessous.
 */
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.556 4.112 1.528 5.836L.057 23.25a.75.75 0 0 0 .916.932l5.556-1.458A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 0 1-4.952-1.354l-.355-.212-3.681.966.984-3.595-.232-.37A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  )
}

export function CallBar({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).callBar

  const pastille: React.CSSProperties = {
    width: 52,
    height: 52,
    borderRadius: '9999px', // ronds, charte boutons du 27/10
    border: '1px solid var(--line)',
  }

  return (
    <div className="sm:hidden fixed flex items-center gap-2.5" style={{ zIndex: 60, right: '1rem', bottom: '1rem' }}>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="grid place-items-center active:scale-95 transition-transform"
        style={{ ...pastille, backgroundColor: 'var(--surface-2)', color: 'var(--brand)', border: '1px solid var(--line)' }}
      >
        <WhatsAppIcon size={22} />
      </a>
      <a
        href={PHONE_TEL}
        aria-label={d.label}
        className="grid place-items-center active:scale-95 transition-transform"
        style={{ ...pastille, backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}
      >
        <Phone size={22} aria-hidden />
      </a>
    </div>
  )
}
