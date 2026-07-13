import type { Variants } from "framer-motion";

/**
 * Brand easing curve as an explicit cubic-bézier tuple so framer-motion's
 * `Easing` type accepts it (a bare array literal widens to number[]).
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade-and-rise variant used by hero/staggered content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: EASE },
  }),
};
