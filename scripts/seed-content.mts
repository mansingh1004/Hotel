/**
 * One-time seed: materialises the hard-coded data from lib/data.ts into
 * per-entry JSON files under content/, matching the Keystatic schema.
 *
 * Run with: npm run seed:content
 * Safe to re-run — it overwrites the seeded files.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  hotels,
  destinations,
  offers,
  testimonials,
  services,
  team,
  galleryImages,
  faqs,
  stats,
  awards,
} from "../lib/data";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "item";

function writeEntry(collection: string, slug: string, data: unknown) {
  const dir = join(CONTENT, collection);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, `${slug}.json`),
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );
}

// Start clean so removed source entries don't linger.
rmSync(CONTENT, { recursive: true, force: true });

/* ---- Hotels (name = slug field; slug becomes the filename) ---- */
hotels.forEach((h, i) => {
  writeEntry("hotels", h.slug, {
    name: h.name,
    order: i + 1,
    tagline: h.tagline,
    category: h.category,
    city: h.city,
    country: h.country,
    coordinates: h.coordinates,
    rating: h.rating,
    reviewsCount: h.reviewsCount,
    pricePerNight: h.pricePerNight,
    currency: h.currency,
    starRating: String(h.starRating),
    featured: h.featured,
    description: h.description,
    longDescription: h.longDescription,
    amenities: h.amenities,
    images: h.images,
    rooms: h.rooms.map((r) => ({
      name: r.name,
      type: r.type,
      price: r.price,
      size: r.size,
      capacity: r.capacity,
      beds: r.beds,
      image: r.image,
      gallery: r.gallery,
      features: r.features,
      description: r.description,
    })),
    reviews: h.reviews.map((rv) => ({
      author: rv.author,
      avatar: rv.avatar,
      rating: rv.rating,
      date: rv.date,
      title: rv.title,
      body: rv.body,
      country: rv.country,
    })),
  });
});

/* ---- Destinations ---- */
destinations.forEach((d, i) => {
  writeEntry("destinations", slugify(d.name), {
    name: d.name,
    order: i + 1,
    country: d.country,
    image: d.image,
    hotelsCount: d.hotelsCount,
    fromPrice: d.fromPrice,
  });
});

/* ---- Offers ---- */
offers.forEach((o, i) => {
  writeEntry("offers", slugify(o.title), {
    title: o.title,
    order: i + 1,
    description: o.description,
    discount: o.discount,
    image: o.image,
    code: o.code,
    validUntil: o.validUntil,
    badge: o.badge,
  });
});

/* ---- Testimonials ---- */
testimonials.forEach((t, i) => {
  writeEntry("testimonials", slugify(t.name), {
    name: t.name,
    order: i + 1,
    role: t.role,
    avatar: t.avatar,
    rating: t.rating,
    quote: t.quote,
    location: t.location,
  });
});

/* ---- Services ---- */
services.forEach((s, i) => {
  writeEntry("services", slugify(s.title), {
    title: s.title,
    order: i + 1,
    description: s.description,
    icon: s.icon,
    image: s.image,
    features: s.features,
  });
});

/* ---- Team ---- */
team.forEach((m, i) => {
  writeEntry("team", slugify(m.name), {
    name: m.name,
    order: i + 1,
    role: m.role,
    image: m.image,
    bio: m.bio,
  });
});

/* ---- Gallery ---- */
galleryImages.forEach((g, i) => {
  writeEntry("gallery", slugify(g.title), {
    title: g.title,
    order: i + 1,
    src: g.src,
    category: g.category,
    span: g.span ?? "normal",
  });
});

/* ---- FAQs ---- */
faqs.forEach((f, i) => {
  writeEntry("faqs", slugify(f.question), {
    question: f.question,
    order: i + 1,
    category: f.category,
    answer: f.answer,
  });
});

/* ---- About singleton (stats + awards) ---- */
mkdirSync(CONTENT, { recursive: true });
writeFileSync(
  join(CONTENT, "about.json"),
  JSON.stringify({ stats, awards }, null, 2) + "\n",
  "utf8"
);

console.log("Seeded content/ from lib/data.ts");
