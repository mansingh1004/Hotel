import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import type { Hotel } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";
import { AMENITIES } from "@/lib/amenities";

/** Interactive hotel card. `view` switches between grid and list layouts. */
export function HotelCard({
  hotel,
  view = "grid",
}: {
  hotel: Hotel;
  view?: "grid" | "list";
}) {
  const amenities = hotel.amenities.slice(0, 4);

  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft",
        view === "grid" ? "flex-col" : "flex-col sm:flex-row"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          view === "grid" ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-auto sm:w-72 sm:shrink-0"
        )}
      >
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-primary-dark shadow-gold">
          {hotel.category}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-primary backdrop-blur">
          <Star size={12} className="fill-gold text-gold" />
          {hotel.rating}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1 text-xs text-ink-soft">
          <MapPin size={13} className="text-primary" />
          {hotel.location}
        </div>
        <h3 className="font-display text-xl font-semibold text-primary transition-colors group-hover:text-primary-dark">
          {hotel.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {amenities.map((key) => {
            const Icon = AMENITIES[key].icon;
            return (
              <span
                key={key}
                title={AMENITIES[key].label}
                className="grid h-8 w-8 place-items-center rounded-full bg-cloud text-primary"
              >
                <Icon size={15} />
              </span>
            );
          })}
          {hotel.amenities.length > amenities.length && (
            <span className="text-xs font-medium text-muted">
              +{hotel.amenities.length - amenities.length}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <span className="text-xs text-muted">
              {hotel.reviewsCount.toLocaleString()} reviews · from
            </span>
            <p className="font-display text-2xl font-semibold text-primary">
              {formatCurrency(hotel.pricePerNight, hotel.currency)}
              <span className="text-sm font-normal text-muted"> / night</span>
            </p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white transition-all duration-300 group-hover:bg-gold group-hover:text-primary-dark">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
