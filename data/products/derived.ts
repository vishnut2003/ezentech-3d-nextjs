import type { Stat } from "@/components/ui/stat-tiles";
import {
  specModels,
  type SpecGroup,
  type SpecModel,
  type SpecType,
} from "./specs";

/**
 * Everything the range, service and insight pages print is computed here
 * from the transcribed spec sheets — nothing is typed in twice, so a data
 * correction in specs.ts flows through every page.
 */

const kw = (w: number) => (w / 1000).toFixed(1);
const fmt = (n: number) => n.toLocaleString("en-IN");
const uniq = <T,>(xs: T[]) => Array.from(new Set(xs));

export function splitModels(): SpecModel[] {
  return specModels.filter((m) => m.type === "split");
}
export function windowModels(): SpecModel[] {
  return specModels.filter((m) => m.type === "window");
}

/** The four headline tiles every range page opens with. */
export function rangeStats(models: readonly SpecModel[]): Stat[] {
  const capacities = models.map((m) => m.sheet.general.coolingCapacityW);
  const iseer = models.map((m) => m.sheet.general.iseer);
  const airflow = models.map((m) => m.sheet.indoorUnit.airflowM3h);
  const split = models.filter((m) => m.type === "split").length;
  const window = models.length - split;
  const mix =
    split && window
      ? `${split} split, ${window} window`
      : split
        ? "inverter split"
        : "inverter window";
  const minKw = kw(Math.min(...capacities));
  const maxKw = kw(Math.max(...capacities));
  return [
    { value: String(models.length), label: `Models on the sheet — ${mix}` },
    {
      value: minKw === maxKw ? `${minKw} kW` : `${minKw}–${maxKw} kW`,
      label: "Cooling capacity span",
    },
    {
      value: Math.max(...iseer).toFixed(2),
      label: `Peak rated ISEER (range ${Math.min(...iseer).toFixed(2)}–${Math.max(...iseer).toFixed(2)})`,
    },
    {
      value: `${fmt(Math.min(...airflow))}–${fmt(Math.max(...airflow))}`,
      label: "Indoor air flow, m³/h",
    },
  ];
}

/* ----------------------------------------------------- chassis / cabinets */

export interface IduPlatform {
  chassis: string;
  unitDims: string;
  evapCoil: string;
  airflow: string;
  fanMotor: string;
  models: SpecModel[];
}

/** Indoor platforms grouped by chassis, in sheet order. */
export function iduPlatforms(models: readonly SpecModel[] = specModels): IduPlatform[] {
  const out: IduPlatform[] = [];
  for (const m of models) {
    const chassis = m.sheet.general.chassis;
    let p = out.find((x) => x.chassis === chassis);
    if (!p) {
      p = {
        chassis,
        unitDims: m.sheet.indoorUnit.unitDims,
        evapCoil: m.sheet.evaporator.coilDims,
        airflow: "",
        fanMotor: `${m.sheet.indoorFanMotor.type} · ${m.sheet.indoorFanMotor.powerInput} · ${m.sheet.indoorFanMotor.rpm} rpm`,
        models: [],
      };
      out.push(p);
    }
    p.models.push(m);
  }
  for (const p of out) {
    const flows = uniq(p.models.map((m) => m.sheet.indoorUnit.airflowM3h)).sort((a, b) => a - b);
    p.airflow = flows.map(fmt).join(" / ");
    const motors = uniq(
      p.models.map(
        (m) =>
          `${m.sheet.indoorFanMotor.type} · ${m.sheet.indoorFanMotor.powerInput} · ${m.sheet.indoorFanMotor.rpm} rpm`,
      ),
    );
    p.fanMotor = motors.join(" / ");
  }
  return out;
}

export interface OduCabinet {
  unitDims: string;
  rows: string;
  coil: string;
  expansion: string[];
  models: SpecModel[];
}

