import Image from "next/image";
import {
  Sparkles,
  Waves,
  UtensilsCrossed,
  ConciergeBell,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { img, PHOTOS } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const features = [
  { icon: Sparkles, title: "World-Class Spas", desc: "Signature treatments and thermal circuits at every property." },
  { icon: Waves, title: "Infinity Pools", desc: "Temperature-controlled pools with dedicated poolside service." },
  { icon: UtensilsCrossed, title: "Fine Dining", desc: "Michelin-calibre restaurants and private chef experiences." },
  { icon: ConciergeBell, title: "24/7 Concierge", desc: "A dedicated concierge to craft every detail of your stay." },
  { icon: Plane, title: "Airport Transfers", desc: "Chauffeured cars and private jet coordination, door to door." },
  { icon: ShieldCheck, title: "Best Price Promise", desc: "Find it cheaper elsewhere and we'll match it, guaranteed." },
];

export function Amenities() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image collage */}
        <Reveal direction="right" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
            <Image
              src={img(PHOTOS.spa, 1000)}
              alt="Serene spa treatment room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-48 overflow-hidden rounded-2xl border-4 border-white shadow-soft sm:block">
            <div className="relative aspect-square">
              <Image
                src={img(PHOTOS.poolside, 600)}
                alt="Infinity pool at dusk"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -left-4 top-8 hidden rounded-2xl bg-primary px-5 py-4 text-white shadow-soft sm:block">
            <p className="font-display text-3xl font-semibold text-gold">15+</p>
            <p className="text-xs text-white/80">Signature amenities</p>
          </div>
        </Reveal>

        {/* Features */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Amenities & Experiences"
            title="Every comfort, thoughtfully considered"
            description="From holistic wellness to effortless logistics, our properties are designed around a single idea: that you should never have to ask twice."
            className="mx-0"
          />

          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cloud text-primary transition-colors">
                    <f.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">{f.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{f.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
