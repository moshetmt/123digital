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
export type Chantier = { id: string; titre: string; etat: string; lien: string; reponse?: string; repondu_le?: string }
export type TacheNuit = { id: string; tache: string; fait: string; lien: string; origine: string; ajoute_le: string }
/* Carte « Cette nuit » (02/11) : la section EN CLAIR de bilan/nuit.md, écrite par l'agent de nuit. */
export type BilanNuit = { titre: string; lignes: string[]; maj: string }
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
    { id: 'd3', gravite: 'utile', question: 'Garder la veille des outils vidéo chaque mardi ?', options: [opt('A', 'Oui', true), opt('B', 'Une fois par mois')], source: 'veille du 28/10', reponse: 'A', reponduLe: '2026-11-01T21:40' },
  ],
  idees: [
    { id: 'i1', date: '2026-11-01', trouvaille: 'Scanner de sécurité des skills', metier: 'outillage', source: 'GitHub', verdict: 'a-mettre', statut: 'à essayer', resultat: '', commentaire: 'Vérifie les skills avant installation', reponse: '' },
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
