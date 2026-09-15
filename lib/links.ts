import { SPECS_PATH } from "@/lib/structured-data/technical-specifications";

/** Deep link to one model's sheet on the technical-specifications page. */
export const specAnchor = (slug: string) => `${SPECS_PATH}#${slug}`;

/**
 * What an enquiry is about. The contact form reads these query params on the
 * client and pre-fills the product type / model of interest.
 */
export type RfqRef = { model: string } | { range: string } | { service: string };

export function rfqHref(ref?: RfqRef): string {
  if (!ref) return "/contact";
  const params = new URLSearchParams(ref as Record<string, string>);
  return `/contact?${params.toString()}`;
}
