import LinkLedger from "@/components/ui/link-ledger";
import { productRanges, rangeModels } from "@/data/products/ranges";
import { specModels } from "@/data/products/specs";
import { SPECS_PATH } from "@/lib/structured-data/technical-specifications";

/** The five ways into the product range, as a numbered ledger. */
export default function RangeNav({ id }: { id?: string }) {
  return (
    <LinkLedger
      id={id}
      label="Browse the range"
      unit="pages"
      items={[
        ...productRanges.map((r) => ({
          href: r.path,
          title: r.title,
          description: r.short,
          meta: `${rangeModels(r).length} models`,
        })),
        {
          href: SPECS_PATH,
          title: "Technical Specifications",
          description:
            "Every parameter from the manufacturer specification sheets, filterable by type and rating.",
          meta: `${specModels.length} sheets`,
        },
      ]}
    />
  );
}
