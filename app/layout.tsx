import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  BASE_URL,
  personSchema,
  localBusinessSchema,
  webSiteSchema,
} from '@/lib/schema'

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Plus Jakarta Sans, seule police du site depuis la charte du 18/08 : corps, nav,
// boutons, formulaires ET titres. Fraunces a ete retiree (plus aucun usage).

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

// ─── Global metadata ─────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: '123 Digital Lyon — Expert en Croissance Digitale pour PME',
    // 🔴 PAS DE SUFFIXE ICI. Mesure du 19/08 sur les 212 pages fabriquees :
    // 199 portaient « 123 Digital » DEUX fois et 204 depassaient 60 caracteres
    // (mediane 76, maximum 125), parce que chaque page finit deja par
    // « | 123 Digital » et que ce gabarit rajoutait « | 123 Digital Lyon »
    // par-dessus. Google coupe vers 60 : ce qui etait tronque en resultat de
    // recherche, c'etait la marque repetee.
    // ⛔ Ne pas y remettre de suffixe. La marque se met dans le title de la
    // page, une seule fois, ou nulle part.
    template: '%s',
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
  icons: {
    icon: '/images/favicon.svg',
  },
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
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <head>
        <JsonLd schema={[personSchema(), localBusinessSchema(), webSiteSchema()]} />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-96F0VT9FDY" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-96F0VT9FDY');
        `}</Script>
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xu0d6yenai");
        `}</Script>
      </body>
    </html>
  )
}
