import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

/** Only routes that exist today; extend as sections ship. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absUrl("/"), changeFrequency: "monthly", priority: 1 },
    {
      url: absUrl("/products/technical-specifications"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
