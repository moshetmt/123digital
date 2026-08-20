/**
 * 123digital — Webhook leads (Google Apps Script)
 * ------------------------------------------------
 * Reçoit les soumissions du formulaire du site (app/api/contact/route.ts)
 * et les écrit dans le Google Sheet « 123digital - LEADS ».
 * Même principe que le système Clim69 : une ligne par lead, colonnes de suivi
 * commercial à droite, onglet Tableau de bord recalculé à chaque écriture.
 *
 * INSTALLATION (une seule fois)
 *  1. script.google.com → Nouveau projet (le script vise le classeur par son ID)
 *  2. Coller ce fichier entier (remplacer le Code.gs par défaut)
 *  3. Paramètres du projet → Propriétés du script → ajouter
 *       SHARED_SECRET = <une chaîne aléatoire, la même que SHEETS_WEBHOOK_SECRET côté site>
 *  4. Exécuter la fonction setupSheet() une fois (autoriser l'accès quand demandé)
 *  5. Déployer → Nouveau déploiement → Type : Application web
 *       Exécuter en tant que : moi
 *       Qui a accès : Tout le monde
 *     → copier l'URL .../exec dans SHEETS_WEBHOOK_URL côté site
 *
 * Après toute modification du code : Déployer → Gérer les déploiements →
 * crayon → Version : Nouvelle version → Déployer (l'URL ne change pas).
 */

// Classeur cible : « 123digital - LEADS ». Le script le vise par son ID, donc
// il fonctionne aussi bien en projet autonome qu'attaché au classeur.
var SHEET_ID = '1_bPq_JAZq9qRPZFQNqzys4oCV2Po3u111y3Yn1Jd46M'

var SHEET_LEADS = 'Leads'
var SHEET_DASH = 'Tableau de bord'

var HEADERS = [
  'Date',
  'Prénom',
  'Nom',
  'Email',
  'Téléphone',
  'Site web',
  'Besoin',
  'Message',
  'Page',
  'Source',
  'Statut',
  'Montant € HT',
  'Date signature',
  'Prêt pour Ads',
  'Atterrissage',
]

var STATUTS = ['Nouveau', 'Contacté', 'RDV pris', 'Devis envoyé', 'Signé', 'Perdu']

// ── Entrées HTTP ──────────────────────────────────────────────────────────────

function doGet() {
  return json({ ok: true, service: '123digital-leads' })
}

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}')

    var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET')
    if (expected && body.secret !== expected) {
      return json({ ok: false, error: 'unauthorized' })
    }

    // Un seul lead à la fois, mais on sérialise : deux soumissions simultanées
    // écriraient sur la même ligne.
    var lock = LockService.getScriptLock()
    lock.waitLock(20000)
    try {
      appendLead(body)
      refreshDashboard()
    } finally {
      lock.releaseLock()
    }

    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}

// ── Écriture ──────────────────────────────────────────────────────────────────

function appendLead(body) {
  var sheet = getLeadsSheet()

  sheet.appendRow([
    new Date(),
    str(body.prenom),
    str(body.nom),
    str(body.email),
    str(body.tel),
    str(body.site),
    str(body.besoin),
    str(body.message),
    str(body.page),
    str(body.source),
    'Nouveau', // Statut
    '', // Montant € HT
    '', // Date signature
    '', // Prêt pour Ads
    str(body.landing),
  ])

  var row = sheet.getLastRow()
  sheet.getRange(row, 1).setNumberFormat('dd/MM/yyyy HH:mm')
  sheet.getRange(row, 12).setNumberFormat('#,##0.00 €')
  sheet.getRange(row, 13).setNumberFormat('dd/MM/yyyy')

  // Suivi commercial posé ligne par ligne : une case à cocher sur toute la
  // colonne remplirait les 1000 lignes vides du classeur, et appendRow()
  // écrirait alors le lead suivant tout en bas.
  sheet.getRange(row, 11).setDataValidation(statutRule())
  sheet.getRange(row, 14).insertCheckboxes()
}

function str(v) {
  if (v === null || v === undefined) return ''
  return String(v).slice(0, 5000)
}

// ── Structure du classeur ─────────────────────────────────────────────────────

function getLeadsSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID)
  var sheet = ss.getSheetByName(SHEET_LEADS)

  if (!sheet) {
    // Le classeur neuf s'appelle « Feuille 1 » : on le renomme au lieu d'en
    // créer un second et de laisser un onglet vide derrière.
    var sheets = ss.getSheets()
    if (sheets.length === 1 && sheets[0].getLastRow() === 0) {
      sheet = sheets[0].setName(SHEET_LEADS)
    } else {
      sheet = ss.insertSheet(SHEET_LEADS)
    }
  }

  if (sheet.getLastRow() === 0) writeHeaders(sheet)
  return sheet
}

function writeHeaders(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#1f2937')
    .setFontColor('#ffffff')
    .setVerticalAlignment('middle')
  sheet.setFrozenRows(1)
  sheet.setRowHeight(1, 34)

  var widths = [140, 110, 130, 210, 130, 180, 150, 320, 200, 260, 120, 120, 120, 120, 200]
  for (var i = 0; i < widths.length; i++) sheet.setColumnWidth(i + 1, widths[i])

}

