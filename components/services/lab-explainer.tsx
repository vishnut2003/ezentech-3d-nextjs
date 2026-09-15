import Reveal from "@/components/motion/reveal";
import NumberedPanel from "@/components/ui/numbered-panel";
import SectionHeading from "@/components/ui/section-heading";
import SheetFactsPanel from "@/components/ui/sheet-facts-panel";
import { iseerByStarGroups } from "@/data/products/derived";

const measures = [
  {
    title: "Cooling capacity",
    body: "The heat removed from the indoor air per hour, in watts — 3,400 to 6,300 W across the sheet — measured with indoor and outdoor rooms held at controlled temperature and humidity.",
  },
  {
    title: "Power input",
    body: "The electrical power the unit draws while delivering that capacity; with capacity it gives the efficiency ratio.",
  },
  {
    title: "ISEER",
    body: "Indian Seasonal Energy Efficiency Ratio — cooling delivered per unit of electricity over a full Indian cooling season, as rated under the BEE star-labelling scheme. Higher is more efficient.",
  },
  {
    title: "Airflow",
    body: "The indoor air volume delivered, in m³/h — 850 to 1,100 m³/h on the sheet — set by the fan, the coil's resistance and the fascia's intake and outlet.",
  },
  {
    title: "Sensible and latent split",
    body: "With humidity controlled, the test separates dry-bulb cooling from dehumidification — the difference between a room that feels cool and one that feels dry.",
  },
];

/** What the psychrometric lab measures, beside the ISEER values it produced. */
export default function LabExplainer() {
  return (
    <Reveal as="section" id="lab" ariaLabelledBy="lab-heading" className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <SectionHeading
          id="lab-heading"
          eyebrow="Inside the lab"
          title="What a psychrometric"
          accent="test measures."
          lede="A citable summary of the test behind the rated figures on every Ezentech specification sheet — and the ISEER values it produced."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal="">
            <NumberedPanel label="Measured parameters" unit="parameters" items={measures} />
          </div>
          <div data-reveal="" className="lg:sticky lg:top-32 lg:self-start">
            <SheetFactsPanel caption="Rated ISEER on the sheet" groups={iseerByStarGroups()} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
