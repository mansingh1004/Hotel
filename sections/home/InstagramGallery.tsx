import Image from "next/image";
import { Camera } from "lucide-react";
import { galleryImages } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function InstagramGallery() {
  const shots = galleryImages.slice(0, 6);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="@luxvoy"
          title="Follow the journey"
          description="Tag #Luxvoy to share your escape and be featured in our collection of unforgettable moments."
        />

        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {shots.map((shot) => (
            <StaggerItem key={shot.id}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={shot.src}
                  alt={shot.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 grid place-items-center bg-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Camera size={24} className="text-white" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
