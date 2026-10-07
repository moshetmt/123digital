import { BASE_URL } from '@/lib/schema'
import { services } from '@/data/services'
import { problemes } from '@/data/problemes'
import { articles } from '@/data/blog'
import { etudesDeCas } from '@/data/etudes-de-cas'
import { secteurs } from '@/data/secteurs'

// llms.txt : index lisible par les moteurs génératifs (llmstxt.org). Généré depuis
// les données du site, donc jamais en retard sur le sitemap. Chantier 5 du plan du 20/08.

export const dynamic = 'force-static'

export function GET() {
  const lignes: string[] = [
    '# 123 Digital, Maurice Timsit, consultant digital à Lyon',
    '',
    '> Consultant indépendant pour les artisans, commerçants et PME : site web qui fait appeler, référencement, Google Ads, fiche Google. Un seul interlocuteur, à distance, France entière, basé à Lyon. Audit gratuit de 30 minutes.',
    '',
    `Site : ${BASE_URL}`,
    `Contact : ${BASE_URL}/contact`,
    `Audit gratuit : ${BASE_URL}/audit-gratuit`,
    `À propos : ${BASE_URL}/a-propos`,
    '',
    '## Problèmes fréquents, diagnostic et solution',
    '',
    ...problemes.map((p) => `- [${p.titre}](${BASE_URL}/problemes/${p.slug}) : ${p.reponse}`),
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.title}](${BASE_URL}${s.href}) : ${s.shortDesc}`),
    '',
    '## Réalisations (sites en ligne, vérifiables)',
    '',
    ...etudesDeCas.map((e) => `- [${e.client.nom}, ${e.client.metier}](${BASE_URL}/realisations/${e.slug})`),
    '',
    '## Guides',
    '',
    ...articles.map((a) => `- [${a.titre}](${BASE_URL}/blog/${a.slug}) : ${a.description}`),
    '',
    '## Secteurs',
    '',
    ...secteurs.map((s) => `- [${s.nomPluriel}](${BASE_URL}/secteurs/${s.slug})`),
    '',
    '## Optional',
    '',
    `- [Plan du site](${BASE_URL}/sitemap.xml)`,
    `- [Mentions légales](${BASE_URL}/mentions-legales)`,
    '',
  ]
  return new Response(lignes.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
