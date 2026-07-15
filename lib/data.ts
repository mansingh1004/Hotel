import type {
  Hotel,
  Room,
  RoomType,
  Review,
  AmenityKey,
  Destination,
  Offer,
  Testimonial,
  Service,
  TeamMember,
  GalleryImage,
  FaqItem,
} from "@/types";
import contentData from "./content.data.json";

/* ------------------------------------------------------------------ *
 * Content source
 * ------------------------------------------------------------------ *
 * Content is authored in the Keystatic CMS at /keystatic and stored as
 * per-entry JSON under content/. `scripts/generate-content.mjs` aggregates
 * those files into content.data.json (run automatically before dev/build).
 *
 * This module reads that aggregate synchronously and reshapes it into the
 * exact same exports the app relied on before the CMS — so no page or
 * component had to change. Computed fields (id, location, review/room ids)
 * are derived here, exactly as they were previously.
 * ------------------------------------------------------------------ */

interface RawRoom {
  name: string;
  type: string;
  price: number;
  size: number;
  capacity: number;
  beds: string;
  image: string;
  gallery: string[];
  features: string[];
  description: string;
}

interface RawReview {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  country: string;
}

interface RawHotel {
  slug: string;
  name: string;
  order: number;
  tagline: string;
  category: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  currency: string;
  starRating: string;
  featured: boolean;
  description: string;
  longDescription: string;
  amenities: string[];
  images: string[];
  rooms: RawRoom[];
  reviews: RawReview[];
}

interface RawContent {
  hotels: RawHotel[];
  destinations: (Omit<Destination, "id"> & { slug: string; order: number })[];
  offers: (Omit<Offer, "id"> & { slug: string; order: number })[];
  testimonials: (Omit<Testimonial, "id"> & { slug: string; order: number })[];
  services: (Omit<Service, "id"> & { slug: string; order: number })[];
  team: (Omit<TeamMember, "id"> & { slug: string; order: number })[];
  gallery: (Omit<GalleryImage, "id"> & { slug: string; order: number })[];
  faqs: (Omit<FaqItem, "id"> & { slug: string; order: number })[];
  about: {
    stats: { value: number; suffix: string; label: string }[];
    awards: { year: string; title: string; org: string }[];
  };
}

const data = contentData as unknown as RawContent;

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

/* ------------------------------------------------------------------ *
 * Hotels
 * ------------------------------------------------------------------ */

export const hotels: Hotel[] = [...data.hotels].sort(byOrder).map((h, i) => {
  const id = `hotel-${i + 1}`;
  const rooms: Room[] = h.rooms
    // Ignore blank room rows added but not filled in the CMS.
    .filter((r) => r.name && r.image)
    .map((r, ri) => ({
      id: `${id}-room-${ri}`,
      name: r.name,
      type: (r.type as RoomType) ?? "Standard",
      price: r.price ?? 0,
      size: r.size ?? 0,
      capacity: r.capacity ?? 0,
      beds: r.beds ?? "",
      image: r.image,
      gallery: r.gallery ?? [],
      features: r.features ?? [],
      description: r.description ?? "",
    }));
  const reviews: Review[] = h.reviews
    // Ignore blank review rows added but not filled in the CMS.
    .filter((rv) => rv.author && rv.avatar)
    .map((rv, vi) => ({
      id: `rev-${i + 1}-${vi}`,
      author: rv.author,
      avatar: rv.avatar,
      rating: rv.rating ?? 0,
      date: rv.date ?? "",
      title: rv.title ?? "",
      body: rv.body ?? "",
      country: rv.country ?? "",
    }));

  return {
    id,
    slug: h.slug,
    name: h.name,
    tagline: h.tagline,
    location: `${h.city}, ${h.country}`,
    city: h.city,
    country: h.country,
    coordinates: h.coordinates,
    rating: h.rating ?? 0,
    reviewsCount: h.reviewsCount ?? 0,
    pricePerNight: h.pricePerNight ?? 0,
    currency: h.currency,
    starRating: Number(h.starRating) as 3 | 4 | 5,
    featured: h.featured,
    category: h.category,
    description: h.description,
    longDescription: h.longDescription,
    images: h.images,
    amenities: h.amenities as AmenityKey[],
    rooms,
    reviews,
  };
});

