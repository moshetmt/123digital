'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Briefcase, Coins, Gem, Hammer, Monitor, Rocket, Search, ShoppingBag, Smartphone, Sparkles, Stethoscope, TrendingUp, UtensilsCrossed, Wallet } from 'lucide-react'

interface Question {
  id: string
  label: string
  options: Array<{ value: string; label: string; icon: LucideIcon }>
}

const questions: Question[] = [
  {
    id: 'secteur',
    label: 'Quel est votre secteur ?',
    options: [
      { value: 'restaurant', label: 'Restaurant / Bar', icon: UtensilsCrossed },
      { value: 'artisan', label: 'Artisan / BTP', icon: Hammer },
      { value: 'commerce', label: 'Commerce / Boutique', icon: ShoppingBag },
      { value: 'services', label: 'Services / Conseil', icon: Briefcase },
      { value: 'medical', label: 'Santé / Médical', icon: Stethoscope },
      { value: 'autre', label: 'Autre', icon: Sparkles },
    ],
  },
  {
    id: 'probleme',
    label: 'Quel est votre principal défi ?',
    options: [
      { value: 'visibilite', label: 'Pas assez visible sur Google', icon: Search },
      { value: 'site', label: 'Site web vieillissant', icon: Monitor },
      { value: 'leads', label: 'Pas assez de leads', icon: TrendingUp },
      { value: 'reseaux', label: 'Réseaux sociaux inexploités', icon: Smartphone },
    ],
  },
  {
    id: 'budget',
    label: 'Quel est votre budget mensuel envisagé ?',
    options: [
      { value: 'small', label: 'Moins de 500 €', icon: Wallet },
      { value: 'medium', label: '500 — 1 500 €', icon: Coins },
      { value: 'large', label: '1 500 — 3 000 €', icon: Gem },
      { value: 'xl', label: 'Plus de 3 000 €', icon: Rocket },
    ],
  },
]

const recommendations: Record<string, Record<string, { titre: string; action: string; description: string }>> = {
  visibilite: {
    default: {
      titre: 'SEO local prioritaire',
      action: 'Audit SEO gratuit',
      description: 'Votre principal levier est le référencement local. Je vais analyser votre positionnement actuel et identifier les 3 opportunités les plus rapides à saisir.',
    },
  },
  site: {
    default: {
      titre: 'Refonte & conversion',
      action: 'Audit site gratuit',
      description: 'Un site qui ne convertit pas est un frein à votre croissance. Je vais analyser votre site actuel et vous donner un plan de refonte priorisé.',
    },
  },
  leads: {
    small: {
      titre: 'SEO + Google Business',
      action: 'Audit gratuit',
      description: 'Avec un budget maîtrisé, le SEO local et l\'optimisation de votre fiche Google Business vous apporteront le meilleur ROI.',
    },
    medium: {
      titre: 'SEO + Google Ads',
      action: 'Stratégie recommandée',
      description: 'La combinaison idéale : SEO pour la visibilité long terme et Google Ads pour des leads immédiats. Je vais vous montrer comment équilibrer les deux.',
    },
    large: {
      titre: 'Stratégie multicanale',
      action: 'Plan complet',
      description: 'Avec ce budget, on peut déployer une stratégie complète : SEO, Ads, contenu et automatisation. Audit gratuit pour définir les priorités.',
    },
    xl: {
      titre: 'Croissance accélérée',
      action: 'Roadmap 6 mois',
      description: 'Ce budget permet une présence digitale dominante. Je vous propose une roadmap 6 mois avec des jalons mesurables.',
    },
  },
  reseaux: {
    default: {
      titre: 'Community Management',
      action: 'Stratégie réseaux',
      description: 'Vos réseaux sociaux sont un canal sous-exploité. Je vais analyser votre présence actuelle et vous proposer une stratégie éditoriale efficace.',
    },
  },
}

