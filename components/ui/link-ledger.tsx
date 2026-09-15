import Link from "next/link";
import type { NavLink } from "@/lib/nav";
import { PanelHeader, PanelShell } from "./panel";

export interface LedgerLink {
  href: string;
  title: string;
  description: string;
  /** Right-aligned mono note, e.g. "6 min · Technical". */
  meta?: string;
}

export function fromNav(links: readonly NavLink[]): LedgerLink[] {
  return links.map((l) => ({
    href: l.href,
    title: l.label,
    description: l.description,
  }));
}

/**
 * Numbered list of links in the engineered panel shell — the overview
 * treatment used instead of card grids.
 */
export default function LinkLedger({
  label,
  unit,
  items,
  id,
  className,
  revealRows,
}: {
  label: string;
  unit: string;
  items: LedgerLink[];
  id?: string;
  className?: string;
  revealRows?: boolean;
}) {
  const rowReveal = revealRows ? { "data-reveal": "" } : {};
  return (
    <PanelShell id={id} className={className}>
      <PanelHeader label={label} count={items.length} unit={unit} />
      <ul>
        {items.map((item, i) => (
          <li key={item.href} {...rowReveal}>
            <Link
              href={item.href}
              className="group grid grid-cols-[2.75rem_1fr_auto] items-start gap-4 border-t border-border px-6 py-5 transition-colors first:border-t-0 hover:bg-surface/70"
            >
              <span
                aria-hidden="true"
                className="pt-0.5 font-mono text-[12px] font-medium tracking-wider text-accent/70 transition-colors group-hover:text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                <span className="mt-1.5 block text-sm leading-6 text-muted">
                  {item.description}
                </span>
              </span>
              <span className="flex items-center gap-3 pt-0.5">
                {item.meta ? (
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:inline">
                    {item.meta}
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="text-accent transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}
