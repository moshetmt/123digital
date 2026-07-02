import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { Services } from '@/components/sections/Services'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Digital Services for SMEs — SEO, Web Design, Google Ads | 123 Digital Lyon',
  description:
    'All digital services to grow your business: website creation, SEO, online advertising, branding, community management and marketing automation. Measurable results.',
  alternates: {
    canonical: `${BASE_URL}/en/services`,
    languages: { 'fr': `${BASE_URL}/services`, 'en': `${BASE_URL}/en/services` },
  },
}

export default function ServicesPageEN() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <Services lang="en" />
      <CTA lang="en" />
    </div>
  )
}
