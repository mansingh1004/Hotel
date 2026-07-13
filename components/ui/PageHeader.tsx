import Image from "next/image";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Reveal } from "./Reveal";

/** Shared hero band for inner pages: image background, title, breadcrumb. */
export function PageHeader({
  title,
  subtitle,
  image,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  image: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-primary-dark/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-4 [&_*]:text-white/80 [&_a:hover]:!text-gold [&_span]:!text-white">
            <Breadcrumb items={crumbs} />
          </div>
          <h1 className="font-display text-4xl font-semibold text-white text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
