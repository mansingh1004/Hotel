import Image from "next/image";
import { Tag, Clock } from "lucide-react";
import { offers } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Offers() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Exclusive Offers"
          title="Curated deals worth travelling for"
          description="Limited-time packages and seasonal savings across our most sought-after properties."
        />

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <StaggerItem key={offer.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white text-ink shadow-soft">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-white">
                    {offer.badge}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-primary-dark shadow-gold">
                    {offer.discount}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold text-primary">
                    {offer.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">
                    {offer.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                    <Clock size={14} /> Valid until {formatDate(offer.validUntil)}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-4">
                    <span className="flex items-center gap-2 rounded-lg bg-cloud px-3 py-1.5 text-sm font-semibold text-primary">
                      <Tag size={14} /> {offer.code}
                    </span>
                    <Button href="/hotels" variant="emerald" size="sm">
                      Claim Offer
                    </Button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
