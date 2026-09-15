import type { FaqItem } from "@/lib/structured-data/common";

export interface Certification {
  id: "nabl" | "iso-9001" | "iso-14001" | "bis";
  label: string;
  fullName: string;
  covers: string;
  buyerValue: string;
}

export const certifications: Certification[] = [
  {
    id: "nabl",
    label: "NABL",
    fullName: "NABL-accredited psychrometric laboratory",
    covers:
      "Accredited competence of Ezentech's own laboratory to measure air-conditioner performance — cooling capacity, power input, ISEER — under controlled temperature and humidity.",
    buyerValue: "The rated figures on the sheet come from an accredited, audited method, not a supplier's estimate.",
  },
  {
    id: "iso-9001",
    label: "ISO 9001",
    fullName: "ISO 9001 quality management system",
    covers:
      "Documented processes, in-line inspection, corrective action and internal audit across the plants.",
    buyerValue: "A repeatable process behind every unit, with a paper trail a brand's own auditors can follow.",
  },
  {
    id: "iso-14001",
    label: "ISO 14001",
    fullName: "ISO 14001 environmental management system",
    covers:
      "Environmental aspects of manufacturing — refrigerant handling, waste, energy — managed under a system with continual-improvement obligations.",
    buyerValue: "Responsible-manufacturing evidence for a brand's own ESG reporting.",
  },
  {
    id: "bis",
    label: "BIS",
    fullName: "BIS product certification",
    covers: "Product certification for the air-conditioner ranges Ezentech manufactures for brand partners.",
    buyerValue: "Ranges that are certified for the Indian market before a brand puts its badge on them.",
  },
];

export const responsibleManufacturing = [
  {
    title: "Environmental management system",
    body: "The plants operate under ISO 14001 — environmental aspects identified, controlled and audited, with continual-improvement obligations rather than one-off claims.",
  },
  {
    title: "Lower-GWP refrigerant",
    body: "Every model on the sheet runs R32, which has a lower global-warming potential than R410A and a higher volumetric capacity, so charge sizes are smaller.",
  },
  {
    title: "Efficiency on the label",
    body: "Inverter platforms rated up to ISEER 5.65 in Ezentech's own accredited lab — energy efficiency measured, not asserted.",
  },
];

export const recognition = { by: "LG", title: "Role Model Supplier" };

export const qualityFaq: FaqItem[] = [
  {
    q: "What does NABL accreditation mean for a buyer?",
    a: "NABL accredits a laboratory's competence to carry out specific tests. Ezentech's psychrometric lab is accredited, so the cooling capacity, power input and ISEER figures on its sheets are measured under an accredited, audited method.",
  },
  {
    q: "Which ISO standards does Ezentech operate under?",
    a: "ISO 9001 for quality management and ISO 14001 for environmental management.",
  },
  {
    q: "Are Ezentech's product ranges BIS-certified?",
    a: "Yes — Ezentech manufactures BIS-certified air-conditioner ranges for brand partners.",
  },
  {
    q: "Which refrigerant do Ezentech units use?",
    a: "R32, across every model on the current specification sheet.",
  },
  {
    q: "Can I get copies of the certificates?",
    a: "Yes. Certificates and test documentation for a programme are shared during the RFQ process — ask for them in your enquiry.",
  },
];
