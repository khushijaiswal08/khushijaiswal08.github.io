import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes plain HTML/CSS/JS to out/.
  output: "export",
  // Emit /projects/<slug>/index.html so every static host resolves the URLs.
  trailingSlash: true,
  images: {
    // Screenshots are pre-optimised by scripts/optimize-images.mjs; the
    // loader only picks the right pre-built width (no image server needed).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1024, 1600],
    imageSizes: [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
