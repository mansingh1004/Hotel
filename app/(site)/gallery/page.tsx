import type { Metadata } from "next";
import { img, PHOTOS } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual journey through our collection — resorts, interiors, spas, dining, and the moments that make each stay unforgettable.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="A visual journey through the world's most beautiful hotels and the moments they inspire."
        image={img(PHOTOS.terrace, 2000, 75)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <GalleryGrid />
    </>
  );
}