export const getHotelBySlug = (slug: string) =>
  hotels.find((h) => h.slug === slug);

export const getFeaturedHotels = () => hotels.filter((h) => h.featured);

export const getSimilarHotels = (hotel: Hotel, limit = 3) =>
  hotels
    .filter((h) => h.id !== hotel.id && h.category === hotel.category)
    .concat(hotels.filter((h) => h.id !== hotel.id))
    .filter((h, i, arr) => arr.findIndex((x) => x.id === h.id) === i)
    .slice(0, limit);

/** Flattened, de-duplicated room list for the standalone Rooms page. */
export const rooms: (Room & { hotelName: string; hotelSlug: string })[] =
  hotels.flatMap((h) =>
    h.rooms.map((r) => ({ ...r, hotelName: h.name, hotelSlug: h.slug }))
  );

/* ------------------------------------------------------------------ *
 * Destinations
 * ------------------------------------------------------------------ */

export const destinations: Destination[] = [...data.destinations]
  .sort(byOrder)
  .map((d) => ({
    id: d.slug,
    name: d.name,
    country: d.country,
    image: d.image,
    hotelsCount: d.hotelsCount,
    fromPrice: d.fromPrice,
  }));

/* ------------------------------------------------------------------ *
 * Offers
 * ------------------------------------------------------------------ */

export const offers: Offer[] = [...data.offers].sort(byOrder).map((o) => ({
  id: o.slug,
  title: o.title,
  description: o.description,
  discount: o.discount,
  image: o.image,
  code: o.code,
  validUntil: o.validUntil,
  badge: o.badge,
}));

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export const testimonials: Testimonial[] = [...data.testimonials]
  .sort(byOrder)
  .map((t) => ({
    id: t.slug,
    name: t.name,
    role: t.role,
    avatar: t.avatar,
    rating: t.rating,
    quote: t.quote,
    location: t.location,
  }));

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export const services: Service[] = [...data.services].sort(byOrder).map((s) => ({
  id: s.slug,
  title: s.title,
  description: s.description,
  icon: s.icon,
  image: s.image,
  features: s.features,
}));

/* ------------------------------------------------------------------ *
 * About — team, awards, stats
 * ------------------------------------------------------------------ */

export const team: TeamMember[] = [...data.team].sort(byOrder).map((m) => ({
  id: m.slug,
  name: m.name,
  role: m.role,
  image: m.image,
  bio: m.bio,
}));

export const awards: { year: string; title: string; org: string }[] =
  data.about.awards;

export const stats: { value: number; suffix: string; label: string }[] =
  data.about.stats;

/* ------------------------------------------------------------------ *
 * Gallery
 * ------------------------------------------------------------------ */

export const galleryImages: GalleryImage[] = [...data.gallery]
  // Defensive: skip incomplete CMS entries that have no image to render.
  .filter((g) => g.src)
  .sort(byOrder)
  .map((g) => ({
    id: g.slug,
    src: g.src,
    category: g.category,
    title: g.title,
    span: g.span,
  }));

export const galleryCategories = [
  "All",
  ...Array.from(
    new Set(galleryImages.map((g) => g.category).filter(Boolean))
  ),
];

/* ------------------------------------------------------------------ *
 * FAQ
 * ------------------------------------------------------------------ */

export const faqs: FaqItem[] = [...data.faqs].sort(byOrder).map((f) => ({
  id: f.slug,
  question: f.question,
  answer: f.answer,
  category: f.category,
}));

export const faqCategories = [
  "All",
  ...Array.from(new Set(faqs.map((f) => f.category))),
];
