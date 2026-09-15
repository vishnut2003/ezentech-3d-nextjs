import type { Stat } from "@/components/ui/stat-tiles";
import type { FaqItem } from "@/lib/structured-data/common";
import { kwSpan, peakIseer } from "@/data/products/derived";
import { specModels } from "@/data/products/specs";

export type ArticleKind = "technical" | "insight" | "news";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "ul"; items: string[] }
  /** The citable one-liner an answer engine can lift verbatim. */
  | { type: "callout"; label: string; text: string }
  | { type: "stats"; items: Stat[] }
  | { type: "table"; caption: string; rows: [string, string][] };

export interface Article {
  slug: string;
  kind: ArticleKind;
  title: string;
  accent?: string;
  short?: string;
  excerpt: string;
  /** <meta name="description">, ≤160 chars. */
  description: string;
  datePublished: string;
  dateModified?: string;
  readingMinutes: number;
  topics: string[];
  /** 2 or 4. */
  keyFacts: Stat[];
  blocks: Block[];
  faq?: FaqItem[];
  related?: string[];
}

export const kindLabel: Record<ArticleKind, string> = {
  technical: "Technical",
  insight: "Insight",
  news: "News",
};

const splitCount = specModels.filter((m) => m.type === "split").length;
const windowCount = specModels.length - splitCount;

