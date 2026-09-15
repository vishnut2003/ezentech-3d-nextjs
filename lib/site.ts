/**
 * Site-wide constants for metadata and structured data.
 * NEXT_PUBLIC_SITE_URL must be set before launch — the fallback is a
 * placeholder so local builds and previews still produce absolute URLs.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ezentech.in"
).replace(/\/$/, "");

export const SITE_NAME = "Ezentech India";

export const ORG = {
  name: "Ezentech India",
  legalName: "Ezentech India Pvt. Ltd.",
  logo: "/assets/business-logos/ezentech-logo-square.png",
  address: {
    streetAddress: "Plot No. 16, Ecotech III, Tusyana",
    addressLocality: "Greater Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201318",
    addressCountry: "IN",
  },
} as const;

/**
 * Public contact channels. Both are unverified today, so they stay
 * undefined and the contact page renders only the postal address until the
 * client supplies them.
 */
export const CONTACT: { email?: string; phone?: string } = {
  email: undefined,
  phone: undefined,
};

export function absUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
