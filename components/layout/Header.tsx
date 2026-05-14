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
import { services, type ServiceIconName } from '@/data/services'

const CREAM = 'oklch(0.893 0.022 92)'
const CREAM_DIM = 'oklch(0.878 0.020 92 / 55%)'
const CREAM_FAINT = 'oklch(0.878 0.020 92 / 30%)'

const iconMap: Record<ServiceIconName, LucideIcon> = {
  Globe, Search, Target, Palette, Users, Zap,
}

function ServiceIcon({ name, size = 15 }: { name: ServiceIconName; size?: number }) {
  const Icon = iconMap[name]
  return <Icon size={size} aria-hidden />
}

interface NavLink { label: string; href: string; hasDropdown?: boolean }

const navLinks: NavLink[] = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        backgroundColor: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.07)',
      } : undefined}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-0.5 shrink-0"
          aria-label="123 Digital — retour à l'accueil"
        >
          <span
            className="font-display font-medium text-xl tracking-tight"
            style={{ color: CREAM }}
          >
            123
          </span>
          <span
            className="font-display font-light text-xl tracking-tight"
            style={{ color: CREAM_DIM }}
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
                      color: isActive(link.href) ? CREAM : CREAM_DIM,
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
                          border: '1px solid rgba(255,255,255,0.08)',
                          backgroundColor: 'rgba(15,15,15,0.97)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
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
                            style={{ color: CREAM_DIM }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                          >
                            <span className="mt-0.5 shrink-0" style={{ color: CREAM_FAINT }}>
                              <ServiceIcon name={service.icon} size={14} />
                            </span>
                            <div>
                              <p
                                className="text-sm font-medium leading-snug transition-colors"
                                style={{ color: CREAM_DIM }}
                              >
                                {service.title}
                              </p>
                              <p className="text-xs leading-snug mt-0.5" style={{ color: CREAM_FAINT }}>
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
                  style={{ color: isActive(link.href) ? CREAM : CREAM_DIM }}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="hidden lg:block shrink-0">
          <Link
            href="/audit-gratuit"
            className="group inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-1.5 font-medium text-sm transition-all duration-300 hover:gap-3"
            style={{ backgroundColor: 'oklch(0.878 0.020 92)', color: '#000' }}
          >
            Audit gratuit
            <span
              className="flex items-center justify-center rounded-full w-7 h-7 transition-transform duration-300 group-hover:scale-110 shrink-0"
              style={{ backgroundColor: '#000' }}
            >
              <ArrowRight
                size={12}
                style={{ color: 'oklch(0.878 0.020 92)', transform: 'rotate(-45deg)' }}
                aria-hidden
              />
            </span>
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: CREAM_DIM }}
            aria-label="Ouvrir le menu de navigation"
          >
            <Menu size={20} aria-hidden />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] sm:w-[340px] p-0"
            style={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <SheetTitle className="sr-only">Menu de navigation</SheetTitle>

            <div className="flex flex-col h-full p-5">
              {/* Mobile logo */}
              <Link
                href="/"
                className="flex items-center gap-0.5 mb-8"
                onClick={() => setMobileOpen(false)}
              >
                <span className="font-display font-medium text-2xl" style={{ color: CREAM }}>123</span>
                <span className="font-display font-light text-2xl" style={{ color: CREAM_DIM }}>Digital</span>
              </Link>

              {/* Mobile links */}
              <nav className="flex flex-col gap-1 flex-1" aria-label="Navigation mobile">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: pathname === '/' ? CREAM : CREAM_DIM,
                    backgroundColor: pathname === '/' ? 'rgba(255,255,255,0.06)' : 'transparent',
                  }}
                >
                  Accueil
                </Link>

                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => !link.hasDropdown && setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                      style={{
                        color: isActive(link.href) ? CREAM : CREAM_DIM,
                        backgroundColor: isActive(link.href) ? 'rgba(255,255,255,0.06)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>

                    {link.hasDropdown && (
                      <div
                        className="ml-4 mt-1 mb-1 pl-3 flex flex-col gap-0.5"
                        style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-colors"
                            style={{ color: CREAM_FAINT }}
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

              {/* Mobile CTA */}
              <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Link
                  href="/audit-gratuit"
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between w-full rounded-full pl-5 pr-2 py-2 font-medium text-sm transition-all duration-300"
                  style={{ backgroundColor: 'oklch(0.878 0.020 92)', color: '#000' }}
                >
                  Audit gratuit
                  <span
                    className="flex items-center justify-center rounded-full w-9 h-9 group-hover:scale-110 transition-transform shrink-0"
                    style={{ backgroundColor: '#000' }}
                  >
                    <ArrowRight
                      size={14}
                      style={{ color: 'oklch(0.878 0.020 92)', transform: 'rotate(-45deg)' }}
                      aria-hidden
                    />
                  </span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
