import type { FAQ } from '@/lib/schema'

export const homeFaqsFR: FAQ[] = [
  {
    question: 'Combien coûte un accompagnement digital avec 123 Digital ?',
    answer:
      "Chaque projet est unique et les tarifs sont établis sur mesure lors de l'audit gratuit. Les missions démarrent généralement à partir de 500\u00a0€/mois pour un accompagnement ponctuel, jusqu'à des forfaits mensuels pour un suivi continu. L'audit de 30 minutes est entièrement gratuit et sans engagement.",
  },
  {
    question: 'En combien de temps voit-on des résultats en SEO ?',
    answer:
      "Le SEO est une stratégie de fond : les premiers résultats significatifs apparaissent entre 3 et 6 mois. Certaines actions comme le SEO local ou les corrections techniques peuvent générer des améliorations visibles en quelques semaines. Je suis transparent sur les délais réalistes dès la phase de stratégie.",
  },
  {
    question: "Êtes-vous spécialisé dans un secteur d'activité particulier ?",
    answer:
      "Non, et c'est une force : j'ai accompagné des clients dans plus de 12 secteurs différents (artisanat, B2B, e-commerce, professions libérales, restauration...). Chaque secteur a ses spécificités que j'intègre dès l'audit pour adapter la stratégie à votre marché réel.",
  },
  {
    question: "Comment se déroule l'audit digital gratuit ?",
    answer:
      "L'audit se passe en visioconférence, dure 30 minutes et analyse les points clés de votre présence digitale : site web (performance, SEO, UX), visibilité Google, réseaux sociaux, et opportunités de croissance rapide. Vous repartez avec un plan d'action concret, que vous travailliez avec moi ou non.",
  },
  {
    question: "Travaillez-vous avec des entreprises en dehors de Lyon ?",
    answer:
      "Absolument. Je travaille en 100\u00a0% distanciel avec des clients partout en France, de Lyon à Bordeaux en passant par Nantes ou Strasbourg. La majorité des missions se déroulent en visioconférence et par email.",
  },
]

export const homeFaqsEN: FAQ[] = [
  {
    question: 'How much does working with 123 Digital cost?',
    answer:
      'Every project is unique and pricing is set during the free audit. Engagements typically start from €500/month for one-off work, up to monthly retainers for ongoing support. The 30-minute audit is completely free with no commitment.',
  },
  {
    question: 'How long before I see SEO results?',
    answer:
      'SEO is a long-term strategy: the first meaningful results typically appear within 3 to 6 months. Some actions like local SEO or technical fixes can produce visible improvements within a few weeks. I am transparent about realistic timelines from the strategy phase onward.',
  },
  {
    question: 'Do you specialise in a particular industry?',
    answer:
      'No — and that is actually a strength. I have worked with clients across more than 12 different sectors (trades, B2B, e-commerce, self-employed professionals, hospitality…). Each sector has its own specifics, which I factor in from the audit to tailor the strategy to your actual market.',
  },
  {
    question: 'What happens during the free digital audit?',
    answer:
      'The audit takes place over video call, lasts 30 minutes and covers the key pillars of your digital presence: website (performance, SEO, UX), Google visibility, social media, and quick-win growth opportunities. You leave with a concrete action plan — whether you work with me afterwards or not.',
  },
  {
    question: 'Do you work with businesses outside of Lyon?',
    answer:
      'Absolutely. I work 100% remotely with clients across France, from Lyon to Bordeaux, Nantes, Strasbourg, and beyond. Most engagements run via video call and email.',
  },
]

export const homeFaqs = homeFaqsFR

export function getHomeFaqs(lang: 'fr' | 'en'): FAQ[] {
  return lang === 'en' ? homeFaqsEN : homeFaqsFR
}
