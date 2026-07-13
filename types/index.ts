/** Core domain types for the Luxvoy hotel booking platform. */

export type AmenityKey =
  | "wifi"
  | "pool"
  | "spa"
  | "gym"
  | "restaurant"
  | "bar"
  | "parking"
  | "airport"
  | "concierge"
  | "beach"
  | "petFriendly"
  | "roomService"
  | "businessCenter"
  | "airConditioning";

export type RoomType =
  | "Deluxe"
  | "Suite"
  | "Executive"
  | "Presidential"
  | "Villa"
  | "Standard";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  size: number; // square metres
  capacity: number; // guests
  beds: string;
  image: string;
  gallery: string[];
  features: string[];
  description: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  country: string;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  currency: string;
  starRating: 3 | 4 | 5;
  featured: boolean;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  amenities: AmenityKey[];
  rooms: Room[];
  reviews: Review[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  hotelsCount: number;
  fromPrice: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  code: string;
  validUntil: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  location: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  title: string;
  span?: "tall" | "wide" | "normal";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BookingDraft {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}
