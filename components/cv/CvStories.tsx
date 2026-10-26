'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { designs } from '@/data/telephone'

const DUREE_IMAGE = 5 // secondes par story fixe

/**
 * Designs et reels Habad de /portfolio, facon stories Instagram (choix de
 * Moshe du 27/10) : une rangee de bulles, un toucher ouvre le lecteur plein
 * ecran avec les barres de progression. Toucher a droite = suivant, a gauche =
 * precedent ; fleches du clavier et Echap sur ordinateur.
 */
export function CvStories({ intro, voir, fermer }: { intro: string; voir: string; fermer: string }) {
  const [ouvert, setOuvert] = useState<number | null>(null)
  const [duree, setDuree] = useState(DUREE_IMAGE)

  const aller = useCallback((i: number) => {
    if (i < 0) return setOuvert(0)
    if (i >= designs.length) return setOuvert(null)
    setDuree(DUREE_IMAGE)
    setOuvert(i)
  }, [])

  useEffect(() => {
    if (ouvert === null) return
    const touche = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuvert(null)
      if (e.key === 'ArrowRight') aller(ouvert + 1)
      if (e.key === 'ArrowLeft') aller(ouvert - 1)
    }
    document.addEventListener('keydown', touche)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', touche)
      document.body.style.overflow = ''
    }
  }, [ouvert, aller])

  const d = ouvert === null ? null : designs[ouvert]

  return (
    <>
      <p style={{ fontSize: '0.92rem', color: '#8FA497', marginBottom: '1rem' }}>{intro}</p>
      <ul
        className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ listStyle: 'none' }}
      >
        {designs.map((e, i) => (
          <li key={e.id} className="shrink-0">
            <button
              type="button"
              onClick={() => aller(i)}
              aria-label={e.titre}
              className="flex flex-col items-center gap-1.5 transition-transform duration-150 active:scale-90"
            >
              <span
                className="relative block rounded-full"
                style={{ padding: '3px', background: e.video ? 'linear-gradient(135deg, #E4572E, #F2B33D)' : 'linear-gradient(135deg, #6FB791, #00713D)' }}
              >
                <span className="relative block overflow-hidden rounded-full" style={{ width: '4.6rem', height: '4.6rem', border: '3px solid #131814' }}>
                  <Image src={e.src} alt="" fill sizes="80px" className="object-cover" style={{ objectPosition: '50% 30%' }} />
                </span>
                {e.video && (
                  <span className="absolute bottom-0 right-0 flex items-center justify-center rounded-full" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#E4572E', border: '2px solid #131814', color: '#FFFFFF' }}>
                    <Play size={11} fill="currentColor" aria-hidden />
                  </span>
                )}
              </span>
              <span style={{ fontSize: '0.74rem', color: '#C9D6CE', maxWidth: '5.2rem' }} className="truncate">{e.court}</span>
            </button>
          </li>
        ))}
      </ul>

      {d && ouvert !== null && (
        <div role="dialog" aria-modal="true" aria-label={d.titre} className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#050605' }}>
          <div className="relative h-full w-full overflow-hidden sm:h-[min(92vh,52rem)] sm:w-auto sm:rounded-[1.5rem]" style={{ aspectRatio: '9 / 16', maxWidth: '100vw' }}>
            {d.video ? (
              <video
                key={d.id}
                src={d.video}
                poster={d.src}
                autoPlay
                muted
                playsInline
                onLoadedMetadata={(e) => setDuree(e.currentTarget.duration || DUREE_IMAGE)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image key={d.id} src={d.src} alt={d.titre} fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" priority />
            )}

            {/* Barres de progression : la barre active se remplit, sa fin passe a la suivante. */}
            <div className="absolute inset-x-0 top-0 z-10 flex gap-1 px-3 pt-3" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45), transparent)' }}>
              {designs.map((e, i) => (
                <span key={e.id} className="h-[3px] flex-1 overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
                  <span
                    key={i === ouvert ? `${d.id}-${duree}` : e.id}
                    className="block h-full origin-left bg-white"
                    style={
                      i < ouvert
                        ? undefined
                        : i === ouvert
                          ? { animation: `cv-barre ${duree}s linear forwards` }
                          : { transform: 'scaleX(0)' }
                    }
                    onAnimationEnd={i === ouvert ? () => aller(ouvert + 1) : undefined}
                  />
                </span>
              ))}
            </div>
            <div className="absolute inset-x-0 top-6 z-10 flex items-center justify-between px-4">
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{d.titre}</span>
              <button type="button" onClick={() => setOuvert(null)} aria-label={fermer} className="flex items-center justify-center rounded-full" style={{ width: '2.5rem', height: '2.5rem', color: '#FFFFFF' }}>
                <X size={24} aria-hidden />
              </button>
            </div>

            {/* Zones de toucher : gauche = precedent, droite = suivant. */}
            <button type="button" aria-label="Précédent" onClick={() => aller(ouvert - 1)} className="absolute bottom-24 left-0 top-20 z-[5] w-1/3" />
            <button type="button" aria-label="Suivant" onClick={() => aller(ouvert + 1)} className="absolute bottom-24 right-0 top-20 z-[5] w-2/3" />

            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-6 pt-10" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.55), transparent)' }}>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-transform duration-150 active:scale-95"
                style={{ backgroundColor: '#FFFFFF', color: '#131814', fontSize: '0.92rem', fontWeight: 700, borderRadius: '9999px', padding: '0.75rem 1.3rem' }}
              >
                {voir}
                <ArrowUpRight size={17} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
