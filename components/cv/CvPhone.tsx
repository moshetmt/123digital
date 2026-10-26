'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
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

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: 'min(17rem, 72vw)', aspectRatio: '9 / 18.6', borderRadius: '2.9rem', padding: '0.6rem', background: '#050706', boxShadow: '0 0 0 1px rgba(205,230,216,0.18), 0 30px 60px -20px rgba(0,0,0,0.7)' }}
      >
        <div
          ref={ecran}
          onScroll={(e) => setActif(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ borderRadius: '2.35rem' }}
          aria-label={work.heading}
        >
          {sitesEnTelephone.map((p) => (
            <div key={p.id} className="relative h-full w-full shrink-0 snap-center">
              <Image src={ECRANS[p.id]} alt={p.title} fill sizes="272px" className="object-cover object-top" />
            </div>
          ))}
        </div>
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

      <a
        href={projet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-center transition-opacity hover:opacity-80"
        style={{ marginTop: '0.9rem' }}
      >
        <span className="inline-flex items-center gap-1.5" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F2F7F4' }}>
          {projet.title}
          <ArrowUpRight size={17} aria-hidden style={{ color: '#6FB791' }} />
        </span>
        <span style={{ fontSize: '0.86rem', color: '#8FA497', marginTop: '0.2rem' }}>{sector}</span>
      </a>
    </div>
  )
}
