import LinkLedger from "@/components/ui/link-ledger";
import { getService } from "@/data/services/services";
import type { ServiceSlug } from "@/data/services/types";

/** "Made in-house" ledger linking a product page to the capability pages behind it. */
export default function RelatedServices({
  slugs,
  label = "Made in-house, in every unit",
  id,
}: {
  slugs: ServiceSlug[];
  label?: string;
  id?: string;
}) {
  return (
    <LinkLedger
      id={id}
      label={label}
      unit="capabilities"
      items={slugs.map((slug) => {
        const s = getService(slug);
        return {
          href: s.path,
          title: s.title,
          description: s.short,
          meta: s.inHouse ? "In-house" : s.kind,
        };
      })}
    />
  );
}
