'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { homeFaqs } from '@/data/faq'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

function WordPullUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const words = text.split(' ')
  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.18em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.85, ease: PULL_EASE, delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="bg-black"
      style={{ padding: '7rem 1.5rem' }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: heading */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col justify-start"
          >
            {/* Eyebrow with green dot */}
            <div
              className="flex items-center gap-2 mb-6"
              style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: '#00FF87' }}
                aria-hidden
              />
              Questions fréquentes
            </div>

            {/* Heading */}
            <h2
              id="faq-heading"
              className="font-display font-normal mb-6"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', color: '#E1E0CC', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              <WordPullUp text="Vous avez des questions ? J'ai les réponses." delay={0.05} />
            </h2>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: 'rgba(225,224,204,0.45)' }}
            >
              Vous ne trouvez pas ce que vous cherchez ? Contactez-moi directement ou
              réservez un audit gratuit — on répond à tout en 30 minutes.
            </p>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <Accordion className="flex flex-col gap-2">
              {homeFaqs.map((faq, i) => (
                <motion.div key={i} variants={itemVariant}>
                  <AccordionItem
                    value={`item-${i}`}
                    className="rounded-xl px-5 transition-colors"
                    style={{
                      backgroundColor: '#141414',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <AccordionTrigger
                      className="text-sm font-medium hover:no-underline py-4 text-left"
                      style={{ color: '#E1E0CC' }}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className="text-sm leading-relaxed pb-4"
                      style={{ color: 'rgba(225,224,204,0.5)' }}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
