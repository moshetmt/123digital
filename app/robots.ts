import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/schema'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 🔴 `/en/` A ETE RETIRE LE 20/08. Il annulait tout le travail fait sur
        // la version anglaise : on avait retire le `noindex` et pose un hreflang
        // reciproque sur 6 paires, mais ce `Disallow` empechait Google de
        // seulement LIRE ces pages. Une page bloquee ici ne peut pas etre
        // indexee, et un hreflang qui pointe vers elle est ignore.
        // ⛔ Ne pas le remettre sans repasser `/en` en `noindex` ET
        // `EN_INDEXABLE` a `false` dans `data/hreflang.ts` : les trois doivent
        // toujours dire la meme chose.
        // ⚠️ `/_next/` reste bloque par habitude, mais Google a besoin du CSS et
        // du JS pour rendre la page. Laisse tel quel tant que rien ne prouve un
        // probleme de rendu, c'est le comportement d'origine du site.
        disallow: ['/api/', '/_next/'],
      },
      // Les robots des moteurs generatifs sont autorises explicitement plutot
      // que par defaut. Constat du 20/08 : aucun n'etait nomme, donc autorise
      // implicitement. L'ecrire noir sur blanc evite qu'une regle large posee
      // plus tard les coupe sans qu'on s'en rende compte.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
