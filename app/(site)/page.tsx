import { Hero } from "@/sections/home/Hero";
import { Stats } from "@/sections/home/Stats";
import { FeaturedHotels } from "@/sections/home/FeaturedHotels";
import { Destinations } from "@/sections/home/Destinations";
import { RoomCategories } from "@/sections/home/RoomCategories";
import { Amenities } from "@/sections/home/Amenities";
import { Offers } from "@/sections/home/Offers";
import { Testimonials } from "@/sections/home/Testimonials";
import { CtaBanner } from "@/sections/home/CtaBanner";
import { InstagramGallery } from "@/sections/home/InstagramGallery";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedHotels />
      <Destinations />
      <RoomCategories />
      <Amenities />
      <Offers />
      <Testimonials />
      <CtaBanner />
      <InstagramGallery />
    </>
  );
}
