/**
 * Technical specifications — transcribed verbatim from the client's
 * "Technical Specification sheet" (project-details/technical-specification-sheet.pdf,
 * one model per page). Values keep the sheet's own wording and axis order;
 * do not normalise them. Anything derived (BTU, tonnage class) is marked.
 */

export type SpecType = "split" | "window";
export type StarRating = 3 | 5;

export type FeatureId =
  | "r32"
  | "energy-efficient"
  | "rotary-compressor"
  | "powerful-cooling"
  | "inverter"
  | "star-rated"
  | "low-noise"
  | "reliable";

/** One sheet, grouped exactly as the printed table. */
export interface SpecSheet {
  general: {
    chassis: string;
    type: string;
    coolingCapacityW: number;
    iseer: number;
  };
  /** Absent on the window sheets. */
  compressor?: { type: string; brand: string };
  indoorFanMotor: {
    type: string;
    brand: string;
    powerInput: string;
    capacitor: string;
    rpm: string;
  };
  evaporator: {
    rows: string;
    tubePitch: string;
    finType: string;
    tubeOd: string;
    coilDims: string;
  };
  indoorUnit: {
    fanDia: string;
    airflowM3h: number;
    unitDims: string;
    packingDims: string;
  };
  indoorFan: {
    brand: string;
    outputPower: string;
    motorSpeed: string;
    diameter: string;
    blades: string;
  };
  condenser: {
    rows: string;
    tubeOd: string;
    coilDims: string;
    expansionType: string;
    unitDims: string;
    packingDims: string;
    connectingWire: string;
    installationKit: string;
    refrigerant: string;
  };
  refrigerantPipe: { liquid: string; gas: string };
}

export type SpecImages = { idu: string; odu: string } | { window: string };

export interface SpecModel {
  slug: string;
  /** As printed on the sheet. */
  sheetName: string;
  /** Marketing name used for headings and structured data. */
  name: string;
  type: SpecType;
  stars: StarRating;
  /** "12K", "17K"… — the sheet's capacity class. */
  capacityClass: string;
  /** Derived: capacity class × 1000. Not printed on the sheet. */
  nominalBtu: number;
  /** Derived industry tonnage class. Not printed on the sheet. */
  tonnageTr: number;
  /** 1-based page in the source PDF. */
  page: number;
  features: FeatureId[];
  images: SpecImages;
  sheet: SpecSheet;
  /** Transcription caveats, shown in the source note. */
  notes?: string[];
}

export interface SpecRow {
  label: string;
  value: string;
  unit?: string;
}

export interface SpecGroup {
  id: string;
  label: string;
  rows: SpecRow[];
}

const IMAGE_ROOT = "/images/products/specs";

const splitFeatures: FeatureId[] = [
  "r32",
  "energy-efficient",
  "rotary-compressor",
  "powerful-cooling",
  "inverter",
  "star-rated",
  "low-noise",
  "reliable",
];

/* Blocks shared verbatim across the split sheets. */
const splitCompressor = { type: "Rotary", brand: "Highly" };
const splitIndoorFanBrand = "Nidec / Kryon / Picl";
const evaporatorCommon = {
  rows: "2",
  tubePitch: "21x12.7",
  finType: "Slit",
  tubeOd: "7mm and IGT",
};
const condenserCommon = {
  tubeOd: "5mm and IGT",
  connectingWire: "NA",
  installationKit: "Y",
  refrigerant: "R32",
};

const tonnageByClass: Record<string, number> = {
  "12K": 1.0,
  "17K": 1.5,
  "18K": 1.5,
  "22K": 2.0,
};

function splitModel(input: {
  slug: string;
  sheetName: string;
  name: string;
  stars: StarRating;
  capacityClass: string;
  page: number;
  sheet: SpecSheet;
  notes?: string[];
}): SpecModel {
  return {
    ...input,
    type: "split",
    nominalBtu: Number.parseInt(input.capacityClass, 10) * 1000,
    tonnageTr: tonnageByClass[input.capacityClass],
    features: splitFeatures,
    images: {
      idu: `${IMAGE_ROOT}/${input.slug}-idu.png`,
      odu: `${IMAGE_ROOT}/${input.slug}-odu.png`,
    },
  };
}

function windowModel(input: {
  slug: string;
  sheetName: string;
  name: string;
  stars: StarRating;
  capacityClass: string;
  page: number;
  sheet: SpecSheet;
  notes?: string[];
}): SpecModel {
  return {
    ...input,
    type: "window",
    nominalBtu: Number.parseInt(input.capacityClass, 10) * 1000,
    tonnageTr: tonnageByClass[input.capacityClass],
    features: splitFeatures,
    images: { window: `${IMAGE_ROOT}/${input.slug}-window.png` },
  };
}

