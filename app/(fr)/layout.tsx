import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CallBar } from '@/components/layout/CallBar'

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header lang="fr" />
      <main>{children}</main>
      <Footer lang="fr" />
      <CallBar lang="fr" />
    </>
  )
}
