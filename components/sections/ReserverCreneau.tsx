'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { readLeadSource } from '@/lib/lead-source'

/**
 * Déclencheur + panneau de réservation d'un appel découverte de 15 min (API
 * /api/rdv, agenda de Maurice). Tant que les créneaux ne sont pas chargés, ou
 * s'il n'y en a aucun (jeton absent, tout pris), le déclencheur reste un simple
 * lien vers /audit-gratuit : rien ne casse, rien ne s'affiche en rouge.
 *
 * Le panneau (classe .panneau-rdv de globals.css) s'ouvre sous le déclencheur sur
 * ordinateur et en feuille en bas de l'écran sur téléphone, jamais en modale plein
 * écran. `?rdv=1` l'ouvre d'office.
 */

interface Creneau {
  iso: string
  libelle: string
}

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const REPLI = '/audit-gratuit'
const TEL_MAURICE = '06 52 09 23 01'
const VISIBLES = 3
const MAXIMUM = 10

const champStyle: CSSProperties = {
  width: '100%',
  minHeight: 44,
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--line-strong)',
  borderRadius: 'var(--radius-ctrl)',
  padding: '0.6rem 0.9rem',
  color: 'var(--ink)',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
}

const etiquetteStyle: CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 700,
  color: 'var(--ink-2)',
  marginBottom: '0.3rem',
}

// Sur téléphone la feuille sort par un portail vers <body> : dans la bannière, un
// z-index resterait sous les boutons d'appel et le bandeau cookies.
const TELEPHONE = '(max-width: 639px)'
function ecouterTelephone(cb: () => void) {
  const m = window.matchMedia(TELEPHONE)
  m.addEventListener('change', cb)
  return () => m.removeEventListener('change', cb)
}

