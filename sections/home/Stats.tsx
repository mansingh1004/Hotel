import { stats } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="border-y border-line bg-cloud py-16">
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
  );
}