/** Liste déroulante de la colonne Statut : le pipeline commercial. */
function statutRule() {
  return SpreadsheetApp.newDataValidation().requireValueInList(STATUTS, true).build()
}

/** Crée / répare la structure. À lancer une fois à l'installation. */
function setupSheet() {
  // Fuseau du classeur aligné sur celui du script : sinon Sheets enregistre les
  // dates dans un fuseau et le script les relit dans un autre, et chaque lead
  // s'affiche avec plusieurs heures d'écart.
  SpreadsheetApp.openById(SHEET_ID).setSpreadsheetTimeZone('Europe/Paris')
  getLeadsSheet()
  refreshDashboard()
}

/**
 * Efface toutes les lignes sous l'en-tête, cases à cocher et listes déroulantes
 * comprises. À n'utiliser qu'à l'installation : les leads déjà enregistrés
 * seraient perdus.
 */
function reinitialiserLignes() {
  var sheet = getLeadsSheet()
  var lignes = sheet.getMaxRows() - 1
  if (lignes > 0) {
    var corps = sheet.getRange(2, 1, lignes, sheet.getMaxColumns())
    try {
      corps.removeCheckboxes()
    } catch (e) {
      // Aucune case à cocher à retirer : rien à faire.
    }
    corps.clearDataValidations()
    corps.clearContent()
  }
  refreshDashboard()
}

// ── Tableau de bord ───────────────────────────────────────────────────────────
// Recalculé en JavaScript plutôt qu'en formules : pas de dépendance à la locale
// du classeur, et les chiffres restent justes même si on trie l'onglet Leads.

function refreshDashboard() {
  var ss = SpreadsheetApp.openById(SHEET_ID)
  var leads = getLeadsSheet()
  var dash = ss.getSheetByName(SHEET_DASH) || ss.insertSheet(SHEET_DASH, 0)
  dash.clear()

  var last = leads.getLastRow()
  var rows = last > 1 ? leads.getRange(2, 1, last - 1, HEADERS.length).getValues() : []

  var today = new Date()
  var byDay = {}
  var byNeed = {}
  var byPage = {}
  var total = rows.length
  var last7 = 0
  var last30 = 0
  var signes = 0
  var ca = 0

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i]
    var date = r[0] instanceof Date ? r[0] : null
    if (date) {
      // Cle triable (yyyy-MM-dd) : 'dd/MM' placerait 02/08 avant 19/07.
      var key = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd')
      byDay[key] = (byDay[key] || 0) + 1
      var days = (today - date) / 86400000
      if (days <= 7) last7++
      if (days <= 30) last30++
    }
    var need = String(r[6] || '(non renseigné)')
    byNeed[need] = (byNeed[need] || 0) + 1
    var page = String(r[8] || '(inconnue)')
    byPage[page] = (byPage[page] || 0) + 1
    if (String(r[10]) === 'Signé') {
      signes++
      ca += Number(r[11]) || 0
    }
  }

  dash.getRange('A1').setValue('123digital — Leads').setFontSize(16).setFontWeight('bold')
  dash
    .getRange('A2')
    .setValue(
      'Mis à jour : ' + Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')
    )
    .setFontColor('#6b7280')

  var kpis = [
    ['Total leads', total],
    ['7 derniers jours', last7],
    ['30 derniers jours', last30],
    ['Signés', signes],
    ['CA signé (€ HT)', ca],
  ]
  dash.getRange(4, 1, kpis.length, 2).setValues(kpis)
  dash.getRange(4, 1, kpis.length, 1).setFontWeight('bold')
  dash.getRange(8, 2).setNumberFormat('#,##0.00 €')

  var jours = sortEntries(byDay, true).map(function (e) {
    return [e[0].slice(8, 10) + '/' + e[0].slice(5, 7), e[1]]
  })
  writeBlock(dash, 10, 1, 'Leads par jour', jours, ['Jour', 'Leads'])
  writeBlock(dash, 10, 4, 'Répartition par besoin', sortEntries(byNeed, false), ['Besoin', 'Nombre'])
  writeBlock(dash, 10, 7, 'Pages qui convertissent', sortEntries(byPage, false), ['Page', 'Leads'])

  dash.setColumnWidth(1, 190)
  dash.setColumnWidth(4, 190)
  dash.setColumnWidth(7, 260)
}

/** Trie un dictionnaire : par clé (chronologique) ou par valeur décroissante. */
function sortEntries(map, byKey) {
  var out = []
  for (var k in map) out.push([k, map[k]])
  out.sort(function (a, b) {
    if (byKey) return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0
    return b[1] - a[1]
  })
  return out
}

function writeBlock(sheet, row, col, title, entries, head) {
  sheet.getRange(row, col).setValue(title).setFontWeight('bold').setFontSize(12)
  sheet.getRange(row + 1, col, 1, 2).setValues([head]).setFontWeight('bold').setBackground('#f3f4f6')
  if (entries.length) sheet.getRange(row + 2, col, entries.length, 2).setValues(entries)
}