const lienTexteStyle: CSSProperties = {
  background: 'none',
  border: 0,
  padding: '0.6rem 0',
  minHeight: 44,
  color: 'var(--brand-strong)',
  fontWeight: 700,
  fontSize: '0.9rem',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export function ReserverCreneau({ children, className, style }: Props) {
  const [creneaux, setCreneaux] = useState<Creneau[] | null>(null)
  const [ouvert, setOuvert] = useState(false)
  const [tous, setTous] = useState(false)
  const [choix, setChoix] = useState('')
  const [prenom, setPrenom] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')
  const [fait, setFait] = useState<{ jour: string; heure: string; tel: string } | null>(null)
  const panneau = useRef<HTMLDivElement>(null)
  const telephone = useSyncExternalStore(ecouterTelephone, () => window.matchMedia(TELEPHONE).matches, () => false)

  function charger() {
    return fetch('/api/rdv', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: { creneaux: Creneau[] }) => {
        setCreneaux(d.creneaux)
        setChoix((c) => (d.creneaux.some((x) => x.iso === c) ? c : d.creneaux[0]?.iso ?? ''))
        return d.creneaux
      })
      .catch(() => {
        setCreneaux([])
        return [] as Creneau[]
      })
  }

  useEffect(() => {
    charger().then((liste) => {
      if (liste.length && new URLSearchParams(window.location.search).get('rdv') === '1') setOuvert(true)
    })
  }, [])

  useEffect(() => {
    if (ouvert) panneau.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [ouvert])

  if (!creneaux?.length) {
    return (
      <Link href={REPLI} className={className} style={style}>
        {children}
      </Link>
    )
  }

  async function reserver(e: FormEvent) {
    e.preventDefault()
    setErreur('')
    setEnvoi(true)
    const { source, landing } = readLeadSource()
    const res = await fetch('/api/rdv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ debut: choix, prenom, tel, email, page: window.location.pathname, landing, source }),
    }).catch(() => null)
    const d = res ? await res.json().catch(() => ({})) : {}
    setEnvoi(false)
    if (res?.ok && d.ok) {
      window.gtag?.('event', 'generate_lead', { method: 'rendez_vous' })
      setFait({ jour: d.jour, heure: d.heure, tel: d.tel })
      return
    }
    if (res?.status === 409) {
      setErreur('Ce créneau vient d’être pris, choisissez-en un autre.')
      charger()
      return
    }
    if (res?.status === 400 && d.champ === 'tel') {
      setErreur('Le numéro de téléphone ne semble pas complet.')
      return
    }
    setErreur(`Ça n’a pas marché. Réessayez, ou appelez-moi au ${TEL_MAURICE}.`)
  }

  const liste = tous ? creneaux.slice(0, MAXIMUM) : creneaux.slice(0, VISIBLES)
  const enPlace = (n: ReactNode) => (telephone ? createPortal(n, document.body) : n)

  return (
    <>
      {!fait && (
        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-controls="panneau-rdv"
          className={className}
          style={{ cursor: 'pointer', font: 'inherit', ...(className ? {} : { background: 'none', border: 0, padding: 0 }), ...style }}
        >
          {children}
        </button>
      )}

      {(ouvert || fait) && enPlace(
        <div id="panneau-rdv" ref={panneau} className="panneau-rdv">
          {fait ? (
            <div role="status">
              <p style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.35, margin: 0 }}>
                C’est noté, {fait.jour} à {fait.heure}, je vous appelle au {fait.tel}.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', margin: '0.6rem 0 0' }}>
                Un imprévu ? Un SMS ou un appel au {TEL_MAURICE} et on décale.
              </p>
            </div>
          ) : (
            <form onSubmit={reserver} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.25, margin: 0 }}>Appel de 15 min, offert</p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', margin: '0.25rem 0 0' }}>
                    Choisissez l’heure, je vous appelle.
                  </p>
                </div>
                <button type="button" onClick={() => setOuvert(false)} style={{ ...lienTexteStyle, padding: '0.6rem 0.2rem', flexShrink: 0 }}>
                  Fermer
                </button>
              </div>

              <div role="radiogroup" aria-label="Créneaux proposés" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {liste.map((c) => (
                  <button
                    key={c.iso}
                    type="button"
                    role="radio"
                    aria-checked={choix === c.iso}
                    onClick={() => setChoix(c.iso)}
                    className={`${choix === c.iso ? 'btn-plein' : 'btn-contour'} btn-sans-fleche`}
                    style={{ width: '100%', minHeight: 44, justifyContent: 'center', whiteSpace: 'normal', textAlign: 'center', fontSize: '0.9rem' }}
                  >
                    {c.libelle}
                  </button>
                ))}
              </div>
              {!tous && creneaux.length > VISIBLES && (
                <button type="button" onClick={() => setTous(true)} style={{ ...lienTexteStyle, alignSelf: 'flex-start' }}>
                  Autres dates
                </button>
              )}

              <div>
                <label htmlFor="rdv-prenom" style={etiquetteStyle}>Prénom</label>
                <input id="rdv-prenom" name="prenom" autoComplete="given-name" required value={prenom} onChange={(e) => setPrenom(e.target.value)} style={champStyle} />
              </div>
              <div>
                <label htmlFor="rdv-tel" style={etiquetteStyle}>Téléphone, je vous appelle à ce numéro</label>
                <input id="rdv-tel" name="tel" type="tel" autoComplete="tel" inputMode="tel" required value={tel} onChange={(e) => setTel(e.target.value)} placeholder="06 12 34 56 78" style={champStyle} />
              </div>
              <div>
                <label htmlFor="rdv-email" style={etiquetteStyle}>Email <span style={{ fontWeight: 500, opacity: 0.75 }}>(facultatif, pour la confirmation)</span></label>
                <input id="rdv-email" name="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} style={champStyle} />
              </div>

              {erreur && (
                <p role="alert" style={{ color: 'var(--destructive)', fontSize: '0.85rem', margin: 0 }}>{erreur}</p>
              )}
              <button type="submit" disabled={envoi} className="btn-plein" style={{ width: '100%', minHeight: 48, justifyContent: 'center', fontSize: '0.95rem', opacity: envoi ? 0.7 : 1 }}>
                {envoi ? 'Un instant…' : 'Réserver'}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
