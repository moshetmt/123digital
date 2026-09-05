'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'
import { readLeadSource } from '@/lib/lead-source'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const PHONE_TEL = 'tel:+33652092301'
const PHONE_DISPLAY = '06 52 09 23 01'

// ── Form types ────────────────────────────────────────────────────────────────

interface FormState {
  prenom: string
  email: string
  tel: string
  besoin: string
}

const BESOINS_FR = [
  { value: 'visibilite', label: 'Être mieux placé sur Google' },
  { value: 'site',       label: 'Un site web (création ou refonte)' },
  { value: 'ads',        label: 'De la publicité en ligne' },
  { value: 'autre',      label: 'Autre / je ne sais pas encore' },
]

const BESOINS_EN = [
  { value: 'visibilite', label: 'Rank better on Google' },
  { value: 'site',       label: 'A website (new or redesign)' },
  { value: 'ads',        label: 'Online advertising' },
  { value: 'autre',      label: 'Other / not sure yet' },
]

const inputBase: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--line)',
  borderRadius: '0.7rem',
  padding: '0.75rem 0.9rem',
  color: 'var(--ink)',
  fontSize: '0.92rem',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s ease',
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
      style={{ ...inputBase, borderColor: hasError ? 'var(--destructive)' : focused ? 'var(--brand)' : 'var(--line)' }}
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
        borderColor: hasError ? 'var(--destructive)' : focused ? 'var(--brand)' : 'var(--line)',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%23666459' stroke-width='1.5' stroke-linecap='round'/></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.9rem center',
        paddingRight: '2.4rem',
      }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    >
      <option value="">{placeholder}</option>
      {options.map((b) => (
        <option key={b.value} value={b.value}>{b.label}</option>
      ))}
    </select>
  )
}

// ── CTA Section ───────────────────────────────────────────────────────────────

