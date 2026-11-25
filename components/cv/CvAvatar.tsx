'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const SRC = '/images/maurice-timsit-portrait-sombre.jpg'

/**
 * Photo ronde de /portfolio : plus grande sur ordinateur, et un toucher
 * l'ouvre en grand (demande de Moshe du 27/10, « zoomer sur ma tete »).
 */
export function CvAvatar({ alt, fermer }: { alt: string; fermer: string }) {
  const [ouvert, setOuvert] = useState(false)

  useEffect(() => {
    if (!ouvert) return
    const echap = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false)
    document.addEventListener('keydown', echap)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', echap)
      document.body.style.overflow = ''
    }
  }, [ouvert])

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-label={alt}
        className="block cursor-zoom-in rounded-full transition-transform duration-150 active:scale-95"
      >
        <Image
          src={SRC}
          alt={alt}
          width={1000}
          height={1250}
          priority
          sizes="(min-width: 1024px) 160px, 110px"
          className="block h-24 w-24 rounded-full object-cover lg:h-36 lg:w-36"
          style={{ objectPosition: '50% 18%' }}
        />
      </button>

      {ouvert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOuvert(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(8, 10, 9, 0.92)', backdropFilter: 'blur(6px)' }}
        >
          <Image
            src={SRC}
            alt={alt}
            width={1000}
            height={1250}
            sizes="90vw"
            className="h-auto w-full object-cover"
            style={{ maxWidth: '26rem', borderRadius: '1.75rem' }}
          />
          <button
            type="button"
            onClick={() => setOuvert(false)}
            aria-label={fermer}
            className="absolute flex items-center justify-center"
            style={{ top: '1.25rem', right: '1.25rem', width: '2.75rem', height: '2.75rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF' }}
          >
            <X size={20} aria-hidden />
          </button>
        </div>
      )}
    </>
  )
}
