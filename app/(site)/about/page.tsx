import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Award as AwardIcon, Quote } from "lucide-react";
import { team, awards, stats } from "@/lib/data";
import { img, PHOTOS } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind Luxvoy — our mission, our people, and our obsession with the details that make travel extraordinary.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Our story"
        subtitle="A collection built by travellers, for travellers who expect the extraordinary."
        image={img(PHOTOS.grandLobby, 2000, 75)}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src={img(PHOTOS.cityHotel, 1000)}
                alt="A grand hotel lobby"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Since 2014"
              title="Redefining what luxury travel should feel like"
              className="mx-0"
            />
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>
                Luxvoy began with a simple frustration: booking a truly
                exceptional hotel was harder than it should be. Endless listings,
                inconsistent standards, and no one who actually knew the
                properties.
              </p>
              <p>
                So we built the opposite. A tightly curated collection where every
                hotel is personally visited and vetted, paired with a concierge
                team that treats your stay as if it were their own.
              </p>
              <p>
                Today we partner with over 320 of the world&apos;s finest hotels
                across 68 countries — but our obsession has never changed: the
                details that turn a good stay into an unforgettable one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-line bg-cloud py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <p className="font-display text-4xl font-semibold text-primary sm:text-5xl">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.label === "Average Rating" ? 1 : 0}
                  />
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-soft">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              body: "To make discovering and booking the world's most extraordinary hotels effortless, personal, and endlessly inspiring.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              body: "A world where every journey is elevated — where luxury is measured not in stars, but in moments you'll never forget.",
            },
          ].map((c) => (
            <Reveal key={c.title}>
              <div className="h-full rounded-3xl border border-line bg-cloud p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white">
                  <c.icon size={26} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-primary">
                  {c.title}
                </h3>
                <p className="mt-3 text-ink-soft">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-cloud py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The people"
            title="Meet the curators"
            description="A small, obsessive team dedicated to crafting your perfect stay."
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <StaggerItem key={m.id}>
                <div className="group overflow-hidden rounded-3xl bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {m.name}
                    </h3>
                    <p className="text-sm font-medium text-gold">{m.role}</p>
                    <p className="mt-2 text-sm text-ink-soft">{m.bio}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Awards */}
      <section className="relative overflow-hidden bg-primary py-20 text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow="Recognition"
            title="Awards & accolades"
            description="We're honoured to be recognised by the industry's most respected voices."
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((a) => (
              <StaggerItem key={a.title}>
                <div className="h-full rounded-3xl glass-dark p-6">
                  <AwardIcon size={28} className="text-gold" />
                  <p className="mt-4 font-display text-2xl font-semibold text-gold">
                    {a.year}
                  </p>
                  <h3 className="mt-2 font-medium">{a.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{a.org}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Founder quote */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <Quote size={44} className="mx-auto fill-gold/20 text-gold" />
            <blockquote className="mt-6 font-display text-2xl font-medium leading-relaxed text-primary sm:text-3xl">
              &ldquo;Luxury isn&apos;t about excess. It&apos;s about the feeling
              that everything has been taken care of, before you even had to
              ask.&rdquo;
            </blockquote>
            <p className="mt-6 font-medium text-ink">Adrian Vale</p>
            <p className="text-sm text-muted">Founder &amp; CEO, Luxvoy</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
