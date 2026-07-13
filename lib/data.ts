import type {
  Hotel,
  Room,
  Review,
  Destination,
  Offer,
  Testimonial,
  Service,
  TeamMember,
  GalleryImage,
  FaqItem,
} from "@/types";
import { img, PHOTOS } from "@/lib/images";

/* ------------------------------------------------------------------ *
 * Reusable builders keep the catalogue compact and consistent.
 * ------------------------------------------------------------------ */

const REVIEW_POOL: Omit<Review, "id">[] = [
  {
    author: "Isabella Moretti",
    avatar: img(PHOTOS.guest1, 128),
    rating: 5,
    date: "2026-05-14",
    title: "An unforgettable escape",
    body: "From the moment we arrived, every detail was flawless. The staff anticipated our every need and the suite was pure indulgence.",
    country: "Italy",
  },
  {
    author: "James Whitfield",
    avatar: img(PHOTOS.guest2, 128),
    rating: 5,
    date: "2026-04-28",
    title: "Worth every penny",
    body: "The spa alone is worth the trip. Impeccable service, breathtaking views, and dining that rivals any Michelin-starred restaurant.",
    country: "United Kingdom",
  },
  {
    author: "Amara Okafor",
    avatar: img(PHOTOS.guest3, 128),
    rating: 4,
    date: "2026-04-10",
    title: "Beautiful property",
    body: "Stunning architecture and a serene atmosphere. Breakfast could have more variety, but everything else exceeded expectations.",
    country: "Nigeria",
  },
  {
    author: "Lucas Bergström",
    avatar: img(PHOTOS.guest4, 128),
    rating: 5,
    date: "2026-03-22",
    title: "Second to none",
    body: "We've stayed at luxury hotels around the world and this ranks at the very top. The concierge team made our anniversary magical.",
    country: "Sweden",
  },
];

const reviewsFor = (seed: number): Review[] =>
  REVIEW_POOL.map((r, i) => ({ ...r, id: `rev-${seed}-${i}` }));

interface RoomSeed {
  name: Room["name"];
  type: Room["type"];
  price: number;
  size: number;
  capacity: number;
  beds: string;
  image: string;
  features: string[];
}

const buildRooms = (hotelId: string, seeds: RoomSeed[]): Room[] =>
  seeds.map((s, i) => ({
    id: `${hotelId}-room-${i}`,
    description: `The ${s.name} blends refined comfort with ${s.size}m² of thoughtfully designed space, ideal for up to ${s.capacity} guests.`,
    gallery: [s.image, img(PHOTOS.bathroom, 1200), img(PHOTOS.bedroomView, 1200)],
    ...s,
  }));

const commonRoomSeeds = (): RoomSeed[] => [
  {
    name: "Deluxe King Room",
    type: "Deluxe",
    price: 320,
    size: 42,
    capacity: 2,
    beds: "1 King Bed",
    image: img(PHOTOS.deluxeRoom, 1200),
    features: ["City view", "Rain shower", "Smart TV", "Nespresso machine"],
  },
  {
    name: "Executive Suite",
    type: "Executive",
    price: 540,
    size: 68,
    capacity: 3,
    beds: "1 King + Sofa Bed",
    image: img(PHOTOS.executiveRoom, 1200),
    features: ["Lounge access", "Separate living area", "Bathtub", "Work desk"],
  },
  {
    name: "Panorama Suite",
    type: "Suite",
    price: 780,
    size: 95,
    capacity: 4,
    beds: "1 King + 2 Twin",
    image: img(PHOTOS.suite, 1200),
    features: ["Panoramic view", "Private balcony", "Walk-in closet", "Butler service"],
  },
  {
    name: "Presidential Villa",
    type: "Presidential",
    price: 1450,
    size: 180,
    capacity: 6,
    beds: "2 King + Living Room",
    image: img(PHOTOS.presidential, 1200),
    features: ["Private pool", "Dining room", "24/7 butler", "Panoramic terrace"],
  },
];

/* ------------------------------------------------------------------ *
 * Hotels
 * ------------------------------------------------------------------ */

interface HotelSeed {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  starRating: 3 | 4 | 5;
  featured: boolean;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  amenities: Hotel["amenities"];
}

