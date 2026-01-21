import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  // Experimental optimizations for Next.js 15+
  experimental: {
    optimizePackageImports: ["react-icons", "date-fns", "animejs"],
  },

  // Bundle analyzer (enable when needed)
  // bundleAnalyzer: { enabled: process.env.ANALYZE === 'true' },
};

export default nextConfig;
