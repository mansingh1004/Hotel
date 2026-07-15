import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Camera, ThumbsUp, Bird, Briefcase } from "lucide-react";
import { img, PHOTOS } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Luxvoy concierge team — we're available 24/7 to help plan your perfect stay.",
};

const details = [
  { icon: MapPin, label: "Visit us", value: "1 Grosvenor Square, London, W1K 6JP, UK" },
  { icon: Phone, label: "Call us", value: "+1 800 555 0100", href: "tel:+18005550100" },
  { icon: Mail, label: "Email us", value: "concierge@luxvoy.com", href: "mailto:concierge@luxvoy.com" },
  { icon: Clock, label: "Hours", value: "Concierge available 24 / 7" },
];

const socials = [
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: ThumbsUp, label: "Facebook", href: "https://facebook.com" },
  { icon: Bird, label: "Twitter", href: "https://twitter.com" },
  { icon: Briefcase, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        subtitle="Our concierge team is available around the clock to craft your perfect escape."
        image={img(PHOTOS.concierge, 2000, 75)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          {/* Info column */}
          <Reveal direction="right">
            <p className="eyebrow text-gold">We&apos;re here to help</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary">
              Let&apos;s plan something extraordinary
            </h2>
            <p className="mt-4 text-ink-soft">
              Whether you have a question about a booking or want a fully bespoke
              itinerary, we&apos;d love to hear from you.
            </p>

            <ul className="mt-8 space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/8 text-primary">
                    <d.icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted">{d.label}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-medium text-primary transition-colors hover:text-gold"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-cloud text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-line shadow-card">
            <iframe
              title="Luxvoy London office"
              src="https://maps.google.com/maps?q=51.5113,-0.1503&z=14&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-96 w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
