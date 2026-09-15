import EfficiencyLedger from "@/components/products/efficiency-ledger";
import RangePage from "@/components/products/range-page";
import Reveal from "@/components/motion/reveal";
import NumberedPanel from "@/components/ui/numbered-panel";
import SectionHeading from "@/components/ui/section-heading";
import { getRange } from "@/data/products/ranges";
import { buildMetadata } from "@/lib/seo";

const range = getRange("inverter-ac");

export const metadata = buildMetadata({ ...range.seo, path: range.path });

const whatMakesTheStar = [
  {
    title: "ISEER",
    body: "Indian Seasonal Energy Efficiency Ratio — cooling delivered per unit of electricity across a full Indian cooling season, as rated under the BEE star-labelling scheme. The 5-star split models are rated 5.65; the 3-star models 4.35.",
  },
  {
    title: "Electronic expansion valve",
    body: "The 5-star split models replace the fixed capillary restrictor with an EEV that modulates refrigerant flow with load — the single largest step in seasonal efficiency on the sheet.",
  },
  {
    title: "A second condenser row",
    body: "The 5-star split models carry a two-row 805 × 23.04 × 546 mm condenser coil in the 900 × 360 × 600 mm outdoor cabinet, against one row in the 3-star cabinets — more surface to reject heat at part load.",
  },
  {
    title: "DC indoor fan motors",
    body: "Every split model uses a DC indoor fan motor (35 W at 1,280 rpm on the 830 and 930 chassis; 57 W at 1,350 rpm on the 1100), so indoor airflow can be trimmed to the inverter's output.",
  },
];

export default function InverterAcPage() {
  return (
    <RangePage
      range={range}
      statsHeading={{
        title: "Every model,",
        accent: "inverter-driven.",
        lede: "All eight platforms on the sheet are R32 inverter units. What separates a 3-star from a 5-star is not the indoor chassis — it is the outdoor unit and its expansion device.",
      }}
      listProps={{ variant: "compact", groupBy: "stars", label: "Models by star rating" }}
      angle={
        <>
          <Reveal as="section" id="efficiency" ariaLabelledBy="efficiency-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <SectionHeading
                id="efficiency-heading"
                eyebrow="Where the star is engineered"
                title="3-star and 5-star,"
                accent="side by side."
                lede="The same capacity, the same indoor chassis — and a different outdoor unit. Read the sheet values across each row."
                className="mb-10"
              />
              <div data-reveal="">
                <EfficiencyLedger />
              </div>
            </div>
          </Reveal>

          <Reveal as="section" ariaLabelledBy="star-heading" className="border-b border-border">
            <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionHeading
                  id="star-heading"
                  eyebrow="Reading the sheet"
                  title="What makes"
                  accent="the star."
                  lede="Four terms that explain the efficiency figures on every Ezentech sheet — written so a sourcing team can quote them directly."
                />
              </div>
              <div data-reveal="">
                <NumberedPanel label="What makes the star" unit="terms" items={whatMakesTheStar} />
              </div>
            </div>
          </Reveal>
        </>
      }
    />
  );
}
