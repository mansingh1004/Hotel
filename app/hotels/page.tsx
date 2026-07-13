import type { Metadata } from "next";
import { img, PHOTOS } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { HotelsExplorer } from "@/components/hotels/HotelsExplorer";

export const metadata: Metadata = {
  title: "Luxury Hotels & Resorts",
  description:
    "Browse and filter our curated collection of the world's finest luxury hotels and resorts by price, rating, location, and amenities.",
};

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string }>;
}) {
  const { destination = "" } = await searchParams;

  return (
    <>
      <PageHeader
        title="Find your perfect stay"
        subtitle="Explore our full collection of extraordinary hotels and resorts, filtered to your exact taste."
        image={img(PHOTOS.facade, 2000, 75)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Hotels" }]}
      />
      <HotelsExplorer initialDestination={destination} />
    </>
  );
}
