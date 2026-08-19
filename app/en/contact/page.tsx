import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'
import { languesPour } from '@/data/hreflang'

export const metadata: Metadata = {
  title: 'Contact — 123 Digital Lyon',
  description: 'Get in touch with Maurice Timsit, digital consultant in Lyon. Free 30-min audit, no commitment.',
  alternates: {
    canonical: `${BASE_URL}/en/contact`,
    ...languesPour('/en/contact'),
  },
}

export default function ContactPageEN() {
  return <CTA lang="en" />
}