const HOTEL_SEEDS: HotelSeed[] = [
  {
    slug: "azure-palms-maldives",
    name: "The Azure Palms",
    tagline: "Overwater villas above a private lagoon",
    city: "Malé",
    country: "Maldives",
    coordinates: { lat: 3.2028, lng: 73.2207 },
    rating: 4.9,
    reviewsCount: 842,
    pricePerNight: 890,
    starRating: 5,
    featured: true,
    category: "Beach Resort",
    description:
      "An intimate overwater sanctuary where glass floors reveal a living coral garden below.",
    longDescription:
      "Set on a private atoll, The Azure Palms is a masterclass in barefoot luxury. Each overwater villa opens onto its own sun deck and infinity plunge pool, with steps descending directly into the turquoise lagoon. Days drift by with sunrise yoga, private reef snorkelling, and champagne sundowners on a sandbank reachable only by dhoni.",
    images: [
      img(PHOTOS.overwater),
      img(PHOTOS.beachResort),
      img(PHOTOS.poolside),
      img(PHOTOS.terrace),
      img(PHOTOS.spa),
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "bar", "beach", "airport", "concierge", "roomService"],
  },
  {
    slug: "the-grand-meridian-paris",
    name: "The Grand Méridian",
    tagline: "Belle Époque grandeur off the Champs-Élysées",
    city: "Paris",
    country: "France",
    coordinates: { lat: 48.8698, lng: 2.3078 },
    rating: 4.8,
    reviewsCount: 1290,
    pricePerNight: 720,
    starRating: 5,
    featured: true,
    category: "City Palace",
    description:
      "A landmark palace hotel pairing Haussmanian elegance with contemporary Parisian flair.",
    longDescription:
      "Behind a listed 19th-century façade, The Grand Méridian unfolds in a sequence of chandelier-lit salons, a marble winter garden, and a rooftop with uninterrupted views of the Eiffel Tower. The Michelin-starred restaurant and hidden cocktail bar have become a rendezvous for Paris society.",
    images: [
      img(PHOTOS.cityHotel),
      img(PHOTOS.grandLobby),
      img(PHOTOS.fineDining),
      img(PHOTOS.suite),
      img(PHOTOS.bar),
    ],
    amenities: ["wifi", "spa", "gym", "restaurant", "bar", "parking", "concierge", "roomService", "businessCenter", "airConditioning"],
  },
  {
    slug: "seraphine-santorini",
    name: "Séraphine Santorini",
    tagline: "Caldera-edge suites carved into the cliffs",
    city: "Oia",
    country: "Greece",
    coordinates: { lat: 36.4618, lng: 25.3753 },
    rating: 4.9,
    reviewsCount: 675,
    pricePerNight: 640,
    starRating: 5,
    featured: true,
    category: "Boutique Retreat",
    description:
      "Whitewashed cave suites cascading toward the Aegean, each with a private plunge pool.",
    longDescription:
      "Séraphine is Santorini distilled: cool cycladic architecture, infinity pools that melt into the caldera, and sunsets that turn the sky molten gold. The wine cellar showcases indigenous Assyrtiko, and the terrace restaurant serves modern Greek tasting menus at the water's edge of the sky.",
    images: [
      img(PHOTOS.santorini),
      img(PHOTOS.poolside),
      img(PHOTOS.terrace),
      img(PHOTOS.villaRoom),
      img(PHOTOS.restaurant),
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "bar", "beach", "concierge", "roomService", "airConditioning"],
  },
  {
    slug: "burj-alnoor-dubai",
    name: "Burj Al-Noor",
    tagline: "A vertical palace in the heart of Downtown Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    coordinates: { lat: 25.1972, lng: 55.2744 },
    rating: 4.7,
    reviewsCount: 2110,
    pricePerNight: 810,
    starRating: 5,
    featured: false,
    category: "Urban Icon",
    description:
      "Sky-high suites, a mirror-edge infinity pool, and views across the world's tallest skyline.",
    longDescription:
      "Rising above the Dubai Fountain, Burj Al-Noor is a statement of modern opulence. Floor-to-ceiling glass frames the Burj Khalifa from every suite, the 60th-floor infinity pool appears to spill into the city, and nine restaurants span the globe's finest cuisines.",
    images: [
      img(PHOTOS.dubai),
      img(PHOTOS.facade),
      img(PHOTOS.poolAmenity),
      img(PHOTOS.presidential),
      img(PHOTOS.gym),
    ],
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "bar", "parking", "airport", "concierge", "businessCenter", "roomService", "airConditioning"],
  },
  {
    slug: "kaya-highlands-bali",
    name: "Kaya Highlands",
    tagline: "Jungle-canopy villas above the Ayung River",
    city: "Ubud",
    country: "Indonesia",
    coordinates: { lat: -8.5069, lng: 115.2625 },
    rating: 4.8,
    reviewsCount: 534,
    pricePerNight: 430,
    starRating: 5,
    featured: false,
    category: "Wellness Retreat",
    description:
      "A wellness sanctuary of teak villas, rice-terrace views, and river-fed infinity pools.",
    longDescription:
      "Hidden in the emerald hills of Ubud, Kaya Highlands is devoted to restoration. Handcrafted villas float above the jungle canopy, the spa draws on Balinese healing rituals, and each morning begins with sound baths and organic breakfasts harvested from the estate garden.",
    images: [
      img(PHOTOS.bali),
      img(PHOTOS.villaRoom),
      img(PHOTOS.spa),
      img(PHOTOS.garden),
      img(PHOTOS.poolside),
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "bar", "petFriendly", "concierge", "roomService", "airConditioning"],
  },
  {
    slug: "alpenhof-zermatt",
    name: "Alpenhof Zermatt",
    tagline: "A slope-side chalet beneath the Matterhorn",
    city: "Zermatt",
    country: "Switzerland",
    coordinates: { lat: 46.0207, lng: 7.7491 },
    rating: 4.7,
    reviewsCount: 489,
    pricePerNight: 560,
    starRating: 5,
    featured: false,
    category: "Alpine Lodge",
    description:
      "Ski-in ski-out luxury with a glass-walled spa framing the Matterhorn.",
    longDescription:
      "Alpenhof pairs Alpine tradition with quiet modern luxury. Warm timber suites open to Matterhorn views, the subterranean spa features a fireside pool, and the restaurant reimagines Swiss classics with produce from the valley. In summer, the trails begin at the door.",
    images: [
      img(PHOTOS.mountainLodge),
      img(PHOTOS.swissAlps),
      img(PHOTOS.executiveRoom),
      img(PHOTOS.spa),
      img(PHOTOS.restaurant),
    ],
    amenities: ["wifi", "spa", "gym", "restaurant", "bar", "parking", "concierge", "roomService", "airConditioning"],
  },
  {
    slug: "the-manhattan-loft",
    name: "The Manhattan Loft",
    tagline: "An art-filled tower above Central Park",
    city: "New York",
    country: "United States",
    coordinates: { lat: 40.7648, lng: -73.9808 },
    rating: 4.6,
    reviewsCount: 1785,
    pricePerNight: 690,
    starRating: 5,
    featured: false,
    category: "Urban Icon",
    description:
      "Gallery-inspired suites, a jazz-era bar, and a rooftop overlooking Central Park.",
    longDescription:
      "The Manhattan Loft turns a landmark tower into a living gallery, with rotating works from emerging artists in every suite. A speakeasy-style bar channels the jazz age, while the glass rooftop lounge serves the park's finest sunset panorama over seasonal cocktails.",
    images: [
      img(PHOTOS.newyork),
      img(PHOTOS.grandLobby),
      img(PHOTOS.deluxeRoom),
      img(PHOTOS.bar),
      img(PHOTOS.fineDining),
    ],
    amenities: ["wifi", "gym", "restaurant", "bar", "parking", "concierge", "businessCenter", "roomService", "airConditioning"],
  },
  {
    slug: "sakura-tokyo",
    name: "Sakura Tokyo",
    tagline: "Serene minimalism in the sky above Ginza",
    city: "Tokyo",
    country: "Japan",
    coordinates: { lat: 35.6717, lng: 139.765 },
    rating: 4.8,
    reviewsCount: 923,
    pricePerNight: 610,
    starRating: 5,
    featured: false,
    category: "City Palace",
    description:
      "Zen-inspired suites, an omakase counter, and a cedar onsen high above Ginza.",
    longDescription:
      "Sakura Tokyo is an oasis of calm above the city's most refined district. Rooms follow the principles of ma — negative space, natural cedar, and floor-to-ceiling views of the skyline. The rooftop onsen and eight-seat omakase counter are experiences reserved for the few.",
    images: [
      img(PHOTOS.tokyo),
      img(PHOTOS.standardRoom),
      img(PHOTOS.fineDining),
      img(PHOTOS.spa),
      img(PHOTOS.bar),
    ],
    amenities: ["wifi", "spa", "gym", "restaurant", "bar", "concierge", "businessCenter", "roomService", "airConditioning"],
  },
];

