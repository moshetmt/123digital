/**
 * Compose l'image de partage (Open Graph) de la charte v2 : logotype +
 * signature a gauche, titre, "ecran reconstruit" simplifie a droite avec le
 * curseur du logo. Aucun dégradé, aucune ombre (charte section 6/9).
 *
 * Écrit la source SVG dans ce dossier, rend le PNG 1200x630 avec sharp.
 *
 *   node _maquettes/charte-v2/build-og-image.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs'

const LOGO_DIR = 'C:/projet site/ads-os/clients/123digital/00-brief/charte-graphique/logo'
const SVG_OUT = 'C:/projet site/123digital/_maquettes/charte-v2/og-image.svg'
// Chemin reellement lu par le site (layout.tsx, lib/schema.ts, lib/seo.ts,
// app/(fr)/blog/[slug]/page.tsx pointent tous vers /images/og-image.png, pas
// vers /og-image.png a la racine de public/ — voir le rapport de l'agent).
const PNG_OUT = 'C:/projet site/123digital/public/images/og-image.png'

const VERT_600 = '#00713D'
const ENCRE_950 = '#131814'
const ENCRE_800 = '#123F27'
const VERT_100 = '#EAF3EE'
const VERT_200 = '#CDE6D8'
const ALERTE = '#C9401C'

// --- Recupere le logotype + signature depuis signature-conseil.svg -------
const signatureRaw = readFileSync(`${LOGO_DIR}/signature-conseil.svg`, 'utf8')
const signatureInner = signatureRaw
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .trim()

// --- Recupere le trace du curseur depuis favicon.svg ----------------------
const faviconRaw = readFileSync(`${LOGO_DIR}/favicon.svg`, 'utf8')
const cursorMatch = faviconRaw.match(/<path d="([^"]+)" fill="#131814" stroke="#fff"[^/]*\/>/)
if (!cursorMatch) throw new Error('Curseur introuvable dans favicon.svg')
const CURSOR_D = cursorMatch[1]

// Signature : viewBox source 0 0 273 80, mise a l'echelle pour un logotype de 360px.
const SIGNATURE_SCALE = 360 / 273

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFFFF"/>

  <!-- Logotype + signature "CONSULTANT DIGITAL · LYON" -->
  <g transform="translate(64,110) scale(${SIGNATURE_SCALE.toFixed(6)})">
${signatureInner}
  </g>

  <!-- Titre -->
  <text x="64" y="340" xml:space="preserve" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="44">
    <tspan x="64" dy="0" fill="${ENCRE_950}">Vos clients vous</tspan>
    <tspan x="64" dy="58" fill="${ENCRE_950}">cherchent sur </tspan><tspan fill="${VERT_600}">Google</tspan><tspan fill="${ENCRE_950}">.</tspan>
    <tspan x="64" dy="58" fill="${ENCRE_950}">Faites-vous trouver.</tspan>
  </text>

  <!-- Ecran reconstruit -->
  <clipPath id="ecranClip">
    <rect x="696" y="140" width="440" height="300" rx="4"/>
  </clipPath>

  <g clip-path="url(#ecranClip)">
    <rect x="696" y="140" width="440" height="300" fill="#FFFFFF"/>
    <rect x="696" y="140" width="440" height="28" fill="${VERT_100}"/>
    <text x="712" y="158" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="${ENCRE_800}">google.fr &#183; plombier villeurbanne</text>

    <text x="716" y="210" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${VERT_600}">Dépannage plomberie 24h/24</text>
    <text x="716" y="284" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${VERT_600}">Plombier agréé, devis gratuit</text>

    <rect x="704" y="316" width="424" height="56" fill="${VERT_100}"/>
    <text x="716" y="350" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${VERT_600}">Votre plomberie ici</text>
    <text x="1124" y="350" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${ALERTE}">Page 3.</text>
  </g>
  <rect x="696" y="140" width="440" height="300" rx="4" fill="none" stroke="${VERT_200}" stroke-width="1"/>

  <!-- Curseur du logo, incline 12°, pose sur la 3e ligne -->
  <path d="${CURSOR_D}" fill="${ENCRE_950}" stroke="#FFFFFF" stroke-width="1.6"
        transform="translate(1108,298) rotate(12) scale(1.8) translate(-34,-3)"/>
</svg>
`

mkdirSync('C:/projet site/123digital/_maquettes/charte-v2', { recursive: true })
writeFileSync(SVG_OUT, svg)
console.log('source SVG        ', SVG_OUT, statSync(SVG_OUT).size, 'o')

mkdirSync('C:/projet site/123digital/public/images', { recursive: true })
await sharp(Buffer.from(svg), { density: 300 })
  .resize(1200, 630)
  .flatten({ background: '#FFFFFF' })
  .png({ compressionLevel: 9 })
  .toFile(PNG_OUT)
console.log('og-image.png      ', PNG_OUT, '1200x630', statSync(PNG_OUT).size, 'o')
