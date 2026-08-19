import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import { cvContent, type CvLocale } from '@/data/cv'
import { CvWork } from './CvWork'

/** lucide-react 1.x ne fournit plus les logos de marque, d'ou ce glyphe local. */
function LinkedinGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.5h5V21h-5V9.5ZM10 9.5h4.8v1.57h.07a5.26 5.26 0 0 1 4.73-2.6c5.06 0 6 3.33 6 7.66V21h-5v-4.87c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.27-1.87 2.58V21h-5V9.5Z" />
    </svg>
  )
}

/**
 * CV interactif servi sur /portfolio (FR) et /en/portfolio (EN).
 *
 * Public : recruteurs. Aucun appel a l'action commercial ici, pas d'audit
 * gratuit, pas de devis. Les seuls boutons sont mail, LinkedIn, telephone et
 * le PDF du CV. Si une section vend 123digital au lieu de presenter le
 * candidat, elle n'a rien a faire sur cette page.
 */
export function CvPage({ locale }: { locale: CvLocale }) {
  const c = cvContent[locale]
  const { identity } = c

  const SECTION = 'clamp(2.5rem, 6vw, 4rem) 1.5rem'

  return (
    <>
      {/* Barre du CV : pas de menu commercial, seulement les ancres, la langue
          et le PDF. */}
      <header
        className="sticky top-0 z-40"
        style={{ backgroundColor: 'var(--surface-alpha)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-4" style={{ padding: '0.7rem 1.5rem' }}>
          <span className="font-sans font-extrabold truncate" style={{ fontSize: '0.95rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            {identity.name}
          </span>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href={identity.cvFile}
              download
              className="hidden sm:inline-flex items-center gap-1.5"
              style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-2)' }}
            >
              <Download size={14} aria-hidden /> PDF
            </a>
            <Link
              href={c.nav.switchHref}
              className="rounded-full"
              style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--ink-2)', border: '1px solid var(--line-strong)', padding: '0.25rem 0.6rem' }}
            >
              {c.nav.switchLabel}
            </Link>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-1.5 rounded-full font-bold"
              style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.45rem 0.95rem', fontSize: '0.8rem' }}
            >
              <Mail size={14} aria-hidden /> {c.contact.emailCta}
            </a>
          </div>
        </div>
      </header>

      {/* Identite */}
      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.25rem) 1.5rem clamp(2rem, 5vw, 3rem)' }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-center">
            <div
              className="relative overflow-hidden rounded-2xl shrink-0 self-start"
              style={{ width: 116, height: 116, border: '1px solid var(--line)', boxShadow: '0 8px 30px var(--shadow-soft)' }}
            >
              <Image
                src="/portraitmaurice.png"
                alt={identity.portraitAlt}
                fill
                sizes="116px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-strong)',
                    backgroundColor: 'var(--brand-tint)',
                    border: '1px solid var(--brand-line)',
                    padding: '0.3rem 0.7rem',
                  }}
                >
                  <span className="rounded-full" style={{ width: 6, height: 6, backgroundColor: 'var(--brand)' }} aria-hidden />
                  {identity.availability}
                </span>
                <span
                  style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-3)' }}
                >
                  {c.intro.kicker}
                </span>
              </div>

              <h1
                className="font-sans font-extrabold"
                style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', color: 'var(--ink)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
              >
                {identity.name}
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--ink-2)', fontWeight: 600, margin: '0.45rem 0 0.9rem' }}>{identity.role}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-2" style={{ fontSize: '0.84rem', color: 'var(--ink-2)' }}>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden style={{ color: 'var(--ink-3)' }} />
                  {identity.location}
                </span>
                <a href={`mailto:${identity.email}`} className="inline-flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                  <Mail size={14} aria-hidden style={{ color: 'var(--ink-3)' }} />
                  {identity.email}
                </a>
                <a href={identity.phoneHref} className="inline-flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                  <Phone size={14} aria-hidden style={{ color: 'var(--ink-3)' }} />
                  {identity.phone}
                </a>
              </div>
            </div>
          </div>

          <p className="max-w-3xl" style={{ color: 'var(--ink-2)', lineHeight: 1.7, margin: '1.75rem 0 1.25rem' }}>
            {c.intro.body}
          </p>

          {/* Personnalite : le premier trait est le style AssessFirst, il porte
              plus que les suivants et se distingue visuellement. */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5" style={{ marginBottom: '1.5rem' }}>
            <span
              style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)' }}
            >
              {c.intro.traitsLabel}
            </span>
            {c.intro.traits.map((trait, i) => (
              <span
                key={trait}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: i === 0 ? 700 : 600,
                  color: i === 0 ? 'var(--brand-strong)' : 'var(--ink-2)',
                  backgroundColor: i === 0 ? 'var(--brand-tint)' : 'var(--surface-3)',
                  borderRadius: 999,
                  padding: '0.25rem 0.7rem',
                }}
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.8rem 1.4rem', fontSize: '0.9rem' }}
            >
              <Mail size={16} aria-hidden /> {c.contact.emailCta}
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full font-bold hover:bg-[var(--surface-3)] transition-colors"
              style={{ border: '2px solid var(--line-strong)', color: 'var(--ink)', padding: '0.75rem 1.3rem', fontSize: '0.9rem' }}
            >
              <LinkedinGlyph /> {c.contact.linkedinCta}
            </a>
            <a
              href={identity.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-full font-bold hover:bg-[var(--surface-3)] transition-colors"
              style={{ border: '2px solid var(--line-strong)', color: 'var(--ink)', padding: '0.75rem 1.3rem', fontSize: '0.9rem' }}
            >
              <Download size={16} aria-hidden /> {c.contact.pdfCta}
            </a>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="bg-background" style={{ padding: '0 1.5rem clamp(2rem, 5vw, 3rem)' }}>
        <div
          className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)' }}
        >
          {c.stats.map((stat) => (
            <div key={stat.value + stat.label} style={{ padding: '1.25rem 1.1rem', borderTop: '1px solid var(--line)' }}>
              <p
                className="font-sans font-extrabold"
                style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2rem)', color: 'var(--brand-strong)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: '0.76rem', color: 'var(--ink-2)', lineHeight: 1.45, marginTop: '0.3rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Realisations */}
      <section id="realisations" className="bg-background" style={{ padding: SECTION, borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="font-sans font-extrabold"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)', color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
          >
            {c.work.heading}
          </h2>
          <p style={{ color: 'var(--ink-2)', maxWidth: '58ch', margin: '0.6rem 0 1.6rem' }}>{c.work.sub}</p>
          <CvWork work={c.work} />
        </div>
      </section>

      {/* Parcours */}
      <section id="parcours" className="bg-background" style={{ padding: SECTION, borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="font-sans font-extrabold mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)', color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
          >
            {c.experience.heading}
          </h2>

          <ol className="flex flex-col" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {c.experience.items.map((item, i) => (
              <li
                key={item.role + item.org}
                className="grid grid-cols-1 md:grid-cols-[13rem_1fr] gap-2 md:gap-8"
                style={{
                  paddingTop: i === 0 ? 0 : '1.6rem',
                  paddingBottom: i === c.experience.items.length - 1 ? 0 : '1.6rem',
                  borderBottom: i === c.experience.items.length - 1 ? 'none' : '1px solid var(--line)',
                }}
              >
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand-strong)', letterSpacing: '0.01em' }}>{item.period}</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', marginTop: '0.2rem' }}>{item.org}</p>
                  {item.note ? (
                    <p style={{ fontSize: '0.74rem', color: 'var(--ink-3)', lineHeight: 1.45, marginTop: '0.15rem' }}>{item.note}</p>
                  ) : null}
                </div>

                <div>
                  <h3 className="font-sans font-extrabold" style={{ fontSize: '1.1rem', color: 'var(--ink)', lineHeight: 1.25, marginBottom: item.context ? '0.35rem' : '0.55rem' }}>
                    {item.role}
                  </h3>
                  {item.context ? (
                    <p style={{ fontSize: '0.83rem', color: 'var(--ink-3)', lineHeight: 1.55, fontStyle: 'italic', marginBottom: '0.6rem' }}>
                      {item.context}
                    </p>
                  ) : null}
                  <ul className="flex flex-col gap-1.5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5" style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                        <span
                          className="rounded-full shrink-0"
                          style={{ width: 6, height: 6, marginTop: '0.5rem', backgroundColor: 'var(--brand)' }}
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Competences, outils, formation, langues */}
      <section id="competences" className="bg-background" style={{ padding: SECTION, borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h2
              className="font-sans font-extrabold mb-5"
              style={{ fontSize: 'clamp(1.35rem, 2.8vw, 1.75rem)', color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
            >
              {c.skills.heading}
            </h2>

            <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', marginBottom: '0.55rem' }}>
              {c.skills.skillsLabel}
            </p>
            <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '1.4rem' }}>
              {c.skills.items.map((skill) => (
                <span
                  key={skill}
                  style={{ backgroundColor: 'var(--brand-tint)', color: 'var(--brand-strong)', borderRadius: 999, padding: '0.3rem 0.75rem', fontSize: '0.78rem', fontWeight: 700 }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', marginBottom: '0.55rem' }}>
              {c.skills.toolsLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {c.skills.tools.map((tool) => (
                <span
                  key={tool}
                  style={{ backgroundColor: 'var(--surface-3)', color: 'var(--ink-2)', borderRadius: 999, padding: '0.3rem 0.75rem', fontSize: '0.78rem', fontWeight: 600 }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="font-sans font-extrabold mb-5"
              style={{ fontSize: 'clamp(1.35rem, 2.8vw, 1.75rem)', color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
            >
              {c.education.heading}
            </h2>

            <ul className="flex flex-col" style={{ listStyle: 'none', padding: 0, margin: '0 0 1.6rem' }}>
              {c.education.items.map((item, i) => (
                <li
                  key={item.degree}
                  style={{
                    paddingTop: i === 0 ? 0 : '0.85rem',
                    paddingBottom: i === c.education.items.length - 1 ? 0 : '0.85rem',
                    borderBottom: i === c.education.items.length - 1 ? 'none' : '1px solid var(--line)',
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--ink)' }}>{item.degree}</p>
                    <p style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--brand-strong)' }}>{item.period}</p>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', marginTop: '0.1rem' }}>{item.school}</p>
                  {item.detail ? (
                    <p style={{ fontSize: '0.78rem', color: 'var(--ink-3)', lineHeight: 1.5, marginTop: '0.25rem' }}>{item.detail}</p>
                  ) : null}
                </li>
              ))}
            </ul>

            <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', marginBottom: '0.55rem' }}>
              {c.education.languagesLabel}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {c.education.languages.map((lang) => (
                <span key={lang.name} className="inline-flex items-baseline gap-1.5" style={{ fontSize: '0.85rem', color: 'var(--ink-2)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{lang.name}</span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--brand-strong)' }}>{lang.level}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact recruteur */}
      <section id="contact" style={{ backgroundColor: 'var(--brand)', padding: SECTION, textAlign: 'center' }}>
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-sans font-extrabold"
            style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', color: 'var(--on-brand)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
          >
            {c.contact.heading}
          </h2>
          <p style={{ color: 'oklch(0.985 0.003 150 / 88%)', lineHeight: 1.65, margin: '0.8rem auto 1.9rem', maxWidth: '46ch' }}>
            {c.contact.body}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ backgroundColor: 'var(--on-brand)', color: 'var(--brand-strong)', padding: '0.8rem 1.4rem', fontSize: '0.9rem' }}
            >
              <Mail size={16} aria-hidden /> {identity.email}
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ border: '2px solid oklch(0.985 0.003 150 / 55%)', color: 'var(--on-brand)', padding: '0.75rem 1.3rem', fontSize: '0.9rem' }}
            >
              <LinkedinGlyph /> {c.contact.linkedinCta}
            </a>
            <a
              href={identity.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ border: '2px solid oklch(0.985 0.003 150 / 55%)', color: 'var(--on-brand)', padding: '0.75rem 1.3rem', fontSize: '0.9rem' }}
            >
              <Download size={16} aria-hidden /> {c.contact.pdfCta}
            </a>
          </div>

          <p style={{ marginTop: '1.8rem' }}>
            <Link
              href={c.nav.backHref}
              className="inline-flex items-center gap-1.5"
              style={{ color: 'oklch(0.985 0.003 150 / 80%)', fontSize: '0.82rem', fontWeight: 700 }}
            >
              {c.nav.backToSite} <ArrowUpRight size={14} aria-hidden />
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
