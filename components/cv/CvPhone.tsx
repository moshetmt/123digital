'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ECRANS, sitesEnTelephone } from '@/data/telephone'
import type { CvContent } from '@/data/cv'


/**
 * Realisations de /portfolio : un iPhone dont l'ecran fait defiler au doigt les
 * sites livres (demande de Moshe du 26/10, a la place de la liste de cartes).
 */
export function CvPhone({ work }: { work: CvContent['work'] }) {
  const ecran = useRef<HTMLDivElement>(null)
  const [actif, setActif] = useState(0)
  const projet = sitesEnTelephone[actif]
  const sector = work.projects?.[projet.id]?.sector ?? projet.sector

  const aller = (i: number) => {
    const el = ecran.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  // Fleches sur ordinateur seulement (demande de Moshe du 27/10) : sur
  // telephone, on fait defiler au doigt.
  const fleche = (sens: 1 | -1) => (
    <button
      type="button"
      onClick={() => aller((actif + sens + sitesEnTelephone.length) % sitesEnTelephone.length)}
      aria-label={sens === 1 ? 'Suivant' : 'Précédent'}
      className="hidden shrink-0 items-center justify-center transition-[transform,background-color] duration-150 hover:bg-[#00713D] active:scale-90 md:flex"
      style={{ width: '3rem', height: '3rem', borderRadius: '9999px', border: '1px solid rgba(205,230,216,0.25)', backgroundColor: 'rgba(205,230,216,0.08)', color: '#F2F7F4' }}
    >
      {sens === 1 ? <ChevronRight size={22} aria-hidden /> : <ChevronLeft size={22} aria-hidden />}
    </button>
  )

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-6">
      {fleche(-1)}
      <div
        className="relative"
        style={{ width: 'min(17rem, 72vw)', aspectRatio: '9 / 18.6', borderRadius: '2.9rem', padding: '0.6rem', background: '#050706', boxShadow: '0 0 0 1px rgba(205,230,216,0.18), 0 30px 60px -20px rgba(0,0,0,0.7)' }}
      >
        <div
          ref={ecran}
          onScroll={(e) => setActif(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          // Safari ne decoupe pas les coins arrondis d'une zone qui defile : le
          // masque force la decoupe (l'ecran debordait du cadre, capture du 26/10).
          style={{ borderRadius: '2.35rem', WebkitMaskImage: '-webkit-radial-gradient(white, black)', transform: 'translateZ(0)' }}
          aria-label={work.heading}
        >
          {sitesEnTelephone.map((p) => (
            <div key={p.id} className="relative h-full w-full shrink-0 snap-center">
              <Image src={ECRANS[p.id]} alt={p.title} fill sizes="272px" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </div>

      {fleche(1)}
      </div>

      <div className="flex items-center gap-2" style={{ marginTop: '1.1rem' }}>
        {sitesEnTelephone.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => aller(i)}
            aria-label={p.title}
            className="transition-all"
            style={{ width: i === actif ? '1.6rem' : '0.5rem', height: '0.5rem', borderRadius: '9999px', backgroundColor: i === actif ? '#6FB791' : 'rgba(205,230,216,0.3)' }}
          />
        ))}
      </div>

      <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F2F7F4', marginTop: '0.9rem' }}>{projet.title}</p>
      <p style={{ fontSize: '0.86rem', color: '#8FA497', marginTop: '0.15rem' }}>{sector}</p>
      <a
        href={projet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 transition-[transform,background-color] duration-150 hover:bg-[#008A4A] active:scale-95"
        style={{ marginTop: '0.9rem', backgroundColor: '#00713D', color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, borderRadius: '9999px', padding: '0.8rem 1.4rem', boxShadow: '0 10px 24px -10px rgba(0,113,61,0.8)' }}
      >
        {work.openSite}
        <ArrowUpRight size={18} aria-hidden />
      </a>
    </div>
  )
}
