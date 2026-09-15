import Reveal from "@/components/motion/reveal";
import ChassisLedger from "@/components/products/chassis-ledger";
import ServicePage from "@/components/services/service-page";
import SectionHeading from "@/components/ui/section-heading";
import { getService } from "@/data/services/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("sheet-metal");

export const metadata = buildMetadata({ ...service.seo, path: service.path });

export default function SheetMetalPage() {
  return (
    <ServicePage
      service={service}
      slots={{
        afterIntro: (
          <Reveal as="section" id="cabinets" ariaLabelledBy="cabinets-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <SectionHeading
                id="cabinets-heading"
                eyebrow="From the sheet"
                title="Three outdoor cabinets,"
                accent="every dimension held by our tooling."
                lede="Cabinet sizes as printed on the specification sheet, with the condenser coil and models each one carries."
                className="mb-10"
              />
              <div data-reveal="">
                <ChassisLedger variant="odu" />
              </div>
            </div>
          </Reveal>
        ),
      }}
    />
  );
}
