import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "emerald" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-soft hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg",
  gold: "bg-gold text-primary-dark shadow-gold hover:bg-gold-light hover:-translate-y-0.5",
  emerald:
    "bg-emerald text-white shadow-soft hover:bg-emerald-dark hover:-translate-y-0.5",
  outline:
    "border border-primary/25 text-primary hover:border-primary hover:bg-primary hover:text-white",
  ghost: "text-ink hover:bg-cloud",
  white:
    "bg-white text-primary shadow-card hover:-translate-y-0.5 hover:shadow-lg",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Renders an anchor when `href` is provided, otherwise a button. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & ComponentProps<"button">)
  )) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        {...(props as Omit<ComponentProps<typeof Link>, "href" | "className">)}
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
