import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { About } from '@/components/sections/About'
import { CTA } from '@/components/sections/CTA'
import { languesPour } from '@/data/hreflang'
import { PageHeroEn } from '@/components/sections/PageHeroEn'

export const metadata: Metadata = {
  title: 'About Maurice Timsit · Digital Consultant in Lyon | 123 Digital',
  description:
    'Maurice Timsit, digital consultant in Lyon. One expert, one dedicated strategy for your business: SEO, web design, advertising and automation.',
  alternates: {
    canonical: `${BASE_URL}/en/about`,
    ...languesPour('/en/about'),
  },
}

export default function AboutPageEN() {
  return (
    <>
      <PageHeroEn
        kicker='About'
        title='Maurice Timsit, digital consultant in Lyon'
        intro="Master's in Digital Marketing from INSEEC, working with small and mid-sized businesses since 2017 on websites, search, advertising and automation. You talk to me directly, from the first call to the monthly report, with nobody in between to relay what you said."
        points={[
          'Based in Lyon, working remotely across France and beyond.',
          'One person accountable for the result, start to finish.',
          'Published client cases with real figures, not retouched screenshots.',
        ]}
      />
      <About lang="en" />
      <CTA lang="en" />
    </>
  )
}
