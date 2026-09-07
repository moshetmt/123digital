'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  ChevronDown,
  Phone,
  Globe,
  Search,
  Target,
  Palette,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { getServices, type ServiceIconName } from '@/data/services'
import { t, type Locale } from '@/lib/i18n'

// Encre sur blanc, charte v2 section 4
const INK = 'var(--ink)'
const INK_DIM = 'var(--ink-2)'

const PHONE_TEL = 'tel:+33652092301'
const PHONE_DISPLAY = '06 52 09 23 01'

const iconMap: Record<ServiceIconName, LucideIcon> = {
  Globe, Search, Target, Palette, Users, Zap,
}

function ServiceIcon({ name, size = 15 }: { name: ServiceIconName; size?: number }) {
  const Icon = iconMap[name]
  return <Icon size={size} aria-hidden />
}

interface NavLink { label: string; href: string; hasDropdown?: boolean }

export function Header({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).nav
  const services = getServices(lang)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const base = lang === 'en' ? '/en' : ''

  const navLinks: NavLink[] = [
    { label: d.services,     href: `${base}/services`, hasDropdown: true },
    { label: d.realisations, href: `${base}/realisations` },
    { label: d.about,        href: lang === 'en' ? '/en/about' : '/a-propos' },
    { label: d.blog,         href: `${base}/blog` },
    { label: d.contact,      href: `${base}/contact` },
    { label: d.cta,          href: lang === 'en' ? '/en/audit' : '/audit-gratuit' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--line)' }}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* ── Logo — logotype seul, l'URL et le contenu font le travail ── */}
        <Link
          href={lang === 'en' ? '/en' : '/'}
          className="flex items-center shrink-0"
          aria-label="123digital, accueil"
        >
          <Image src="/logo/logotype.svg" alt="123digital" width={166} height={34} style={{ height: 34, width: 'auto' }} priority unoptimized />
        </Link>

        {/* ── Desktop nav ── */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <li key={link.href} className="relative">
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className="relative flex items-center gap-1 px-3 py-2 rounded text-sm font-bold transition-colors duration-150"
                    style={{
                      color: isActive(link.href) ? 'var(--brand)' : INK,
                    }}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                      aria-hidden
                    />
                  </button>

                  {/* Services dropdown */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded p-2"
                        style={{
                          border: '1px solid var(--line)',
                          backgroundColor: 'var(--surface)',
                        }}
                        role="menu"
                        aria-label="Services"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            role="menuitem"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-3 rounded px-3 py-2.5 transition-colors group"
                            style={{ color: INK_DIM }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-3)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                          >
                            <span className="mt-0.5 shrink-0 grid place-items-center" style={{ color: INK, width: 24, height: 24 }}>
                              <ServiceIcon name={service.icon} size={16} />
                            </span>
                            <div>
                              <p
                                className="text-sm font-bold leading-snug transition-colors"
                                style={{ color: INK }}
                              >
                                {service.title}
                              </p>
                              <p className="text-xs leading-snug mt-0.5" style={{ color: INK_DIM }}>
                                {service.shortDesc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            ) : (
              <li key={link.href}>
                {/* L'audit gratuit est la page de conversion : elle sort du
                    lot avec un aplat 100, au lieu d'etre le dernier lien
                    de la rangee, indistinct des autres. */}
                <Link
                  href={link.href}
                  className={cn(
                    'relative block text-sm font-bold transition-colors duration-150 rounded',
                    link.href.includes('audit') ? 'ml-1 px-3.5 py-1.5' : 'px-3 py-2',
                  )}
                  style={
                    link.href.includes('audit')
                      ? { color: 'var(--brand)', backgroundColor: 'var(--brand-tint)' }
                      : { color: isActive(link.href) ? 'var(--brand)' : INK }
                  }
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* ── Desktop CTA + lang toggle ── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Selecteur de langue segmente : la langue courante est marquee,
              l'autre est cliquable. */}
          <div
            className="inline-flex items-center rounded p-0.5"
            style={{ backgroundColor: 'var(--surface-3)' }}
          >
            <span
              className="rounded px-2.5 py-1 text-xs font-extrabold leading-none"
              style={{ backgroundColor: 'var(--ink)', color: 'var(--on-brand)' }}
            >
              {lang.toUpperCase()}
            </span>
            <Link
              href={d.langHref}
              className="rounded px-2.5 py-1 text-xs font-extrabold leading-none transition-colors"
              style={{ color: INK_DIM }}
            >
              {d.lang}
            </Link>
          </div>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 rounded font-bold text-sm transition duration-150 active:scale-[0.97] whitespace-nowrap"
            style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.55rem 1.15rem' }}
          >
            <Phone size={14} aria-hidden />
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* ── Mobile : CTA téléphone + hamburger ── */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center justify-center gap-1.5 rounded px-3 font-bold whitespace-nowrap transition duration-150 active:scale-[0.97]"
            style={{
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
              fontSize: '0.78rem',
              minHeight: 40,
            }}
          >
            <Phone size={13} aria-hidden />
            {PHONE_DISPLAY}
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="flex items-center justify-center rounded transition-colors"
              style={{ color: INK_DIM, minWidth: 44, minHeight: 44 }}
              aria-label="Ouvrir le menu de navigation"
            >
              <Menu size={20} aria-hidden />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[340px] p-0"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--line)' }}
            >
            <SheetTitle className="sr-only">Menu de navigation</SheetTitle>

            <div className="flex flex-col h-full p-5">
              {/* Mobile logo */}
              <Link
                href={lang === 'en' ? '/en' : '/'}
                className="flex items-center mb-8"
                onClick={() => setMobileOpen(false)}
              >
                {/* `unoptimized` : le logo est un SVG, l'optimiseur d'images
                    le rendait cassé dans le panneau mobile. */}
                <Image src="/logo/logotype.svg" alt="123digital" width={150} height={31} unoptimized style={{ height: 31, width: 'auto' }} />
              </Link>

              {/* Mobile links */}
              <nav className="flex flex-col gap-1 flex-1" aria-label="Navigation mobile">
                <Link
                  href={lang === 'en' ? '/en' : '/'}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded text-[0.95rem] font-bold transition-colors"
                  style={{
                    color: pathname === '/' || pathname === '/en' ? 'var(--brand)' : INK,
                    backgroundColor: pathname === '/' || pathname === '/en' ? 'var(--brand-tint)' : 'transparent',
                  }}
                >
                  {d.home}
                </Link>

                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => !link.hasDropdown && setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded text-[0.95rem] font-bold transition-colors"
                      style={{
                        color: isActive(link.href) ? 'var(--brand)' : INK,
                        backgroundColor: isActive(link.href) ? 'var(--brand-tint)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>

                    {link.hasDropdown && (
                      <div
                        className="ml-4 mt-1 mb-1 pl-3 flex flex-col gap-0.5"
                        style={{ borderLeft: '1px solid var(--line)' }}
                      >
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-1.5 px-2 rounded text-[0.82rem] font-semibold transition-colors"
                            style={{ color: INK_DIM }}
                          >
                            <span className="grid place-items-center shrink-0" style={{ width: 18, height: 18, color: INK }}>
                              <ServiceIcon name={service.icon} size={13} />
                            </span>
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA + lang */}
              <div className="pt-4 mt-4 flex flex-col gap-3" style={{ borderTop: '1px solid var(--line)' }}>
                <a
                  href={PHONE_TEL}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded font-bold text-sm transition duration-150 active:scale-[0.97]"
                  style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)', padding: '0.75rem' }}
                >
                  <Phone size={15} aria-hidden />
                  {PHONE_DISPLAY}
                </a>
                <Link
                  href={d.langHref}
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-sm py-2 rounded border transition-colors"
                  style={{ borderColor: 'var(--line-strong)', color: INK_DIM }}
                >
                  {d.lang === 'EN' ? '🇬🇧 English' : '🇫🇷 Français'}
                </Link>
              </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
