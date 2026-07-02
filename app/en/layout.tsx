import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '123 Digital Lyon — Digital Growth Expert for SMEs',
    template: '%s | 123 Digital Lyon',
  },
  description:
    'Maurice Timsit, digital consultant based in Lyon: SEO, web design, online advertising and automation for SMEs. Free 30-min audit, no commitment.',
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: { 'fr': BASE_URL, 'en': `${BASE_URL}/en` },
  },
  // Pages EN — exclues de l'index Google pour éviter la cannibalisation des pages FR
  robots: {
    index: false,
    follow: false,
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header lang="en" />
      <main>{children}</main>
      <Footer lang="en" />
    </>
  )
}