export const hotels: Hotel[] = HOTEL_SEEDS.map((s, i) => ({
  id: `hotel-${i + 1}`,
  currency: "INR",
  location: `${s.city}, ${s.country}`,
  rooms: buildRooms(`hotel-${i + 1}`, commonRoomSeeds()),
  reviews: reviewsFor(i + 1),
  ...s,
}));

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

export const destinations: Destination[] = [
  { id: "d1", name: "Paris", country: "France", image: img(PHOTOS.paris), hotelsCount: 48, fromPrice: 420 },
  { id: "d2", name: "Maldives", country: "Indian Ocean", image: img(PHOTOS.maldives), hotelsCount: 32, fromPrice: 690 },
  { id: "d3", name: "Bali", country: "Indonesia", image: img(PHOTOS.bali), hotelsCount: 56, fromPrice: 280 },
  { id: "d4", name: "Dubai", country: "UAE", image: img(PHOTOS.dubai), hotelsCount: 61, fromPrice: 510 },
  { id: "d5", name: "Santorini", country: "Greece", image: img(PHOTOS.santorini), hotelsCount: 27, fromPrice: 460 },
  { id: "d6", name: "Tokyo", country: "Japan", image: img(PHOTOS.tokyo), hotelsCount: 44, fromPrice: 390 },
];

