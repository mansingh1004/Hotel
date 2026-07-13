import Image from "next/image";
import { img, PHOTOS } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative isolate mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <Image
            src={img(PHOTOS.beachResort, 2000, 75)}
            alt="Palm-lined beach at a luxury resort"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/60 to-primary-dark/30" />

          <div className="relative px-6 py-20 sm:px-14 lg:py-28">
            <Reveal className="max-w-xl">
              <p className="eyebrow text-gold-light">Your escape awaits</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-5xl">
                Begin the journey to your next unforgettable stay
              </h2>
              <p className="mt-5 text-lg text-white/80">
                Speak with a personal travel curator or browse the collection —
                your perfect hotel is only a moment away.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/hotels" variant="gold" size="lg">
                  Explore Hotels
                </Button>
                <Button href="/contact" variant="white" size="lg">
                  Talk to a Curator
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
