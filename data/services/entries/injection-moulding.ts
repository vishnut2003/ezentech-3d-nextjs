import type { ServiceEntry } from "../types";

export const injectionMoulding: ServiceEntry = {
  slug: "injection-moulding",
  path: "/services/injection-moulding",
  kind: "component",
  inHouse: true,
  title: "Plastic Injection Moulding",
  navLabel: "Injection Moulding",
  short:
    "Fascias, louvres, grilles and structural plastic parts for the 830, 930 and 1100 mm chassis and the window cabinet — tooled and moulded in-house.",
  serviceType: "Plastic injection moulding of air-conditioner fascias and components",
  seo: {
    title: "Plastic Injection Moulding — AC Fascias, Louvres & Chassis Parts",
    description:
      "In-house injection moulding for indoor-unit fascias, louvres, grilles and structural plastic parts on 830, 930 and 1100 mm chassis and the 660 mm window cabinet — tooled and moulded in Ezentech India's own plants.",
  },
  hero: {
    eyebrow: "In-house component · Injection moulding",
    title: "The face of the unit,",
    accent: "moulded in-house.",
    lede: "Fascias, louvres, grilles and structural plastic parts — moulded under the same roof, so the fit to chassis and coil is engineered, not negotiated.",
  },
  intro: {
    eyebrow: "Why in-house",
    title: "Your brand's front,",
    accent: "our chassis behind it.",
    body: [
      "The fascia is the part a buyer sees and the part a brand owns. It also has to seal against the chassis, clear the louvres, hold the display bezel and pass the intake grille's airflow — dimensions that belong to the coil and fan behind it.",
      "Because the moulds are cut in Ezentech's own tool room and run on Ezentech presses, a brand-specific front can be developed against the real chassis and validated on the line, not on a drawing.",
    ],
    stats: [
      { value: "03", label: "Split fascia widths — 830, 930, 1100 mm" },
      { value: "660 mm", label: "Window cabinet width, one front" },
      { value: "In-house", label: "Tool and die room for moulds" },
      { value: "ISO 14001", label: "Environmental management system" },
    ],
    panel: {
      heading: "Parts we mould",
      unit: "parts",
      items: [
        {
          term: "Front panel and fascia",
          detail:
            "The indoor unit's outer face, tooled to the brand's industrial design and clipped to the chassis with real seam control.",
          href: "/products/split-ac",
        },
        {
          term: "Louvres and vanes",
          detail:
            "Horizontal deflector louvres and vertical vanes that steer the airflow from the outlet.",
        },
        {
          term: "Intake grille",
          detail:
            "The top-deck intake that sets the airflow into the two-row evaporator coil behind it.",
        },
        {
          term: "Air outlet and cavity",
          detail:
            "The recessed lower outlet and interior ducting that carry the indoor fan's 850–1,100 m³/h.",
        },
        {
          term: "Display bezel and control window",
          detail:
            "The display module surround, LED windows and IR receiver window on the fascia.",
        },
      ],
    },
  },
  process: {
    eyebrow: "On the line",
    title: "From industrial design",
    accent: "to moulded part.",
    steps: [
      { title: "Part design and DFM", body: "The brand's design is checked for draft, wall thickness, clip geometry and fit against the target chassis." },
      { title: "Tool build", body: "Moulds are cut and finished in the in-house tool and die room, alongside the press tools for sheet metal." },
      { title: "Sampling", body: "First-off parts are moulded and fitted to a real chassis and coil; adjustments go straight back to the tool room." },
      { title: "Production moulding", body: "Parts run on Ezentech presses in the material and finish the brand signed off." },
      { title: "Fit check on the line", body: "Fascias are fitted on the assembly line and the finished unit goes through the psychrometric test with the production front in place." },
    ],
  },
  feeds: ["idu", "window"],
  matrixFact: "Fascias, louvres, grilles for 3 split chassis and the window front",
  relatedRanges: ["split-ac", "idu-odu", "window-ac"],
  relatedServices: ["copper-tubing", "sheet-metal", "product-development"],
  faq: [
    {
      q: "Can a brand have its own fascia design?",
      a: "Yes. A brand-specific fascia is tooled in the in-house tool room and moulded on Ezentech presses to fit the 830, 930 or 1100 mm chassis, or the window front, without changing the unit behind it.",
    },
    {
      q: "Who owns the fascia tooling?",
      a: "That depends on the engagement model. In an OEM programme the partner typically owns the tool; in ODM and private-label programmes Ezentech's tooling is used. The arrangement is fixed in the RFQ.",
    },
    {
      q: "Which plastic parts are moulded in-house?",
      a: "The front panel and fascia, louvres and vanes, intake grille, air outlet and cavity, and the display bezel and control windows.",
    },
  ],
};
