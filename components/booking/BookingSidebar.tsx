"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Users,
  BedDouble,
  Tag,
  Check,
  ShieldCheck,
} from "lucide-react";
import type { Hotel } from "@/types";
import { formatCurrency, nightsBetween, cn } from "@/lib/utils";

/** Valid demo coupons → discount fraction. */
const COUPONS: Record<string, number> = {
  LUX10: 0.1,
  ISLAND25: 0.25,
  EARLY30: 0.3,
};

const SERVICE_FEE_RATE = 0.08;
const TAX_RATE = 0.12;

/** Sticky booking widget with live price breakdown, coupons and summary. */
export function BookingSidebar({ hotel }: { hotel: Hotel }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState(hotel.rooms[0]?.id ?? "");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; rate: number } | null>(
    null
  );
  const [couponError, setCouponError] = useState("");
  const [booked, setBooked] = useState(false);

  const today = "2026-07-13";
  const room = hotel.rooms.find((r) => r.id === roomId) ?? hotel.rooms[0];
  // A hotel may have no rooms yet (e.g. just created in the CMS) — fall back
  // to the hotel's nightly price so the widget still works.
  const basePrice = room?.price ?? hotel.pricePerNight;
  const nights = nightsBetween(checkIn, checkOut);

  const totals = useMemo(() => {
    const n = Math.max(nights, 0);
    const subtotal = basePrice * n;
    const serviceFee = subtotal * SERVICE_FEE_RATE;
    const taxes = subtotal * TAX_RATE;
    const discount = applied ? subtotal * applied.rate : 0;
    const total = subtotal + serviceFee + taxes - discount;
    return { subtotal, serviceFee, taxes, discount, total };
  }, [basePrice, nights, applied]);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setApplied({ code, rate: COUPONS[code] });
      setCouponError("");
    } else {
      setApplied(null);
      setCouponError("That code isn't valid. Try LUX10.");
    }
  };

  const canBook = nights > 0 && !!checkIn && !!checkOut;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
      {/* Price header */}
      <div className="flex items-baseline justify-between">
        <p className="font-display text-3xl font-semibold text-primary">
          {formatCurrency(basePrice)}
          <span className="text-base font-normal text-muted"> / night</span>
        </p>
        <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
          Best price
        </span>
      </div>

      {/* Dates */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        <label className="rounded-2xl border border-line px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            <CalendarDays size={13} /> Check in
          </span>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm font-medium text-ink outline-none"
          />
        </label>
        <label className="rounded-2xl border border-line px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            <CalendarDays size={13} /> Check out
          </span>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm font-medium text-ink outline-none"
          />
        </label>
      </div>

      {/* Guests + room */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="rounded-2xl border border-line px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            <Users size={13} /> Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full bg-transparent text-sm font-medium text-ink outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
        {hotel.rooms.length > 0 && (
          <label className="rounded-2xl border border-line px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
              <BedDouble size={13} /> Room
            </span>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-medium text-ink outline-none"
            >
              {hotel.rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.type}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {/* Coupon */}
      <div className="mt-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="w-full rounded-xl border border-line py-2.5 pl-9 pr-3 text-sm uppercase outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={applyCoupon}
            className="rounded-xl border border-primary px-4 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Apply
          </button>
        </div>
        {applied && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald">
            <Check size={14} /> {applied.code} applied — {applied.rate * 100}% off
          </p>
        )}
        {couponError && (
          <p className="mt-2 text-xs text-red-500">{couponError}</p>
        )}
      </div>

      {/* Breakdown */}
      <div className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
        <Row
          label={`${formatCurrency(basePrice)} × ${nights || 0} night${
            nights === 1 ? "" : "s"
          }`}
          value={formatCurrency(totals.subtotal)}
        />
        <Row label="Service fee" value={formatCurrency(totals.serviceFee)} muted />
        <Row label="Taxes" value={formatCurrency(totals.taxes)} muted />
        {totals.discount > 0 && (
          <Row
            label="Discount"
            value={`− ${formatCurrency(totals.discount)}`}
            emerald
          />
        )}
        <div className="flex items-center justify-between border-t border-line pt-3 font-display text-lg font-semibold text-primary">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => canBook && setBooked(true)}
        disabled={!canBook}
        className={cn(
          "mt-5 w-full rounded-full py-3.5 font-semibold text-white transition-all",
          canBook
            ? "bg-emerald hover:bg-emerald-dark hover:-translate-y-0.5 shadow-soft"
            : "cursor-not-allowed bg-muted"
        )}
      >
        {booked ? "Reservation confirmed ✓" : "Reserve Now"}
      </button>

      {booked && (
        <p className="mt-3 rounded-xl bg-emerald/10 px-4 py-3 text-center text-sm text-emerald">
          Thank you! A confirmation has been sent to your email.
        </p>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
        <ShieldCheck size={14} className="text-emerald" />
        Free cancellation up to 48h before check-in
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  emerald,
}: {
  label: string;
  value: string;
  muted?: boolean;
  emerald?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-muted" : "text-ink-soft"}>{label}</span>
      <span
        className={cn(
          "font-medium",
          emerald ? "text-emerald" : "text-ink"
        )}
      >
        {value}
      </span>
    </div>
  );
}
