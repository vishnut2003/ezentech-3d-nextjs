import Link from "next/link";
import { notFound } from "next/navigation";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import ArticleBody from "@/components/insights/article-body";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FaqList from "@/components/ui/faq-list";
import LinkLedger from "@/components/ui/link-ledger";
import PageHero from "@/components/ui/page-hero";
import { PanelHeader, PanelShell } from "@/components/ui/panel";
import Section from "@/components/ui/section";
import SectionCta from "@/components/ui/section-cta";
import SectionHeading from "@/components/ui/section-heading";
import StatTiles from "@/components/ui/stat-tiles";
import {
  articles,
  formatDate,
  getArticle,
  kindLabel,
  relatedArticles,
} from "@/data/insights/articles";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { articleLd } from "@/lib/structured-data/article";
import { breadcrumbLd, faqLd } from "@/lib/structured-data/common";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title}${article.accent ? ` ${article.accent}` : ""}`,
    description: article.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
  });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/insights/${article.slug}`;
  const trail = crumbs("/insights", { label: article.short ?? article.title, href: path });
  const headings = article.blocks.filter((b) => b.type === "h2");
  const related = relatedArticles(article);
  const jsonLd = [
    breadcrumbLd(trail),
    articleLd(article, path),
    ...(article.faq ? [faqLd(article.faq)] : []),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow={`${kindLabel[article.kind]} · ${article.readingMinutes} min read · ${formatDate(article.datePublished)}`}
        title={article.title}
        accent={article.accent}
        lede={article.excerpt}
        actions={
          <>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <Link
              href="/insights"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              All Insights
            </Link>
          </>
        }
      />

      <Section label="Article" containerClassName="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <article className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
            {" · "}
            {article.topics.join(" · ")}
          </p>
          <ArticleBody blocks={article.blocks} />
          {article.faq ? (
            <div className="mt-12">
              <FaqList label="Questions" items={article.faq} />
            </div>
          ) : null}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {headings.length ? (
            <PanelShell>
              <PanelHeader label="On this page" count={headings.length} unit="sections" />
              <ol>
                {headings.map((h, i) =>
                  h.type === "h2" ? (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="group grid grid-cols-[2.25rem_1fr] gap-3 border-t border-border px-5 py-3 text-sm transition-colors first:border-t-0 hover:bg-surface/70"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-[11px] font-medium tracking-wider text-accent/70 group-hover:text-accent"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-muted transition-colors group-hover:text-foreground">{h.text}</span>
                      </a>
                    </li>
                  ) : null,
                )}
              </ol>
            </PanelShell>
          ) : null}
          <StatTiles items={article.keyFacts} />
          <SectionCta
            text="Sourcing a range? Send the requirement and get an engineering-backed quote."
            cta={{ label: "Request a Quote", href: "/contact" }}
          />
        </aside>
      </Section>

      <Reveal as="section" ariaLabelledBy="related-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="related-heading" eyebrow="Related reading" title="Keep" accent="going." />
          </div>
          <div data-reveal="">
            <LinkLedger
              label="Related reading"
              unit="articles"
              items={related.map((a) => ({
                href: `/insights/${a.slug}`,
                title: `${a.title}${a.accent ? ` ${a.accent}` : ""}`,
                description: a.excerpt,
                meta: `${kindLabel[a.kind]} · ${a.readingMinutes} min`,
              }))}
            />
          </div>
        </div>
      </Reveal>

      <Cta />
    </BasicLayout>
  );
}
