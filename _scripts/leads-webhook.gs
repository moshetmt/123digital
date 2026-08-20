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

// Charte du site (app/globals.css) transposée dans le classeur.
var VERT = '#00713D'
var VERT_SOMBRE = '#0B3D25'
var VERT_CLAIR = '#E8F1EB'
var IVOIRE = '#F4F6F2'
var TRAIT = '#D8DED6'
var ENCRE = '#131814'
var ENCRE_DOUCE = '#6B736C'
var BLANC = '#FFFFFF'
var POLICE = 'Roboto'

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

var LARGEURS = [130, 100, 120, 210, 120, 170, 150, 300, 190, 240, 115, 110, 115, 105, 190]

var STATUTS = ['Nouveau', 'Contacté', 'RDV pris', 'Devis envoyé', 'Signé', 'Perdu']

// Couleurs du pipeline : fond puis texte.
var STATUT_COULEURS = {
  Nouveau: ['#E8F1EB', '#0B3D25'],
  'Contacté': ['#FFF4D6', '#7A5A00'],
  'RDV pris': ['#E4EEFB', '#1B3F73'],
  'Devis envoyé': ['#FFE9D6', '#8A4B12'],
  'Signé': ['#00713D', '#FFFFFF'],
  Perdu: ['#EFEFEF', '#7C857E'],
}

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

  // Suivi commercial posé ligne par ligne : une case à cocher sur toute la
  // colonne remplirait les 1000 lignes vides du classeur, et appendRow()
  // écrirait alors le lead suivant tout en bas.
  var row = sheet.getLastRow()
  sheet.getRange(row, 1).setNumberFormat('dd/MM/yyyy HH:mm')
  sheet.getRange(row, 12).setNumberFormat('#,##0.00 €')
  sheet.getRange(row, 13).setNumberFormat('dd/MM/yyyy')
  sheet.getRange(row, 11).setDataValidation(statutRule())
  sheet.getRange(row, 14).insertCheckboxes()
  sheet.setRowHeight(row, 26)
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

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    styliserLeads(sheet)
  }
  return sheet
}

/** Liste déroulante de la colonne Statut : le pipeline commercial. */
function statutRule() {
  return SpreadsheetApp.newDataValidation().requireValueInList(STATUTS, true).build()
}

/**
 * Toute la mise en forme de l'onglet Leads. Relançable : chaque élément est
 * remplacé, jamais empilé.
 */
function styliserLeads(sheet) {
  var colonnes = HEADERS.length
  var lignes = sheet.getMaxRows()

  sheet.getRange(1, 1, lignes, colonnes).setFontFamily(POLICE).setFontSize(10)

  // En-tête vert de la charte, figé pour rester visible au défilement.
  sheet
    .getRange(1, 1, 1, colonnes)
    .setValues([HEADERS])
    .setBackground(VERT)
    .setFontColor(BLANC)
    .setFontWeight('bold')
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left')
  sheet.setFrozenRows(1)
  sheet.setFrozenColumns(3)
  sheet.setRowHeight(1, 38)

  for (var i = 0; i < LARGEURS.length; i++) sheet.setColumnWidth(i + 1, LARGEURS[i])

  // Corps : texte coupé plutôt que renvoyé. Un message de quarante lignes ne
  // doit pas étirer sa ligne sur tout l'écran.
  var corps = sheet.getRange(2, 1, lignes - 1, colonnes)
  corps
    .setVerticalAlignment('middle')
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
    .setFontColor(ENCRE)

  sheet.getRange(2, 1, lignes - 1, 1).setNumberFormat('dd/MM/yyyy HH:mm')
  sheet.getRange(2, 12, lignes - 1, 1).setNumberFormat('#,##0.00 €')
  sheet.getRange(2, 13, lignes - 1, 1).setNumberFormat('dd/MM/yyyy')
  sheet.getRange(2, 10, lignes - 1, 1).setFontColor(ENCRE_DOUCE).setFontSize(9)
  sheet.getRange(2, 15, lignes - 1, 1).setFontColor(ENCRE_DOUCE).setFontSize(9)

  // Lignes alternées : le banding se remplace, il ne se superpose pas.
  sheet.getBandings().forEach(function (b) {
    b.remove()
  })
  corps
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false)
    .setFirstRowColor(BLANC)
    .setSecondRowColor(IVOIRE)

  sheet
    .getRange(1, 1, lignes, colonnes)
    .setBorder(null, null, null, null, true, true, TRAIT, SpreadsheetApp.BorderStyle.SOLID)

  // Pipeline en couleur : le statut se lit d'un coup d'œil.
  var regles = []
  Object.keys(STATUT_COULEURS).forEach(function (statut) {
    var couleurs = STATUT_COULEURS[statut]
    regles.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(statut)
        .setBackground(couleurs[0])
        .setFontColor(couleurs[1])
        .setBold(true)
        .setRanges([sheet.getRange(2, 11, lignes - 1, 1)])
        .build()
    )
  })
  sheet.setConditionalFormatRules(regles)

  // Colonnes vides à droite retirées : le tableau s'arrête où il finit.
  if (sheet.getMaxColumns() > colonnes) {
    sheet.deleteColumns(colonnes + 1, sheet.getMaxColumns() - colonnes)
  }
  sheet.setTabColor(VERT)

  // Filtre sur l'en-tête : trier et chercher sans passer par un menu.
  var filtre = sheet.getFilter()
  if (filtre) filtre.remove()
  sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 2), colonnes).createFilter()
}

