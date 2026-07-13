"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "@/lib/data";
import { StarRating } from "@/components/ui/StarRating";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="bg-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guest Stories"
          title="Loved by travellers around the world"
          description="Don't take our word for it — hear from the guests who trust us with their most memorable journeys."
        />

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-card">
                  <Quote
                    size={36}
                    className="mb-4 fill-gold/20 text-gold"
                  />
                  <blockquote className="flex-1 text-ink-soft">
                    “{t.quote}”
                  </blockquote>
                  <StarRating rating={t.rating} className="mt-6" />
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-primary">{t.name}</p>
                      <p className="text-xs text-muted">
                        {t.role} · {t.location}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
