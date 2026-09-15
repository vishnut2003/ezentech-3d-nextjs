import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import CaseStudyPanel from "@/components/insights/case-study-panel";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FeatureRail from "@/components/ui/feature-rail";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import SectionCta from "@/components/ui/section-cta";
import SectionHeading from "@/components/ui/section-heading";
import StatTiles from "@/components/ui/stat-tiles";
import { engagementModels } from "@/data/about/company";
import { caseStudies } from "@/data/insights/case-studies";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, itemListLd, webPageLd } from "@/lib/structured-data/common";

const path = "/insights/case-studies";
const title = "Case Studies — OEM/ODM Capability Stories";
const description =
  "Capability stories from Ezentech India's OEM/ODM programmes — shared chassis platforms, a full R32 inverter line-up, accredited-lab validation and supplier recognition — with partners anonymised and every figure from the specification sheet.";

export const metadata = buildMetadata({ title, description, path });

export default function CaseStudiesPage() {
  const trail = crumbs("/insights", path);
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description, type: "CollectionPage" }),
    itemListLd({
      name: "Ezentech India case studies",
      items: caseStudies.map((s) => ({
        name: `${s.title}${s.accent ? ` ${s.accent}` : ""}`,
        url: `${path}#${s.slug}`,
        description: s.brief,
      })),
    }),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="Knowledge & insights · Case studies"
        title="Capability,"
        accent="in practice."
        lede="Our partners' brands are theirs to announce; the engineering is ours to explain. Four programmes, anonymised, with every figure taken from the specification sheet."
        actions={
          <>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Start a Programme
            </Link>
            <Link
              href="/services/oem-odm"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              How We Engage
            </Link>
          </>
        }
      />

      <Section
        id="why"
        labelledBy="why-heading"
        containerClassName="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center"
      >
        <div>
          <SectionHeading
            id="why-heading"
            eyebrow="Why the stories are anonymised"
            title="The brand is theirs."
            accent="The engineering is ours."
            lede="A brand partner decides when and whether to name its manufacturer. What Ezentech can show is the engineering behind each programme — the platform decisions, the test results and the recognition — all of it verifiable on the sheet."
          />
          <FeatureRail className="mt-6" label="Engagement models" items={engagementModels} />
        </div>
        <StatTiles
          items={[
            { value: String(caseStudies.length).padStart(2, "0"), label: "Programmes on this page" },
            { value: "100%", label: "Of figures from the specification sheet" },
          ]}
        />
      </Section>

      {caseStudies.map((study, i) => (
        <Reveal
          key={study.slug}
          as="section"
          ariaLabelledBy={`${study.slug}-label`}
          className="border-b border-border"
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 id={`${study.slug}-label`} className="sr-only">
              {study.title} {study.accent}
            </h2>
            <div data-reveal="">
              <CaseStudyPanel study={study} index={i + 1} />
            </div>
          </div>
        </Reveal>
      ))}

      <Section label="Enquire">
        <SectionCta
          text="Your programme could be the next one here — anonymised, or with your name on it if you choose."
          cta={{ label: "Request a Quote", href: "/contact" }}
          secondary={{ label: "Technical Specifications", href: "/products/technical-specifications" }}
        />
      </Section>

      <Cta />
    </BasicLayout>
  );
}
