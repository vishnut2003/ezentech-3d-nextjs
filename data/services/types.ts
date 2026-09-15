import type { Stat } from "@/components/ui/stat-tiles";
import type { Photo } from "@/components/ui/photo-slot";
import type { SpecGroup } from "@/data/products/specs";
import type { FaqItem } from "@/lib/structured-data/common";
import type { RangeSlug } from "@/data/products/ranges";

export type ServiceSlug =
  | "oem-odm"
  | "heat-exchanger-coils"
  | "sheet-metal"
  | "injection-moulding"
  | "copper-tubing"
  | "product-development"
  | "testing";

export type UnitFeed = "idu" | "odu" | "window";

export interface ServiceStep {
  title: string;
  body: string;
}

export interface PanelItem {
  term: string;
  detail: string;
  href?: string;
}

export interface ServiceEntry {
  slug: ServiceSlug;
  path: `/services/${ServiceSlug}`;
  /** Pill on the overview ledger. */
  kind: "service" | "component" | "capability";
  inHouse: boolean;
  title: string;
  navLabel: string;
  short: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  seo: { title: string; description: string; image?: { url: string; alt: string } };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    secondaryAction?: { label: string; href: string };
  };
  intro: {
    eyebrow: string;
    title: string;
    accent?: string;
    body: string[];
    /** Exactly four — a 2×2 grid never leaves an orphan. */
    stats: Stat[];
    panel: { heading: string; unit: string; items: PanelItem[] };
  };
  process: { eyebrow: string; title: string; accent?: string; steps: ServiceStep[] };
  /** Sheet-verified table, rendered through SheetFactsPanel. */
  facts?: { id: string; caption: string; groups: SpecGroup[]; note?: string };
  photo?: Photo & { figure: string; aspect?: "16/9" | "16/10" | "4/3" | "3/2" };
  feeds: UnitFeed[];
  /** One line for the capability matrix on /services. */
  matrixFact: string;
  relatedRanges: RangeSlug[];
  relatedServices: ServiceSlug[];
  faq: FaqItem[];
}