export function CTA({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).cta
  const isEN = lang === 'en'
  const besoins = isEN ? BESOINS_EN : BESOINS_FR

  const [form, setForm] = useState<FormState>({ prenom: '', email: '', tel: '', besoin: '' })
  const [hp, setHp] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({})

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!form.prenom.trim()) errs.prenom = true
    if (!form.besoin) errs.besoin = true

    // Email ou telephone, au moins un des deux : aucun rempli fait rougir les
    // deux champs de la ligne, un seul rempli n'est verifie que lui-meme.
    const emailFilled = form.email.trim().length > 0
    const telDigits = form.tel.replace(/\D/g, '')
    const telFilled = telDigits.length > 0
    if (!emailFilled && !telFilled) {
      errs.email = true
      errs.tel = true
    } else {
      if (emailFilled && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true
      if (telFilled && telDigits.length < 6) errs.tel = true
    }

    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSendError(false)
    setLoading(true)
    try {
      // Page de soumission + provenance memorisee au premier clic : les deux
      // colonnes qui rendent le Sheet exploitable pour piloter les campagnes.
      const { source, landing } = readLeadSource()
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          hp,
          page: window.location.pathname,
          landing,
          source,
          lang,
        }),
      })
      if (!res.ok) throw new Error('send_failed')
      window.gtag?.('event', 'generate_lead', { method: 'formulaire_audit' })
      setSubmitted(true)
    } catch {
      setSendError(true)
    } finally {
      setLoading(false)
    }
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--ink-2)',
    display: 'block',
    marginBottom: '0.35rem',
  }

  return (
    <section
      id="contact"
      style={{ backgroundColor: 'var(--brand)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-14 items-start">
        {/* ── Texte gauche ── */}
        <div>
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.7rem, 3.6vw, 2.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: 'var(--on-brand)',
              marginBottom: '0.6rem',
            }}
          >
            {d.heading}
          </h2>
          <p style={{ color: 'var(--on-brand)', fontSize: 'clamp(0.92rem, 3vw, 1rem)', lineHeight: 1.5, maxWidth: '46ch', marginBottom: '0.75rem' }}>
            {d.sub}
          </p>
          <p style={{ color: 'var(--on-brand)', fontSize: '0.92rem', fontWeight: 600 }}>
            {d.altPhone}{' '}
            <a href={PHONE_TEL} style={{ fontWeight: 800, textDecoration: 'underline' }}>
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>

        {/* ── Formulaire ── */}
        <div>
          <AnimatePresence mode="wait" initial={false}>
            {!submitted ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: EASE }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-2.5"
                style={{ backgroundColor: 'var(--surface-2)', borderRadius: '1.25rem', padding: 'clamp(1.1rem, 4vw, 1.6rem)' }}
              >
                {/* 3 lignes seulement : prenom, puis email ou telephone (un des
                    deux suffit), puis besoin. Le formulaire a 7 champs n'a
                    ramene aucun lead depuis la mise en ligne. */}
                <div>
                  <label style={labelStyle}>{d.firstName}</label>
                  <FormInput value={form.prenom} onChange={set('prenom')} placeholder={isEN ? 'John' : 'Jean'} hasError={errors.prenom} />
                </div>
                <div>
                  <label style={labelStyle}>{d.contactLabel} <span style={{ opacity: 0.7, fontWeight: 500 }}>{d.contactHint}</span></label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <FormInput type="email" value={form.email} onChange={set('email')} placeholder={isEN ? 'you@company.com' : 'vous@entreprise.fr'} hasError={errors.email} />
                    <FormInput type="tel" value={form.tel} onChange={set('tel')} placeholder="06 12 34 56 78" hasError={errors.tel} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{d.needLabel}</label>
                  <FormSelect
                    value={form.besoin}
                    onChange={set('besoin') as React.ChangeEventHandler<HTMLSelectElement>}
                    hasError={errors.besoin}
                    options={besoins}
                    placeholder={d.needPH}
                  />
                </div>

                {/* Honeypot anti-spam : invisible et hors tabulation */}
                <div aria-hidden style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} placeholder="Ne pas remplir" />
                </div>

                <AnimatePresence>
                  {sendError && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: -4, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      style={{ color: 'var(--destructive)', fontSize: '0.85rem', margin: 0 }}
                    >
                      {d.sendError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.14, ease: EASE }}
                  className="w-full rounded-full font-bold disabled:opacity-50"
                  style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.9rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.95rem' }}
                >
                  {loading ? d.sending : d.submit}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center text-center"
                style={{ backgroundColor: 'var(--surface-2)', borderRadius: '1.25rem', padding: '3rem 2rem' }}
              >
                <div
                  className="flex items-center justify-center mb-5"
                  style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--brand-tint)', color: 'var(--brand)' }}
                >
                  <Check size={26} strokeWidth={2.5} aria-hidden />
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                  {d.successTitle}
                </h3>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {isEN
                    ? `Thank you${form.prenom ? ` ${form.prenom}` : ''}. I'll call you back within 24h.`
                    : `Merci ${form.prenom}. Je vous rappelle sous 24h.`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Réassurance : 3 pastilles sur une seule rangee, chacune sur UNE
              ligne. `whitespace-nowrap` + taille fluide : le libelle ne se
              coupe jamais en deux, meme a 360 px. */}
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mt-4">
            {[d.reassurance1, d.reassurance2, d.reassurance3].map((label) => (
              <div
                key={label}
                className="inline-flex items-center justify-center gap-1 text-center whitespace-nowrap overflow-hidden"
                style={{ border: '1px solid var(--on-brand)', color: 'var(--on-brand)', fontSize: 'clamp(0.56rem, 2.1vw, 0.72rem)', fontWeight: 600, padding: '0.35rem 0.3rem', borderRadius: 999, lineHeight: 1.2 }}
              >
                <Check size={11} className="shrink-0" aria-hidden />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
