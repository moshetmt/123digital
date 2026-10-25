'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Bandeau cookies discret (décision de l'opérateur du 25/10, avant la campagne Google Ads).
// Mode consentement Google v2 : tout est refusé par défaut dans le script GA4 du layout,
// ce bandeau ne fait que lever le refus. Le choix vit dans localStorage sous CLE ; le lien
// « Cookies » du pied de page rouvre le bandeau (retrait du consentement, RGPD).
// Téléphone : posé au-dessus des deux boutons d'appel, jamais sur le titre de la bannière.
export const CLE = 'consentement-cookies'
const OUVRIR = 'cookies:ouvrir'

function appliquer(accepte: boolean) {
  const etat = accepte ? 'granted' : 'denied'
  const w = window as unknown as { gtag?: (...a: unknown[]) => void }
  w.gtag?.('consent', 'update', {
    ad_storage: etat,
    ad_user_data: etat,
    ad_personalization: etat,
    analytics_storage: etat,
  })
}

export function BandeauCookies() {
  const [visible, setVisible] = useState(false)
  const anglais = usePathname()?.startsWith('/en')

  useEffect(() => {
    try {
      if (!localStorage.getItem(CLE)) setVisible(true)
    } catch {
      setVisible(true)
    }
    const ouvrir = () => setVisible(true)
    window.addEventListener(OUVRIR, ouvrir)
    return () => window.removeEventListener(OUVRIR, ouvrir)
  }, [])

  if (!visible) return null

  const choisir = (accepte: boolean) => {
    try {
      localStorage.setItem(CLE, accepte ? 'oui' : 'non')
    } catch {}
    appliquer(accepte)
    setVisible(false)
  }

  const bouton: React.CSSProperties = {
    fontSize: '0.8rem',
    fontWeight: 700,
    padding: '0.4rem 0.8rem',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--line)',
  }

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="bandeau-cookies fixed flex flex-wrap items-center gap-x-3 gap-y-2"
      style={{
        zIndex: 55,
        backgroundColor: 'var(--surface-2)',
        color: 'var(--ink)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        padding: '0.6rem 0.8rem',
        fontSize: '0.8rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      <p style={{ margin: 0, flex: '1 1 12rem' }}>
        {anglais
          ? 'Audience measurement cookies, only if you agree.'
          : 'Cookies de mesure d’audience, seulement si vous êtes d’accord.'}{' '}
        <a href="/mentions-legales#cookies" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
          {anglais ? 'Details' : 'En savoir plus'}
        </a>
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => choisir(false)} style={{ ...bouton, backgroundColor: 'transparent', color: 'var(--ink)' }}>
          {anglais ? 'Decline' : 'Refuser'}
        </button>
        <button type="button" onClick={() => choisir(true)} style={{ ...bouton, backgroundColor: 'var(--brand)', color: 'var(--on-brand)', borderColor: 'var(--brand)' }}>
          {anglais ? 'Accept' : 'Accepter'}
        </button>
      </div>
    </div>
  )
}

export function LienCookies({ libelle = 'Cookies' }: { libelle?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OUVRIR))}
      style={{ background: 'none', border: 0, padding: 0, color: 'inherit', font: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}
    >
      {libelle}
    </button>
  )
}
