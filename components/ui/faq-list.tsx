import type { FaqItem } from "@/lib/structured-data/common";
import { PanelHeader, PanelShell } from "./panel";

/**
 * Native <details> accordion in the panel shell — no JS, every answer in
 * the HTML for crawlers. The same `items` array feeds `faqLd()`.
 */
export default function FaqList({
  label,
  items,
  id,
  className,
}: {
  label: string;
  items: FaqItem[];
  id?: string;
  className?: string;
}) {
  return (
    <PanelShell id={id} className={className}>
      <PanelHeader label={label} count={items.length} unit="questions" />
      {items.map((item, i) => (
        <details key={item.q} className="group border-t border-border first:border-t-0">
          <summary className="flex cursor-pointer list-none items-start gap-4 px-6 py-5 transition-colors hover:bg-surface/70 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="pt-0.5 font-mono text-[12px] font-medium tracking-wider text-accent/70 transition-colors group-open:text-accent"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-[15px] font-semibold tracking-tight text-foreground">
              {item.q}
            </span>
            <span
              aria-hidden="true"
              className="text-lg leading-none text-accent transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="px-6 pb-5 text-sm leading-6 text-muted sm:pl-17">{item.a}</p>
        </details>
      ))}
    </PanelShell>
  );
}
