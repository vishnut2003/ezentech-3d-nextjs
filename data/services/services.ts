import { copperTubing } from "./entries/copper-tubing";
import { heatExchangerCoils } from "./entries/heat-exchanger-coils";
import { injectionMoulding } from "./entries/injection-moulding";
import { oemOdm } from "./entries/oem-odm";
import { productDevelopment } from "./entries/product-development";
import { sheetMetal } from "./entries/sheet-metal";
import { testing } from "./entries/testing";
import type { ServiceEntry, ServiceSlug } from "./types";

export type { ServiceEntry, ServiceSlug } from "./types";

/** Sheet order: the manufacturing offer, the four in-house components, then the two capabilities. */
export const services: readonly ServiceEntry[] = [
  oemOdm,
  heatExchangerCoils,
  sheetMetal,
  injectionMoulding,
  copperTubing,
  productDevelopment,
  testing,
];

export function getService(slug: ServiceSlug): ServiceEntry {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}

export const inHouseComponents = () => services.filter((s) => s.kind === "component");
