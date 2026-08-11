import puppeteer from 'puppeteer-core'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '..')

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL    = 'http://localhost:3001/fondateur'

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900  },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'mobile',  width: 375,  height: 812  },
]

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const results = []

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 })

    console.log(`→ ${vp.name} (${vp.width}×${vp.height}) …`)
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })

    // Scroll through the full page to trigger whileInView + GSAP ScrollTrigger
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    const step = Math.floor(vp.height * 0.6)
    for (let y = 0; y <= pageHeight; y += step) {
      await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), y)
      await new Promise(r => setTimeout(r, 280))
    }
    // Let final animation state settle (stay scrolled — don't scroll back up to avoid GSAP reverse)
    await new Promise(r => setTimeout(r, 800))

    const path = resolve(OUT_DIR, `fondateur-${vp.name}.png`)
    await page.screenshot({ path, fullPage: true })
    console.log(`  ✓ saved → ${path}`)
    results.push(path)

    await page.close()
  }

  await browser.close()
  console.log('\nAll screenshots saved:')
  results.forEach(p => console.log(' •', p))
}

run().catch(err => { console.error(err); process.exit(1) })
