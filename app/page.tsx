import type { Metadata } from 'next'
import { Hero }         from '@/components/sections/Hero'
import { Services }     from '@/components/sections/Services'
import { About }        from '@/components/sections/About'
import { Results }      from '@/components/sections/Results'
import { Portfolio }    from '@/components/sections/Portfolio'
import { Process }      from '@/components/sections/Process'
import { FAQ }          from '@/components/sections/FAQ'
import { CTA }          from '@/components/sections/CTA'
import { Zones }        from '@/components/sections/Zones'
import { JsonLd }       from '@/components/seo/JsonLd'
import { faqPageSchema, BASE_URL } from '@/lib/schema'
import { homeFaqs }     from '@/data/faq'

export const metadata: Metadata = {}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={faqPageSchema(homeFaqs)} />

      {/* 1. Hero — impact immédiat, brand statement */}
      <Hero />

      {/* 2. Services — offre scannable avec détails */}
      <Services />

      {/* 3. About — Maurice Timsit, scroll-reveal */}
      <About />

      {/* 4. Results — métriques CountUp + témoignage */}
      <Results />

      {/* 5. Portfolio — cas clients concrets */}
      <Portfolio />

      {/* 5b. Zones — carte interactive ARA */}
      <Zones />

      {/* 6. Process — comment ça se passe */}
      <Process />

      {/* 7. FAQ — objections */}
      <FAQ />

      {/* 8. Contact — formulaire audit gratuit */}
      <CTA />
    </>
  )
}
