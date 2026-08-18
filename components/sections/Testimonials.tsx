'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface Testimonial {
  name: string
  company: string
  role: string
  content: string
  result: string
  initials: string
}

function getTestimonials(lang: 'fr' | 'en'): Testimonial[] {
  if (lang === 'en') return [
    {
      name: 'Sophie M.',
      company: 'Artisan Bakery',
      role: 'Owner',
      result: '+320% local visibility',
      initials: 'SM',
      content:
        "In 4 months my site finally shows up on Google when people search for a bakery in my neighbourhood. Traffic tripled and I get new customers coming in directly because of the website.",
    },
    {
      name: 'David K.',
      company: 'Accounting Firm',
      role: 'Chartered Accountant',
      result: '+68% qualified leads',
      initials: 'DK',
      content:
        "I had a brochure site nobody could find. After the SEO overhaul and Google Ads campaigns, I receive quote requests every week. The ROI is real and measurable.",
    },
    {
      name: 'Léa V.',
      company: 'Eco-fashion Boutique',
      role: 'Founder',
      result: 'ROAS 4.2x · Instagram ×3',
      initials: 'LV',
      content:
        "Maurice completely transformed our Instagram presence and launched our first Meta Ads. In two months our community tripled and we sell online regularly.",
    },
  ]
  return [
    {
      name: 'Sophie M.',
      company: 'Boulangerie Artisane',
      role: 'Gérante',
      result: '+320% de visibilité locale',
      initials: 'SM',
      content:
        "En 4 mois, mon site apparaît enfin sur Google quand les gens cherchent une boulangerie dans mon quartier. Le trafic a été multiplié par trois et j'ai de nouveaux clients qui viennent directement grâce au site.",
    },
    {
      name: 'David K.',
      company: 'Cabinet Comptable',
      role: 'Expert-comptable',
      result: '+68% de leads qualifiés',
      initials: 'DK',
      content:
        "J'avais un site vitrine que personne ne trouvait. Après la refonte SEO et les campagnes Google Ads, je reçois des demandes de devis chaque semaine. Le ROI est là, concret et mesurable.",
    },
    {
      name: 'Léa V.',
      company: 'Boutique Éco-mode',
      role: 'Fondatrice',
      result: 'ROAS 4,2x · Instagram ×3',
      initials: 'LV',
      content:
        "Maurice a complètement transformé notre présence sur Instagram et lancé nos premières Meta Ads. En deux mois, notre communauté a triplé et on vend en ligne régulièrement.",
    },
  ]
}

// Word pull-up
function WordPullUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')
  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.18em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: PULL_EASE, delay: delay + i * 0.06 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const cardVariant: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

export function Testimonials({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const testimonials = getTestimonials(lang)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 sm:py-28 bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-14 sm:mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: 'var(--ink-2)' }}
          >
            {lang === 'en' ? 'Client testimonials' : 'Témoignages clients'}
          </p>
          <h2
            id="testimonials-heading"
            className="font-display font-extrabold"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              color: 'var(--ink)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            <WordPullUp text="Ils ont fait confiance." delay={0.05} />
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          role="list"
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.name}
              variants={cardVariant}
              role="listitem"
              className="flex flex-col rounded-2xl p-6 sm:p-7"
              style={{
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--line)',
              }}
            >
              {/* Result badge */}
              <div
                className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                style={{
                  backgroundColor: 'var(--surface-3)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                }}
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--surface-3)' }}
                  aria-hidden
                />
                {t.result}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed flex-1 mb-7 italic"
                style={{
                  color: 'oklch(0.60 0 0)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid var(--line)' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-[11px] shrink-0"
                  style={{
                    backgroundColor: 'var(--surface-3)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink-2)',
                  }}
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--ink)' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'oklch(0.45 0 0)' }}
                  >
                    {t.role} — {t.company}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-7 text-xs italic"
          style={{ color: 'oklch(0.38 0 0)' }}
        >
          {lang === 'en' ? '* Testimonials collected with client consent. First names abbreviated for privacy.' : '* Témoignages collectés avec accord des clients. Prénoms abrégés pour la confidentialité.'}
        </motion.p>
      </div>
    </section>
  )
}
