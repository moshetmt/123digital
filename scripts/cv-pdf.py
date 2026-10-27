"""CV PDF de Maurice Timsit (FR et EN), tires des memes donnees que /portfolio.

    python scripts/cv-pdf.py            -> public/cv-maurice-timsit-fr.pdf et -en.pdf

Les textes viennent de data/cv.ts, data/portfolio.ts, data/telephone.ts et
lib/avis-google.ts (lus par `npx tsx`), donc le PDF ne contredit jamais la page.
UNE seule page A4 portrait (Moshe, 27/10 : « c'est une seule page »), logo 123digital
et nom en grand en tete, portrait rond, drapeaux et emoji comme sur la page.
"""
import base64, json, os, subprocess, asyncio, html, urllib.parse
from playwright.async_api import async_playwright

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.abspath(os.path.join(ICI, '..'))
PUB = os.path.join(RACINE, 'public')


def donnees():
    tmp = os.path.join(RACINE, '_cv_dump.ts')
    open(tmp, 'w', encoding='utf-8').write(
        "import { cvContent } from './data/cv'\nimport { AVIS_GOOGLE } from './lib/avis-google'\n"
        "import { projects } from './data/portfolio'\nimport { ecrans, designs } from './data/telephone'\n"
        "console.log(JSON.stringify({ cv: cvContent, avis: AVIS_GOOGLE, projects, ecrans, designs }))\n")
    try:
        out = subprocess.run('npx -y tsx _cv_dump.ts', cwd=RACINE, shell=True, capture_output=True, check=True).stdout
    finally:
        os.remove(tmp)
    return json.loads(out.decode('utf-8'))


def b64(chemin, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(chemin, 'rb').read()).decode()


e = html.escape
SWITZER = b64(os.path.join(RACINE, 'app', 'fonts', 'Switzer-Variable.woff2'), 'font/woff2')
LOGO = b64(os.path.join(PUB, 'images', 'logo.svg'), 'image/svg+xml')
PORTRAIT = b64(os.path.join(PUB, 'images', 'maurice-timsit-portrait-sombre.jpg'), 'image/jpeg')
DRAPEAUX = {'Français': '🇫🇷', 'French': '🇫🇷', 'Anglais': '🇬🇧', 'English': '🇬🇧', 'Hébreu': '🇮🇱', 'Hebrew': '🇮🇱'}
EMOJI = '💻🔎📈🤖🇫🇷🇬🇧🇮🇱✉☎'

TXT = {
    'fr': dict(services=[('💻', 'Création de site'), ('🔎', 'Référencement Google'), ('📈', 'Google Ads'), ('🤖', 'IA & automatisation')],
               contact='Contact', apropos='À propos', avis='sur Google', avisN='avis', crea='créations', creaD='sites, stories, reels',
               real='Réalisations', design='Designs & vidéos', designT='Stories et reels pour Habad Étudiants Lyon', perso='Personnalité',
               services_t='Services'),
    'en': dict(services=[('💻', 'Websites'), ('🔎', 'Google SEO'), ('📈', 'Google Ads'), ('🤖', 'AI automation')],
               contact='Contact', apropos='About', avis='on Google', avisN='reviews', crea='pieces', creaD='websites, stories, reels',
               real='Work', design='Designs & videos', designT='Stories and reels for Habad Étudiants Lyon', perso='Personality',
               services_t='Services'),
}


