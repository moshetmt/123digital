import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import { cvContent, type CvLocale } from '@/data/cv'
import { projects } from '@/data/portfolio'
import { AVIS_GOOGLE } from '@/lib/avis-google'
import { CvNav } from './CvNav'
import { CvWork } from './CvWork'

/**
 * lucide-react 1.x ne fournit plus les logos de marque, d'ou ce glyphe local.
 * Trace officiel du logo LinkedIn : le carre plein avec le « in » evide.
 */
function LinkedinGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

// Charte 123digital, version nuit : fond 950 (encre), texte clair, vert 400 en
// accent, filets 200 en transparence. Le vert 600 #00713D ne sert qu'au fond
// des boutons (en texte sur l'encre, il ne passe pas le contraste).
const C = {
  fond: '#131814',
  titre: '#F2F7F4',
  texte: '#C9D6CE',
  discret: '#8FA497',
  accent: '#6FB791',
  filet: 'rgba(205, 230, 216, 0.14)',
  bouton: '#00713D',
}

const SECTION_TITRE = {
  fontSize: '0.8rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: C.titre,
}

/**
 * Page /portfolio (FR) et /en/portfolio (EN), gabarit valide le 26/10/2026 :
 * colonne de gauche fixe sur ordinateur (photo, nom, titre, navigation par
 * ancres, liens), colonne de droite qui defile. Sur telephone, tout s'empile,
 * photo en premier.
 */
