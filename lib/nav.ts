import type { Crumb } from "@/components/ui/breadcrumbs";

/**
 * Single source of truth for the sitemap. Header, footer, breadcrumbs,
 * overview ledgers and app/sitemap.ts all read from here — never inline
 * another list of routes.
 */
export type NavSectionKey =
  | "about"
  | "services"
  | "products"
  | "insights"
  | "contact";

export interface NavLink {
  /** Full label ("Manufacturing & Infrastructure"). */
  label: string;
  /** Compact label for the header and breadcrumbs when the full one is long. */
  short?: string;
  href: string;
  /** One line, used by link ledgers and overview pages. */
  description: string;
}

export interface NavSection extends NavLink {
  key: NavSectionKey;
  /** PageHero eyebrow prefix for pages in this section. */
  eyebrow: string;
  /** Sub-pages, excluding the section index itself. */
  children: NavLink[];
  /** Three verified facts shown in the mega menu's featured column. */
  highlights: string[];
  /** Label for the section-index link inside the mega menu. */
  overviewLabel: string;
}

export const NAV: readonly NavSection[] = [
  {
    key: "about",
    label: "Get to Know Ezentech",
    short: "About",
    href: "/about",
    eyebrow: "About Ezentech",
    description:
      "Company story, 20-year legacy, scale, vision and what sets Ezentech apart.",
    highlights: ["4 plants", "1M units / year", "20+ years"],
    overviewLabel: "Get to Know Ezentech",
    children: [
      {
        label: "Manufacturing & Infrastructure",
        short: "Manufacturing",
        href: "/about/manufacturing",
        description:
          "Four plants, one-million-unit annual capacity and the in-house lines behind them.",
      },
      {
        label: "Quality, Certifications & Sustainability",
        short: "Quality",
        href: "/about/quality",
        description:
          "NABL-accredited testing, ISO 9001 and 14001, BIS-certified ranges and responsible manufacturing.",
      },
      {
        label: "Leadership & Our Journey",
        short: "Leadership",
        href: "/about/leadership",
        description:
          "The functions a partner works with and the capability stages that built the company.",
      },
    ],
  },
  {
    key: "services",
    label: "Services & Capabilities",
    short: "Services",
    href: "/services",
    eyebrow: "Services & capabilities",
    description:
      "Manufacturing services and in-house components at a glance — the full capability map.",
    highlights: ["OEM · ODM · Private label", "4 components in-house", "NABL lab"],
    overviewLabel: "Services Overview",
    children: [
      {
        label: "OEM, ODM, Private Label & Contract Manufacturing",
        short: "OEM / ODM",
        href: "/services/oem-odm",
        description:
          "Build-to-print OEM, design-to-production ODM, private label and flexible-volume contract manufacturing.",
      },
      {
        label: "Heat Exchanger Coils",
        href: "/services/heat-exchanger-coils",
        description:
          "Evaporator and condenser coils built in-house — fin, tube, geometry and capacity.",
      },
      {
        label: "Sheet Metal Fabrication",
        short: "Sheet Metal",
        href: "/services/sheet-metal",
        description:
          "Outdoor cabinets, indoor chassis and mounting hardware pressed on our own lines.",
      },
      {
        label: "Plastic Injection Moulding",
        short: "Injection Moulding",
        href: "/services/injection-moulding",
        description:
          "Fascias, louvres, grilles and structural plastic parts moulded under the same roof.",
      },
      {
        label: "Copper Tubing & Tooling",
        short: "Copper Tubing",
        href: "/services/copper-tubing",
        description:
          "Inner-grooved coil tube, refrigerant line sets and an in-house tool & die room.",
      },
      {
        label: "R&D & Product Development",
        short: "Product Development",
        href: "/services/product-development",
        description:
          "Platform architecture, thermal design, prototyping and lab validation for ODM partners.",
      },
      {
        label: "Testing & Quality Assurance",
        short: "Testing",
        href: "/services/testing",
        description:
          "The NABL-accredited psychrometric lab and the test protocol every unit passes through.",
      },
    ],
  },
  {
    key: "products",
    label: "Products",
    href: "/products",
    eyebrow: "Products",
    description:
      "Inverter split and window air conditioners from 1.0 TR, 3-star and 5-star, all on R32.",
    highlights: ["8 inverter platforms", "3-star & 5-star", "100% R32"],
    overviewLabel: "Products Overview",
    children: [
      {
        label: "Split Air Conditioners",
        short: "Split AC",
        href: "/products/split-ac",
        description:
          "Six R32 inverter split models, 12K to 22K, on four indoor chassis platforms.",
      },
      {
        label: "Window Air Conditioners",
        short: "Window AC",
        href: "/products/window-ac",
        description:
          "Two R32 inverter window models — 18K 3-star and 22K 5-star — in one cabinet.",
      },
      {
        label: "Inverter AC Range",
        short: "Inverter Range",
        href: "/products/inverter-ac",
        description:
          "Every platform is inverter-driven; how 3-star becomes 5-star, ISEER 4.35 to 5.65.",
      },
      {
        label: "Indoor & Outdoor Units (IDU/ODU)",
        short: "IDU / ODU",
        href: "/products/idu-odu",
        description:
          "Indoor chassis on 830, 930 and 1100 mm platforms and outdoor cabinets in three sizes.",
      },
      {
        label: "Technical Specifications",
        href: "/products/technical-specifications",
        description:
          "Every parameter from the manufacturer specification sheets, filterable by type and rating.",
      },
    ],
  },
  {
    key: "insights",
    label: "Insights, Blog & News",
    short: "Insights",
    href: "/insights",
    eyebrow: "Knowledge & insights",
    description:
      "Technical explainers, manufacturing insight and company news.",
    highlights: ["Technical explainers", "Glossary", "Case studies"],
    overviewLabel: "All Insights",
    children: [
      {
        label: "Technical Knowledge — How AC Manufacturing Works",
        short: "Technical Knowledge",
        href: "/insights/technical-knowledge",
        description:
          "How an air conditioner is built, stage by stage, with a glossary of the terms on a spec sheet.",
      },
      {
        label: "Case Studies",
        href: "/insights/case-studies",
        description:
          "Capability stories from OEM/ODM programmes — the engineering, with partners anonymised.",
      },
    ],
  },
  {
    key: "contact",
    label: "Contact Us",
    short: "Contact",
    href: "/contact",
    eyebrow: "Contact",
    description: "Registered office, routing and the request-for-quotation form.",
    highlights: ["Greater Noida", "RFQ form", "Routing"],
    overviewLabel: "Contact Us",
    children: [],
  },
];

