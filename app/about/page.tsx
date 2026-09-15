import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FeatureRail from "@/components/ui/feature-rail";
import LinkLedger, { fromNav } from "@/components/ui/link-ledger";
import NumberedPanel from "@/components/ui/numbered-panel";
import PageHero from "@/components/ui/page-hero";
import PhotoSlot from "@/components/ui/photo-slot";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import StatTiles from "@/components/ui/stat-tiles";
import TrustBand from "@/components/ui/trust-band";
import { companyStats, differentiators, engagementModels, group } from "@/data/about/company";
import { ABOUT_PHOTOS } from "@/data/about/photos";
import { crumbs, getNavLink, getSection } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, organizationLd, webPageLd } from "@/lib/structured-data/common";

const path = "/about";
const title = "Get to Know Ezentech — 20+ Years of OEM/ODM Air-Conditioner Manufacturing";
const description =
  "Ezentech India Pvt. Ltd. is an OEM/ODM, private-label and contract manufacturer of air conditioners: four plants, one-million-unit annual capacity, NABL-accredited psychrometric lab, and heat-exchanger coils, sheet metal, injection moulding and copper tubing made in-house.";

export const metadata = buildMetadata({ title, description, path });

export default function AboutPage() {
  const trail = crumbs(path);
  const about = getSection("about");
  const inside = [
    ...about.children,
    getNavLink("/services")!,
    getNavLink("/products/technical-specifications")!,
  ];
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description, type: "AboutPage" }),
    organizationLd({ description, award: ['LG "Role Model Supplier"'] }),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="About Ezentech"
        title="Twenty years of"
        accent="engineering, in-house."
        lede="Ezentech India builds air conditioners for the brands that sell them — OEM, ODM, private label and contract manufacturing across four plants, with every core component made on our own lines."
        actions={
          <>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <Link
              href="/about/manufacturing"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Our Manufacturing
            </Link>
          </>
        }
      />

      <Section
        id="company"
        labelledBy="company-heading"
        containerClassName="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
      >
        <div>
          <SectionHeading
            id="company-heading"
            eyebrow="The company"
            title="A manufacturer,"
            accent="not an assembler."
            lede="Ezentech India Pvt. Ltd. designs and builds air conditioners for brand partners — and builds the components inside them. The heat-exchanger coil, the sheet-metal chassis, the injection-moulded fascia and the copper line are made on Ezentech's own lines, in four plants, with one-million-unit annual capacity."
          />
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            Twenty-plus years of building for other people&rsquo;s brands have shaped
            how the company works: to print when a partner has a design, from
            an Ezentech platform when they need one, and always through the
            same NABL-accredited laboratory before a unit ships.
          </p>
          <FeatureRail className="mt-6" label="Engagement models" items={engagementModels} />
        </div>
        <div className="space-y-6">
          <StatTiles items={companyStats} />
          <PhotoSlot figure="01" {...ABOUT_PHOTOS.plantExterior} />
        </div>
      </Section>

      <Reveal as="section" id="difference" ariaLabelledBy="difference-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="difference-heading"
              eyebrow="What sets Ezentech apart"
              title="Under one roof,"
              accent="on purpose."
              lede="Six things a sourcing team can verify — each one a page on this site."
            />
          </div>
          <div data-reveal="">
            <NumberedPanel
              label="The Ezentech difference"
              unit="points"
              items={differentiators.map((d) => ({
                title: d.title,
                body: d.body,
                meta: (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {d.tag}
                    </span>
                    <Link
                      href={d.href}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-80"
                    >
                      Read more
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="group" ariaLabelledBy="group-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-24 lg:items-center">
          <div data-reveal="">
            <SectionHeading
              id="group-heading"
              eyebrow="The group"
              title={`Part of the ${group.name}.`}
              lede={group.note}
            />
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              The group&rsquo;s experience of manufacturing for established brands is
              where Ezentech&rsquo;s own habits come from: hold the tooling, own the
              components, test every unit, and treat the specification sheet as
              a promise.
            </p>
          </div>
          <PhotoSlot data-reveal="" figure="02" aspect="4/3" {...ABOUT_PHOTOS.groupPlant} />
        </div>
      </Reveal>

      <Reveal as="section" id="inside" ariaLabelledBy="inside-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="inside-heading"
              eyebrow="Inside Ezentech"
              title="Go deeper"
              accent="on any of it."
            />
          </div>
          <div data-reveal="">
            <LinkLedger label="Inside Ezentech" unit="pages" items={fromNav(inside)} />
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

      <Cta />
    </BasicLayout>
  );
}
