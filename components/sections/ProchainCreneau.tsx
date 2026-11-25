'use client'

import { useEffect, useState } from 'react'
import { ReserverCreneau } from '@/components/sections/ReserverCreneau'

// « Prochain créneau » de l'audit gratuit (étude du 25/10, idée reprise de vincenthego.com,
// validée par l'opérateur). Créneaux du lundi au jeudi à 17 h : jamais le vendredi (Chabbat
// commence tôt l'hiver), ni le samedi, ni le dimanche. Calculé dans le navigateur : la page
// est statique, une date écrite au build serait fausse le lendemain. Rien n'est rendu avant.
// Le clic ouvre la réservation en ligne (ReserverCreneau) ; sans créneau, lien /audit-gratuit.
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

function prochainCreneau(maintenant: Date) {
  const d = new Date(maintenant)
  d.setDate(d.getDate() + 1)
  while (d.getDay() === 0 || d.getDay() === 5 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  const ecart = Math.round((d.setHours(0, 0, 0, 0) - new Date(maintenant).setHours(0, 0, 0, 0)) / 86400000)
  return ecart === 1 ? 'demain' : JOURS[d.getDay()]
}

export function ProchainCreneau() {
  const [jour, setJour] = useState<string | null>(null)
  useEffect(() => setJour(prochainCreneau(new Date())), [])
  if (!jour) return null
  return (
    <ReserverCreneau
      style={{ color: 'var(--on-brand)', fontSize: '0.9rem', textDecoration: 'underline', textUnderlineOffset: 3 }}
    >
      Prochain créneau : <strong>{jour}, 17 h 00</strong>, offert
    </ReserverCreneau>
  )
}