/* ------------------------------------------------------------------ *
 * Offers
 * ------------------------------------------------------------------ */

export const offers: Offer[] = [
  {
    id: "o1",
    title: "Escape to the Islands",
    description: "Stay 4 nights, pay for 3 at any beachfront resort, plus a complimentary spa ritual.",
    discount: "25% OFF",
    image: img(PHOTOS.beachResort),
    code: "ISLAND25",
    validUntil: "2026-09-30",
    badge: "Seasonal",
  },
  {
    id: "o2",
    title: "The Romance Package",
    description: "Champagne on arrival, private candlelit dinner, and late checkout for two.",
    discount: "Free Dinner",
    image: img(PHOTOS.fineDining),
    code: "AMOUR",
    validUntil: "2026-12-31",
    badge: "Couples",
  },
  {
    id: "o3",
    title: "Early Bird Advantage",
    description: "Book 60 days ahead and save on suites at all city palace hotels.",
    discount: "30% OFF",
    image: img(PHOTOS.cityHotel),
    code: "EARLY30",
    validUntil: "2026-10-15",
    badge: "Limited",
  },
];

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sophia Laurent",
    role: "Travel Editor, Vogue",
    avatar: img(PHOTOS.guest1, 160),
    rating: 5,
    quote:
      "Luxvoy has an uncanny eye for the extraordinary. Every stay they've curated for me has felt deeply personal and utterly seamless.",
    location: "Paris",
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Entrepreneur",
    avatar: img(PHOTOS.guest2, 160),
    rating: 5,
    quote:
      "I travel over 200 days a year. Luxvoy is the only platform I trust to get the details right, every single time.",
    location: "Singapore",
  },
  {
    id: "t3",
    name: "Elena Rossi",
    role: "Architect",
    avatar: img(PHOTOS.guest3, 160),
    rating: 5,
    quote:
      "The properties are architectural poetry, and the booking experience is as refined as the hotels themselves.",
    location: "Milan",
  },
  {
    id: "t4",
    name: "Marcus Bennett",
    role: "Film Producer",
    avatar: img(PHOTOS.guest4, 160),
    rating: 5,
    quote:
      "From the first search to checkout, everything is effortless. Luxvoy simply understands what luxury travel should feel like.",
    location: "Los Angeles",
  },
];

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export const services: Service[] = [
  {
    id: "s1",
    title: "Spa & Wellness",
    description: "Signature treatments, thermal circuits, and holistic therapies from world-class practitioners.",
    icon: "spa",
    image: img(PHOTOS.spa),
    features: ["Couples treatment rooms", "Thermal & hydrotherapy", "Yoga & meditation", "Personal wellness plans"],
  },
  {
    id: "s2",
    title: "Infinity Pools",
    description: "Temperature-controlled infinity pools and private cabanas with dedicated poolside service.",
    icon: "pool",
    image: img(PHOTOS.poolside),
    features: ["Heated infinity pools", "Private cabanas", "Poolside dining", "Family & adult zones"],
  },
  {
    id: "s3",
    title: "Fine Dining",
    description: "Michelin-calibre restaurants, chef's tables, and curated wine cellars in every property.",
    icon: "restaurant",
    image: img(PHOTOS.fineDining),
    features: ["Michelin-starred chefs", "Chef's table experiences", "Sommelier-led pairings", "In-villa private dining"],
  },
  {
    id: "s4",
    title: "Fitness Centre",
    description: "State-of-the-art gyms with personal trainers, studios, and recovery suites.",
    icon: "gym",
    image: img(PHOTOS.gym),
    features: ["Technogym equipment", "Personal training", "Group studios", "Recovery & sauna"],
  },
  {
    id: "s5",
    title: "Airport Transfers",
    description: "Chauffeured luxury cars and private jet coordination from door to door.",
    icon: "airport",
    image: img(PHOTOS.concierge),
    features: ["Chauffeured fleet", "Private jet liaison", "Meet & greet", "24/7 availability"],
  },
  {
    id: "s6",
    title: "Conference & Events",
    description: "Elegant ballrooms and boardrooms with dedicated event planners and AV production.",
    icon: "conference",
    image: img(PHOTOS.conference),
    features: ["Ballrooms & boardrooms", "Dedicated planners", "AV production", "Bespoke catering"],
  },
  {
    id: "s7",
    title: "Free High-Speed WiFi",
    description: "Complimentary enterprise-grade connectivity throughout every property.",
    icon: "wifi",
    image: img(PHOTOS.grandLobby),
    features: ["Gigabit connectivity", "Streaming ready", "Secure networks", "Full-property coverage"],
  },
  {
    id: "s8",
    title: "24/7 Room Service",
    description: "Round-the-clock in-room dining crafted by the same kitchens as our restaurants.",
    icon: "roomService",
    image: img(PHOTOS.suite),
    features: ["All-day menus", "In-villa breakfast", "Midnight dining", "Bespoke requests"],
  },
];

