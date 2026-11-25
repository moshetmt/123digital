'use client'

import { useEffect } from 'react'

// Prévient Moshé qu'un prospect a ouvert sa page d'audit : 5 secondes après l'affichage,
// une seule fois par navigateur (clé localStorage), par POST /api/audit-vu. Rien n'est rendu.
export function SignalOuverture({ domaine }: { domaine: string }) {
  useEffect(() => {
    const cle = `audit-vu:${domaine}`
    try {
      if (localStorage.getItem(cle)) return
    } catch {}
    const minuteur = setTimeout(() => {
      try {
        localStorage.setItem(cle, new Date().toISOString())
      } catch {}
      fetch('/api/audit-vu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domaine }),
        keepalive: true,
      }).catch(() => {})
    }, 5000)
    return () => clearTimeout(minuteur)
  }, [domaine])
  return null
}
