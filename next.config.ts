import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // High-quality hotel imagery is served from Unsplash's CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
