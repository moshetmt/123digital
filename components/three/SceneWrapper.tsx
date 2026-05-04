'use client'

import dynamic from 'next/dynamic'

// Three.js ne peut pas tourner côté serveur — import dynamique SSR-safe
const Scene3D = dynamic(
  () => import('./Scene3D').then((m) => m.Scene3D),
  { ssr: false },
)

export function SceneWrapper() {
  return <Scene3D />
}
