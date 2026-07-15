import type { Metadata } from "next";
import { img, PHOTOS } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { RoomsGrid } from "@/components/rooms/RoomsGrid";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Discover our collection of luxury rooms, suites, and villas — from elegant deluxe rooms to expansive presidential villas.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHeader
        title="Rooms & Suites"
        subtitle="From refined deluxe rooms to palatial villas, find the perfect setting for your escape."
        image={img(PHOTOS.suite, 2000, 75)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
      />
      <RoomsGrid />
    </>
  );
}
