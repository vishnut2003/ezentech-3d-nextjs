import ChassisLedger from "@/components/products/chassis-ledger";
import RangePage from "@/components/products/range-page";
import Reveal from "@/components/motion/reveal";
import SectionHeading from "@/components/ui/section-heading";
import { getRange } from "@/data/products/ranges";
import { buildMetadata } from "@/lib/seo";

const range = getRange("split-ac");

export const metadata = buildMetadata({ ...range.seo, path: range.path });

export default function SplitAcPage() {
  return (
    <RangePage
      range={range}
      statsHeading={{
        title: "Six platforms.",
        accent: "Four chassis. One refrigerant.",
        lede: "Every split model runs R32 with a rotary compressor, a two-row slit-fin evaporator on 7 mm inner-grooved tube and a DC indoor fan motor, and ships with its installation kit.",
      }}
      angle={
        <Reveal as="section" id="platforms" ariaLabelledBy="platforms-heading" className="border-b border-border">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                id="platforms-heading"
                eyebrow="Platforms"
                title="One chassis,"
                accent="several capacities."
                lede='The indoor platform is written as width in mm and coil size in inches. Two of the four split chassis already carry more than one capacity — one fascia tool and one wall plate serving two models.'
              />
            </div>
            <div data-reveal="">
              <ChassisLedger variant="platform" />
            </div>
          </div>
        </Reveal>
      }
    />
  );
}
