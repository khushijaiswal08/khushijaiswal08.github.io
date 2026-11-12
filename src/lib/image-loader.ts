"use client";

/**
 * Maps a screenshot base path (e.g. "/shots/jaipur-realty/home") and a
 * requested width to one of the WebP files written by
 * scripts/optimize-images.mjs. Keep WIDTHS in sync with that script and with
 * `images.deviceSizes` in next.config.ts.
 */
const WIDTHS = [640, 1024, 1600];

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  const chosen = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${src}-${chosen}.webp`;
}
