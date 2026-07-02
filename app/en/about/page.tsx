import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { About } from '@/components/sections/About'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'About Maurice Timsit — Digital Consultant in Lyon | 123 Digital',
  description:
    'Maurice Timsit, digital consultant in Lyon. One expert, one dedicated strategy for your business: SEO, web design, advertising and automation.',
  alternates: {
    canonical: `${BASE_URL}/en/about`,
    languages: { 'fr': `${BASE_URL}/a-propos`, 'en': `${BASE_URL}/en/about` },
  },
}

export default function AboutPageEN() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <About lang="en" />
      <CTA lang="en" />
    </div>
  )
}