/** Outdoor cabinets grouped by cabinet size (split models only). */
export function oduCabinets(models: readonly SpecModel[] = splitModels()): OduCabinet[] {
  const out: OduCabinet[] = [];
  for (const m of models) {
    const dims = m.sheet.condenser.unitDims;
    let c = out.find((x) => x.unitDims === dims);
    if (!c) {
      c = {
        unitDims: dims,
        rows: m.sheet.condenser.rows,
        coil: m.sheet.condenser.coilDims,
        expansion: [],
        models: [],
      };
      out.push(c);
    }
    c.models.push(m);
    if (!c.expansion.includes(m.sheet.condenser.expansionType)) {
      c.expansion.push(m.sheet.condenser.expansionType);
    }
  }
  return out;
}

/* --------------------------------------------------- sheet-fact tables */

const modelsFor = (pred: (m: SpecModel) => boolean) =>
  specModels.filter(pred).map((m) => m.capacityClass + (m.type === "window" ? " window" : ` ${m.stars}★`));

export function evaporatorGeometryGroups(): SpecGroup[] {
  const ev = specModels[0].sheet.evaporator;
  const coils = uniq(specModels.map((m) => m.sheet.evaporator.coilDims));
  return [
    {
      id: "evaporator-common",
      label: "Evaporator — every model",
      rows: [
        { label: "Number of rows", value: ev.rows },
        { label: "Tube pitch (a) × row", value: ev.tubePitch, unit: "mm" },
        { label: "Fin type", value: ev.finType },
        { label: "Tube outside dia.", value: ev.tubeOd, unit: "mm" },
      ],
    },
    {
      id: "evaporator-coils",
      label: "Evaporator coil length × height, by platform",
      rows: coils.map((dims) => ({
        label: uniq(
          specModels
            .filter((m) => m.sheet.evaporator.coilDims === dims)
            .map((m) => m.sheet.general.chassis),
        ).join(" · "),
        value: dims,
        unit: "mm",
      })),
    },
  ];
}

export function condenserGeometryGroups(): SpecGroup[] {
  const coils = uniq(specModels.map((m) => m.sheet.condenser.coilDims));
  return [
    {
      id: "condenser-common",
      label: "Condenser — every model",
      rows: [
        { label: "Tube outside dia. and type", value: specModels[0].sheet.condenser.tubeOd },
        { label: "Refrigerant", value: specModels[0].sheet.condenser.refrigerant },
      ],
    },
    {
      id: "condenser-coils",
      label: "Condenser coil, rows and expansion",
      rows: coils.map((dims) => {
        const ms = specModels.filter((m) => m.sheet.condenser.coilDims === dims);
        return {
          label: `${uniq(ms.map((m) => m.sheet.condenser.rows)).join("/")}-row · ${modelsFor(
            (m) => m.sheet.condenser.coilDims === dims,
          ).join(", ")}`,
          value: `${dims} · ${uniq(ms.map((m) => m.sheet.condenser.expansionType)).join(" / ")}`,
          unit: "mm",
        };
      }),
    },
  ];
}

export function tubingGroups(): SpecGroup[] {
  const gasSizes = uniq(specModels.map((m) => m.sheet.refrigerantPipe.gas)).filter(
    (v) => v !== "NA",
  );
  return [
    {
      id: "coil-tube",
      label: "Coil tube",
      rows: [
        { label: "Evaporator tube outside dia.", value: specModels[0].sheet.evaporator.tubeOd, unit: "mm" },
        { label: "Condenser tube outside dia.", value: specModels[0].sheet.condenser.tubeOd, unit: "mm" },
      ],
    },
    {
      id: "line-set",
      label: "Refrigerant pipe (service valve)",
      rows: [
        {
          label: "Liquid side",
          value: uniq(specModels.map((m) => m.sheet.refrigerantPipe.liquid))
            .filter((v) => v !== "NA")
            .join(" / "),
          unit: "mm",
        },
        ...gasSizes.map((gas) => ({
          label: `Gas side — ${modelsFor((m) => m.sheet.refrigerantPipe.gas === gas).join(", ")}`,
          value: gas,
          unit: "mm",
        })),
      ],
    },
  ];
}

