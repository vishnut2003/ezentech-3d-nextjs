import { iseerByStarGroups } from "@/data/products/derived";
import type { ServiceEntry } from "../types";

export const testing: ServiceEntry = {
  slug: "testing",
  path: "/services/testing",
  kind: "capability",
  inHouse: true,
  title: "Testing & Quality Assurance",
  navLabel: "Testing",
  short:
    "An NABL-accredited psychrometric laboratory measures cooling capacity, power input and ISEER; ISO 9001, ISO 14001 and BIS complete the quality file.",
  serviceType: "Air-conditioner performance testing and quality assurance",
  seo: {
    title: "Testing & Quality Assurance — NABL-Accredited Psychrometric Lab",
    description:
      "An NABL-accredited psychrometric laboratory tests cooling capacity, power input and ISEER the way the BEE star label demands; ISO 9001, ISO 14001 and BIS-certified ranges complete the quality file for brand partners.",
  },
  hero: {
    eyebrow: "Capability · Testing & quality assurance",
    title: "The lab,",
    accent: "on camera.",
    lede: "Few manufacturers can show a psychrometric laboratory of their own, let alone an NABL-accredited one. Ezentech tests what it builds — cooling capacity, power input, ISEER — and hands the result to the partner.",
    secondaryAction: { label: "What the Lab Measures", href: "#lab" },
  },
  intro: {
    eyebrow: "The quality file",
    title: "Tested like it ships.",
    accent: "Certified like it matters.",
    body: [
      "A procurement head buying an air conditioner for their brand is really buying a number: the rated ISEER on the label. That number comes from a psychrometric test, and an NABL-accredited laboratory is what makes it defensible.",
      "Ezentech runs that laboratory itself, inside an ISO 9001 quality system and an ISO 14001 environmental system, and manufactures BIS-certified product ranges.",
    ],
    stats: [
      { value: "NABL", label: "Accredited psychrometric laboratory" },
      { value: "ISO 9001", label: "Quality management system" },
      { value: "ISO 14001", label: "Environmental management system" },
      { value: "BIS", label: "Certified product ranges" },
    ],
    panel: {
      heading: "Credentials, and what each covers",
      unit: "credentials",
      items: [
        {
          term: "NABL accreditation",
          detail:
            "Accredited competence of the psychrometric laboratory to measure air-conditioner performance — the basis for a rated capacity and ISEER a buyer can rely on.",
        },
        {
          term: "ISO 9001",
          detail:
            "The quality management system the plants operate under: documented processes, in-line checks, corrective action and audit.",
        },
        {
          term: "ISO 14001",
          detail:
            "The environmental management system behind responsible manufacturing — from refrigerant handling to waste and energy use.",
          href: "/about/quality",
        },
        {
          term: "BIS certification",
          detail:
            "Product certification for the ranges Ezentech manufactures for brand partners.",
        },
        {
          term: 'LG "Role Model Supplier"',
          detail:
            "Supplier recognition from a brand Ezentech builds for — earned on the line, not the letterhead.",
          href: "/about/quality",
        },
      ],
    },
  },
  process: {
    eyebrow: "Test protocol",
    title: "Five checkpoints",
    accent: "before dispatch.",
    steps: [
      { title: "Incoming component checks", body: "Coils, compressors, fan motors and moulded parts are checked against specification before they reach the line." },
      { title: "In-line quality control", body: "Assembly, brazing and charging are inspected at station; leak tests close every refrigerant circuit." },
      { title: "Psychrometric performance test", body: "Cooling capacity, power input and ISEER measured under controlled temperature and humidity in the NABL-accredited lab." },
      { title: "Electrical and safety test", body: "Insulation, earth continuity and functional checks on every unit." },
      { title: "Pre-dispatch audit", body: "Finished, packed units audited against the sheet and the partner's requirement before they leave the plant." },
    ],
  },
  facts: {
    id: "iseer",
    caption: "Rated ISEER on the sheet, by star rating",
    groups: iseerByStarGroups(),
  },
  photo: {
    src: "/images/services/testing/psychrometric-lab.jpg",
    alt: "NABL-accredited psychrometric laboratory with a split air conditioner under test",
    caption: "NABL-accredited psychrometric laboratory · Greater Noida",
    figure: "01",
    aspect: "16/9",
  },
  feeds: ["idu", "odu", "window"],
  matrixFact: "NABL psychrometric lab · ISO 9001 / 14001 · BIS",
  relatedRanges: ["inverter-ac", "split-ac"],
  relatedServices: ["product-development", "heat-exchanger-coils", "oem-odm"],
  faq: [
    {
      q: "What is NABL accreditation?",
      a: "NABL (National Accreditation Board for Testing and Calibration Laboratories) accredits a laboratory's competence to carry out specific tests. For Ezentech's psychrometric lab it means the capacity and ISEER measurements are made under an accredited, audited method.",
    },
    {
      q: "What does a psychrometric test measure?",
      a: "With indoor and outdoor conditions held at controlled temperature and humidity, the test measures the unit's cooling capacity, its power input and the resulting efficiency ratio, and the airflow delivered — the figures printed on the specification sheet and the BEE label.",
    },
    {
      q: "What is the difference between a 3-star and a 5-star unit?",
      a: "The BEE star band is set by rated ISEER. On the Ezentech sheet, 3-star split models are rated 4.35 and 5-star models 5.65; window models are rated 3.35 (3-star) and 5.20 (5-star).",
    },
    {
      q: "Are test results shared with brand partners?",
      a: "Performance results for a partner's programme are part of the engagement; how they are reported is agreed in the RFQ.",
    },
  ],
};
