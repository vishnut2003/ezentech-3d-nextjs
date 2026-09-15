import {
  condenserGeometryGroups,
  evaporatorGeometryGroups,
} from "@/data/products/derived";
import type { ServiceEntry } from "../types";

export const heatExchangerCoils: ServiceEntry = {
  slug: "heat-exchanger-coils",
  path: "/services/heat-exchanger-coils",
  kind: "component",
  inHouse: true,
  title: "Heat Exchanger Coils",
  navLabel: "Heat Exchanger Coils",
  short:
    "Evaporator and condenser coils built in-house — two-row slit-fin evaporators on 7 mm tube, one- and two-row condensers on 5 mm tube.",
  serviceType: "Fin-and-tube heat exchanger coil manufacturing",
  seo: {
    title: "Heat Exchanger Coils — In-House Fin-and-Tube Coil Manufacturing",
    description:
      "Evaporator and condenser coils made in-house: 2-row slit-fin evaporators on 7 mm inner-grooved tube at 21 × 12.7 mm pitch, 1- and 2-row condensers on 5 mm tube — matched to every split and window platform on the Ezentech sheet.",
  },
  hero: {
    eyebrow: "In-house component · Heat exchanger coils",
    title: "The coil is the product.",
    accent: "So we make it ourselves.",
    lede: "Evaporator and condenser coils are built on Ezentech's own lines — fin pressing, hairpin bending, tube expansion, brazing and leak testing under the same roof as the units they go into.",
    secondaryAction: { label: "See Coil Geometry", href: "#coil-geometry" },
  },
  intro: {
    eyebrow: "Why in-house",
    title: "Tolerances travel",
    accent: "with the coil.",
    body: [
      "A fin-and-tube coil sets the cooling capacity, the airflow resistance and, with the expansion device, the rated ISEER of the finished unit. Buying it in means inheriting someone else's fin pitch, tube expansion and brazing quality.",
      "Ezentech presses the fins, forms and expands the copper hairpins and brazes the return bends on its own lines, so the geometry printed on the specification sheet is the geometry that ships.",
    ],
    stats: [
      { value: "2", label: "Evaporator rows, every model" },
      { value: "7 mm", label: "Evaporator tube, inner-grooved" },
      { value: "5 mm", label: "Condenser tube, inner-grooved" },
      { value: "R32", label: "Refrigerant the coils are built for" },
    ],
    panel: {
      heading: "Coils we build",
      unit: "coils",
      items: [
        {
          term: "Indoor evaporator coil",
          detail:
            "Two-row slit-fin coil on 7 mm inner-grooved tube at 21 × 12.7 mm pitch, in 620, 725 and 887 mm lengths to match the 830, 930 and 1100 mm chassis.",
          href: "/products/idu-odu",
        },
        {
          term: "One-row condenser coil",
          detail:
            "5 mm inner-grooved tube, 670 × 11.52 × 429 mm or 805 × 11.52 × 507 mm, for the 3-star outdoor cabinets.",
        },
        {
          term: "Two-row condenser coil",
          detail:
            "805 × 23.04 × 546 mm in the 900 × 360 × 600 mm cabinet — the extra surface behind the 5-star rating.",
          href: "/products/inverter-ac",
        },
        {
          term: "Window coils",
          detail:
            "The 887 mm evaporator and a 718 × 17.46 × 480 mm condenser, both built into the single 660 mm window cabinet.",
          href: "/products/window-ac",
        },
      ],
    },
  },
  process: {
    eyebrow: "On the line",
    title: "How a coil",
    accent: "is made here.",
    steps: [
      {
        title: "Fin pressing",
        body: "Aluminium fin stock is pressed with the slit-fin pattern and collar that set the tube pitch and the air-side surface.",
      },
      {
        title: "Hairpin bending and lacing",
        body: "Inner-grooved copper tube is cut and bent into hairpins, then laced through the fin pack in the row and pitch printed on the sheet.",
      },
      {
        title: "Tube expansion",
        body: "Hairpins are mechanically expanded so the tube wall locks against the fin collar — the contact that carries the heat.",
      },
      {
        title: "Return-bend brazing",
        body: "Return bends and the header manifold are brazed to close the circuit, with the inlet and outlet line-set formed to the unit.",
      },
      {
        title: "Leak test and dry",
        body: "Every circuit is pressure-tested and dried before it goes to assembly and R32 charging.",
      },
    ],
  },
  facts: {
    id: "coil-geometry",
    caption: "Coil geometry — as printed on the sheet",
    groups: [...evaporatorGeometryGroups(), ...condenserGeometryGroups()],
  },
  feeds: ["idu", "odu", "window"],
  matrixFact: "2-row slit-fin evaporator, 7 mm tube · 1/2-row condenser, 5 mm tube",
  relatedRanges: ["idu-odu", "inverter-ac"],
  relatedServices: ["copper-tubing", "testing", "sheet-metal"],
  faq: [
    {
      q: "What coil geometry do Ezentech units use?",
      a: "Evaporators are two-row slit-fin coils on 7 mm inner-grooved tube at 21 × 12.7 mm pitch. Condensers use 5 mm inner-grooved tube in one row (3-star) or two rows (5-star split models).",
    },
    {
      q: "Can Ezentech supply coils as a component, without the unit?",
      a: "Coil manufacturing is an in-house capability that primarily feeds Ezentech's own units. Component supply for a partner's programme is discussed case by case in the RFQ.",
    },
    {
      q: "Why does the 5-star model have a different condenser?",
      a: "On the sheet, the 5-star split models carry a two-row 805 × 23.04 × 546 mm condenser coil against one row on the 3-star models — more heat-rejection surface at part load, paired with an electronic expansion valve.",
    },
    {
      q: "Are the coils built for R32?",
      a: "Yes. Every model on the sheet runs R32, and the coil circuits, expansion devices and line sets are specified for it.",
    },
  ],
};
