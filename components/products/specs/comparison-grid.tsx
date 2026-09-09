import { glanceRows, specModels } from "@/data/products/specs";

/**
 * At-a-glance grid: one column per model, one row per headline parameter.
 * Column cells carry data-type / data-stars so the selector's CSS filter
 * narrows the grid alongside the detail articles.
 */
export default function ComparisonGrid() {
  return (
    <div
      data-reveal
      className="overflow-x-auto rounded-2xl border border-border bg-background"
    >
      <table className="w-full min-w-[64rem] border-collapse text-sm">
        <caption className="sr-only">
          Headline specifications for all Ezentech inverter AC models, side by side
        </caption>
        <thead>
          <tr className="bg-surface">
            <th
              scope="col"
              className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Parameter
            </th>
            {specModels.map((m) => (
              <th
                key={m.slug}
                scope="col"
                data-type={m.type}
                data-stars={m.stars}
                className="px-3 py-3 text-left align-bottom"
              >
                <a
                  href={`#${m.slug}`}
                  className="block font-mono text-[12px] font-semibold leading-snug text-foreground transition-colors hover:text-accent"
                >
                  {m.sheetName}
                </a>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {m.tonnageTr.toFixed(1)} TR class
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {glanceRows.map((row) => (
            <tr key={row.key} className="border-t border-border">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-background px-4 py-2.5 text-left font-medium text-foreground"
              >
                {row.label}
                {row.unit ? (
                  <span className="ml-1 font-normal text-muted/70">({row.unit})</span>
                ) : null}
              </th>
              {specModels.map((m) => (
                <td
                  key={m.slug}
                  data-type={m.type}
                  data-stars={m.stars}
                  className="px-3 py-2.5 font-mono text-[13px] text-muted"
                >
                  {row.pick(m)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
