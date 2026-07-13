import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-cloud px-4 pt-24">
      <div className="text-center">
        <p className="font-display text-[7rem] font-semibold leading-none text-primary/15 sm:text-[10rem]">
          404
        </p>
        <h1 className="-mt-4 font-display text-3xl font-semibold text-primary sm:text-4xl">
          This page has checked out
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back to somewhere beautiful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Back to home
          </Button>
          <Button href="/hotels" variant="outline" size="lg">
            Browse hotels
          </Button>
        </div>
      </div>
    </section>
  );
}
