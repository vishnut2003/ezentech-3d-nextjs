import { PanelHeader, PanelShell } from "./panel";

export interface LedgerColumn {
  key: string;
  label: string;
}

export interface LedgerRow {
  id: string;
  label: React.ReactNode;
  /** Small mono line under the label. */
  sub?: React.ReactNode;
  cells: Record<string, React.ReactNode>;
}

/**
 * Multi-column engineered table. A real <table> from `lg` up; below that
 * each row stacks into a definition list so wide ledgers never force a
 * horizontal scroll on phones.
 *
 * `stackLayout` controls the stacked (below-lg) cell layout: "grid" puts the
 * column label beside the value (short cells); "block" puts it above the
 * value at full width — use it when cells hold rich content (nested lists,
 * long mono strings) that would be crushed in a ~120px column on phones.
 */
export default function LedgerTable({
  caption,
  count,
  unit,
  columns,
  rows,
  numbered = true,
  stackLayout = "grid",
  id,
  className,
}: {
  caption: string;
  count?: number;
  unit?: string;
  columns: LedgerColumn[];
  rows: LedgerRow[];
  numbered?: boolean;
  stackLayout?: "grid" | "block";
  id?: string;
  className?: string;
}) {
  return (
    <PanelShell id={id} className={className}>
      <PanelHeader label={caption} count={count ?? rows.length} unit={unit ?? "rows"} />

      {/* Desktop: table */}
      <table className="hidden w-full border-collapse text-sm lg:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"
            >
              <span className="sr-only">Row</span>
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className="border-t border-border align-top transition-colors first:border-t-0 even:bg-surface/60 hover:bg-surface/70"
            >
              <th scope="row" className="px-5 py-4 text-left">
                <span className="flex items-start gap-3">
                  {numbered ? (
                    <span
                      aria-hidden="true"
                      className="pt-0.5 font-mono text-[12px] font-medium tracking-wider text-accent/70"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  ) : null}
                  <span>
                    <span className="block font-semibold text-foreground">{row.label}</span>
                    {row.sub ? (
                      <span className="mt-1 block font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">
                        {row.sub}
                      </span>
                    ) : null}
                  </span>
                </span>
              </th>
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-4 leading-6 text-muted">
                  {row.cells[col.key] ?? <span className="text-muted/50">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phone / tablet: stacked rows */}
      <div className="lg:hidden">
        {rows.map((row, i) => (
          <div key={row.id} className="border-t border-border px-5 py-4 first:border-t-0">
            <p className="flex items-start gap-3">
              {numbered ? (
                <span
                  aria-hidden="true"
                  className="pt-0.5 font-mono text-[12px] font-medium tracking-wider text-accent/70"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
              <span>
                <span className="block text-[15px] font-semibold tracking-tight text-foreground">
                  {row.label}
                </span>
                {row.sub ? (
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {row.sub}
                  </span>
                ) : null}
              </span>
            </p>
            <dl className={stackLayout === "block" ? "mt-3 space-y-4" : "mt-3 space-y-2"}>
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={
                    stackLayout === "block"
                      ? "text-sm"
                      : "grid grid-cols-[6rem_minmax(0,1fr)] gap-3 text-sm sm:grid-cols-[7.5rem_minmax(0,1fr)]"
                  }
                >
                  <dt
                    className={`text-[11px] font-semibold uppercase tracking-[0.14em] text-muted ${
                      stackLayout === "block" ? "mb-1.5" : "pt-0.5"
                    }`}
                  >
                    {col.label}
                  </dt>
                  <dd className="min-w-0 leading-6 wrap-anywhere text-muted">
                    {row.cells[col.key] ?? <span className="text-muted/50">—</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
