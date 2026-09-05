import type { ReactNode } from 'react'
import Link from 'next/link'
import { Phone, Check } from 'lucide-react'
import { PongCanvas } from '@/components/sections/PongCanvas'
import { t, type Locale } from '@/lib/i18n'

const PHONE_TEL = 'tel:+33652092301'

// Banniere d'accueil : meme fond et meme Pong que les pages internes
// (components/sections/PageBanner), avec en plus les trois puces de
// reassurance. Le decor vit dans PongCanvas, partage par les deux.
//
// Aucune animation d'entree ici, decision du 05/09 : le titre est l'element
// LCP de la page. Quand il partait a opacite 0 en attendant framer-motion,
// le navigateur ne le comptait qu'apres l'hydratation et le fondu, d'ou un
// LCP mobile a 6,5 s. Le texte est rendu cote serveur, visible tout de suite ;
// seul PongCanvas reste un composant client.

export function Hero({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).hero

  const checks = [d.check1, d.check2, d.check3]

  return (
    <section
      id="section-hero"
      className="relative isolate overflow-hidden"
      style={{
        padding: 'clamp(2.5rem, 6vw, 5rem) 1.5rem',
        minHeight: 'clamp(480px, 72vh, 700px)',
        display: 'flex',
        alignItems: 'center',
        color: 'var(--on-brand)',
        background:
          'radial-gradient(120% 85% at 12% 0%, var(--brand-light) 0%, transparent 58%), ' +
          'radial-gradient(110% 90% at 92% 100%, var(--brand-deep) 0%, transparent 62%), ' +
          'var(--brand)',
      }}
      aria-label="Section hero"
    >
      <PongCanvas />

      {/* Voile vert, pas noir : il assombrit a peine le centre pour que le texte
          blanc reste net quand la loupe passe derriere, et laisse les bords
          libres pour les raquettes. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(88% 58% at 50% 46%, oklch(0.395 0.112 155 / 72%) 0%, oklch(0.395 0.112 155 / 34%) 58%, oklch(0.395 0.112 155 / 0%) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <div className="text-center">
          <h1
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem, 4.6vw, 3.25rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              color: 'var(--on-brand)',
              maxWidth: '19ch',
              marginBottom: '1rem',
            }}
          >
            {highlightGoogle(d.h1)}
          </h1>

          <p
            className="mx-auto"
            style={{
              fontSize: 'clamp(0.95rem, 3.2vw, 1.1rem)',
              color: 'oklch(0.985 0.003 150 / 86%)',
              maxWidth: '58ch',
              marginBottom: 'clamp(1rem, 4vw, 1.75rem)',
              lineHeight: 1.5,
            }}
          >
            {d.sub}
          </p>

          <div
            className="flex flex-nowrap items-center justify-center gap-2.5 sm:gap-3.5 mb-6"
          >
            {/* Boutons inverses : le vert est passe en fond, l'appel devient donc
                blanc sur vert pour rester l'element le plus contraste.
                Sur telephone les deux tiennent sur une seule ligne, a condition
                de raccourcir les libelles : « Appeler maintenant » et « Demander
                un devis gratuit » cote a cote demandent 500 px, l'ecran en offre
                340. On garde les libelles longs des 640 px. */}
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full font-bold whitespace-nowrap px-4 py-3 text-[0.88rem] sm:px-6 sm:py-3.5 sm:text-[0.95rem]"
              style={{
                backgroundColor: 'var(--on-brand)',
                color: 'var(--brand-deep)',
                boxShadow: '0 2px 14px oklch(0.145 0 0 / 22%)',
              }}
            >
              <Phone size={15} aria-hidden />
              <span className="sm:hidden">{d.ctaCallShort}</span>
              <span className="hidden sm:inline">{d.ctaCall}</span>
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full font-bold whitespace-nowrap px-4 py-3 text-[0.88rem] sm:px-5 sm:py-3 sm:text-[0.95rem]"
              style={{
                border: '2px solid oklch(0.985 0.003 150 / 55%)',
                color: 'var(--on-brand)',
              }}
            >
              <span className="sm:hidden">{d.ctaQuoteShort}</span>
              <span className="hidden sm:inline">{d.ctaQuote}</span>
            </Link>
          </div>

          <ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-1.5"
            role="list"
          >
            {/* Grille a 3 colonnes des `sm` : en flex-wrap la 3e puce tombait
                seule sur une 2e ligne des que la fenetre passait sous 1280 px. */}
            {checks.map((label) => (
              <li
                key={label}
                className="flex items-start gap-1.5"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'oklch(0.985 0.003 150 / 86%)',
                  lineHeight: 1.35,
                }}
              >
                <Check
                  size={15}
                  style={{ color: 'var(--on-brand)', flexShrink: 0, marginTop: 2 }}
                  strokeWidth={3}
                  aria-hidden
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// « Google » est le seul mot mis en valeur du titre : c'est le mot que le
// visiteur cherche des yeux. Decoupage sur la chaine traduite plutot que deux
// cles i18n, pour que le titre reste une phrase entiere dans le fichier.
function highlightGoogle(text: string): ReactNode {
  const parts = text.split('Google')
  if (parts.length === 1) return text

  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <span style={{ color: 'var(--vert-pale)' }}>Google</span>}
      {part}
    </span>
  ))
}
