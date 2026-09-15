import type { Crumb } from "@/components/ui/breadcrumbs";
import { absUrl, ORG, SITE_NAME } from "@/lib/site";

/**
 * Shared JSON-LD builders. Plain objects, same style as
 * technical-specifications.ts — no schema-dts dependency.
 */
const CONTEXT = "https://schema.org";

export const ORG_ID = absUrl("/#organization");
export const WEBSITE_ID = absUrl("/#website");

export function organizationRef() {
  return { "@type": "Organization", "@id": ORG_ID, name: ORG.name };
}

export function organizationLd(extra?: { description?: string; award?: string[] }) {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORG.name,
    legalName: ORG.legalName,
    url: absUrl("/"),
    logo: { "@type": "ImageObject", url: absUrl(ORG.logo) },
    address: { "@type": "PostalAddress", ...ORG.address },
    ...(extra?.description ? { description: extra.description } : {}),
    ...(extra?.award ? { award: extra.award } : {}),
  };
}

export function websiteLd() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: absUrl("/"),
    publisher: organizationRef(),
    inLanguage: "en-IN",
  };
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absUrl(c.href),
    })),
  };
}

export type WebPageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage";

export function webPageLd(input: {
  path: string;
  title: string;
  description: string;
  type?: WebPageType;
  dateModified?: string;
}) {
  return {
    "@context": CONTEXT,
    "@type": input.type ?? "WebPage",
    "@id": absUrl(`${input.path}#webpage`),
    url: absUrl(input.path),
    name: input.title,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: organizationRef(),
    inLanguage: "en-IN",
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function contactPageLd(input: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    ...webPageLd({ ...input, type: "ContactPage" }),
    mainEntity: organizationRef(),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqLd(items: FaqItem[]) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function itemListLd(input: {
  name: string;
  items: { name: string; url: string; description?: string }[];
}) {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name: input.name,
    numberOfItems: input.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absUrl(item.url),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function serviceLd(input: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    "@id": absUrl(`${input.path}#service`),
    url: absUrl(input.path),
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: organizationRef(),
    areaServed: input.areaServed ?? "IN",
  };
}

export function definedTermSetLd(input: {
  path: string;
  name: string;
  terms: { id: string; term: string; definition: string }[];
}) {
  const setId = absUrl(`${input.path}#glossary`);
  return {
    "@context": CONTEXT,
    "@type": "DefinedTermSet",
    "@id": setId,
    name: input.name,
    hasDefinedTerm: input.terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": absUrl(`${input.path}#${t.id}`),
      name: t.term,
      description: t.definition,
      inDefinedTermSet: setId,
    })),
  };
}
