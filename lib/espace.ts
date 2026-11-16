/* Espace 123digital (02/11/2026) : l'outil de pilotage de Moshé, sur son téléphone.
   La page /espace/<clé>/ parle à /api/espace, qui relaie vers l'Apps Script de la feuille
   « 123digital · Espace » (projet autonome, source dans ads-os :
   clients/123digital/03-website/apps-script-espace/). L'Apps Script vérifie la clé : ce dépôt
   public ne la connaît pas. Côté PC fixe, scripts/espace_sync.py relie la feuille aux fichiers
   d'ads-os (bras droit, journal des trouvailles, opportunités, tâches de nuit). */

export const ENDPOINT_ESPACE =
  'https://script.google.com/macros/s/AKfycbyUBrrgAa8MVwXI3dWMF8oqWX41crWO2bmE8VsUWXprnI95LejZpnbZZfsD4u7kJyc/exec'

/* Clé = 48 caractères hexadécimaux (secrets.token_hex(24)). « demo » sert aux captures, avec
   des données fictives, et n'existe pas en production. */
export const FORMAT_CLE = /^[0-9a-f]{48}$/
export const estDemo = (cle: string) => cle === 'demo' && process.env.VERCEL_ENV !== 'production'

export type Option = { lettre: string; texte: string; recommande: boolean }
export type Decision = {
  id: string
  gravite: string
  question: string
  options: Option[]
  source: string
  reponse: string
  reponduLe: string
}
export type Idee = {
  id: string
  date: string
  trouvaille: string
  metier: string
  source: string
  verdict?: string
  statut: string
  resultat: string
  commentaire: string
  reponse: string
  /* Agent qui a trouvé l'idée (colonne « veille » du journal des trouvailles) : veille-metiers, veille-ia, github-quotidien. */
  veille?: string
  repondu_le?: string
}
export type Opportunite = {
  id: string
  date: string
  quoi: string
  montant: string
  action: string
  quand: string
  statut: string
  origine: string
}
export type Chantier = { id: string; titre: string; etat: string; lien: string; reponse?: string; repondu_le?: string; question?: string }
export type TacheNuit = { id: string; tache: string; fait: string; lien: string; origine: string; ajoute_le: string }
/* Carte « Cette nuit » (02/11) : la section EN CLAIR de bilan/nuit.md, écrite par l'agent de nuit. */
export type BilanNuit = { titre: string; lignes: string[]; maj: string }
/* Un robot qui pilote les Ads d'un client (09/11) : une ligne par client, remplacée à chaque passage.
   en_clair = 3 lignes séparées par « / » (ce qui va, ce qui ne va pas, le budget). */
export type Robot = {
  date: string
  slug: string
  client: string
  etat: string // vert | orange | rouge
  en_clair: string
  depense: string
  projection: string
  plafond: string
  decision_id: string
  rapport: string
}
/* Une étude (16/11) : un fichier docs/espace-etudes/*.json d'ads-os. La feuille garde une ligne par étude,
   le fichier entier dans la colonne « json » ; la page le relit avec lireEtude. */
export type PointEtude = { titre: string; ou?: string; gravite?: string; reparation?: string; image?: string }
export type LotEtude = { titre: string; etat?: string; resume?: string; points?: PointEtude[] }
export type Etude = {
  id: string
  date: string
  client: string
  titre: string
  en_clair: string
  cause?: string
  chiffres?: { valeur: string; libelle: string }[]
  decisions?: string[]
  lots?: LotEtude[]
  limites?: string
  rapport?: string
}
export type EtudeLigne = { id: string; date: string; client: string; titre: string; json: string }
export function lireEtude(l: EtudeLigne): Etude | null {
  try {
    const e = JSON.parse(l.json)
    return e && typeof e === 'object' && e.id && e.titre ? (e as Etude) : null
  } catch {
    return null
  }
}

export type Donnees = {
  ok: boolean
  error?: string
  maj: string
  decisions: Decision[]
  idees: Idee[]
  opportunites: Opportunite[]
  chantiers: Chantier[]
  nuit: TacheNuit[]
  bilanNuit?: BilanNuit | null
  robots?: Robot[]
  etudes?: EtudeLigne[]
}

/* Actions permises depuis le téléphone. export et import restent réservés au PC (autre clé). */
export const ACTIONS = ['donnees', 'repondre', 'idee', 'opp_ajout', 'opp_statut', 'nuit_ajout', 'chantier', 'message'] as const

