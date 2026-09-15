import type { Stat } from "@/components/ui/stat-tiles";

/** Verified company facts only — nothing here is invented. */
export const companyStats: Stat[] = [
  { value: "04", label: "Manufacturing plants" },
  { value: "1M", label: "Units of annual capacity" },
  { value: "20+ yrs", label: "OEM / ODM manufacturing" },
  { value: "NABL", label: "Accredited psychrometric lab" },
];

export const engagementModels = [
  "OEM",
  "ODM",
  "Private label",
  "Contract manufacturing",
];

export const differentiators = [
  {
    title: "Backward integration",
    body: "Heat-exchanger coils, sheet-metal chassis and cabinets, injection-moulded fascias and copper tubing are made on Ezentech's own lines. One supplier, one change-control loop.",
    tag: "Coil → chassis",
    href: "/services",
  },
  {
    title: "Scale",
    body: "Four plants with one-million-unit annual capacity — enough for a brand partner to plan a season around.",
    tag: "4 plants · 1M units",
    href: "/about/manufacturing",
  },
  {
    title: "In-house testing",
    body: "An NABL-accredited psychrometric laboratory measures cooling capacity, power input and ISEER on Ezentech's own units.",
    tag: "NABL lab",
    href: "/services/testing",
  },
  {
    title: "Systems and standards",
    body: "ISO 9001 quality management, ISO 14001 environmental management and BIS-certified product ranges.",
    tag: "ISO 9001 · 14001 · BIS",
    href: "/about/quality",
  },
  {
    title: "Recognition",
    body: 'LG "Role Model Supplier" — supplier recognition from a brand Ezentech builds for.',
    tag: "LG",
    href: "/about/quality",
  },
  {
    title: "Flexible engagement",
    body: "Build-to-print OEM, design-to-production ODM, private label and flexible-volume contract manufacturing on the same plants and lab.",
    tag: "4 models",
    href: "/services/oem-odm",
  },
];

export const group = {
  name: "Nidhi group",
  note: "Ezentech India is part of the Nidhi group, a manufacturing group whose discipline in supplying established brands is the foundation Ezentech builds on.",
};
