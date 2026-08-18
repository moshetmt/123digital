'use client'

import Image from 'next/image'
import Link from 'next/link'

const SIG = {
  green:  'var(--brand)',
  orange: '#A8410C',
  violet: '#7B3E96',
} as const

function GlobalStyles() {
  return (
    <style>{`
      @keyframes f-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      .f-cursor { animation: f-blink 1s step-end infinite; color: var(--brand); }
      @keyframes fondateur-scanline {
        0%   { top: -2px; }
        100% { top: 100%; }
      }
      .f-scanline {
        position: absolute; left: 0; right: 0; height: 2px;
        background: linear-gradient(transparent, var(--surface-3), transparent);
        animation: fondateur-scanline 10s linear infinite;
        pointer-events: none; z-index: 1;
      }
      .f-cta-primary:hover { opacity: 0.88; }
      .f-cta-secondary:hover { background: var(--surface-3); }
      @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 var(--brand-line); } 50% { box-shadow: 0 0 0 12px var(--brand-line); } }
    `}</style>
  )
}

function PixelGrid({ scanLine = false }: { scanLine?: boolean }) {
  return (
    <>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: [
          'linear-gradient(var(--surface-3) 1px, transparent 1px)',
          'linear-gradient(90deg, var(--surface-3) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '32px 32px',
      }} />
      {scanLine && <div aria-hidden className="f-scanline" />}
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.25em', color: 'var(--ink-3)', marginBottom: '1.5rem' }}>
      {children}
    </div>
  )
}


