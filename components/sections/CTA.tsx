'use client'

import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'
import { readLeadSource } from '@/lib/lead-source'
import { NoteGoogle } from '@/components/sections/NoteGoogle'

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

// Messages d'erreur : disent quoi faire, jamais "une erreur est survenue".
const ERRORS_FR = {
  prenom:  'Indiquez votre prénom.',
  contact: 'Il manque votre email ou votre téléphone.',
  email:   "Cet email n'est pas valide.",
  tel:     "Ce numéro de téléphone n'est pas valide.",
  besoin:  'Choisissez votre besoin.',
}

const ERRORS_EN = {
  prenom:  'Enter your first name.',
  contact: 'We need your email or phone number.',
  email:   'This email address is not valid.',
  tel:     'This phone number is not valid.',
  besoin:  'Choose what you need.',
}

const inputBase: React.CSSProperties = {
  width: '100%',
  minHeight: '44px',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--line-strong)',
  borderRadius: 'var(--radius)',
  padding: '0.75rem 0.9rem',
  color: 'var(--ink)',
  fontSize: '0.92rem',
  fontFamily: 'inherit',
  transition: 'border-color 0.15s ease',
}

interface FormInputProps {
  id?: string
  name?: string
  type?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  hasError?: boolean
  autoComplete?: string
  inputMode?: 'email' | 'tel'
  spellCheck?: boolean
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

function FormInput({
  id, name, type = 'text', value, onChange, placeholder, hasError,
  autoComplete, inputMode, spellCheck,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
}: FormInputProps) {
  const [focused, setFocused] = useState(false)
  const [focusVisible, setFocusVisible] = useState(false)
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      spellCheck={spellCheck}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      style={{
        ...inputBase,
        borderColor: hasError ? 'var(--destructive)' : focused ? 'var(--brand)' : 'var(--line-strong)',
        outline: focusVisible ? '2px solid var(--brand)' : 'none',
        outlineOffset: focusVisible ? '2px' : undefined,
      }}
      onFocus={(e) => { setFocused(true); setFocusVisible(e.currentTarget.matches(':focus-visible')) }}
      onBlur={() => { setFocused(false); setFocusVisible(false) }}
    />
  )
}

interface FormSelectProps {
  id?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  hasError?: boolean
  options: { value: string; label: string }[]
  placeholder: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

function FormSelect({
  id, value, onChange, hasError, options, placeholder,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
}: FormSelectProps) {
  const [focused, setFocused] = useState(false)
  const [focusVisible, setFocusVisible] = useState(false)
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      style={{
        ...inputBase,
        borderColor: hasError ? 'var(--destructive)' : focused ? 'var(--brand)' : 'var(--line-strong)',
        outline: focusVisible ? '2px solid var(--brand)' : 'none',
        outlineOffset: focusVisible ? '2px' : undefined,
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%23123f27' stroke-width='1.5' stroke-linecap='round'/></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.9rem center',
        paddingRight: '2.4rem',
      }}
      onFocus={(e) => { setFocused(true); setFocusVisible(e.currentTarget.matches(':focus-visible')) }}
      onBlur={() => { setFocused(false); setFocusVisible(false) }}
    >
      <option value="">{placeholder}</option>
      {options.map((b) => (
        <option key={b.value} value={b.value}>{b.label}</option>
      ))}
    </select>
  )
}

// ── CTA Section ───────────────────────────────────────────────────────────────

