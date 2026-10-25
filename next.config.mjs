/** @type {import('next').NextConfig} */
// Fichier lu par Next (prioritaire sur next.config.ts, qui est ignoré).
const nextConfig = {
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
