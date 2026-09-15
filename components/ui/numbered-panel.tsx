import { PanelHeader, PanelIndex, PanelShell, panelRowClass } from "./panel";

export interface NumberedItem {
  title: React.ReactNode;
  body: React.ReactNode;
  /** Optional trailing row content — pills, a mono tag, a link. */
  meta?: React.ReactNode;
  id?: string;
}

/**
 * The numbered glossary / ledger panel from the spec page: header strip,
 * mono 01/02 indices, hover-tinted rows. `as="dl"` for term/definition
 * lists, `as="ol"` for ordered stages (renders real list semantics).
 */
export default function NumberedPanel({
  label,
  unit,
  items,
  as = "dl",
  id,
  className,
  revealRows,
}: {
  label: string;
  unit: string;
  items: NumberedItem[];
  as?: "dl" | "ol";
  id?: string;
  className?: string;
  /** Put `data-reveal` on each row instead of the shell. */
  revealRows?: boolean;
}) {
  const rowReveal = revealRows ? { "data-reveal": "" } : {};
  return (
    <PanelShell id={id} className={className}>
      <PanelHeader label={label} count={items.length} unit={unit} />
      {as === "ol" ? (
        <ol>
          {items.map((item, i) => (
            <li key={item.id ?? i} id={item.id} className={`${panelRowClass} scroll-mt-28`} {...rowReveal}>
              <PanelIndex n={i + 1} />
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <div className="mt-1.5 text-sm leading-6 text-muted">{item.body}</div>
                {item.meta ? <div className="mt-3">{item.meta}</div> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <dl>
          {items.map((item, i) => (
            <div key={item.id ?? i} id={item.id} className={`${panelRowClass} scroll-mt-28`} {...rowReveal}>
              <PanelIndex n={i + 1} />
              <div>
                <dt className="text-[15px] font-semibold tracking-tight text-foreground">
                  {item.title}
                </dt>
                <dd className="mt-1.5 text-sm leading-6 text-muted">{item.body}</dd>
                {item.meta ? <dd className="mt-3">{item.meta}</dd> : null}
              </div>
            </div>
          ))}
        </dl>
      )}
    </PanelShell>
  );
}
