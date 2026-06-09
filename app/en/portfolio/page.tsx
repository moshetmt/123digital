import type { Metadata } from 'next'
import { FounderPage } from './FounderPage'

export const metadata: Metadata = {
  title: 'Maurice Timsit — Founder 123Digital',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <FounderPage />
}
