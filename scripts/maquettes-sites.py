"""Maquettes des réalisations (cadre navigateur + téléphone sur fond pâle, 1600x1000) à partir des sites EN LIGNE.

    python scripts/maquettes-sites.py        -> public/images/realisations/<id>-maquette.webp

À relancer dès qu'un site client change (Moshé, 27/10 : « je vois encore l'image de Clim69 d'avant »).
"""
import asyncio, io, os
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFilter

RACINE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SORTIE = os.path.join(RACINE, 'public', 'images', 'realisations')
SITES = {'clim69': 'https://clim69.fr', 'mishpacha-tours': 'https://mishpachatours.com', 'aplusaudition': 'https://aplusaudition.fr'}
CACHE_COOKIES = """
[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],[aria-label*=cookie i],#axeptio_overlay,.cky-consent-container{display:none!important}
"""


async def capture(pg, url, w, h, scale):
    await pg.set_viewport_size({'width': w, 'height': h})
    await pg.goto(url, wait_until='networkidle', timeout=60000)
    # bandeaux de cookies des sites clients : on refuse, comme un visiteur
    for texte in ['Continuer sans accepter', 'Tout refuser', 'Refuser', 'REFUSE', 'Refuse', 'Decline']:
        try:
            await pg.get_by_role('button', name=texte, exact=True).first.click(timeout=800); break
        except Exception:
            try:
                await pg.get_by_text(texte, exact=True).first.click(timeout=500); break
            except Exception:
                pass
    await pg.add_style_tag(content=CACHE_COOKIES)
    await pg.wait_for_timeout(2500)
    # filet de sécurité : tout bloc fixe qui parle de cookies, d'audience ou de consentement disparaît
    await pg.evaluate("""() => { for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if ((cs.position === 'fixed' || cs.position === 'sticky') && /cookie|consent|audience|accepter|accord/i.test(el.innerText || '') && el.innerText.length < 600) el.style.display = 'none' } }""")
    await pg.wait_for_timeout(300)
    return Image.open(io.BytesIO(await pg.screenshot())).convert('RGB')


def arrondi(im, r):
    m = Image.new('L', im.size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), r, fill=255)
    return m


def composer(bureau, tel):
    W, H = 1600, 1000
    fond = Image.new('RGB', (W, H), (232, 240, 234))
    # navigateur : barre à trois points + capture 1440x900 réduite à 1180 de large
    bw = 1180; bh = int(bureau.height * bw / bureau.width)
    nav = Image.new('RGB', (bw, bh + 34), 'white'); d = ImageDraw.Draw(nav)
    d.rectangle((0, 0, bw, 34), fill=(225, 235, 228))
    for i, c in enumerate([(70, 160, 110), (120, 190, 150), (170, 215, 185)]):
        d.ellipse((14 + i * 20, 11, 26 + i * 20, 23), fill=c)
    nav.paste(bureau.resize((bw, bh), Image.LANCZOS), (0, 34))
    x0, y0 = 60, 70
    ombre = Image.new('L', (W, H), 0); ImageDraw.Draw(ombre).rounded_rectangle((x0, y0 + 10, x0 + bw, y0 + 10 + nav.height), 18, fill=70)
    fond.paste((180, 200, 188), (0, 0), ombre.filter(ImageFilter.GaussianBlur(18)))
    fond.paste(nav, (x0, y0), arrondi(nav, 18))
    # téléphone : capture 390x844 dans un cadre noir arrondi
    tw = 300; th = int(tel.height * tw / tel.width)
    cadre = Image.new('RGB', (tw + 20, th + 20), (17, 17, 17))
    ecran = tel.resize((tw, th), Image.LANCZOS)
    cadre.paste(ecran, (10, 10), arrondi(ecran, 30))
    tx, ty = W - tw - 120, H - th - 70
    ombre = Image.new('L', (W, H), 0); ImageDraw.Draw(ombre).rounded_rectangle((tx, ty + 14, tx + cadre.width, ty + 14 + cadre.height), 40, fill=110)
    fond.paste((150, 175, 160), (0, 0), ombre.filter(ImageFilter.GaussianBlur(20)))
    fond.paste(cadre, (tx, ty), arrondi(cadre, 40))
    return fond


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for nom, url in SITES.items():
            pg = await b.new_page()
            bureau = await capture(pg, url, 1440, 900, 1)
            await pg.close()
            c = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
            pt = await c.new_page()
            tel = await capture(pt, url, 390, 844, 2)
            await c.close()
            out = os.path.join(SORTIE, f'{nom}-maquette.webp')
            composer(bureau, tel).save(out, quality=84)
            if nom == 'clim69':  # étape « Aujourd'hui » du journal de l'étude de cas : le site tel qu'il est
                bureau.save(os.path.join(SORTIE, 'clim69.webp'), quality=84)
            print(out)
        await b.close()

asyncio.run(main())
