export interface LineStage {
  id: string;
  title: string;
  /** How the stage runs on Ezentech's lines — used on /about/manufacturing. */
  ezentechLine: string;
  /** The generic explanation — used on /insights/technical-knowledge. */
  explainer: string;
  /** What a buyer should check at this stage. */
  checkpoint: string;
  feeds: string[];
}

/** Production flow, coil stock to carton. Shared by two pages, rendered with different fields. */
export const lineStages: LineStage[] = [
  {
    id: "chassis",
    title: "Sheet-metal chassis and cabinet",
    ezentechLine:
      "Outdoor cabinet panels, base pans and indoor wall plates are blanked, punched and bent on Ezentech presses — three cabinet sizes, three indoor chassis widths, all held by in-house tooling.",
    explainer:
      "Every air conditioner starts as steel. The outdoor unit is a cabinet that carries the compressor and condenser coil; the indoor unit hangs from a pressed wall plate. Cabinet dimensions set what the coil and fan can be.",
    checkpoint: "Ask who owns the press tools — the answer tells you who controls the cabinet dimensions.",
    feeds: ["ODU cabinet", "IDU wall plate"],
  },
  {
    id: "coil",
    title: "Fin-and-tube coil fabrication",
    ezentechLine:
      "Aluminium fins are pressed with the slit pattern, inner-grooved copper hairpins are laced through the pack and expanded, return bends are brazed and every circuit is leak-tested — two-row evaporators, one- or two-row condensers.",
    explainer:
      "The heat-exchanger coil is where cooling happens: refrigerant flows inside copper tubes while air passes over aluminium fins. Rows, fin type, tube diameter and pitch set the capacity and the airflow resistance.",
    checkpoint: "Compare fin type, tube diameter and rows on the specification sheet, not just the capacity figure.",
    feeds: ["Evaporator", "Condenser"],
  },
  {
    id: "copper",
    title: "Copper tubing and brazing",
    ezentechLine:
      "Coil tube, hairpins, manifolds and the service-valve line sets — 6.35 mm liquid, 9.52 to 15.88 mm gas by capacity — are cut, formed and brazed on Ezentech's copper line.",
    explainer:
      "The refrigerant circuit connects the compressor, condenser, expansion device and evaporator. Line-set sizes depend on capacity; every joint is brazed and pressure-tested because a leak is a warranty claim.",
    checkpoint: "Line-set sizes on the sheet should match the capacity class; ask how circuits are leak-tested.",
    feeds: ["Line set", "Manifold"],
  },
  {
    id: "fascia",
    title: "Injection-moulded fascia and plastics",
    ezentechLine:
      "Front panel, louvres, intake grille, outlet and display bezel are moulded on Ezentech presses from moulds cut in the in-house tool room, then fit-checked on the real chassis.",
    explainer:
      "The fascia is the brand's face and the unit's airflow path in one part. It has to seal to the chassis, clear the louvres and pass the intake the coil needs.",
    checkpoint: "Ask whether the fascia is tooled and moulded by the same manufacturer that builds the chassis it fits.",
    feeds: ["Fascia", "Louvres", "Grille"],
  },
  {
    id: "assembly",
    title: "Assembly and R32 charging",
    ezentechLine:
      "Coil, fan, motor, controls and fascia come together on the indoor line; compressor, condenser and cabinet on the outdoor line. Circuits are evacuated, R32-charged and leak-tested at station.",
    explainer:
      "Assembly is where components become a unit. The refrigerant charge is measured to the circuit, and the choice of refrigerant — R32 across the Ezentech range — sets the charge size and the environmental footprint.",
    checkpoint: "Confirm the refrigerant and charge on the sheet, and where the charging is done.",
    feeds: ["IDU", "ODU"],
  },
  {
    id: "test",
    title: "Psychrometric test and packing",
    ezentechLine:
      "Finished units run in the NABL-accredited psychrometric lab for cooling capacity, power input and ISEER, pass electrical and safety checks, and are packed with their installation kit to the packing dimensions on the sheet.",
    explainer:
      "A psychrometric test holds indoor and outdoor conditions at set temperature and humidity and measures what the unit actually delivers — the capacity and efficiency that go on the label.",
    checkpoint: "Ask whether the manufacturer has its own accredited lab or relies on third-party reports.",
    feeds: ["Rated capacity", "ISEER", "Carton"],
  },
];
