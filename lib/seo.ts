import type { Metadata } from "next";

/**
 * Site-wide fallback share image. TODO(post-launch): replace with a
 * 1200×630 app/opengraph-image — the client has not supplied one yet.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/assets/business-logos/ezentech-logo-square.png",
  alt: "Ezentech India",
};

export interface PageMetaInput {
  /** Without the site name — the root layout template appends it. */
  title: string;
  description: string;
  /** Canonical path, relative ("/about/quality"). */
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  /** Articles only, ISO dates. */
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

/**
 * Metadata in exactly the shape the technical-specifications page ships,
 * so every inner page emits the same canonical / Open Graph / Twitter set.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      images: [image],
      ...(type === "article"
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
