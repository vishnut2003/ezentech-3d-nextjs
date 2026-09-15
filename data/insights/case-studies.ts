import type { Stat } from "@/components/ui/stat-tiles";
import { kwSpan, peakIseer, sharedChassis, splitModels } from "@/data/products/derived";
import { specModels } from "@/data/products/specs";

export interface CaseStudy {
  slug: string;
  title: string;
  accent?: string;
  segment: string;
  engagement: "OEM" | "ODM" | "Private label" | "Contract";
  brief: string;
  approach: string;
  proves: string;
  /** Spec-derived figures only. Exactly two. */
  facts: Stat[];
  relatedModels: string[];
}

const shared = sharedChassis();
const iseerLow = Math.min(...specModels.map((m) => m.sheet.general.iseer));

/**
 * Capability stories, anonymised: partners' brands are theirs to announce;
 * the engineering is Ezentech's to explain. Every figure is on the sheet.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "one-chassis-several-capacities",
    title: "One chassis,",
    accent: "several capacities.",
    segment: "Residential split range",
    engagement: "ODM",
    brief:
      "A brand partner needs a 1.5 TR-class range with two capacities and one industrial design, without paying for two fascia tools and two wall plates.",
    approach: `Both capacities were placed on shared indoor chassis: ${shared
      .map((s) => `the ${s.chassis} carries ${s.models.map((m) => m.capacityClass + " " + m.stars + "★").join(" and ")}`)
      .join("; ")}. One fascia tool, one wall plate, one packing size per chassis.`,
    proves:
      "Platform architecture is a cost lever: the indoor unit is the brand's face and the outdoor unit is where capacity and rating are set.",
    facts: [
      { value: String(shared.length), label: "Split chassis carrying two models each" },
      { value: String(splitModels().length), label: "Split models on four chassis" },
    ],
    relatedModels: shared.flatMap((s) => s.models.map((m) => m.slug)),
  },
  {
    slug: "full-r32-inverter-line-up",
    title: "A full R32 inverter line-up,",
    accent: "12K to 22K.",
    segment: "Brand range, split and window",
    engagement: "Private label",
    brief:
      "A partner wants a complete inverter range — 1.0 to 2.0 TR class, 3-star and 5-star, split and window — on one refrigerant, ready to badge.",
    approach: `The released Ezentech sheet already covers it: ${specModels.length} inverter models, ${kwSpan()} cooling capacity, rated ISEER from ${iseerLow.toFixed(2)} to ${peakIseer().toFixed(2)}, all on R32 with installation kits listed.`,
    proves:
      "A released platform range lets a private-label partner launch a full shelf without a development programme.",
    facts: [
      { value: String(specModels.length).padStart(2, "0"), label: "R32 inverter models on the sheet" },
      { value: peakIseer().toFixed(2), label: "Peak rated ISEER" },
    ],
    relatedModels: ["12k-3-star-inverter-split", "22k-3-star-inverter-split", "22k-5-star-inverter-window"],
  },
  {
    slug: "de-risking-with-an-accredited-lab",
    title: "De-risking a rating",
    accent: "with an accredited lab.",
    segment: "5-star split variant",
    engagement: "OEM",
    brief:
      "A partner's 5-star claim has to survive audit. The rated ISEER on the label must come from a defensible test, not a supplier's estimate.",
    approach:
      "Prototype and production units were run in Ezentech's NABL-accredited psychrometric laboratory for cooling capacity, power input and ISEER. The 5-star split models on the sheet are rated 5.65 with a two-row condenser and an electronic expansion valve.",
    proves:
      "An accredited laboratory inside the plant turns a rating from a claim into a measurement the partner can put in front of an auditor.",
    facts: [
      { value: "5.65", label: "Rated ISEER, 5-star split" },
      { value: "NABL", label: "Laboratory accreditation" },
    ],
    relatedModels: ["17k-5-star-inverter-split", "18k-5-star-inverter-split"],
  },
  {
    slug: "supplier-recognition-as-proof",
    title: "Supplier recognition",
    accent: "as proof.",
    segment: "Long-run brand supply",
    engagement: "OEM",
    brief:
      "A global brand grades its suppliers on quality, delivery and responsiveness, and publishes the result internally. The score is the relationship.",
    approach:
      'Ezentech was recognised by LG as a "Role Model Supplier" — earned on the line across four plants, an ISO 9001 quality system and an NABL-accredited laboratory.',
    proves:
      "Recognition from a brand Ezentech builds for is the strongest reference a new partner can check.",
    facts: [
      { value: "LG", label: '"Role Model Supplier" recognition' },
      { value: "04", label: "Plants behind the supply" },
    ],
    relatedModels: [],
  },
];
