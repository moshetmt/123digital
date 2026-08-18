'use client'

import Image from 'next/image'

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
    client: 'France-Israel Foundation',
    category: 'SEO · AUDIT · PARIS',
    color: SIG.orange,
    problem: "Traffic growing (+48% in 2025, 25,275 views) but engagement in free fall. Session duration dropped from 4m30s to 2m42s (−40%). Zero conversion tracking — donations are not measured.",
    diagnostic: "525,532 GSC impressions, 7,682 clicks. Ranking #4.83 for 'donate for Israel'. CTR collapsing: 2.59% (2025) → 0.62% (2026). Traffic exists — conversion is a total blind spot.",
    actions: [
      'Full technical audit (SEO, meta tags, page speed)',
      'Redesign of /donate page: suggested amounts + visual impact + urgency',
      'Conversion tracking setup (donation events, full funnel)',
      'AI-first content strategy (Schema.org, structured FAQ, semantics)',
    ],
    results: [
      { metric: '525,532', label: 'documented GSC impressions' },
      { metric: '13', label: 'documented blockers' },
    ],
    chart: 'traffic' as const,
  },
  {
    client: 'Chabad on Campus',
    category: 'INSTAGRAM · TIKTOK · GROWTH',
    problem: "Zero digital presence. No active Instagram or TikTok account, zero visibility among students.",
    diagnostic: "Young audience (18–25) almost exclusively on Instagram and TikTok. Short-form video was the untapped lever.",
    actions: [
      'Created Instagram and TikTok accounts from scratch',
      'Weekly content strategy: Reels, short videos, community storytelling',
      'Editorial voice tailored to the student audience',
      'Consistent publishing and community engagement',
    ],
    results: [
      { metric: '1,000', label: 'followers in 1 year' },
      { metric: '×2', label: 'active platforms' },
      { metric: '0 → 1K', label: 'Instagram + TikTok' },
      { metric: '12 months', label: 'to reach results' },
    ],
    chart: 'conversion' as const,
    color: SIG.violet,
  },
]

const PROJECTS = [
  {
    name: '123digital.fr',
    url: null as string | null,
    externalUrl: null as string | null,
    screenshot: null as string | null,
    stack: ['Next.js 16', 'Tailwind v4', 'Supabase', 'GPT-4'],
    objective: "Agency showcase + SEO blog. Architecture built for organic performance and AI automation.",
    result: '+2.3K organic visits/month in 8 months with zero ad spend.',
    gradient: 'linear-gradient(135deg, var(--brand-line) 0%, var(--brand-line) 100%)' as string | null,
    accentColor: SIG.green,
  },
  {
    name: 'Rhône Déconstruction',
    url: 'rhone-deconstruction.fr' as string | null,
    externalUrl: 'https://rhone-deconstruction.fr' as string | null,
    screenshot: '/screen-rhone.png' as string | null,
    stack: ['WordPress', 'Elementor', 'GSC'],
    objective: "Construction/demolition showcase site in Lyon. Local SEO, geo-targeted pages by city, technical content strategy.",
    result: '+180% GSC impressions in 5 months — strong local visibility in the construction sector.',
    gradient: null as string | null,
    accentColor: '#8A5A12',
  },
  {
    name: 'A+ Audition',
    url: 'aplusaudition.fr' as string | null,
    externalUrl: 'https://aplusaudition.fr' as string | null,
    screenshot: '/screen-aplus.png' as string | null,
    stack: ['WordPress', 'Elementor', 'Doctolib'],
    objective: "Hearing clinic in Cannes. Local SEO + Doctolib integration. Site built to convert local searches.",
    result: "#1 local position for 'audioprothésiste Cannes' — 3 months after launch.",
    gradient: null as string | null,
    accentColor: '#1D4ED8',
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    label: 'DISCOVER',
    title: 'Diagnostic & Audit',
    desc: "Analyzing the existing funnel, analytics data, SEO positions. Starting from reality, not assumptions.",
  },
  {
    step: '02',
    label: 'BUILD',
    title: 'Strategy & Execution',
    desc: "Pages, content, automations, tracking. I build both the tools AND the strategy — no external tech team required.",
  },
  {
    step: '03',
    label: 'OPTIMIZE',
    title: 'Iteration & Testing',
    desc: "A/B tests, cohort analysis, conversion rate optimization. Measured, tracked, observable — at every decision.",
  },
  {
    step: '04',
    label: 'SCALE',
    title: 'Industrialization',
    desc: "Playbooks, AI automations, delegation. What works for 1 client must work for 50.",
  },
]

// ─── PAGE ────────────────────────────────────────────────────────────────────

