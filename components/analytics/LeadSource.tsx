'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureLeadSource } from '@/lib/lead-source'

/**
 * Mémorise la provenance du visiteur à chaque page vue.
 * Monté une seule fois dans le layout racine : le formulaire relit la valeur
 * au moment de l'envoi, quelle que soit la page où il est rempli.
 *
 * On lit `window.location.search` plutôt que `useSearchParams()` : ce hook
 * force un rendu dynamique et casserait la génération statique des 200+ pages.
 * Un clic publicitaire est toujours un chargement complet, donc le pathname
 * suffit comme déclencheur.
 */
export function LeadSource() {
  const pathname = usePathname()

  useEffect(() => {
    captureLeadSource()
  }, [pathname])

  return null
}
