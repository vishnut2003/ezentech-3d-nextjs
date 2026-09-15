import Reveal from "@/components/motion/reveal";
import LinkLedger from "@/components/ui/link-ledger";
import SectionHeading from "@/components/ui/section-heading";
import { getRange } from "@/data/products/ranges";
import { getService } from "@/data/services/services";
import type { ServiceEntry } from "@/data/services/types";

/** "Where it goes" (ranges) and "Works with" (services) as two ledgers. */
export default function RelatedLedger({ service }: { service: ServiceEntry }) {
  return (
    <Reveal as="section" id="related" ariaLabelledBy="related-heading" className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <SectionHeading
          id="related-heading"
          eyebrow="Connected"
          title="Where it goes,"
          accent="and what it works with."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div data-reveal="">
            <LinkLedger
              label="Where it goes"
              unit="ranges"
              items={service.relatedRanges.map((slug) => {
                const r = getRange(slug);
                return { href: r.path, title: r.title, description: r.short };
              })}
            />
          </div>
          <div data-reveal="">
            <LinkLedger
              label="Works with"
              unit="capabilities"
              items={service.relatedServices.map((slug) => {
                const s = getService(slug);
                return {
                  href: s.path,
                  title: s.title,
                  description: s.short,
                  meta: s.inHouse ? "In-house" : undefined,
                };
              })}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