export const articles: Article[] = [
  {
    slug: "how-a-split-ac-is-manufactured",
    kind: "technical",
    title: "How a split air conditioner is manufactured",
    accent: "from coil stock to carton.",
    short: "How a split AC is made",
    excerpt:
      "Eight stages, four in-house component lines and one accredited laboratory — the route a split air conditioner takes through an Ezentech plant.",
    description:
      "How a split air conditioner is manufactured: sheet-metal chassis, fin-and-tube coil, copper tubing, moulded fascia, assembly, R32 charging and psychrometric test, stage by stage.",
    datePublished: "2026-07-14",
    readingMinutes: 7,
    topics: ["Manufacturing", "Split AC", "Backward integration"],
    keyFacts: [
      { value: "06", label: "Production stages" },
      { value: "04", label: "Component lines in-house" },
    ],
    blocks: [
      {
        type: "p",
        text: "A split air conditioner is two boxes joined by a copper line: an indoor unit that holds the evaporator coil, fan and fascia, and an outdoor unit that holds the compressor, condenser coil and expansion device. What decides whether it is a good one is how many of those parts the manufacturer actually makes.",
      },
      {
        type: "callout",
        label: "In one line",
        text: "A split AC is manufactured in six stages — sheet-metal chassis, fin-and-tube coil, copper tubing, moulded fascia, assembly with refrigerant charging, and a psychrometric performance test — and Ezentech runs all six in-house.",
      },
      { type: "h2", id: "arrives", text: "What arrives at the plant" },
      {
        type: "p",
        text: "Steel sheet, aluminium fin stock, copper tube, plastic granulate, compressors, fan motors and controls. Of these, the compressor and motors are bought in from specialist makers — the sheet lists rotary compressors and DC fan motors — while the structural and thermal parts are made on site.",
      },
      { type: "h2", id: "chassis", text: "Sheet metal: the chassis and cabinet" },
      {
        type: "p",
        text: "The outdoor cabinet is blanked, punched and bent from steel sheet: base pan, side and top panels, service panel, coil guard. Ezentech's sheet lists three outdoor cabinet sizes — 700 × 300 × 480, 840 × 300 × 560 and 900 × 360 × 600 mm — and the indoor units hang from pressed wall plates on 830, 930 and 1100 mm chassis.",
      },
      { type: "h2", id: "coil", text: "The heat-exchanger coil" },
      {
        type: "p",
        text: "Aluminium fins are pressed with a slit pattern and a collar; inner-grooved copper hairpins are laced through the fin pack and mechanically expanded so the tube locks against the collar. Return bends are brazed, and every circuit is leak-tested. Ezentech's evaporators are two rows on 7 mm tube at 21 × 12.7 mm pitch; condensers use 5 mm tube in one or two rows.",
      },
      { type: "h2", id: "copper", text: "Copper tubing and brazing" },
      {
        type: "p",
        text: "The refrigerant circuit — hairpins, manifolds and the service-valve line set — is cut, formed and brazed. Line-set sizes scale with capacity: 6.35 mm liquid on every split model, with 9.52, 12.7 or 15.88 mm gas lines from 12K to 22K.",
      },
      { type: "h2", id: "fascia", text: "Fascia and plastics" },
      {
        type: "p",
        text: "The front panel, louvres, intake grille, outlet and display bezel are injection-moulded from tools cut in the in-house tool room. Because the mould and the chassis come from the same plant, the fascia is fit-checked against the real unit rather than a drawing.",
      },
      { type: "h2", id: "assembly", text: "Assembly and R32 charging" },
      {
        type: "p",
        text: "Coil, fan, motor, controls and fascia come together on the indoor line; compressor, condenser and cabinet on the outdoor line. Circuits are evacuated and charged with R32 — the refrigerant across the whole Ezentech range — and leak-tested again at station.",
      },
      { type: "h2", id: "test", text: "The psychrometric test" },
      {
        type: "p",
        text: "Finished units run in a psychrometric laboratory that holds indoor and outdoor conditions at controlled temperature and humidity and measures cooling capacity, power input and ISEER. Ezentech's lab is NABL-accredited, so the rated figures on the sheet are produced under an accredited method.",
      },
      { type: "h2", id: "inhouse", text: 'What "in-house" changes' },
      {
        type: "ul",
        items: [
          "Tolerances travel with the part: the coil geometry printed on the sheet is the geometry that ships.",
          "Change control has one owner: a fascia revision, a cabinet change and a coil update go through one tool room.",
          "Lead time is internal: no external coil, cabinet or fascia supplier sits in the critical path.",
          "The test is the manufacturer's own: an accredited laboratory on site, not a third-party report.",
        ],
      },
    ],
    related: ["why-in-house-coils-matter", "nabl-psychrometric-testing-explained"],
  },
  {
    slug: "what-iseer-means",
    kind: "technical",
    title: "What ISEER means",
    accent: "and how to read it on a spec sheet.",
    short: "What ISEER means",
    excerpt:
      "The number on the BEE label, the test behind it, and why a 5-star unit is engineered in the outdoor unit rather than the indoor one.",
    description:
      "ISEER explained: Indian Seasonal Energy Efficiency Ratio, how it differs from EER, the BEE star bands, and why 5-star inverter units use an electronic expansion valve.",
    datePublished: "2026-07-28",
    readingMinutes: 5,
    topics: ["ISEER", "BEE star rating", "Efficiency"],
    keyFacts: [
      { value: peakIseer().toFixed(2), label: "Peak rated ISEER on the Ezentech sheet" },
      { value: "4.35 / 5.65", label: "Split 3-star / 5-star ISEER" },
    ],
    blocks: [
      {
        type: "callout",
        label: "Definition",
        text: "ISEER (Indian Seasonal Energy Efficiency Ratio) is the cooling an air conditioner delivers per unit of electricity consumed over a full Indian cooling season, as rated under the Bureau of Energy Efficiency star-labelling scheme. Higher is more efficient.",
      },
      { type: "h2", id: "eer", text: "How ISEER differs from EER" },
      {
        type: "p",
        text: "EER is a single-point ratio at one rating condition. ISEER weights performance across the temperature distribution of an Indian cooling season, so it rewards units that stay efficient at part load — which is where inverter compressors and modulating expansion devices earn their rating.",
      },
      { type: "h2", id: "bands", text: "The BEE star bands" },
      {
        type: "p",
        text: "The star on the label is set by the rated ISEER falling into a BEE band. On the Ezentech sheet the split models are rated 4.35 (3-star) and 5.65 (5-star); the window models 3.35 (3-star) and 5.20 (5-star).",
      },
      {
        type: "table",
        caption: "Rated ISEER on the Ezentech sheet",
        rows: [
          ["Split, 3-star (12K, 17K, 18K, 22K)", "4.35"],
          ["Split, 5-star (17K, 18K)", "5.65"],
          ["Window, 3-star (18K)", "3.35"],
          ["Window, 5-star (22K)", "5.20"],
        ],
      },
      { type: "h2", id: "eev", text: "Why 5-star models use an electronic expansion valve" },
      {
        type: "p",
        text: "The expansion device meters refrigerant between condenser and evaporator. A capillary tube is a fixed restrictor; an electronic expansion valve (EEV) modulates flow with load. On the Ezentech sheet the 5-star split models carry an EEV and a two-row condenser coil in the largest outdoor cabinet, while the 3-star models use a capillary and a one-row coil. The indoor chassis is shared.",
      },
      { type: "h2", id: "reading", text: "Reading it on the sheet" },
      {
        type: "ul",
        items: [
          "Look for the rated ISEER next to the cooling capacity — both come from the same psychrometric test.",
          "Check the expansion type and condenser rows: they explain the star, not just the label.",
          "Ask whether the test was run in an NABL-accredited laboratory.",
        ],
      },
    ],
    faq: [
      {
        q: "Is a higher ISEER always better?",
        a: "For running cost, yes — it means more cooling per unit of electricity over the season. The trade-off is in the outdoor unit: a larger cabinet, a two-row condenser and an EEV.",
      },
      {
        q: "Does ISEER apply to window air conditioners?",
        a: "Yes. Window models are rated on the same scheme; on the Ezentech sheet they are rated 3.35 (3-star) and 5.20 (5-star).",
      },
    ],
    related: ["nabl-psychrometric-testing-explained", "r32-vs-r410a"],
  },
  {
    slug: "r32-vs-r410a",
    kind: "technical",
    title: "R32 vs R410A",
    accent: "what changes for a brand partner.",
    short: "R32 vs R410A",
    excerpt:
      "Lower global-warming potential, higher volumetric capacity, smaller charge — and what that means for line sets, service and the label.",
    description:
      "R32 vs R410A for air conditioners: global-warming potential, volumetric capacity and charge size, line handling, and what changes for a brand partner sourcing an R32 range.",
    datePublished: "2026-08-11",
    readingMinutes: 4,
    topics: ["R32", "Refrigerant", "Sustainability"],
    keyFacts: [
      { value: "100%", label: "Of the Ezentech range on R32" },
      { value: String(specModels.length).padStart(2, "0"), label: "R32 inverter models" },
    ],
    blocks: [
      {
        type: "callout",
        label: "In one line",
        text: "R32 has a lower global-warming potential than R410A and a higher volumetric capacity, so an R32 unit needs a smaller refrigerant charge for the same cooling — which is why every model on the Ezentech sheet runs R32.",
      },
      { type: "h2", id: "gwp", text: "Global-warming potential" },
      {
        type: "p",
        text: "R410A is a blend; R32 is a single-component refrigerant with a markedly lower global-warming potential. For a brand, that is a line in the ESG report and a hedge against refrigerant regulation tightening over the product's life.",
      },
      { type: "h2", id: "charge", text: "Volumetric capacity and charge size" },
      {
        type: "p",
        text: "R32 moves more heat per unit volume of refrigerant, so the same cooling capacity needs a smaller charge. Smaller charge means less refrigerant to buy, handle and, eventually, recover.",
      },
      { type: "h2", id: "handling", text: "Line handling and service" },
      {
        type: "p",
        text: "R32 is mildly flammable (A2L), so charging, brazing and service follow the corresponding procedures. On an Ezentech line, evacuation, charging and leak testing are done at station with the circuit closed — the same discipline the line set is designed for.",
      },
      { type: "h2", id: "brand", text: "What changes for a brand partner" },
      {
        type: "ul",
        items: [
          "Nothing on the chassis: the fascia, cabinet and coil geometry are the same.",
          "The label: R32 appears on the sheet and the rating plate.",
          "Service literature: installation and service instructions reference A2L handling.",
          "Sourcing: every Ezentech platform is already R32, so no transition programme is needed.",
        ],
      },
    ],
    related: ["what-iseer-means", "how-a-split-ac-is-manufactured"],
  },
  {
    slug: "why-in-house-coils-matter",
    kind: "insight",
    title: "Why in-house coils matter",
    accent: "to the brand on the fascia.",
    short: "Why in-house coils matter",
    excerpt:
      "The coil sets the capacity, the airflow and the rating. Buying it in means inheriting someone else's tolerances — here is what to ask instead.",
    description:
      "Why an air-conditioner manufacturer should make its own heat-exchanger coils: tolerances, lead time, change control — and the questions a brand should ask a supplier.",
    datePublished: "2026-08-25",
    readingMinutes: 5,
    topics: ["Heat-exchanger coils", "Sourcing", "Backward integration"],
    keyFacts: [
      { value: "2 rows", label: "Ezentech evaporator, every model" },
      { value: "7 / 5 mm", label: "Evaporator / condenser tube" },
    ],
    blocks: [
      {
        type: "callout",
        label: "In one line",
        text: "The heat-exchanger coil determines an air conditioner's cooling capacity, airflow resistance and — with the expansion device — its ISEER; a manufacturer that makes its own coils controls the three numbers a brand is judged on.",
      },
      { type: "h2", id: "basics", text: "Fin-and-tube basics" },
      {
        type: "p",
        text: "A coil is aluminium fins on copper tubes. Fin type and pitch set the air-side surface; tube diameter, rows and circuiting set the refrigerant side. Change any of them and the capacity, the pressure drop and the fan's duty change with it.",
      },
      { type: "h2", id: "tolerances", text: "Tolerances travel with the coil" },
      {
        type: "p",
        text: "Tube expansion, fin collar contact and brazing quality are not visible on a drawing. When the coil is built in-house — as Ezentech's are — the geometry on the specification sheet is the geometry that ships, and a deviation is caught on the line rather than in a warranty claim.",
      },
      { type: "h2", id: "leadtime", text: "Lead time and change control" },
      {
        type: "p",
        text: "A coil supplier sits in the critical path of every unit. An in-house coil line removes that dependency and gives a fascia revision, a cabinet change and a coil update one owner.",
      },
      { type: "h2", id: "ask", text: "What to ask a supplier" },
      {
        type: "ul",
        items: [
          "Who makes the coil, and where?",
          "What are the fin type, tube diameter, rows and pitch on the sheet?",
          "How is every circuit leak-tested?",
          "Is the finished unit's capacity measured in the manufacturer's own accredited laboratory?",
        ],
      },
    ],
    related: ["how-a-split-ac-is-manufactured", "what-iseer-means"],
  },
  {
    slug: "nabl-psychrometric-testing-explained",
    kind: "technical",
    title: "NABL psychrometric testing,",
    accent: "explained for buyers.",
    short: "NABL testing explained",
    excerpt:
      "What a psychrometric chamber does, which parameters it measures, what NABL accreditation means and how a procurement team should use the report.",
    description:
      "NABL-accredited psychrometric testing explained: what the chamber measures (cooling capacity, power input, ISEER, airflow), what accreditation means, and how buyers use the report.",
    datePublished: "2026-09-01",
    readingMinutes: 5,
    topics: ["NABL", "Testing", "Quality assurance"],
    keyFacts: [
      { value: "NABL", label: "Ezentech laboratory accreditation" },
      { value: kwSpan(), label: "Capacity span tested across the sheet" },
    ],
    blocks: [
      {
        type: "callout",
        label: "In one line",
        text: "A psychrometric test holds indoor and outdoor conditions at set temperature and humidity and measures the cooling capacity, power input, efficiency ratio and airflow an air conditioner actually delivers; NABL accreditation certifies the laboratory's competence to make those measurements.",
      },
      { type: "h2", id: "chamber", text: "What a psychrometric chamber does" },
      {
        type: "p",
        text: "Two conditioned rooms — one for the indoor unit, one for the outdoor — are held at specified dry-bulb and wet-bulb temperatures. The unit runs at steady state while air flow, temperatures and electrical input are measured.",
      },
      { type: "h2", id: "parameters", text: "Parameters measured" },
      {
        type: "ul",
        items: [
          "Cooling capacity, in watts — 3,400 to 6,300 W across the Ezentech sheet.",
          "Power input, and from it the efficiency ratio.",
          "ISEER, the seasonal efficiency rated under the BEE scheme.",
          "Indoor airflow, in m³/h — 850 to 1,100 m³/h on the sheet.",
          "The sensible/latent split, with humidity controlled.",
        ],
      },
      { type: "h2", id: "nabl", text: "What NABL accreditation means" },
      {
        type: "p",
        text: "NABL — the National Accreditation Board for Testing and Calibration Laboratories — accredits a laboratory's competence to perform specific tests, with audits of method, equipment calibration and personnel. An accredited in-house laboratory means the manufacturer's own sheet figures are produced under that audited method.",
      },
      { type: "h2", id: "buyer", text: "How a buyer uses the report" },
      {
        type: "ul",
        items: [
          "Compare rated capacity and ISEER on the sheet with the label the brand intends to carry.",
          "Ask for the test conditions and the accreditation scope alongside the figures.",
          "Use the airflow figure to sanity-check the fascia and grille design.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Ezentech have its own psychrometric laboratory?",
        a: "Yes — an NABL-accredited psychrometric laboratory that every unit passes through before dispatch.",
      },
      {
        q: "Is a third-party test report equivalent?",
        a: "A third-party accredited report is valid for the sample tested. An accredited in-house lab lets the manufacturer test production units continuously rather than one sample.",
      },
      {
        q: "Which figures on the sheet come from the psychrometric test?",
        a: "Cooling capacity, rated ISEER and indoor airflow.",
      },
    ],
    related: ["what-iseer-means", "how-a-split-ac-is-manufactured"],
  },
  {
    slug: "oem-vs-odm-vs-private-label",
    kind: "insight",
    title: "OEM vs ODM vs private label",
    accent: "which model fits your brand.",
    short: "OEM vs ODM vs private label",
    excerpt:
      "Who owns the design, who owns the tooling, who owns the badge — and how to choose between the four ways of working with a contract manufacturer.",
    description:
      "OEM, ODM, private label and contract manufacturing compared for air conditioners: design ownership, tooling, branding and how a brand chooses the right engagement model.",
    datePublished: "2026-09-08",
    readingMinutes: 4,
    topics: ["OEM", "ODM", "Private label", "Sourcing"],
    keyFacts: [
      { value: "04", label: "Engagement models" },
      { value: `${splitCount} + ${windowCount}`, label: "Split + window platforms to start from" },
    ],
    blocks: [
      {
        type: "callout",
        label: "Definitions",
        text: "OEM: the brand owns the design and the manufacturer builds to print. ODM: the manufacturer's platform is adapted to the brand's brief. Private label: the brand's badge goes on the manufacturer's released product. Contract manufacturing: flexible-volume production to close a capacity gap.",
      },
      {
        type: "table",
        caption: "The four models at a glance",
        rows: [
          ["OEM (build to print)", "Brand owns design; manufacturer builds it"],
          ["ODM (design to production)", "Manufacturer's platform, adapted to the brief"],
          ["Private label", "Brand's badge on a released platform"],
          ["Contract manufacturing", "Flexible volume against the brand's capacity gap"],
        ],
      },
      { type: "h2", id: "design", text: "Who owns the design" },
      {
        type: "p",
        text: "In OEM the drawings are yours. In ODM the platform is the manufacturer's — on the Ezentech sheet, an 830, 930 or 1100 mm indoor chassis or the window cabinet — and the variant developed for you is what your brand carries.",
      },
      { type: "h2", id: "tooling", text: "Who owns the tooling" },
      {
        type: "p",
        text: "Fascia moulds and press tools are the usual line of ownership. OEM programmes often own their tools; ODM and private-label programmes use the manufacturer's, with a brand-specific fascia tooled for the programme. Ezentech cuts both in its own tool room.",
      },
      { type: "h2", id: "choose", text: "Choosing a model" },
      {
        type: "ul",
        items: [
          "You have a finished design and a certification file: OEM.",
          "You need a range in a segment quickly and want your own industrial design: ODM.",
          "You are a distributor or regional brand and want a proven product under your badge: private label.",
          "You have a range and a capacity gap: contract manufacturing.",
        ],
      },
    ],
    related: ["how-a-split-ac-is-manufactured", "why-in-house-coils-matter"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function relatedArticles(article: Article, n = 3): Article[] {
  const picked = (article.related ?? [])
    .map((s) => getArticle(s))
    .filter((a): a is Article => Boolean(a));
  const rest = sortedArticles().filter(
    (a) => a.slug !== article.slug && !picked.includes(a),
  );
  return [...picked, ...rest].slice(0, n);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
