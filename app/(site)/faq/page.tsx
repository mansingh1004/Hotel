import type { Metadata } from "next";
import { img, PHOTOS } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about booking, payment, cancellation, and the services offered across our collection.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        subtitle="Everything you need to know about booking your stay with Luxvoy."
        image={img(PHOTOS.bedroomView, 2000, 75)}
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <FaqAccordion />

      <section className="bg-cloud py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mt-3 text-ink-soft">
            Our concierge team is available 24/7 to help with anything at all.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="mt-6">
            Contact our team
          </Button>
        </div>
      </section>
    </>
  );
}
