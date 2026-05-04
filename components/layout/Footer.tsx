import Link from 'next/link'

const navLinks = [
  { label: 'Services',         href: '/services' },
  { label: 'À propos',         href: '/a-propos' },
  { label: 'Blog',             href: '/blog' },
  { label: 'Contact',          href: '/contact' },
  { label: 'Mentions légales', href: '/mentions-legales' },
]

export function Footer() {
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
            href="/"
            aria-label="123 Digital — retour à l'accueil"
            className="font-display font-medium transition-opacity duration-200 hover:opacity-70 w-fit"
            style={{ fontSize: '1.5rem', color: '#E1E0CC', letterSpacing: '-0.02em' }}
          >
            123 Digital
          </Link>
          <p style={{ color: '#6b7280', fontSize: '0.72rem' }}>
            © {new Date().getFullYear()} Maurice Timsit. Tous droits réservés.
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

        {/* Contact */}
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
          <a
            href="https://www.linkedin.com/in/mauricetimsit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Maurice Timsit"
            className="inline-flex items-center justify-end gap-1.5 mt-2 transition-colors duration-200 hover:text-foreground"
            style={{ color: '#6b7280', fontSize: '0.72rem' }}
          >
            LinkedIn
            <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
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
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr; text-align: center; }
          .footer-contact { text-align: center !important; align-items: center !important; }
          .footer-contact a, .footer-contact span { text-align: center; }
          .footer-nav { justify-content: center; }
        }
      `}</style>
    </footer>
  )
}