const opt = (lettre: string, texte: string, recommande = false): Option => ({ lettre, texte, recommande })

/* Données fictives de démonstration : rien de réel, aucun nom de client. */
export const DEMO: Donnees = {
  ok: true,
  maj: '2026-11-02T07:12',
  decisions: [
    { id: 'd1', gravite: 'grave', question: 'Mettre en ligne la nouvelle page de prise de rendez-vous ?', options: [opt('A', 'Oui, cette semaine', true), opt('B', 'Attendre le bilan du mois')], source: 'rapport du 01/11', reponse: '', reponduLe: '' },
    { id: 'd2', gravite: 'utile', question: 'Passer le bilan du lundi à 8 h au lieu de 7 h ?', options: [opt('A', 'Oui', true), opt('B', 'Non, garder 7 h')], source: 'bras droit', reponse: '', reponduLe: '' },
    { id: 'd4', gravite: 'grave', question: 'Monter le site à la dernière version du framework ?', options: [opt('A', 'Oui, sur préversion', true), opt('B', 'Attendre')], source: 'veille/2026-11-03-veille-metiers.md', reponse: '', reponduLe: '' },
    { id: 'd5', gravite: 'utile', question: 'Suivre les nouveaux outils vidéo chaque semaine ?', options: [opt('A', 'Oui', true), opt('B', 'Non')], source: 'veille/2026-11-02-veille-ia.md', reponse: '', reponduLe: '' },
    { id: 'pilote-demo-20261108-A', gravite: 'utile', question: 'Client A : campagne A 25 → 30 €/j ?', options: [opt('A', 'Oui', true), opt('B', 'Non')], source: 'clients/demo/04-ads-data/pilote/dernier-passage.md', reponse: '', reponduLe: '' },
    { id: 'd3', gravite: 'utile', question: 'Garder la veille des outils vidéo chaque mardi ?', options: [opt('A', 'Oui', true), opt('B', 'Une fois par mois')], source: 'veille du 28/10', reponse: 'A', reponduLe: '2026-11-01T21:40' },
  ],
  idees: [
    { id: 'i1', date: '2026-11-01', trouvaille: 'Scanner de sécurité des skills', metier: 'outillage', source: 'GitHub', verdict: 'a-mettre', statut: 'à essayer', resultat: '', commentaire: 'Vérifie les skills avant installation', reponse: '', veille: 'github-quotidien' },
    { id: 'i5', date: '2026-11-03', trouvaille: 'Modèle local plus rapide pour trier les photos', metier: 'local', source: 'changelog', verdict: 'a-surveiller', statut: 'à essayer', resultat: '', commentaire: 'Gain estimé : 2 h par semaine', reponse: '', veille: 'veille-ia' },
    { id: 'i6', date: '2026-11-03', trouvaille: 'Les clients du secteur passent aux avis vidéo', metier: 'web', source: 'veille métiers', verdict: 'a-mettre', statut: 'à essayer', resultat: '', commentaire: 'Deux concurrents l’ont déjà fait', reponse: '', veille: 'veille-metiers' },
    { id: 'i7', date: '2026-11-02', trouvaille: 'Rapport automatique des sites lents', metier: 'seo', source: 'veille métiers', verdict: 'a-mettre', statut: 'à essayer', resultat: '', commentaire: '', reponse: '', veille: 'veille-metiers' },
    { id: 'i2', date: '2026-11-01', trouvaille: 'Modèle moins cher pour le mode auto', metier: 'économie', source: 'changelog', statut: 'en essai', resultat: 'en cours', commentaire: 'Mesure au 02/12', reponse: 'oui' },
    { id: 'i3', date: '2026-10-28', trouvaille: 'Sous-titres animés en une commande', metier: 'vidéo', source: 'veille', statut: 'adopté', resultat: 'gardé, 3 reels faits avec', commentaire: '', reponse: 'oui' },
    { id: 'i4', date: '2026-10-27', trouvaille: 'Mémoire partagée entre projets', metier: 'outillage', source: 'GitHub', statut: 'refusé', resultat: '', commentaire: 'Déjà couvert par le bras droit', reponse: 'non' },
  ],
  opportunites: [
    { id: 'o1', date: '2026-10-26', quoi: 'Client A : contrat d’entretien annuel', montant: '1200', action: 'Envoyer la proposition chiffrée', quand: 'semaine', statut: 'en cours', origine: 'démo' },
    { id: 'o2', date: '2026-10-27', quoi: 'Client B : refonte du site', montant: '', action: 'Attendre ses photos', quand: 'mois', statut: 'en cours', origine: 'démo' },
    { id: 'o3', date: '2026-10-20', quoi: 'Client C : pages par ville', montant: '600', action: 'Signé', quand: 'plus-tard', statut: 'gagné', origine: 'démo' },
  ],
  chantiers: [
    { id: 'c1', titre: 'Fiche d’intervention : choix « Annonce Google »', etat: 'attend-go', lien: 'https://123digital.fr' },
    { id: 'c4', titre: 'Page de prise de rendez-vous du client A', etat: 'attend-go', lien: 'https://123digital.fr/contact' },
    { id: 'c2', titre: 'Banc d’essai des skills', etat: 'avance', lien: '' },
    { id: 'c3', titre: 'Routine du soir en échec depuis 2 jours', etat: 'bloque', lien: '' },
  ],
  nuit: [
    { id: 'n1', tache: 'Outillage : recherche dans les décisions', fait: 'oui', lien: '', origine: 'dépôt', ajoute_le: '' },
    { id: 'n2', tache: 'Client A : préversion du formulaire', fait: '', lien: '', origine: 'dépôt', ajoute_le: '' },
  ],
  robots: [
    {
      date: '2026-11-08T12:03', slug: 'demo', client: 'Client A', etat: 'orange',
      en_clair: 'Les dépenses suivent la prévision / Le robot propose de monter la campagne A à 30 € par jour / Budgets : A 25 €/j, C 10 €/j',
      depense: '1180', projection: '1890', plafond: '2000', decision_id: 'pilote-demo-20261108-A', rapport: 'clients/demo/04-ads-data/pilote/dernier-passage.md',
    },
    {
      date: '2026-11-08T12:10', slug: 'demo-b', client: 'Client B', etat: 'vert',
      en_clair: 'Dans les clous : marge de 640 € / Rien à signaler / Budgets : A 20 €/j',
      depense: '780', projection: '1360', plafond: '2000', decision_id: '', rapport: '',
    },
    {
      date: '2026-11-08T12:15', slug: 'demo-c', client: 'Client C', etat: 'rouge',
      en_clair: 'Dépensé jusqu’à hier : 1 640 € / Dépassement possible de 210 € en fin de cycle / Budgets : A 60 €/j',
      depense: '1640', projection: '2210', plafond: '2000', decision_id: '', rapport: '',
    },
  ],
  etudes: [
    {
      id: 'demo-etude',
      date: '2026-11-10',
      client: 'Client A',
      titre: 'Étude du site : ce qui casse',
      json: JSON.stringify({
        id: 'demo-etude',
        date: '2026-11-10',
        client: 'Client A',
        titre: 'Étude du site : ce qui casse',
        en_clair: 'Sur téléphone le site tient. Sur ordinateur, l’en-tête se chevauche. Exemple fictif, rien de réel.',
        cause: 'Les styles s’empilent : chaque retouche ajoute une rustine.',
        chiffres: [
          { valeur: '120', libelle: 'pages contrôlées' },
          { valeur: '3', libelle: 'défauts urgents' },
        ],
        decisions: ['Lot 1 préparé en préversion : oui'],
        lots: [
          {
            titre: 'Lot 1 · Les réparations urgentes',
            etat: 'en préparation',
            resume: '3 corrections publiées en une fois après ta relecture.',
            points: [
              { titre: 'Le bouton passe sur le menu', ou: 'Toutes les pages, sur ordinateur', gravite: 'bloquant', reparation: 'En-tête refait, un seul modèle.' },
              { titre: 'Texte pâle en bas de page', ou: 'Pages de services', gravite: 'gênant', reparation: 'Texte en noir.' },
            ],
          },
          { titre: 'Lot 2 · Finitions', etat: 'à faire', resume: 'Petits réglages.', points: [{ titre: 'Marge trop serrée', ou: 'Accueil', gravite: 'finition', reparation: 'Marge de 24 px.' }] },
        ],
        limites: 'Étude d’exemple (démonstration).',
        rapport: 'clients/demo/06-reports/exemple.md',
      }),
    },
  ],
  bilanNuit: {
    titre: 'Nuit du 02/11',
    lignes: [
      'Les 2 200 photos sont décrites, avec le lieu et l’heure.',
      'La préversion du formulaire est prête, elle attend ton go.',
      'Le banc d’essai des skills a raté : il manque un fichier, je le refais demain.',
    ],
    maj: '2026-11-03T04:12',
  },
}
