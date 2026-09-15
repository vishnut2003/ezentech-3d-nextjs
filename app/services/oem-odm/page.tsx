import Reveal from "@/components/motion/reveal";
import ChassisLedger from "@/components/products/chassis-ledger";
import EngagementModelsLedger from "@/components/services/engagement-models-ledger";
import ServicePage from "@/components/services/service-page";
import SectionHeading from "@/components/ui/section-heading";
import { getService } from "@/data/services/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("oem-odm");

export const metadata = buildMetadata({ ...service.seo, path: service.path });

export default function OemOdmPage() {
  return (
    <ServicePage
      service={service}
      slots={{
        afterIntro: (
          <Reveal as="section" id="engagement-models" ariaLabelledBy="engagement-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <SectionHeading
                id="engagement-heading"
                eyebrow="Compare"
                title="Four models,"
                accent="eight dimensions."
                lede="Who owns the design, the tooling and the badge — and what stays the same regardless: the plants, the components and the lab."
                className="mb-10"
              />
              <div data-reveal="">
                <EngagementModelsLedger />
              </div>
            </div>
          </Reveal>
        ),
        afterProcess: (
          <Reveal as="section" id="platforms" ariaLabelledBy="platforms-heading" className="border-b border-border">
            <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionHeading
                  id="platforms-heading"
                  eyebrow="Platforms available today"
                  title="Start from"
                  accent="a proven chassis."
                  lede="For ODM and private-label programmes, these are the indoor platforms on the sheet — and which capacities each already carries."
                />
              </div>
              <div data-reveal="">
                <ChassisLedger variant="platform" caption="Split platforms on the sheet" />
              </div>
            </div>
          </Reveal>
        ),
      }}
    />
  );
}
