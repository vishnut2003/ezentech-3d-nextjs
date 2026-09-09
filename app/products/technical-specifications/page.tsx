import type { Metadata } from "next";
import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import JsonLd from "@/components/seo/json-ld";
import Container from "@/components/ui/container";
import PageHero from "@/components/ui/page-hero";
import SpecIntro from "@/components/products/specs/spec-intro";
import ModelSelector from "@/components/products/specs/model-selector";
import ModelDetail from "@/components/products/specs/model-detail";
import SourceNote from "@/components/products/specs/source-note";
import { specModels } from "@/data/products/specs";
import {
  SPECS_PATH,
  technicalSpecificationsJsonLd,
} from "@/lib/structured-data/technical-specifications";

const title = "Technical Specifications — Inverter Split & Window AC";
const description =
  "Full technical specifications for Ezentech India's eight R32 inverter air-conditioner models (12K to 22K, 3-star and 5-star): cooling capacity, ISEER, airflow, compressor, coil geometry, unit and packing dimensions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: SPECS_PATH },
  openGraph: {
    title,
    description,
    url: SPECS_PATH,
    type: "website",
    images: [
      {
        url: "/images/products/specs/18k-5-star-inverter-split-idu.png",
        alt: "Ezentech 18K 5-Star inverter split AC indoor unit",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function TechnicalSpecificationsPage() {
  const summaries = specModels.map((m) => ({
    slug: m.slug,
    sheetName: m.sheetName,
    capacityClass: m.capacityClass,
    type: m.type,
    stars: m.stars,
  }));

  return (
    <BasicLayout>
      <JsonLd data={technicalSpecificationsJsonLd()} />

      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Technical Specifications", href: SPECS_PATH },
        ]}
        eyebrow="Products · Technical specifications"
        title="Every parameter,"
        accent="on the page."
        lede="Manufacturer specification sheets for Ezentech's inverter split and window range — 12K to 22K, 3-star and 5-star, all on R32. Filter by type or star rating, then jump to any model for the full coil, fan, compressor and dimension data."
        actions={
          <>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <a
              href="#spec-models"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Browse the models
            </a>
          </>
        }
      />

      <SpecIntro />

      <ModelSelector models={summaries} />

      <section
        id="spec-models"
        data-filter-type="all"
        data-filter-stars="all"
        aria-labelledby="spec-models-heading"
      >
        <h2 id="spec-models-heading" className="sr-only">
          Model specifications
        </h2>
        <Container>
          {specModels.map((model) => (
            <ModelDetail key={model.slug} model={model} />
          ))}
        </Container>
      </section>

      <SourceNote />

      <div className="print-hidden">
        <Cta />
      </div>
    </BasicLayout>
  );
}
