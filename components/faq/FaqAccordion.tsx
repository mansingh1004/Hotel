"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs, faqCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Filterable FAQ with smoothly animated accordion panels. */
export function FaqAccordion() {
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  const visible = useMemo(
    () =>
      category === "All" ? faqs : faqs.filter((f) => f.category === category),
    [category]
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      {/* Category filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {faqCategories.map((c) => (
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

      {/* Accordion */}
      <div className="space-y-3">
        {visible.map((f) => {
          const isOpen = open === f.id;
          return (
            <div
              key={f.id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white transition-colors",
                isOpen ? "border-primary/30 shadow-card" : "border-line"
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : f.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-primary">{f.question}</span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                    isOpen
                      ? "rotate-45 bg-primary text-white"
                      : "bg-cloud text-primary"
                  )}
                >
                  <Plus size={18} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-5 text-ink-soft">{f.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
