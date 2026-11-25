import type { Metadata, Viewport } from 'next'

/* Espace 123digital : appli de l'écran d'accueil. Le manifest et l'icône sont ceux de l'Espace,
   pas ceux du site (le manifest du site ouvrirait la page d'accueil dans Safari). Aucune
   indexation, aucun aperçu de partage, aucun référent envoyé. */

export async function generateMetadata({ params }: { params: Promise<{ cle: string }> }): Promise<Metadata> {
  const { cle } = await params
  return {
    title: { absolute: 'Espace 123digital' },
    description: null,
    robots: { index: false, follow: false, nocache: true },
    referrer: 'no-referrer',
    alternates: { canonical: null },
    openGraph: null,
    twitter: null,
    manifest: `/espace/${cle}/manifest`,
    icons: {
      icon: [{ url: '/espace/icone-192.png', sizes: '192x192', type: 'image/png' }],
      apple: [{ url: '/espace/icone-180.png', sizes: '180x180' }],
    },
    appleWebApp: { capable: true, title: 'Espace', statusBarStyle: 'default' },
    formatDetection: { telephone: false },
  }
}

export const viewport: Viewport = {
  themeColor: '#EAF3EE',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function EspaceLayout({ children }: { children: React.ReactNode }) {
  return children
}
