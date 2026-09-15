import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import RangeModelList from "@/components/products/range-model-list";
import RangeNav from "@/components/products/range-nav";
import RangeStats from "@/components/products/range-stats";
import RelatedServices from "@/components/products/related-services";
import JsonLd from "@/components/seo/json-ld";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import SectionCta from "@/components/ui/section-cta";
import SectionHeading from "@/components/ui/section-heading";
import { productRanges } from "@/data/products/ranges";
import { specModels } from "@/data/products/specs";
import { rfqHref } from "@/lib/links";
import { crumbs, getSection } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, itemListLd, webPageLd } from "@/lib/structured-data/common";
import { SPECS_PATH } from "@/lib/structured-data/technical-specifications";

const path = "/products";
const title = "Products — Inverter Split, Window and IDU/ODU Air Conditioners";
const description =
  "Ezentech India's air-conditioner range for OEM/ODM partners: six inverter split and two inverter window models from 1.0 TR, 3-star and 5-star, all on R32 — browse by format, efficiency or unit, or open the full specification sheet.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  image: {
    url: "/images/products/specs/18k-5-star-inverter-split-idu.png",
    alt: "Ezentech 18K 5-Star inverter split AC indoor unit",
  },
});

export default function ProductsPage() {
  const trail = crumbs(path);
  const section = getSection("products");
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description, type: "CollectionPage" }),
    itemListLd({
      name: "Ezentech India product range",
      items: section.children.map((c) => ({
        name: c.label,
        url: c.href,
        description: c.description,
      })),
    }),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="Products"
        title="Eight platforms."
        accent="Four ways in."
        lede="Inverter split and window air conditioners from 1.0 TR, 3-star and 5-star, all on R32 — built for your brand. Browse by format, by efficiency or by unit, or go straight to the specification sheet."
        actions={
          <>
            <Link
              href={SPECS_PATH}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Technical Specifications
            </Link>
            <Link
              href={rfqHref()}
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Request a Quote
            </Link>
          </>
        }
      />

      <RangeStats
        models={[...specModels]}
        title="Built complete."
        accent="Shipped ready."
        lede="Every model on the sheet is assembled, tested and boxed on the same lines that make its coil, chassis, fascia and copper line. The figures here are computed from the manufacturer specification sheets — nothing rounded, nothing added."
      />

      <Reveal as="section" ariaLabelledBy="browse-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="browse-heading"
              eyebrow="Browse"
              title="By format,"
              accent="by efficiency, by unit."
              lede="Four range pages, one specification page. Each range page lists its models with headline figures and links every one to its full sheet."
            />
          </div>
          <div data-reveal="">
            <RangeNav />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="sheet" ariaLabelledBy="sheet-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionHeading
            id="sheet-heading"
            eyebrow="The sheet at a glance"
            title="All eight models,"
            accent="one line each."
            lede="Cooling capacity, rated ISEER, indoor air flow and expansion device for every model on the sheet."
            className="mb-10"
          />
          <div data-reveal="">
            <RangeModelList models={[...specModels]} variant="compact" groupBy="stars" />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" ariaLabelledBy="inhouse-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="inhouse-heading"
              eyebrow="Backward integration"
              title="Made in-house,"
              accent="in every unit."
              lede="The coil, the chassis, the fascia and the copper line are made on Ezentech's own lines. That is what keeps fit, lead time and change control ours."
            />
          </div>
          <div data-reveal="">
            <RelatedServices
              slugs={["heat-exchanger-coils", "sheet-metal", "injection-moulding", "copper-tubing"]}
            />
          </div>
        </div>
      </Reveal>

      <Section label="Enquire">
        <SectionCta
          text="Sourcing a range for your brand? Tell us the capacities, star targets and annual volume, and we will map them to the platforms on the sheet."
          cta={{ label: "Request a Quote", href: rfqHref() }}
          secondary={{ label: "How we engage", href: "/services/oem-odm" }}
        />
      </Section>

      <Cta />
    </BasicLayout>
  );
}

export { productRanges };
