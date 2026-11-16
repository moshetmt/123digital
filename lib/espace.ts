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

/* Tableau de bord (16/11) : un chantier allégé par ligne de l'onglet Pilotage (scripts/pilotage.py d'ads-os).
   etat : attend-go | bloque | attend-autre | avance | dort. qui : moshe | claude | partenaire | client | personne. */
export type EtatChantier = 'attend-go' | 'bloque' | 'attend-autre' | 'avance' | 'dort'
export type ChantierPilotage = {
  id: string
  client: string
  client_nom: string
  titre: string
  etape: string
  etat: EtatChantier | string
  derniere_action?: { date: string; libelle: string } | null
  prochaine_action: string
  qui: string
  argent: string
  lien: string
  nb_questions: number
  questions: string[]
  a_surveiller?: string
  oui_a_verifier?: { id: string; reponse: string }[]
}
export type ARanger = { worktrees: number; avec_travail: number; clients_sans_fiche: number; liste: string[] }
export type Pilotage = { genere: string; chantiers: ChantierPilotage[]; a_ranger: ARanger | null }
/* Journal (16/11) : jamais dans « donnees » (le cache du script s'arrête à 90 000 caractères), lu à la demande par l'action « journal ». */
export type EntreeJournal = { date: string; heure: string; client: string; client_nom: string; type: string; texte: string; lien: string; cle: string }
export type ReponseJournal = { ok: boolean; error?: string; entrees: EntreeJournal[]; plus: boolean; du?: string; au?: string }

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
  /* Absent tant que le script Google n'est pas à jour : la page s'affiche alors comme avant. */
  pilotage?: Pilotage | null
}

/* Actions permises depuis le téléphone. export et import restent réservés au PC (autre clé). */
export const ACTIONS = ['donnees', 'repondre', 'idee', 'opp_ajout', 'opp_statut', 'nuit_ajout', 'chantier', 'message', 'journal'] as const

const opt = (lettre: string, texte: string, recommande = false): Option => ({ lettre, texte, recommande })

/* Démonstration du tableau de bord : structure et proportions du vrai tableau (14 clients, 5 états), mais noms,
   titres et chiffres fictifs. Ce dépôt est public : aucun vrai client, aucun vrai montant. */
