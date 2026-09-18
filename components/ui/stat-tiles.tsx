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
        // Tiles are ~95px wide inside a 320px phone, so the figure steps
        // down there and may wrap anywhere (ranges like "9.52–15.88 mm" have
        // no natural break) rather than clip against the rounded shell.
        <div
          key={stat.label}
          className="flex min-w-0 flex-col-reverse bg-background/80 p-4 backdrop-blur sm:p-5"
        >
          <dt className="mt-1.5 text-[12px] leading-5 text-muted">{stat.label}</dt>
          <dd className="text-xl font-semibold tracking-tight wrap-anywhere text-accent sm:text-2xl lg:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
