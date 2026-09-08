import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/schema'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CallBar } from '@/components/layout/CallBar'
import { languesPour } from '@/data/hreflang'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '123 Digital Lyon · Digital Growth Expert for SMEs',
    // Meme correctif que le layout francais : les pages /en finissent deja par
    // « | 123 Digital » ou « | 123 Digital Lyon », ce gabarit en rajoutait un
    // second. Le title de /en/services faisait 93 caracteres dont la marque
    // deux fois. Ne pas y remettre de suffixe.
    template: '%s',
  },
  description:
    'Maurice Timsit, digital consultant based in Lyon: SEO, web design, online advertising and automation for SMEs. Free 30-min audit, no commitment.',
  alternates: {
    canonical: `${BASE_URL}/en`,
    ...languesPour('/en'),
  },
  // 🔴 LE `noindex` GLOBAL A ÉTÉ RETIRÉ LE 19/08, sur décision de l'opérateur.
  // Il portait la mention « exclues de l'index pour éviter la cannibalisation
  // des pages FR ». La crainte était fondée, la réponse ne l'était pas : ce qui
  // empêche deux versions linguistiques de se cannibaliser, c'est précisément
  // le `hreflang`, qui dit à Google laquelle servir à qui. Le `noindex` réglait
  // le symptôme en supprimant la page.
  // Prérequis remplis avant de le retirer, dans cet ordre : un `h1` et une
  // introduction propres sur les 4 pages qui n'en avaient pas, puis
  // `EN_INDEXABLE` passé à `true` dans `data/hreflang.ts`, qui active les
  // 6 paires réciproques.
  // ⚠️ `/en/blog` garde son `noindex` a lui : ses 9 articles sont en francais.
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header lang="en" />
      <main>{children}</main>
      <Footer lang="en" />
      <CallBar lang="en" />
    </>
  )
}
