import type { ReactNode } from 'react'
import Link from 'next/link'
import { Phone, Check } from 'lucide-react'
import { EcranReconstruit, Flag } from '@/components/sections/EcranReconstruit'
import { PongCanvas } from '@/components/sections/PongCanvas'
import { t, type Locale } from '@/lib/i18n'

const PHONE_TEL = 'tel:+33652092301'

// Banniere d'accueil : fond vert de marque anime par le Pong, titre a gauche,
// ecran reconstruit a droite sur desktop / en dessous sur mobile. Le contenu de
// l'ecran est celui de la planche charte-visuelle.html (charte v2, section 6).
//
// ⚠️ Le decor Pong avait ete retire par la charte v2 le 08/09 : l'operateur l'a
// redemande le 09/09 (« j'adorais ca, le site n'a plus aucune douceur »). Il est
// revenu sur l'accueil ET sur les bannieres de pages internes. Ne pas le
// resupprimer sans un mot explicite de sa part. Le decor vit dans PongCanvas,
// partage par Hero et PageBanner.
//
// Aucune animation d'entree, decision du 05/09 confirmee par la charte v2
// (section 8) : le titre est l'element LCP de la page, rendu cote serveur.

export function Hero({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).hero

  const checks = [d.check1, d.check2, d.check3]

  const requete = lang === 'en' ? 'plumber leeds' : 'plombier villeurbanne'
  const resultats = lang === 'en'
    ? [
        {
          url: 'leeds-plumbing-pro.co.uk',
          titre: 'Plumber Leeds 24/7 · Free quote',
          description: 'Response in 30 min, 4.9 from 312 reviews.',
        },
        {
          url: 'yell.com',
          titre: 'Plumbers in Leeds · 48 results',
          description: 'Directory, hours, reviews.',
        },
        {
          url: 'your-site.co.uk',
          titre: 'Home',
          description: <><Flag>Page 3.</Flag> No city, no trade in the title.</>,
          vous: true,
        },
      ]
    : [
        {
          url: 'plombier-express-lyon.fr',
          titre: 'Plombier Villeurbanne 24h/24 · Devis gratuit',
          description: 'Intervention en 30 min, 4,9 sur 312 avis.',
        },
        {
          url: 'pagesjaunes.fr',
          titre: 'Plombiers à Villeurbanne · 48 résultats',
          description: 'Annuaire, horaires, avis.',
        },
        {
          url: 'votre-site.fr',
          titre: 'Accueil',
          description: <><Flag>Page 3.</Flag> Ni ville, ni métier dans le titre.</>,
          vous: true,
        },
      ]

  return (
    <section
      id="section-hero"
      className="relative isolate overflow-hidden"
      style={{
        padding: 'clamp(2.5rem, 6vw, 5rem) 1.5rem',
        color: 'var(--on-brand)',
        background:
          'radial-gradient(120% 85% at 12% 0%, var(--brand-light) 0%, transparent 58%), ' +
          'radial-gradient(110% 90% at 92% 100%, var(--brand-deep) 0%, transparent 62%), ' +
          'var(--brand)',
      }}
      aria-label="Section hero"
    >
      <PongCanvas />

      {/* Voile vert, pas noir : il assombrit a peine le fond pour que le texte
          blanc reste net quand la loupe passe derriere, et laisse les bords
          libres pour les raquettes. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(88% 58% at 30% 46%, oklch(0.395 0.112 155 / 72%) 0%, oklch(0.395 0.112 155 / 34%) 58%, oklch(0.395 0.112 155 / 0%) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem, 4.2vw, 3.25rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--on-brand)',
              maxWidth: '18ch',
              marginBottom: '1rem',
            }}
          >
            {highlightGoogle(d.h1)}
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 3.2vw, 1.1rem)',
              color: 'oklch(0.985 0.003 150 / 86%)',
              maxWidth: '52ch',
              marginBottom: 'clamp(1.25rem, 4vw, 1.75rem)',
              lineHeight: 1.55,
            }}
          >
            {d.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded font-bold whitespace-nowrap px-5 py-3 text-[0.92rem] transition duration-150 active:scale-[0.97]"
              style={{ backgroundColor: 'var(--on-brand)', color: 'var(--brand-deep)' }}
            >
              <Phone size={15} aria-hidden />
              <span className="sm:hidden">{d.ctaCallShort}</span>
              <span className="hidden sm:inline">{d.ctaCall}</span>
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded font-bold whitespace-nowrap px-5 py-3 text-[0.92rem] transition duration-150 active:scale-[0.97]"
              style={{ border: '1px solid oklch(0.985 0.003 150 / 55%)', color: 'var(--on-brand)' }}
            >
              <span className="sm:hidden">{d.ctaQuoteShort}</span>
              <span className="hidden sm:inline">{d.ctaQuote}</span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-2" role="list">
            {checks.map((label) => (
              <li
                key={label}
                className="flex items-start gap-1.5"
                style={{ fontSize: '0.85rem', fontWeight: 600, color: 'oklch(0.985 0.003 150 / 86%)', lineHeight: 1.35 }}
              >
                <Check size={15} style={{ color: 'var(--on-brand)', flexShrink: 0, marginTop: 2 }} strokeWidth={3} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <EcranReconstruit requete={requete} resultats={resultats} className="lg:justify-self-end" />
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
      {i > 0 && <span style={{ color: 'var(--brand-tint)' }}>Google</span>}
      {part}
    </span>
  ))
}
