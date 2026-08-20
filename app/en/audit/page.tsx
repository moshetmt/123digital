import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'
import { languesPour } from '@/data/hreflang'
import { PageHeroEn } from '@/components/sections/PageHeroEn'

export const metadata: Metadata = {
  title: 'Free Digital Audit — 123 Digital Lyon',
  description: 'Request your free 30-minute digital audit with Maurice Timsit. No commitment, just a concrete action plan.',
  alternates: {
    canonical: `${BASE_URL}/en/audit`,
    ...languesPour('/en/audit'),
  },
}

export default function AuditPageEN() {
  return (
    <>
      <PageHeroEn
        kicker='Free audit'
        title='A free 30-minute audit of your digital presence'
        intro='A structured look at where your business stands online: what people search for, what your site answers today, and where the gap between the two is costing you customers. You leave with the three changes worth making first, in writing, whether or not you work with me afterwards.'
        points={[
          '30 minutes, by phone or video, at a time that suits you.',
          'No commitment and no sales script.',
          'A written summary you can hand to anyone, including another agency.',
        ]}
      />
      <CTA lang="en" />
    </>
  )
}