/* ------------------------------------------------------------------ *
 * About — team, mission, awards
 * ------------------------------------------------------------------ */

export const team: TeamMember[] = [
  { id: "m1", name: "Adrian Vale", role: "Founder & CEO", image: img(PHOTOS.team1, 600), bio: "Former hotelier who spent two decades running palace hotels across three continents." },
  { id: "m2", name: "Priya Nair", role: "Head of Curation", image: img(PHOTOS.team2, 600), bio: "Travels 250 days a year personally vetting every property before it joins the collection." },
  { id: "m3", name: "Thomas Lindqvist", role: "Chief Experience Officer", image: img(PHOTOS.team3, 600), bio: "Obsessed with the details that turn a good stay into an unforgettable one." },
  { id: "m4", name: "Mia Delgado", role: "Guest Relations Director", image: img(PHOTOS.team4, 600), bio: "Leads our 24/7 concierge team and knows the world's best-kept travel secrets." },
];

export const awards: { year: string; title: string; org: string }[] = [
  { year: "2026", title: "World's Best Luxury Travel Platform", org: "Condé Nast Traveller" },
  { year: "2025", title: "Excellence in Hospitality", org: "Travel + Leisure" },
  { year: "2025", title: "Best Boutique Collection", org: "Forbes Travel Guide" },
  { year: "2024", title: "Innovation in Guest Experience", org: "World Travel Awards" },
];

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 320, suffix: "+", label: "Luxury Properties" },
  { value: 68, suffix: "", label: "Countries" },
  { value: 250, suffix: "K", label: "Happy Guests" },
  { value: 4.9, suffix: "/5", label: "Average Rating" },
];

