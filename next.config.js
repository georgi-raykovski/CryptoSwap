/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_ID: process.env.APP_ID,
    SERVER_URL: process.env.SERVER_URL,
    CRYPTO_API_KEY: process.env.CRYPTO_API_KEY,
  },
};

module.exports = nextConfig;
