import { t, type Locale } from '@/lib/i18n'

interface Step { title: string; desc: string }

function getSteps(lang: 'fr' | 'en'): Step[] {
  if (lang === 'en') return [
    { title: 'Discovery call',       desc: '30 minutes, free. We talk about your business, your customers, what is holding you back.' },
    { title: 'Costed action plan',   desc: 'A clear quote: what, how much, when, and what it should bring in.' },
    { title: 'Implementation',       desc: 'I build, I launch, I steer. You keep running your business.' },
    { title: 'Results every month',  desc: 'A monthly update in plain language: what was done, what it brought in.' },
  ]
  return [
    { title: 'Appel découverte',        desc: '30 minutes, gratuit. On parle de votre métier, vos clients, ce qui bloque.' },
    { title: "Plan d'action chiffré",   desc: 'Un devis clair : quoi, combien, quand, et ce que ça doit rapporter.' },
    { title: 'Mise en œuvre',           desc: 'Je construis, je lance, je pilote. Vous continuez à faire tourner votre entreprise.' },
    { title: 'Résultats chaque mois',   desc: 'Un point mensuel en français courant : ce qui a été fait, ce que ça a rapporté.' },
  ]
}

function StepCard({ step, index, lang }: { step: Step; index: number; lang: 'fr' | 'en' }) {
  return (
    <div
      className="rounded"
      style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', padding: 'clamp(0.8rem, 3vw, 1.25rem)' }}
    >
      <p
        style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand)', marginBottom: '0.4rem' }}
      >
        {lang === 'en' ? `Step ${index + 1}` : `Étape ${index + 1}`}
      </p>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(0.88rem, 3.2vw, 1rem)', color: 'var(--ink)', marginBottom: '0.25rem', lineHeight: 1.2 }}>
        {step.title}
      </h3>
      <p style={{ fontSize: 'clamp(0.76rem, 2.6vw, 0.85rem)', color: 'var(--ink-2)', lineHeight: 1.4 }}>
        {step.desc}
      </p>
    </div>
  )
}

export function Process({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).process
  const steps = getSteps(lang)

  return (
    <section
      id="section-process"
      style={{ backgroundColor: 'var(--surface-3)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-5 sm:mb-10"
        >
          <div
            className="mb-3"
            style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-strong)', fontWeight: 800 }}
          >
            {d.label}
          </div>
          <h2
            id="process-heading"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
            }}
          >
            {d.heading}
          </h2>
        </div>

        {/* 2 colonnes des le telephone : en 1 colonne les 4 etapes prenaient un ecran entier. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
