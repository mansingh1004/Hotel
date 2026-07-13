"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Email capture with lightweight inline validation and success state. */
export function NewsletterForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    // Demo only — no backend. Simulate a successful subscription.
    setStatus("done");
    setEmail("");
  };

  if (status === "done") {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          variant === "dark" ? "text-emerald-light" : "text-emerald"
        )}
      >
        <Check size={18} /> You&apos;re on the list — welcome to Luxvoy.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Your email address"
            aria-label="Email address"
            className={cn(
              "w-full rounded-full px-5 py-3.5 text-sm outline-none transition-all",
              variant === "dark"
                ? "bg-white/10 text-white placeholder:text-white/50 focus:bg-white/15 focus:ring-2 focus:ring-gold"
                : "border border-line bg-white text-ink placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20",
              status === "error" && "ring-2 ring-red-400"
            )}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-dark transition-all hover:bg-gold-light hover:-translate-y-0.5"
        >
          Subscribe <ArrowRight size={16} />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 pl-4 text-xs text-red-400">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
