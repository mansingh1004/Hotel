# Luxvoy — Premium Luxury Hotel Booking Website

A modern, premium, fully responsive hotel booking experience built with the
**App Router**, animated with **Framer Motion**, and styled with a bespoke
**Tailwind CSS v4** luxury design system.

## Tech Stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack) + React 19      |
| Language       | TypeScript (strict)                                |
| Styling        | Tailwind CSS v4 (CSS-first `@theme` tokens)        |
| Animation      | Framer Motion                                      |
| Icons          | Lucide React                                       |
| Sliders        | Swiper.js                                          |
| Forms          | React Hook Form + Zod                              |
| Images         | `next/image` (optimised Unsplash CDN imagery)      |

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Pages

- `/` — Home: hero + search, featured hotels, destinations, room categories,
  amenities, offers, testimonials, stats, CTA, Instagram gallery
- `/hotels` — Listing with grid/list views, filters (price, rating, location,
  amenities, room type), sorting, and pagination
- `/hotels/[slug]` — Details: image gallery + lightbox, amenities, room options,
  Google map, reviews, sticky booking sidebar, similar hotels (statically generated)
- `/rooms` — Room & suite catalogue with animated category filtering
- `/services` — Spa, dining, pools, fitness, transfers, conferences
- `/about` — Story, mission & vision, team, awards, stats
- `/gallery` — Masonry gallery with category filter and lightbox
- `/contact` — Validated contact form (RHF + Zod), details, map
- `/faq` — Animated accordion with category filter

## Design System

Brand tokens live in [`app/globals.css`](app/globals.css) under Tailwind v4's
`@theme` block, exposing utilities like `bg-primary`, `text-gold`,
`font-display`, `shadow-soft`, and helpers such as `.glass` and
`.text-gradient-gold`.

- **Primary** `#0F4C81` (Royal Blue) · **Secondary** `#D4AF37` (Gold)
- **Accent** `#0F9D63` (Emerald) · Background White / Light Gray
- Display type: Playfair Display · Body type: Inter

## Project Structure

```
app/            Routes, layout, sitemap, robots, not-found, loading
components/     Reusable UI, cards, layout, booking, hotels, gallery, faq, contact
sections/       Page-level composed sections (home)
lib/            Sample data, helpers, image registry, motion tokens
types/          Shared TypeScript interfaces
```

## Notes

- Sample data lives in [`lib/data.ts`](lib/data.ts) — swap it for a CMS or API
  without touching the UI.
- SEO: per-page metadata, Open Graph, generated `sitemap.xml` and `robots.txt`.
- Remote images are limited to `images.unsplash.com` in
  [`next.config.ts`](next.config.ts) — add hosts there as needed.
