export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  seeAlso?: string;
}

/** The terms on an Ezentech specification sheet, defined so they can be cited verbatim. */
export const glossary: GlossaryTerm[] = [
  {
    id: "iseer",
    term: "ISEER",
    definition:
      "Indian Seasonal Energy Efficiency Ratio — cooling delivered per unit of electricity over a full Indian cooling season, as rated under the BEE star-labelling scheme. Higher is more efficient.",
    seeAlso: "/insights/what-iseer-means",
  },
  {
    id: "eer",
    term: "EER",
    definition:
      "Energy Efficiency Ratio — cooling capacity divided by power input at a single rating condition, unlike ISEER which is weighted across a season.",
  },
  {
    id: "tr",
    term: "TR (ton of refrigeration)",
    definition:
      "An industry capacity class: 1.0 TR corresponds to roughly 3.5 kW of cooling. Ezentech's sheet spans 1.0 TR (12K) to 2.0 TR (22K) classes.",
  },
  {
    id: "btu",
    term: "BTU/h and the K rating",
    definition:
      "Cooling capacity in British thermal units per hour; '18K' means a nominal 18,000 BTU/h class. The sheet lists the rated capacity in watts.",
  },
  {
    id: "r32",
    term: "R32",
    definition:
      "The refrigerant across the Ezentech range — lower global-warming potential than R410A and higher volumetric capacity, so charge sizes are smaller.",
    seeAlso: "/insights/r32-vs-r410a",
  },
  {
    id: "gwp",
    term: "GWP",
    definition:
      "Global-warming potential — a refrigerant's warming effect relative to carbon dioxide over a set period. Lower is better; R32 is lower than R410A.",
  },
  {
    id: "psychrometric",
    term: "Psychrometric test",
    definition:
      "A performance test in conditioned rooms held at set temperature and humidity, measuring cooling capacity, power input, ISEER and airflow. Ezentech's lab is NABL-accredited.",
    seeAlso: "/insights/nabl-psychrometric-testing-explained",
  },
  {
    id: "idu-odu",
    term: "IDU / ODU",
    definition:
      "Indoor unit (evaporator coil, fan, fascia) and outdoor unit (compressor, condenser coil, expansion device). Window models combine both in one cabinet.",
    seeAlso: "/products/idu-odu",
  },
  {
    id: "chassis",
    term: "Chassis",
    definition:
      'The indoor platform a model is built on, written as width in mm and coil size in inches — for example 930-20". One chassis can carry several capacities.',
  },
  {
    id: "eev",
    term: "EEV vs capillary",
    definition:
      "The expansion device between condenser and evaporator. A capillary tube is a fixed restrictor; an electronic expansion valve (EEV) modulates flow with load — how the 5-star models reach ISEER 5.65.",
  },
];
