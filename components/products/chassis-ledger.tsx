import Link from "next/link";
import LedgerTable, { type LedgerRow } from "@/components/ui/ledger-table";
import { iduPlatforms, oduCabinets, splitModels } from "@/data/products/derived";
import type { SpecModel } from "@/data/products/specs";
import { specAnchor } from "@/lib/links";

function ModelPills({ models }: { models: SpecModel[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Models">
      {models.map((m) => (
        <li key={m.slug}>
          <Link
            href={specAnchor(m.slug)}
            title={m.name}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-[11px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {m.capacityClass}
            <span aria-hidden="true" className="text-border">
              |
            </span>
            {m.stars}★
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Sheet-derived chassis and cabinet ledgers.
 * - `idu`: indoor platforms by chassis (dimensions, coil, airflow, motor)
 * - `odu`: outdoor cabinets by size (rows, coil, expansion)
 * - `platform`: which capacities share one chassis
 */
export default function ChassisLedger({
  variant,
  id,
  caption,
}: {
  variant: "idu" | "odu" | "platform";
  id?: string;
  caption?: string;
}) {
  if (variant === "odu") {
    const rows: LedgerRow[] = oduCabinets().map((c) => ({
      id: c.unitDims,
      label: `${c.unitDims} mm`,
      sub: "W × H × D",
      cells: {
        rows: `${c.rows}-row condenser`,
        coil: `${c.coil} mm`,
        expansion: c.expansion.join(" / "),
        models: <ModelPills models={c.models} />,
      },
    }));
    return (
      <LedgerTable
        id={id}
        caption={caption ?? "Outdoor cabinets on the sheet"}
        unit="cabinets"
        columns={[
          { key: "rows", label: "Condenser" },
          { key: "coil", label: "Coil L × H" },
          { key: "expansion", label: "Expansion" },
          { key: "models", label: "Models" },
        ]}
        rows={rows}
      />
    );
  }

  if (variant === "platform") {
    const rows: LedgerRow[] = iduPlatforms(splitModels()).map((p) => ({
      id: p.chassis,
      label: `${p.chassis} chassis`,
      sub: `${p.unitDims} mm`,
      cells: {
        capacities: p.models.map((m) => m.capacityClass).join(" + "),
        stars: Array.from(new Set(p.models.map((m) => `${m.stars}-star`))).join(" / "),
        share:
          p.models.length > 1
            ? `${p.models.length} models share this chassis`
            : "One model today",
        models: <ModelPills models={p.models} />,
      },
    }));
    return (
      <LedgerTable
        id={id}
        caption={caption ?? "One chassis, several capacities"}
        unit="platforms"
        columns={[
          { key: "capacities", label: "Capacities" },
          { key: "stars", label: "Rating" },
          { key: "share", label: "Sharing" },
          { key: "models", label: "Models" },
        ]}
        rows={rows}
      />
    );
  }

  const rows: LedgerRow[] = iduPlatforms().map((p) => ({
    id: p.chassis,
    label: p.chassis === "Window" ? "Window cabinet" : `${p.chassis} chassis`,
    sub: `${p.unitDims} mm`,
    cells: {
      coil: `${p.evapCoil} mm`,
      airflow: `${p.airflow} m³/h`,
      motor: p.fanMotor,
      models: <ModelPills models={p.models} />,
    },
  }));
  return (
    <LedgerTable
      id={id}
      caption={caption ?? "Indoor platforms on the sheet"}
      unit="platforms"
      columns={[
        { key: "coil", label: "Evaporator coil" },
        { key: "airflow", label: "Air flow" },
        { key: "motor", label: "Fan motor" },
        { key: "models", label: "Models" },
      ]}
      rows={rows}
    />
  );
}
