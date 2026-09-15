import Reveal from "@/components/motion/reveal";
import CoilStage from "@/components/services/coil-stage";
import ServicePage from "@/components/services/service-page";
import SectionHeading from "@/components/ui/section-heading";
import SheetFactsPanel from "@/components/ui/sheet-facts-panel";
import { getService } from "@/data/services/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("heat-exchanger-coils");

export const metadata = buildMetadata({ ...service.seo, path: service.path });

export default function HeatExchangerCoilsPage() {
  const facts = service.facts!;
  return (
    <ServicePage
      service={service}
      slots={{
        factsRendered: true,
        afterIntro: (
          <Reveal as="section" id={facts.id} ariaLabelledBy="geometry-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <SectionHeading
                id="geometry-heading"
                eyebrow="Coil geometry"
                title="Fin, tube, rows —"
                accent="as printed on the sheet."
                lede="The evaporator and condenser geometry behind every model, beside the coil itself."
                className="mb-10"
              />
              <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
                <div data-reveal="" className="order-first lg:order-last lg:sticky lg:top-32 lg:self-start">
                  <CoilStage />
                </div>
                <div data-reveal="">
                  <SheetFactsPanel caption={facts.caption} groups={facts.groups} note={facts.note} />
                </div>
              </div>
            </div>
          </Reveal>
        ),
      }}
    />
  );
}
