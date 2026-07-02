import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Free Digital Audit — 123 Digital Lyon',
  description: 'Request your free 30-minute digital audit with Maurice Timsit. No commitment, just a concrete action plan.',
  alternates: {
    canonical: `${BASE_URL}/en/audit`,
    languages: { 'fr': `${BASE_URL}/audit-gratuit`, 'en': `${BASE_URL}/en/audit` },
  },
}

export default function AuditPageEN() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <CTA lang="en" />
    </div>
  )
}
