import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { languesPour } from '@/data/hreflang'

export const metadata: Metadata = {
  title: 'Blog — Digital Growth Tips | 123 Digital Lyon',
  description: 'Articles and guides on SEO, web design, online advertising and digital strategy for SMEs.',
  alternates: {
    canonical: `${BASE_URL}/en/blog`,
    ...languesPour('/en/blog'),
  },
}

export default function BlogPageEN() {
  return (
    <div style={{ paddingTop: '5rem', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.25rem, 6vw, 4rem)', textAlign: 'center' }}>
      <p style={{ color: 'var(--ink-2)', fontSize: '1rem' }}>Articles coming soon.</p>
    </div>
  )
}
