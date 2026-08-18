import type { Metadata } from 'next'
import { Hero }      from '@/components/sections/Hero'
import { Services }  from '@/components/sections/Services'
import { About }     from '@/components/sections/About'
import { Results }   from '@/components/sections/Results'
import { Portfolio } from '@/components/sections/Portfolio'
import { Process }   from '@/components/sections/Process'
import { FAQ }       from '@/components/sections/FAQ'
import { CTA }       from '@/components/sections/CTA'
import { Zones }     from '@/components/sections/Zones'
import { JsonLd }    from '@/components/seo/JsonLd'
import { faqPageSchema } from '@/lib/schema'
import { getHomeFaqs } from '@/data/faq'
import { BASE_URL as BU } from '@/lib/schema'

export const metadata: Metadata = {
  title: '123 Digital Lyon — Digital Growth Expert for SMEs',
  description: 'Maurice Timsit, digital consultant in Lyon: SEO, web design, online advertising and automation for SMEs. Free 30-min audit.',
  alternates: {
    canonical: `${BU}/en`,
    languages: { 'fr': BU, 'en': `${BU}/en` },
  },
}

export default function HomePageEN() {
  return (
    <>
      <JsonLd schema={faqPageSchema(getHomeFaqs('en'))} />
      <Hero lang="en" />
      <Services lang="en" />
      <Results lang="en" />
      <Portfolio lang="en" />
      <Process lang="en" />
      <About lang="en" />
      <FAQ lang="en" />
      <CTA lang="en" />
      <Zones lang="en" />
    </>
  )
}
