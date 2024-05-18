import nextPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  runtimeCaching,
  reactStrictMode: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

export default nextConfig;
