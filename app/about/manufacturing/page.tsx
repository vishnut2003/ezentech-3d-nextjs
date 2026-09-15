import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import HeroVideo from "@/components/hero/hero-video";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FeatureRail from "@/components/ui/feature-rail";
import NumberedPanel from "@/components/ui/numbered-panel";
import PageHero from "@/components/ui/page-hero";
import PhotoSlot from "@/components/ui/photo-slot";
import Section from "@/components/ui/section";
import SectionCta from "@/components/ui/section-cta";
import SectionHeading from "@/components/ui/section-heading";
import StatTiles from "@/components/ui/stat-tiles";
import { lineStages } from "@/data/about/line-stages";
import { ABOUT_PHOTOS } from "@/data/about/photos";
import { ANNUAL_CAPACITY, capabilityLines, PLANT_COUNT } from "@/data/about/plants";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, organizationLd, webPageLd } from "@/lib/structured-data/common";

const path = "/about/manufacturing";
const title = "Manufacturing & Infrastructure — Four Plants, 1M-Unit Annual Capacity";
const description =
  "Ezentech's manufacturing footprint: four plants with one-million-unit annual capacity, in-house heat-exchanger coil, sheet-metal, injection-moulding and copper-tubing lines, and end-of-line psychrometric testing.";

export const metadata = buildMetadata({ title, description, path });

export default function ManufacturingPage() {
  const trail = crumbs("/about", path);
  const jsonLd = [breadcrumbLd(trail), webPageLd({ path, title, description }), organizationLd()];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="About · Manufacturing & infrastructure"
        title="Four plants."
        accent="One million units a year."
        lede="From sheet metal and coil to charged, tested, packed unit — the network that lets a brand partner commit to a season."
        actions={
          <>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <a
              href="#line"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              The Line, Stage by Stage
            </a>
          </>
        }
      />

      <Section
        id="scale"
        labelledBy="scale-heading"
        containerClassName="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:items-center"
      >
        <div>
          <SectionHeading
            id="scale-heading"
            eyebrow="Scale"
            title="Capacity you can"
            accent="plan a season around."
            lede="Four plants operate as one network, feeding the same assembly lines from the same in-house component lines and finishing in the same laboratory."
          />
          <StatTiles
            className="mt-8"
            items={[
              { value: String(PLANT_COUNT).padStart(2, "0"), label: "Manufacturing plants" },
              { value: ANNUAL_CAPACITY, label: "Units of annual capacity" },
              { value: "04", label: "Component lines in-house" },
              { value: "01", label: "NABL-accredited laboratory" },
            ]}
          />
        </div>
        {/* The line, in motion — plant footage, no pin or scrub on inner pages */}
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-black">
            <HeroVideo />
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
              <p className="rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                The line, in motion
              </p>
            </div>
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            <span>Plant footage · Ezentech India</span>
            <span className="font-mono">Video</span>
          </figcaption>
        </figure>
      </Section>

      <Reveal as="section" id="network" ariaLabelledBy="network-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="network-heading"
              eyebrow="The plant network"
              title="Four plants,"
              accent="one system."
              lede="What makes the network one system is the set of component lines behind it. Each feeds the assembly lines directly — no external coil, cabinet or fascia supplier in the loop."
            />
          </div>
          <div className="space-y-6">
            <div data-reveal="">
              <NumberedPanel
                label="Capability lines"
                unit="lines"
                items={capabilityLines.map((l) => ({
                  id: l.id,
                  title: l.title,
                  body: l.body,
                  meta: (
                    <FeatureRail
                      label={`${l.title} outputs`}
                      items={[...l.tags, { label: "Page →", href: l.href }]}
                    />
                  ),
                }))}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <PhotoSlot data-reveal="" figure="01" aspect="4/3" sizes="(min-width: 1024px) 30vw, 50vw" {...ABOUT_PHOTOS.coilLine} />
              <PhotoSlot data-reveal="" figure="02" aspect="4/3" sizes="(min-width: 1024px) 30vw, 50vw" {...ABOUT_PHOTOS.assemblyLine} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="line" ariaLabelledBy="line-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="line-heading"
              eyebrow="From coil to carton"
              title="The line,"
              accent="stage by stage."
              lede="Six stages between coil stock and a packed unit — and the in-house line that feeds each one."
            />
          </div>
          <div data-reveal="">
            <NumberedPanel
              label="Production flow"
              unit="stages"
              as="ol"
              items={lineStages.map((s) => ({
                id: s.id,
                title: s.title,
                body: s.ezentechLine,
                meta: <FeatureRail label={`${s.title} feeds`} items={s.feeds} />,
              }))}
            />
          </div>
        </div>
      </Reveal>

      <Section label="Enquire">
        <SectionCta
          text="Planning a volume programme? Tell us capacity, season and chassis, and we will come back with a production plan."
          cta={{ label: "Request a Quote", href: "/contact" }}
          secondary={{ label: "Technical Specifications", href: "/products/technical-specifications" }}
        />
      </Section>

      <Cta />
    </BasicLayout>
  );
}
