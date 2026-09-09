import type { SpecGroup } from "@/data/products/specs";

/**
 * Semantic grouped parameter table: one <tbody> per group with a
 * row-group header, row headers on the parameter names, mono values.
 * Two columns fit a 360px viewport, so no horizontal scroll is needed.
 */
export default function SpecTable({
  caption,
  groups,
}: {
  caption: string;
  groups: SpecGroup[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <table className="w-full border-collapse text-sm">
        <caption className="border-b border-border px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {caption}
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.id}>
            <tr>
              <th
                scope="rowgroup"
                colSpan={2}
                className="bg-accent px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
              >
                {group.label}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-border first:border-t-0 even:bg-surface/60"
              >
                <th
                  scope="row"
                  className="w-1/2 px-4 py-2.5 text-left font-medium text-foreground"
                >
                  {row.label}
                </th>
                <td className="px-4 py-2.5 font-mono text-[13px] text-muted">
                  {row.value}
                  {row.unit && row.value !== "NA" ? (
                    <span className="ml-1 text-muted/70">{row.unit}</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
