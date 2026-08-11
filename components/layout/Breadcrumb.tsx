import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
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
          color: 'var(--ink-2)',
          fontFamily: 'var(--font-almarai)',
          fontWeight: 700,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <span key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" style={{ color: 'var(--ink-3)' }}>/</span>
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
                  style={{ color: isLast ? 'var(--ink)' : 'inherit' }}
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
