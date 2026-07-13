import Link from "next/link";
import {
  Camera,
  ThumbsUp,
  Bird,
  Briefcase,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "All Hotels", href: "/hotels" },
      { label: "Rooms & Suites", href: "/rooms" },
      { label: "Destinations", href: "/hotels" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/faq" },
      { label: "Cancellation", href: "/faq" },
      { label: "Terms of Service", href: "/faq" },
      { label: "Privacy Policy", href: "/faq" },
    ],
  },
];

const socials = [
  { icon: Camera, href: "https://instagram.com", label: "Instagram" },
  { icon: ThumbsUp, href: "https://facebook.com", label: "Facebook" },
  { icon: Bird, href: "https://twitter.com", label: "Twitter" },
  { icon: Briefcase, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter band */}
        <div className="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              Join the inner circle
            </h3>
            <p className="mt-2 max-w-md text-white/70">
              Be first to receive exclusive offers, new openings, and curated
              travel inspiration.
            </p>
          </div>
          <NewsletterForm variant="dark" />
        </div>

        {/* Main grid */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold font-display text-lg font-bold text-primary-dark">
                L
              </span>
              <span className="font-display text-xl font-semibold">Luxvoy</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              A curated collection of the world&apos;s most extraordinary hotels
              and resorts, reserved for travellers who expect the exceptional.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-gold" /> 1 Grosvenor Square,
                London, UK
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold" /> +1 800 555 0100
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold" /> concierge@luxvoy.com
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Luxvoy. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-primary-dark"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