function getRecommendation(answers: Record<string, string>) {
  const probleme = answers.probleme ?? 'leads'
  const budget = answers.budget ?? 'medium'

  const byProbleme = recommendations[probleme]
  if (!byProbleme) return recommendations.leads.medium

  return byProbleme[budget] ?? byProbleme.default ?? recommendations.leads.medium
}

export function AuditSimulator() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const currentQuestion = questions[step]
  const isComplete = step >= questions.length
  const recommendation = isComplete ? getRecommendation(answers) : null

  function handleSelect(value: string) {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setStep(questions.length)
    }
  }

  function handleReset() {
    setStep(0)
    setAnswers({})
    setHoveredOption(null)
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--line)',
        borderRadius: '1.25rem',
        boxShadow: '0 8px 30px var(--shadow-soft)',
        padding: 'clamp(1.25rem, 4vw, 2.25rem)',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--brand)',
            fontWeight: 700,
          }}
        >
          Simulateur d&apos;audit
        </div>

        {!isComplete && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--ink-3)',
            }}
          >
            {step + 1} / {questions.length}
          </div>
        )}
      </div>

      {/* Barre de progression */}
      {!isComplete && (
        <div
          style={{
            height: '2px',
            backgroundColor: 'var(--surface-3)',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              height: '2px',
              backgroundColor: 'var(--brand)',
              width: `${((step) / questions.length) * 100}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}

      {/* Question actuelle */}
      {!isComplete && (
        <div>
          <h3
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--ink)', lineHeight: 1.2 }}
          >
            {currentQuestion.label}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
                style={{
                  padding: '0.85rem 0.75rem',
                  borderRadius: '0.85rem',
                  border: `1px solid ${hoveredOption === option.value ? 'var(--brand)' : 'var(--ink-3)'}`,
                  backgroundColor: hoveredOption === option.value ? 'var(--brand-tint)' : 'transparent',
                  color: hoveredOption === option.value ? 'var(--ink)' : 'var(--ink-2)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <option.icon size={20} aria-hidden style={{ color: 'var(--brand)' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 500, lineHeight: 1.3 }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Réponses déjà données */}
          {step > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {questions.slice(0, step).map((q) => {
                const ans = answers[q.id]
                const opt = q.options.find((o) => o.value === ans)
                return opt ? (
                  <span
                    key={q.id}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: 999,
                      backgroundColor: 'var(--brand-tint)',
                      border: '1px solid var(--brand-line)',
                      color: 'var(--brand)',
                      fontSize: '0.72rem',
                    }}
                  >
                    {opt.label}
                  </span>
                ) : null
              })}
            </div>
          )}
        </div>
      )}

      {/* Résultat */}
      {isComplete && recommendation && (
        <div>
          <div
            style={{
              height: '2px',
              backgroundColor: 'var(--brand)',
              marginBottom: '2rem',
            }}
          />

          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            Recommandation personnalisée
          </div>

          <h3
            className="font-display font-extrabold mb-4"
            style={{ fontSize: '1.5rem', color: 'var(--brand)', lineHeight: 1.2 }}
          >
            {recommendation.titre}
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {recommendation.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/audit-gratuit"
              style={{
                display: 'inline-block',
                borderRadius: 999,
                padding: '0.85rem 1.75rem',
                backgroundColor: 'var(--brand)',
                color: 'var(--on-brand)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              {recommendation.action} →
            </Link>
            <button
              onClick={handleReset}
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: 999,
                border: '1px solid var(--line)',
                color: 'var(--ink-2)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              Recommencer
            </button>
          </div>

          {/* Résumé des réponses */}
          <div className="flex flex-wrap gap-2 mt-4">
            {questions.map((q) => {
              const ans = answers[q.id]
              const opt = q.options.find((o) => o.value === ans)
              return opt ? (
                <span
                  key={q.id}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: 999,
                    border: '1px solid var(--line)',
                    color: 'var(--ink-3)',
                    fontSize: '0.72rem',
                  }}
                >
                  {opt.label}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
