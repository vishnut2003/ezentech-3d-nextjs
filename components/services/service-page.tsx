import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FaqList from "@/components/ui/faq-list";
import PageHero from "@/components/ui/page-hero";
import PhotoSlot from "@/components/ui/photo-slot";
import Section from "@/components/ui/section";
import SectionCta from "@/components/ui/section-cta";
import SectionHeading from "@/components/ui/section-heading";
import SheetFactsPanel from "@/components/ui/sheet-facts-panel";
import type { ServiceEntry } from "@/data/services/types";
import { rfqHref } from "@/lib/links";
import { crumbs } from "@/lib/nav";
import { breadcrumbLd, faqLd, serviceLd, webPageLd } from "@/lib/structured-data/common";
import RelatedLedger from "./related-ledger";
import ServiceIntro from "./service-intro";
import ServiceProcessSteps from "./service-process-steps";

/**
 * Composer for the seven service pages. `slots` hold the bespoke sections
 * a page adds; everything else is driven by the service entry.
 */
export default function ServicePage({
  service,
  slots,
}: {
  service: ServiceEntry;
  slots?: {
    afterIntro?: React.ReactNode;
    afterProcess?: React.ReactNode;
    beforeFaq?: React.ReactNode;
    /** Set when a bespoke slot already renders `service.facts`. */
    factsRendered?: boolean;
  };
}) {
  const trail = crumbs("/services", service.path);
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path: service.path, title: service.seo.title, description: service.seo.description }),
    serviceLd({
      path: service.path,
      name: service.title,
      description: service.seo.description,
      serviceType: service.serviceType,
    }),
    faqLd(service.faq),
  ];
  const rfq = rfqHref({ service: service.slug });

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        accent={service.hero.accent}
        lede={service.hero.lede}
        actions={
          <>
            <Link
              href={rfq}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            {service.hero.secondaryAction ? (
              <a
                href={service.hero.secondaryAction.href}
                className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                {service.hero.secondaryAction.label}
              </a>
            ) : (
              <Link
                href="/services"
                className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                All Capabilities
              </Link>
            )}
          </>
        }
      />

      <ServiceIntro service={service} />
      {slots?.afterIntro}
      <ServiceProcessSteps service={service} />
      {slots?.afterProcess}

      {service.facts && !slots?.factsRendered ? (
        <Reveal as="section" id={service.facts.id} ariaLabelledBy="facts-heading" className="border-b border-border">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                id="facts-heading"
                eyebrow="From the sheet"
                title="The numbers,"
                accent="as printed."
                lede="Sheet-verified values only — nothing rounded, nothing added. Every figure links back to the full specification page."
              />
            </div>
            <div data-reveal="">
              <SheetFactsPanel
                caption={service.facts.caption}
                groups={service.facts.groups}
                note={service.facts.note}
              />
            </div>
          </div>
        </Reveal>
      ) : null}

      {service.photo ? (
        <Reveal as="section" ariaLabelledBy="photo-heading" className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 id="photo-heading" className="sr-only">
              On the floor
            </h2>
            <div data-reveal="" className="mx-auto max-w-5xl">
              <PhotoSlot
                src={service.photo.src}
                alt={service.photo.alt}
                caption={service.photo.caption}
                figure={service.photo.figure}
                aspect={service.photo.aspect ?? "16/9"}
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          </div>
        </Reveal>
      ) : null}

      <RelatedLedger service={service} />
      {slots?.beforeFaq}

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
            <FaqList label="Frequently asked" items={service.faq} />
          </div>
        </div>
      </Reveal>

      <Section label="Enquire">
        <SectionCta
          text={`Planning a programme that needs ${service.navLabel.toLowerCase()}? Send the requirement — capacity, volume, chassis — and we will come back with a production plan.`}
          cta={{ label: "Request a Quote", href: rfq }}
          secondary={{ label: "All Capabilities", href: "/services" }}
        />
      </Section>

      <Cta />
    </BasicLayout>
  );
}
