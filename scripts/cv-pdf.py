"""CV PDF de Maurice Timsit (FR et EN), tires des memes donnees que /portfolio.

    python scripts/cv-pdf.py            -> public/cv-maurice-timsit-fr.pdf et -en.pdf

Les textes viennent de data/cv.ts, data/portfolio.ts et lib/avis-google.ts (lus par
`npx tsx`), donc le PDF ne contredit jamais la page. A4 portrait, logo 123digital et
nom en grand en tete, portrait rond (regle de Moshe du 27/10 sur les documents).
"""
import base64, json, os, subprocess, sys, asyncio, html
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

TXT = {
    'fr': dict(services=['Création de site', 'Référencement Google', 'Google Ads', 'IA & automatisation'], apropos='À propos',
               avis='sur Google', avisN='avis', crea='créations', creaD='sites, stories et reels', real='Réalisations',
               design='Designs & vidéos', designT='Stories et reels pour Habad Étudiants Lyon', voir='Portfolio en ligne',
               perso='Personnalité', page='Page'),
    'en': dict(services=['Websites', 'Google SEO', 'Google Ads', 'AI automation'], apropos='About',
               avis='on Google', avisN='reviews', crea='pieces', creaD='websites, stories and reels', real='Work',
               design='Designs & videos', designT='Stories and reels for Habad Étudiants Lyon', voir='Online portfolio',
               perso='Personality', page='Page'),
}


