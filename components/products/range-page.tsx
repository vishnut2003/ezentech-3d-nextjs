import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FaqList from "@/components/ui/faq-list";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import SectionCta from "@/components/ui/section-cta";
import SectionHeading from "@/components/ui/section-heading";
import type { Stat } from "@/components/ui/stat-tiles";
import { rangeModels, type ProductRange } from "@/data/products/ranges";
import { rfqHref } from "@/lib/links";
import { crumbs } from "@/lib/nav";
import {
  breadcrumbLd,
  faqLd,
  itemListLd,
  webPageLd,
} from "@/lib/structured-data/common";
import { productLd, SPECS_PATH } from "@/lib/structured-data/technical-specifications";
import RangeModelList from "./range-model-list";
import RangeStats from "./range-stats";
import RelatedServices from "./related-services";

/**
 * Composer for the four range pages. The `angle` slot is the one bespoke
 * section each range brings; everything else is shared.
 */
export default function RangePage({
  range,
  stats,
  statsHeading,
  angle,
  listProps,
}: {
  range: ProductRange;
  stats?: Stat[];
  statsHeading: { title: React.ReactNode; accent?: React.ReactNode; lede: React.ReactNode };
  angle: React.ReactNode;
  listProps?: Partial<React.ComponentProps<typeof RangeModelList>>;
}) {
  const models = rangeModels(range);
  const trail = crumbs("/products", range.path);
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({
      path: range.path,
      title: range.seo.title,
      description: range.seo.description,
      type: "CollectionPage",
    }),
    {
      ...itemListLd({ name: `${range.title} — Ezentech India`, items: [] }),
      numberOfItems: models.length,
      itemListElement: models.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: productLd(m),
      })),
    },
    faqLd(range.faq),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow={range.hero.eyebrow}
        title={range.hero.title}
        accent={range.hero.accent}
        lede={range.hero.lede}
        actions={
          <>
            <Link
              href={rfqHref({ range: range.slug })}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <Link
              href={SPECS_PATH}
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Full Specifications
            </Link>
          </>
        }
      />

      <RangeStats models={models} stats={stats} {...statsHeading} />

      <Reveal as="section" id="models" ariaLabelledBy="models-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionHeading
            id="models-heading"
            eyebrow="On the sheet"
            title="Every model,"
            accent="one line each."
            lede="Headline figures from the manufacturer sheet. Open the full sheet for coil geometry, fan motors and packing dimensions, or ask for a quote on that exact model."
            className="mb-10"
          />
          <div data-reveal="">
            <RangeModelList models={models} {...listProps} />
          </div>
        </div>
      </Reveal>

      {angle}

      <Reveal as="section" ariaLabelledBy="related-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="related-heading"
              eyebrow="Backward integration"
              title="Made in-house,"
              accent="in every unit."
              lede="The components behind this range are built on Ezentech's own lines — which is why fit, lead time and change control stay ours to manage."
            />
          </div>
          <div data-reveal="">
            <RelatedServices slugs={range.relatedServices} />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="faq" ariaLabelledBy="faq-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="faq-heading"
              eyebrow="Buyer questions"
              title="Before you"
              accent="write the RFQ."
            />
          </div>
          <div data-reveal="">
            <FaqList label="Frequently asked" items={range.faq} />
          </div>
        </div>
      </Reveal>

      <Section label="Enquire">
        <SectionCta
          text={`Need a variant that is not on the sheet — a different fascia, a fixed-speed platform, one chassis across several capacities? Send the requirement and we will come back with a production plan.`}
          cta={{ label: "Request a Quote", href: rfqHref({ range: range.slug }) }}
          secondary={{ label: "Technical Specifications", href: SPECS_PATH }}
        />
      </Section>

      <Cta />
    </BasicLayout>
  );
}
