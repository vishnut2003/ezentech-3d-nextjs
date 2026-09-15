import type { Article } from "@/data/insights/articles";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { absUrl, ORG } from "@/lib/site";
import { organizationRef } from "./common";

export function articleLd(article: Article, path: string) {
  const url = absUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": article.kind === "technical" ? "TechArticle" : "BlogPosting",
    "@id": `${url}#article`,
    headline: `${article.title}${article.accent ? ` ${article.accent}` : ""}`,
    description: article.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: organizationRef(),
    publisher: {
      ...organizationRef(),
      logo: { "@type": "ImageObject", url: absUrl(ORG.logo) },
    },
    image: [absUrl(DEFAULT_OG_IMAGE.url)],
    articleSection: article.topics[0],
    keywords: article.topics.join(", "),
    inLanguage: "en-IN",
    isAccessibleForFree: true,
  };
}
