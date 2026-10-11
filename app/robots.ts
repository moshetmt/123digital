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
        // 🔴 `/_next/` A ETE RETIRE LE 11/10. Google applique la regle la plus
        // longue : `Disallow: /_next/` l'emportait sur `Allow: /` et lui
        // interdisait le CSS, le JS et les images servies par `/_next/image`
        // (blocage verifie avec Protego le 11/10). Google doit pouvoir charger
        // ces fichiers pour rendre la page et indexer les images.
        // ⛔ Ne pas le remettre. Seul `/api/` reste bloque.
        disallow: ['/api/'],
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