export const specModels: readonly SpecModel[] = [
  splitModel({
    slug: "12k-3-star-inverter-split",
    sheetName: "12K 3 STAR INV",
    name: "12K 3-Star Inverter Split AC",
    stars: 3,
    capacityClass: "12K",
    page: 1,
    notes: [
      "Indoor unit dimensions are printed as W×D×H 830×235×315 on this sheet (other split sheets list W×D×H with height last).",
    ],
    sheet: {
      general: { chassis: '830-17"', type: "Inverter", coolingCapacityW: 3400, iseer: 4.35 },
      compressor: splitCompressor,
      indoorFanMotor: {
        type: "DC",
        brand: splitIndoorFanBrand,
        powerInput: "35W",
        capacitor: "NA",
        rpm: "1280",
      },
      evaporator: { ...evaporatorCommon, coilDims: "620x25.4x378" },
      indoorUnit: {
        fanDia: "107x610",
        airflowM3h: 850,
        unitDims: "830x235x315",
        packingDims: "920x365x300",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "33W",
        motorSpeed: "900",
        diameter: "380",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "1",
        coilDims: "670x11.52x429",
        expansionType: "Capillary",
        unitDims: "700x300x480",
        packingDims: "770x360x520",
      },
      refrigerantPipe: { liquid: "6.35", gas: "9.52" },
    },
  }),
  splitModel({
    slug: "17k-3-star-inverter-split",
    sheetName: "17K 3 STAR INV",
    name: "17K 3-Star Inverter Split AC",
    stars: 3,
    capacityClass: "17K",
    page: 2,
    sheet: {
      general: { chassis: '930-20"', type: "Inverter", coolingCapacityW: 4800, iseer: 4.35 },
      compressor: splitCompressor,
      indoorFanMotor: {
        type: "DC",
        brand: splitIndoorFanBrand,
        powerInput: "35W",
        capacitor: "NA",
        rpm: "1280",
      },
      evaporator: { ...evaporatorCommon, coilDims: "725x25.4x378" },
      indoorUnit: {
        fanDia: "107x710",
        airflowM3h: 1000,
        unitDims: "930x315x235",
        packingDims: "1020x365x300",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "45W",
        motorSpeed: "900",
        diameter: "445",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "1",
        coilDims: "805x11.52x507",
        expansionType: "Capillary",
        unitDims: "840x300x560",
        packingDims: "920x355x605",
      },
      refrigerantPipe: { liquid: "6.35", gas: "12.7" },
    },
  }),
  splitModel({
    slug: "17k-5-star-inverter-split",
    sheetName: "17K 5 STAR INV",
    name: "17K 5-Star Inverter Split AC",
    stars: 5,
    capacityClass: "17K",
    page: 3,
    sheet: {
      general: { chassis: '930-22"', type: "Inverter", coolingCapacityW: 4800, iseer: 5.65 },
      compressor: splitCompressor,
      indoorFanMotor: {
        type: "DC",
        brand: splitIndoorFanBrand,
        powerInput: "35W",
        capacitor: "NA",
        rpm: "1280",
      },
      evaporator: { ...evaporatorCommon, coilDims: "725x25.4x378" },
      indoorUnit: {
        fanDia: "107x710",
        airflowM3h: 1000,
        unitDims: "930x315x235",
        packingDims: "1020x365x300",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "45W",
        motorSpeed: "900",
        diameter: "445",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "2",
        coilDims: "805x23.04x546",
        expansionType: "EEV",
        unitDims: "900x360x600",
        packingDims: "980x415x645",
      },
      refrigerantPipe: { liquid: "6.35", gas: "12.7" },
    },
  }),
  splitModel({
    slug: "18k-3-star-inverter-split",
    sheetName: "18K 3 STAR INV",
    name: "18K 3-Star Inverter Split AC",
    stars: 3,
    capacityClass: "18K",
    page: 4,
    sheet: {
      general: { chassis: '930-20"', type: "Inverter", coolingCapacityW: 5100, iseer: 4.35 },
      compressor: splitCompressor,
      indoorFanMotor: {
        type: "DC",
        brand: splitIndoorFanBrand,
        powerInput: "35W",
        capacitor: "NA",
        rpm: "1280",
      },
      evaporator: { ...evaporatorCommon, coilDims: "725x25.4x378" },
      indoorUnit: {
        fanDia: "107x710",
        airflowM3h: 1000,
        unitDims: "930x315x235",
        packingDims: "1020x365x300",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "45W",
        motorSpeed: "900",
        diameter: "445",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "1",
        coilDims: "805x11.52x507",
        expansionType: "Capillary",
        unitDims: "840x300x560",
        packingDims: "920x355x605",
      },
      refrigerantPipe: { liquid: "6.35", gas: "12.7" },
    },
  }),
  splitModel({
    slug: "18k-5-star-inverter-split",
    sheetName: "18K 5 STAR INV",
    name: "18K 5-Star Inverter Split AC",
    stars: 5,
    capacityClass: "18K",
    page: 5,
    sheet: {
      general: { chassis: '1100-22"', type: "Inverter", coolingCapacityW: 5100, iseer: 5.65 },
      compressor: splitCompressor,
      indoorFanMotor: {
        type: "DC",
        brand: splitIndoorFanBrand,
        powerInput: "57W",
        capacitor: "NA",
        rpm: "1350",
      },
      evaporator: { ...evaporatorCommon, coilDims: "887x25.4x378" },
      indoorUnit: {
        fanDia: "107x875",
        airflowM3h: 1100,
        unitDims: "1100x315x235",
        packingDims: "1190x365x300",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "45W",
        motorSpeed: "900",
        diameter: "445",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "2",
        coilDims: "805x23.04x546",
        expansionType: "EEV",
        unitDims: "900x360x600",
        packingDims: "980x415x645",
      },
      refrigerantPipe: { liquid: "6.35", gas: "12.7" },
    },
  }),
  splitModel({
    slug: "22k-3-star-inverter-split",
    sheetName: "22K 3 STAR INV",
    name: "22K 3-Star Inverter Split AC",
    stars: 3,
    capacityClass: "22K",
    page: 6,
    sheet: {
      general: { chassis: '1100-22"', type: "Inverter", coolingCapacityW: 6300, iseer: 4.35 },
      compressor: splitCompressor,
      indoorFanMotor: {
        type: "DC",
        brand: splitIndoorFanBrand,
        powerInput: "57W",
        capacitor: "NA",
        rpm: "1350",
      },
      evaporator: { ...evaporatorCommon, coilDims: "887x25.4x378" },
      indoorUnit: {
        fanDia: "107x875",
        airflowM3h: 1100,
        unitDims: "1100x315x235",
        packingDims: "1190x365x300",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "45W",
        motorSpeed: "900",
        diameter: "445",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "2",
        coilDims: "805x23.04x546",
        expansionType: "Capillary",
        unitDims: "900x360x600",
        packingDims: "980x415x645",
      },
      refrigerantPipe: { liquid: "6.35", gas: "15.88" },
    },
  }),
  windowModel({
    slug: "18k-3-star-inverter-window",
    sheetName: "18K 3 STAR INV WINDOW",
    name: "18K 3-Star Inverter Window AC",
    stars: 3,
    capacityClass: "18K",
    page: 7,
    notes: [
      "Window sheets do not list a compressor block.",
      'Evaporator tube is printed as "7mm and IG1" on the window sheets; recorded as IGT to match the split sheets.',
      "Refrigerant pipe sizes are printed as NA on this sheet.",
    ],
    sheet: {
      general: { chassis: "Window", type: "Inverter", coolingCapacityW: 4800, iseer: 3.35 },
      indoorFanMotor: {
        type: "AC",
        brand: "MERATHAN / PICL",
        powerInput: "110W",
        capacitor: "2.5",
        rpm: "1300",
      },
      evaporator: { ...evaporatorCommon, coilDims: "887x25.4x378" },
      indoorUnit: {
        fanDia: "107x560",
        airflowM3h: 900,
        unitDims: "660x690x428",
        packingDims: "780x790x500",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "45W",
        motorSpeed: "1050",
        diameter: "390",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "1",
        coilDims: "718x17.46x480",
        expansionType: "Capillary",
        unitDims: "660x420x780",
        packingDims: "780x490x890",
      },
      refrigerantPipe: { liquid: "NA", gas: "NA" },
    },
  }),
  windowModel({
    slug: "22k-5-star-inverter-window",
    sheetName: "22K 5 STAR INV WINDOW",
    name: "22K 5-Star Inverter Window AC",
    stars: 5,
    capacityClass: "22K",
    page: 8,
    notes: [
      "Window sheets do not list a compressor block.",
      'Evaporator tube is printed as "7mm and IG1" on the window sheets; recorded as IGT to match the split sheets.',
    ],
    sheet: {
      general: { chassis: "Window", type: "Inverter", coolingCapacityW: 6100, iseer: 5.2 },
      indoorFanMotor: {
        type: "AC",
        brand: "MERATHAN / PICL",
        powerInput: "160W",
        capacitor: "3.5",
        rpm: "1300",
      },
      evaporator: { ...evaporatorCommon, coilDims: "887x25.4x378" },
      indoorUnit: {
        fanDia: "107x560",
        airflowM3h: 1100,
        unitDims: "660x690x428",
        packingDims: "780x790x500",
      },
      indoorFan: {
        brand: splitIndoorFanBrand,
        outputPower: "45W",
        motorSpeed: "1050",
        diameter: "390",
        blades: "3",
      },
      condenser: {
        ...condenserCommon,
        rows: "1",
        coilDims: "718x17.46x480",
        expansionType: "Capillary",
        unitDims: "660x420x780",
        packingDims: "780x490x890",
      },
      refrigerantPipe: { liquid: "6.35", gas: "12.7" },
    },
  }),
];

