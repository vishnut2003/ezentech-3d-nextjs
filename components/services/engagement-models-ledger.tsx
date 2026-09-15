import LedgerTable, { type LedgerRow } from "@/components/ui/ledger-table";

const columns = [
  { key: "oem", label: "OEM · build-to-print" },
  { key: "odm", label: "ODM · design-to-production" },
  { key: "pl", label: "Private label" },
  { key: "cm", label: "Contract manufacturing" },
];

/** Qualitative comparison of the four engagement models — no numbers, no claims beyond the offer. */
const rows: LedgerRow[] = [
  {
    id: "design",
    label: "Design ownership",
    cells: {
      oem: "Yours — we build to your print.",
      odm: "Ezentech platform, adapted to your brief.",
      pl: "Ezentech platform, as released.",
      cm: "Yours or ours, agreed per line.",
    },
  },
  {
    id: "platform",
    label: "Product platform",
    cells: {
      oem: "Your drawings on our lines.",
      odm: "Sheet chassis — 830, 930, 1100 mm or window.",
      pl: "Sheet chassis, current models.",
      cm: "Agreed per programme.",
    },
  },
  {
    id: "tooling",
    label: "Tooling and moulds",
    cells: {
      oem: "Your tools, or cut in our tool room.",
      odm: "Ours; fascia tooled to your design.",
      pl: "Existing Ezentech tooling.",
      cm: "As the programme requires.",
    },
  },
  {
    id: "components",
    label: "Components",
    cells: {
      oem: "In-house coil, chassis, fascia and tubing to your BOM.",
      odm: "In-house, specified by our product development.",
      pl: "In-house, standard specification.",
      cm: "In-house, or partner-supplied where agreed.",
    },
  },
  {
    id: "branding",
    label: "Branding and fascia",
    cells: {
      oem: "Your fascia, your badge.",
      odm: "Your industrial design on our chassis.",
      pl: "Your badge on our fascia.",
      cm: "Per contract.",
    },
  },
  {
    id: "volume",
    label: "Volume",
    cells: {
      oem: "Programme volumes, planned by season.",
      odm: "Programme volumes, planned by season.",
      pl: "Agreed per engagement.",
      cm: "Flexible against your capacity gap.",
    },
  },
  {
    id: "testing",
    label: "Testing and certification",
    cells: {
      oem: "NABL lab; certification file as agreed.",
      odm: "NABL lab; BIS-certified ranges.",
      pl: "BIS-certified ranges.",
      cm: "NABL lab on every unit.",
    },
  },
  {
    id: "best",
    label: "Best for",
    cells: {
      oem: "Brands with an established design.",
      odm: "Brands entering a segment fast.",
      pl: "Distributors and regional brands.",
      cm: "Brands adding capacity to their own.",
    },
  },
];

export default function EngagementModelsLedger({ id = "engagement-models" }: { id?: string }) {
  return (
    <LedgerTable
      id={id}
      caption="Four engagement models"
      unit="dimensions"
      columns={columns}
      rows={rows}
      numbered={false}
    />
  );
}
