import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'
import { languesPour } from '@/data/hreflang'
import { PageHeroEn } from '@/components/sections/PageHeroEn'

export const metadata: Metadata = {
  title: 'Contact · 123 Digital Lyon',
  description: 'Get in touch with Maurice Timsit, digital consultant in Lyon. Free 30-min audit, no commitment.',
  alternates: {
    canonical: `${BASE_URL}/en/contact`,
    ...languesPour('/en/contact'),
  },
}

export default function ContactPageEN() {
  return (
    <>
      <PageHeroEn
        kicker="Contact"
        title="Talk to 123 Digital"
        intro="One conversation is usually enough to know whether there is something worth doing. Tell me what your business does and what is not working online, and you get a straight answer, including when that answer is that you do not need an agency at all."
        points={[
          'Answer within one working day.',
          'French or English, whichever you prefer.',
          'No form to fill before you can speak to someone.',
        ]}
      />
      <CTA lang="en" />
    </>
  )
}
