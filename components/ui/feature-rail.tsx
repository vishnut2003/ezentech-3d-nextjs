import Link from "next/link";

export type RailItem =
  | string
  | { label: string; icon?: React.ReactNode; href?: string };

/** Row of small uppercase pills (the spec page's feature list recipe). */
export default function FeatureRail({
  items,
  label,
  className = "",
  ...rest
}: {
  items: RailItem[];
  /** Accessible name for the list. */
  label: string;
  className?: string;
  "data-reveal"?: string;
}) {
  const pill =
    "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted";
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label} {...rest}>
      {items.map((item) => {
        const it = typeof item === "string" ? { label: item } : item;
        const content = (
          <>
            {it.icon ? (
              <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                {it.icon}
              </svg>
            ) : null}
            {it.label}
          </>
        );
        return (
          <li key={it.label}>
            {it.href ? (
              <Link
                href={it.href}
                className={`${pill} transition-colors hover:border-accent hover:text-accent`}
              >
                {content}
              </Link>
            ) : (
              <span className={pill}>{content}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
