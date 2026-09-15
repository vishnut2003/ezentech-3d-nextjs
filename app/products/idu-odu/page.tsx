import ChassisLedger from "@/components/products/chassis-ledger";
import RangePage from "@/components/products/range-page";
import Reveal from "@/components/motion/reveal";
import SectionHeading from "@/components/ui/section-heading";
import { iduPlatforms, kwSpan, oduCabinets, splitModels } from "@/data/products/derived";
import { getRange } from "@/data/products/ranges";
import { buildMetadata } from "@/lib/seo";

const range = getRange("idu-odu");

export const metadata = buildMetadata({ ...range.seo, path: range.path });

export default function IduOduPage() {
  const stats = [
    { value: String(iduPlatforms(splitModels()).length), label: "Indoor chassis platforms (split)" },
    { value: String(oduCabinets().length), label: "Outdoor cabinet sizes" },
    { value: kwSpan(), label: "Cooling capacity across the pairs" },
    { value: "R32", label: "Refrigerant, every pair" },
  ];

  return (
    <RangePage
      range={range}
      stats={stats}
      statsHeading={{
        title: "Indoor platform,",
        accent: "outdoor cabinet, matched.",
        lede: "Every split model on the sheet is specified as an indoor and outdoor pair with its coil, airflow, line set and installation kit. Brand partners choose the platform; the pairing is already engineered.",
      }}
      listProps={{ variant: "compact", thumbnails: "all", label: "Matched pairs on the sheet" }}
      angle={
        <>
          <Reveal as="section" id="idu" ariaLabelledBy="idu-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <SectionHeading
                id="idu-heading"
                eyebrow="Indoor units"
                title="Four split chassis"
                accent="and the window cabinet."
                lede="The indoor platform sets the fascia width, the evaporator coil and the airflow. Two of the split chassis already carry two capacities each."
                className="mb-10"
              />
              <div data-reveal="">
                <ChassisLedger variant="idu" />
              </div>
            </div>
          </Reveal>

          <Reveal as="section" id="odu" ariaLabelledBy="odu-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <SectionHeading
                id="odu-heading"
                eyebrow="Outdoor units"
                title="Three cabinets,"
                accent="one or two condenser rows."
                lede="The outdoor cabinet is where the star rating is engineered: the largest cabinet carries the two-row condenser and, on the 5-star models, the electronic expansion valve."
                className="mb-10"
              />
              <div data-reveal="">
                <ChassisLedger variant="odu" />
              </div>
            </div>
          </Reveal>
        </>
      }
    />
  );
}
