import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FaqList from "@/components/ui/faq-list";
import FeatureRail from "@/components/ui/feature-rail";
import { IconBadge, ShieldIcon } from "@/components/ui/icons";
import NumberedPanel from "@/components/ui/numbered-panel";
import PageHero from "@/components/ui/page-hero";
import PhotoSlot from "@/components/ui/photo-slot";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import StatTiles from "@/components/ui/stat-tiles";
import TrustBand from "@/components/ui/trust-band";
import { certifications, qualityFaq, responsibleManufacturing } from "@/data/about/certifications";
import { ABOUT_PHOTOS } from "@/data/about/photos";
import { peakIseer } from "@/data/products/derived";
import { specModels } from "@/data/products/specs";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, faqLd, organizationLd, webPageLd } from "@/lib/structured-data/common";

const path = "/about/quality";
const title = "Quality, Certifications & Sustainability — NABL Lab, ISO 9001, ISO 14001, BIS";
const description =
  "How Ezentech India assures every unit: NABL-accredited psychrometric testing, ISO 9001 quality and ISO 14001 environmental management, BIS-certified product ranges, R32 across the inverter range, and LG 'Role Model Supplier' recognition.";

export const metadata = buildMetadata({ title, description, path });

export default function QualityPage() {
  const trail = crumbs("/about", path);
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description }),
    organizationLd({ award: ['LG "Role Model Supplier"'] }),
    faqLd(qualityFaq),
  ];
  const r32 = specModels.filter((m) => m.sheet.condenser.refrigerant === "R32").length;

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="About · Quality, certifications & sustainability"
        title="Every unit tested."
        accent="Every claim certified."
        lede="The paperwork buyers ask for and the laboratory behind it — NABL, ISO 9001, ISO 14001, BIS — plus what responsible manufacturing means on an Ezentech line."
        actions={
          <>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <a
              href="#faq"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Buyer FAQ
            </a>
          </>
        }
      />

      <Section
        id="credentials"
        labelledBy="credentials-heading"
        containerClassName="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="credentials-heading"
            eyebrow="Quality system"
            title="The paperwork buyers ask for,"
            accent="and the lab behind it."
            lede="Four credentials, what each one covers, and why it matters to the person signing the purchase order."
          />
        </div>
        <NumberedPanel
          label="Credentials"
          unit="credentials"
          items={certifications.map((c) => ({
            id: c.id,
            title: (
              <span className="flex items-center gap-3">
                <IconBadge>
                  <ShieldIcon />
                </IconBadge>
                {c.fullName}
              </span>
            ),
            body: c.covers,
            meta: (
              <p className="text-sm leading-6 text-foreground">
                <span className="font-semibold">Why it matters: </span>
                {c.buyerValue}
              </p>
            ),
          }))}
        />
      </Section>

      <Reveal as="section" id="lab" ariaLabelledBy="lab-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24 lg:items-center">
          <div data-reveal="">
            <SectionHeading
              id="lab-heading"
              eyebrow="The lab, on camera"
              title="Psychrometric testing,"
              accent="explained."
              lede="A psychrometric test holds indoor and outdoor conditions at controlled temperature and humidity and measures what the unit actually delivers: cooling capacity, power input, the resulting ISEER, and airflow. Those are the figures on the specification sheet and on the BEE label."
            />
            <FeatureRail
              className="mt-6"
              label="Measured parameters"
              items={["Cooling capacity", "Power input", "ISEER", "Airflow", "Controlled temp & RH"]}
            />
            <Link
              href="/services/testing"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Testing & QA Service
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <PhotoSlot data-reveal="" figure="01" aspect="4/3" {...ABOUT_PHOTOS.lab} />
        </div>
      </Reveal>

      <Reveal as="section" id="efficiency" ariaLabelledBy="efficiency-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionHeading
            id="efficiency-heading"
            eyebrow="Energy efficiency"
            title="Efficiency,"
            accent="on the label."
            lede="ISEER — Indian Seasonal Energy Efficiency Ratio — is cooling delivered per unit of electricity over a full Indian cooling season, as rated under the BEE star-labelling scheme. Every figure below is computed from the manufacturer specification sheets."
            className="mb-10"
          />
          <StatTiles
            data-reveal=""
            columns={4}
            items={[
              { value: peakIseer().toFixed(2), label: "Peak rated ISEER on the sheet" },
              { value: String(specModels.length).padStart(2, "0"), label: "R32 inverter models" },
              { value: `${Math.round((r32 / specModels.length) * 100)}%`, label: "Of the range on R32" },
              { value: "3★ / 5★", label: "BEE bands on the sheet" },
            ]}
          />
        </div>
      </Reveal>

      <Reveal as="section" id="responsible" ariaLabelledBy="responsible-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="responsible-heading"
              eyebrow="Responsible manufacturing"
              title="ISO 14001,"
              accent="in practice."
              lede="Three commitments a brand can put in its own ESG file — each one verifiable, none of them a target we have not met."
            />
          </div>
          <div data-reveal="">
            <NumberedPanel label="Commitments" unit="commitments" items={responsibleManufacturing} />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" ariaLabelledBy="trust-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <h2 id="trust-heading" className="sr-only">
            Recognition
          </h2>
          <TrustBand data-reveal="" cta={{ label: "Ask for Certificates in Your RFQ", href: "/contact" }} />
        </div>
      </Reveal>

      <Reveal as="section" id="faq" ariaLabelledBy="faq-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="faq-heading" eyebrow="Buyer questions" title="What procurement" accent="asks first." />
          </div>
          <div data-reveal="">
            <FaqList label="Buyer questions" items={qualityFaq} />
          </div>
        </div>
      </Reveal>

      <Cta />
    </BasicLayout>
  );
}