export function getSpecModel(slug: string): SpecModel | undefined {
  return specModels.find((m) => m.slug === slug);
}

/** The printed table, in printed order, for one model. */
export function toSpecGroups(m: SpecModel): SpecGroup[] {
  const s = m.sheet;
  const groups: SpecGroup[] = [
    {
      id: "general",
      label: "General",
      rows: [
        { label: "Chassis type", value: s.general.chassis },
        { label: "Type", value: s.general.type },
        {
          label: "Cooling capacity (min / full / max)",
          value: String(s.general.coolingCapacityW),
          unit: "W",
        },
        { label: "Rated ISEER", value: s.general.iseer.toFixed(2), unit: "W/W" },
      ],
    },
  ];

  if (s.compressor) {
    groups.push({
      id: "compressor",
      label: "Compressor",
      rows: [
        { label: "Type", value: s.compressor.type },
        { label: "Brand", value: s.compressor.brand },
      ],
    });
  }

  groups.push(
    {
      id: "indoor-fan-motor",
      label: "Indoor fan motor",
      rows: [
        { label: "Type", value: s.indoorFanMotor.type },
        { label: "Brand", value: s.indoorFanMotor.brand },
        { label: "Power input", value: s.indoorFanMotor.powerInput, unit: "watts" },
        { label: "Capacitor", value: s.indoorFanMotor.capacitor, unit: "µF" },
        { label: "Motor speed", value: s.indoorFanMotor.rpm, unit: "RPM" },
      ],
    },
    {
      id: "evaporator",
      label: "Evaporator",
      rows: [
        { label: "Number of rows", value: s.evaporator.rows },
        { label: "Tube pitch (a) × row", value: s.evaporator.tubePitch, unit: "mm" },
        { label: "Fin material type", value: s.evaporator.finType },
        { label: "Tube outside dia.", value: s.evaporator.tubeOd, unit: "mm" },
        { label: "Coil length × height", value: s.evaporator.coilDims, unit: "mm" },
      ],
    },
    {
      id: "indoor-unit",
      label: "Indoor unit",
      rows: [
        { label: "Fan indoor fan diameter", value: s.indoorUnit.fanDia, unit: "mm" },
        { label: "Indoor air flow", value: String(s.indoorUnit.airflowM3h), unit: "m³/h" },
        { label: "Unit dimension (W×D×H)", value: s.indoorUnit.unitDims, unit: "mm" },
        { label: "Packing (W×D×H)", value: s.indoorUnit.packingDims, unit: "mm" },
      ],
    },
    {
      id: "indoor-fan",
      label: "Indoor fan",
      rows: [
        { label: "Brand", value: s.indoorFan.brand },
        { label: "Output power", value: s.indoorFan.outputPower },
        { label: "Motor speed", value: s.indoorFan.motorSpeed },
        { label: "Diameter", value: s.indoorFan.diameter, unit: "mm" },
        { label: "No. of blades", value: s.indoorFan.blades },
      ],
    },
    {
      id: "condenser",
      label: "Condenser",
      rows: [
        { label: "Number of rows", value: s.condenser.rows },
        { label: "Tube outside dia. and type", value: s.condenser.tubeOd },
        { label: "Coil length × height", value: s.condenser.coilDims, unit: "mm" },
        { label: "Expansion type", value: s.condenser.expansionType },
        { label: "Unit dimension (W×H×D)", value: s.condenser.unitDims, unit: "mm" },
        { label: "Packing (W×H×D)", value: s.condenser.packingDims, unit: "mm" },
        { label: "Connecting wire", value: s.condenser.connectingWire },
        { label: "Installation kit", value: s.condenser.installationKit },
        { label: "Refrigerant type", value: s.condenser.refrigerant },
      ],
    },
    {
      id: "refrigerant-pipe",
      label: "Refrigerant pipe",
      rows: [
        { label: "Liquid side (SVC)", value: s.refrigerantPipe.liquid, unit: "mm" },
        { label: "Gas side (SVC)", value: s.refrigerantPipe.gas, unit: "mm" },
      ],
    },
  );

  return groups;
}

export function modelImageList(m: SpecModel): { src: string; alt: string }[] {
  if ("window" in m.images) {
    return [{ src: m.images.window, alt: `${m.name} — window unit` }];
  }
  return [
    { src: m.images.idu, alt: `${m.name} — indoor unit` },
    { src: m.images.odu, alt: `${m.name} — outdoor unit` },
  ];
}
