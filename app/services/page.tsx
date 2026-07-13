import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { services } from "@/lib/data";
import { img, PHOTOS } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AMENITIES } from "@/lib/amenities";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services & Facilities",
  description:
    "World-class spa, fine dining, infinity pools, fitness, airport transfers, and 24/7 concierge — every service designed around you.",
};

// Map a few services to a lucide icon for the summary grid.
const iconFor: Record<string, keyof typeof AMENITIES> = {
  spa: "spa",
  pool: "pool",
  restaurant: "restaurant",
  gym: "gym",
  airport: "airport",
  conference: "businessCenter",
  wifi: "wifi",
  roomService: "roomService",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services & Facilities"
        subtitle="Every comfort, thoughtfully considered — from holistic wellness to effortless logistics."
        image={img(PHOTOS.spa, 2000, 75)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Quick summary grid */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we offer"
            title="Curated services at every property"
            description="A consistent standard of excellence, wherever in the world you find yourself."
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = AMENITIES[iconFor[s.icon] ?? "concierge"].icon;
              return (
                <StaggerItem key={s.id}>
                  <div className="group h-full rounded-3xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{s.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Alternating detail sections */}
      <section className="bg-cloud py-20">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {services.slice(0, 4).map((s, i) => (
            <div
              key={s.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal
                direction={i % 2 === 0 ? "right" : "left"}
                className={i % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-soft">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal direction={i % 2 === 0 ? "left" : "right"}>
                <p className="eyebrow text-gold">0{i + 1}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-primary">
                  {s.title}
                </h2>
                <p className="mt-4 text-ink-soft">{s.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald/12 text-emerald">
                        <Check size={13} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Ready to experience it for yourself?
          </h2>
          <p className="mt-4 text-white/80">
            Browse our collection and discover the services that make every stay
            extraordinary.
          </p>
          <Button href="/hotels" variant="gold" size="lg" className="mt-8">
            Explore Hotels
          </Button>
        </div>
      </section>
    </>
  );
}
