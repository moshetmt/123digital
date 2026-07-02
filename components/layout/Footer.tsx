import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.556 4.112 1.528 5.836L.057 23.25a.75.75 0 0 0 .916.932l5.556-1.458A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 0 1-4.952-1.354l-.355-.212-3.681.966.984-3.595-.232-.37A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

const PhoneIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.08-1.08a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const MailIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const socialLinks = [
  { href: 'https://www.linkedin.com/in/mauricetimsit/', icon: LinkedinIcon,   label: 'LinkedIn' },
  { href: 'https://www.instagram.com/moshe.tmt2/',      icon: InstagramIcon,  label: 'Instagram' },
  { href: 'https://wa.me/33652092301',                  icon: WhatsAppIcon,   label: 'WhatsApp' },
  { href: 'tel:+33652092301',                           icon: PhoneIcon,      label: 'Téléphone' },
  { href: 'mailto:contact@123digital.fr',               icon: MailIcon,       label: 'Email' },
]



export function Footer({ lang = 'fr' }: { lang?: Locale }) {
  const d = t(lang).footer
  const base = lang === 'en' ? '/en' : ''
  const navLinks = lang === 'en' ? [
    { label: 'Services',     href: `${base}/services` },
    { label: 'About',        href: `${base}/about` },
    { label: 'Blog',         href: `${base}/blog` },
    { label: 'Contact',      href: `${base}/contact` },
    { label: 'Legal notice', href: '/mentions-legales' },
  ] : [
    { label: 'Services',                  href: '/services' },
    { label: 'Réalisations',              href: '/realisations' },
    { label: 'Blog',                      href: '/blog' },
    { label: 'Secteurs',                  href: '/secteurs' },
    { label: 'Consultant digital Lyon',   href: '/consultant-digital-lyon' },
    { label: 'Audit gratuit',             href: '/audit-gratuit' },
    { label: 'À propos',                  href: '/a-propos' },
    { label: 'Contact',                   href: '/contact' },
    { label: 'Mentions légales',          href: '/mentions-legales' },
  ]
  return (
    <footer
      aria-label="Pied de page"
      style={{
        backgroundColor: '#000',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '3rem 1.5rem',
      }}
    >
      {/* Desktop: 3 colonnes | Mobile: 1 colonne */}
      <div
        className="mx-auto footer-grid"
        style={{ maxWidth: '1280px' }}
      >
        {/* Brand + copyright */}
        <div className="flex flex-col gap-1.5">
          <Link
            href={lang === 'en' ? '/en' : '/'}
            aria-label="123 Digital"
            className="font-display font-medium transition-opacity duration-200 hover:opacity-70 w-fit"
            style={{ fontSize: '1.5rem', color: '#E1E0CC', letterSpacing: '-0.02em' }}
          >
            123 Digital
          </Link>
          <p style={{ color: '#6b7280', fontSize: '0.72rem' }}>
            © {new Date().getFullYear()} Maurice Timsit. {d.rights}
          </p>
        </div>

        {/* Nav links inline */}
        <nav
          aria-label="Navigation principale"
          className="footer-nav flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        >
          {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-3">
              <Link
                href={link.href}
                className="transition-colors duration-200 hover:text-foreground"
                style={{ color: '#6b7280', fontSize: '0.78rem' }}
              >
                {link.label}
              </Link>
              {i < navLinks.length - 1 && (
                <span style={{ color: '#3f3f46', fontSize: '0.78rem' }} aria-hidden>·</span>
              )}
            </span>
          ))}
        </nav>

        {/* Contact + Social */}
        <div className="footer-contact flex flex-col gap-1" style={{ textAlign: 'right' }}>
          <span style={{ color: 'rgba(225,224,204,0.45)', fontSize: '0.78rem' }}>
            123digital.fr
          </span>
          <a
            href="mailto:contact@123digital.fr"
            className="transition-colors duration-200 hover:text-foreground"
            style={{ color: 'rgba(225,224,204,0.45)', fontSize: '0.78rem' }}
          >
            contact@123digital.fr
          </a>
          <div className="footer-social flex items-center gap-[16px] mt-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="social-icon transition-colors duration-200"
                style={{ color: '#DEDBC8' }}
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: center;
        }
        .social-icon:hover { color: #00FF87 !important; }
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr; text-align: center; }
          .footer-contact { text-align: center !important; align-items: center !important; }
          .footer-contact a, .footer-contact span { text-align: center; }
          .footer-nav { justify-content: center; }
          .footer-social { justify-content: center; }
        }
      `}</style>
    </footer>
  )
}
