import { oduCabinets } from "@/data/products/derived";
import type { ServiceEntry } from "../types";

const cabinets = oduCabinets().length;

export const sheetMetal: ServiceEntry = {
  slug: "sheet-metal",
  path: "/services/sheet-metal",
  kind: "component",
  inHouse: true,
  title: "Sheet Metal Fabrication",
  navLabel: "Sheet Metal",
  short:
    "Outdoor cabinets in three sizes, indoor chassis plates, base pans and installation hardware — pressed and formed on Ezentech's own lines.",
  serviceType: "Precision sheet-metal fabrication for air-conditioner cabinets and chassis",
  seo: {
    title: "Sheet Metal Fabrication — AC Chassis & Cabinets Made In-House",
    description:
      "Precision sheet-metal for air conditioners and beyond: outdoor cabinets in three sizes, indoor chassis and mounting plates, base pans and installation hardware — fabricated in Ezentech India's own plants.",
  },
  hero: {
    eyebrow: "In-house component · Sheet metal",
    title: "Chassis, cabinets, panels.",
    accent: "Pressed on our own lines.",
    lede: "The steel that carries the coil, the compressor and your brand — outdoor cabinets, indoor chassis plates and mounting hardware, fabricated in-house for AC units and beyond.",
  },
  intro: {
    eyebrow: "What we fabricate",
    title: "The structure",
    accent: "under every unit.",
    body: [
      "An outdoor unit is a sheet-metal cabinet first: the base pan that carries the compressor, the side and top panels, the service panel and the coil guard. The indoor unit hangs from a pressed wall plate and a chassis that locates the coil and fan.",
      "Ezentech blanks, punches, bends and finishes these parts in-house, so cabinet dimensions on the specification sheet are held by Ezentech tooling — and can be changed by it.",
    ],
    stats: [
      { value: String(cabinets), label: "Outdoor cabinet sizes on the sheet" },
      { value: "04", label: "Plants with fabrication capacity" },
      { value: "ISO 9001", label: "Quality management system" },
      { value: "BIS", label: "Certified product ranges" },
    ],
    panel: {
      heading: "Parts we fabricate",
      unit: "parts",
      items: [
        {
          term: "Outdoor cabinet shell",
          detail:
            "Side, top and service panels for the 700 × 300 × 480, 840 × 300 × 560 and 900 × 360 × 600 mm cabinets (W×H×D) on the sheet.",
          href: "/products/idu-odu",
        },
        {
          term: "Base pan and feet",
          detail:
            "The pressed base that carries the compressor and condenser coil, with mounting feet and drain provision.",
        },
        {
          term: "Indoor wall plate and chassis",
          detail:
            "Wall-mount plates and chassis members for the 830, 930 and 1100 mm indoor platforms.",
        },
        {
          term: "Installation-kit hardware",
          detail:
            "Brackets and mounting hardware shipped in the installation kit listed on every split sheet.",
        },
        {
          term: "Components beyond AC",
          detail:
            "The same presses and brakes fabricate sheet-metal components for other programmes on request.",
          href: "/contact?service=sheet-metal",
        },
      ],
    },
  },
  process: {
    eyebrow: "On the line",
    title: "From coil stock",
    accent: "to cabinet.",
    steps: [
      { title: "Blanking", body: "Sheet is cut to the developed blank for each panel, pan or plate." },
      { title: "Punching", body: "Louvre patterns, fixing holes and service cut-outs are punched on the flat blank." },
      { title: "Bending", body: "Flanges, returns and the cabinet's folded corners are formed on press brakes to the sheet dimensions." },
      { title: "Surface finish", body: "Parts are finished for corrosion resistance and the exterior appearance the brand specifies." },
      { title: "Assembly", body: "Panels, base pan and coil guard are assembled into the cabinet that goes to the outdoor-unit line." },
    ],
  },
  photo: {
    src: "/images/services/sheet-metal/press-line.jpg",
    alt: "Sheet-metal press line forming outdoor-unit cabinet panels at an Ezentech plant",
    caption: "Sheet-metal press line · Ezentech plant",
    figure: "01",
    aspect: "16/9",
  },
  feeds: ["idu", "odu", "window"],
  matrixFact: `${cabinets} outdoor cabinet sizes · 830 / 930 / 1100 mm indoor platforms`,
  relatedRanges: ["idu-odu", "window-ac"],
  relatedServices: ["injection-moulding", "copper-tubing", "heat-exchanger-coils"],
  faq: [
    {
      q: "What sheet-metal parts go into an Ezentech air conditioner?",
      a: "The outdoor cabinet (panels, base pan, coil guard, feet), the indoor wall-mount plate and chassis members, and the mounting hardware in the installation kit — all fabricated in-house.",
    },
    {
      q: "Can the outdoor cabinet be customised for a brand?",
      a: "Cabinet dimensions on the sheet are held by Ezentech's own tooling. Appearance changes such as louvre pattern or finish are discussed in the RFQ; dimensional changes go through product development.",
    },
    {
      q: "Does Ezentech fabricate sheet metal for products other than air conditioners?",
      a: "The presses and brakes are not limited to AC parts. Send the drawings and volumes in an RFQ and we will confirm fit with the lines.",
    },
  ],
};
