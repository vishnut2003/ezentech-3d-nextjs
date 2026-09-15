import type { MetadataRoute } from "next";
import { articles } from "@/data/insights/articles";
import { allNavPaths } from "@/lib/nav";
import { absUrl } from "@/lib/site";

function priorityFor(path: string): number {
  if (path === "/") return 1;
  return path.split("/").length === 2 ? 0.8 : 0.7;
}

/** Static routes come from lib/nav.ts; articles from data/insights. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...allNavPaths().map((path) => ({
      url: absUrl(path),
      changeFrequency: "monthly" as const,
      priority: priorityFor(path),
    })),
    ...articles.map((a) => ({
      url: absUrl(`/insights/${a.slug}`),
      lastModified: a.dateModified ?? a.datePublished,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
