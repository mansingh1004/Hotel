"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/data";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels", mega: true },
  { label: "Rooms", href: "/rooms" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  // Transparent hero overlay only on the homepage before scrolling.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero
          ? "bg-transparent py-5"
          : "glass py-3 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg font-display text-lg font-bold transition-colors",
              overHero ? "bg-white/15 text-white" : "bg-primary text-white"
            )}
          >
            L
          </span>
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-tight transition-colors",
              overHero ? "text-white" : "text-primary"
            )}
          >
            Luxvoy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.mega && setMegaOpen(true)}
                onMouseLeave={() => link.mega && setMegaOpen(false)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    overHero
                      ? "text-white/90 hover:text-white"
                      : "text-ink hover:text-primary",
                    active && (overHero ? "text-white" : "text-primary")
                  )}
                >
                  {link.label}
                  {link.mega && <ChevronDown size={14} />}
                </Link>
                {active && (
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full",
                      overHero ? "bg-gold" : "bg-gold"
                    )}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+18005550100"
            className={cn(
              "hidden items-center gap-2 text-sm font-medium xl:flex",
              overHero ? "text-white/90" : "text-ink"
            )}
          >
            <Phone size={16} />
            +1 800 555 0100
          </a>
          <Button
            href="/hotels"
            variant={overHero ? "white" : "gold"}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Book Now
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full lg:hidden",
              overHero ? "text-white" : "text-primary"
            )}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="mx-auto mt-2 max-w-5xl px-6">
              <div className="glass grid grid-cols-4 gap-2 rounded-3xl p-4 shadow-soft">
                {destinations.map((d) => (
                  <Link
                    key={d.id}
                    href={`/hotels?destination=${encodeURIComponent(d.name)}`}
                    className="group rounded-2xl p-3 transition-colors hover:bg-white/70"
                  >
                    <p className="font-medium text-primary group-hover:text-primary-dark">
                      {d.name}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {d.hotelsCount} hotels · from ₹{d.fromPrice}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[64px] z-40 bg-white lg:hidden"
          >
            <nav className="flex h-full flex-col gap-1 overflow-y-auto px-6 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-line py-4 font-display text-lg text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="/hotels" variant="gold" size="lg" className="mt-6">
                Book Your Stay
              </Button>
              <a
                href="tel:+18005550100"
                className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-soft"
              >
                <Phone size={16} /> +1 800 555 0100
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
