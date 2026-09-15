import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import LocationCard from "@/components/contact/location-card";
import RfqForm from "@/components/contact/rfq-form";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FaqList from "@/components/ui/faq-list";
import NumberedPanel from "@/components/ui/numbered-panel";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import TrustBand from "@/components/ui/trust-band";
import { specModels } from "@/data/products/specs";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import type { FaqItem } from "@/lib/structured-data/common";
import { breadcrumbLd, contactPageLd, faqLd, organizationLd } from "@/lib/structured-data/common";

const path = "/contact";
const title = "Contact Ezentech India — Request a Quote";
const description =
  "Send Ezentech India your requirement — OEM/ODM programmes, component supply or a specification request — and get a structured, engineering-backed response. Registered office: Ecotech III, Greater Noida.";

export const metadata = buildMetadata({ title, description, path });

const routes = [
  {
    title: "OEM / ODM programmes and RFQs",
    body: "A range, a variant or a capacity gap. Include capacities, star target, chassis preference, market and annual volume.",
  },
  {
    title: "Component supply",
    body: "Heat-exchanger coils, sheet metal, injection moulding or copper tubing for your own programme. Include drawings or the sheet reference and volumes.",
  },
  {
    title: "Specifications and samples",
    body: "Questions about a model on the Technical Specifications page, or a sample request. Reference the model name from the sheet.",
  },
];

const faq: FaqItem[] = [
  {
    q: "What should I include in an enquiry?",
    a: "Capacity and star target, split or window, preferred chassis or fascia direction, target market, annual volume and timeline. If a model on the Technical Specifications page is close, name it.",
  },
  {
    q: "Do you offer private label?",
    a: "Yes — your badge on a released Ezentech platform. It is one of four engagement models alongside OEM, ODM and contract manufacturing.",
  },
  {
    q: "Where can I see full specifications?",
    a: "Every model's sheet is reproduced on the Technical Specifications page — chassis, compressor, fan motors, coil geometry, unit and packing dimensions, refrigerant pipe sizes.",
  },
  {
    q: "Can I get copies of certificates and test reports?",
    a: "Yes. Certificates and test documentation for a programme are shared during the RFQ process.",
  },
];

export default function ContactPage() {
  const trail = crumbs(path);
  const jsonLd = [
    breadcrumbLd(trail),
    contactPageLd({ path, title, description }),
    organizationLd(),
    faqLd(faq),
  ];
  const models = specModels.map((m) => ({ slug: m.slug, name: m.name, type: m.type }));

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="Contact"
        title="Send the spec."
        accent="We'll send the plan."
        lede="Tell us what your brand needs — a range, a component, a capacity — and get a structured, engineering-backed response from the people who will build it."
        actions={
          <>
            <a
              href="#rfq"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Go to the Form
            </a>
            <Link
              href="/products/technical-specifications"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Technical Specifications
            </Link>
          </>
        }
      />

      <Section
        id="contact"
        label="Contact details and enquiry form"
        containerClassName="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <LocationCard />
          <NumberedPanel label="Routing" unit="routes" items={routes} />
        </div>
        <RfqForm models={models} />
      </Section>

      <Reveal as="section" id="faq" ariaLabelledBy="faq-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="faq-heading" eyebrow="Before you write" title="Four things" accent="worth knowing." />
          </div>
          <div data-reveal="">
            <FaqList label="Before you write" items={faq} />
          </div>
        </div>
      </Reveal>

      {/* Deliberately no <Cta/> here — its only action is this page. */}
      <Reveal as="section" ariaLabelledBy="trust-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <h2 id="trust-heading" className="sr-only">
            Recognition
          </h2>
          <TrustBand data-reveal="" cta={{ label: "Quality & Certifications", href: "/about/quality" }} />
        </div>
      </Reveal>
    </BasicLayout>
  );
}
