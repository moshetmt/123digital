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
import { faqPageSchema } from '@/lib/schema'
import { homeFaqs }     from '@/data/faq'
import { BASE_URL }     from '@/lib/schema'
import { languesPour }  from '@/data/hreflang'

// La page d'accueil n'avait AUCUN `alternates` propre, donc elle heritait de
// celui du layout racine et ne declarait aucune jumelle, alors que /en pointait
// vers elle. Une paire ou un seul cote parle est jetee par Google : la page la
// plus importante du site etait precisement celle qui manquait a l'appel.
export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
    ...languesPour('/'),
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={faqPageSchema(homeFaqs)} />

      {/* 1. Hero — fond ivoire, carte statut en direct */}
      <Hero />

      {/* 2. Services — 6 cartes, 2 familles */}
      <Services />

      {/* 3. Results — LA section sombre, 4 chiffres */}
      <Results />

      {/* 4. Portfolio — cas clients (Clim69, Rhône Déconstruction, A+ Audition) */}
      <Portfolio />

      {/* 5. Process — méthode en 4 étapes */}
      <Process />

      {/* 6. About — Maurice Timsit */}
      <About />

      {/* 7. FAQ — objections */}
      <FAQ />

      {/* 8. CTA — LA bande verte, formulaire devis */}
      <CTA />

      {/* 9. Zones — chips de villes */}
      <Zones />
    </>
  )
}
