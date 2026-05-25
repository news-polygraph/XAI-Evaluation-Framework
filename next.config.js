/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  generateBuildId: async () => {
    return "prod-build";
  },
};

module.exports = nextConfig;
