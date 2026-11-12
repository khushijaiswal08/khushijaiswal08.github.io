import Image from "next/image";
import type { Screenshot } from "@/content/projects";

/**
 * A screenshot in a plain window frame. Files are pre-optimised WebP in
 * public/shots/ and picked by src/lib/image-loader.ts.
 * `crop` shows only the top of tall screenshots (used on the home page).
 */
export function Shot({
  shot,
  sizes,
  eager = false,
  crop = false,
}: {
  shot: Screenshot;
  sizes: string;
  eager?: boolean;
  crop?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-16px_rgb(0_0_0/0.18)]">
      <div
        aria-hidden="true"
        className="flex h-7 items-center gap-1.5 border-b border-line px-3"
      >
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={
          crop
            ? "aspect-[16/10] h-auto w-full object-cover object-top"
            : "h-auto w-full"
        }
      />
    </div>
  );
}
