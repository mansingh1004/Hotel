import Image from "next/image";
import { Star } from "lucide-react";
import type { Hotel } from "@/types";
import { StarRating } from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";

/** Rating summary with a distribution bar chart plus individual reviews. */
export function HotelReviews({ hotel }: { hotel: Hotel }) {
  // Build a plausible star distribution from the sample reviews.
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const count = hotel.reviews.filter((r) => Math.round(r.rating) === star)
      .length;
    return { star, count };
  });
  const max = Math.max(1, ...dist.map((d) => d.count));

  return (
    <div>
      <div className="grid gap-8 rounded-3xl border border-line bg-cloud p-6 sm:grid-cols-[auto_1fr] sm:p-8">
        {/* Score */}
        <div className="flex flex-col items-center justify-center border-line sm:border-r sm:pr-8">
          <p className="font-display text-5xl font-semibold text-primary">
            {hotel.rating.toFixed(1)}
          </p>
          <StarRating rating={hotel.rating} className="mt-2" />
          <p className="mt-2 text-sm text-ink-soft">
            {hotel.reviewsCount.toLocaleString()} reviews
          </p>
        </div>

        {/* Distribution */}
        <div className="space-y-2">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-3">
              <span className="flex w-8 items-center gap-1 text-sm text-ink-soft">
                {d.star} <Star size={12} className="fill-gold text-gold" />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${(d.count / max) * 100}%` }}
                />
              </div>
              <span className="w-6 text-right text-sm text-muted">
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {hotel.reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-line bg-white p-5"
          >
            <header className="flex items-center gap-3">
              <Image
                src={review.avatar}
                alt={review.author}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-primary">{review.author}</p>
                <p className="text-xs text-muted">
                  {review.country} · {formatDate(review.date)}
                </p>
              </div>
              <StarRating rating={review.rating} size={14} />
            </header>
            <h4 className="mt-4 font-semibold text-ink">{review.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {review.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
