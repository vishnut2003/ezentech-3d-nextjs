import Link from "next/link";
import type { SpecGroup } from "@/data/products/specs";
import { SPECS_PATH } from "@/lib/structured-data/technical-specifications";
import SpecTable from "./spec-table";

/** Sheet-verified parameter table plus its provenance line. */
export default function SheetFactsPanel({
  id,
  caption,
  groups,
  note,
  className = "",
}: {
  id?: string;
  caption: string;
  groups: SpecGroup[];
  note?: string;
  className?: string;
}) {
  return (
    <div id={id} className={`scroll-mt-28 ${className}`}>
      <SpecTable caption={caption} groups={groups} />
      <p className="mt-3 text-[12px] leading-5 text-muted">
        {note ?? "Values as printed on the manufacturer specification sheet."}{" "}
        <Link
          href={SPECS_PATH}
          className="text-accent underline-offset-4 transition-colors hover:underline"
        >
          See every model
        </Link>
        .
      </p>
    </div>
  );
}
