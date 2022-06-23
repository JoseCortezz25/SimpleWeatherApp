/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
  pwa: {
    dest: 'public',
    register: true,
    mode: 'production',
    disable: false,
    env: {
      WEATHER_KEY: '70acd7ea86ae3d7d3c45a37ae2ffff8d'
    }
  },
  reactStrictMode: true
}

module.exports = nextConfig
