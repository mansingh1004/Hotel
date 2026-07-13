"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { RoomType } from "@/types";
import { rooms } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RoomCard } from "@/components/cards/RoomCard";

const TABS: (RoomType | "All")[] = [
  "All",
  "Deluxe",
  "Executive",
  "Suite",
  "Presidential",
];

/** Room catalogue with animated category filtering. */
export function RoomsGrid() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  // De-duplicate rooms by name so each room type shows once per catalogue.
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return rooms.filter((r) => {
      if (seen.has(r.name)) return false;
      seen.add(r.name);
      return true;
    });
  }, []);

  const visible = useMemo(
    () => (tab === "All" ? unique : unique.filter((r) => r.type === tab)),
    [tab, unique]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              tab === t
                ? "bg-primary text-white shadow-soft"
                : "border border-line text-ink-soft hover:border-primary hover:text-primary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((room) => (
            <motion.div
              key={room.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <RoomCard
                room={room}
                hotelSlug={room.hotelSlug}
                hotelName={room.hotelName}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
