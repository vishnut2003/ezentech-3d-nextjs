export interface Plant {
  id: string;
  name: string;
  /** Unverified today — populate when the client confirms, and the capability map can render. */
  location?: string;
  focus?: string;
  coordinates?: [lat: number, lng: number];
}

/** Four plants are verified; cities and per-plant roles are not, so they stay undefined. */
export const plants: Plant[] = [
  { id: "plant-1", name: "Plant 1" },
  { id: "plant-2", name: "Plant 2" },
  { id: "plant-3", name: "Plant 3" },
  { id: "plant-4", name: "Plant 4" },
];

export const PLANT_COUNT = plants.length;
export const ANNUAL_CAPACITY = "1M";

export const capabilityLines = [
  {
    id: "sheet-metal",
    title: "Sheet-metal fabrication",
    body: "Outdoor cabinets in three sizes, indoor wall plates and chassis members, base pans and installation hardware — blanked, punched, bent and finished in-house.",
    tags: ["Cabinets", "Chassis", "Panels"],
    href: "/services/sheet-metal",
  },
  {
    id: "coils",
    title: "Heat-exchanger coils",
    body: "Two-row slit-fin evaporators on 7 mm tube and one- or two-row condensers on 5 mm tube — fin pressing, hairpin lacing, expansion, brazing and leak test.",
    tags: ["Fin & tube", "Evaporator", "Condenser"],
    href: "/services/heat-exchanger-coils",
  },
  {
    id: "moulding",
    title: "Plastic injection moulding",
    body: "Fascias, louvres, grilles, outlets and display bezels for the 830, 930 and 1100 mm chassis and the window front, from moulds cut in the in-house tool room.",
    tags: ["Fascias", "Louvres", "Grilles"],
    href: "/services/injection-moulding",
  },
  {
    id: "copper",
    title: "Copper tubing & tooling",
    body: "Coil tube, hairpins and refrigerant line sets on one side; press tools, moulds, jigs and fixtures on the other.",
    tags: ["Line sets", "Tool room"],
    href: "/services/copper-tubing",
  },
  {
    id: "assembly",
    title: "Assembly, charging & psychrometric test",
    body: "Units assembled, R32-charged, leak-tested and run through the NABL-accredited psychrometric lab before packing with their installation kit.",
    tags: ["R32", "NABL lab", "Final test"],
    href: "/services/testing",
  },
];