export function windowCabinetGroups(): SpecGroup[] {
  const ws = windowModels();
  const first = ws[0];
  return [
    {
      id: "window-cabinet",
      label: "Cabinet — both models",
      rows: [
        { label: "Unit dimension (W×D×H)", value: first.sheet.indoorUnit.unitDims, unit: "mm" },
        { label: "Packing (W×D×H)", value: first.sheet.indoorUnit.packingDims, unit: "mm" },
        { label: "Evaporator coil length × height", value: first.sheet.evaporator.coilDims, unit: "mm" },
        { label: "Condenser coil length × height", value: first.sheet.condenser.coilDims, unit: "mm" },
        { label: "Expansion type", value: first.sheet.condenser.expansionType },
        { label: "Refrigerant", value: first.sheet.condenser.refrigerant },
      ],
    },
    {
      id: "window-models",
      label: "By model",
      rows: ws.flatMap((m) => [
        { label: `${m.capacityClass} ${m.stars}★ — cooling capacity`, value: String(m.sheet.general.coolingCapacityW), unit: "W" },
        { label: `${m.capacityClass} ${m.stars}★ — rated ISEER`, value: m.sheet.general.iseer.toFixed(2) },
        { label: `${m.capacityClass} ${m.stars}★ — indoor air flow`, value: String(m.sheet.indoorUnit.airflowM3h), unit: "m³/h" },
        { label: `${m.capacityClass} ${m.stars}★ — fan motor`, value: `${m.sheet.indoorFanMotor.type} ${m.sheet.indoorFanMotor.powerInput}, ${m.sheet.indoorFanMotor.rpm} rpm` },
      ]),
    },
  ];
}

export function iseerByStarGroups(): SpecGroup[] {
  const row = (type: SpecType, stars: 3 | 5) => {
    const ms = specModels.filter((m) => m.type === type && m.stars === stars);
    return {
      label: `${type === "split" ? "Split" : "Window"} ${stars}-star (${ms.map((m) => m.capacityClass).join(", ")})`,
      value: uniq(ms.map((m) => m.sheet.general.iseer.toFixed(2))).join(" / "),
      unit: "W/W",
    };
  };
  return [
    {
      id: "iseer",
      label: "Rated ISEER, as printed",
      rows: [row("split", 3), row("split", 5), row("window", 3), row("window", 5)],
    },
  ];
}

/* ------------------------------------------------------- efficiency pairs */

export interface EfficiencyPair {
  label: string;
  note?: string;
  three?: SpecModel;
  five?: SpecModel;
}

/** 3-star vs 5-star at the same capacity — where the star is engineered. */
export function efficiencyPairs(): EfficiencyPair[] {
  const pairs: EfficiencyPair[] = [];
  for (const cls of uniq(splitModels().map((m) => m.capacityClass))) {
    const three = splitModels().find((m) => m.capacityClass === cls && m.stars === 3);
    const five = splitModels().find((m) => m.capacityClass === cls && m.stars === 5);
    if (three && five) pairs.push({ label: `${cls} split`, three, five });
  }
  const w = windowModels();
  pairs.push({
    label: "Window",
    note: `Pairs ${w[0].capacityClass} 3-star with ${w[1].capacityClass} 5-star — different capacities, same cabinet.`,
    three: w.find((m) => m.stars === 3),
    five: w.find((m) => m.stars === 5),
  });
  return pairs;
}

/** Chassis strings carried by more than one model — the platform-sharing proof. */
export function sharedChassis(): { chassis: string; models: SpecModel[] }[] {
  return iduPlatforms(splitModels())
    .filter((p) => p.models.length > 1)
    .map((p) => ({ chassis: p.chassis, models: p.models }));
}

export const peakIseer = () => Math.max(...specModels.map((m) => m.sheet.general.iseer));
export const kwSpan = () => {
  const c = specModels.map((m) => m.sheet.general.coolingCapacityW);
  return `${kw(Math.min(...c))}–${kw(Math.max(...c))} kW`;
};
