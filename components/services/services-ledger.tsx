import LinkLedger from "@/components/ui/link-ledger";
import { services } from "@/data/services/services";

const kindLabel = { service: "Service", component: "In-house", capability: "Capability" };

/** All seven capability pages as a numbered ledger. */
export default function ServicesLedger({ id }: { id?: string }) {
  return (
    <LinkLedger
      id={id}
      label="Every capability"
      unit="pages"
      items={services.map((s) => ({
        href: s.path,
        title: s.title,
        description: s.short,
        meta: kindLabel[s.kind],
      }))}
    />
  );
}
