import { specModels } from "@/data/products/specs";
import { iduPlatforms, splitModels } from "@/data/products/derived";
import type { ServiceEntry } from "../types";

const platforms = iduPlatforms(splitModels()).length;

export const oemOdm: ServiceEntry = {
  slug: "oem-odm",
  path: "/services/oem-odm",
  kind: "service",
  inHouse: true,
  title: "OEM, ODM, Private Label & Contract Manufacturing",
  navLabel: "OEM / ODM",
  short:
    "Build-to-print OEM, design-to-production ODM, private label and flexible-volume contract manufacturing — same plants, same lab, same in-house components.",
  serviceType: "OEM / ODM air-conditioner contract manufacturing",
  seo: {
    title: "OEM, ODM, Private Label & Contract AC Manufacturing",
    description:
      "Build-to-print OEM, design-to-production ODM, private-label and flexible-volume contract manufacturing of split and window air conditioners from four plants with in-house coils, sheet metal, moulding and copper tubing.",
  },
  hero: {
    eyebrow: "Services · OEM / ODM",
    title: "Your brand.",
    accent: "Our lines.",
    lede: "Four ways to work with Ezentech — bring a finished design, start from ours, put your name on a proven platform, or add capacity to yours. Same plants, same lab, same components made in-house.",
    secondaryAction: { label: "Compare the Four Models", href: "#engagement-models" },
  },
  intro: {
    eyebrow: "The offer",
    title: "One manufacturer,",
    accent: "four ways in.",
    body: [
      "Ezentech India builds air conditioners for the brands that sell them. Whether a partner arrives with a complete design, a market gap, a distribution network or a capacity shortfall, the answer runs through the same four plants and the same NABL-accredited lab.",
      "What changes between the four engagement models is who owns the design, the tooling and the badge — not the quality system the unit passes through.",
    ],
    stats: [
      { value: "04", label: "Manufacturing plants" },
      { value: "1M+", label: "Units of annual capacity" },
      { value: String(specModels.length), label: "Inverter platforms on the sheet" },
      { value: "R32", label: "Refrigerant across the range" },
    ],
    panel: {
      heading: "Included in every engagement",
      unit: "items",
      items: [
        {
          term: "In-house components",
          detail:
            "Heat-exchanger coils, sheet-metal chassis and cabinets, injection-moulded fascias and copper tubing are made on Ezentech lines — one supplier, one change-control loop.",
          href: "/services",
        },
        {
          term: "NABL-accredited testing",
          detail:
            "Cooling capacity, power input and ISEER measured in Ezentech's own psychrometric lab, accredited by NABL.",
          href: "/services/testing",
        },
        {
          term: "Certified product ranges",
          detail:
            "BIS-certified ranges, built under ISO 9001 quality and ISO 14001 environmental management systems.",
          href: "/about/quality",
        },
        {
          term: "Dispatch-ready units",
          detail:
            "Every split model on the sheet ships with its installation kit and packed dimensions listed — boxed on the same line that assembled it.",
          href: "/products/technical-specifications",
        },
      ],
    },
  },
  process: {
    eyebrow: "How a programme runs",
    title: "From brief",
    accent: "to boxed unit.",
    steps: [
      {
        title: "Brief and specification review",
        body: "Capacity, star target, market, chassis preference and annual volume. We map the brief to the platforms on the sheet and flag what needs new engineering.",
      },
      {
        title: "Platform selection",
        body: `Choose from ${platforms} split chassis and the window cabinet, or brief a new platform through product development. One chassis can carry more than one capacity.`,
      },
      {
        title: "Sample and lab validation",
        body: "Engineering samples are run in the NABL-accredited psychrometric lab against the agreed capacity and ISEER targets before any tooling is cut.",
      },
      {
        title: "Tooling and fascia",
        body: "Brand-specific fascia, louvres and badge tooled in the in-house tool room and moulded on Ezentech presses; sheet-metal tools follow the same route.",
      },
      {
        title: "Pilot run",
        body: "A pilot batch through the full line — coil, chassis, assembly, charging, psychrometric end-of-line test — signed off with the partner.",
      },
      {
        title: "Volume production and dispatch",
        body: "Season-scale production across four plants, units tested and packed with the listed installation kit, ready for the partner's distribution.",
      },
    ],
  },
  feeds: ["idu", "odu", "window"],
  matrixFact: "Four engagement models on the same plants and lab",
  relatedRanges: ["split-ac", "window-ac", "inverter-ac", "idu-odu"],
  relatedServices: ["product-development", "testing", "heat-exchanger-coils"],
  faq: [
    {
      q: "What is the difference between OEM and ODM?",
      a: "In OEM (build-to-print) the partner owns the design and Ezentech manufactures it. In ODM (design-to-production) Ezentech's platform is the starting point and its product-development team adapts it to the partner's brief; the partner owns the brand and the resulting variant.",
    },
    {
      q: "Can I use my own fascia and badge on an Ezentech platform?",
      a: "Yes. Fascias, louvres and grilles are injection-moulded in-house, so a brand-specific front can be tooled to fit the 830, 930 or 1100 mm chassis without changing the coil, fan or outdoor unit behind it.",
    },
    {
      q: "Does Ezentech handle BIS and BEE compliance?",
      a: "Ezentech manufactures BIS-certified product ranges and measures ISEER in its own NABL-accredited psychrometric lab. How the certification file is held for a specific programme is agreed in the RFQ.",
    },
    {
      q: "Which capacities are available today?",
      a: "Six inverter split models (12K, 17K, 18K, 22K; 3-star and 5-star) and two inverter window models (18K 3-star, 22K 5-star), all on R32. Fixed-speed and larger capacities are engineered on request.",
    },
    {
      q: "Is there a minimum programme size?",
      a: "Programme volume is agreed per engagement rather than set as a fixed minimum. Tell us the annual volume in your RFQ and we will come back with a production plan that fits it.",
    },
  ],
};
