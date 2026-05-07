import type { Metadata } from 'next'
import { FondateurPage } from './FondateurPage'

export const metadata: Metadata = {
  title: 'Maurice Timsit — Fondateur 123Digital',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <FondateurPage />
}
