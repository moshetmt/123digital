/**
 * Regenere favicon.ico, icon.png et apple-touch-icon.png depuis la source
 * vectorielle de la charte v2 (favicon.svg, tuile 64px fond #00713D).
 *
 * sharp ne sait pas ecrire de .ico : on rend les PNG requis puis on assemble
 * le conteneur ICO nous-memes (format "PNG-in-ICO", supporte depuis Vista,
 * lu par tous les navigateurs actuels). Pas de nouvelle dependance.
 *
 *   node _maquettes/charte-v2/build-favicons.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, statSync } from 'node:fs'

const SOURCE_SVG =
  'C:/projet site/ads-os/clients/123digital/00-brief/charte-graphique/logo/favicon.svg'
const OUT_DIR = 'C:/projet site/123digital/public'
const VERT_600 = '#00713D'

const svg = readFileSync(SOURCE_SVG)

// --- favicon.ico : 16 / 32 / 48, tuile arrondie transparente hors du rect ---
function buildIco(images) {
  const count = images.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type = icon
  header.writeUInt16LE(count, 4)

  const dirEntries = []
  let offset = 6 + 16 * count
  for (const { size, buffer } of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // color palette
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(buffer.length, 8) // taille des donnees
    entry.writeUInt32LE(offset, 12) // offset
    dirEntries.push(entry)
    offset += buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buffer)])
}

const icoSizes = [16, 32, 48]
const icoImages = []
for (const size of icoSizes) {
  const buffer = await sharp(svg, { density: 600 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer()
  icoImages.push({ size, buffer })
}
writeFileSync(`${OUT_DIR}/favicon.ico`, buildIco(icoImages))
console.log('favicon.ico       ', icoSizes.join('/') + 'px', statSync(`${OUT_DIR}/favicon.ico`).size, 'o')

// --- icon.png : 512, meme tuile transparente (PWA / icone generique) ---
await sharp(svg, { density: 600 })
  .resize(512, 512)
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/icon.png`)
console.log('icon.png          ', '512x512', statSync(`${OUT_DIR}/icon.png`).size, 'o')

// --- apple-touch-icon.png : 180, coins carres, fond plein (iOS arrondit lui-meme) ---
const svgCoinsCarres = svg.toString('utf8').replace(/rx="13"/, 'rx="0"')
await sharp(Buffer.from(svgCoinsCarres), { density: 600 })
  .resize(180, 180)
  .flatten({ background: VERT_600 })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/apple-touch-icon.png`)
console.log('apple-touch-icon.png', '180x180', statSync(`${OUT_DIR}/apple-touch-icon.png`).size, 'o')
