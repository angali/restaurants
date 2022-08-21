/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    HERE_API_ID: process.env.HERE_API_ID,
    HERE_API_KEY: process.env.HERE_API_KEY
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_NAME: 'Restaurant Finder',
    API: '/api',
    PRODUCTION: process.env.PRODUCTION ||false,
    DOMAIN: 'http://localhost:3000',
    HERE_API_DISCOVER_URL: process.env.HERE_API_DISCOVER_URL || 'https://discover.search.hereapi.com/v1/discover',
    HERE_API_LOOKUP_URL: process.env.HERE_API_LOOKUP_URL || 'https://lookup.search.hereapi.com/v1/lookup',
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY 
  },
  reactStrictMode: true,
  swcMinify: true,
  
}

module.exports = nextConfig
