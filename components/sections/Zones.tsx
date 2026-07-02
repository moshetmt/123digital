import { VillesMap } from './VillesMap'
import { t, type Locale } from '@/lib/i18n'

export function Zones({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).zones
  return (
    <section
      id="zones"
      className="bg-black"
      style={{ padding: '7rem 1.5rem', borderTop: '1px solid rgba(225,224,204,0.06)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Texte gauche */}
          <div>
            <div
              className="flex items-center gap-2 mb-5"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(225,224,204,0.7)',
                fontWeight: 700,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87' }} />
              {d.label}
            </div>

            <h2
              className="font-display font-normal mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                color: '#E1E0CC',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
  {lang === 'en' ? (
              <>
                Based in Lyon,<br />
                <em style={{ color: '#00FF87', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>available everywhere.</em>
              </>
            ) : (
              <>
                Ancré en ARA,<br />
                <em style={{ color: '#00FF87', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>disponible partout.</em>
              </>
            )}
            </h2>

            <p
              style={{
                color: 'rgba(225,224,204,0.6)',
                lineHeight: 1.75,
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
              }}
            >
              {lang === 'en' ? "Based in Lyon, I primarily work with SMEs across the Auvergne-Rhône-Alpes region. 100% remote-friendly, I also work with businesses anywhere in France." : "Je suis basé à Lyon et j'accompagne prioritairement les PME d'Auvergne-Rhône-Alpes. 100% en distanciel, j'interviens également sur toute la France."}
            </p>

            <div className="space-y-3">
              {[
                ...(lang === 'en' ? [
                  { label: 'Lyon & Metro', desc: 'Priority zone — fast turnaround' },
                  { label: 'ARA Region', desc: '14 cities covered' },
                  { label: 'All of France', desc: 'Fully remote' },
                ] : [
                  { label: 'Lyon & Métropole', desc: 'Présence prioritaire — délais réduits' },
                  { label: 'Région ARA', desc: '14 villes couvertes' },
                  { label: 'Toute la France', desc: 'En distanciel' },
                ])
              ].map((z) => (
                <div
                  key={z.label}
                  className="flex items-center gap-3"
                >
                  <span style={{ color: '#00FF87', fontSize: '0.8rem' }}>→</span>
                  <div>
                    <span style={{ fontSize: '0.88rem', color: '#E1E0CC', fontWeight: 600 }}>{z.label}</span>
                    <span style={{ fontSize: '0.82rem', color: 'rgba(225,224,204,0.45)', marginLeft: '0.5rem' }}>— {z.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carte droite */}
          <div>
            <VillesMap lang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}
