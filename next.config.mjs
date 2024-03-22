import nextPWA from "next-pwa";
const withPWA = nextPWA({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  // next.js config
});

export default nextConfig;
