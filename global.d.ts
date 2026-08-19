export {}

declare global {
  interface Window {
    // Injecté par le <Script> GA4 de app/layout.tsx en stratégie afterInteractive :
    // absent tant que la page n'est pas hydratée, et bloqué par certains adblockers.
    gtag?: (
      command: 'config' | 'event' | 'js',
      target: string,
      params?: Record<string, unknown>,
    ) => void
  }
}
