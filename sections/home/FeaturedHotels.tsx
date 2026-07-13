import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedHotels, hotels } from "@/lib/data";
import { HotelCard } from "@/components/cards/HotelCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function FeaturedHotels() {
  // Feature the flagged hotels, padded to six for a full grid.
  const featured = [
    ...getFeaturedHotels(),
    ...hotels.filter((h) => !h.featured),
  ].slice(0, 6);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured Stays"
            title="Exceptional hotels, handpicked for you"
            description="Each property in our collection is personally vetted for design, service, and that indescribable sense of arrival."
            className="mx-0"
          />
          <Link
            href="/hotels"
            className="group hidden shrink-0 items-center gap-2 font-medium text-primary transition-colors hover:text-primary-dark sm:flex"
          >
            View all hotels
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((hotel) => (
            <StaggerItem key={hotel.id}>
              <HotelCard hotel={hotel} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