const ISO = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10)
const ch = (
  id: string, c: string, etat: string, titre: string, etape: string, il: number, libelle: string, prochaine: string, qui: string,
  argent = 'interne', questions: string[] = [], extra: Partial<ChantierPilotage> = {},
): ChantierPilotage => ({
  id, client: 'client-' + c.toLowerCase(), client_nom: 'Client ' + c, titre, etape, etat,
  derniere_action: { date: ISO(il), libelle }, prochaine_action: prochaine, qui, argent, lien: '', nb_questions: questions.length, questions, ...extra,
})
const DEMO_PILOTAGE: Pilotage = {
  genere: new Date(Date.now() - 12 * 60_000).toLocaleString('sv-SE', { timeZone: 'Europe/Paris' }).replace(' ', 'T').slice(0, 16),
  chantiers: [
    ch('p1', 'A', 'attend-go', 'Page d’exemple pour le gérant', 'Étude écrite', 4, 'étude d’exemple écrite', 'Dire oui ou non cette semaine', 'moshe', 'à facturer', ['d1'], { a_surveiller: 'Exemple d’alerte fictive.', lien: 'https://123digital.fr' }),
    ch('p2', 'B', 'attend-go', 'Tri des bons plans de la veille', 'En préversion', 0, 'veille de nuit : exemple de tri', 'Choisir les retenues', 'moshe', 'interne', ['d2']),
    ch('p3', 'C', 'attend-go', 'Arborescence du site d’exemple', 'Proposée', 4, 'arborescence proposée', 'Valider la liste des pages', 'moshe', 'à facturer', ['d4', 'd5']),
    ch('p4', 'C', 'attend-go', 'Références de design', 'Planche envoyée', 4, 'planche de références envoyée', 'Choisir les références', 'moshe', 'à facturer', ['pilote-demo-20261108-A']),
    ch('p5', 'D', 'attend-go', 'Campagne de fin d’année', 'Préparation', 1, 'compte rendu de la réunion', 'Liste d’appels avant vendredi', 'moshe', 'inconnu', ['d1'], { a_surveiller: 'Échéance fictive.' }),
    ch('p6', 'E', 'bloque', 'Mise à jour technique', 'Bloqué', 6, 'accord donné, bloqué par un réglage', 'Ouvrir une session dans la journée', 'moshe', 'interne', [], { a_surveiller: 'À faire dans la semaine.' }),
    ch('p7', 'F', 'bloque', 'Envoi du travail', 'Bloqué', 3, 'envoi refusé', 'Voir la cause du refus', 'claude', 'interne'),
    ch('p8', 'G', 'attend-autre', 'Charte et visuels', 'En attente', 22, 'état mis à jour', 'Accord du client et réponse sur le planning', 'client', 'inconnu'),
    ch('p9', 'H', 'attend-autre', 'Site et fiche Google', 'En attente', 20, 'étude de marché rédigée', 'Photos de chantiers et téléphone dédié', 'client', 'à facturer'),
    ch('p10', 'I', 'attend-autre', 'Site de lancement', 'En attente', 0, 'arborescence et briefs écrits', 'Les chiffres du partenaire', 'client', 'facturé'),
    ch('p11', 'A', 'avance', 'Pages par commune', 'En cours', 0, 'pages d’exemple, contrôle vert', 'Mise en ligne après relecture', 'claude', 'à facturer'),
    ch('p12', 'A', 'avance', 'Nouveau choix dans la fiche', 'En cours', 0, 'champ ajouté à la fiche', 'Vérifier sur un vrai devis', 'claude', 'interne'),
    ch('p13', 'J', 'avance', 'Réparation du site, lot 1', 'En cours', 0, 'logo, en-tête et cookies corrigés', 'Relire l’aperçu', 'claude', 'facturé'),
    ch('p14', 'J', 'avance', 'Message WhatsApp prérempli', 'En cours', 0, 'modèle écrit', 'Brancher sur les pages', 'claude', 'à facturer'),
    ch('p15', 'J', 'avance', 'Robot qui répond aux clients', 'En cours', 0, 'correction mise en service', 'Surveiller 3 jours', 'claude', 'à facturer'),
    ch('p16', 'K', 'avance', 'Espace partenaire', 'En cours', 0, '4 écrans prêts', 'Test sur un téléphone', 'partenaire', 'à facturer'),
    ch('p17', 'L', 'avance', 'Référencement et fiche Google', 'En cours', 0, 'plan en 3 lots', 'Lot 1 cette semaine', 'claude', 'à facturer'),
    ch('p18', 'B', 'avance', 'Sections Robots et Études', 'En cours', 0, 'mises en ligne', 'Ajouter le tableau de bord', 'claude', 'interne'),
    ch('p19', 'J', 'avance', 'Annonces d’exemple', 'En cours', 1, 'annonces relues', 'Importer après ton go', 'claude', 'à facturer'),
    ch('p20', 'A', 'avance', 'Pilote du budget Ads', 'En cours', 4, 'budget ajusté', 'Prochain passage mercredi', 'claude', 'inconnu'),
    ch('p21', 'M', 'dort', 'Boutique du centre', 'Dort', 30, 'dernière retouche', 'Rien de prévu', 'personne'),
    ch('p22', 'N', 'dort', 'Brochure à refondre', 'Dort', 41, 'dernière retouche', 'Rien de prévu', 'personne'),
    ch('p23', 'G', 'dort', 'Ancien site vitrine', 'Dort', 52, 'dernière retouche', 'Rien de prévu', 'personne'),
    ch('p24', 'H', 'dort', 'Page de contact', 'Dort', 60, 'dernière retouche', 'Rien de prévu', 'personne'),
  ],
  a_ranger: { worktrees: 23, avec_travail: 16, clients_sans_fiche: 0, liste: ['dossier-1', 'dossier-2', 'dossier-3'] },
}
const J = (jour: number, heure: string, c: string, type: string, texte: string, lien = ''): EntreeJournal => ({
  date: ISO(jour), heure, client: 'client-' + c.toLowerCase(), client_nom: 'Client ' + c, type, texte, lien, cle: `demo-${jour}-${heure}-${c}-${type}-${texte.length}`,
})
const DEMO_JOURNAL: EntreeJournal[] = [
  J(0, '11:17', 'J', 'en-ligne', 'Pages mises en ligne, contrôle vert'),
  J(0, '11:04', 'B', 'decision', 'Tu as répondu « Oui » : tri des bons plans'),
  J(0, '11:03', 'A', 'decision', 'Pilote seul pour le cycle'),
  J(0, '', 'J', 'livrable', 'Étude du site : plan de réparation en 3 lots'),
  J(0, '', 'L', 'livrable', 'Étude de référencement finie'),
  J(0, '', 'D', 'note', 'Compte rendu de la réunion'),
  J(1, '16:22', 'J', 'en-ligne', 'Textes corrigés en ligne'),
  J(1, '14:01', 'J', 'en-ligne', 'Deux pages produit en ligne'),
  J(1, '', 'J', 'note', 'Annonces Google : annonces relues'),
  J(1, '', 'D', 'livrable', 'Compte rendu de la réunion'),
  J(3, '', 'C', 'decision', 'Logo retenu, version sobre'),
  J(3, '', 'A', 'livrable', 'Pages par commune, contrôle vert'),
  J(3, '', 'B', 'note', 'Bilan du robot : décisions en attente'),
  J(4, '', 'A', 'compte', 'Budget ajusté par le pilote'),
  J(4, '', 'A', 'livrable', 'Étude d’exemple écrite'),
  J(4, '', 'J', 'en-ligne', 'Espace partenaire et pages envoyés'),
  J(6, '', 'C', 'livrable', 'Arborescence proposée et planche de références'),
  J(8, '', 'E', 'note', 'Veilles : prêtes'),
  J(9, '', 'K', 'en-ligne', 'Version 2 de l’espace partenaire en ligne'),
  J(11, '', 'F', 'decision', 'Envoi vers GitHub : réessayer demain'),
  J(12, '', 'H', 'livrable', 'Étude de marché rédigée'),
  J(13, '', 'L', 'note', 'Audit de départ terminé'),
  J(20, '', 'G', 'decision', 'Planning à confirmer'),
]
/* Même contrat que l'action « journal » du script Google : jours [debut, debut + jours). */
export function journalDemo(jours = 7, debut = 0): ReponseJournal {
  const n = Math.max(1, Math.min(31, Number.isFinite(jours) ? Math.floor(jours) : 7))
  debut = Math.max(0, Math.min(3650, Number.isFinite(debut) ? Math.floor(debut) : 0))
  const haut = ISO(debut)
  const bas = ISO(debut + n - 1)
  return {
    ok: true,
    entrees: DEMO_JOURNAL.filter((e) => e.date >= bas && e.date <= haut),
    plus: DEMO_JOURNAL.some((e) => e.date < bas),
    du: bas,
    au: haut,
  }
}

