import Link from "next/link";
import LedgerTable, { type LedgerRow } from "@/components/ui/ledger-table";
import { efficiencyPairs } from "@/data/products/derived";
import type { SpecModel } from "@/data/products/specs";
import { specAnchor } from "@/lib/links";

function Cell({ model }: { model?: SpecModel }) {
  if (!model) return <span className="text-muted/50">—</span>;
  const s = model.sheet;
  const rows = [
    ["ISEER", s.general.iseer.toFixed(2)],
    ["Condenser", `${s.condenser.rows}-row · ${s.condenser.coilDims} mm`],
    ["Expansion", s.condenser.expansionType],
    ["Outdoor cabinet", `${s.condenser.unitDims} mm`],
    ["Indoor chassis", s.general.chassis],
  ];
  return (
    <div>
      <Link
        href={specAnchor(model.slug)}
        className="font-semibold text-foreground transition-colors hover:text-accent"
      >
        {model.name}
      </Link>
      <dl className="mt-2 space-y-1 text-[13px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="w-28 shrink-0 text-muted">{k}</dt>
            <dd className="font-mono text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** 3-star beside 5-star at each capacity — the star is engineered outdoors. */
export default function EfficiencyLedger({ id }: { id?: string }) {
  const rows: LedgerRow[] = efficiencyPairs().map((p) => ({
    id: p.label,
    label: p.label,
    sub: p.note,
    cells: { three: <Cell model={p.three} />, five: <Cell model={p.five} /> },
  }));
  return (
    <LedgerTable
      id={id}
      caption="3-star and 5-star, side by side"
      unit="pairs"
      columns={[
        { key: "three", label: "3-Star" },
        { key: "five", label: "5-Star" },
      ]}
      rows={rows}
    />
  );
}
