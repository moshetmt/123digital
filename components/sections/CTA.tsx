'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const PULL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ── WordsPullUp ───────────────────────────────────────────────────────────────

function WordsPullUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <div ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '0.22em' }}>
          <motion.span
            style={{ display: 'inline-block', color: '#E1E0CC' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: PULL_EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

// ── Form types ────────────────────────────────────────────────────────────────

interface FormState {
  prenom: string
  nom: string
  email: string
  site: string
  besoin: string
  message: string
}

const BESOINS_FR = [
  { value: 'site',     label: 'Création de site' },
  { value: 'seo',      label: 'SEO' },
  { value: 'ads',      label: 'Publicité en ligne' },
  { value: 'branding', label: 'Branding' },
  { value: 'full',     label: 'Accompagnement complet' },
]

const BESOINS_EN = [
  { value: 'site',     label: 'Website creation' },
  { value: 'seo',      label: 'SEO' },
  { value: 'ads',      label: 'Online advertising' },
  { value: 'branding', label: 'Branding' },
  { value: 'full',     label: 'Full support' },
]

const inputBase: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#212121',
  border: '1px solid transparent',
  borderRadius: '0.85rem',
  padding: '0.8rem 1rem',
  color: '#E1E0CC',
  fontSize: '0.92rem',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s ease, background 0.2s ease',
}

function FormInput({
  type = 'text', value, onChange, placeholder, hasError,
}: {
  type?: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string; hasError?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{
        ...inputBase,
        borderColor: hasError ? 'rgba(255,90,90,0.6)' : focused ? 'rgba(0,255,135,0.5)' : 'transparent',
        backgroundColor: focused ? '#262626' : '#212121',
      }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    />
  )
}

function FormSelect({
  value, onChange, hasError, options, placeholder,
}: {
  value: string; onChange: React.ChangeEventHandler<HTMLSelectElement>
  hasError?: boolean; options: { value: string; label: string }[]; placeholder: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      value={value} onChange={onChange}
      style={{
        ...inputBase,
        borderColor: hasError ? 'rgba(255,90,90,0.6)' : focused ? 'rgba(0,255,135,0.5)' : 'transparent',
        backgroundColor: focused ? '#262626' : '#212121',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%23E1E0CC' stroke-width='1.5' stroke-linecap='round'/></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        paddingRight: '2.5rem',
      }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    >
      <option value="" style={{ background: '#212121' }}>{placeholder}</option>
      {options.map((b) => (
        <option key={b.value} value={b.value} style={{ background: '#212121' }}>{b.label}</option>
      ))}
    </select>
  )
}

function FormTextarea({
  value, onChange, placeholder,
}: {
  value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement>; placeholder: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      rows={4} value={value} onChange={onChange} placeholder={placeholder}
      style={{
        ...inputBase,
        borderColor: focused ? 'rgba(0,255,135,0.5)' : 'transparent',
        backgroundColor: focused ? '#262626' : '#212121',
        resize: 'vertical',
      }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    />
  )
}

// ── CTA Section ───────────────────────────────────────────────────────────────

export function CTA({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).cta
  const isEN = lang === 'en'

  const L = {
    eyebrow:        isEN ? 'Free audit'                          : 'Audit gratuit',
    firstName:      isEN ? 'First name'                          : 'Prénom',
    lastName:       isEN ? 'Last name'                           : 'Nom',
    emailLabel:     isEN ? 'Professional email'                  : 'Email professionnel',
    siteLabel:      isEN ? 'Current website'                     : 'Site web actuel',
    optional:       isEN ? '(optional)'                          : '(optionnel)',
    needLabel:      isEN ? 'What is your main need?'             : 'Quel est votre besoin principal ?',
    needPH:         isEN ? '— Choose —'                          : '— Choisir —',
    messageLabel:   isEN ? 'Describe your project in 2-3 lines'  : 'Décrivez votre projet en 2-3 lignes',
    sub1:           isEN ? 'Free audit'                          : 'Audit gratuit',
    sub2:           isEN ? 'No commitment'                       : 'Sans engagement',
    sub3:           isEN ? 'Reply within 24h'                    : 'Réponse sous 24h',
    sending:        isEN ? 'Sending…'                            : 'Envoi en cours…',
    successTitle:   isEN ? 'Request received.'                   : 'Demande reçue.',
    successBody:    (prenom: string) => isEN
      ? `Thank you${prenom ? ` ${prenom}` : ''}. I'll get back to you within 24h with an initial analysis of your project.`
      : `Merci ${prenom}. Je reviens vers vous sous 24h avec une première analyse de votre projet.`,
  }

  const besoins = isEN ? BESOINS_EN : BESOINS_FR
  const reassurance = [L.sub1, L.sub2, L.sub3]

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState<FormState>({ prenom: '', nom: '', email: '', site: '', besoin: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({})

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!form.prenom.trim()) errs.prenom = true
    if (!form.nom.trim()) errs.nom = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true
    if (!form.besoin) errs.besoin = true
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise((res) => setTimeout(res, 800))
    setSubmitted(true)
    setLoading(false)
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'rgba(225,224,204,0.55)',
    fontWeight: 700,
    display: 'block',
    marginBottom: '0.45rem',
  }

  return (
    <section id="contact" className="bg-black" style={{ padding: '7rem 1.5rem' }} aria-labelledby="contact-heading">
      <div ref={ref} className="mx-auto text-center" style={{ maxWidth: '640px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(225,224,204,0.7)', fontWeight: 700 }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#00FF87' }} aria-hidden />
          {L.eyebrow}
        </motion.div>

        {/* Heading */}
        <h2
          id="contact-heading" className="font-display font-normal mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
        >
          <WordsPullUp text={d.heading} delay={0.05} />
        </h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12" style={{ color: '#6b7280', fontSize: '1rem' }}
        >
          {L.sub1}
          <span style={{ color: 'rgba(0,255,135,0.7)', margin: '0 0.4rem' }}>·</span>
          {L.sub2}
          <span style={{ color: 'rgba(0,255,135,0.7)', margin: '0 0.4rem' }}>·</span>
          {L.sub3}
        </motion.p>

        {/* Form or success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left"
              style={{ backgroundColor: '#101010', borderRadius: '1.5rem', padding: '2rem' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>{L.firstName}</label>
                  <FormInput value={form.prenom} onChange={set('prenom')} placeholder={isEN ? 'John' : 'Maurice'} hasError={errors.prenom} />
                </div>
                <div>
                  <label style={labelStyle}>{L.lastName}</label>
                  <FormInput value={form.nom} onChange={set('nom')} placeholder={isEN ? 'Smith' : 'Timsit'} hasError={errors.nom} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>{L.emailLabel}</label>
                <FormInput type="email" value={form.email} onChange={set('email')} placeholder={isEN ? 'you@company.com' : 'vous@entreprise.fr'} hasError={errors.email} />
              </div>
              <div>
                <label style={labelStyle}>{L.siteLabel} <span style={{ opacity: 0.5 }}>{L.optional}</span></label>
                <FormInput value={form.site} onChange={set('site')} placeholder="https://" />
              </div>
              <div>
                <label style={labelStyle}>{L.needLabel}</label>
                <FormSelect
                  value={form.besoin}
                  onChange={set('besoin') as React.ChangeEventHandler<HTMLSelectElement>}
                  hasError={errors.besoin}
                  options={besoins}
                  placeholder={L.needPH}
                />
              </div>
              <div>
                <label style={labelStyle}>{L.messageLabel}</label>
                <FormTextarea value={form.message} onChange={set('message') as React.ChangeEventHandler<HTMLTextAreaElement>} placeholder={d.messagePlaceholder} />
              </div>
              <button
                type="submit" disabled={loading}
                className="group flex items-center justify-between w-full rounded-full font-medium text-sm transition-all duration-300 disabled:opacity-50"
                style={{ backgroundColor: '#DEDBC8', color: '#000', padding: '0.75rem 0.75rem 0.75rem 1.5rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.95rem' }}
              >
                <span>{loading ? L.sending : d.submit}</span>
                <span className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 shrink-0" style={{ width: 36, height: 36, backgroundColor: '#000', color: '#DEDBC8' }}>
                  <ArrowRight size={14} style={{ transform: 'rotate(-45deg)' }} aria-hidden />
                </span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
              style={{ backgroundColor: '#101010', borderRadius: '1.5rem', padding: '3rem 2rem' }}
            >
              <div className="flex items-center justify-center mb-5" style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(0,255,135,0.12)', color: '#00FF87' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-display font-bold mb-2" style={{ color: '#E1E0CC', fontSize: '1.4rem' }}>{L.successTitle}</h3>
              <p style={{ color: 'rgba(225,224,204,0.65)', fontSize: '0.9rem', lineHeight: 1.5 }}>{L.successBody(form.prenom)}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Reassurance pills */}
        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mt-6 flex-wrap"
        >
          {reassurance.map((label) => (
            <div key={label} className="inline-flex items-center gap-2" style={{ backgroundColor: '#212121', color: 'rgba(225,224,204,0.7)', fontSize: '0.72rem', padding: '0.45rem 0.85rem', borderRadius: '999px' }}>
              <span style={{ color: '#00FF87', fontSize: '0.75rem' }}>✓</span>
              {label}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