/* Données fictives de démonstration : rien de réel, aucun nom de client. */
export const DEMO: Donnees = {
  ok: true,
  maj: '2026-01-02T07:12',
  decisions: [
    { id: 'd1', gravite: 'grave', question: 'Mettre en ligne la nouvelle page de prise de rendez-vous ?', options: [opt('A', 'Oui, cette semaine', true), opt('B', 'Attendre le bilan du mois')], source: 'rapport d’exemple', reponse: '', reponduLe: '' },
    { id: 'd2', gravite: 'utile', question: 'Passer le bilan du lundi à 8 h au lieu de 7 h ?', options: [opt('A', 'Oui', true), opt('B', 'Non, garder 7 h')], source: 'bras droit', reponse: '', reponduLe: '' },
    { id: 'd4', gravite: 'grave', question: 'Faire la mise à jour technique du site ?', options: [opt('A', 'Oui, sur préversion', true), opt('B', 'Attendre')], source: 'veille/exemple-1.md', reponse: '', reponduLe: '' },
    { id: 'd5', gravite: 'utile', question: 'Suivre les nouveaux outils vidéo chaque semaine ?', options: [opt('A', 'Oui', true), opt('B', 'Non')], source: 'veille/exemple-2.md', reponse: '', reponduLe: '' },
    { id: 'pilote-demo-20261108-A', gravite: 'utile', question: 'Client A : monter un peu la campagne A ?', options: [opt('A', 'Oui', true), opt('B', 'Non')], source: 'clients/demo/exemple.md', reponse: '', reponduLe: '' },
    { id: 'd3', gravite: 'utile', question: 'Garder la veille des outils vidéo chaque mardi ?', options: [opt('A', 'Oui', true), opt('B', 'Une fois par mois')], source: 'veille d’exemple', reponse: 'A', reponduLe: '2026-01-01T21:40' },
  ],
  idees: [
    { id: 'i1', date: '2026-01-01', trouvaille: 'Scanner de sécurité des skills', metier: 'outillage', source: 'GitHub', verdict: 'a-mettre', statut: 'à essayer', resultat: '', commentaire: 'Vérifie les skills avant installation', reponse: '', veille: 'github-quotidien' },
    { id: 'i5', date: '2026-01-03', trouvaille: 'Modèle local plus rapide pour trier les photos', metier: 'local', source: 'changelog', verdict: 'a-surveiller', statut: 'à essayer', resultat: '', commentaire: 'Gain estimé : exemple', reponse: '', veille: 'veille-ia' },
    { id: 'i6', date: '2026-01-03', trouvaille: 'Les clients du secteur passent aux avis vidéo', metier: 'web', source: 'veille métiers', verdict: 'a-mettre', statut: 'à essayer', resultat: '', commentaire: 'Deux concurrents l’ont déjà fait', reponse: '', veille: 'veille-metiers' },
    { id: 'i7', date: '2026-01-02', trouvaille: 'Rapport automatique des sites lents', metier: 'seo', source: 'veille métiers', verdict: 'a-mettre', statut: 'à essayer', resultat: '', commentaire: '', reponse: '', veille: 'veille-metiers' },
    { id: 'i2', date: '2026-01-01', trouvaille: 'Modèle moins cher pour le mode auto', metier: 'économie', source: 'changelog', statut: 'en essai', resultat: 'en cours', commentaire: 'Mesure à venir', reponse: 'oui' },
    { id: 'i3', date: '2026-01-28', trouvaille: 'Sous-titres animés en une commande', metier: 'vidéo', source: 'veille', statut: 'adopté', resultat: 'gardé, 3 reels faits avec', commentaire: '', reponse: 'oui' },
    { id: 'i4', date: '2026-01-27', trouvaille: 'Mémoire partagée entre projets', metier: 'outillage', source: 'GitHub', statut: 'refusé', resultat: '', commentaire: 'Déjà couvert par le bras droit', reponse: 'non' },
  ],
  opportunites: [
    { id: 'o1', date: '2026-01-26', quoi: 'Client A : contrat d’entretien annuel', montant: '1000', action: 'Envoyer la proposition chiffrée', quand: 'semaine', statut: 'en cours', origine: 'démo' },
    { id: 'o2', date: '2026-01-27', quoi: 'Client B : refonte du site', montant: '', action: 'Attendre ses photos', quand: 'mois', statut: 'en cours', origine: 'démo' },
    { id: 'o3', date: '2026-01-20', quoi: 'Client C : pages par ville', montant: '500', action: 'Signé', quand: 'plus-tard', statut: 'gagné', origine: 'démo' },
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
      date: '2026-01-08T12:03', slug: 'demo', client: 'Client A', etat: 'orange',
      en_clair: 'Les dépenses suivent la prévision / Le robot propose de monter la campagne A / Budgets : exemple',
      depense: '1000', projection: '1500', plafond: '2000', decision_id: 'pilote-demo-20261108-A', rapport: 'clients/demo/exemple.md',
    },
    {
      date: '2026-01-08T12:10', slug: 'demo-b', client: 'Client B', etat: 'vert',
      en_clair: 'Dans les clous : marge de 600 € / Rien à signaler / Budgets : exemple',
      depense: '800', projection: '1400', plafond: '2000', decision_id: '', rapport: '',
    },
    {
      date: '2026-01-08T12:15', slug: 'demo-c', client: 'Client C', etat: 'rouge',
      en_clair: 'Dépensé jusqu’à hier : 1 700 € / Dépassement possible de 300 € en fin de cycle / Budgets : exemple',
      depense: '1700', projection: '2300', plafond: '2000', decision_id: '', rapport: '',
    },
  ],
  pilotage: DEMO_PILOTAGE,
  etudes: [
    {
      id: 'demo-etude',
      date: '2026-01-10',
      client: 'Client A',
      titre: 'Étude du site : ce qui casse',
      json: JSON.stringify({
        id: 'demo-etude',
        date: '2026-01-10',
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
    titre: 'Nuit d’exemple',
    lignes: [
      'Les photos d’exemple sont décrites, avec le lieu et l’heure.',
      'La préversion du formulaire est prête, elle attend ton go.',
      'Le banc d’essai des skills a raté : il manque un fichier, je le refais demain.',
    ],
    maj: '2026-01-03T04:12',
  },
}
