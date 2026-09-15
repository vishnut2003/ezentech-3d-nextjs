import { iduPlatforms, peakIseer } from "@/data/products/derived";
import { specModels } from "@/data/products/specs";
import type { ServiceEntry } from "../types";

export const productDevelopment: ServiceEntry = {
  slug: "product-development",
  path: "/services/product-development",
  kind: "capability",
  inHouse: true,
  title: "R&D & Product Development",
  navLabel: "Product Development",
  short:
    "Platform architecture, thermal design, industrial design, prototyping and lab validation — from a partner's brief to a production platform.",
  serviceType: "Air-conditioner product development and ODM design",
  seo: {
    title: "R&D & Product Development — ODM Design, Prototyping & Platforms",
    description:
      "Product development for ODM partners: platform architecture that shares one chassis across capacities, coil-fan-expansion tuning to an ISEER target, industrial design and NABL-lab validation — from brief to production platform.",
  },
  hero: {
    eyebrow: "Capability · R&D and product development",
    title: "From brief",
    accent: "to production platform.",
    lede: "ODM design, prototyping and validation — a product-development team that shares chassis across capacities, tunes coil and fan to the ISEER target, and hands a proven platform to your brand.",
    secondaryAction: { label: "Platform Sharing", href: "#platform-sharing" },
  },
  intro: {
    eyebrow: "What the team does",
    title: "Design that lands",
    accent: "on our own lines.",
    body: [
      "Product development at Ezentech sits next to the coil line, the tool room and the psychrometric lab. A brief becomes a platform choice, a coil and fan selection, an expansion device and a fascia — each one tested on the line that will build it.",
      "The visible result on the sheet: one indoor chassis carrying more than one capacity, and a 5-star variant that shares its indoor unit with the 3-star model.",
    ],
    stats: [
      { value: String(specModels.length), label: "Platforms developed onto the sheet" },
      { value: String(iduPlatforms().length), label: "Indoor platforms, split and window" },
      { value: peakIseer().toFixed(2), label: "Peak rated ISEER on the sheet" },
      { value: "20+ yrs", label: "Of building for other brands" },
    ],
    panel: {
      heading: "Development disciplines",
      unit: "disciplines",
      items: [
        {
          term: "Platform architecture",
          detail:
            "Chassis and cabinet families designed so one indoor platform carries several capacities and one outdoor cabinet carries several ratings.",
          href: "/products/idu-odu",
        },
        {
          term: "Thermal design",
          detail:
            "Coil rows, tube and fin geometry, fan curve and expansion device selected together to hit the cooling capacity and ISEER target.",
          href: "/products/inverter-ac",
        },
        {
          term: "Industrial design",
          detail:
            "The fascia, louvres and display the brand wants, engineered against the real chassis and moulded in-house.",
          href: "/services/injection-moulding",
        },
        {
          term: "Lab validation",
          detail:
            "Prototypes run in the NABL-accredited psychrometric lab before tooling is committed.",
          href: "/services/testing",
        },
        {
          term: "Design for manufacture",
          detail:
            "Every part checked against the press tools, moulds and assembly fixtures the tool room will build.",
          href: "/services/copper-tubing",
        },
      ],
    },
  },
  process: {
    eyebrow: "The pipeline",
    title: "Six stages,",
    accent: "one roof.",
    steps: [
      { title: "Brief", body: "Capacity, star target, market and volume — and whether the partner brings a design or starts from an Ezentech platform." },
      { title: "Concept and platform", body: "Platform selected or specified; coil, fan and expansion device proposed against the ISEER target." },
      { title: "Prototype", body: "Engineering samples built on the line with prototype fascia and the production coil." },
      { title: "Lab validation", body: "Capacity, power input and ISEER measured in the psychrometric lab; iterate until the target is met." },
      { title: "Pilot", body: "Production tooling cut in the tool room; a pilot batch through the full line and end-of-line test." },
      { title: "Release", body: "Specification sheet issued, certification file assembled, and the platform released to volume production." },
    ],
  },
  feeds: ["idu", "odu", "window"],
  matrixFact: "One chassis, several capacities · coil-fan-expansion tuned to ISEER",
  relatedRanges: ["inverter-ac", "idu-odu", "split-ac"],
  relatedServices: ["oem-odm", "testing", "heat-exchanger-coils"],
  faq: [
    {
      q: "What does 'one chassis, several capacities' mean?",
      a: 'On the sheet, the 930-20" indoor chassis carries both the 17K and 18K 3-star models and the 1100-22" chassis carries the 18K 5-star and 22K 3-star models — one fascia tool and one wall plate serving two capacities.',
    },
    {
      q: "Can Ezentech develop a product to my brand's brief?",
      a: "Yes — that is the ODM engagement. The brief is mapped to a platform, the coil, fan and expansion device are tuned to the target rating, the fascia is designed and tooled in-house, and the result is validated in the NABL-accredited lab before release.",
    },
    {
      q: "How is a new variant validated?",
      a: "Prototypes are run in Ezentech's psychrometric lab for cooling capacity, power input and ISEER, and a pilot batch passes through the full production line and end-of-line test before the platform is released.",
    },
  ],
};
