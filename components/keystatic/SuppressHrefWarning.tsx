"use client";

/**
 * Keystatic's own breadcrumb component (@keystar/ui) renders an <a href="">
 * on entry pages, which makes React log a dev-only "empty string href"
 * console error — popping the Next.js browser overlay and printing to the
 * dev terminal. It's harmless and never occurs in production, but it's noisy
 * while editing content.
 *
 * We patch console.error at module load (covering the first render) on both
 * server and client, filtering out ONLY that exact message, ONLY in
 * development. This module is imported solely by the Keystatic layout, so it
 * only loads for the /keystatic admin — the public site is never affected.
 */
if (process.env.NODE_ENV !== "production") {
  const flag = "__luxvoyHrefWarningPatched";
  const g = globalThis as unknown as Record<string, boolean>;
  if (!g[flag]) {
    g[flag] = true;
    const original = console.error;
    console.error = (...args: unknown[]) => {
      const first = args[0];
      // React 19 logs this with a %s placeholder, e.g.
      //   'An empty string ("") was passed to the %s attribute...'  ["href"]
      // so match the stable format-string words, not the literal "href".
      if (
        typeof first === "string" &&
        first.includes("An empty string") &&
        first.includes("attribute")
      ) {
        return; // swallow this specific Keystatic/Keystar warning
      }
      original(...args);
    };
  }
}

export function SuppressHrefWarning() {
  return null;
}
