// Pages d'audit par prospect (validé par Moshé le 25/10/2026) : construit data/audits-prospects.json
// à partir du dossier de prospection d'ads-os. Relançable :  node _scripts/audits-prospects.mjs
//
// Sources, dans clients/123digital :
//  - 01-emails/prospection/_envois.csv : les domaines du lot 1 (« envoyé 2026-10-19 ») et du lot 2 (« prêt lot 2 »).
//  - 01-emails/prospection/<date>-<domaine>.txt : la formulation retenue des constats (2 ou 3 points numérotés).
//  - 06-reports/prospection/<domaine>.md : le constat complet, sans accents, si le mail manque.
//  - public/images/audits/<domaine>.jpg : la capture téléphone, prise à part par scripts/capture.py --mobile.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CLIENT = 'E:/projet site/ads-os/clients/123digital'
const MAILS = join(CLIENT, '01-emails/prospection')
const RAPPORTS = join(CLIENT, '06-reports/prospection')
const CAPTURES = 'public/images/audits'

const LOTS = [
  { statut: 'envoyé 2026-10-19', date: '2026-10-07' },
  { statut: 'prêt lot 2', date: '2026-10-25' },
]

// Métier et ville viennent des listes de prospection (plombiers, électriciens, garages, 07/10 et 25/10).
const PLOMBIERS = ['rtplombierchauffage.fr', 'assistanceplomberie.com', 'mure-energies.fr', 'emh-plomberie.com', 'chapuisplomberie.fr', 'cyril-leplombier.fr']
const GARAGES = ['garage-arnaud-sports.com', 'ah-automobile.fr', 'garage-auto-electricite-villeurbanne.fr', 'garagecelu.fr', 'atelierperrin.com', 'garage-caffon-boileau.fr', 'djef-autos.com', 'autoparck.fr']
const VILLES = { 'garage-auto-electricite-villeurbanne.fr': 'Villeurbanne', 'garage-caffon-boileau.fr': 'Villeurbanne' }
const NOMS = {
  'rtplombierchauffage.fr': 'RT Plombier Chauffage',
  'assistanceplomberie.com': 'Assistance Plomberie',
  'mure-energies.fr': 'Mure Énergies',
  'emh-plomberie.com': 'EMH Plomberie',
  'sauvignet-elec.com': 'Sauvignet Élec',
  'electricien-electricite.com': 'Électricien Électricité',
  'ah-automobile.fr': 'AH Automobile',
  'chapuisplomberie.fr': 'Chapuis Plomberie',
  'cyril-leplombier.fr': 'Cyril le plombier',
  'egelec.co': 'Egelec',
  'tiltelec.com': 'Tiltelec',
  'electricity-lyon.fr': 'Electricity Lyon',
  'delta-electricite.fr': 'Delta Électricité',
  'mks-technology.fr': 'MKS Technology',
  'maselectricite.fr': 'MAS Électricité',
  'elechristin.com': 'Elec Christin',
  'garage-auto-electricite-villeurbanne.fr': 'Garage Auto Électricité Villeurbanne',
  'garagecelu.fr': 'Garage Celu',
  'atelierperrin.com': 'Atelier Perrin',
  'garage-caffon-boileau.fr': 'Garage Caffon Boileau',
  'djef-autos.com': 'Djef Autos',
  'autoparck.fr': 'Autoparck',
}