// compact : sur téléphone, le paragraphe d'intro disparaît pour que le bouton
// d'envoi tienne dans le premier écran (page /audit-gratuit, étude du 25/10).
export function CTA({ lang = 'fr', compact = false }: { lang?: Locale; compact?: boolean }) {
  const d = t(lang).cta
  const isEN = lang === 'en'
  const besoins = isEN ? BESOINS_EN : BESOINS_FR
  const ERR = isEN ? ERRORS_EN : ERRORS_FR

  // Identifiants uniques : le formulaire peut être monté plusieurs fois sur
  // une même page (accueil + audit-gratuit, par exemple).
  const uid = useId()
  const ids = {
    prenom:     `${uid}-prenom`,
    prenomErr:  `${uid}-prenom-err`,
    email:      `${uid}-email`,
    tel:        `${uid}-tel`,
    contactErr: `${uid}-contact-err`,
    besoin:     `${uid}-besoin`,
    besoinErr:  `${uid}-besoin-err`,
  }

  const [form, setForm] = useState<FormState>({ prenom: '', email: '', tel: '', besoin: '' })
  const [hp, setHp] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [btnFocusVisible, setBtnFocusVisible] = useState(false)

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!form.prenom.trim()) errs.prenom = ERR.prenom
    if (!form.besoin) errs.besoin = ERR.besoin

    // Email ou telephone, au moins un des deux : aucun rempli fait rougir les
    // deux champs de la ligne, un seul rempli n'est verifie que lui-meme.
    const emailFilled = form.email.trim().length > 0
    const telDigits = form.tel.replace(/\D/g, '')
    const telFilled = telDigits.length > 0
    if (!emailFilled && !telFilled) {
      errs.email = ERR.contact
      errs.tel = ERR.contact
    } else {
      if (emailFilled && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = ERR.email
      if (telFilled && telDigits.length < 6) errs.tel = ERR.tel
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

  const errorTextStyle: React.CSSProperties = {
    color: 'var(--destructive)',
    fontSize: '0.8rem',
    marginTop: '0.35rem',
    marginBottom: 0,
  }

  return (
    <section
      id="contact"
      style={{ backgroundColor: 'var(--surface-3)', padding: 'clamp(1.6rem, 5vw, 4.5rem) 1.5rem' }}
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
              color: 'var(--ink)',
              marginBottom: '0.6rem',
            }}
          >
            {d.heading}
          </h2>
          <p className={compact ? 'hidden sm:block' : undefined} style={{ color: 'var(--ink-2)', fontSize: 'clamp(0.92rem, 3vw, 1rem)', lineHeight: 1.5, maxWidth: '46ch', marginBottom: '0.75rem' }}>
            {d.sub}
          </p>
          {!isEN && (
            <div style={{ marginBottom: '0.6rem' }}>
              <NoteGoogle />
            </div>
          )}
          <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem', fontWeight: 600 }}>
            {d.altPhone}{' '}
            <a href={PHONE_TEL} style={{ color: 'var(--brand)', fontWeight: 800, textDecoration: 'underline' }}>
              {PHONE_DISPLAY}
            </a>
          </p>
          <div className="hidden lg:block mt-6" style={{ width: 220 }}>
            <Image src="/images/illustrations/contact.webp" alt="" width={800} height={800} sizes="220px" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>
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
                style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: 'clamp(1.1rem, 4vw, 1.6rem)' }}
              >
                {/* 3 lignes seulement : prenom, puis email ou telephone (un des
                    deux suffit), puis besoin. Le formulaire a 7 champs n'a
                    ramene aucun lead depuis la mise en ligne. */}
                <div>
                  <label htmlFor={ids.prenom} style={labelStyle}>{d.firstName}</label>
                  <FormInput
                    id={ids.prenom}
                    name="prenom"
                    autoComplete="given-name"
                    value={form.prenom}
                    onChange={set('prenom')}
                    placeholder={isEN ? 'John' : 'Jean'}
                    hasError={Boolean(errors.prenom)}
                    aria-describedby={errors.prenom ? ids.prenomErr : undefined}
                    aria-invalid={Boolean(errors.prenom)}
                  />
                  {errors.prenom && (
                    <p id={ids.prenomErr} role="alert" style={errorTextStyle}>{errors.prenom}</p>
                  )}
                </div>
                <div>
                  <p style={labelStyle}>{d.contactLabel} <span style={{ opacity: 0.7, fontWeight: 500 }}>{d.contactHint}</span></p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor={ids.email} className="sr-only">{d.emailLabel}</label>
                      <FormInput
                        id={ids.email}
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        spellCheck={false}
                        value={form.email}
                        onChange={set('email')}
                        placeholder={isEN ? 'you@company.com' : 'vous@entreprise.fr'}
                        hasError={Boolean(errors.email)}
                        aria-describedby={errors.email ? ids.contactErr : undefined}
                        aria-invalid={Boolean(errors.email)}
                      />
                    </div>
                    <div>
                      <label htmlFor={ids.tel} className="sr-only">{d.phoneLabel}</label>
                      <FormInput
                        id={ids.tel}
                        name="tel"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        spellCheck={false}
                        value={form.tel}
                        onChange={set('tel')}
                        placeholder="06 12 34 56 78"
                        hasError={Boolean(errors.tel)}
                        aria-describedby={errors.tel ? ids.contactErr : undefined}
                        aria-invalid={Boolean(errors.tel)}
                      />
                    </div>
                  </div>
                  {(errors.email || errors.tel) && (
                    <p id={ids.contactErr} role="alert" style={errorTextStyle}>{errors.email || errors.tel}</p>
                  )}
                </div>
                <div>
                  <label htmlFor={ids.besoin} style={labelStyle}>{d.needLabel}</label>
                  <FormSelect
                    id={ids.besoin}
                    value={form.besoin}
                    onChange={set('besoin') as React.ChangeEventHandler<HTMLSelectElement>}
                    hasError={Boolean(errors.besoin)}
                    options={besoins}
                    placeholder={d.needPH}
                    aria-describedby={errors.besoin ? ids.besoinErr : undefined}
                    aria-invalid={Boolean(errors.besoin)}
                  />
                  {errors.besoin && (
                    <p id={ids.besoinErr} role="alert" style={errorTextStyle}>{errors.besoin}</p>
                  )}
                </div>

                {/* Honeypot anti-spam : invisible, hors tabulation, jamais
                    auto-rempli par un gestionnaire de mots de passe (nom
                    neutre, pas de type password, pas de name email/url/website). */}
                <div aria-hidden style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <input
                    type="text"
                    name="hp_field"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    aria-label=""
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    placeholder="Ne pas remplir"
                  />
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
                  transition={{ duration: 0.15, ease: EASE }}
                  onFocus={(e) => setBtnFocusVisible(e.currentTarget.matches(':focus-visible'))}
                  onBlur={() => setBtnFocusVisible(false)}
                  className="w-full font-bold disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--brand)',
                    color: 'var(--on-brand)',
                    padding: '0.9rem',
                    border: 'none',
                    borderRadius: 'var(--radius)',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    outline: btnFocusVisible ? '2px solid var(--brand)' : 'none',
                    outlineOffset: btnFocusVisible ? '2px' : undefined,
                  }}
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
                className="flex flex-col"
                style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--ombre-carte)', padding: '2rem' }}
              >
                <Check size={26} strokeWidth={1.5} aria-hidden style={{ color: 'var(--brand)', marginBottom: '0.75rem' }} />
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

          {/* Réassurance : texte simple séparé par des points médians, peut
              passer à la ligne (plus de pastilles clippées). */}
          <p className="mt-4" style={{ color: 'var(--ink-2)', fontSize: '0.875rem', lineHeight: 1.4 }}>
            {d.reassurance1} · {d.reassurance2} · {d.reassurance3}
          </p>
        </div>
      </div>
    </section>
  )
}