def page_html(d, loc):
    c = d['cv'][loc]; t = TXT[loc]; idt = c['identity']; avis = d['avis']
    metier = idt['role'].split(' · ')[0]
    url_pf = 'https://123digital.fr/portfolio' if loc == 'fr' else 'https://123digital.fr/en/portfolio'
    n_crea = len(d['ecrans']) + len(d['designs'])

    tete = f'''<header class="tete"><img class="logo" src="{LOGO}"><span class="url">{e(url_pf.replace('https://', ''))}</span></header>'''

    def poste(it):
        ctx = f'<p class="ctx">{e(it["context"])}</p>' if it.get('context') else ''
        puces = ''.join(f'<li>{e(b)}</li>' for b in it['bullets'])
        return f'''<article class="poste{' actuel' if it is c['experience']['items'][0] else ''}"><div class="p-tete"><div><h3>{e(it["role"])}</h3><p class="org">{e(it["org"])}</p></div>
        <p class="per">{e(it["period"])}</p></div>{ctx}<ul>{puces}</ul></article>'''

    items = c['experience']['items']
    exp = ''.join(poste(it) for it in items[:3])  # page 1 : les trois postes en cours
    exp2 = ''.join(poste(it) for it in items[3:])  # page 2 : les postes termines

    sites = ''
    for p in d['projects']:
        if not any(s['id'] == p['id'] for s in d['ecrans']):
            continue
        tx = c['work'].get('projects', {}).get(p['id'], {})
        sites += f'''<article class="site"><h3><a href="{e(p["url"])}">{e(p["title"])}</a></h3><p class="org">{e(tx.get("sector", p["sector"]))}</p>
        <p>{e(tx.get("description", p["description"]))}</p><p class="res">{e(tx.get("results", p["results"]))}</p>
        <p class="lien"><a href="{e(p["url"])}">{e(p["url"].replace("https://", ""))}</a></p></article>'''

    forma = ''.join(
        f'''<li><b>{e(i["degree"])}</b> · {e(i["school"])} <span class="per">{e(i["period"])}</span>{f'<br><span class="det">{e(i["detail"])}</span>' if i.get("detail") else ''}</li>'''
        for i in c['education']['items'])
    langues = ' · '.join(f'{e(l["name"])} <b>{e(l["level"])}</b>' for l in c['education']['languages'])
    intro = c['intro']
    traits = ' · '.join(e(x) for x in intro.get('traits', []))
    designs = ' · '.join(e(x['titre'].split(' · ')[-1]) for x in d['designs'])

    return f'''<!doctype html><html lang="{loc}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<style>
@font-face{{font-family:Switzer;src:url({SWITZER}) format('woff2');font-weight:100 900}}
@page{{size:A4;margin:0}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:Switzer,sans-serif;color:#1C2620;font-size:9.6pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
a{{color:inherit;text-decoration:none}}
.feuille{{width:210mm;height:297mm;padding:13mm 15mm 12mm;position:relative;overflow:hidden;page-break-after:always;display:flex;flex-direction:column}}
.feuille:last-child{{page-break-after:auto}}
.tete{{display:flex;justify-content:space-between;align-items:center;padding-bottom:4mm;border-bottom:1.2pt solid #00713D}}
.logo{{height:9mm}} .url{{font-size:8.4pt;font-weight:600;color:#00713D}}
.hero{{display:flex;gap:7mm;align-items:center;margin-top:7mm}}
.hero img{{width:34mm;height:34mm;border-radius:50%;object-fit:cover;object-position:50% 18%}}
h1{{font-family:'Rethink Sans';font-size:30pt;font-weight:800;letter-spacing:-.025em;line-height:1;color:#131814}}
.metier{{font-size:11pt;font-weight:600;margin-top:1.6mm}} .pitch{{color:#4A5A50;margin-top:1.2mm;max-width:118mm}}
.contacts{{display:flex;flex-wrap:wrap;gap:1.5mm 5mm;margin-top:2.6mm;font-size:8.8pt;font-weight:600}}
.contacts span{{color:#00713D}}
.pills{{display:flex;flex-wrap:wrap;gap:2mm;margin-top:6mm}}
.pills span{{font-size:8.6pt;font-weight:600;border:0.8pt solid #CFE0D6;background:#F1F7F3;border-radius:20mm;padding:1.4mm 3.6mm}}
.chiffres{{display:grid;grid-template-columns:1fr 1fr;gap:4mm;margin-top:5mm}}
.case{{border-radius:5mm;padding:4mm 5mm;background:#131814;color:#F2F7F4}}
.case.claire{{background:#EAF3EE;color:#131814}}
.case b{{font-family:'Rethink Sans';font-size:22pt;font-weight:800;color:#6FB791;margin-right:2mm}} .case.claire b{{color:#00713D}}
h2{{font-family:'Rethink Sans';font-size:10pt;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#00713D;margin:6.5mm 0 2.6mm}}
.apropos{{font-size:10pt;color:#2A362E}} .traits{{margin-top:2mm;font-size:8.8pt;color:#4A5A50}} .traits b{{color:#00713D}}
.poste{{border-left:1.6pt solid #CFE0D6;padding:0 0 0 4.5mm;margin-bottom:3.6mm;break-inside:avoid}}
.poste.actuel{{border-left-color:#00713D}}
.p-tete{{display:flex;justify-content:space-between;gap:4mm}}
h3{{font-family:'Rethink Sans';font-size:10.6pt;font-weight:700;color:#131814;line-height:1.25}}
.org{{color:#00713D;font-weight:600;font-size:9pt}} .per{{font-size:8pt;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#6B7C71;white-space:nowrap}}
.ctx{{font-style:italic;color:#5A6A60;margin-top:1mm}}
.poste ul{{list-style:none;margin-top:1.2mm}} .poste li{{padding-left:3.2mm;position:relative;margin-top:.6mm}}
.poste li:before{{content:'';position:absolute;left:0;top:2.1mm;width:1.3mm;height:1.3mm;border-radius:50%;background:#6FB791}}
.sites{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4mm}}
.site{{border:0.8pt solid #DCE8E1;border-radius:4mm;padding:3.6mm 4mm;font-size:8.8pt}}
.site .res{{margin-top:1.4mm;font-weight:600;color:#131814}} .site .lien{{margin-top:1.6mm;color:#00713D;font-weight:600;font-size:8.2pt}}
.design{{font-size:9pt;color:#2A362E}}
.forma{{list-style:none}} .forma li{{margin-bottom:1.8mm}} .det{{color:#4A5A50;font-size:8.8pt}}
.pied{{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:8pt;color:#6B7C71;padding-top:3mm;border-top:0.6pt solid #DCE8E1}}
.pied b{{color:#131814;font-size:9pt}}
</style></head><body>
<section class="feuille">{tete}
  <div class="hero"><img src="{PORTRAIT}"><div>
    <h1>{e(idt["name"])}</h1><p class="metier">{e(metier)} · {e(idt["location"])}</p><p class="pitch">{e(idt["pitch"])}</p>
    <p class="contacts"><a href="mailto:{e(idt["email"])}"><span>✉</span> {e(idt["email"])}</a><a href="{e(idt["phoneHref"])}"><span>☎</span> {e(idt["phone"])}</a>
    <a href="{e(idt["linkedin"])}"><span>in</span> LinkedIn</a></p></div></div>
  <div class="pills">{''.join(f'<span>{e(s)}</span>' for s in t["services"])}</div>
  <div class="chiffres"><div class="case"><b>{e(avis["note"])}</b>{t["avis"]} · {avis["nombre"]} {t["avisN"]}</div>
    <div class="case claire"><b>{n_crea}</b>{t["crea"]} · {t["creaD"]}</div></div>
  <h2>{t["apropos"]}</h2><p class="apropos">{e(intro["body"])}</p>
  <p class="traits"><b>{e(intro.get("traitsProfile", ""))}</b> · {traits} <i>({e(intro.get("traitsSource", ""))})</i></p>
  <h2>{e(c["experience"]["heading"])}</h2>{exp}
  <footer class="pied"><b>{e(idt["name"])}</b><span>{t["page"]} 1 / 2</span></footer>
</section>
<section class="feuille">{tete}
  {f'<h2>{e(c["experience"]["heading"])}</h2>' + exp2 if exp2 else ''}
  <h2>{t["real"]}</h2><div class="sites">{sites}</div>
  <h2>{t["design"]}</h2><p class="design"><b>{t["designT"]}</b> : {designs}. <a href="https://www.instagram.com/chabadoncampuslyon/" style="color:#00713D;font-weight:600">instagram.com/chabadoncampuslyon</a></p>
  <h2>{e(c["education"]["heading"])}</h2><ul class="forma">{forma}</ul>
  <h2>{e(c["education"]["languagesLabel"])}</h2><p>{langues}</p>
  <h2>{t["voir"]}</h2><p><a href="{url_pf}" style="color:#00713D;font-weight:700;font-size:11pt">{url_pf.replace("https://", "")}</a></p>
  <footer class="pied"><b>{e(idt["name"])}</b><span>{t["page"]} 2 / 2</span></footer>
</section></body></html>'''


async def rendre(d):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for loc in ('fr', 'en'):
            pg = await b.new_page()
            await pg.set_content(page_html(d, loc), wait_until='networkidle')
            await pg.wait_for_timeout(500)
            sortie = os.path.join(PUB, f'cv-maurice-timsit-{loc}.pdf')
            await pg.pdf(path=sortie, format='A4', print_background=True, prefer_css_page_size=True)
            print(sortie)
        await b.close()


if __name__ == '__main__':
    asyncio.run(rendre(donnees()))
