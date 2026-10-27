"""Captures pleine page des modèles de page de 123digital.fr, puis planches lisibles (agent gardien-vitrine).

    python scripts/verif_pages.py [url_de_base] [dossier_sortie] [--pc]

Par défaut : l'aperçu de la branche portfolio-v2, sur téléphone (390 px) ; --pc = ordinateur (1440 px).
Jamais de page /audit/<domaine> (faux mail « Audit ouvert ») ; /api/audit-vu est bloqué par sécurité.
"""
import asyncio, os, sys
from playwright.async_api import async_playwright
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
ARGS = [a for a in sys.argv[1:] if not a.startswith('--')]
PC = '--pc' in sys.argv
B = ARGS[0] if ARGS else 'https://123digital-git-portfolio-v2-123digital-s-projects.vercel.app'
D = ARGS[1] if len(ARGS) > 1 else os.path.join(os.environ.get('TEMP', '.'), 'verif-123digital' + ('-pc' if PC else ''))
os.makedirs(D, exist_ok=True)
PAGES = ['/', '/services', '/services/seo', '/services/creation-site-web', '/realisations', '/realisations/clim69',
         '/secteurs', '/secteurs/restaurant', '/problemes', '/problemes/avis-google-negatif-ou-faux-que-faire',
         '/blog', '/blog/seo-local-pme-guide-complet', '/a-propos', '/contact', '/audit-gratuit',
         '/consultant-digital-lyon', '/consultant-ia-lyon', '/consultant-seo-lyon', '/referencement-ia',
         '/lyon', '/portfolio', '/en']


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        if PC:
            c = await b.new_context(viewport={'width': 1440, 'height': 900})
        else:
            c = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1, is_mobile=True, has_touch=True)
        await c.add_init_script("try{localStorage.setItem('consentement-cookies','refuse')}catch(e){}")
        await c.route('**/api/audit-vu**', lambda r: r.abort())
        pg = await c.new_page()
        for u in PAGES:
            nom = (u.strip('/').replace('/', '_') or 'accueil')
            try:
                await pg.goto(B + u, wait_until='networkidle', timeout=60000)
                await pg.wait_for_timeout(1200)
                await pg.evaluate("window.scrollTo(0, document.body.scrollHeight)"); await pg.wait_for_timeout(800)
                await pg.evaluate("window.scrollTo(0, 0)"); await pg.wait_for_timeout(300)
                f = os.path.join(D, nom + '.png')
                await pg.screenshot(path=f, full_page=True)
                im = Image.open(f).convert('RGB')
                if PC:
                    im = im.resize((720, im.height // 2))
                # planche : la page découpée en colonnes de 1600 px de haut, côte à côte
                h = 1600; cols = [im.crop((0, y, im.width, min(im.height, y + h))) for y in range(0, im.height, h)]
                pl = Image.new('RGB', (len(cols) * (im.width + 12), h), '#777')
                for i, col in enumerate(cols):
                    pl.paste(col, (i * (im.width + 12), 0))
                pl.save(os.path.join(D, nom + '-planche.jpg'), quality=72)
                print('OK', u, im.height, len(cols), flush=True)
            except Exception as e:
                print('ERREUR', u, e, flush=True)
        await b.close()
    print('FIN', D)

asyncio.run(main())
