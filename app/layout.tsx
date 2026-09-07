import type { Metadata, Viewport } from 'next'
import { Rethink_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { JsonLd } from '@/components/seo/JsonLd'
import { LeadSource } from '@/components/analytics/LeadSource'
import {
  BASE_URL,
  personSchema,
  localBusinessSchema,
  webSiteSchema,
} from '@/lib/schema'

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Rethink Sans, seule police du site depuis la charte v2 (07/09) : corps, nav,
// boutons, formulaires ET titres. Police variable (axe wght 400 à 800) : le
// mot-cle 'variable' charge la plage complete au lieu d'un tableau de graisses
// fixes, syntaxe reservee aux polices non variables.

const rethink = Rethink_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-rethink',
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
        url: '/images/og-image.png',
        // PNG et non SVG : aucun reseau social ne lit le SVG, et la vignette
        // restait vide sur tout lien partage. Constate le 20/08.
        type: 'image/png',
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
    images: ['/images/og-image.png'],
    creator: '@123digital',
  },

  alternates: {
    canonical: BASE_URL,
    // 🔴 PAS de `languages` ici. Ce qui s'y trouvait, `{ 'fr-FR': BASE_URL }`,
    // causait deux defauts a lui seul (constates le 19/08 dans le HTML fabrique) :
    //   1. il FUITAIT sur toute page qui ne redefinit pas `alternates`, si bien
    //      que /portfolio annonçait que sa version francaise etait la page
    //      d'accueil. C'est faux, et une declaration fausse vaut moins que rien.
    //   2. il utilisait le code `fr-FR` pour https://123digital.fr, alors que les
    //      pages /en declarent `fr` pour cette MEME URL. Deux codes differents
    //      pour une meme page suffisent a faire jeter tout le groupe par Google.
    // Le hreflang se declare page par page, via `languesPour` de data/hreflang.ts,
    // qui derive les deux cotes de la meme table et garantit la reciprocite.
  },

  manifest: '/site.webmanifest',
  icons: {
    icon: '/images/favicon.svg',
  },
  // Pas de 'theme-color' ici : viewport.themeColor plus bas emet deja la balise,
  // et les deux ensemble en produisaient deux, identiques.
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Couleur de la barre du navigateur sur mobile : celle du bandeau tout en
  // haut de la page, --dark, et non un noir approximatif.
  themeColor: '#0A0A0A',
  // Le site est clair, --surface vaut #F4F6F2. La valeur 'dark' venait du
  // gabarit de depart et n a jamais ete corrigee : elle faisait rendre au
  // navigateur ses champs de formulaire, ses listes deroulantes et ses barres
  // de defilement en sombre par-dessus une page ivoire.
  colorScheme: 'light',
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={rethink.variable}
      suppressHydrationWarning
    >
      <head>
        <JsonLd schema={[personSchema(), localBusinessSchema(), webSiteSchema()]} />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
        {/* Provenance des leads (gclid, utm) memorisee des la premiere page vue */}
        <LeadSource />
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
