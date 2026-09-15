import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

const aspects = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;

export interface Photo {
  /** Fixed public path the client's photograph is dropped into. */
  src: string;
  alt: string;
  caption: string;
}

/**
 * A figure with a reserved slot for real photography. Renders the image
 * when the file exists under /public; otherwise an engineered placeholder
 * that shows exactly where the shot goes. Server-only (reads the disk at
 * build time) — never import from a client component.
 */
export default function PhotoSlot({
  src,
  alt,
  caption,
  figure,
  aspect = "16/10",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className = "",
  ...rest
}: Photo & {
  figure: string;
  aspect?: keyof typeof aspects;
  sizes?: string;
  priority?: boolean;
  className?: string;
  "data-reveal"?: string;
}) {
  const exists = existsSync(join(process.cwd(), "public", src));

  return (
    <figure className={className} {...rest}>
      <div
        className={`relative overflow-hidden rounded-3xl border border-border bg-surface ${aspects[aspect]}`}
      >
        {exists ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          <div aria-hidden="true" className="absolute inset-0">
            {/* Corner ticks */}
            <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-accent/40" />
            <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-accent/40" />
            <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-accent/40" />
            <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-accent/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent/70">
                Fig. {figure} · Photograph to follow
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{alt}</p>
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        <span>{caption}</span>
        <span className="font-mono">Fig {figure}</span>
      </figcaption>
    </figure>
  );
}
