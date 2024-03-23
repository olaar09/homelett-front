import nextPWA from "next-pwa";
const runtimeCaching = require("next-pwa/cache");

const withPWA = nextPWA({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
});

export default nextConfig;