/** Crée / répare la structure et la mise en forme. */
function setupSheet() {
  // Fuseau du classeur aligné sur celui du script : sinon Sheets enregistre les
  // dates dans un fuseau et le script les relit dans un autre, et chaque lead
  // s'affiche avec plusieurs heures d'écart.
  SpreadsheetApp.openById(SHEET_ID).setSpreadsheetTimeZone('Europe/Paris')
  styliserLeads(getLeadsSheet())
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
  styliserLeads(sheet)
  refreshDashboard()
}

// ── Tableau de bord ───────────────────────────────────────────────────────────
// Recalculé en JavaScript plutôt qu'en formules : pas de dépendance à la locale
// du classeur, et les chiffres restent justes même si on trie l'onglet Leads.

function refreshDashboard() {
  var ss = SpreadsheetApp.openById(SHEET_ID)
  var leads = getLeadsSheet()
  var dash = ss.getSheetByName(SHEET_DASH) || ss.insertSheet(SHEET_DASH, 0)

  dash.getCharts().forEach(function (c) {
    dash.removeChart(c)
  })
  dash.getBandings().forEach(function (b) {
    b.remove()
  })
  dash.getRange(1, 1, dash.getMaxRows(), dash.getMaxColumns()).breakApart()
  dash.clear()
  dash.clearConditionalFormatRules()
  dash.setHiddenGridlines(true)
  dash.setTabColor(VERT_SOMBRE)

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

  dash.getRange(1, 1, dash.getMaxRows(), 12).setFontFamily(POLICE)

  // Bandeau de titre, aux couleurs du site.
  dash.getRange('A1:H2').merge().setBackground(VERT)
  dash
    .getRange('A1')
    .setValue('123digital  ·  Leads')
    .setFontSize(20)
    .setFontWeight('bold')
    .setFontColor(BLANC)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('center')
  dash.setRowHeight(1, 34)
  dash.setRowHeight(2, 22)

  dash
    .getRange('A3')
    .setValue(
      'Mis à jour : ' + Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')
    )
    .setFontSize(9)
    .setFontColor(ENCRE_DOUCE)

  // Cartes de chiffres, alignées sur les mêmes colonnes que les blocs du
  // dessous : chaque carte occupe deux colonnes, sinon « 30 derniers jours »
  // déborde sur la carte voisine.
  carte(dash, 5, 1, '30 derniers jours', last30, false)
  carte(dash, 5, 4, '7 derniers jours', last7, false)
  carte(dash, 5, 7, 'Total leads', total, false)
  carte(dash, 8, 1, 'Signés', signes, false)
  carte(dash, 8, 4, 'CA signé', ca, true)

  var jours = sortEntries(byDay, true).map(function (e) {
    return [e[0].slice(8, 10) + '/' + e[0].slice(5, 7), e[1]]
  })
  var besoins = sortEntries(byNeed, false)
  var pages = sortEntries(byPage, false)

  writeBlock(dash, 12, 1, 'Leads par jour', jours, ['Jour', 'Leads'])
  writeBlock(dash, 12, 4, 'Répartition par besoin', besoins, ['Besoin', 'Nombre'])
  writeBlock(dash, 12, 7, 'Pages qui convertissent', pages, ['Page', 'Leads'])

  dash.setColumnWidth(1, 150)
  dash.setColumnWidth(2, 90)
  dash.setColumnWidth(3, 26)
  dash.setColumnWidth(4, 220)
  dash.setColumnWidth(5, 90)
  dash.setColumnWidth(6, 26)
  dash.setColumnWidth(7, 260)
  dash.setColumnWidth(8, 90)

  if (jours.length) {
    dash.insertChart(
      dash
        .newChart()
        .asColumnChart()
        .addRange(dash.getRange(13, 1, jours.length + 1, 2))
        .setNumHeaders(1)
        .setPosition(5, 10, 0, 0)
        .setOption('title', 'Leads par jour')
        .setOption('titleTextStyle', { color: ENCRE, fontSize: 13, bold: true })
        .setOption('colors', [VERT])
        .setOption('legend', { position: 'none' })
        .setOption('backgroundColor', BLANC)
        .setOption('width', 460)
        .setOption('height', 260)
        .build()
    )
  }

  if (besoins.length) {
    dash.insertChart(
      dash
        .newChart()
        .asPieChart()
        .addRange(dash.getRange(13, 4, besoins.length + 1, 2))
        .setNumHeaders(1)
        .setPosition(20, 10, 0, 0)
        .setOption('title', 'Répartition par besoin')
        .setOption('titleTextStyle', { color: ENCRE, fontSize: 13, bold: true })
        .setOption('colors', [VERT, '#3E9B6B', '#7BC29A', '#B7DCC7', '#DCEDE3'])
        .setOption('pieHole', 0.45)
        .setOption('backgroundColor', BLANC)
        .setOption('width', 460)
        .setOption('height', 260)
        .build()
    )
  }
}

