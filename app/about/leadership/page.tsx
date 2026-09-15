import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FeatureRail from "@/components/ui/feature-rail";
import NumberedPanel from "@/components/ui/numbered-panel";
import PageHero from "@/components/ui/page-hero";
import PhotoSlot from "@/components/ui/photo-slot";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import TrustBand from "@/components/ui/trust-band";
import { journeyStages } from "@/data/about/journey";
import { leadershipRoles } from "@/data/about/leadership";
import { ABOUT_PHOTOS } from "@/data/about/photos";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, organizationLd, webPageLd } from "@/lib/structured-data/common";

const path = "/about/leadership";
const title = "Leadership & Our Journey — The Functions and Capability Stages Behind Ezentech";
const description =
  "Who runs Ezentech India and how the company was built: the leadership functions a brand partner works with, and the capability stages — from OEM assembly to fully backward-integrated manufacturing.";

export const metadata = buildMetadata({ title, description, path });

export default function LeadershipPage() {
  const trail = crumbs("/about", path);
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description, type: "AboutPage" }),
    organizationLd(),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="About · Leadership & our journey"
        title="Led from the line,"
        accent="built in layers."
        lede="The people a partner actually works with, function by function — and the story of the company told by what came in-house, not by the calendar."
        actions={
          <>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Talk to the Team
            </Link>
            <a
              href="#journey"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Our Journey
            </a>
          </>
        }
      />

      <Section
        id="leadership"
        labelledBy="leadership-heading"
        containerClassName="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="leadership-heading"
            eyebrow="Leadership"
            title="The people a partner"
            accent="actually works with."
            lede="A programme at Ezentech runs function to function. These are the six functions, what each one owns, and when a brand partner meets them."
          />
        </div>
        <NumberedPanel
          label="Leadership functions"
          unit="functions"
          items={leadershipRoles.map((r) => ({
            id: r.id,
            title: r.name ? (
              <>
                {r.name}
                <span className="mt-0.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                  {r.role}
                </span>
              </>
            ) : (
              r.role
            ),
            body: r.remit,
            meta: (
              <p className="text-sm leading-6 text-foreground">
                <span className="font-semibold">You will meet them: </span>
                {r.meetWhen}
              </p>
            ),
          }))}
        />
      </Section>

      <Reveal as="section" ariaLabelledBy="floor-heading" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <h2 id="floor-heading" className="sr-only">
            On the floor
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <PhotoSlot data-reveal="" figure="01" aspect="3/2" sizes="(min-width: 1024px) 40vw, 50vw" {...ABOUT_PHOTOS.leadershipFloor} />
            <PhotoSlot data-reveal="" figure="02" aspect="3/2" sizes="(min-width: 1024px) 40vw, 50vw" {...ABOUT_PHOTOS.engineeringReview} />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="journey" ariaLabelledBy="journey-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="journey-heading"
              eyebrow="Our journey"
              title="Capability,"
              accent="layer by layer."
              lede="We tell our story by what came in-house, not by the calendar. Each stage below is something a partner can still see on the line today."
            />
          </div>
          <div data-reveal="">
            <NumberedPanel
              label="Capability stages"
              unit="stages"
              as="ol"
              items={journeyStages.map((s) => ({
                id: s.id,
                title: s.title,
                body: s.summary,
                meta: <FeatureRail label={`${s.title} proof`} items={s.proof} />,
              }))}
            />
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