def page_html(d, loc):
    c = d['cv'][loc]; t = TXT[loc]; idt = c['identity']; avis = d['avis']; intro = c['intro']
    metier = idt['role'].split(' · ')[0]
    url_pf = 'https://123digital.fr/portfolio' if loc == 'fr' else 'https://123digital.fr/en/portfolio'
    n_crea = len(d['ecrans']) + len(d['designs'])
    premier = c['experience']['items'][0]

    exp = ''
    for it in c['experience']['items']:
        puces = ''.join(f'<li>{e(b)}</li>' for b in it['bullets'])
        exp += f'''<article class="poste{' actuel' if it is premier else ''}"><div class="p-tete"><h3>{e(it["role"])} <span class="org">· {e(it["org"])}</span></h3>
        <p class="per">{e(it["period"])}</p></div><ul>{puces}</ul></article>'''

    sites = ''
    for p in d['projects']:
        if not any(s['id'] == p['id'] for s in d['ecrans']):
            continue
        tx = c['work'].get('projects', {}).get(p['id'], {})
        sites += f'''<li><a href="{e(p["url"])}"><b>{e(p["title"])}</b></a> <span class="org">· {e(tx.get("sector", p["sector"]))}</span><br>
        {e(tx.get("results", p["results"]))} <a class="lien" href="{e(p["url"])}">{e(p["url"].replace("https://", ""))}</a></li>'''

    forma = ''.join(
        f'''<li><b>{e(i["degree"])}</b><br>{e(i["school"])} · {e(i["period"])}{f'<br><span class="det">{e(i["detail"])}</span>' if i.get("detail") else ''}</li>'''
        for i in c['education']['items'])
    langues = ''.join(f'<li><span class="emoji">{DRAPEAUX.get(l["name"], "")}</span> {e(l["name"])} <b>{e(l["level"])}</b></li>' for l in c['education']['languages'])
    services = ''.join(f'<li><span class="emoji">{em}</span> {e(s)}</li>' for em, s in t['services'])
    traits = ' · '.join(e(x) for x in intro.get('traits', []))
    designs = ' · '.join(e(x['titre'].split(' · ')[-1]) for x in d['designs'])
    font_emoji = 'https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap&text=' + urllib.parse.quote(EMOJI)

    return f'''<!doctype html><html lang="{loc}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<link href="{font_emoji}" rel="stylesheet">
<style>
@font-face{{font-family:Switzer;src:url({SWITZER}) format('woff2');font-weight:100 900}}
@page{{size:A4;margin:0}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:Switzer,sans-serif;color:#1C2620;font-size:8.4pt;line-height:1.38;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
a{{color:inherit;text-decoration:none}} ul{{list-style:none}}
.emoji{{font-family:'Noto Color Emoji','Apple Color Emoji',sans-serif;font-size:1.05em}}
.feuille{{width:210mm;height:297mm;padding:10mm 12mm 9mm;display:flex;flex-direction:column;overflow:hidden}}
.tete{{display:flex;justify-content:space-between;align-items:center;padding-bottom:3mm;border-bottom:1.2pt solid #00713D}}
.logo{{height:8mm}} .url{{font-size:8pt;font-weight:700;color:#00713D}}
.hero{{display:flex;gap:6mm;align-items:center;margin-top:5mm}}
.hero img{{width:27mm;height:27mm;border-radius:50%;object-fit:cover;object-position:50% 18%}}
h1{{font-family:'Rethink Sans';font-size:27pt;font-weight:800;letter-spacing:-.025em;line-height:1;color:#131814}}
.metier{{font-size:10.4pt;font-weight:600;margin-top:1.4mm}} .pitch{{color:#4A5A50;margin-top:1mm;font-size:9pt}}
.corps{{display:grid;grid-template-columns:57mm 1fr;gap:7mm;margin-top:5mm;flex:1;min-height:0;overflow:hidden}}
.cote{{background:#F1F7F3;border-radius:5mm;padding:4.5mm 4.5mm}}
h2{{font-family:'Rethink Sans';font-size:8.6pt;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#00713D;margin:0 0 1.8mm}}
.cote h2{{margin-top:4.2mm}} .cote h2:first-child{{margin-top:0}} .main h2{{margin-top:3.8mm}} .main h2:first-child{{margin-top:0}}
.cote li{{margin-bottom:1.1mm}} .ligne li{{display:inline-block;margin-right:2.6mm}}
.chip li{{display:inline-block;background:#fff;border:0.7pt solid #CFE0D6;border-radius:20mm;padding:1mm 2.6mm;margin:0 1mm 1.4mm 0;font-weight:600;font-size:8pt}}
.case{{border-radius:3.5mm;padding:2.6mm 3.4mm;background:#131814;color:#F2F7F4;margin:3.4mm 0 1.8mm;font-size:8pt}}
.case + .case{{margin-top:0}}
.case.claire{{background:#fff;color:#131814}}
.case b{{font-family:'Rethink Sans';font-size:16pt;font-weight:800;color:#6FB791;margin-right:1.6mm}} .case.claire b{{color:#00713D}}
.det{{color:#4A5A50}}
.poste{{border-left:1.4pt solid #CFE0D6;padding-left:3.6mm;margin-bottom:2.6mm}} .poste.actuel{{border-left-color:#00713D}}
.p-tete{{display:flex;justify-content:space-between;gap:3mm;align-items:baseline}}
h3{{font-family:'Rethink Sans';font-size:9.4pt;font-weight:700;color:#131814;line-height:1.25}}
.org{{color:#00713D;font-weight:600}} .per{{font-size:7.2pt;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#6B7C71;white-space:nowrap}}
.poste li{{padding-left:2.8mm;position:relative;margin-top:.4mm}}
.poste li:before{{content:'';position:absolute;left:0;top:1.75mm;width:1.1mm;height:1.1mm;border-radius:50%;background:#6FB791}}
.sites li{{margin-bottom:1.8mm}} .lien{{color:#00713D;font-weight:600;font-size:7.6pt;margin-left:1mm}}
.apropos{{font-size:8.6pt;color:#2A362E}}
.pied{{margin-top:3mm;display:flex;justify-content:space-between;align-items:center;font-size:7.6pt;color:#6B7C71;padding-top:2.4mm;border-top:0.6pt solid #DCE8E1}}
.pied b{{color:#131814}} .pied a{{color:#00713D;font-weight:700}}
</style></head><body>
<section class="feuille">
  <header class="tete"><img class="logo" src="{LOGO}"><a class="url" href="{url_pf}">{e(url_pf.replace('https://', ''))}</a></header>
  <div class="hero"><img src="{PORTRAIT}"><div>
    <h1>{e(idt["name"])}</h1><p class="metier">{e(metier)} · {e(idt["location"])}</p><p class="pitch">{e(idt["pitch"])}</p></div></div>
  <div class="corps">
    <aside class="cote">
      <h2>{t["contact"]}</h2><ul>
        <li><a href="mailto:{e(idt["email"])}"><span class="emoji">✉</span> {e(idt["email"])}</a></li>
        <li><a href="{e(idt["phoneHref"])}"><span class="emoji">☎</span> {e(idt["phone"])}</a></li>
        <li><a href="{e(idt["linkedin"])}"><b style="color:#0A66C2">in</b> linkedin.com/in/mauricetimsit</a></li></ul>
      <div class="case"><b>{e(avis["note"])}</b>{t["avis"]} · {avis["nombre"]} {t["avisN"]}</div>
      <div class="case claire"><b>{n_crea}</b>{t["crea"]} · {t["creaD"]}</div>
      <h2>{t["services_t"]}</h2><ul>{services}</ul>
      <h2>{e(c["education"]["heading"])}</h2><ul>{forma}</ul>
      <h2>{e(c["education"]["languagesLabel"])}</h2><ul class="ligne">{langues}</ul>
      <h2>{t["perso"]}</h2><p><b style="color:#00713D">{e(intro.get("traitsProfile", ""))}</b> · {traits}</p>
      <p class="det" style="font-size:7pt;margin-top:.8mm">{e(intro.get("traitsSource", ""))}</p>
    </aside>
    <main class="main">
      <h2>{t["apropos"]}</h2><p class="apropos">{e(intro["body"])}</p>
      <h2>{e(c["experience"]["heading"])}</h2>{exp}
      <h2>{t["real"]}</h2><ul class="sites">{sites}</ul>
      <h2>{t["design"]}</h2><p><b>{t["designT"]}</b> : {designs}. <a class="lien" href="https://www.instagram.com/chabadoncampuslyon/">instagram.com/chabadoncampuslyon</a></p>
    </main>
  </div>
  <footer class="pied"><b>{e(idt["name"])} · 123digital</b><a href="{url_pf}">{e(url_pf.replace('https://', ''))}</a></footer>
</section></body></html>'''


async def rendre(d):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for loc in ('fr', 'en'):
            pg = await b.new_page()
            await pg.set_content(page_html(d, loc), wait_until='networkidle')
            await pg.evaluate('document.fonts.ready')
            await pg.wait_for_timeout(500)
            # contrôle : une seule page, rien ne déborde des deux colonnes
            deborde = await pg.evaluate("(() => { const c = document.querySelector('.corps'); return [...c.children].some(m => m.scrollHeight > c.clientHeight + 1) })()")
            sortie = os.path.join(PUB, f'cv-maurice-timsit-{loc}.pdf')
            await pg.pdf(path=sortie, format='A4', print_background=True, prefer_css_page_size=True)
            print(sortie, 'DEBORDE' if deborde else 'ok')
        await b.close()


if __name__ == '__main__':
    asyncio.run(rendre(donnees()))