// Accents des rapports (console Windows), même table que ads-os/scripts/prospection_mails.py.
const PHRASES = [['acces a votre', 'accès à votre'], [" s a s'afficher", " s à s'afficher"], ['donnez a Google', 'donnez à Google'], ['pages a la fois', 'pages à la fois']]
const MOTS = {
  acces: 'accès', 'Au-dela': 'Au-delà', "qu'au-dela": "qu'au-delà", caracteres: 'caractères', coupee: 'coupée', coupes: 'coupés',
  decouvrent: 'découvrent', decrit: 'décrit', donnee: 'donnée', ecrit: 'écrit', etablissement: 'établissement', examinees: 'examinées',
  "l'exterieur": "l'extérieur", "l'experience": "l'expérience", laisses: 'laissés', meme: 'même', 'vous-meme': 'vous-même', moitie: 'moitié',
  numero: 'numéro', oublie: 'oublie', prevu: 'prévu', presentent: 'présentent', releve: 'relevé', repond: 'répond', resultats: 'résultats',
  securite: 'sécurité', structuree: 'structurée', telephone: 'téléphone', telephoner: 'téléphoner', telephones: 'téléphones', tres: 'très',
  trouvee: 'trouvée', trouve: 'trouvé', verifies: 'vérifiés', considere: 'considère', decoupe: 'découpe', ete: 'été', cote: 'côté',
  utilises: 'utilisés', soudre: 'résoudre', apparait: 'apparaît',
}
const accentuer = (t) => {
  for (const [a, b] of PHRASES) t = t.replaceAll(a, b)
  t = t.replace(/(\d)\.(\d)/g, '$1,$2')
  return t.replace(/[A-Za-z'-]+/g, (m) => MOTS[m] ?? m)
}

// Le script des mails accentue « oublie » en « oublié » même quand c'est le verbe : on corrige à la lecture.
const corriger = (t) =>
  t.replaceAll("n'en oublié aucune", "n'en oublie aucune").replaceAll('texte affiche sous', 'texte affiché sous').replaceAll("n'apparait pas", "n'apparaît pas")

const slug = (d) => d.replaceAll('.', '-')
const nomParDefaut = (d) => d.replace(/\.[a-z]+$/, '').split('-').map((m) => m[0].toUpperCase() + m.slice(1)).join(' ')

// Un mail : « 1. Titre\nTexte ». Un rapport : « ## 1. Titre\n\nTexte ».
function constatsDuMail(chemin) {
  const t = readFileSync(chemin, 'utf8')
  return [...t.matchAll(/^\d+\. (.+)\n(.+)$/gm)].map((m) => ({ titre: corriger(accentuer(m[1].trim())), texte: corriger(accentuer(m[2].trim())) }))
}
function constatsDuRapport(chemin) {
  const t = readFileSync(chemin, 'utf8')
  return [...t.matchAll(/^## \d+\. (.+?)\n\n([\s\S]+?)(?=\n## |\n_|$)/gm)]
    .slice(0, 3)
    .map((m) => ({ titre: accentuer(m[1].trim()), texte: accentuer(m[2].replace(/\s+/g, ' ').trim()) }))
}

// CSV à champs entre guillemets (le statut contient des virgules).
function lignesCsv(texte) {
  return texte.replace(/^\uFEFF/, '').trim().split('\n').slice(1).map((l) => {
    const champs = []
    let courant = '', entre = false
    for (const c of l.trim()) {
      if (c === '"') entre = !entre
      else if (c === ',' && !entre) { champs.push(courant); courant = '' }
      else courant += c
    }
    champs.push(courant)
    return champs
  })
}

const audits = []
for (const [domaine, , , , statut] of lignesCsv(readFileSync(join(MAILS, '_envois.csv'), 'utf8'))) {
  const lot = LOTS.find((l) => statut.startsWith(l.statut))
  if (!lot) continue
  const mail = join(MAILS, `${lot.date}-${slug(domaine)}.txt`)
  const constats = existsSync(mail) ? constatsDuMail(mail) : constatsDuRapport(join(RAPPORTS, `${slug(domaine)}.md`))
  if (!constats.length) throw new Error(`${domaine} : aucun constat`)
  audits.push({
    domaine,
    nom: NOMS[domaine] ?? nomParDefaut(domaine),
    metier: PLOMBIERS.includes(domaine) ? 'plombier' : GARAGES.includes(domaine) ? 'garage' : 'électricien',
    ville: VILLES[domaine] ?? 'Lyon',
    constats,
    capture: existsSync(join(CAPTURES, `${slug(domaine)}.jpg`)),
    date: lot.date,
  })
}

writeFileSync('data/audits-prospects.json', JSON.stringify(audits, null, 2) + '\n')
console.log(`${audits.length} audits, ${audits.filter((a) => !a.capture).length} sans capture`)
for (const a of audits) console.log(`${a.capture ? 'capture ' : 'SANS     '} ${a.domaine} : ${a.constats.length} constat(s)`)
