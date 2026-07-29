import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Blog — Digital Growth Tips | 123 Digital Lyon',
  description: 'Articles and guides on SEO, web design, online advertising and digital strategy for SMEs.',
  alternates: {
    canonical: `${BASE_URL}/en/blog`,
    languages: { 'fr': `${BASE_URL}/blog`, 'en': `${BASE_URL}/en/blog` },
  },
}

export default function BlogPageEN() {
  return (
    <div style={{ paddingTop: '5rem', padding: '8rem 1.5rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--ink-2)', fontSize: '1rem' }}>Articles coming soon.</p>
    </div>
  )
}
