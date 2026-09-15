import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import LinkLedger from "@/components/ui/link-ledger";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import { formatDate, kindLabel, sortedArticles } from "@/data/insights/articles";
import { crumbs, getSection } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, itemListLd, webPageLd } from "@/lib/structured-data/common";

const path = "/insights";
const title = "Insights, Blog & News — AC Manufacturing Knowledge from Ezentech";
const description =
  "Technical explainers, manufacturing insight and company news from Ezentech India: how air conditioners are built, what ISEER and R32 mean for a brand, why in-house coils matter, and how NABL psychrometric testing works.";

export const metadata = buildMetadata({ title, description, path });

export default function InsightsPage() {
  const trail = crumbs(path);
  const list = sortedArticles();
  const [latest] = list;
  const insights = getSection("insights");
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description, type: "CollectionPage" }),
    itemListLd({
      name: "Ezentech India insights",
      items: list.map((a) => ({
        name: a.title,
        url: `/insights/${a.slug}`,
        description: a.description,
      })),
    }),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="Knowledge & insights"
        title="What we know,"
        accent="written down."
        lede="How an air conditioner is built, what the numbers on a specification sheet mean, and why the way it is made matters to the brand on the fascia — written to be cited."
        actions={
          <>
            <Link
              href="/insights/technical-knowledge"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Technical Knowledge
            </Link>
            <Link
              href="/insights/case-studies"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Case Studies
            </Link>
          </>
        }
      />

      <Section
        id="latest"
        labelledBy="latest-heading"
        containerClassName="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="latest-heading"
            eyebrow={`Latest · ${kindLabel[latest.kind]} · ${latest.readingMinutes} min read`}
            title={latest.title}
            accent={latest.accent}
            lede={latest.excerpt}
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <time dateTime={latest.datePublished}>{formatDate(latest.datePublished)}</time>
            {" · "}
            {latest.topics.join(" · ")}
          </p>
          <Link
            href={`/insights/${latest.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            Read the Article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <LinkLedger
          label="All articles"
          unit="articles"
          items={list.map((a) => ({
            href: `/insights/${a.slug}`,
            title: `${a.title}${a.accent ? ` ${a.accent}` : ""}`,
            description: a.excerpt,
            meta: `${kindLabel[a.kind]} · ${a.readingMinutes} min`,
          }))}
        />
      </Section>

      <Reveal as="section" id="browse" ariaLabelledBy="browse-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="browse-heading"
              eyebrow="Browse"
              title="Explainers,"
              accent="proof and the sheet."
            />
          </div>
          <div data-reveal="">
            <LinkLedger
              label="Sections"
              unit="sections"
              items={[
                ...insights.children.map((c) => ({
                  href: c.href,
                  title: c.label,
                  description: c.description,
                })),
                {
                  href: "/products/technical-specifications",
                  title: "Technical Specifications",
                  description:
                    "Every parameter from the manufacturer specification sheets, filterable by type and rating.",
                },
              ]}
            />
          </div>
        </div>
      </Reveal>

      <Cta />
    </BasicLayout>
  );
}
