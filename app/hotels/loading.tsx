import { CardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function HotelsLoading() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-64" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <Skeleton className="hidden h-[600px] rounded-3xl lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
