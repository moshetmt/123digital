'use client'

import { useEffect, useState } from 'react'

/**
 * Navigation par ancres de la colonne de gauche (ordinateur seulement).
 * L'entree de la section visible passe en vert clair au defilement.
 * Pas de trait indicateur : la couleur et la graisse suffisent (regle « jamais
 * de trait decoratif »).
 */
export function CvNav({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const onScroll = () => {
      // Section active = la derniere dont le haut a passe le tiers de l'ecran.
      const seuil = window.innerHeight / 3
      let courant = sections[0]?.id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= seuil) courant = section.id
      }
      // En bas de page, la derniere section (courte) devient active.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        courant = sections[sections.length - 1]?.id
      }
      setActive(courant)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex flex-col" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '0.15rem' }}>
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="inline-block transition-colors hover:text-[#F2F7F4]"
                style={{
                  padding: '0.3rem 0',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? '#6FB791' : '#8FA497',
                }}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
