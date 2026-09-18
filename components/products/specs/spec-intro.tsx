import Container from "@/components/ui/container";
import StatTiles from "@/components/ui/stat-tiles";
import { specModels } from "@/data/products/specs";

const terms = [
  {
    term: "ISEER",
    detail:
      "Indian Seasonal Energy Efficiency Ratio — cooling delivered per unit of electricity over a full Indian cooling season, as rated under the BEE star-labelling scheme. Higher is more efficient.",
  },
  {
    term: "Chassis",
    detail:
      'The indoor-unit platform a model is built on, written as width in mm and coil size in inches (for example 930-20"). Brand partners can share one chassis across several capacities.',
  },
  {
    term: "IDU / ODU",
    detail:
      "Indoor unit (evaporator, fan, fascia) and outdoor unit (compressor, condenser coil). Window models combine both in one cabinet.",
  },
  {
    term: "R32",
    detail:
      "The refrigerant used across the whole range — lower global-warming potential than R410A and higher volumetric capacity, so charge sizes are smaller.",
  },
  {
    term: "Capillary vs EEV",
    detail:
      "The expansion device between condenser and evaporator. Capillary tubes are simple fixed restrictors; an electronic expansion valve (EEV) modulates flow with load, which is how the 5-star models reach ISEER 5.65.",
  },
];

/**
 * Citable framing for the spec page: a plain-language summary of the
 * range, headline figures computed from the data, and a numbered glossary
 * an AI answer engine can lift verbatim.
 */
export default function SpecIntro() {
  const split = specModels.filter((m) => m.type === "split").length;
  const windowCount = specModels.length - split;
  const capacities = specModels.map((m) => m.sheet.general.coolingCapacityW);
  const iseer = specModels.map((m) => m.sheet.general.iseer);
  const airflow = specModels.map((m) => m.sheet.indoorUnit.airflowM3h);

  const stats = [
    {
      value: String(specModels.length),
      label: `Models on the sheet — ${split} split, ${windowCount} window`,
    },
    {
      value: `${(Math.min(...capacities) / 1000).toFixed(1)}–${(Math.max(...capacities) / 1000).toFixed(1)} kW`,
      label: "Cooling capacity span, 12K to 22K",
    },
    {
      value: Math.max(...iseer).toFixed(2),
      label: `Peak rated ISEER (range ${Math.min(...iseer).toFixed(2)}–${Math.max(...iseer).toFixed(2)})`,
    },
    {
      value: `${Math.min(...airflow)}–${Math.max(...airflow).toLocaleString("en-IN")}`,
      label: "Indoor air flow, m³/h",
    },
  ];

  return (
    <section
      aria-labelledby="spec-intro-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            The range
          </p>
          <h2
            id="spec-intro-heading"
            className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Eight inverter platforms.
            <br />
            <span className="text-accent">One refrigerant. Every parameter.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            Ezentech India manufactures {split} inverter split air-conditioner
            models (12K to 22K, 3-star and 5-star) and {windowCount} inverter
            window models (18K and 22K) for OEM and ODM partners. Every model
            runs on R32 refrigerant with a rotary compressor, slit-fin
            evaporator and DC or AC indoor fan motor, and ships with an
            installation kit.
          </p>

          <StatTiles items={stats} className="mt-8" />

          <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
            The tables below reproduce the manufacturer specification sheet
            for each model — cooling capacity, rated ISEER, compressor, fan
            motors, coil geometry, unit and packing dimensions, refrigerant
            pipe sizes. Need a variant that is not listed, a different fascia,
            or one chassis across several capacities? That is what the RFQ is
            for.
          </p>
        </div>

        {/* Glossary panel: one engineered card, numbered entries */}
        <div className="overflow-hidden rounded-3xl border border-border bg-background/80 shadow-[0_24px_80px_rgba(44,56,138,0.08)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
            <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              <span aria-hidden="true" className="h-px w-5 bg-accent" />
              Reading the sheets
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
              {String(terms.length).padStart(2, "0")} terms
            </p>
          </div>
          <dl>
            {terms.map((t, i) => (
              <div
                key={t.term}
                className="group grid grid-cols-[2.75rem_1fr] gap-4 border-t border-border px-6 py-5 transition-colors first:border-t-0 hover:bg-surface/70"
              >
                <span
                  aria-hidden="true"
                  className="pt-0.5 font-mono text-[12px] font-medium tracking-wider text-accent/70 transition-colors group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="text-[15px] font-semibold tracking-tight text-foreground">
                    {t.term}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-muted">
                    {t.detail}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
