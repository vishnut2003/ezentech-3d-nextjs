import RangePage from "@/components/products/range-page";
import Reveal from "@/components/motion/reveal";
import SectionHeading from "@/components/ui/section-heading";
import SheetFactsPanel from "@/components/ui/sheet-facts-panel";
import { windowCabinetGroups } from "@/data/products/derived";
import { getRange } from "@/data/products/ranges";
import { buildMetadata } from "@/lib/seo";

const range = getRange("window-ac");

export const metadata = buildMetadata({ ...range.seo, path: range.path });

export default function WindowAcPage() {
  return (
    <RangePage
      range={range}
      statsHeading={{
        title: "Two models.",
        accent: "One cabinet.",
        lede: "Both window models share the 660 × 690 × 428 mm cabinet, the same evaporator and condenser coil sizes and a capillary expansion, and differ in capacity, fan motor and rated ISEER.",
      }}
      angle={
        <Reveal as="section" id="cabinet" ariaLabelledBy="cabinet-heading" className="border-b border-border">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                id="cabinet-heading"
                eyebrow="The cabinet"
                title="Both coils,"
                accent="one box."
                lede="A window unit carries evaporator, condenser, compressor and fan in a single cabinet. The sheet values below are shared by both models unless listed by model."
              />
            </div>
            <div data-reveal="">
              <SheetFactsPanel
                caption="Window cabinet — as printed"
                groups={windowCabinetGroups()}
              />
            </div>
          </div>
        </Reveal>
      }
    />
  );
}