export function CvPage({ locale }: { locale: CvLocale }) {
  const c = cvContent[locale]
  const { identity } = c

  const sections = [
    { id: 'a-propos', label: c.nav.about },
    { id: 'preuves', label: c.nav.proofs },
    { id: 'realisations', label: c.nav.work },
    { id: 'parcours', label: c.nav.experience },
    { id: 'contact', label: c.nav.contact },
  ]

  const preuves = [
    {
      label: c.proofs.reviewsLabel.replace('{note}', AVIS_GOOGLE.note).replace('{nombre}', String(AVIS_GOOGLE.nombre)),
      source: c.proofs.reviewsSource,
      href: c.proofs.reviewsHref,
      externe: true,
    },
    {
      label: c.proofs.workLabel.replace('{n}', String(projects.length)),
      source: c.proofs.workSource,
      href: '#realisations',
      externe: false,
    },
    {
      label: c.proofs.languagesLabel,
      source: c.proofs.languagesSource,
      href: c.proofs.languagesHref,
      externe: true,
    },
  ]

  const liens = [
    { href: `mailto:${identity.email}`, label: locale === 'fr' ? 'Mail' : 'Email', icon: <Mail size={17} aria-hidden />, externe: false },
    { href: identity.linkedin, label: c.contact.linkedinCta, icon: <LinkedinGlyph size={16} />, externe: true },
    { href: identity.phoneHref, label: identity.phone, icon: <Phone size={17} aria-hidden />, externe: false },
    { href: identity.cvFile, label: 'PDF', icon: <Download size={17} aria-hidden />, externe: false, download: true },
  ]

  // Titre de section : collant en haut sur telephone (comme le gabarit de
  // reference), simple intertitre sur ordinateur.
  const titreSection = (texte: string) => (
    <div
      className="sticky top-0 z-20 mb-2 bg-[rgba(19,24,20,0.92)] backdrop-blur-sm lg:static lg:mb-4 lg:bg-transparent lg:backdrop-blur-none"
      style={{ padding: '1.1rem 0' }}
    >
      <h2 style={SECTION_TITRE}>{texte}</h2>
    </div>
  )

  return (
    <div style={{ backgroundColor: C.fond, color: C.texte, minHeight: '100vh' }}>
      <div
        className="mx-auto lg:flex lg:justify-between lg:gap-12"
        style={{ maxWidth: '80rem', padding: '0 clamp(1rem, 5vw, 6rem)' }}
      >
        {/* Colonne de gauche */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:overflow-y-auto lg:w-[46%] lg:flex-col lg:justify-between" style={{ paddingTop: 'clamp(1.25rem, 5vh, 3.5rem)', paddingBottom: 'clamp(1.5rem, 5vh, 3.5rem)' }}>
          <div>
            {/* En-tete de profil (reference choisie par Moshe le 26/10) : petite photo
                ronde au-dessus du nom, bloc centre sur telephone, aligne a gauche
                sur ordinateur. */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Image
                src="/images/maurice-timsit-portrait-vert.jpg"
                alt={identity.portraitAlt}
                width={1000}
                height={1250}
                priority
                sizes="120px"
                className="block object-cover"
                style={{ width: 'clamp(5.5rem, 12vh, 7rem)', height: 'clamp(5.5rem, 12vh, 7rem)', borderRadius: '9999px', objectPosition: '50% 18%', boxShadow: `0 0 0 3px ${C.fond}, 0 0 0 5px ${C.accent}` }}
              />

              <h1
                style={{ fontSize: 'clamp(2.1rem, 4vw, 2.9rem)', fontWeight: 800, color: C.titre, lineHeight: 1.05, letterSpacing: '-0.025em', marginTop: 'clamp(1rem, 2.5vh, 1.4rem)' }}
              >
                {identity.name}
              </h1>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: C.titre, lineHeight: 1.4, marginTop: '0.6rem', maxWidth: '28rem' }}>
                {identity.role}
              </p>
              <p style={{ fontSize: '0.95rem', color: C.texte, lineHeight: 1.55, marginTop: '0.7rem', maxWidth: '24rem' }}>
                {identity.pitch}
              </p>
              <p className="inline-flex items-center gap-1.5" style={{ fontSize: '0.82rem', fontWeight: 700, color: C.accent, marginTop: '0.8rem' }}>
                <MapPin size={14} aria-hidden /> {identity.location} · {identity.availability}
              </p>
            </div>

            <div style={{ marginTop: 'clamp(1.25rem, 4vh, 2.5rem)' }}>
              <CvNav items={sections} label={c.nav.menuLabel} />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <ul className="flex flex-wrap" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem 1.25rem' }}>
              {liens.map((lien) => (
                <li key={lien.href}>
                  <a
                    href={lien.href}
                    {...(lien.externe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(lien.download ? { download: true } : {})}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[#6FB791]"
                    style={{ fontSize: '0.84rem', fontWeight: 600, color: C.titre, padding: '0.2rem 0' }}
                  >
                    {lien.icon}
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4" style={{ marginTop: '1.25rem' }}>
              <Link href={c.nav.backHref} aria-label={c.nav.backToSite}>
                <Image src="/images/logo-nuit.svg" alt="123digital" width={273} height={56} unoptimized style={{ width: 120, height: 'auto' }} />
              </Link>
              <Link
                href={c.nav.switchHref}
                aria-label={c.nav.switchAria}
                className="rounded transition-colors hover:text-[#6FB791]"
                style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em', color: C.titre, border: `1px solid ${C.filet}`, padding: '0.25rem 0.6rem' }}
              >
                {c.nav.switchLabel}
              </Link>
            </div>
          </div>
        </header>

        {/* Colonne de droite */}
        <div className="lg:w-[54%]" style={{ paddingTop: 'clamp(0rem, 5vh, 3.5rem)', paddingBottom: '4rem' }}>
          <section id="a-propos" className="scroll-mt-16" style={{ marginBottom: 'clamp(4rem, 10vh, 6rem)' }} aria-label={c.nav.about}>
            {titreSection(c.nav.about)}
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: C.texte }}>{c.intro.body}</p>

            {/* Personnalite : le profil vient d'un test passe chez un editeur,
                la source est affichee avec lui. */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.discret, marginBottom: '0.45rem' }}>
                {c.intro.traitsLabel}
              </p>
              <p style={{ fontSize: '0.92rem', color: C.texte }}>
                <span style={{ fontWeight: 700, color: C.accent }}>{c.intro.traitsProfile}</span>
                {c.intro.traits.length > 0 && ' · '}
                {c.intro.traits.join(' · ')}
              </p>
              <p style={{ fontSize: '0.78rem', color: C.discret, marginTop: '0.45rem' }}>
                {c.intro.traitsSourceUrl ? (
                  <a href={c.intro.traitsSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1" style={{ color: C.accent, fontWeight: 600 }}>
                    {c.intro.traitsSource} <ArrowUpRight size={12} aria-hidden />
                  </a>
                ) : (
                  c.intro.traitsSource
                )}
              </p>
            </div>
          </section>

          <section id="preuves" className="scroll-mt-16" style={{ marginBottom: 'clamp(4rem, 10vh, 6rem)' }}>
            {titreSection(c.proofs.heading)}
            <ul className="grid grid-cols-1 sm:grid-cols-3" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '0.75rem' }}>
              {preuves.map((preuve) => (
                <li key={preuve.href}>
                  <a
                    href={preuve.href}
                    {...(preuve.externe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex h-full flex-col justify-between rounded-lg transition-colors hover:bg-[rgba(205,230,216,0.06)]"
                    style={{ border: `1px solid ${C.filet}`, padding: '1rem 1.1rem', gap: '0.8rem' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: C.titre, lineHeight: 1, letterSpacing: '-0.02em' }}>{preuve.label.split('|')[0]}</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: C.titre, lineHeight: 1.2 }}>{preuve.label.split('|')[1]}</span>
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: C.accent }}>
                      <span className="underline underline-offset-4" style={{ textDecorationColor: 'rgba(111, 183, 145, 0.5)' }}>
                        {preuve.source}
                      </span>
                      <ArrowUpRight size={13} aria-hidden className="inline-block align-[-2px] ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section id="realisations" className="scroll-mt-16" style={{ marginBottom: 'clamp(4rem, 10vh, 6rem)' }}>
            {titreSection(c.work.heading)}
            <div className="sm:-mx-4">
              <CvWork work={c.work} />
            </div>
          </section>

          <section id="parcours" className="scroll-mt-16" style={{ marginBottom: 'clamp(4rem, 10vh, 6rem)' }}>
            {titreSection(c.experience.heading)}
            <ol className="flex flex-col" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '2.25rem' }}>
              {c.experience.items.map((item) => (
                <li key={item.role + item.org} className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-6">
                  <p style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.discret, paddingTop: '0.2rem' }}>
                    {item.period}
                  </p>
                  <div>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: C.titre, lineHeight: 1.35 }}>
                      {item.role} · {item.org}
                    </h3>
                    {item.note ? <p style={{ fontSize: '0.82rem', color: C.discret, marginTop: '0.15rem' }}>{item.note}</p> : null}
                    {item.context ? (
                      <p style={{ fontSize: '0.86rem', color: C.discret, lineHeight: 1.55, fontStyle: 'italic', marginTop: '0.45rem' }}>{item.context}</p>
                    ) : null}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0.55rem 0 0' }} className="flex flex-col gap-1.5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} style={{ fontSize: '0.92rem', color: C.texte, lineHeight: 1.6 }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-6" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: `1px solid ${C.filet}` }}>
              <h3 style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.titre, paddingTop: '0.2rem' }}>
                {c.education.heading}
              </h3>
              <div>
                <ul className="flex flex-col" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '1rem' }}>
                  {c.education.items.map((item) => (
                    <li key={item.degree}>
                      <p style={{ fontSize: '0.95rem', fontWeight: 700, color: C.titre }}>
                        {item.degree} · {item.school}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: C.discret, marginTop: '0.1rem' }}>{item.period}</p>
                      {item.detail ? <p style={{ fontSize: '0.85rem', color: C.texte, lineHeight: 1.5, marginTop: '0.25rem' }}>{item.detail}</p> : null}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: '0.9rem', color: C.texte, marginTop: '1.25rem' }}>
                  <span style={{ fontWeight: 700, color: C.titre }}>{c.education.languagesLabel}{locale === 'fr' ? ' : ' : ': '}</span>
                  {c.education.languages.map((l) => `${l.name} ${l.level}`).join(' · ')}
                </p>
              </div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-16">
            {titreSection(c.nav.contact)}
            <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: C.titre, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {c.contact.heading}
            </p>
            <p style={{ fontSize: '1rem', color: C.texte, lineHeight: 1.65, marginTop: '0.7rem' }}>{c.contact.body}</p>

            <div className="flex flex-wrap" style={{ gap: '0.75rem', marginTop: '1.5rem' }}>
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-2 rounded font-bold transition-[filter] hover:brightness-110"
                style={{ backgroundColor: C.bouton, color: '#FFFFFF', padding: '0.8rem 1.35rem', fontSize: '0.92rem' }}
              >
                <Mail size={16} aria-hidden /> {c.contact.emailCta}
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded font-bold transition-colors hover:bg-[rgba(205,230,216,0.06)]"
                style={{ border: `1px solid rgba(205, 230, 216, 0.35)`, color: C.titre, padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
              >
                <LinkedinGlyph /> {c.contact.linkedinCta}
              </a>
              <a
                href={identity.cvFile}
                download
                className="inline-flex items-center gap-2 rounded font-bold transition-colors hover:bg-[rgba(205,230,216,0.06)]"
                style={{ border: `1px solid rgba(205, 230, 216, 0.35)`, color: C.titre, padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
              >
                <Download size={16} aria-hidden /> {c.contact.pdfCta}
              </a>
            </div>

            <p style={{ marginTop: '2.5rem', fontSize: '0.85rem' }}>
              <Link href={c.nav.backHref} className="inline-flex items-center gap-1 underline underline-offset-4" style={{ color: C.accent, fontWeight: 700 }}>
                {c.nav.backToSite} <ArrowUpRight size={14} aria-hidden />
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
