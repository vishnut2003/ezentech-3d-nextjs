export interface JourneyStage {
  id: string;
  title: string;
  summary: string;
  proof: string[];
  /** Not published — dates are unverified. */
  year?: string;
}

/** The journey told by what came in-house, not by the calendar. */
export const journeyStages: JourneyStage[] = [
  {
    id: "foundation",
    title: "Foundation — building for other brands",
    summary:
      "Ezentech began as a manufacturer of air conditioners for the brands that sell them. The discipline of OEM supply — build to print, ship to schedule — is the company's first layer.",
    proof: ["OEM manufacturing", "20+ years"],
  },
  {
    id: "integration",
    title: "Integration — steel and coil in-house",
    summary:
      "Sheet-metal fabrication and heat-exchanger coil manufacturing came under the same roof, putting the cabinet and the coil — the two parts that set capacity — in Ezentech's own control.",
    proof: ["Sheet metal", "Heat-exchanger coils"],
  },
  {
    id: "completion",
    title: "Completion — plastics, copper and tooling",
    summary:
      "Injection moulding, copper tubing and the tool and die room closed the loop: fascias, line sets and the tools that make every other part, all in-house.",
    proof: ["Injection moulding", "Copper tubing", "Tool room"],
  },
  {
    id: "scale",
    title: "Scale — four plants, one million units",
    summary:
      "The plant network grew to four sites with one-million-unit annual capacity — enough for a brand partner to commit a season to one supplier.",
    proof: ["4 plants", "1M units / year"],
  },
  {
    id: "assurance",
    title: "Assurance — the lab and the certificates",
    summary:
      "An NABL-accredited psychrometric laboratory, ISO 9001 and ISO 14001 systems, BIS-certified ranges and LG's \"Role Model Supplier\" recognition made the quality file complete.",
    proof: ["NABL lab", "ISO 9001", "ISO 14001", "BIS", "LG recognition"],
  },
  {
    id: "today",
    title: "Today — an R32 inverter platform range",
    summary:
      "Eight inverter platforms on the sheet — six split models from 12K to 22K and two window models — all on R32, with 3-star and 5-star variants sharing chassis.",
    proof: ["8 platforms", "R32", "ISEER to 5.65"],
  },
];
