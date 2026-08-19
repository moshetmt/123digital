import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** `vert` pour le fil pose sur la banniere verte : tout passe en blanc. */
  tone?: 'clair' | 'vert'
}

export function Breadcrumb({ items, tone = 'clair' }: BreadcrumbProps) {
  const surVert = tone === 'vert'
  const couleurBase = surVert ? 'oklch(0.985 0.003 150 / 72%)' : 'var(--ink-2)'
  const couleurSeparateur = surVert ? 'oklch(0.985 0.003 150 / 45%)' : 'var(--ink-3)'
  const couleurActuelle = surVert ? 'var(--on-brand)' : 'var(--ink)'
  const schemaItems = items.map((item, i) => ({
    name: item.label,
    path: item.href ?? `/${items.slice(1, i + 1).map(it => it.label.toLowerCase().replace(/\s+/g, '-')).join('/')}`,
  }))

  return (
    <>
      <JsonLd schema={breadcrumbSchema(schemaItems)} />
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-1.5 flex-wrap"
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: couleurBase,
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <span key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" style={{ color: couleurSeparateur }}>/</span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--brand)] transition-colors duration-200"
                  style={{ color: 'inherit' }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{ color: isLast ? couleurActuelle : 'inherit' }}
                >
                  {item.label}
                </span>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
