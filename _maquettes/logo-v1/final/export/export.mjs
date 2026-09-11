/**
 * Export du logo 123digital depuis les SVG de reference.
 *
 * ⚠️ LE JPG NE GERE PAS LA TRANSPARENCE. C'est une limite du format, pas un
 * reglage : un JPG a toujours un fond opaque. Pour un logo detoure, il faut du
 * PNG (ou du WebP, ou le SVG lui-meme). Les JPG produits ici sont donc sur fond
 * blanc, pour les cas ou un JPG est impose.
 *
 * La source est vectorielle : on peut re-exporter a n'importe quelle taille
 * sans perte. Ne jamais agrandir un PNG existant, relancer ce script.
 *
 *   node _maquettes/logo-v1/final/export/export.mjs
 */
import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ICI = dirname(fileURLToPath(import.meta.url))
const SOURCES = join(ICI, '..')
const SORTIE = ICI

const VARIANTES = [
  { fichier: 'logo.svg', nom: 'logo-123digital', jpg: true },
  { fichier: 'logo-fond-sombre.svg', nom: 'logo-123digital-fond-sombre', jpg: false },
  { fichier: 'logo-nb.svg', nom: 'logo-123digital-noir-et-blanc', jpg: true },
]

const LARGEURS = [600, 1200, 2400]

mkdirSync(SORTIE, { recursive: true })

for (const v of VARIANTES) {
  let svg
  try {
    svg = readFileSync(join(SOURCES, v.fichier))
  } catch {
    console.log(`  ABSENT  ${v.fichier}`)
    continue
  }

  for (const largeur of LARGEURS) {
    const png = join(SORTIE, `${v.nom}-${largeur}px.png`)
    await sharp(svg, { density: 600 })
      .resize({ width: largeur })
      .png({ compressionLevel: 9 })
      .toFile(png)
    console.log(`  PNG transparent  ${v.nom}-${largeur}px.png`)
  }

  if (v.jpg) {
    // Fond blanc explicite : sans `flatten`, sharp rendrait le transparent en
    // noir dans un JPG, ce qui donne un logo sur pave noir.
    const jpg = join(SORTIE, `${v.nom}-1200px-fond-blanc.jpg`)
    await sharp(svg, { density: 600 })
      .resize({ width: 1200 })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
      .toFile(jpg)
    console.log(`  JPG fond blanc   ${v.nom}-1200px-fond-blanc.jpg`)
  }
}

console.log('\nTermine.')
