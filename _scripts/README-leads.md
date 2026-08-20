# Système de leads — 123digital

Même principe que Clim69 : chaque soumission du formulaire crée une ligne dans un
Google Sheet, avec la page et la provenance publicitaire, plus des colonnes de
suivi commercial à droite.

## Le trajet d'un lead

1. `components/sections/CTA.tsx` — formulaire unique, présent sur les 27 pages
   commerciales. Une modification ici s'applique partout.
2. `lib/lead-source.ts` + `components/analytics/LeadSource.tsx` — mémorisent
   `gclid` / `utm_*` dès la première page vue (localStorage, 90 jours, le dernier
   clic payant écrase le précédent).
3. `app/api/contact/route.ts` — valide, puis écrit en parallèle vers deux
   destinations indépendantes : le Sheet et un email Resend. Si l'une tombe,
   l'autre part quand même.
4. `_scripts/leads-webhook.gs` — Apps Script déployé en application web, écrit la
   ligne dans « 123digital - LEADS » et recalcule l'onglet Tableau de bord.

## Colonnes du Sheet

`Date · Prénom · Nom · Email · Téléphone · Site web · Besoin · Message · Page ·
Source · Statut · Montant € HT · Date signature · Prêt pour Ads · Atterrissage`

`Page` est la page où le formulaire a été rempli, `Atterrissage` la page d'arrivée
sur le site quand elle diffère. Deux colonnes plutôt qu'une chaîne composite :
sinon le regroupement « pages qui convertissent » compterait `/contact` et
`/contact (arrivée : /lyon)` comme deux pages distinctes.

`Statut`, `Montant € HT`, `Date signature` et `Prêt pour Ads` se remplissent à la
main : `Statut` est une liste déroulante
(Nouveau, Contacté, RDV pris, Devis envoyé, Signé, Perdu) et `Prêt pour Ads` une
case à cocher, pour repérer les leads à remonter en conversions hors ligne vers
Google Ads.

L'onglet Tableau de bord affiche le total, les 7 et 30 derniers jours, les
signatures et le CA signé en cartes, puis les leads par jour, par besoin et par
page, avec un histogramme et un anneau.

## Mise en forme

`styliserLeads()` pose toute l'apparence de l'onglet Leads : en-tête vert de la
charte figé, trois premières colonnes figées, lignes alternées, statuts colorés
par mise en forme conditionnelle, filtre sur l'en-tête, formats de date et de
montant. La fonction est relançable : chaque élément est remplacé, jamais
empilé. Elle tourne à l'installation via `setupSheet()`, et couvre les 1000
lignes du classeur, donc les leads suivants héritent du style sans traitement.

## Installation du webhook (une fois)

Projet Apps Script déjà créé et rempli :
https://script.google.com/home/projects/1BQ5D_AVfLsuJrA-_yxnpUldBGzSZpCLx3PBjpHqsCrsJxBTFIZxa9X0F/edit

Il reste trois étapes, toutes dans ce projet :

1. Menu déroulant des fonctions → `setupSheet` → **Exécuter**. Google demande
   l'autorisation : *Autoriser l'accès* → choisir le compte → *Paramètres
   avancés* → *Accéder à … (non sécurisé)* → *Autoriser*. Le Sheet reçoit ses
   en-têtes et son onglet Tableau de bord.
2. **Déployer** → *Nouveau déploiement* → roue dentée → *Application web*.
   Exécuter en tant que : **moi**. Qui a accès : **Tout le monde**. Déployer.
3. Copier l'URL qui finit par `/exec`.

La propriété de script `SHARED_SECRET` est déjà renseignée.

## Variables d'environnement

Dans `.env.local` (dev) **et** dans Vercel (production) :

```
SHEETS_WEBHOOK_URL=<l'URL .../exec copiée à l'étape 3>
SHEETS_WEBHOOK_SECRET=<la même valeur que SHARED_SECRET côté Apps Script>
RESEND_API_KEY=<clé Resend>
CONTACT_TO=mochetimsit@gmail.com
```

Sans `SHEETS_WEBHOOK_URL`, la route journalise l'absence et le lead part
uniquement par email. Sans les deux, elle répond 502 et le formulaire affiche son
message d'erreur.

## Modifier le script plus tard

Après édition du code dans l'éditeur Apps Script : **Déployer** → *Gérer les
déploiements* → crayon → Version : *Nouvelle version* → *Déployer*. L'URL ne
change pas.
