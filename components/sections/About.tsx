import Image from 'next/image'
import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'

export function About({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).about

  return (
    <section style={{ backgroundColor: 'var(--surface)', padding: '0 1.5rem clamp(2rem, 5vw, 3.5rem)' }} aria-labelledby="about-heading">
      <div
        className="mx-auto grid grid-cols-[76px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[120px_1fr_170px] gap-3.5 sm:gap-6 items-center rounded"
        style={{ maxWidth: '48rem', backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', padding: 'clamp(1rem, 3.5vw, 1.75rem)' }}
      >
        {/* Portrait a cote du texte des le telephone : empile, il ajoutait
            120 px de hauteur pour rien. */}
        <div
          className="relative overflow-hidden rounded shrink-0 w-[76px] h-[76px] sm:w-[120px] sm:h-[120px]"
          style={{ border: '2px solid var(--line-strong)' }}
        >
          <Image
            src="/portraitmaurice.jpg"
            alt={lang === 'en' ? 'Maurice Timsit, digital consultant in Lyon' : 'Maurice Timsit, consultant digital à Lyon'}
            fill
            sizes="(max-width: 640px) 76px, 120px"
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        <div className="text-left">
          <h2
            id="about-heading"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.35rem' }}
          >
            {d.heading}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
            {d.body}
            {/* Lien vers la page dediee a la requete « consultant digital Lyon »
                (jamais l'ancre « agence », reservee a /lyon). */}
            {lang === 'fr' && (
              <>
                {' '}Mon offre en détail :{' '}
                <Link href="/consultant-digital-lyon" className="underline underline-offset-2" style={{ color: 'var(--brand)', fontWeight: 600 }}>
                  consultant digital à Lyon
                </Link>
                .
              </>
            )}
          </p>
        </div>
        {/* Scène dessinée à droite à partir de md : en dessous, le bloc
            reste portrait + texte. */}
        <div className="hidden md:block">
          <Image
            src="/images/illustrations/about-consultant.webp"
            alt=""
            width={800}
            height={800}
            sizes="170px"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  )
}
