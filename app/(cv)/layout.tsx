/**
 * Groupe de routes du CV interactif : /portfolio et /en/portfolio.
 *
 * Volontairement hors des layouts `(fr)` et `en`, qui montent le Header
 * commercial, le Footer et la CallBar « audit gratuit ». Un recruteur n'a rien
 * a faire dans un tunnel de vente : cette page n'a que sa propre barre.
 */
export default function CvLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
