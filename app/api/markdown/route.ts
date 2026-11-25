import type { NextRequest } from 'next/server'
import { htmlVersMarkdown, markdown404 } from '@/lib/markdown'

// Cible du proxy pour « Accept: text/markdown » : relit la page en HTML sur le site même,
// puis la rend en Markdown. Une page absente rend un 404 en Markdown.

function reponse(corps: string, status: number, canonique?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'text/markdown; charset=utf-8',
    Vary: 'Accept',
    'Cache-Control': status === 200 ? 'public, s-maxage=3600, stale-while-revalidate=86400' : 'public, s-maxage=300',
    'X-Robots-Tag': 'noindex',
  }
  if (canonique) headers.Link = `<${canonique}>; rel="canonical"`
  return new Response(corps, { status, headers })
}

export async function GET(request: NextRequest) {
  const origine = request.nextUrl.origin
  const chemin = request.headers.get('x-chemin-markdown') ?? '/'
  const url = new URL(chemin.startsWith('/') && !chemin.startsWith('//') ? chemin : '/', origine)
  if (url.origin !== origine) return reponse(markdown404(chemin, origine), 404)

  const page = await fetch(url, { headers: { Accept: 'text/html' }, cache: 'no-store' })
  if (page.status === 404) return reponse(markdown404(url.pathname, origine), 404)
  if (!page.ok) return reponse(`# Erreur ${page.status}\n\nLa page ${url.href} n'a pas pu être lue.\n`, page.status)
  return reponse(htmlVersMarkdown(await page.text(), page.url || url.href), 200, page.url || url.href)
}
