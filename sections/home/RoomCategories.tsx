import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { img, PHOTOS } from "@/lib/images";
import { formatCurrency } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const categories = [
  { name: "Deluxe Rooms", image: img(PHOTOS.deluxeRoom, 900), from: 320, desc: "Refined comfort with city or garden views." },
  { name: "Executive Suites", image: img(PHOTOS.executiveRoom, 900), from: 540, desc: "Spacious living areas and lounge access." },
  { name: "Panorama Suites", image: img(PHOTOS.suite, 900), from: 780, desc: "Private balconies and butler service." },
  { name: "Presidential Villas", image: img(PHOTOS.presidential, 900), from: 1450, desc: "Private pools and unrivalled space." },
];

export function RoomCategories() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Room Categories"
          title="A room for every kind of escape"
          description="Whether you seek a serene retreat or a statement suite, find the perfect setting for your stay."
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <StaggerItem key={c.name}>
              <Link
                href="/rooms"
                className="group relative block h-80 overflow-hidden rounded-3xl shadow-card"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <span className="mb-2 w-fit rounded-full bg-gold px-3 py-1 text-xs font-semibold text-primary-dark">
                    from {formatCurrency(c.from)}
                  </span>
                  <h3 className="font-display text-2xl font-semibold">
                    {c.name}
                  </h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                    {c.desc}
                  </p>
                </div>
                <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
