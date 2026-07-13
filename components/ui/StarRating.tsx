import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Displays a 0–5 star rating with optional half-star and numeric label. */
export function StarRating({
  rating,
  size = 16,
  showValue = false,
  className,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="inline-flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-gold text-gold" : "text-line"}
            />
          );
        })}
      </span>
      {showValue && (
        <span className="text-sm font-semibold text-ink">
          {rating.toFixed(1)}
        </span>
      )}
      <span className="sr-only">{rating.toFixed(1)} out of 5 stars</span>
    </span>
  );
}
