import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, Instrument_Serif, Almarai } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  BASE_URL,
  personSchema,
  localBusinessSchema,
  webSiteSchema,
} from '@/lib/schema'

// ─── Fonts ────────────────────────────────────────────────────────────────────

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const almarai = Almarai({
  subsets: ['latin'],
  variable: '--font-almarai',
  weight: ['300', '400', '700', '800'],
  display: 'swap',
})

// Kept for legacy components that may reference it
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  style: ['italic'],
  weight: '400',
  display: 'swap',
})

// ─── Global metadata ─────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: '123 Digital Lyon — Expert en Croissance Digitale pour PME',
    template: '%s | 123 Digital Lyon',
  },

  description:
    'Maurice Timsit, consultant digital à Lyon : SEO, création de site web, publicité en ligne et automatisation pour PME. Audit gratuit 30 min, sans engagement.',

  keywords: [
    'consultant digital Lyon',
    'expert digital PME Lyon',
    'SEO Lyon PME',
    'création site web Lyon',
    'agence marketing digital Lyon',
    'consultant growth marketing Lyon',
    'croissance digitale',
    'Maurice Timsit',
    '123 Digital',
    'publicité en ligne Lyon',
    'automatisation marketing Lyon',
    'agence digitale',
    'référencement naturel',
  ],

  authors: [{ name: 'Maurice Timsit', url: BASE_URL }],
  creator: 'Maurice Timsit',
  publisher: '123 Digital',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: '123 Digital',
    title: '123 Digital — Expert en croissance digitale pour PME',
    description:
      'Maurice Timsit vous aide à développer votre PME en ligne : SEO, création de site, publicité, branding. Audit gratuit disponible.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: '123 Digital — Expert en croissance digitale pour PME françaises',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '123 Digital — Expert en croissance digitale pour PME',
    description:
      'Maurice Timsit vous aide à développer votre PME en ligne : SEO, création de site, publicité, branding.',
    images: ['/images/og-image.svg'],
    creator: '@123digital',
  },

  alternates: {
    canonical: BASE_URL,
    languages: { 'fr-FR': BASE_URL },
  },

  manifest: '/site.webmanifest',
  other: { 'theme-color': '#000000' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark',
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${almarai.variable} ${dmSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd schema={[personSchema(), localBusinessSchema(), webSiteSchema()]} />
        {/* Preload critical fonts to reduce LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
