import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { destinations } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Destinations() {
  return (
    <section className="bg-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Where would you like to wake up?"
          description="From overwater villas to alpine chalets, explore the destinations our travellers love most."
        />

        <Stagger className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <StaggerItem
              key={d.id}
              className={
                i === 0 || i === 3 ? "row-span-2" : "row-span-1"
              }
            >
              <Link
                href={`/hotels?destination=${encodeURIComponent(d.name)}`}
                className="group relative block h-full overflow-hidden rounded-3xl shadow-card"
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="flex items-center gap-1 text-xs text-white/80">
                    <MapPin size={12} /> {d.country}
                  </p>
                  <h3 className="font-display text-2xl font-semibold">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    {d.hotelsCount} hotels · from ₹{d.fromPrice}/night
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
