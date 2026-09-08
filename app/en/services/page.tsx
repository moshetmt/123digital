import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { Services } from '@/components/sections/Services'
import { CTA } from '@/components/sections/CTA'
import { languesPour } from '@/data/hreflang'
import { PageHeroEn } from '@/components/sections/PageHeroEn'

export const metadata: Metadata = {
  title: 'Digital Services for SMEs · SEO, Web Design, Google Ads | 123 Digital Lyon',
  description:
    'All digital services to grow your business: website creation, SEO, online advertising, branding, community management and marketing automation. Measurable results.',
  alternates: {
    canonical: `${BASE_URL}/en/services`,
    ...languesPour('/en/services'),
  },
}

export default function ServicesPageEN() {
  return (
    <>
      <PageHeroEn
        kicker='Services'
        title='Digital services for small and mid-sized businesses'
        intro='Six specialities, one logic: making your phone ring. A website that turns visitors into enquiries, visibility on the searches your customers actually type, advertising with a return you can measure, plus brand, social presence and the automation that stops work falling through the cracks.'
        points={[
          'You work with the consultant who does the work, not an account manager.',
          'Every recommendation comes with the number behind it.',
          'No lock-in: the site, the accounts and the data stay yours.',
        ]}
      />
      <Services lang="en" />
      <CTA lang="en" />
    </>
  )
}
