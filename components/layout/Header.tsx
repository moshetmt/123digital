'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  ChevronDown,
  ArrowRight,
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

// Encre sur ivoire — plancher de contraste 4,5:1 sur --surface
const INK = 'var(--ink)'
const INK_DIM = 'var(--ink-2)'
const INK_FAINT = 'var(--ink-3)'

const iconMap: Record<ServiceIconName, LucideIcon> = {
  Globe, Search, Target, Palette, Users, Zap,
}

function ServiceIcon({ name, size = 15 }: { name: ServiceIconName; size?: number }) {
  const Icon = iconMap[name]
  return <Icon size={size} aria-hidden />
}

interface NavLink { label: string; href: string; hasDropdown?: boolean }

// navLinks are built dynamically inside the component using `d` and `base`

export function Header({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).nav
  const services = getServices(lang)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const base = lang === 'en' ? '/en' : ''

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks: NavLink[] = [
    { label: d.services,     href: `${base}/services`, hasDropdown: true },
    { label: d.realisations, href: `${base}/realisations` },
    { label: d.about,        href: lang === 'en' ? '/en/about' : '/a-propos' },
    { label: d.blog,         href: `${base}/blog` },
    { label: d.contact,      href: `${base}/contact` },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b'
          : 'bg-transparent',
      )}
      style={scrolled ? {
        backgroundColor: 'var(--surface-alpha)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'var(--line)',
      } : undefined}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* ── Logo ── */}
        <Link
          href={lang === 'en' ? '/en' : '/'}
          className="flex items-center gap-0.5 shrink-0"
          aria-label="123 Digital — homepage"
        >
          <span
            className="font-display font-medium text-xl tracking-tight"
            style={{ color: INK }}
          >
            123
          </span>
          <span
            className="font-display font-light text-xl tracking-tight"
            style={{ color: INK_DIM }}
          >
            Digital
          </span>
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
                    className="relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{
                      color: isActive(link.href) ? INK : INK_DIM,
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl p-2 shadow-2xl"
                        style={{
                          border: '1px solid var(--line)',
                          backgroundColor: 'var(--surface-2)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          boxShadow: '0 24px 60px oklch(0.30 0.02 95 / 0.12)',
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
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors group"
                            style={{ color: INK_DIM }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-3)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                          >
                            <span className="mt-0.5 shrink-0" style={{ color: INK_FAINT }}>
                              <ServiceIcon name={service.icon} size={14} />
                            </span>
                            <div>
                              <p
                                className="text-sm font-medium leading-snug transition-colors"
                                style={{ color: INK_DIM }}
                              >
                                {service.title}
                              </p>
                              <p className="text-xs leading-snug mt-0.5" style={{ color: INK_FAINT }}>
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
                <Link
                  href={link.href}
                  className="relative block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ color: isActive(link.href) ? INK : INK_DIM }}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* ── Desktop CTA + lang toggle ── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Lang switcher */}
          <Link
            href={d.langHref}
            className="text-xs font-medium px-2 py-1 rounded border transition-colors"
            style={{ borderColor: 'var(--line-strong)', color: INK_DIM }}
          >
            {d.lang}
          </Link>
          <Link
            href={lang === 'en' ? '/en/audit' : '/audit-gratuit'}
            className="group inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-1.5 font-medium text-sm transition-all duration-300 hover:gap-3"
            style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}
          >
            {d.cta}
            <span
              className="flex items-center justify-center rounded-full w-7 h-7 transition-transform duration-300 group-hover:scale-110 shrink-0"
              style={{ backgroundColor: 'var(--on-brand)' }}
            >
              <ArrowRight
                size={12}
                style={{ color: 'var(--brand)', transform: 'rotate(-45deg)' }}
                aria-hidden
              />
            </span>
          </Link>
        </div>

        {/* ── Mobile : CTA visible + hamburger ── */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          {/* Même destination et même libellé que le CTA du panneau latéral */}
          <Link
            href={lang === 'en' ? '/en/audit' : '/audit-gratuit'}
            className="inline-flex items-center justify-center rounded-full px-4 font-medium whitespace-nowrap"
            style={{
              backgroundColor: 'var(--brand)',
              color: 'var(--on-brand)',
              fontSize: '0.8rem',
              minHeight: 40,
            }}
          >
            {d.cta}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="flex items-center justify-center rounded-lg transition-colors"
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
                className="flex items-center gap-0.5 mb-8"
                onClick={() => setMobileOpen(false)}
              >
                <span className="font-display font-medium text-2xl" style={{ color: INK }}>123</span>
                <span className="font-display font-light text-2xl" style={{ color: INK_DIM }}>Digital</span>
              </Link>

              {/* Mobile links */}
              <nav className="flex flex-col gap-1 flex-1" aria-label="Navigation mobile">
                <Link
                  href={lang === 'en' ? '/en' : '/'}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: pathname === '/' || pathname === '/en' ? INK : INK_DIM,
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
                      className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                      style={{
                        color: isActive(link.href) ? INK : INK_DIM,
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
                            className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-colors"
                            style={{ color: INK_FAINT }}
                          >
                            <ServiceIcon name={service.icon} size={11} />
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
                <Link
                  href={lang === 'en' ? '/en/audit' : '/audit-gratuit'}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between w-full rounded-full pl-5 pr-2 py-2 font-medium text-sm transition-all duration-300"
                  style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}
                >
                  {d.cta}
                  <span
                    className="flex items-center justify-center rounded-full w-9 h-9 group-hover:scale-110 transition-transform shrink-0"
                    style={{ backgroundColor: 'var(--on-brand)' }}
                  >
                    <ArrowRight
                      size={14}
                      style={{ color: 'var(--brand)', transform: 'rotate(-45deg)' }}
                      aria-hidden
                    />
                  </span>
                </Link>
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
    </motion.header>
  )
}
