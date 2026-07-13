"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  Star,
  Search,
} from "lucide-react";
import type { AmenityKey, Hotel, RoomType } from "@/types";
import { hotels as ALL_HOTELS } from "@/lib/data";
import { AMENITIES } from "@/lib/amenities";
import { cn, formatCurrency } from "@/lib/utils";
import { HotelCard } from "@/components/cards/HotelCard";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";

const PAGE_SIZE = 6;
const PRICE_CEILING = 1000;

const SORTS = {
  recommended: "Recommended",
  priceLow: "Price: Low to High",
  priceHigh: "Price: High to Low",
  rating: "Top Rated",
} as const;
type SortKey = keyof typeof SORTS;

const ROOM_TYPES: RoomType[] = [
  "Deluxe",
  "Executive",
  "Suite",
  "Presidential",
];

export function HotelsExplorer({
  initialDestination = "",
}: {
  initialDestination?: string;
}) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(PRICE_CEILING);
  const [minRating, setMinRating] = useState(0);
  const [countries, setCountries] = useState<string[]>(
    initialDestination
      ? ALL_HOTELS.filter(
          (h) =>
            h.city === initialDestination || h.country === initialDestination
        ).map((h) => h.country)
      : []
  );
  const [amenities, setAmenities] = useState<AmenityKey[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const allCountries = useMemo(
    () => Array.from(new Set(ALL_HOTELS.map((h) => h.country))).sort(),
    []
  );
  const allAmenities = useMemo(
    () => Array.from(new Set(ALL_HOTELS.flatMap((h) => h.amenities))),
    []
  );

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const filtered = useMemo(() => {
    const result = ALL_HOTELS.filter((h) => {
      if (h.pricePerNight > maxPrice) return false;
      if (h.rating < minRating) return false;
      if (countries.length && !countries.includes(h.country)) return false;
      if (amenities.length && !amenities.every((a) => h.amenities.includes(a)))
        return false;
      if (
        roomTypes.length &&
        !roomTypes.some((t) => h.rooms.some((r) => r.type === t))
      )
        return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${h.name} ${h.location} ${h.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...result];
    if (sort === "priceLow") sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "priceHigh") sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "recommended")
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [maxPrice, minRating, countries, amenities, roomTypes, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const resetFilters = () => {
    setMaxPrice(PRICE_CEILING);
    setMinRating(0);
    setCountries([]);
    setAmenities([]);
    setRoomTypes([]);
    setQuery("");
    setPage(1);
  };

  const activeCount =
    (maxPrice < PRICE_CEILING ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    countries.length +
    amenities.length +
    roomTypes.length;

  // Any filter change returns to page 1.
  const withReset = (fn: () => void) => {
    fn();
    setPage(1);
  };

  const FiltersPanel = (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-primary">
          Search
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => withReset(() => setQuery(e.target.value))}
            placeholder="Hotel or location"
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="mb-3 flex items-center justify-between text-sm font-semibold text-primary">
          Max Price
          <span className="text-gold">{formatCurrency(maxPrice)}</span>
        </label>
        <input
          type="range"
          min={200}
          max={PRICE_CEILING}
          step={50}
          value={maxPrice}
          onChange={(e) => withReset(() => setMaxPrice(Number(e.target.value)))}
          className="w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>₹200</span>
          <span>₹{PRICE_CEILING}+</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="mb-3 text-sm font-semibold text-primary">Guest Rating</p>
        <div className="space-y-1.5">
          {[4.5, 4, 0].map((r) => (
            <button
              key={r}
              onClick={() => withReset(() => setMinRating(r))}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                minRating === r
                  ? "bg-primary/10 text-primary"
                  : "text-ink-soft hover:bg-cloud"
              )}
            >
              <Star size={14} className="fill-gold text-gold" />
              {r === 0 ? "Any rating" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <p className="mb-3 text-sm font-semibold text-primary">Location</p>
        <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
          {allCountries.map((c) => (
            <Check
              key={c}
              label={c}
              checked={countries.includes(c)}
              onChange={() => withReset(() => toggle(countries, c, setCountries))}
            />
          ))}
        </div>
      </div>

      {/* Room type */}
      <div>
        <p className="mb-3 text-sm font-semibold text-primary">Room Type</p>
        <div className="space-y-2">
          {ROOM_TYPES.map((t) => (
            <Check
              key={t}
              label={t}
              checked={roomTypes.includes(t)}
              onChange={() => withReset(() => toggle(roomTypes, t, setRoomTypes))}
            />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <p className="mb-3 text-sm font-semibold text-primary">Amenities</p>
        <div className="space-y-2">
          {allAmenities.map((a) => (
            <Check
              key={a}
              label={AMENITIES[a].label}
              checked={amenities.includes(a)}
              onChange={() => withReset(() => toggle(amenities, a, setAmenities))}
            />
          ))}
        </div>
      </div>

      <Button variant="ghost" size="sm" onClick={resetFilters} className="w-full">
        Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-line bg-white p-6 shadow-card">
            <h2 className="mb-6 font-display text-xl font-semibold text-primary">
              Filters
            </h2>
            {FiltersPanel}
          </div>
        </aside>

        {/* Results */}
        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-primary">
                {filtered.length}
              </span>{" "}
              luxury {filtered.length === 1 ? "hotel" : "hotels"} found
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm font-medium text-primary lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeCount > 0 && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gold text-xs text-primary-dark">
                    {activeCount}
                  </span>
                )}
              </button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-primary"
                aria-label="Sort hotels"
              >
                {Object.entries(SORTS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>

              <div className="hidden items-center gap-1 rounded-xl border border-line p-1 sm:flex">
                <ViewButton
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  icon={LayoutGrid}
                  label="Grid view"
                />
                <ViewButton
                  active={view === "list"}
                  onClick={() => setView("list")}
                  icon={List}
                  label="List view"
                />
              </div>
            </div>
          </div>

          {/* Grid / list */}
          {pageItems.length > 0 ? (
            <motion.div
              layout
              className={cn(
                "grid gap-6",
                view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}
            >
              {pageItems.map((hotel: Hotel) => (
                <motion.div
                  key={hotel.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <HotelCard hotel={hotel} view={view} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="rounded-3xl border border-dashed border-line py-24 text-center">
              <p className="font-display text-xl text-primary">
                No hotels match your filters
              </p>
              <p className="mt-2 text-ink-soft">
                Try widening your search or clearing a filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="mt-6"
              >
                Reset filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-white p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-primary">
                  Filters
                </h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="grid h-9 w-9 place-items-center rounded-full bg-cloud"
                >
                  <X size={18} />
                </button>
              </div>
              {FiltersPanel}
              <Button
                variant="primary"
                className="mt-6 w-full"
                onClick={() => setDrawerOpen(false)}
              >
                Show {filtered.length} results
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
      <span
        className={cn(
          "grid h-5 w-5 place-items-center rounded-md border transition-colors",
          checked ? "border-primary bg-primary text-white" : "border-line"
        )}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.5L5 9L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}

function ViewButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof LayoutGrid;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg transition-colors",
        active ? "bg-primary text-white" : "text-muted hover:text-primary"
      )}
    >
      <Icon size={16} />
    </button>
  );
}
