import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  creneauxLibres, extraireOccupes, libelleCreneau, libelleHeure, libelleJour, normaliserTelephone,
} from '../lib/agenda-google.ts'

// node --test tests/ (npm test). Fuseau Europe/Paris : hiver UTC+1 (dès le 25/10/2026), été UTC+2.
const heureParis = (d: Date) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(d)
const jourParis = (d: Date) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short' }).format(d)

test('creneauxLibres : lundi à jeudi seulement, 17 h 00 et 17 h 30, 10 jours proposés', () => {
  // Vendredi 30 octobre 2026, 10 h Paris : le premier créneau est lundi 2 novembre 17 h 00.
  const libres = creneauxLibres(new Date('2026-10-30T09:00:00Z'), [])
  assert.equal(libres.length, 20)
  assert.equal(libres[0].toISOString(), '2026-11-02T16:00:00.000Z')
  assert.equal(libres[1].toISOString(), '2026-11-02T16:30:00.000Z')
  for (const d of libres) {
    assert.ok(['Mon', 'Tue', 'Wed', 'Thu'].includes(jourParis(d)), `${d.toISOString()} tombe un ${jourParis(d)}`)
    assert.ok(['17:00', '17:30'].includes(heureParis(d)), `${d.toISOString()} à ${heureParis(d)}`)
  }
  // Dix jours proposables : 2 à 5, 9 à 12, 16 et 17 novembre. Le dernier créneau est mardi 17 à 17 h 30.
  assert.equal(libres[19].toISOString(), '2026-11-17T16:30:00.000Z')
})

test('creneauxLibres : au moins 4 h après la demande', () => {
  // Mardi 27 octobre 2026, 13 h 15 Paris (12:15Z) : 17 h 00 est à 3 h 45, 17 h 30 à 4 h 15.
  const libres = creneauxLibres(new Date('2026-10-27T12:15:00Z'), [])
  assert.equal(libres[0].toISOString(), '2026-10-27T16:30:00.000Z')
  // Même jour à midi : les deux créneaux du jour passent.
  const midi = creneauxLibres(new Date('2026-10-27T11:00:00Z'), [])
  assert.equal(midi[0].toISOString(), '2026-10-27T16:00:00.000Z')
  assert.equal(midi[1].toISOString(), '2026-10-27T16:30:00.000Z')
  // Exactement 4 h avant : accepté.
  const pile = creneauxLibres(new Date('2026-10-27T12:00:00Z'), [])
  assert.equal(pile[0].toISOString(), '2026-10-27T16:00:00.000Z')
})

test('creneauxLibres : heure d’été, 17 h Paris = 15 h UTC', () => {
  // Lundi 5 juillet 2027, 8 h Paris.
  const libres = creneauxLibres(new Date('2027-07-05T06:00:00Z'), [])
  assert.equal(libres[0].toISOString(), '2027-07-05T15:00:00.000Z')
  assert.equal(heureParis(libres[0]), '17:00')
})

test('creneauxLibres : un créneau qui chevauche un événement est retiré', () => {
  const maintenant = new Date('2026-10-26T08:00:00Z') // lundi 26 octobre, 9 h Paris
  const occupes = [
    // Lundi 16 h 45 à 17 h 10 Paris : prend le 17 h 00, pas le 17 h 30.
    { debut: new Date('2026-10-26T15:45:00Z'), fin: new Date('2026-10-26T16:10:00Z') },
    // Mardi 17 h 30 à 18 h 00 : prend le 17 h 30 du mardi.
    { debut: new Date('2026-10-27T16:30:00Z'), fin: new Date('2026-10-27T17:00:00Z') },
    // Mercredi 17 h 15 à 17 h 30 : touche aucun créneau (fin du 17 h 00 = début de l’événement).
    { debut: new Date('2026-10-28T16:15:00Z'), fin: new Date('2026-10-28T16:30:00Z') },
  ]
  const iso = creneauxLibres(maintenant, occupes).map((d) => d.toISOString())
  assert.ok(!iso.includes('2026-10-26T16:00:00.000Z'))
  assert.ok(iso.includes('2026-10-26T16:30:00.000Z'))
  assert.ok(iso.includes('2026-10-27T16:00:00.000Z'))
  assert.ok(!iso.includes('2026-10-27T16:30:00.000Z'))
  assert.ok(iso.includes('2026-10-28T16:00:00.000Z'))
  assert.ok(iso.includes('2026-10-28T16:30:00.000Z'))
  assert.equal(iso.length, 18)
})

test('extraireOccupes : ignore annulés, transparents et journées entières', () => {
  const occupes = extraireOccupes([
    { start: { dateTime: '2026-10-27T16:00:00+01:00' }, end: { dateTime: '2026-10-27T17:00:00+01:00' } },
    { status: 'cancelled', start: { dateTime: '2026-10-27T10:00:00+01:00' }, end: { dateTime: '2026-10-27T11:00:00+01:00' } },
    { transparency: 'transparent', start: { dateTime: '2026-10-28T16:00:00+01:00' }, end: { dateTime: '2026-10-28T18:00:00+01:00' } },
    { start: { date: '2026-10-29' }, end: { date: '2026-10-30' } },
  ])
  assert.equal(occupes.length, 1)
  assert.equal(occupes[0].debut.toISOString(), '2026-10-27T15:00:00.000Z')
  assert.equal(occupes[0].fin.toISOString(), '2026-10-27T16:00:00.000Z')
})

test('libellés français', () => {
  const d = new Date('2026-10-27T16:00:00Z')
  assert.equal(libelleJour(d), 'mardi 27 octobre')
  assert.equal(libelleHeure(d), '17 h 00')
  assert.equal(libelleCreneau(d), 'mardi 27 octobre, 17 h 00')
  assert.equal(libelleCreneau(new Date('2026-10-27T16:30:00Z')), 'mardi 27 octobre, 17 h 30')
  assert.equal(libelleCreneau(new Date('2027-07-05T15:00:00Z')), 'lundi 5 juillet, 17 h 00')
})

test('normaliserTelephone : formats français souples, refus du reste', () => {
  assert.equal(normaliserTelephone('06 52 09 23 01'), '06 52 09 23 01')
  assert.equal(normaliserTelephone('0652092301'), '06 52 09 23 01')
  assert.equal(normaliserTelephone('06.52.09.23.01'), '06 52 09 23 01')
  assert.equal(normaliserTelephone('06-52-09-23-01'), '06 52 09 23 01')
  assert.equal(normaliserTelephone('+33 6 52 09 23 01'), '06 52 09 23 01')
  assert.equal(normaliserTelephone('+33652092301'), '06 52 09 23 01')
  assert.equal(normaliserTelephone('0033652092301'), '06 52 09 23 01')
  assert.equal(normaliserTelephone('04 72 00 00 00'), '04 72 00 00 00')
  assert.equal(normaliserTelephone('12345'), null)
  assert.equal(normaliserTelephone('0052092301'), null)
  assert.equal(normaliserTelephone('06 52 09 23'), null)
  assert.equal(normaliserTelephone(''), null)
  assert.equal(normaliserTelephone('abc'), null)
})
