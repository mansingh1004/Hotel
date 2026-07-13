"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Users, Search, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { destinations } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Booking search widget. On submit it routes to /hotels with the criteria as
 * query params so the listing page can pre-filter. Used on the hero and other
 * entry points via the `variant` prop.
 */
export function SearchForm({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [guestsOpen, setGuestsOpen] = useState(false);

  const today = "2026-07-13";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(guests.adults + guests.children));
    params.set("rooms", String(guests.rooms));
    router.push(`/hotels?${params.toString()}`);
  };

  const step = (
    key: keyof typeof guests,
    delta: number,
    min = 0
  ) =>
    setGuests((g) => ({ ...g, [key]: Math.max(min, g[key] + delta) }));

  return (
    <form
      onSubmit={submit}
      className={cn(
        "glass w-full rounded-3xl p-3 shadow-soft",
        variant === "hero" ? "max-w-4xl" : "max-w-full"
      )}
    >
      <div className="grid gap-2 md:grid-cols-[1.3fr_1fr_1fr_1.1fr_auto]">
        {/* Destination */}
        <Field icon={MapPin} label="Destination">
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink outline-none"
            aria-label="Destination"
          >
            <option value="">Where to?</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}, {d.country}
              </option>
            ))}
          </select>
        </Field>

        {/* Check in */}
        <Field icon={CalendarDays} label="Check in">
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink outline-none"
            aria-label="Check-in date"
          />
        </Field>

        {/* Check out */}
        <Field icon={CalendarDays} label="Check out">
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink outline-none"
            aria-label="Check-out date"
          />
        </Field>

        {/* Guests */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setGuestsOpen((v) => !v)}
            className="flex w-full items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-left"
          >
            <Users size={18} className="text-primary" />
            <span>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">
                Guests
              </span>
              <span className="block text-sm font-medium text-ink">
                {guests.adults + guests.children} guests · {guests.rooms} room
                {guests.rooms > 1 ? "s" : ""}
              </span>
            </span>
          </button>

          <AnimatePresence>
            {guestsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute left-0 top-full z-20 mt-2 w-64 rounded-2xl border border-line bg-white p-4 shadow-soft"
              >
                {(
                  [
                    { key: "adults", label: "Adults", min: 1 },
                    { key: "children", label: "Children", min: 0 },
                    { key: "rooms", label: "Rooms", min: 1 },
                  ] as const
                ).map((row) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm text-ink">{row.label}</span>
                    <div className="flex items-center gap-3">
                      <Stepper
                        onClick={() => step(row.key, -1, row.min)}
                        disabled={guests[row.key] <= row.min}
                        icon={Minus}
                      />
                      <span className="w-5 text-center text-sm font-semibold">
                        {guests[row.key]}
                      </span>
                      <Stepper onClick={() => step(row.key, 1)} icon={Plus} />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-dark md:px-5"
        >
          <Search size={18} />
          <span className="md:hidden lg:inline">Search</span>
        </button>
      </div>
    </form>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3">
      <Icon size={18} className="shrink-0 text-primary" />
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

function Stepper({
  onClick,
  disabled,
  icon: Icon,
}: {
  onClick: () => void;
  disabled?: boolean;
  icon: typeof Plus;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="grid h-7 w-7 place-items-center rounded-full border border-line text-primary transition-colors hover:border-primary disabled:opacity-30"
    >
      <Icon size={14} />
    </button>
  );
}
