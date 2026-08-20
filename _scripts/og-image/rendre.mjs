// Rend og-image.html en PNG de 1200 sur 630 dans public/images/og-image.png.
// Voir LISEZMOI.md.
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ici = dirname(fileURLToPath(import.meta.url))
const sortie = join(ici, '..', '..', 'public', 'images', 'og-image.png')

const navigateur = await chromium.launch({ channel: 'chrome', headless: true })
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto('file:///' + join(ici, 'og-image.html').split('\').join('/'))
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(700)

if (!(await page.evaluate(() => document.fonts.check('800 74px "Plus Jakarta Sans"')))) {
  throw new Error('Plus Jakarta Sans absente : rendu annule, l image sortirait dans la mauvaise police')
}

await page.screenshot({ path: sortie })
console.log('ecrit : ' + sortie)
await navigateur.close()
