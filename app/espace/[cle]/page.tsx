import { FORMAT_CLE, estDemo } from '@/lib/espace'
import { EspaceApp } from './EspaceApp'

/* /espace/<clé>/ : l'Espace 123digital de Moshé (02/11). La clé reste dans l'adresse, comme
   pour le suivi Clim69 : l'icône de l'écran d'accueil la garde, une appli installée n'a pas
   de cookies. Les données arrivent côté client par /api/espace. */

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ cle: string }> }) {
  const { cle } = await params
  if (!FORMAT_CLE.test(cle) && !estDemo(cle)) {
    return (
      <main className="mx-auto max-w-[480px] px-6 py-16 text-[17px]" style={{ color: 'var(--ink)' }}>
        <h1 className="text-[22px] font-extrabold">Lien invalide</h1>
        <p className="mt-3">Ouvre l’Espace depuis le lien que Claude t’a donné.</p>
      </main>
    )
  }
  return <EspaceApp cle={cle} demo={estDemo(cle)} />
}
