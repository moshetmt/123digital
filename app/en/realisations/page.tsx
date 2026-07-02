import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE_URL } from '@/lib/schema'
import { projects } from '@/data/portfolio'
import { t } from '@/lib/i18n'

const d = t('en').realisations

export const metadata: Metadata = {
  title: d.title,
  description: d.description,
  alternates: {
    canonical: `${BASE_URL}/en/realisations`,
    languages: { 'fr': `${BASE_URL}/realisations`, 'en': `${BASE_URL}/en/realisations` },
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black" style={{ padding: '9rem 1.5rem 6rem' }}>
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
            {d.badge}
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            {d.heading1}<br />
            <em style={{ color: '#00FF87', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>{d.heading2}</em>
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'rgba(225,224,204,0.65)' }}>
            {d.intro}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black" style={{ padding: '3rem 1.5rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {d.stats.map(({ chiffre, label }) => (
              <div key={label} className="text-center">
                <div className="font-display font-normal mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#00FF87', lineHeight: 1 }}>{chiffre}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(225,224,204,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-black" style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(225,224,204,0.06)' }}>
            {projects.map((project) => (
              <div key={project.id} className="p-8" style={{ backgroundColor: '#080808' }}>
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00FF87', fontWeight: 700, marginBottom: '0.4rem' }}>
                      {project.category}
                    </div>
                    <h2 className="font-display font-normal" style={{ fontSize: '1.25rem', color: '#E1E0CC', lineHeight: 1.2 }}>{project.title}</h2>
                  </div>
                  <div style={{ padding: '0.25rem 0.7rem', border: '1px solid rgba(225,224,204,0.12)', color: 'rgba(225,224,204,0.45)', fontSize: '0.7rem', flexShrink: 0 }}>
                    {project.sector}
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'rgba(225,224,204,0.6)', lineHeight: 1.65, marginBottom: '1.2rem' }}>{project.description}</p>
                <div className="font-display font-normal" style={{ fontSize: '1rem', color: '#00FF87', marginBottom: '1rem' }}>✓ {project.results}</div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ padding: '0.2rem 0.6rem', backgroundColor: 'rgba(225,224,204,0.05)', border: '1px solid rgba(225,224,204,0.08)', color: 'rgba(225,224,204,0.4)', fontSize: '0.72rem' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}

            <Link href="/en/audit" className="group block p-8" style={{ backgroundColor: '#080808' }}>
              <div className="flex items-center justify-center h-full flex-col text-center gap-4" style={{ minHeight: '260px' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid rgba(0,255,135,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00FF87', fontSize: '1.5rem' }}>+</div>
                <div>
                  <div className="font-display font-normal mb-2 group-hover:text-[#00FF87] transition-colors" style={{ fontSize: '1.1rem', color: '#E1E0CC' }}>{d.yourProject}</div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(225,224,204,0.45)' }}>{d.auditCta}</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black" style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(225,224,204,0.06)', textAlign: 'center' }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display font-normal mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#E1E0CC', lineHeight: 1.1 }}>
            {d.ctaHeading}
          </h2>
          <p style={{ color: 'rgba(225,224,204,0.6)', marginBottom: '2.5rem', lineHeight: 1.7 }}>{d.ctaBody}</p>
          <Link href="/en/audit" style={{ display: 'inline-block', padding: '1rem 2.5rem', backgroundColor: '#00FF87', color: '#080808', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
            {d.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  )
}
