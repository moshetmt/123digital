# Image de partage (Open Graph)

`public/images/og-image.png` est fabriquee a partir de `og-image.html`, rendu au
navigateur en 1200 sur 630. Le HTML reprend la police, les couleurs et le logo du
site : modifier la charte et regenerer suffit, il n'y a pas de fichier de
retouche a maintenir a cote.

Avant le 20/08/2026 cette image etait un SVG. Aucun reseau social ne lit ce
format : WhatsApp, LinkedIn, Facebook, X et Slack affichaient le titre, la
description, et un rectangle vide. Elle portait en plus la charte sombre
abandonnee. Ne pas repasser au SVG, ni ici ni dans les donnees structurees de
`lib/schema.ts`, ou Google demande aussi une image matricielle.

## Regenerer

```
npm install playwright        # les navigateurs sont deja en cache local
node rendre.mjs               # depuis ce dossier
```

Le rendu attend `document.fonts.ready` avant la capture : sans cette attente,
Plus Jakarta Sans n'est pas encore la et l'image sort dans la police par defaut.

Apres remplacement, LinkedIn et Facebook gardent l'ancienne vignette en cache.
Les forcer a relire la page : Post Inspector chez LinkedIn, Sharing Debugger
chez Facebook.
