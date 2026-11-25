import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prefereMarkdown } from '../lib/negociation.ts'
import { htmlVersMarkdown, markdown404 } from '../lib/markdown.ts'

// node --test tests/ (npm test)

test('prefereMarkdown : agents et navigateurs', () => {
  assert.equal(prefereMarkdown('text/markdown'), true)
  assert.equal(prefereMarkdown('text/markdown, text/html;q=0.8'), true)
  assert.equal(prefereMarkdown('text/markdown, text/html'), true)
  assert.equal(prefereMarkdown('text/html, text/markdown'), false)
  assert.equal(prefereMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'), false)
  assert.equal(prefereMarkdown('text/markdown;q=0.5, */*'), false)
  assert.equal(prefereMarkdown('text/markdown;q=0'), false)
  assert.equal(prefereMarkdown(null), false)
})

test('htmlVersMarkdown : garde le main, liens absolus, renvoi vers llms.txt', () => {
  const html = '<html><head><title>T</title></head><body><nav><a href="/x">Menu</a></nav>' +
    '<main><h1>Bonjour</h1><p>Un <a href="/audit-gratuit">audit</a><!-- --> offert.</p>' +
    '<script>alert(1)</script><ul><li>Un</li></ul><a href="/lyon"><img alt="" src="/_next/image?url=x.jpg"/>Lyon</a>' +
    '</main><footer>Pied</footer></body></html>'
  const md = htmlVersMarkdown(html, 'https://123digital.fr/')
  assert.match(md, /^# Bonjour/)
  assert.match(md, /\[audit\]\(https:\/\/123digital\.fr\/audit-gratuit\) offert\./)
  assert.match(md, /- {1,3}Un/)
  assert.doesNotMatch(md, /Menu|Pied|alert|_next\/image/)
  assert.match(md, /\[Lyon\]\(https:\/\/123digital\.fr\/lyon\)/)
  assert.match(md, /https:\/\/123digital\.fr\/llms\.txt/)
})

test('htmlVersMarkdown : titre de la page si le main n a pas de h1', () => {
  assert.match(htmlVersMarkdown('<title>Titre</title><main><p>x</p></main>', 'https://123digital.fr/a'), /^# Titre/)
})

test('markdown404 : explique l erreur et donne llms.txt et le sitemap', () => {
  const md = markdown404('/rien', 'https://123digital.fr')
  assert.ok(md.length >= 20)
  assert.match(md, /404/)
  assert.match(md, /\/llms\.txt/)
  assert.match(md, /\/sitemap\.xml/)
})

test('dates-pages.json : une vraie date AAAA-MM-JJ par page, jamais le jour du build', async () => {
  const { readFileSync } = await import('node:fs')
  const dates = JSON.parse(readFileSync(new URL('../data/dates-pages.json', import.meta.url), 'utf8'))
  for (const cle of ['/', '/audit-gratuit', '/services/seo', 'realisation', 'secteur', 'ville', 'villeService', 'en'])
    assert.match(dates[cle], /^\d{4}-\d{2}-\d{2}$/, cle)
})
