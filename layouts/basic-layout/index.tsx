import { formatDate, kindLabel, sortedArticles } from "@/data/insights/articles";
import Header from "./header";
import Footer from "./footer";

/** Only the latest article's summary reaches the client for the mega menu. */
function latestArticleSpotlight() {
  const [a] = sortedArticles();
  if (!a) return undefined;
  return {
    href: `/insights/${a.slug}`,
    title: `${a.title}${a.accent ? ` ${a.accent}` : ""}`,
    meta: `${kindLabel[a.kind]} · ${a.readingMinutes} min · ${formatDate(a.datePublished)}`,
    excerpt: a.excerpt,
  };
}

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header latestArticle={latestArticleSpotlight()} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
