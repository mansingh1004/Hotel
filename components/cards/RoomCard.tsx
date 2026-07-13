import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, BedDouble, ArrowRight } from "lucide-react";
import type { Room } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/** Luxury room card with features, capacity, and a book action. */
export function RoomCard({
  room,
  hotelSlug,
  hotelName,
}: {
  room: Room;
  hotelSlug?: string;
  hotelName?: string;
}) {
  const bookHref = hotelSlug ? `/hotels/${hotelSlug}` : "/hotels";

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          {room.type}
        </span>
        <div className="absolute bottom-0 right-0 rounded-tl-2xl bg-primary px-4 py-2 text-white">
          <span className="font-display text-xl font-semibold">
            {formatCurrency(room.price)}
          </span>
          <span className="text-xs text-white/80"> /night</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {hotelName && (
          <p className="text-xs font-medium uppercase tracking-wider text-gold">
            {hotelName}
          </p>
        )}
        <h3 className="mt-1 font-display text-xl font-semibold text-primary">
          {room.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <Maximize size={15} className="text-primary" /> {room.size} m²
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={15} className="text-primary" /> {room.capacity} guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={15} className="text-primary" /> {room.beds}
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {room.features.slice(0, 3).map((f) => (
            <li
              key={f}
              className="rounded-full bg-cloud px-3 py-1 text-xs text-ink-soft"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-line pt-4">
          <Button href={bookHref} variant="outline" size="sm" className="w-full">
            Book Now <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </article>
  );
}
