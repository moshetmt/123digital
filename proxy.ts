import { NextResponse, type NextRequest } from 'next/server'
import { prefereMarkdown } from './lib/negociation'

// Un agent qui envoie « Accept: text/markdown » reçoit la page en Markdown, servie par
// /api/markdown ; les navigateurs ne passent jamais ici (filtre sur l'en-tête Accept).
export function proxy(request: NextRequest) {
  if (!prefereMarkdown(request.headers.get('accept'))) return NextResponse.next()
  const cible = request.nextUrl.clone()
  cible.pathname = '/api/markdown'
  cible.search = ''
  // Le chemin d'origine passe par un en-tête : la route ne voit pas la query posée par un rewrite.
  const headers = new Headers(request.headers)
  headers.set('x-chemin-markdown', request.nextUrl.pathname + request.nextUrl.search)
  return NextResponse.rewrite(cible, { request: { headers } })
}

export const config = {
  matcher: [
    {
      // espace/ : la page privée de Moshé n'a pas de version Markdown (02/11).
      source: '/((?!_next/|api/|espace/|.*\\.[a-zA-Z0-9]+$).*)',
      has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
    },
  ],
}
