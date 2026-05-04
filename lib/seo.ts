import type { Metadata } from 'next'
import { BASE_URL } from './schema'

interface PageSeoParams {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function generatePageMetadata({
  title,
  description,
  path,
  image = '/images/og-image.jpg',
  type = 'website',
  noIndex = false,
}: PageSeoParams): Metadata {
  const url = `${BASE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      type,
      url,
      title,
      description,
      locale: 'fr_FR',
      siteName: '123 Digital',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
