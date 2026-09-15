import { tubingGroups } from "@/data/products/derived";
import type { ServiceEntry } from "../types";

export const copperTubing: ServiceEntry = {
  slug: "copper-tubing",
  path: "/services/copper-tubing",
  kind: "component",
  inHouse: true,
  title: "Copper Tubing & Tooling",
  navLabel: "Copper Tubing",
  short:
    "Inner-grooved coil tube, refrigerant line sets from 6.35 mm liquid to 15.88 mm gas, and an in-house tool and die room — all under one roof.",
  serviceType: "Copper tubing, refrigerant line-set fabrication and tool & die",
  seo: {
    title: "Copper Tubing & Tooling — Refrigerant Lines, Coil Tube & Tool Room",
    description:
      "Inner-grooved copper tube for coils (7 mm evaporator, 5 mm condenser), refrigerant line sets from 6.35 mm liquid to 15.88 mm gas, and an in-house tool & die room — all under one roof at Ezentech India.",
  },
  hero: {
    eyebrow: "In-house component · Copper tubing & tooling",
    title: "Copper line and tool room,",
    accent: "under one roof.",
    lede: "The copper that carries the refrigerant — coil tube, hairpins, line sets — and the tools that make every other part: press tools, moulds, jigs and fixtures, cut and maintained in-house.",
  },
  intro: {
    eyebrow: "Two capabilities",
    title: "The circuit,",
    accent: "and the tools that shape it.",
    body: [
      "Copper is the refrigerant circuit: the inner-grooved tube laced through the coils, the hairpins and return bends, the header manifold and the service-valve line set that connects indoor to outdoor unit.",
      "Tooling is what makes the rest of the unit repeatable — the press tools behind every sheet-metal panel and the moulds behind every fascia. Ezentech keeps both capabilities in-house, which is why the dimensions on the sheet stay in Ezentech's control.",
    ],
    stats: [
      { value: "7 mm", label: "Evaporator tube, inner-grooved" },
      { value: "5 mm", label: "Condenser tube, inner-grooved" },
      { value: "6.35 mm", label: "Liquid line, service valve" },
      { value: "9.52–15.88 mm", label: "Gas line, by capacity" },
    ],
    panel: {
      heading: "What the line and the tool room do",
      unit: "capabilities",
      items: [
        {
          term: "Coil tube",
          detail:
            "Inner-grooved copper tube cut, bent into hairpins and expanded into the fin pack on the coil line.",
          href: "/services/heat-exchanger-coils",
        },
        {
          term: "Refrigerant line sets",
          detail:
            "Liquid and gas lines at the service-valve sizes printed on each sheet — 6.35 mm liquid; 9.52, 12.7 or 15.88 mm gas by capacity.",
          href: "/products/technical-specifications",
        },
        {
          term: "Press tools and dies",
          detail:
            "The blanking, punching and forming tools behind every sheet-metal cabinet and chassis part.",
          href: "/services/sheet-metal",
        },
        {
          term: "Moulds and fixtures",
          detail:
            "Injection moulds for fascias and plastic parts, plus the jigs and fixtures the assembly line runs on.",
          href: "/services/injection-moulding",
        },
      ],
    },
  },
  process: {
    eyebrow: "On the line",
    title: "From tube stock",
    accent: "to charged circuit.",
    steps: [
      { title: "Cutting", body: "Copper tube is cut to length for hairpins, return bends, manifolds and line sets." },
      { title: "Hairpins and bends", body: "Tube is bent into the hairpins and U-bends that thread the coil rows." },
      { title: "End forming", body: "Tube ends are expanded, flared or reduced to suit brazed joints and service valves." },
      { title: "Brazing", body: "Return bends, manifolds and connections are brazed to close the circuit." },
      { title: "Line-set assembly and leak test", body: "Line sets are assembled to the units and every circuit is pressure-tested before R32 charging." },
    ],
  },
  facts: {
    id: "tube-sizes",
    caption: "Tube and line sizes — as printed on the sheet",
    groups: tubingGroups(),
    note: "Values as printed on the manufacturer specification sheet; the 18K window sheet lists refrigerant pipe sizes as NA.",
  },
  feeds: ["idu", "odu", "window"],
  matrixFact: "7 / 5 mm coil tube · 6.35 mm liquid, 9.52–15.88 mm gas · tool room",
  relatedRanges: ["idu-odu", "split-ac"],
  relatedServices: ["heat-exchanger-coils", "sheet-metal", "injection-moulding"],
  faq: [
    {
      q: "What refrigerant pipe sizes do Ezentech split units use?",
      a: "A 6.35 mm liquid line on every split model, with a 9.52 mm gas line on the 12K, 12.7 mm on the 17K and 18K, and 15.88 mm on the 22K split, as printed on the specification sheets.",
    },
    {
      q: "What does the tool room make?",
      a: "Press tools and dies for sheet-metal parts, injection moulds for fascias and plastic components, and the jigs and fixtures used on the assembly lines — plus their maintenance and refurbishment.",
    },
    {
      q: "Is copper tube supplied as a component to other manufacturers?",
      a: "Copper tubing and line-set fabrication primarily feed Ezentech's own units. Component supply for a partner programme is discussed case by case in the RFQ.",
    },
  ],
};