export const PRIMARY_ACTIONS = {
  specs: {
    label: "Technical Specs",
    href: "/products/technical-specifications",
    description: "Every parameter from the manufacturer specification sheets.",
  },
  quote: {
    label: "Get a Quote",
    href: "/contact",
    description: "Send your requirement and get a structured, engineering-backed quote.",
  },
} as const satisfies Record<string, NavLink>;

const HOME: NavLink = {
  label: "Home",
  href: "/",
  description: "Ezentech India — OEM/ODM air-conditioner manufacturing.",
};

export function getSection(key: NavSectionKey): NavSection {
  const section = NAV.find((s) => s.key === key);
  if (!section) throw new Error(`Unknown nav section: ${key}`);
  return section;
}

export function getNavLink(href: string): NavLink | undefined {
  if (href === "/") return HOME;
  for (const section of NAV) {
    if (section.href === href) return section;
    const child = section.children.find((c) => c.href === href);
    if (child) return child;
  }
  return undefined;
}

/**
 * Breadcrumb trail from hrefs. Home is prepended automatically; labels are
 * resolved from NAV (compact label preferred). Pass a `{label, href}` object
 * for pages that are not in NAV, such as individual articles.
 */
export function crumbs(...items: (string | Crumb)[]): Crumb[] {
  const trail: Crumb[] = [{ label: HOME.label, href: HOME.href }];
  for (const item of items) {
    if (typeof item !== "string") {
      trail.push(item);
      continue;
    }
    const link = getNavLink(item);
    if (!link) throw new Error(`crumbs(): "${item}" is not in NAV`);
    trail.push({ label: link.short ?? link.label, href: link.href });
  }
  return trail;
}

/** Every static route in the sitemap, deduped, home first. */
export function allNavPaths(): string[] {
  const paths = new Set<string>(["/"]);
  for (const section of NAV) {
    paths.add(section.href);
    for (const child of section.children) paths.add(child.href);
  }
  return Array.from(paths);
}
