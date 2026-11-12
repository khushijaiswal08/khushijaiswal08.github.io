// Converts the source screenshots in assets-src/ into optimised WebP files in
// public/shots/ and writes the static Open Graph image (public/og.png).
// Run with: npm run images
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const WIDTHS = [640, 1024, 1600]; // keep in sync with src/lib/image-loader.ts

// [source file, output base name, optional crop in source pixels].
// designer-portfolio/home.jpg is left out on purpose: it shows the client's name.
const SHOTS = [
  ["resume-analyzer/home.png", "resume-analyzer/upload"],
  ["resume-analyzer/results.png", "resume-analyzer/results"],
  // 16:10 crop of the score card, used as the flagship's home-page cover.
  [
    "resume-analyzer/results.png",
    "resume-analyzer/score",
    { left: 320, top: 720, width: 1920, height: 1200 },
  ],
  ["jaipur-realty/home.png", "jaipur-realty/home"],
  ["jaipur-realty/listings.png", "jaipur-realty/listings"],
  ["jaipur-realty/property.png", "jaipur-realty/property"],
  ["jaipur-realty/emi-calculator.png", "jaipur-realty/emi-calculator"],
  ["designer-portfolio/portfolio.jpg", "designer-portfolio/portfolio"],
];

for (const [source, base, crop] of SHOTS) {
  const input = path.join(root, "assets-src", source);
  const load = () => (crop ? sharp(input).extract(crop) : sharp(input));
  const meta = crop ? crop : await sharp(input).metadata();
  const outDir = path.join(root, "public", "shots", path.dirname(base));
  await mkdir(outDir, { recursive: true });
  for (const width of WIDTHS) {
    const out = path.join(root, "public", "shots", `${base}-${width}.webp`);
    await load()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
  }
  // Intrinsic size to put in src/content/projects.ts (as shown at 1600 wide).
  const shown = Math.min(1600, meta.width);
  console.log(
    `${base}: width ${shown}, height ${Math.round((meta.height * shown) / meta.width)}`,
  );
}

// Static Open Graph image, 1200x630.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#faf7f2"/>
  <rect x="0" y="0" width="16" height="630" fill="#b4441c"/>
  <text x="96" y="150" font-family="Consolas, 'Courier New', monospace" font-size="26" letter-spacing="4" fill="#b4441c">PORTFOLIO</text>
  <text x="92" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="112" fill="#1d1a17">Khushi Jaiswal</text>
  <text x="96" y="380" font-family="'Segoe UI', Arial, sans-serif" font-size="38" fill="#57504a">Automation tools and LLM applications with guardrails</text>
  <line x1="96" y1="470" x2="1104" y2="470" stroke="#d9d2c7" stroke-width="2"/>
  <text x="96" y="530" font-family="Consolas, 'Courier New', monospace" font-size="26" fill="#57504a">BTech AI &amp; Data Science  ·  Graduating June 2027  ·  Jaipur, India</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(path.join(root, "public", "og.png"));
console.log("og.png written");

// favicon.ico (a 48px PNG inside an ICO container) from the SVG icon, for
// browsers that ask for /favicon.ico directly.
const iconPng = await sharp(path.join(root, "src", "app", "icon.svg"), { density: 300 })
  .resize(48, 48)
  .png()
  .toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(48, 6); // width
header.writeUInt8(48, 7); // height
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(iconPng.length, 14);
header.writeUInt32LE(22, 18); // offset of the PNG data
await writeFile(path.join(root, "src", "app", "favicon.ico"), Buffer.concat([header, iconPng]));
console.log("favicon.ico written");
