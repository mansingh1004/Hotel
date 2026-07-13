import {
  Wifi,
  Waves,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Wine,
  CarFront,
  Plane,
  ConciergeBell,
  Umbrella,
  Dog,
  BellRing,
  Briefcase,
  Snowflake,
  type LucideIcon,
} from "lucide-react";
import type { AmenityKey } from "@/types";

/** Maps amenity keys to a display label and Lucide icon. */
export const AMENITIES: Record<AmenityKey, { label: string; icon: LucideIcon }> =
  {
    wifi: { label: "Free WiFi", icon: Wifi },
    pool: { label: "Swimming Pool", icon: Waves },
    spa: { label: "Spa & Wellness", icon: Sparkles },
    gym: { label: "Fitness Center", icon: Dumbbell },
    restaurant: { label: "Restaurant", icon: UtensilsCrossed },
    bar: { label: "Bar & Lounge", icon: Wine },
    parking: { label: "Valet Parking", icon: CarFront },
    airport: { label: "Airport Pickup", icon: Plane },
    concierge: { label: "24/7 Concierge", icon: ConciergeBell },
    beach: { label: "Private Beach", icon: Umbrella },
    petFriendly: { label: "Pet Friendly", icon: Dog },
    roomService: { label: "Room Service", icon: BellRing },
    businessCenter: { label: "Business Center", icon: Briefcase },
    airConditioning: { label: "Air Conditioning", icon: Snowflake },
  };

export const amenityLabel = (key: AmenityKey) => AMENITIES[key].label;