/* ------------------------------------------------------------------ *
 * Gallery
 * ------------------------------------------------------------------ */

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: img(PHOTOS.overwater, 1200), category: "Resorts", title: "Overwater Villas", span: "tall" },
  { id: "g2", src: img(PHOTOS.grandLobby, 1200), category: "Interiors", title: "Grand Lobby", span: "wide" },
  { id: "g3", src: img(PHOTOS.spa, 1200), category: "Spa", title: "Serenity Spa", span: "normal" },
  { id: "g4", src: img(PHOTOS.fineDining, 1200), category: "Dining", title: "Chef's Table", span: "normal" },
  { id: "g5", src: img(PHOTOS.poolside, 1200), category: "Pools", title: "Infinity Edge", span: "tall" },
  { id: "g6", src: img(PHOTOS.suite, 1200), category: "Rooms", title: "Panorama Suite", span: "normal" },
  { id: "g7", src: img(PHOTOS.santorini, 1200), category: "Resorts", title: "Caldera Views", span: "wide" },
  { id: "g8", src: img(PHOTOS.bar, 1200), category: "Dining", title: "The Cellar Bar", span: "normal" },
  { id: "g9", src: img(PHOTOS.villaRoom, 1200), category: "Rooms", title: "Jungle Villa", span: "normal" },
  { id: "g10", src: img(PHOTOS.terrace, 1200), category: "Interiors", title: "Sunset Terrace", span: "tall" },
  { id: "g11", src: img(PHOTOS.gym, 1200), category: "Spa", title: "Fitness Studio", span: "normal" },
  { id: "g12", src: img(PHOTOS.mountainLodge, 1200), category: "Resorts", title: "Alpine Escape", span: "wide" },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryImages.map((g) => g.category))),
];

/* ------------------------------------------------------------------ *
 * FAQ
 * ------------------------------------------------------------------ */

export const faqs: FaqItem[] = [
  { id: "f1", category: "Booking", question: "How do I make a reservation?", answer: "Search your destination and dates, choose from our curated collection, and complete your booking in a few taps. You'll receive instant confirmation by email along with a dedicated concierge contact for your stay." },
  { id: "f2", category: "Booking", question: "Can I book multiple rooms at once?", answer: "Yes. During booking you can select the number of rooms and guests. For groups of five rooms or more, our concierge team can arrange bespoke rates and connecting accommodation." },
  { id: "f3", category: "Payment", question: "What payment methods do you accept?", answer: "We accept all major credit and debit cards, Apple Pay, Google Pay, and bank transfer for select reservations. Your payment details are encrypted and never stored on our servers." },
  { id: "f4", category: "Payment", question: "When am I charged for my stay?", answer: "For most bookings a small deposit secures your reservation, with the balance settled at the property. Non-refundable rates are charged in full at the time of booking and clearly labelled." },
  { id: "f5", category: "Cancellation", question: "What is your cancellation policy?", answer: "Flexible rates can be cancelled free of charge up to 48 hours before check-in. Each property lists its specific policy on the booking page before you confirm." },
  { id: "f6", category: "Cancellation", question: "Can I modify my reservation?", answer: "Absolutely. You can adjust dates, room type, or guest details from your account or by contacting your concierge, subject to availability and the property's policy." },
  { id: "f7", category: "Services", question: "Do you arrange airport transfers?", answer: "Yes. Chauffeured transfers and private jet coordination can be added to any booking. Simply request it during checkout or through your concierge." },
  { id: "f8", category: "Services", question: "Are special requests guaranteed?", answer: "We pass every request — dietary needs, room preferences, celebrations — directly to the property and follow up personally. While not contractually guaranteed, our hotels go to remarkable lengths to accommodate." },
];

export const faqCategories = [
  "All",
  ...Array.from(new Set(faqs.map((f) => f.category))),
];
