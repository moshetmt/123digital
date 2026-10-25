import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { trouverAudit, type AuditProspect } from '../lib/audits-prospects.ts'

// node --test tests/ (npm test). Le JSON est lu par fs : node ne connaît pas l'alias @/.
const audits: AuditProspect[] = JSON.parse(readFileSync(new URL('../data/audits-prospects.json', import.meta.url), 'utf8'))

test('audits-prospects.json : chaque domaine a des constats non vides', () => {
  assert.ok(audits.length >= 1)
  for (const a of audits) {
    assert.match(a.domaine, /^[a-z0-9-]+(\.[a-z0-9-]+)+$/, a.domaine)
    assert.ok(a.constats.length >= 1 && a.constats.length <= 3, `${a.domaine} : ${a.constats.length} constat(s)`)
    for (const c of a.constats) {
      assert.ok(c.titre.trim().length > 0, `${a.domaine} : titre vide`)
      assert.ok(c.texte.trim().length > 0, `${a.domaine} : texte vide`)
      // Un titre de page cité entre « » peut porter le tiret cadratin du prospect, pas notre texte.
      assert.doesNotMatch((c.titre + c.texte).replace(/«[^»]*»/g, ''), /—/, `${a.domaine} : tiret cadratin`)
    }
  }
  assert.equal(new Set(audits.map((a) => a.domaine)).size, audits.length, 'domaines en double')
})

test('trouverAudit : accepte les domaines de la liste, refuse le reste', () => {
  assert.equal(trouverAudit(audits, audits[0].domaine)?.domaine, audits[0].domaine)
  assert.equal(trouverAudit(audits, ` ${audits[0].domaine.toUpperCase()} `)?.domaine, audits[0].domaine)
  assert.equal(trouverAudit(audits, 'inconnu.fr'), undefined)
  assert.equal(trouverAudit(audits, ''), undefined)
  assert.equal(trouverAudit(audits, undefined), undefined)
  assert.equal(trouverAudit(audits, 42), undefined)
  assert.equal(trouverAudit(audits, { domaine: audits[0].domaine }), undefined)
})
