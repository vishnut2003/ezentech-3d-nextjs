import Reveal from "@/components/motion/reveal";
import ChassisLedger from "@/components/products/chassis-ledger";
import ServicePage from "@/components/services/service-page";
import SectionHeading from "@/components/ui/section-heading";
import { getService } from "@/data/services/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("injection-moulding");

export const metadata = buildMetadata({ ...service.seo, path: service.path });

export default function InjectionMouldingPage() {
  return (
    <ServicePage
      service={service}
      slots={{
        afterIntro: (
          <Reveal as="section" id="chassis" ariaLabelledBy="chassis-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <SectionHeading
                id="chassis-heading"
                eyebrow="From the sheet"
                title="The chassis"
                accent="every fascia fits."
                lede="Indoor platforms as printed — the widths a brand's fascia is tooled to, with the coil and airflow behind each."
                className="mb-10"
              />
              <div data-reveal="">
                <ChassisLedger variant="idu" caption="Indoor platforms the fascias fit" />
              </div>
            </div>
          </Reveal>
        ),
      }}
    />
  );
}
