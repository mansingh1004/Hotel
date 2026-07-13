"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Award, ChevronDown } from "lucide-react";
import { img, PHOTOS } from "@/lib/images";
import { SearchForm } from "@/components/booking/SearchForm";
import { fadeUp } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={img(PHOTOS.heroResort, 2000, 75)}
          alt="Luxury infinity pool overlooking the ocean at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary-dark/40 to-primary-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[12%] top-[22%] hidden h-24 w-24 rounded-full bg-gold/20 blur-2xl lg:block"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[28%] left-[8%] hidden h-32 w-32 rounded-full bg-emerald/15 blur-3xl lg:block"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm text-white"
          >
            <Award size={16} className="text-gold" />
            World&apos;s Best Luxury Travel Platform 2026
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-6xl lg:text-7xl"
          >
            Where every stay becomes a{" "}
            <span className="text-gradient-gold">masterpiece</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            Discover a handpicked collection of the world&apos;s most
            extraordinary hotels and resorts — reserved for travellers who
            expect nothing less than exceptional.
          </motion.p>

          {/* Rating proof */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-6 text-white"
          >
            <div className="flex items-center gap-2">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </span>
              <span className="text-sm">
                <b>4.9/5</b> from 250,000+ travellers
              </span>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-12"
        >
          <SearchForm variant="hero" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/70 sm:block"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
