import type { Metadata } from 'next'
import { CvPage } from '@/components/cv/CvPage'

// Page reservee aux recruteurs : hors index, hors sitemap, non liee depuis le
// site. Ne pas retirer `robots`, ne pas l'ajouter au sitemap ni au Footer.
export const metadata: Metadata = {
  title: 'Maurice Timsit — CV et portfolio',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CvPage locale="fr" />
}
