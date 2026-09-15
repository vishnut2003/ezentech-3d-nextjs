export interface Stat {
  value: string;
  label: string;
}

/**
 * Headline figures as a hairline-divided tile grid (the spec-intro recipe).
 * Pass 2 or 4 items so the grid never leaves an orphan.
 */
export default function StatTiles({
  items,
  columns = 2,
  className = "",
  ...rest
}: {
  items: Stat[];
  columns?: 2 | 4;
  className?: string;
  "data-reveal"?: string;
}) {
  if (process.env.NODE_ENV !== "production" && items.length % 2 !== 0) {
    throw new Error("StatTiles: pass an even number of items (2 or 4).");
  }
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border ${
        columns === 4 ? "sm:grid-cols-4" : ""
      } ${className}`}
      {...rest}
    >
      {items.map((stat) => (
        // dt precedes dd in the DOM; the column is reversed visually so
        // the figure sits above its label.
        <div
          key={stat.label}
          className="flex flex-col-reverse bg-background/80 p-5 backdrop-blur"
        >
          <dt className="mt-1.5 text-[12px] leading-5 text-muted">{stat.label}</dt>
          <dd className="text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
