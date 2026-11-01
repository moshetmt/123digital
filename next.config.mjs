/** @type {import('next').NextConfig} */
// Seul fichier de configuration lu par Next. next.config.ts, ignoré car .mjs passe avant,
// est supprimé le 25/10 et ses réglages d'images sont repris ici.
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    remotePatterns: [{ protocol: 'https', hostname: '123digital.fr' }],
  },
  // Adresses que les agents IA vérifient d'office (About, Privacy) vers les pages françaises.
  async redirects() {
    return [
      { source: '/about', destination: '/a-propos', permanent: true },
      { source: '/privacy', destination: '/confidentialite', permanent: true },
      { source: '/politique-de-confidentialite', destination: '/confidentialite', permanent: true },
      // 01/11/2026, go de l'opérateur : 19 pages géographiques sans preuve, 301 vers la page gardée la plus proche
      // (rapport ads-os 06-reports/2026-11-01-pages-ville-a-valider.md). Retirées aussi de data/indexation.ts.
      ...[
        ['/annemasse', '/lyon'],
        ['/annemasse/seo', '/services/seo'],
        ['/valence', '/lyon'],
        ['/valence/automatisation-marketing', '/services/automatisation-marketing'],
        ['/annecy', '/lyon'],
        ['/annecy/creation-site-web', '/services/creation-site-web'],
        ['/roanne', '/lyon'],
        ['/roanne/seo', '/services/seo'],
        ['/clermont-ferrand', '/lyon'],
        ['/clermont-ferrand/publicite-en-ligne', '/services/publicite-en-ligne'],
        ['/saint-etienne', '/lyon'],
        ['/saint-etienne/community-management', '/services/community-management'],
        ['/saint-etienne/creation-site-web', '/services/creation-site-web'],
        ['/albertville', '/lyon'],
        ['/albertville/creation-site-web', '/services/creation-site-web'],
        ['/macon/seo', '/consultant-seo-bourg-en-bresse'],
        ['/bourg-en-bresse/community-management', '/services/community-management'],
        ['/oyonnax/community-management', '/services/community-management'],
        ['/oyonnax/publicite-en-ligne', '/services/publicite-en-ligne'],
      ].map(([source, destination]) => ({ source, destination, statusCode: 301 })),
    ];
  },
};

export default nextConfig;
