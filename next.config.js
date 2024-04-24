/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    return "prod-build";
  },
};

module.exports = nextConfig;
