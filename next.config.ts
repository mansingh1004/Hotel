import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS editors paste image URLs from arbitrary hosts (see the Keystatic
    // "images as URLs" model), so we allow any HTTPS source. Note: this is
    // broader than Next.js's "be specific" security guidance — acceptable
    // here, but tighten to specific hosts if this ever goes to production.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
