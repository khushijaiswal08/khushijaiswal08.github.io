// Crops the profile photo (head and chest only, above the ID badge) and writes small WebP files.
// Usage: node scripts/make-photo.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const src = "assets-src/khushi-original.jpg";
const meta = await sharp(src).metadata();
console.log("original", meta.width, meta.height);
const sx = meta.width / 910; // crop box was chosen on a 910x1280 view
const box = {
  left: Math.round(100 * sx),
  top: Math.round(240 * sx),
  width: Math.round(720 * sx),
  height: Math.round(720 * sx),
};
await mkdir("public/me", { recursive: true });
for (const w of [320, 640]) {
  await sharp(src).extract(box).resize(w, w).webp({ quality: 82 }).toFile(`public/me/khushi-${w}.webp`);
}
