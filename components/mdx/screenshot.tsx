import Image from "next/image";
import { Maximize2 } from "lucide-react";

// Explicit width/height let Next reserve space and avoid layout shift.
// Terminal screenshots are dense, so each one links to the full-size image.
export function Screenshot({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="not-prose my-8">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="group relative block overflow-hidden rounded-xl border bg-muted/40 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="h-auto w-full"
        />
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-medium text-white opacity-100 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
          <Maximize2 className="size-3" aria-hidden />
          Full size
        </span>
      </a>
      {caption && (
        <figcaption className="mt-2.5 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
