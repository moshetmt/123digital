import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { languesPour } from '@/data/hreflang'
import { CTA } from '@/components/sections/CTA'
import { PageHeroEn } from '@/components/sections/PageHeroEn'

export const metadata: Metadata = {
  title: 'Blog — Digital Growth Tips | 123 Digital Lyon',
  description: 'Articles and guides on SEO, web design, online advertising and digital strategy for SMEs.',
  // 🔴 Cette page GARDE son noindex, contrairement au reste de /en.
  // Les 9 articles de data/blog.ts sont tous en francais : un index
  // anglais qui ne liste que des articles francais est une coquille.
  // A rouvrir le jour ou un article est traduit, en ajoutant en meme
  // temps la paire ['/blog', '/en/blog'] dans data/hreflang.ts.
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE_URL}/en/blog`,
    ...languesPour('/en/blog'),
  },
}

export default function BlogPageEN() {
  return (
    <>
      <PageHeroEn
        kicker="Blog"
        title="Guides and articles, in French for now"
        intro="The articles are written in French and translated one by one. In the meantime, the free 30-minute audit answers the same questions, live."
      />
      {/* Formulaire — composant unique CTA.tsx, partage par tout le site */}
      <CTA lang="en" />
    </>
  )
}
