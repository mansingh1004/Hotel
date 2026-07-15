/**
 * Dev launcher: runs `next dev` AND watches content/ so that any change made
 * in the Keystatic admin (which writes content/*.json) instantly rebuilds the
 * aggregate lib/content.data.json. Next then hot-reloads, so CMS edits show up
 * on the site immediately — no manual `npm run generate:content` needed.
 */
import { spawn, execFileSync } from "node:child_process";
import { watch } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const GENERATOR = join(ROOT, "scripts", "generate-content.mjs");

function generate() {
  try {
    execFileSync(process.execPath, [GENERATOR], { stdio: "inherit" });
  } catch (err) {
    console.error("[content] generation failed:", err.message);
  }
}

// Build once up front so the app always has fresh data.
generate();

// Regenerate whenever content/ changes (debounced — Keystatic may write
// several files per save).
let timer = null;
try {
  watch(CONTENT, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(generate, 200);
  });
  console.log("[content] watching content/ — CMS edits will rebuild live");
} catch (err) {
  console.warn(
    "[content] could not watch content/, run `npm run generate:content` after edits:",
    err.message
  );
}

// Launch Next's dev server (inherit stdio so its output shows normally).
// shell:true is required on Windows (Node refuses to spawn npm.cmd directly).
const next = spawn("npm", ["run", "dev:next"], {
  stdio: "inherit",
  cwd: ROOT,
  shell: true,
});
next.on("exit", (code) => process.exit(code ?? 0));
