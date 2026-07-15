import type { ReactElement } from "react";

/**
 * Keystatic sidebar brand mark for the Luxvoy CMS.
 * Receives the admin colour scheme so the logo stays legible in light & dark.
 */
export function BrandMark({
  colorScheme,
}: {
  colorScheme: "light" | "dark";
}): ReactElement {
  const dark = colorScheme === "dark";
  const badgeTop = dark ? "#1c6bb0" : "#0f4c81";
  const badgeBottom = dark ? "#0f4c81" : "#0a3557";
  const gem = dark ? "#e6c757" : "#d4af37";
  const gemHi = dark ? "#f2dd8a" : "#e6c757";

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Luxvoy"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lv-badge" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor={badgeTop} />
          <stop offset="1" stopColor={badgeBottom} />
        </linearGradient>
        <linearGradient id="lv-gem" x1="16" y1="7" x2="16" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor={gemHi} />
          <stop offset="1" stopColor={gem} />
        </linearGradient>
      </defs>

      <rect width="32" height="32" rx="9" fill="url(#lv-badge)" />

      {/* Faceted gem */}
      <path d="M16 7l7 5.4L16 25 9 12.4 16 7z" fill="url(#lv-gem)" />
      <path d="M9 12.4h14" stroke={badgeBottom} strokeOpacity="0.35" strokeWidth="0.9" />
      <path d="M16 7l-3.1 5.4L16 25l3.1-12.6L16 7z" fill={gemHi} fillOpacity="0.25" />
    </svg>
  );
}
