import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Check,
  Clock,
  BadgeCheck,
  Share2,
} from "lucide-react";
import { getHotelBySlug, getSimilarHotels, hotels } from "@/lib/data";
import { AMENITIES } from "@/lib/amenities";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StarRating } from "@/components/ui/StarRating";
import { HotelGallery } from "@/components/hotels/HotelGallery";
import { HotelReviews } from "@/components/hotels/HotelReviews";
import { RoomCard } from "@/components/cards/RoomCard";
import { HotelCard } from "@/components/cards/HotelCard";
import { BookingSidebar } from "@/components/booking/BookingSidebar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Pre-render every hotel at build time. */
export function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) return { title: "Hotel not found" };

  return {
    title: `${hotel.name} — ${hotel.location}`,
    description: hotel.description,
    openGraph: {
      title: hotel.name,
      description: hotel.description,
      images: [{ url: hotel.images[0] }],
    },
  };
}

const highlights = [
  { icon: BadgeCheck, label: "Verified luxury property" },
  { icon: Clock, label: "24-hour check-in" },
  { icon: Check, label: "Free cancellation" },
];

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const similar = getSimilarHotels(hotel);
  const mapSrc = `https://maps.google.com/maps?q=${hotel.coordinates.lat},${hotel.coordinates.lng}&z=13&output=embed`;

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb + title */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Hotels", href: "/hotels" },
            { label: hotel.name },
          ]}
        />

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">
                {hotel.category}
              </span>
              <span className="flex items-center gap-1 text-sm">
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
              {hotel.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
              <MapPin size={16} className="text-primary" />
              {hotel.location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <StarRating rating={hotel.rating} showValue size={16} />
              <p className="text-xs text-muted">
                {hotel.reviewsCount.toLocaleString()} reviews
              </p>
            </div>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-primary transition-colors hover:border-primary"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6">
          <HotelGallery images={hotel.images} name={hotel.name} />
        </div>

        {/* Main grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div className="min-w-0 space-y-12">
            {/* Overview */}
            <section>
              <div className="flex flex-wrap gap-3">
                {highlights.map((h) => (
                  <span
                    key={h.label}
                    className="flex items-center gap-2 rounded-full bg-cloud px-4 py-2 text-sm text-ink-soft"
                  >
                    <h.icon size={16} className="text-emerald" />
                    {h.label}
                  </span>
                ))}
              </div>
              <h2 className="mt-8 font-display text-2xl font-semibold text-primary">
                About this hotel
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {hotel.longDescription}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary">
                Amenities
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {hotel.amenities.map((key) => {
                  const Icon = AMENITIES[key].icon;
                  return (
                    <div
                      key={key}
                      className="flex items-center gap-3 rounded-2xl border border-line p-4"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/8 text-primary">
                        <Icon size={18} />
                      </span>
                      <span className="text-sm font-medium text-ink">
                        {AMENITIES[key].label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Rooms */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary">
                Room options
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {hotel.rooms.map((room) => (
                  <RoomCard key={room.id} room={room} hotelSlug={hotel.slug} />
                ))}
              </div>
            </section>

            {/* Location / map */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary">
                Location
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
                <MapPin size={16} className="text-primary" /> {hotel.location}
              </p>
              <div className="mt-6 overflow-hidden rounded-3xl border border-line">
                <iframe
                  title={`Map of ${hotel.name}`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full border-0"
                />
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary">
                Guest reviews
              </h2>
              <div className="mt-6">
                <HotelReviews hotel={hotel} />
              </div>
            </section>
          </div>

          {/* Booking sidebar */}
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-24">
              <BookingSidebar hotel={hotel} />
            </div>
          </aside>
        </div>
      </div>

      {/* Similar hotels */}
      <section className="mt-8 bg-cloud py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="You may also like"
            title="Similar hotels"
            className="mx-0"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((h) => (
              <Reveal key={h.id}>
                <HotelCard hotel={h} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
