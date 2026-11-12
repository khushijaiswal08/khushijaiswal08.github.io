// Runs after `next build`.
//
// The static export writes the per-segment prefetch files for nested routes
// into folders, e.g.
//   out/projects/jaipur-realty/__next.projects/$d$slug/__PAGE__.txt
// but the browser asks for them with dots,
//   out/projects/jaipur-realty/__next.projects.$d$slug.__PAGE__.txt
// On a plain static host that mismatch shows up as 404s in the console when
// links are prefetched. This script copies each nested file to the dotted
// name so both forms exist. It only touches the generated out/ folder.
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
let copied = 0;

async function flatten(dir, routeDir, prefix) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const dotted = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) {
      await flatten(full, routeDir, dotted);
    } else {
      await copyFile(full, path.join(routeDir, dotted));
      copied += 1;
    }
  }
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flatten(full, dir, entry.name);
    } else {
      await walk(full);
    }
  }
}

await walk(out);
console.log(`postbuild: ${copied} prefetch file(s) copied to dotted names`);
