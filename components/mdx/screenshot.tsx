import Image from "next/image";

// Explicit width/height let Next reserve space and avoid layout shift.
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
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border bg-muted/40 shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
