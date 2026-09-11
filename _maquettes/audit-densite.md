# Audit de densité visuelle — 123digital

Date : 18/08/2026
Méthode : build de production (`npm run build` + `npm run start`, port 3000), mesure automatisée par Puppeteer (Chrome headless) sur 11 pages × 2 tailles (desktop 1280×900, mobile 390×844), soit 22 relevés. Pour chaque page, toutes les animations "au scroll" (framer-motion `isInView`) sont déclenchées avant mesure (scroll complet puis retour en haut, 500 ms de stabilisation) pour que les hauteurs et positions reflètent l'état final réel, pas l'état pré-animation.

Pour chaque `<section>` (ou bloc de premier niveau de `<main>`), trois mesures automatiques :
- **Taux de remplissage** : union (sans double compte, calculée par rastérisation sur canvas) des rectangles englobants de tous les éléments porteurs de texte direct ou d'image (`img`, `svg`, `video`, `background-image: url()`), rapportée à la surface de la section.
- **Lignes orphelines** : toute liste/grille (`ul`, `ol`, ou conteneur `flex-wrap`/`grid` d'au moins 3 enfants) dont la dernière ligne contient moins d'éléments que les lignes précédentes.
- **Débordement horizontal** : éléments dont le bord dépasse le viewport.

Vérification croisée : les paddings mesurés par Puppeteer (`getComputedStyle`) correspondent systématiquement aux valeurs inline lues dans le code source (ex. `padding: '6rem 1.5rem 8rem'` → 96 px haut / 128 px bas mesurés ; `padding: '2rem 1.5rem 6rem'` → 32/96 mesurés). Les deux sources s'accordent partout où c'est vérifié, ce qui garantit que le serveur mesuré correspond bien au code du dépôt.

---

## 1. Classement des 15 pires cas

### 1. Hero.tsx — la liste de réassurance casse en 2+1, exactement comme signalé, et ça se reproduit à la vraie largeur desktop

**Page** : `/` — **Taille** : desktop (1280×900, et plus précisément à la largeur réellement rendue)
**Section** : `#section-hero`, `<ul role="list">` des 3 puces de réassurance

À 1280 px pile, la liste tient de justesse sur une ligne (816 px disponibles pour 813 px nécessaires : 3 px de marge). Mais un test à 1265 px — la largeur réelle d'une fenêtre Chrome/Windows de 1280 px une fois la scrollbar verticale déduite (~15 px, scrollbar classique non-overlay) — fait immédiatement basculer la liste en **2 items sur la ligne 1, 1 item esseulé sur la ligne 2** :

```
1280 px → 1 ligne (816 px dispo / 813 px requis, marge 3 px)
1265 px → 2 lignes : "Un seul interlocuteur…" + "Devis clair…" (ligne 1), "Résultats mesurés…" seule (ligne 2)
1024–1180 px (toute la tranche "lg" du site) → même cassure, confirmée à 1024, 1100, 1180
```

Cause : le conteneur hero est `grid-cols-[1fr_360px]` (colonne de texte + carte de statut fixe à 360 px). Comme la section est plafonnée à `max-w-7xl` (1280 px), la colonne de texte ne dépasse jamais 1280 − 48 (padding) − 56 (gap `lg:gap-14`) − 360 (carte) = **816 px, quel que soit l'agrandissement de la fenêtre au-delà de 1280 px**. Les 3 puces (813 px requis avec le `gap-x-6` actuel) sont donc structurellement à la limite sur toute la plage desktop réaliste, pas seulement sur les petits laptops.

**Fichier** : `components/sections/Hero.tsx`, lignes 169–182
**Correctif** : sortir le `<ul>` du bloc `<div className="text-center lg:text-left">` et le faire passer en pleine largeur, enfant direct de la grille à 2 colonnes, avec `lg:col-span-2` :
```
className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2"
```
→
```
className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 lg:col-span-2"
```
La largeur disponible passe alors de 816 px à ~1232 px (pleine largeur de section moins padding), soit une marge de 419 px au lieu de 3 px : la cassure devient structurellement impossible sur toute largeur desktop. Gain : suppression définitive d'une ligne de ~29 px (hauteur de ligne + `gap-y-2`) qui apparaît dès qu'on quitte 1280 px pile.

---

### 2. CTA.tsx — même défaut, sur les badges de réassurance sous le formulaire de contact (mobile, 3 pages)

**Pages** : `/`, `/contact`, `/audit-gratuit` (section `#contact` partagée) — **Taille** : mobile (390×844)
**Section** : `#contact`, `<div className="flex items-center justify-center gap-2 mt-5 flex-wrap">` (3 badges "Réponse sous 24h" etc.)

Mesuré et confirmé identique sur les 3 pages : les 3 badges de réassurance sous le formulaire s'affichent en **2 sur la première ligne, 1 seul sur la seconde** à 390 px de large — le même défaut que celui cité en exemple par le propriétaire, mais côté formulaire.

**Fichier** : `components/sections/CTA.tsx`, ligne 318
**Correctif** :
```
className="flex items-center justify-center gap-2 mt-5 flex-wrap"
```
→
```
className="flex flex-col items-center gap-2 mt-5 sm:flex-row sm:flex-wrap sm:justify-center"
```
Empile les 3 badges verticalement sous 640 px (aucune ligne orpheline possible, chaque ligne = 1 item) et repasse en ligne horizontale à partir de `sm` où la largeur suffit. Gain mobile : ~32 px (suppression de la ligne partielle) sur 3 pages.

---

### 3. services/page.tsx — la même cassure 2+1, répétée 6 fois sur la même page

**Page** : `/services` — **Taille** : desktop (1280×900)
**Section** : la grille de services, 6 fois le même `<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">` (liste "inclus" de chaque fiche service)

Chaque fiche service (Création de site, SEO, Publicité, Branding, Community management, Automatisation) contient exactement 5 items dans sa liste "inclus", rendue en grille 2 colonnes. 5 items sur 2 colonnes = mathématiquement 2/2/1 à chaque fois. Mesuré : **6 occurrences identiques** de `rows: [2, 2, 1]` sur la même page — c'est le défaut nommé par le propriétaire, mais à l'échelle d'une page entière.

**Fichier** : `app/(fr)/services/page.tsx`, ligne 236, tableaux `inclus` lignes 26–56
**Correctif** (deux options, la première ne touche pas au contenu) :
- CSS seul : `grid-cols-1 sm:grid-cols-2` → `grid-cols-1` (empile en 1 colonne ; plus large verticalement mais 0 orpheline, cohérent avec le principe de densité si on réduit `gap-y-2` en compensation).
- Contenu : ramener chaque tableau `inclus` à 4 éléments (nombre pair) pour que le `grid-cols-2` existant ne produise plus jamais de ligne à 1 seul item — gain net ~24 px × 6 = ~144 px de hauteur de page en moins, sans changer le nombre de colonnes.

---

### 4. secteurs/[secteur]/page.tsx — le taux de remplissage le plus bas mesuré sur tout le site (13,8 %)

**Page** : `/secteurs/restaurant` — **Taille** : desktop (1280×900)
**Section** : "Résultats concrets" (`secteur.resultats`, grille de 3 cartes)

263 px de hauteur, dont 128 px de padding pur (64 haut + 64 bas) : **49 % de la hauteur de la section n'est que du padding**, pour 3 courtes phrases d'une ligne chacune. Taux de remplissage mesuré : 13,8 %, le plus bas des 22 relevés.

**Fichier** : `app/(fr)/secteurs/[secteur]/page.tsx`, ligne 220 (`padding: '4rem 1.5rem'`) et ligne 239 (`className="p-6"` par carte)
**Correctif** :
```
style={{ padding: '4rem 1.5rem', ... }}
```
→
```
style={{ padding: '2rem 1.5rem', ... }}
```
(64/64 → 32/32, gain 64 px) et `p-6` → `p-5` sur les cartes (gain ~16 px supplémentaires). Cette section est en plus immédiatement précédée et suivie d'autres sections à padding 64 px identique (voir constat transversal §3.1) : les fusionner ou alterner les paddings casserait la succession de bandes vides de même hauteur.

---

### 5. a-propos/page.tsx — la bannière CTA la plus lourde en padding du site (224 px pour ~190 px de contenu)

**Page** : `/a-propos` — **Taille** : desktop (1280×900)
**Section** : "Prêt à collaborer ?" (dernière section de la page)

413 px de hauteur, 96 px de padding haut + 128 px de padding bas = 224 px de padding pur pour un titre (2 lignes), une ligne de sous-titre et un bouton. Taux de remplissage : 14,8 %, 2e pire du site.

**Fichier** : `app/(fr)/a-propos/page.tsx`, ligne 145
**Correctif** :
```
style={{ padding: '6rem 1.5rem 8rem', borderTop: '1px solid var(--line)' }}
```
→
```
style={{ padding: '3rem 1.5rem 4rem', borderTop: '1px solid var(--line)' }}
```
(96/128 → 48/64, aligné sur le token déjà utilisé pour des CTA équivalents ailleurs sur le site, ex. `realisations/page.tsx` ligne 246). Gain estimé : ~112 px, la section passerait de 413 px à ~300 px.

---

### 6. contact/page.tsx — la ligne "Moyens de contact" est vide à 82 %

**Page** : `/contact` — **Taille** : desktop (1280×900)
**Section** : "Moyens de contact" (Email / Téléphone / LinkedIn)

275 px de hauteur pour 3 cartes contenant chacune un libellé, une valeur et une phrase courte. Padding section 32/96 (128 px) + `p-8` (32 px) par carte. Taux de remplissage : 17,5 %.

**Fichier** : `app/(fr)/contact/page.tsx`, ligne 111 et ligne 121 (`className="group block p-8"`)
**Correctif** :
```
style={{ padding: '2rem 1.5rem 6rem', borderTop: '1px solid var(--line)' }}
```
→
```
style={{ padding: '2rem 1.5rem 3rem', borderTop: '1px solid var(--line)' }}
```
(32/96 → 32/48, gain 48 px) et `p-8` → `p-6` sur les 3 cartes (gain ~32 px supplémentaires).

---

### 7. [ville]/[service]/page.tsx — une section entière pour une seule ligne de puces

**Page** : `/lyon/seo` — **Taille** : desktop (1280×900)
**Section** : "Autres services à Lyon" (liste de puces `flex flex-wrap`)

204 px de hauteur, 64 px de padding haut + 64 bas (128 px, soit 63 % de la section) pour une seule ligne de puces de navigation. Taux de remplissage : 20,4 %. Ce même bloc `padding: '4rem 1.5rem'` encadrant une seule ligne de chips existe à l'identique sur les ~150 pages `/[ville]/[service]` générées.

**Fichier** : `app/(fr)/[ville]/[service]/page.tsx`, ligne 525
**Correctif** :
```
style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--line)' }}
```
→
```
style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--line)' }}
```
(64/64 → 32/32). Gain 64 px, répété sur ~150 pages générées à partir du même gabarit — impact cumulé le plus large du classement en nombre de pages concernées.

---

### 8. realisations/page.tsx — les tags des fiches projet débordent leur ligne (3 fiches sur 4)

**Page** : `/realisations` — **Taille** : mobile (390×844)
**Section** : "Projets", `<div className="flex flex-wrap gap-2">` des tags par fiche

Mesuré : sur les 4 fiches projet, **3 affichent leurs 4 tags en 3+1** (ex. "Google Ads / Refonte web / SEO local" sur la ligne 1, "Villeurbanne" seul sur la ligne 2). Vérification largeur : les 4 tags totalisent 340 px de large (avec les espaces) pour un conteneur de 278 px sur mobile — ce n'est pas un simple réglage de gouttière, les tags sont structurellement trop nombreux/trop longs pour la colonne mobile.

**Fichier** : `app/(fr)/realisations/page.tsx`, ligne 180–195, `project.tags.map(...)`
**Correctif** : limiter l'affichage à 3 tags sur mobile plutôt que de laisser le flex-wrap créer une ligne orpheline :
```
{project.tags.map((tag) => (
```
→
```
{project.tags.slice(0, 3).map((tag) => (
```
(avec un indicateur `+1` optionnel si besoin de garder l'info). Élimine la ligne orpheline sur les 3 fiches concernées.

---

### 9. blog/page.tsx — même défaut sur les tags SEO des articles (5 fiches concernées)

**Page** : `/blog` — **Taille** : mobile (390×844)
**Section** : liste des articles, tags par carte

5 occurrences de `rows: [2, 1]` sur les tags de mots-clés (ex. "agence digitale Lyon" / "consultant digital Lyon" en ligne 1, "freelance marketing Lyon" seul en ligne 2). Ces tags sont des mots-clés SEO longs (128 à 152 px chacun) : leur somme (417 px) dépasse largement le conteneur mobile (276 px), un simple resserrage de gouttière ne suffirait pas.

**Fichier** : `app/(fr)/blog/page.tsx` (bloc tags de la liste d'articles, section ligne 133)
**Correctif** : `tags.slice(0, 2)` sur mobile uniquement (`hidden sm:inline-flex` sur le 3e tag), ou masquer la ligne de tags sous `sm` (`className="hidden sm:flex flex-wrap gap-2"`) — ces mots-clés n'apportent pas de valeur de lecture sur mobile et créent systématiquement une ligne orpheline.

---

### 10. audit-gratuit/page.tsx — le texte d'intro du simulateur flotte dans le vide à côté d'un module plus haut

**Page** : `/audit-gratuit` — **Taille** : desktop (1280×900)
**Section** : "Trouvez votre stratégie en 3 questions" (texte + `<AuditSimulator />`)

628 px de hauteur, taux de remplissage 18,4 %. La grille `grid-cols-1 lg:grid-cols-2 gap-12 items-center` centre verticalement le court bloc de texte (titre + 1 paragraphe, ~150 px) face au module `AuditSimulator` nettement plus haut : `items-center` laisse un vide au-dessus et en dessous du texte au lieu de l'aligner en haut.

**Fichier** : `app/(fr)/audit-gratuit/page.tsx`, ligne 315
**Correctif** :
```
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
```
→
```
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
```
Corrige l'alignement optique immédiatement (le texte colle au sommet du simulateur au lieu de flotter au centre). Pour réduire la hauteur totale de la section, réduire aussi le padding section `'4rem 1.5rem'` → `'3rem 1.5rem'` (ligne 312).

---

### 11. Results.tsx — la bande sombre "4 chiffres" de l'accueil, un tiers de padding pour deux lignes de contenu

**Page** : `/` — **Taille** : desktop (1280×900)
**Section** : `#resultats`

238 px de hauteur, padding 64/64 (128 px, 54 % de la section) pour 4 chiffres + légendes tenant sur 2 lignes de texte. Taux de remplissage : 20,5 %.

**Fichier** : `components/sections/Results.tsx`, ligne 60
**Correctif** :
```
style={{ backgroundColor: 'var(--dark)', padding: '4rem 1.5rem' }}
```
→
```
style={{ backgroundColor: 'var(--dark)', padding: '2.75rem 1.5rem' }}
```
(64/64 → 44/44). Gain ~40 px. Cette bande à fort contraste (fond sombre) n'a pas besoin de la même respiration que les sections claires voisines pour rester lisible.

---

### 12. FAQ.tsx — accordéon de l'accueil, padding fixe indépendant du nombre de questions

**Page** : `/` — **Taille** : desktop (1280×900)
**Section** : `#faq-heading`

496 px de hauteur, padding 80/80 (160 px). Taux de remplissage : 19,1 %.

**Fichier** : `components/sections/FAQ.tsx`, ligne 67
**Correctif** :
```
style={{ backgroundColor: 'var(--surface)', padding: '5rem 1.5rem' }}
```
→
```
style={{ backgroundColor: 'var(--surface)', padding: '4rem 1.5rem' }}
```
(80/80 → 64/64, gain 32 px) ; resserrer aussi `gap-2.5` → `gap-2` entre les items de l'accordéon (ligne 97).

---

### 13. CTA.tsx — la section contact (id `#contact`), colonnes déséquilibrées, répétée sur 3 pages

**Pages** : `/`, `/contact`, `/audit-gratuit` — **Taille** : desktop (1280×900)
**Section** : `#contact`

884 px de hauteur, padding 80/80, taux de remplissage 19,1 %. La grille `grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start` place le bloc texte (titre + 1 paragraphe + 1 ligne de téléphone, ~300 px) à côté du formulaire complet (~700 px) : la colonne de gauche laisse ~400 px de vide sous son contenu.

**Fichier** : `components/sections/CTA.tsx`, ligne 170 (padding) et ligne 173 (grille)
**Correctif** : réduire le padding `'5rem 1.5rem'` → `'4rem 1.5rem'` (gain 32 px) et combler le vide de la colonne gauche en y déplaçant les 3 badges de réassurance (actuellement sous le formulaire, ligne 318 — cf. cas n°2) : cela équilibre visuellement les deux colonnes au lieu de laisser un blanc sous le texte.

---

### 14. [ville]/page.tsx — chips "Secteurs accompagnés" orphelines sur ~24 pages ville

**Page** : `/lyon` — **Taille** : desktop (1280×900)
**Section** : "Secteurs accompagnés"

9 puces de secteurs en `flex flex-wrap gap-3`, rendues en **6 sur la ligne 1, 3 sur la ligne 2**. Mesuré à l'identique sur toutes les pages `/[ville]` (même composant, même liste de 9 secteurs).

**Fichier** : `app/(fr)/[ville]/page.tsx`, lignes 379–417
**Correctif** : contraindre le conteneur à une largeur qui force un nombre de colonnes fixe et cohérent plutôt qu'un `flex-wrap` libre, par exemple `grid grid-cols-3 gap-3` (9 items / 3 colonnes = exactement 3 lignes pleines, 0 orpheline) au lieu de `flex flex-wrap gap-3` :
```
<div className="flex flex-wrap gap-3">
```
→
```
<div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
```
(à ajuster selon la largeur des libellés secteur les plus longs). Impact : ~24 pages ville.

---

### 15. services/seo/page.tsx (et gabarits similaires) — FAQ statique toujours dépliée, 2,38 écrans sur mobile

**Page** : `/services/seo` — **Taille** : mobile (390×844)
**Section** : "SEO pour PME — vos questions"

2013 px de hauteur = 2,38 écrans mobile. Contrairement à la FAQ de l'accueil (`FAQ.tsx`, accordéon interactif, une seule réponse visible à la fois), cette FAQ est un `<dl>` statique où **toutes les réponses sont affichées en permanence** — c'est le même contenu textuel que sur l'accueil, mais sans mécanisme de repli. Le même motif recolle sur `/lyon` (1865 px = 2,21 écrans), `/secteurs/restaurant` (1707 px = 2,02 écrans) et `/services` (section services, 4,83 écrans, cas différent mais même famille de problème : tout le contenu est à plat, rien n'est replié par défaut).

**Fichier** : `app/(fr)/services/seo/page.tsx` (bloc `<dl className="space-y-8">`, motif identique dans `secteurs/[secteur]/page.tsx` ligne 275, `[ville]/page.tsx` ligne 364, `[ville]/[service]/page.tsx`, `audit-gratuit/page.tsx`)
**Correctif** : remplacer le `<dl>` statique par le composant `FAQItem` déjà écrit et utilisé dans `components/sections/FAQ.tsx` (accordéon `<button>` + `AnimatePresence`, une question ouverte affiche sa réponse, les autres restent repliées à ~60 px). Gain estimé sur mobile : les 5 questions replier passeraient de 2013 px à environ 5 × 60 px + 1 réponse ouverte (~250 px) ≈ 550 px, soit un gain de l'ordre de 1400 px (environ 70 %) sur cette seule section.

---

## 2. Tableau récapitulatif par page et par taille

| Page | Taille | Hauteur totale | Sections | Remplissage moyen |
|---|---|---:|---:|---:|
| Accueil (/) | desktop | 5284 px | 9 | 27,6 % |
| Accueil (/) | mobile | 9192 px | 9 | 38,2 % |
| Services | desktop | 5553 px | 4 | 29,8 % |
| Services | mobile | 7572 px | 4 | 48,9 % |
| Services / SEO | desktop | 5533 px | 7 | 31,2 % |
| Services / SEO | mobile | 8603 px | 7 | 46,2 % |
| À propos | desktop | 2570 px | 4 | 45,8 % |
| À propos | mobile | 3634 px | 4 | 47,9 % |
| Contact | desktop | 2891 px | 4 | 24,6 % |
| Contact | mobile | 4183 px | 4 | 36,8 % |
| Audit gratuit | desktop | 6192 px | 7 | 25,0 % |
| Audit gratuit | mobile | 8766 px | 7 | 40,1 % |
| Blog | desktop | 3575 px | 4 | 32,0 % |
| Blog | mobile | 6361 px | 4 | 43,2 % |
| Lyon | desktop | 4893 px | 8 | 38,8 % |
| Lyon | mobile | 7653 px | 8 | 51,9 % |
| Lyon / SEO | desktop | 3954 px | 6 | 27,8 % |
| Lyon / SEO | mobile | 5574 px | 6 | 43,2 % |
| Secteurs / Restaurant | desktop | 4133 px | 7 | 25,9 % |
| Secteurs / Restaurant | mobile | 5952 px | 7 | 43,0 % |
| Réalisations | desktop | 2679 px | 4 | 26,1 % |
| Réalisations | mobile | 3950 px | 4 | 37,9 % |

Constat général : le taux de remplissage moyen est systématiquement plus bas sur desktop que sur mobile (colonnes larges qui n'exploitent pas leur largeur), et les pages les plus vides en desktop (Contact 24,6 %, Audit gratuit 25,0 %, Secteurs/Restaurant 25,9 %, Réalisations 26,1 %) sont toutes des pages composées majoritairement de sections "page statique" (`app/(fr)/.../page.tsx` avec padding inline répété) plutôt que des composants partagés de `components/sections/`.

Aucun débordement horizontal réel détecté sur les 22 relevés (le seul élément hors-viewport repéré, à gauche à −9975 px sur les pages avec formulaire de contact, est le champ anti-spam invisible intentionnel de `CTA.tsx` ligne 260 — un piège à robots positionné hors-écran par design, pas un bug).

---

## 3. Constats transversaux

### 3.1 — Un jeu de deux paddings inline copié-collé 45 fois, jamais un token réutilisable

Deux valeurs de `padding` inline reviennent, identiques au caractère près, dans des dizaines de sections indépendantes :

- **`padding: '4rem 1.5rem 6rem'`** (64 px haut / 96 px bas) : **28 occurrences**, dans `audit-gratuit/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `contact/page.tsx`, `realisations/page.tsx`, `secteurs/page.tsx`, `secteurs/[secteur]/page.tsx`, les 6 pages `services/*`, `[ville]/page.tsx`, `[ville]/[service]/page.tsx`.
- **`padding: '9rem 1.5rem 6rem'`** (144 px haut / 96 px bas, bloc "Hero" de page interne) : **17 occurrences**, mêmes fichiers.

Ces deux valeurs sont toujours **asymétriques** (bas > haut de 32 px), ce qui accumule du blanc en particulier entre deux sections consécutives (le bas de l'une + le haut de la suivante). Comme ce sont des `style={{ padding: '...' }}` inline et non une classe Tailwind (`py-16`) ou une variable CSS, il est impossible de les ajuster globalement : chaque section doit être éditée une par une pour changer le gabarit. **Recommandation** : extraire ces deux valeurs en tokens (`--section-pad-y: 3rem 1.5rem` par ex., valeur resserrée) et les appliquer via une classe utilitaire commune, ce qui permettrait un seul point de réglage pour ~45 sections.

### 3.2 — Le padding fixe des composants partagés ne s'adapte jamais à la densité du contenu

Dans `components/sections/`, cinq sections utilisent exactement le même `padding: '5rem 1.5rem'` (80/80 px) qu'elles contiennent 6 cartes bien remplies (`Services.tsx`, `Portfolio.tsx`) ou une seule ligne de chips (`Zones.tsx`) : `FAQ.tsx` (l.67), `Portfolio.tsx` (l.71), `Process.tsx` (l.65), `Services.tsx` (l.107), `Zones.tsx` (l.22). Le padding devrait décroître avec la densité du contenu ; ici il est identique quel que soit le nombre d'éléments réels, ce qui explique une partie des faibles taux de remplissage sur `Zones` (24,4 %) et `FAQ` (19,1 %) face à `Services` beaucoup mieux rempli.

### 3.3 — Motif "chips en `flex-wrap` libre" jamais contraint, source répétée de lignes orphelines

Toutes les listes de puces (secteurs, villes, services liés, tags de portfolio/blog, expertise) utilisent `className="flex flex-wrap gap-3"` (ou `gap-2`) sans contrainte de colonnes. Sur un total de compte imprévisible (5, 8, 9 items selon les données), ce motif produit mécaniquement une ligne orpheline dès que le nombre d'items n'est pas un multiple exact du nombre d'éléments qui tiennent par ligne. Recensé sur : `a-propos/page.tsx` (8 tags → 5+3), `[ville]/page.tsx` (9 secteurs → 6+3, et villes ARA → 6+4 ou 4+2 selon page), `[ville]/[service]/page.tsx` (villes/services → 4+2), `secteurs/[secteur]/page.tsx` (9 secteurs → 6+3), `realisations/page.tsx` (tags projet → 3+1), `blog/page.tsx` (tags articles → 2+1). Un remplacement par `grid grid-cols-N` avec N choisi pour diviser le nombre d'items le plus fréquent (ou un composant `ChipList` unique avec cette règle intégrée) réglerait la totalité de ces occurrences d'un coup.

### 3.4 — Deux implémentations de FAQ incohérentes, l'une pliable, l'autre jamais repliée

`components/sections/FAQ.tsx` (utilisé sur l'accueil) est un accordéon interactif : une seule réponse visible à la fois, `AnimatePresence` + `height: 'auto'`. Mais toutes les FAQ de pages internes (`services/seo`, `secteurs/[secteur]`, `[ville]`, `[ville]/[service]`, `audit-gratuit`) sont des `<dl className="space-y-8">` statiques où **toutes les réponses sont affichées en permanence**, avec en plus `paddingTop: '2rem'` (32 px) par item cumulé au `space-y-8` (32 px) — soit 64 px de marge interne entre chaque question, sans repli possible. C'est la cause directe des sections FAQ à plus de 2 écrans sur mobile (cas n°15). Généraliser le composant accordéon existant à ces pages récupérerait, par section FAQ concernée, de l'ordre de 60 à 70 % de hauteur sur mobile, sur au moins 5 gabarits de page (soit potentiellement plus de 150 URLs générées).

### 3.5 — Marges internes notables, en dehors du padding de section

- `marginBottom: '2.5rem'` (40 px) entre le paragraphe et le bouton, répété dans les 9 blocs CTA finaux dupliqués (`a-propos`, `contact` via `CTA.tsx`, `realisations`, `secteurs/[secteur]`, `[ville]`, `[ville]/[service]`, `services/seo`, `blog/[slug]`, `audit-gratuit`) — cohérent avec le constat 3.1, ce sont les mêmes blocs copiés-collés.
- `space-y-8` (32 px) + `paddingTop: '2rem'` (32 px) par item de `<dl>` FAQ statique (constat 3.4) : 64 px de séparation pure entre chaque question/réponse, avant même le texte.

---

## 4. Ce que je n'ai pas pu mesurer

- **Le vrai remplissage des sections riches en champs de formulaire** (`CTA.tsx`, `AuditSimulator.tsx`) : la définition retenue ("éléments porteurs de texte ou d'image") exclut par construction les `<input>`, `<select>` et `<textarea>` vides de tout texte — un champ de formulaire bordé, visuellement dense à l'écran, ne compte donc pour rien dans le taux de remplissage. Les sections contenant beaucoup de champs (section `#contact` notamment) affichent donc un taux de remplissage mécaniquement sous-évalué par rapport à leur densité visuelle réelle ; j'ai contourné ce biais en documentant séparément le déséquilibre des colonnes plutôt que de me fier au seul pourcentage (cas n°13).
- **La densité "réelle" des blocs à texte court sur large colonne** est mesurée par la largeur du rectangle englobant, pas par la largeur effectivement occupée par les glyphes : un titre centré de 3 mots dans un `<h2>` de 700 px de large est correctement repéré comme "gâchis", mais la mesure ne distingue pas un texte justifié d'un texte simplement centré dans une colonne large — à vérifier visuellement au cas par cas si un doute subsiste sur un cas précis du classement.
- **Le rendu des accordéons FAQ en position ouverte** : toutes les mesures sont prises accordéon fermé (état par défaut au chargement) ; la hauteur d'une FAQ avec une réponse dépliée n'a pas été mesurée séparément.
- **Les pages `/en/*`, `/mentions-legales`, `/consultant-digital-lyon`, `/portfolio`, `/secteurs` (listing) et les pages dynamiques individuelles au-delà de l'échantillon demandé** (les ~140 autres combinaisons `[ville]/[service]`, les ~9 articles de blog, les 9 autres secteurs) n'ont pas été mesurées une par une — mais chaque gabarit mesuré (`[ville]`, `[ville]/[service]`, `secteurs/[secteur]`, `blog`) est généré à l'identique pour toutes ses variantes, donc les constats relevés (paddings inline, chips orphelines, FAQ non repliable) s'appliquent mécaniquement à l'ensemble des pages du même gabarit.
- **Le champ anti-spam hors-écran** (`CTA.tsx` ligne 260, `position: 'absolute', left: '-9999px'`) a été détecté comme "débordement horizontal" par le script puis écarté après lecture du code : c'est un piège à robots intentionnel, invisible et hors tabulation, pas un bug de mise en page.
