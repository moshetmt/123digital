import { Plus } from 'lucide-react'
import type { CvContent } from '@/data/cv'

const C = { titre: '#F2F7F4', texte: '#C9D6CE', discret: '#8FA497', accent: '#6FB791', filet: 'rgba(205, 230, 216, 0.14)', carte: '#1A211C' }

/**
 * Parcours de /portfolio en frise repliable (choix de Moshe du 27/10) : un
 * point par poste sur une ligne verticale, chaque poste est une carte fermee
 * (titre, entreprise, dates) qui se deplie au toucher. <details> natif : pas
 * de JavaScript, et le contenu reste lisible par Google.
 */
export function CvParcours({ c, sep }: { c: CvContent; sep: string }) {
  return (
    <>
      <ol className="relative flex flex-col" style={{ listStyle: 'none', padding: '0 0 0 1.4rem', margin: 0, gap: '0.7rem' }}>
        <span aria-hidden className="absolute" style={{ left: '0.35rem', top: '1.4rem', bottom: '1.4rem', width: '2px', backgroundColor: C.filet }} />
        {c.experience.items.map((item, i) => (
          <li key={item.role + item.org} className="relative">
            <span
              aria-hidden
              className="absolute rounded-full"
              style={{ left: '-1.4rem', top: '1.2rem', width: '0.85rem', height: '0.85rem', backgroundColor: i === 0 ? C.accent : '#131814', border: `2px solid ${i === 0 ? C.accent : 'rgba(205,230,216,0.4)'}` }}
            />
            <details className="group" style={{ backgroundColor: C.carte, borderRadius: '1.4rem', border: `1px solid ${C.filet}` }} open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden" style={{ padding: '1rem 1.1rem' }}>
                <span className="min-w-0">
                  <span className="block" style={{ fontSize: '0.98rem', fontWeight: 700, color: C.titre, lineHeight: 1.3 }}>{item.role}</span>
                  <span className="block" style={{ fontSize: '0.86rem', color: C.accent, fontWeight: 600, marginTop: '0.15rem' }}>{item.org}</span>
                  <span className="block" style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: C.discret, marginTop: '0.35rem' }}>{item.period}</span>
                </span>
                <span
                  className="flex shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-open:rotate-45"
                  style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(205,230,216,0.08)', color: C.titre }}
                >
                  <Plus size={16} aria-hidden />
                </span>
              </summary>
              <div style={{ padding: '0 1.1rem 1.1rem' }}>
                {item.context ? <p style={{ fontSize: '0.86rem', color: C.discret, lineHeight: 1.55, fontStyle: 'italic' }}>{item.context}</p> : null}
                <ul className="flex flex-col gap-1.5" style={{ listStyle: 'none', padding: 0, margin: item.context ? '0.55rem 0 0' : 0 }}>
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2" style={{ fontSize: '0.9rem', color: C.texte, lineHeight: 1.55 }}>
                      <span aria-hidden style={{ color: C.accent }}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        ))}
      </ol>

      <h3 style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.titre, marginTop: '2.25rem' }}>
        {c.education.heading}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-3" style={{ listStyle: 'none', padding: 0, margin: '0.8rem 0 0', gap: '0.6rem' }}>
        {c.education.items.map((item) => (
          <li key={item.degree} style={{ backgroundColor: C.carte, borderRadius: '1.2rem', border: `1px solid ${C.filet}`, padding: '0.9rem 1rem' }}>
            <p style={{ fontSize: '0.92rem', fontWeight: 700, color: C.titre, lineHeight: 1.3 }}>{item.degree}</p>
            <p style={{ fontSize: '0.82rem', color: C.accent, fontWeight: 600, marginTop: '0.15rem' }}>{item.school}</p>
            <p style={{ fontSize: '0.74rem', color: C.discret, marginTop: '0.3rem' }}>{item.period}</p>
            {item.detail ? <p style={{ fontSize: '0.8rem', color: C.texte, lineHeight: 1.45, marginTop: '0.4rem' }}>{item.detail}</p> : null}
          </li>
        ))}
      </ul>
      <p className="flex flex-wrap items-center gap-2" style={{ marginTop: '1rem' }}>
        <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.titre }}>
          {c.education.languagesLabel}{sep}
        </span>
        {c.education.languages.map((l) => (
          <span key={l.name} style={{ fontSize: '0.82rem', fontWeight: 600, color: C.titre, backgroundColor: 'rgba(205,230,216,0.08)', border: `1px solid ${C.filet}`, borderRadius: '9999px', padding: '0.3rem 0.75rem' }}>
            {l.name} <span style={{ color: C.accent }}>{l.level}</span>
          </span>
        ))}
      </p>
    </>
  )
}
