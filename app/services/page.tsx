import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import CapabilityMatrix from "@/components/services/capability-matrix";
import ServicesLedger from "@/components/services/services-ledger";
import NumberedPanel from "@/components/ui/numbered-panel";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import SectionCta from "@/components/ui/section-cta";
import SectionHeading from "@/components/ui/section-heading";
import StatTiles from "@/components/ui/stat-tiles";
import TrustBand from "@/components/ui/trust-band";
import { services } from "@/data/services/services";
import { rfqHref } from "@/lib/links";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { absUrl } from "@/lib/site";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data/common";

const path = "/services";
const title = "Services & Capabilities — OEM/ODM Air-Conditioner Manufacturing";
const description =
  "Ezentech India's manufacturing services and in-house components at a glance: OEM, ODM, private-label and contract manufacturing backed by in-house heat-exchanger coils, sheet metal, injection moulding, copper tubing and tooling, R&D and an NABL-accredited psychrometric lab.";

export const metadata = buildMetadata({ title, description, path });

const engagementModels = [
  {
    title: "OEM — build to print",
    body: "You own the design; Ezentech manufactures it on its lines with its in-house components and tests it in its lab.",
  },
  {
    title: "ODM — design to production",
    body: "Start from an Ezentech platform; product development adapts it to your brief and your industrial design.",
  },
  {
    title: "Private label",
    body: "Your badge on a released Ezentech platform — the fastest route to a range on the shelf.",
  },
  {
    title: "Contract manufacturing",
    body: "Flexible-volume production to close a capacity gap in your own programme.",
  },
];

export default function ServicesPage() {
  const trail = crumbs(path);
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description, type: "CollectionPage" }),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Ezentech India services and capabilities",
      numberOfItems: services.length,
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          "@id": absUrl(`${s.path}#service`),
          url: absUrl(s.path),
          name: s.title,
          serviceType: s.serviceType,
        },
      })),
    },
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="Services & capabilities"
        title="One roof."
        accent="Every capability."
        lede="Four plants, one-million-unit annual capacity and 20+ years of building air conditioners for other people's brands — with the coil, chassis, fascia and copper line made on our own lines. This is the map."
        actions={
          <>
            <Link
              href={rfqHref()}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <a
              href="#engagement"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              How We Engage
            </a>
          </>
        }
      />

      <Section
        id="overview"
        labelledBy="overview-heading"
        containerClassName="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="overview-heading"
            eyebrow="The offer"
            title="A manufacturer,"
            accent="not an assembler."
            lede="Ezentech builds the finished unit and the components inside it. That backward integration is the difference between a supplier that sources parts and one that controls them."
          />
          <StatTiles
            className="mt-8"
            items={[
              { value: "04", label: "Manufacturing plants" },
              { value: "1M+", label: "Units of annual capacity" },
              { value: "20+ yrs", label: "OEM / ODM manufacturing" },
              { value: "NABL", label: "Accredited psychrometric lab" },
            ]}
          />
        </div>
        <NumberedPanel
          id="engagement"
          label="Four ways to work with us"
          unit="models"
          items={engagementModels.map((m) => ({
            ...m,
            meta: (
              <Link
                href="/services/oem-odm"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-80"
              >
                Compare the models
                <span aria-hidden="true">→</span>
              </Link>
            ),
          }))}
        />
      </Section>

      <Reveal as="section" id="matrix" ariaLabelledBy="matrix-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionHeading
            id="matrix-heading"
            eyebrow="Capability map"
            title="What is made in-house,"
            accent="and where it goes."
            lede="Six capabilities, the units each one feeds, and the sheet-verified fact behind it."
            className="mb-10"
          />
          <div data-reveal="">
            <CapabilityMatrix />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="pages" ariaLabelledBy="pages-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="pages-heading"
              eyebrow="Every capability"
              title="Seven pages,"
              accent="one supply chain."
              lede="Each capability has its own page with the process, the sheet-verified facts and the questions buyers ask."
            />
          </div>
          <div data-reveal="">
            <ServicesLedger />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" ariaLabelledBy="trust-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <h2 id="trust-heading" className="sr-only">
            Recognition
          </h2>
          <TrustBand data-reveal="" cta={{ label: "Quality & Certifications", href: "/about/quality" }} />
        </div>
      </Reveal>

      <Section label="Enquire">
        <SectionCta
          text="Not sure which engagement model fits? Send the brief as it stands — capacity, market, volume — and we will propose the route."
          cta={{ label: "Request a Quote", href: rfqHref() }}
          secondary={{ label: "OEM / ODM Explained", href: "/services/oem-odm" }}
        />
      </Section>

      <Cta />
    </BasicLayout>
  );
}
