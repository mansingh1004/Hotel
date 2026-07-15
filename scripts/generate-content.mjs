/**
 * Aggregates the per-entry JSON under content/ (edited via Keystatic at
 * /keystatic) into a single lib/content.data.json that lib/data.ts imports
 * synchronously — keeping the data layer client-bundle-safe.
 *
 * Runs automatically before `dev` and `build` (see package.json), and can be
 * run manually with: npm run generate:content
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const OUT = join(ROOT, "lib", "content.data.json");

const COLLECTIONS = [
  "hotels",
  "destinations",
  "offers",
  "testimonials",
  "services",
  "team",
  "gallery",
  "faqs",
];

/** Read every *.json in a collection dir, injecting slug = filename. */
function readCollection(name) {
  const dir = join(CONTENT, name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const slug = f.replace(/\.json$/, "");
      const data = JSON.parse(readFileSync(join(dir, f), "utf8"));
      return { slug, ...data };
    });
}

const output = {};
for (const name of COLLECTIONS) output[name] = readCollection(name);

const aboutPath = join(CONTENT, "about.json");
output.about = existsSync(aboutPath)
  ? JSON.parse(readFileSync(aboutPath, "utf8"))
  : { stats: [], awards: [] };

writeFileSync(OUT, JSON.stringify(output, null, 2) + "\n", "utf8");

const counts = COLLECTIONS.map((c) => `${c}:${output[c].length}`).join("  ");
console.log(`Generated lib/content.data.json  (${counts})`);