export function FounderPage() {
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

            {/* Left column */}
            <div>
              <p className="font-mono mb-4" style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: `${SIG.green}55` }}>
                SYSTEM BOOT · 123DIGITAL.FR · LYON
              </p>

              <h1
                className="font-heading mb-4"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.8rem, 6vw, 6rem)',
                  fontWeight: 800,
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
                Digital Acquisition × AI — from audit to deployment, no intermediary. Founder of 123Digital, looking for a full-time role to execute at scale.
              </p>

              <p className="font-mono mb-6" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: SIG.green }}>
                {'> AVAILABLE · LYON / REMOTE · OPEN_TO_RELOCATION'}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 md:gap-8 mb-6">
                {[
                  { label: 'FOUNDER SINCE', val: '3 YRS' },
                  { label: 'CLIENTS',       val: '12+' },
                  { label: 'AVG. CONV.',    val: '×2.5' },
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
                  View case studies ↓
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
                  Discuss a position →
                </a>
              </div>
            </div>

            {/* Right column — portrait */}
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
                    STATUS
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: SIG.green, flexShrink: 0 }} />
                    <span className="font-mono" style={{ fontSize: '0.62rem', color: SIG.green, letterSpacing: '0.08em' }}>
                      OPEN TO RELOCATION
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
            {/* Indicator */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingTop: '0.15rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: SIG.green, flexShrink: 0, marginTop: 4, boxShadow: `0 0 8px ${SIG.green}60` }} />
              <div>
                <p className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: `${SIG.green}80`, marginBottom: '0.2rem' }}>
                  CURRENTLY BUILDING
                </p>
                <p className="font-heading font-extrabold" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  Actively seeking —<br />
                  <span style={{ color: SIG.green }}>Digital Marketing · Full-time</span>
                </p>
              </div>
            </div>

            {/* Details */}
            <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                {"Available for a "}
                <strong style={{ color: 'var(--ink)' }}>Digital Marketing Coordinator</strong>
                {" or "}
                <strong style={{ color: 'var(--ink)' }}>Traffic Manager</strong>
                {" role — Lyon, Paris, full remote or relocation to Israel. Looking for an ambitious team where execution matters as much as strategy."}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {['Lyon · Paris · Remote OK', 'Full-time only', 'Open to relocation to Israel'].map((tag) => (
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
              { val: '+340%', label: 'organic traffic',      sub: 'best client result' },
              { val: '×2.5',  label: 'conversion rate',      sub: 'client average' },
              { val: '12+',   label: 'sites deployed',        sub: 'since 2022' },
              { val: '4',     label: 'sectors served',        sub: 'NGO · local · construction · health' },
            ].map(({ val, label, sub }, i, arr) => (
              <div key={val} style={{ textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--line)' : 'none', paddingRight: i < arr.length - 1 ? '1rem' : 0 }}>
                <p className="font-heading" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  fontWeight: 800,
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
          POSITIONING
      ══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// POSITIONING</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="md:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="font-heading font-extrabold" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '0.5rem' }}>
                Not an agency.<br />
                <span style={{ color: SIG.green }}>An operator.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "I founded 123Digital in Lyon in 2022. Three years acquiring real clients, delivering projects, managing both strategy AND execution — no team, no ad budget. This isn't theory, it's compressed field experience.",
                "What sets me apart: I sit at the intersection of marketing and tech. SEO, acquisition, analytics, but also web development (Next.js), AI automations (n8n, GPT-4), and advanced tracking. Where most profiles stop at the recommendation, I build the solution.",
                "I'm now looking for a full-time Growth or Digital role to apply this mindset at scale. No meetings about meetings — measured, iterative, data-driven execution.",
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
                  <h3 className="font-heading font-extrabold" style={{ fontSize: '1.2rem', letterSpacing: '-0.03em' }}>
                    {cs.client}
                  </h3>
                </div>

                {/* Problem */}
                <div>
                  <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: 'var(--ink-3)', marginBottom: '0.3rem' }}>
                    <span style={{ color: cs.color }}>{"▸ "}</span>{"PROBLEM"}
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
                      { value: '525,532', label: 'GSC impressions' },
                      { value: '7,682', label: 'organic clicks' },
                      { value: '−40%', label: 'engagement 2026 vs 2024' },
                      { value: '13', label: 'documented blockers' },
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
                      { value: '2.1% → 5.4%', label: 'engagement rate' },
                      { value: '+157%', label: 'CVR improvement' },
                      { value: '+180%', label: 'contact requests' },
                      { value: '4 months', label: 'time to results' },
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
                    <span style={{ color: cs.color }}>{"▸ "}</span>{"RESULTS"}
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {cs.results.map((r) => (
                      <div key={r.metric}>
                        <p className="font-heading font-extrabold" style={{ fontSize: '1.5rem', letterSpacing: '-0.04em', color: cs.color, lineHeight: 1 }}>
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
          PROJECTS
      ══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-6 md:px-10" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto max-w-5xl">
          <SectionLabel>// PROJECTS.build</SectionLabel>
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
                    <span className="font-heading font-extrabold" style={{ fontSize: '1.5rem', letterSpacing: '-0.05em', color: proj.accentColor, opacity: 0.25 }}>
                      {proj.name}
                    </span>
                  </div>
                )}

                <div style={{ padding: '1.5rem' }}>
                  <h3 className="font-heading font-extrabold" style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
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
                        VISIT →
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
                <h4 className="font-heading font-extrabold" style={{ fontSize: '0.95rem', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
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
            <h2 className="font-heading font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.06em', color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 0.95 }}>
              Let&apos;s talk?
            </h2>
            <p className="font-sans" style={{ color: 'var(--ink-2)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              A position, a project, an idea — I always reply.
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
                View case studies ↑
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
                Discuss a position →
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
                { label: 'LOCATION', val: 'Lyon · Remote · Open to Israel', href: undefined },
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
