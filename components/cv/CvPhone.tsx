'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ecrans } from '@/data/telephone'
import type { CvContent } from '@/data/cv'


/**
 * Realisations de /portfolio : un iPhone dont l'ecran fait defiler au doigt les
 * sites livres puis les stories et reels Habad (demandes de Moshe des 26 et
 * 27/10). Les stories sont en 9:16, affichees entieres sur fond noir.
 */
export function CvPhone({ work }: { work: CvContent['work'] }) {
  const ecran = useRef<HTMLDivElement>(null)
  const [actif, setActif] = useState(0)
  const projet = ecrans[actif]
  const sector = work.projects?.[projet.id]?.sector ?? projet.secteur

  // Seul le reel affiche joue, les autres sont en pause.
  useEffect(() => {
    ecran.current?.querySelectorAll('video').forEach((v) => {
      if (Number(v.dataset.i) === actif) v.play().catch(() => {})
      else v.pause()
    })
  }, [actif])

  const aller = (i: number) => {
    const el = ecran.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  // Fleches sur ordinateur seulement (demande de Moshe du 27/10) : sur
  // telephone, on fait defiler au doigt.
  const fleche = (sens: 1 | -1) => (
    <button
      type="button"
      onClick={() => aller((actif + sens + ecrans.length) % ecrans.length)}
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
          {ecrans.map((p, i) => (
            <div key={p.id} className="relative flex h-full w-full shrink-0 snap-center items-center bg-black">
              {p.video ? (
                <video src={p.video} poster={p.src} data-i={i} muted loop playsInline preload="none" className="h-auto w-full" aria-label={p.titre} />
              ) : (
                <Image src={p.src} alt={p.titre} fill sizes="272px" className={p.lien === 'site' ? 'object-cover object-top' : 'object-contain'} />
              )}
            </div>
          ))}
        </div>
      </div>

      {fleche(1)}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5" style={{ marginTop: '1.1rem', maxWidth: '17rem' }}>
        {ecrans.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => aller(i)}
            aria-label={p.titre}
            className="transition-all"
            style={{ width: i === actif ? '1.3rem' : '0.4rem', height: '0.4rem', borderRadius: '9999px', backgroundColor: i === actif ? '#6FB791' : 'rgba(205,230,216,0.3)' }}
          />
        ))}
      </div>

      <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F2F7F4', marginTop: '0.9rem' }}>{projet.titre}</p>
      <p style={{ fontSize: '0.86rem', color: '#8FA497', marginTop: '0.15rem' }}>{sector}</p>
      <a
        href={projet.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 transition-[transform,background-color] duration-150 hover:bg-[#008A4A] active:scale-95"
        style={{ marginTop: '0.9rem', backgroundColor: '#00713D', color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, borderRadius: '9999px', padding: '0.8rem 1.4rem', boxShadow: '0 10px 24px -10px rgba(0,113,61,0.8)' }}
      >
        {projet.lien === 'site' ? work.openSite : work.openInstagram}
        <ArrowUpRight size={18} aria-hidden />
      </a>
    </div>
  )
}
