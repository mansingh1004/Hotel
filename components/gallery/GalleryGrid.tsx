"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { galleryImages, galleryCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Masonry gallery with category filtering and a keyboard-navigable lightbox. */
export function GalleryGrid() {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      category === "All"
        ? galleryImages
        : galleryImages.filter((g) => g.category === category),
    [category]
  );

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + visible.length) % visible.length
      ),
    [visible.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  const spanClass = (span?: string) =>
    span === "tall"
      ? "row-span-2"
      : span === "wide"
      ? "sm:col-span-2"
      : "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              category === c
                ? "bg-primary text-white shadow-soft"
                : "border border-line text-ink-soft hover:border-primary hover:text-primary"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <motion.div
        layout
        className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((shot, i) => (
            <motion.button
              key={shot.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIndex(i)}
              className={cn(
                "group relative overflow-hidden rounded-3xl",
                spanClass(shot.span)
              )}
            >
              <Image
                src={shot.src}
                alt={shot.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-left text-white">
                  <p className="text-xs text-white/70">{shot.category}</p>
                  <p className="font-display text-lg font-semibold">
                    {shot.title}
                  </p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                  <Plus size={18} />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft size={24} />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[80vh] w-full max-w-5xl"
            >
              <Image
                src={visible[index].src}
                alt={visible[index].title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight size={24} />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
              {visible[index].title} · {index + 1} / {visible.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