function MockSite({ url, accentColor }: { url: string; accentColor: string }) {
  return (
    <div style={{ background: 'var(--surface-2)', border: `1px solid ${accentColor}18`, borderRadius: '6px 6px 0 0', overflow: 'hidden' }}>
      <div style={{
        background: 'var(--surface-3)',
        padding: '0.5rem 0.65rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        borderBottom: `1px solid ${accentColor}10`,
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c, opacity: 0.4 }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: 'var(--surface-2)', borderRadius: 3,
          padding: '2px 8px',
          fontFamily: 'var(--font-mono)', fontSize: '0.47rem',
          color: 'var(--ink-3)', letterSpacing: '0.04em',
        }}>
          {url}
        </div>
      </div>
      <div style={{ padding: '0.65rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div style={{ height: 9, width: '55%', background: `${accentColor}28`, borderRadius: 2 }} />
        <div style={{ height: 5, width: '88%', background: 'var(--surface-3)', borderRadius: 2 }} />
        <div style={{ height: 5, width: '72%', background: 'var(--surface-3)', borderRadius: 2 }} />
        <div style={{ height: 5, width: '80%', background: 'var(--surface-3)', borderRadius: 2 }} />
        <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.2rem' }}>
          <div style={{ height: 16, width: 44, background: `${accentColor}35`, borderRadius: 2 }} />
          <div style={{ height: 16, width: 32, background: 'var(--surface-3)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    client: 'Fondation France-Israël',
    category: 'SEO · AUDIT · PARIS',
    color: SIG.orange,
    problem: "Trafic en hausse (+48% en 2025, 25 275 vues) mais engagement en chute libre. Durée session passée de 4min30 à 2min42 (-40%). Zéro tracking conversion — les dons ne sont pas mesurés.",
    diagnostic: "525 532 impressions GSC, 7 682 clics. Position 4.83 sur 'faire un don pour Israël'. CTR en chute libre : 2.59% (2025) → 0.62% (2026). Le trafic existe — la conversion est un angle mort total.",
    actions: [
      'Audit technique complet (SEO, balises, vitesse de chargement)',
      "Refonte page /don : montants suggérés + impact visuel + urgence",
      'Installation tracking conversions (événements don, entonnoir complet)',
      'Stratégie contenu IA-first (Schema.org, FAQ structurée, sémantique)',
    ],
    results: [
      { metric: '525 532', label: 'impressions GSC documentées' },
      { metric: '13', label: 'points de blocage documentés' },
    ],
    chart: 'traffic' as const,
  },
  {
    client: 'Chabad on Campus',
    category: 'INSTAGRAM · TIKTOK · GROWTH',
    color: SIG.violet,
    problem: "Présence digitale inexistante. Aucun compte Instagram ou TikTok actif, zéro visibilité auprès des étudiants.",
    diagnostic: "Cible jeune (18–25 ans) quasi exclusivement sur Instagram et TikTok. Le format court vidéo était le levier non exploité.",
    actions: [
      "Création des comptes Instagram et TikTok from scratch",
      "Stratégie de contenu hebdomadaire : formats Reels, vidéos courtes, storytelling communautaire",
      "Ligne éditoriale adaptée à la cible étudiante",
      "Publication régulière et engagement communautaire",
    ],
    results: [
      { metric: '1 000', label: 'abonnés en 1 an' },
      { metric: '×2', label: 'plateformes actives' },
      { metric: '0 → 1K', label: 'Instagram + TikTok' },
      { metric: '12 mois', label: 'pour atteindre les résultats' },
    ],
    chart: 'conversion' as const,
  },
]

const PROJECTS = [
  {
    name: '123digital.fr',
    url: null as string | null,
    externalUrl: null as string | null,
    screenshot: null as string | null,
    stack: ['Next.js 16', 'Tailwind v4', 'Supabase', 'GPT-4'],
    objective: "Vitrine + blog SEO pour une agence digitale. Architecture pensée pour la performance organique et l'automatisation IA.",
    result: '+2.3K visites/mois organiques en 8 mois sans budget pub.',
    gradient: 'linear-gradient(135deg, var(--brand-line) 0%, var(--brand-line) 100%)' as string | null,
    accentColor: SIG.green,
  },
  {
    name: 'Rhône Déconstruction',
    url: 'rhone-deconstruction.fr' as string | null,
    externalUrl: 'https://rhone-deconstruction.fr' as string | null,
    screenshot: '/screen-rhone.png' as string | null,
    stack: ['WordPress', 'Elementor', 'GSC'],
    objective: "Site vitrine BTP/démolition Lyon. SEO local, pages géo-ciblées par commune, stratégie de contenu technique.",
    result: '+180% impressions GSC en 5 mois — visibilité locale secteur BTP.',
    gradient: null as string | null,
    accentColor: '#8A5A12',
  },
  {
    name: 'A+ Audition',
    url: 'aplusaudition.fr' as string | null,
    externalUrl: 'https://aplusaudition.fr' as string | null,
    screenshot: '/screen-aplus.png' as string | null,
    stack: ['WordPress', 'Elementor', 'Doctolib'],
    objective: "Audioprothèse Cannes. Référencement local + intégration Doctolib. Site pensé pour convertir les recherches locales.",
    result: "1ère position locale 'audioprothésiste Cannes' — 3 mois après lancement.",
    gradient: null as string | null,
    accentColor: '#1D4ED8',
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    label: 'DISCOVER',
    title: 'Diagnostic & Audit',
    desc: "Analyse du funnel existant, des données analytics, des positions SEO. On part du réel, pas des intuitions.",
  },
  {
    step: '02',
    label: 'BUILD',
    title: 'Stratégie & Exécution',
    desc: "Pages, contenus, automations, tracking. Je construis les outils ET la stratégie — sans dépendre d'une équipe tech externe.",
  },
  {
    step: '03',
    label: 'OPTIMIZE',
    title: 'Itération & Tests',
    desc: "A/B tests, analyse des cohortes, optimisation des taux de conversion. Mesurée, tracée, observable — à chaque décision.",
  },
  {
    step: '04',
    label: 'SCALE',
    title: 'Industrialisation',
    desc: "Playbooks, automations IA, délégation. Ce qui fonctionne à 1 client doit fonctionner à 50.",
  },
]

// ─── PAGE ────────────────────────────────────────────────────────────────────

export function FondateurPage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--surface-2)', color: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      <GlobalStyles />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-svh flex items-center overflow-hidden">
        <PixelGrid scanLine />
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
          background: 'linear-gradient(to top, var(--surface-2), transparent)',
          pointerEvents: 'none', zIndex: 2,
        }} />

        <div className="mx-auto w-full max-w-6xl px-6 md:px-10 py-20 relative" style={{ zIndex: 3 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Colonne gauche */}
            <div>
              <p className="font-mono mb-4" style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: `${SIG.green}55` }}>
                SYSTEM BOOT · 123DIGITAL.FR · LYON
              </p>

              <h1
                className="font-heading mb-4"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.8rem, 6vw, 6rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.06em',
                  lineHeight: 0.92,
                  margin: 0,
                  overflow: 'visible',
                }}
              >
                <span style={{ color: 'var(--brand)', display: 'block' }}>Founder-minded</span>
                <span style={{ color: 'var(--ink)', display: 'block' }}>Growth Operator<span className="f-cursor">_</span></span>
              </h1>

              <p className="font-sans mb-4" style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: '38ch' }}>
                {"Acquisition digitale × IA — de l'audit au déploiement, sans intermédiaire. Fondateur 123Digital, je cherche un CDI où exécuter à l'échelle."}
              </p>

              <p className="font-mono mb-6" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: SIG.green }}>
                {'> DISPONIBLE · LYON / REMOTE · OPEN_TO_CDI'}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 md:gap-8 mb-6">
                {[
                  { label: 'FONDATEUR DEPUIS', val: '3 ANS' },
                  { label: 'CLIENTS',          val: '12+' },
                  { label: 'CONV. MOYEN',      val: '×2.5' },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p className="font-mono mb-1" style={{ fontSize: '0.48rem', letterSpacing: '0.22em', color: 'var(--ink-3)' }}>
                      {label}
                    </p>
                    <p className="font-mono font-bold" style={{ fontSize: '1.15rem', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                      {val}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="#case-studies"
                  className="f-cta-secondary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.65rem 1.25rem',
                    border: '1px solid var(--brand-line)',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem', letterSpacing: '0.08em',
                    color: SIG.green,
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                >
                  Voir les case studies ↓
                </a>
                <a
                  href="mailto:contact@123digital.fr"
                  className="f-cta-primary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.65rem 1.25rem',
                    background: SIG.green,
                    borderRadius: 9999,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem', fontWeight: 700,
                    color: 'var(--on-brand)',
                    textDecoration: 'none',
                    transition: 'opacity 0.15s',
                  }}
                >
                  {"Discuter d'un poste →"}
                </a>
              </div>
            </div>

            {/* Colonne droite — portrait */}
            <div className="flex justify-center order-first md:order-none">
              <div className="relative w-[220px] md:w-auto">
                <div aria-hidden style={{
                  position: 'absolute', inset: -1,
                  border: `1px solid ${SIG.green}60`,
                  borderRadius: 8,
                  pointerEvents: 'none',
                }} />
                <Image
                  src="/portraitmaurice.png"
                  alt="Maurice Timsit"
                  width={440}
                  height={540}
                  style={{ display: 'block', borderRadius: 6, width: '100%', height: 'auto' }}
                  priority
                />
                <div style={{
                  position: 'absolute', bottom: 16, left: 16,
                  background: 'oklch(0.989 0.005 96 / 0.90)',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  padding: '0.6rem 0.9rem',
                  backdropFilter: 'blur(12px)',
                }}>
                  <p className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'var(--ink-3)', marginBottom: '0.15rem' }}>
                    STATUT
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: SIG.green, flexShrink: 0 }} />
                    <span className="font-mono" style={{ fontSize: '0.62rem', color: SIG.green, letterSpacing: '0.08em' }}>
                      OPEN TO CDI
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOW
      ══════════════════════════════════════════ */}
      <section className="pt-8 pb-14 md:pt-10 md:pb-20 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// NOW.status</SectionLabel>
          <div style={{
            background: `linear-gradient(135deg, var(--brand-tint) 0%, var(--brand-tint) 100%)`,
            border: `1px solid ${SIG.green}25`,
            borderRadius: 16,
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
            animation: 'pulse 3s ease-in-out infinite',
          }} className="md:grid-cols-[auto_1fr]">
            {/* Indicateur */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingTop: '0.15rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: SIG.green, flexShrink: 0, marginTop: 4, boxShadow: `0 0 8px ${SIG.green}60` }} />
              <div>
                <p className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: `${SIG.green}80`, marginBottom: '0.2rem' }}>
                  CURRENTLY BUILDING
                </p>
                <p className="font-heading font-medium" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  En recherche active —<br />
                  <span style={{ color: SIG.green }}>Marketing Digital · CDI</span>
                </p>
              </div>
            </div>

            {/* Détails */}
            <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                {"Disponible pour un poste "}
                <strong style={{ color: 'var(--ink)' }}>Chargé de Marketing Digital</strong>
                {" ou "}
                <strong style={{ color: 'var(--ink)' }}>Traffic Manager</strong>
                {" — Lyon, Paris ou full remote. Je cherche une équipe ambitieuse où l'exécution compte autant que la stratégie."}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {['Lyon · Paris · Remote OK', 'CDI uniquement', 'Disponible immédiatement'].map((tag) => (
                  <span key={tag} className="font-mono" style={{
                    fontSize: '0.55rem', letterSpacing: '0.1em',
                    padding: '3px 10px',
                    border: `1px solid ${SIG.green}30`,
                    borderRadius: 3,
                    color: `${SIG.green}CC`,
                    backgroundColor: `${SIG.green}08`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section style={{
        background: 'var(--brand-tint)',
        borderTop: '1px solid var(--brand-line)',
        borderBottom: '1px solid var(--brand-line)',
        padding: '2.5rem 1.5rem',
      }}>
        <div className="mx-auto max-w-5xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem 1rem' }} className="md:grid-cols-4">
            {[
              { val: '+340%', label: 'trafic organique',      sub: 'meilleur résultat client' },
              { val: '×2.5',  label: 'taux de conversion',    sub: 'moyenne clients' },
              { val: '12+',   label: 'sites déployés',        sub: 'depuis 2022' },
              { val: '4',     label: 'secteurs accompagnés',  sub: 'ONG · local · BTP · santé' },
            ].map(({ val, label, sub }, i, arr) => (
              <div key={val} style={{ textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--line)' : 'none', paddingRight: i < arr.length - 1 ? '1rem' : 0 }}>
                <p className="font-heading" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.06em',
                  color: SIG.green,
                  lineHeight: 1,
                }}>
                  {val}
                </p>
                <p className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--ink)', marginTop: '0.35rem' }}>
                  {label}
                </p>
                <p className="font-mono" style={{ fontSize: '0.46rem', letterSpacing: '0.08em', color: 'var(--ink-3)', marginTop: '0.15rem' }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          POSITIONNEMENT
      ══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// POSITIONNEMENT</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="md:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="font-heading font-medium" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '0.5rem' }}>
                Pas une agence.<br />
                <span style={{ color: SIG.green }}>Un opérateur.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "J'ai fondé 123Digital à Lyon en 2022. Trois ans à acquérir des clients réels, livrer des projets, gérer la stratégie ET l'exécution — sans équipe, sans budget pub. Ce n'est pas de la théorie, c'est de l'expérience terrain compressée.",
                "Ce qui me distingue : je suis à l'intersection du marketing et de la tech. SEO, acquisition, analytics, mais aussi développement web (Next.js), automatisations IA (n8n, GPT-4) et tracking avancé. Là où la plupart des profils s'arrêtent à la recommandation, je code la solution.",
                "Aujourd'hui je cherche un CDI Growth ou Digital pour appliquer cet esprit à l'échelle. Pas de réunions sur les réunions — de l'exécution mesurée, itérative, tracée par les données.",
              ].map((para, i) => (
                <p key={i} className="font-sans text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════════ */}
      <section id="case-studies" className="py-14 md:py-20 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// CASE_STUDIES.results</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2">
            {CASE_STUDIES.map((cs, idx) => (
              <div
                key={cs.client}
                style={{
                  background: 'var(--surface-3)',
                  border: '1px solid var(--line)',
                  borderTop: idx === 0 ? '2px solid var(--brand)' : '2px solid var(--ink)',
                  borderRadius: 16,
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {/* Header */}
                <div>
                  <span className="font-mono" style={{
                    fontSize: '0.5rem', letterSpacing: '0.15em',
                    color: cs.color,
                    border: `1px solid ${cs.color}35`,
                    padding: '2px 8px', borderRadius: 3,
                    backgroundColor: `${cs.color}08`,
                    display: 'inline-block',
                    marginBottom: '0.6rem',
                  }}>
                    {cs.category}
                  </span>
                  <h3 className="font-heading font-medium" style={{ fontSize: '1.2rem', letterSpacing: '-0.03em' }}>
                    {cs.client}
                  </h3>
                </div>

                {/* Problem */}
                <div>
                  <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: 'var(--ink-3)', marginBottom: '0.3rem' }}>
                    <span style={{ color: cs.color }}>{"▸ "}</span>{"PROBLÈME"}
                  </p>
                  <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                    {cs.problem}
                  </p>
                </div>

                {/* Diagnostic */}
                <div>
                  <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: 'var(--ink-3)', marginBottom: '0.3rem' }}>
                    <span style={{ color: cs.color }}>{"▸ "}</span>{"DIAGNOSTIC"}
                  </p>
                  <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                    {cs.diagnostic}
                  </p>
                </div>

                {/* Actions */}
                <div>
                  <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: 'var(--ink-3)', marginBottom: '0.4rem' }}>
                    <span style={{ color: cs.color }}>{"▸ "}</span>{"ACTIONS"}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {cs.actions.map((action) => (
                      <div key={action} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span style={{ color: cs.color, flexShrink: 0, fontSize: '0.6rem', marginTop: '0.1rem' }}>→</span>
                        <span className="font-sans" style={{ fontSize: '0.78rem', color: 'var(--ink-2)', lineHeight: 1.45 }}>
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual proof */}
                {cs.chart === 'traffic' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
                    {[
                      { value: '525 532', label: 'impressions GSC' },
                      { value: '7 682', label: 'clics organiques' },
                      { value: '−40%', label: 'engagement 2026 vs 2024' },
                      { value: '13', label: 'points de blocage documentés' },
                    ].map((m, i) => (
                      <div key={i} style={{ padding: '12px 14px', background: 'var(--surface-3)', border: '1px solid var(--line)', borderRadius: 8 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--brand)', letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink)', letterSpacing: '0.08em', marginTop: 4, textTransform: 'uppercase' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                {cs.chart === 'conversion' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
                    {[
                      { value: '2.1% → 5.4%', label: 'taux de conversion' },
                      { value: '+157%', label: "amélioration CVR" },
                      { value: '+180%', label: 'demandes de contact' },
                      { value: '4 mois', label: "délai pour les résultats" },
                    ].map((m, i) => (
                      <div key={i} style={{ padding: '12px 14px', background: 'var(--surface-3)', border: '1px solid var(--line)', borderRadius: 8 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--brand)', letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink)', letterSpacing: '0.08em', marginTop: 4, textTransform: 'uppercase' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Results */}
                <div style={{ marginTop: 'auto' }}>
                  <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: 'var(--ink-3)', marginBottom: '0.75rem', paddingTop: '1rem', borderTop: `1px solid ${cs.color}20` }}>
                    <span style={{ color: cs.color }}>{"▸ "}</span>{"RÉSULTATS"}
                  </p>
                <div style={{
                  display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
                }}>
                  {cs.results.map((r) => (
                    <div key={r.metric}>
                      <p className="font-heading font-medium" style={{ fontSize: '1.5rem', letterSpacing: '-0.04em', color: cs.color, lineHeight: 1 }}>
                        {r.metric}
                      </p>
                      <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--ink-3)', marginTop: '0.2rem' }}>
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJETS
      ══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// PROJETS.build</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="md:grid-cols-2">
            {PROJECTS.map((proj) => (
              <div
                key={proj.name}
                style={{
                  background: 'var(--surface-3)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                {/* Preview area */}
                {proj.screenshot ? (
                  <Image src={proj.screenshot} alt={proj.name} width={600} height={340} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0', opacity: 0.85 }} />
                ) : proj.url ? (
                  <MockSite url={proj.url} accentColor={proj.accentColor} />
                ) : (
                  <div style={{
                    height: 100,
                    background: proj.gradient ?? undefined,
                    display: 'flex', alignItems: 'center', paddingLeft: '1.5rem',
                    borderBottom: '1px solid var(--line)',
                  }}>
                    <span className="font-heading font-medium" style={{ fontSize: '1.5rem', letterSpacing: '-0.05em', color: proj.accentColor, opacity: 0.25 }}>
                      {proj.name}
                    </span>
                  </div>
                )}

                <div style={{ padding: '1.5rem' }}>
                  <h3 className="font-heading font-medium" style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                    {proj.name}
                  </h3>

                  {/* Stack pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {proj.stack.map((s) => (
                      <span key={s} className="font-mono" style={{
                        fontSize: '0.55rem', letterSpacing: '0.1em',
                        padding: '2px 8px',
                        border: `1px solid ${proj.accentColor}30`,
                        borderRadius: 3,
                        color: proj.accentColor,
                        backgroundColor: `${proj.accentColor}08`,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="font-sans" style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {proj.objective}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: proj.accentColor, fontSize: '0.6rem' }}>→</span>
                    <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.06em', color: proj.accentColor }}>
                      {proj.result}
                    </span>
                  </div>

                  {proj.externalUrl && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--line)' }}>
                      <a
                        href={proj.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          letterSpacing: '2px',
                          color: 'var(--brand)',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-strong)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                      >
                        VISITER →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// PROCESS.flow</SectionLabel>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0',
            border: '1px solid var(--line)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.step}
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRight: i < PROCESS_STEPS.length - 1 ? '1px solid var(--line)' : 'none',
                  background: 'var(--surface-3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div aria-hidden style={{
                  position: 'absolute', bottom: '-10px', right: '10px',
                  fontSize: '80px', opacity: 0.04,
                  fontFamily: 'var(--font-heading)', color: 'var(--brand)',
                  lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                }}>
                  {step.step}
                </div>
                <p className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'var(--ink-3)', marginBottom: '0.75rem' }}>
                  {step.step}
                </p>
                <p className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: SIG.green, marginBottom: '0.5rem' }}>
                  {step.label}
                </p>
                <h4 className="font-heading font-medium" style={{ fontSize: '0.95rem', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
                  {step.title}
                </h4>
                <p className="font-sans" style={{ fontSize: '0.78rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STACK
      ══════════════════════════════════════════ */}
      <section className="py-10 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// STACK.tools</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['GA4','GSC','GTM','LOOKER STUDIO','HUBSPOT','WORDPRESS','CHATGPT','CLAUDE','NEXT.JS','TAILWIND','N8N','CAL.COM'].map((tool) => (
              <span key={tool} className="font-mono" style={{
                fontSize: '0.72rem', padding: '0.3rem 0.75rem',
                border: '1px solid var(--line-strong)',
                borderRadius: 4, color: 'var(--ink)',
                letterSpacing: '0.08em',
                background: 'var(--surface-3)',
              }}>
                [ {tool} ]
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-14 md:py-20 px-6 md:px-10"
        style={{ background: 'var(--brand-tint)', borderTop: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-5xl" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'start' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center', width: '100%' }}>
            <p className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: `${SIG.green}80`, marginBottom: '1rem' }}>
              // STATUS · OPEN
            </p>
            <h2 className="font-heading font-medium" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.06em', color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 0.95 }}>
              On discute ?
            </h2>
            <p className="font-sans" style={{ color: 'var(--ink-2)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Un poste, un projet, une idée — je réponds toujours.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="#case-studies"
                className="f-cta-secondary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.75rem 1.5rem',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem', letterSpacing: '0.06em',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
              >
                Voir les case studies ↑
              </a>
              <a
                href="mailto:contact@123digital.fr"
                className="f-cta-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.75rem 1.5rem',
                  background: SIG.green,
                  borderRadius: 9999,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem', fontWeight: 700,
                  color: 'var(--on-brand)',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s',
                }}
              >
                {"Discuter d'un poste →"}
              </a>
            </div>

            {/* Contact info */}
            <div style={{
              marginTop: '2.5rem',
              display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center',
              paddingTop: '2rem',
              borderTop: '1px solid var(--line)',
            }}>
              {[
                { label: 'EMAIL',    val: 'contact@123digital.fr',         href: 'mailto:contact@123digital.fr' },
                { label: 'LINKEDIN', val: 'linkedin.com/in/mauricetimsit', href: 'https://www.linkedin.com/in/mauricetimsit' },
                { label: 'LOCALITÉ', val: 'Lyon · Remote OK',              href: undefined },
              ].map(({ label, val, href }) => (
                <div key={label} style={{ textAlign: 'left' }}>
                  <p className="font-mono" style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: 'var(--ink-3)', marginBottom: '0.2rem' }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink)', textDecoration: 'none', letterSpacing: '0.02em' }}>
                      {val}
                    </a>
                  ) : (
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink)', letterSpacing: '0.02em' }}>{val}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
