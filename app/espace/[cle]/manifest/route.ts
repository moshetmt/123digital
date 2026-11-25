import { FORMAT_CLE, estDemo } from '@/lib/espace'

/* Manifest de l'appli « Espace » : propre à chaque clé, sinon l'icône ouvrirait l'accueil du site.
   start_url et scope portent la clé, affichage plein écran sans barre Safari. */

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: Promise<{ cle: string }> }) {
  const { cle } = await params
  if (!FORMAT_CLE.test(cle) && !estDemo(cle)) return new Response('Introuvable', { status: 404 })
  const base = `/espace/${cle}`
  const manifest = {
    id: base,
    name: 'Espace 123digital',
    short_name: 'Espace',
    description: 'Décisions, idées, opportunités et chantiers de 123digital.',
    lang: 'fr',
    start_url: base,
    scope: base,
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#EAF3EE',
    theme_color: '#EAF3EE',
    icons: [
      { src: '/espace/icone-180.png', sizes: '180x180', type: 'image/png' },
      { src: '/espace/icone-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/espace/icone-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
