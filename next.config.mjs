import nextPWA from "next-pwa";
const withPWA = nextPWA({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  // next.js config
  experimental: {
    appDir: true, // <---- Comment and Uncomment this
  },
});

export default nextConfig;