/** Une carte de chiffre : libellé discret au-dessus, valeur en gros dessous. */
function carte(sheet, row, col, label, valeur, estEuro) {
  sheet
    .getRange(row, col, 1, 2)
    .merge()
    .setValue(String(label).toUpperCase())
    .setFontSize(8)
    .setFontWeight('bold')
    .setFontColor(ENCRE_DOUCE)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('bottom')

  var cellule = sheet
    .getRange(row + 1, col, 1, 2)
    .merge()
    .setValue(valeur)
    .setFontSize(22)
    .setFontWeight('bold')
    .setFontColor(VERT)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('top')
  if (estEuro) cellule.setNumberFormat('#,##0 €')

  sheet
    .getRange(row, col, 2, 2)
    .setBackground(VERT_CLAIR)
    .setBorder(true, true, true, true, false, false, TRAIT, SpreadsheetApp.BorderStyle.SOLID)
  sheet.setRowHeight(row, 20)
  sheet.setRowHeight(row + 1, 40)
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
  sheet
    .getRange(row, col)
    .setValue(title)
    .setFontWeight('bold')
    .setFontSize(12)
    .setFontColor(VERT_SOMBRE)

  sheet
    .getRange(row + 1, col, 1, 2)
    .setValues([head])
    .setFontWeight('bold')
    .setFontSize(9)
    .setFontColor(BLANC)
    .setBackground(VERT)

  if (!entries.length) {
    sheet
      .getRange(row + 2, col)
      .setValue('Aucun lead pour le moment')
      .setFontColor(ENCRE_DOUCE)
      .setFontSize(9)
    return
  }

  var plage = sheet.getRange(row + 2, col, entries.length, 2)
  plage
    .setValues(entries)
    .setFontSize(10)
    .setFontColor(ENCRE)
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
  sheet
    .getRange(row + 1, col, entries.length + 1, 2)
    .setBorder(true, true, true, true, true, true, TRAIT, SpreadsheetApp.BorderStyle.SOLID)
  sheet.getRange(row + 2, col + 1, entries.length, 1).setHorizontalAlignment('right')
}
