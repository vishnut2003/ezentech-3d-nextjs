import type { FaqItem } from "@/lib/structured-data/common";
import type { ServiceSlug } from "@/data/services/types";
import { specModels, type SpecModel } from "./specs";

export type RangeSlug = "split-ac" | "window-ac" | "inverter-ac" | "idu-odu";

export interface ProductRange {
  slug: RangeSlug;
  path: `/products/${RangeSlug}`;
  title: string;
  navLabel: string;
  short: string;
  seo: { title: string; description: string; image: { url: string; alt: string } };
  hero: { eyebrow: string; title: string; accent: string; lede: string };
  filter: (m: SpecModel) => boolean;
  /** Which bespoke section the page renders after the model list. */
  angle: "platforms" | "cabinet" | "efficiency" | "pairing";
  relatedServices: ServiceSlug[];
  faq: FaqItem[];
}

const onRequest =
  "Fixed-speed and larger capacities are engineered on request — send the capacity, star target and chassis preference in your RFQ.";

export const productRanges: readonly ProductRange[] = [
  {
    slug: "split-ac",
    path: "/products/split-ac",
    title: "Split Air Conditioners",
    navLabel: "Split AC",
    short: "Six R32 inverter split models, 12K to 22K, on four indoor chassis platforms.",
    seo: {
      title: "Split Air Conditioners — Inverter Split AC Range from 1.0 TR",
      description:
        "Six R32 inverter split AC models from 12K to 22K, 3-star and 5-star, on four chassis platforms — cooling capacity, ISEER, airflow and dimensions from the manufacturer sheet, built for OEM/ODM brand partners.",
      image: {
        url: "/images/products/specs/18k-5-star-inverter-split-idu.png",
        alt: "Ezentech 18K 5-Star inverter split AC indoor unit",
      },
    },
    hero: {
      eyebrow: "Products · Split air conditioners",
      title: "Inverter split range,",
      accent: "from 1.0 TR.",
      lede: "Six inverter split platforms on the sheet today — 12K to 22K, 3-star and 5-star, R32 with rotary compressors. Fixed-speed and larger capacities are engineered on request.",
    },
    filter: (m) => m.type === "split",
    angle: "platforms",
    relatedServices: ["heat-exchanger-coils", "sheet-metal", "injection-moulding", "copper-tubing"],
    faq: [
      {
        q: "Do you manufacture fixed-speed split air conditioners?",
        a: `The six split models on the current specification sheet are all inverter units. ${onRequest}`,
      },
      {
        q: "What capacities are on the split sheet?",
        a: "12K (1.0 TR class), 17K and 18K (1.5 TR class) and 22K (2.0 TR class), with cooling capacities from 3,400 W to 6,300 W and rated ISEER of 4.35 (3-star) or 5.65 (5-star).",
      },
      {
        q: "Can my brand use its own fascia on an Ezentech chassis?",
        a: "Yes. The fascia, louvres and grille are injection-moulded in-house, so a brand-specific front can be tooled to fit the 830, 930 or 1100 mm chassis without changing the coil, fan or outdoor unit behind it.",
      },
      {
        q: "Where do I find the full specification of a split model?",
        a: "Every model's sheet — chassis, compressor, fan motors, coil geometry, unit and packing dimensions, refrigerant pipe sizes — is reproduced on the Technical Specifications page. Each model on this page links straight to its sheet.",
      },
    ],
  },
  {
    slug: "window-ac",
    path: "/products/window-ac",
    title: "Window Air Conditioners",
    navLabel: "Window AC",
    short: "Two R32 inverter window models — 18K 3-star and 22K 5-star — in one 660 mm cabinet.",
    seo: {
      title: "Window Air Conditioners — Inverter Window AC, 18K and 22K",
      description:
        "Two R32 inverter window AC models — 18K 3-star and 22K 5-star — with evaporator and condenser in one 660 mm cabinet, 900–1,100 m³/h airflow, built for OEM/ODM brand partners.",
      image: {
        url: "/images/products/specs/22k-5-star-inverter-window-window.png",
        alt: "Ezentech 22K 5-Star inverter window AC",
      },
    },
    hero: {
      eyebrow: "Products · Window air conditioners",
      title: "Window units,",
      accent: "inverter-driven.",
      lede: "Two inverter window platforms — 18K 3-star and 22K 5-star — with evaporator and condenser built into one cabinet, on R32. A format many brands still need, made on the same lines as the split range.",
    },
    filter: (m) => m.type === "window",
    angle: "cabinet",
    relatedServices: ["sheet-metal", "heat-exchanger-coils", "testing"],
    faq: [
      {
        q: "Are the window models inverter or fixed-speed?",
        a: `Both window models on the sheet are inverter units — 18K 3-star (ISEER 3.35) and 22K 5-star (ISEER 5.20). ${onRequest}`,
      },
      {
        q: "What are the window cabinet dimensions?",
        a: "Both models share a 660 × 690 × 428 mm unit (W×D×H) and a 780 × 790 × 500 mm packed carton, so a brand can carry both capacities on one installation footprint.",
      },
      {
        q: "Why is a window AC still relevant for a brand partner?",
        a: "It is a single-cabinet product with no line set to run, which suits replacement markets, institutional buyers and buildings with fixed sleeve openings. Ezentech builds it on the same coil, sheet-metal and moulding lines as the split range.",
      },
    ],
  },
  {
    slug: "inverter-ac",
    path: "/products/inverter-ac",
    title: "Inverter AC Range",
    navLabel: "Inverter Range",
    short: "Every platform is inverter-driven; how 3-star becomes 5-star, ISEER 4.35 to 5.65.",
    seo: {
      title: "Inverter AC Range — 3-Star and 5-Star ISEER, R32",
      description:
        "All eight Ezentech platforms are R32 inverter units. The step from 3-star (ISEER 4.35) to 5-star (ISEER 5.65) is engineered in the outdoor unit — a second condenser row and an electronic expansion valve — with DC indoor fan motors across the split range.",
      image: {
        url: "/images/products/specs/17k-5-star-inverter-split-odu.png",
        alt: "Ezentech 17K 5-Star inverter split AC outdoor unit",
      },
    },
    hero: {
      eyebrow: "Products · Inverter range",
      title: "Every platform,",
      accent: "inverter.",
      lede: "All eight models on the sheet are R32 inverter units. The difference between 3-star and 5-star is engineered in the outdoor unit — a second condenser row and an electronic expansion valve take rated ISEER from 4.35 to 5.65.",
    },
    filter: (m) => m.sheet.general.type === "Inverter",
    angle: "efficiency",
    relatedServices: ["testing", "heat-exchanger-coils", "product-development"],
    faq: [
      {
        q: "What does ISEER mean on the specification sheet?",
        a: "Indian Seasonal Energy Efficiency Ratio: cooling delivered per unit of electricity across a full Indian cooling season, as rated under the BEE star-labelling scheme. Higher is more efficient — the 5-star split models are rated 5.65, the 3-star models 4.35.",
      },
      {
        q: "What changes between a 3-star and a 5-star model?",
        a: "On the sheet, the 5-star split models carry a two-row condenser coil (805 × 23.04 × 546 mm) in the larger 900 × 360 × 600 mm outdoor cabinet and an electronic expansion valve (EEV) instead of a capillary tube. The indoor chassis, fan and compressor type are shared.",
      },
      {
        q: "Are all Ezentech models on R32?",
        a: "Yes. Every model on the current sheet uses R32, which has a lower global-warming potential than R410A and a higher volumetric capacity, so charge sizes are smaller.",
      },
    ],
  },
  {
    slug: "idu-odu",
    path: "/products/idu-odu",
    title: "Indoor & Outdoor Units (IDU/ODU)",
    navLabel: "IDU / ODU",
    short: "Indoor chassis on 830, 930 and 1100 mm platforms and outdoor cabinets in three sizes.",
    seo: {
      title: "Indoor & Outdoor Units (IDU/ODU) — Chassis Options for Brand Partners",
      description:
        "Indoor chassis on 830, 930 and 1100 mm platforms, outdoor cabinets in three sizes, matched coil, airflow and line set — IDU and ODU options Ezentech India builds for OEM/ODM brand partners.",
      image: {
        url: "/images/products/specs/18k-5-star-inverter-split-odu.png",
        alt: "Ezentech 18K 5-Star inverter split AC outdoor unit",
      },
    },
    hero: {
      eyebrow: "Products · Indoor & outdoor units",
      title: "One system.",
      accent: "Both sides, your brand.",
      lede: "Indoor chassis on 830, 930 and 1100 mm platforms; outdoor cabinets in three sizes; matched airflow, coil and line set. Choose a platform, share it across capacities, and put your fascia on it.",
    },
    filter: (m) => m.type === "split",
    angle: "pairing",
    relatedServices: ["sheet-metal", "injection-moulding", "heat-exchanger-coils", "copper-tubing"],
    faq: [
      {
        q: "Can one indoor chassis carry more than one capacity?",
        a: 'Yes — it is how the sheet is built. The 930-20" chassis carries both the 17K and 18K 3-star models, and the 1100-22" chassis carries the 18K 5-star and 22K 3-star models. One fascia tool, one wall plate, several capacities.',
      },
      {
        q: "Are indoor and outdoor units supplied as matched pairs?",
        a: "Every split model on the sheet is specified as a matched indoor and outdoor pair with its refrigerant pipe sizes and installation kit listed. Chassis-only or cabinet-only supply for a brand's own programme is an RFQ conversation.",
      },
      {
        q: "What outdoor cabinet sizes are on the sheet?",
        a: "Three: 700 × 300 × 480 mm (12K 3-star), 840 × 300 × 560 mm (17K and 18K 3-star) and 900 × 360 × 600 mm (17K 5-star, 18K 5-star and 22K 3-star), all W×H×D.",
      },
    ],
  },
];

export function getRange(slug: RangeSlug): ProductRange {
  const r = productRanges.find((x) => x.slug === slug);
  if (!r) throw new Error(`Unknown range: ${slug}`);
  return r;
}

export function rangeModels(range: ProductRange): SpecModel[] {
  return specModels.filter(range.filter);
}
