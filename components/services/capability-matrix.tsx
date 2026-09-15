import Link from "next/link";
import FeatureRail from "@/components/ui/feature-rail";
import LedgerTable, { type LedgerRow } from "@/components/ui/ledger-table";
import { services } from "@/data/services/services";
import type { UnitFeed } from "@/data/services/types";

const feedLabel: Record<UnitFeed, { label: string; href: string }> = {
  idu: { label: "IDU", href: "/products/idu-odu" },
  odu: { label: "ODU", href: "/products/idu-odu" },
  window: { label: "Window", href: "/products/window-ac" },
};

/** Services × in-house / feeds / sheet fact — the capability map as a ledger. */
export default function CapabilityMatrix({ id }: { id?: string }) {
  const rows: LedgerRow[] = services
    .filter((s) => s.slug !== "oem-odm")
    .map((s) => ({
      id: s.slug,
      label: (
        <Link href={s.path} className="transition-colors hover:text-accent">
          {s.title}
        </Link>
      ),
      sub: s.kind === "component" ? "In-house component" : "Capability",
      cells: {
        inhouse: s.inHouse ? (
          <span className="inline-flex items-center gap-2 text-foreground">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
            In-house
          </span>
        ) : (
          "Partner"
        ),
        feeds: (
          <FeatureRail
            label={`${s.title} feeds`}
            items={s.feeds.map((f) => feedLabel[f])}
          />
        ),
        fact: s.matrixFact,
        link: (
          <Link
            href={s.path}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-80"
          >
            Open
            <span aria-hidden="true">→</span>
          </Link>
        ),
      },
    }));

  return (
    <LedgerTable
      id={id}
      caption="Capability matrix"
      unit="capabilities"
      columns={[
        { key: "inhouse", label: "Where" },
        { key: "feeds", label: "Goes into" },
        { key: "fact", label: "From the sheet" },
        { key: "link", label: "Page" },
      ]}
      rows={rows}
    />
  );
}
