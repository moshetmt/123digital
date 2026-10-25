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
    ];
  },
};

export default nextConfig;
