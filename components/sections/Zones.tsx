import { VillesMap } from './VillesMap'

export function Zones() {
  return (
    <section
      id="zones"
      className="bg-background"
      style={{ padding: '7rem 1.5rem', borderTop: '1px solid var(--line)' }}
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
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
              Zones d&apos;intervention
            </div>

            <h2
              className="font-display font-normal mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                color: 'var(--ink)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              Ancré en ARA,<br />
              <em
                style={{
                  color: 'var(--brand)',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-instrument-serif)',
                }}
              >
                disponible partout.
              </em>
            </h2>

            <p
              style={{
                color: 'var(--ink-2)',
                lineHeight: 1.75,
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
              }}
            >
              Je suis basé à Lyon et j&apos;accompagne prioritairement les PME d&apos;Auvergne-Rhône-Alpes. 100% en distanciel, j&apos;interviens également sur toute la France.
            </p>

            <div className="space-y-3">
              {[
                { label: 'Lyon & Métropole', desc: 'Présence prioritaire — délais réduits' },
                { label: 'Région ARA', desc: '14 villes couvertes' },
                { label: 'Toute la France', desc: 'En distanciel' },
              ].map((z) => (
                <div
                  key={z.label}
                  className="flex items-center gap-3"
                >
                  <span style={{ color: 'var(--brand)', fontSize: '0.8rem' }}>→</span>
                  <div>
                    <span style={{ fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 600 }}>{z.label}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', marginLeft: '0.5rem' }}>— {z.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carte droite */}
          <div>
            <VillesMap />
          </div>
        </div>
      </div>
    </section>
  )
}
