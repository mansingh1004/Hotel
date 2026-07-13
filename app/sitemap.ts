import type { MetadataRoute } from "next";
import { hotels } from "@/lib/data";

const BASE_URL = "https://luxvoy.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/hotels",
    "/rooms",
    "/services",
    "/gallery",
    "/about",
    "/contact",
    "/faq",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const hotelRoutes = hotels.map((h) => ({
    url: `${BASE_URL}/hotels/${h.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...hotelRoutes];
}
