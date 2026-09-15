import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import Cta from "@/components/cta";
import Reveal from "@/components/motion/reveal";
import JsonLd from "@/components/seo/json-ld";
import FaqList from "@/components/ui/faq-list";
import FeatureRail from "@/components/ui/feature-rail";
import LinkLedger from "@/components/ui/link-ledger";
import NumberedPanel from "@/components/ui/numbered-panel";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import { lineStages } from "@/data/about/line-stages";
import { kindLabel, sortedArticles } from "@/data/insights/articles";
import { glossary } from "@/data/insights/glossary";
import { crumbs } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import type { FaqItem } from "@/lib/structured-data/common";
import { breadcrumbLd, definedTermSetLd, faqLd, webPageLd } from "@/lib/structured-data/common";

const path = "/insights/technical-knowledge";
const title = "Technical Knowledge — How Air-Conditioner Manufacturing Works";
const description =
  "How an air conditioner is manufactured, stage by stage — sheet metal, coil, copper, fascia, assembly, test — with a glossary of the terms on a specification sheet: ISEER, EER, TR, R32, GWP, EEV.";

export const metadata = buildMetadata({ title, description, path });

const faq: FaqItem[] = [
  {
    q: "What are the main stages in manufacturing an air conditioner?",
    a: "Sheet-metal chassis and cabinet; fin-and-tube coil fabrication; copper tubing and brazing; injection-moulded fascia; assembly and refrigerant charging; and a psychrometric performance test before packing.",
  },
  {
    q: "What is the difference between an indoor unit and an outdoor unit?",
    a: "The indoor unit holds the evaporator coil, fan and fascia; the outdoor unit holds the compressor, condenser coil and expansion device. A window air conditioner combines both in one cabinet.",
  },
  {
    q: "What does 'in-house components' mean?",
    a: "That the manufacturer makes the structural and thermal parts itself — at Ezentech: heat-exchanger coils, sheet metal, injection-moulded plastics and copper tubing — rather than buying them in.",
  },
  {
    q: "Why does a psychrometric test matter?",
    a: "It is the test that produces the rated cooling capacity and ISEER on the label. An NABL-accredited laboratory makes those figures defensible.",
  },
];

export default function TechnicalKnowledgePage() {
  const trail = crumbs("/insights", path);
  const technical = sortedArticles().filter((a) => a.kind === "technical");
  const jsonLd = [
    breadcrumbLd(trail),
    webPageLd({ path, title, description, type: "CollectionPage" }),
    definedTermSetLd({ path, name: "Air-conditioner specification glossary", terms: glossary }),
    faqLd(faq),
  ];

  return (
    <BasicLayout>
      <JsonLd data={jsonLd} />
      <PageHero
        breadcrumbs={trail}
        eyebrow="Knowledge & insights · Technical knowledge"
        title="How an air conditioner"
        accent="actually gets made."
        lede="The build, end to end, and the vocabulary on a specification sheet — written so a sourcing team can read a sheet, and an answer engine can quote it."
        actions={
          <>
            <a
              href="#glossary"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Glossary
            </a>
            <Link
              href="/products/technical-specifications"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Read a Real Sheet
            </Link>
          </>
        }
      />

      <Section
        id="build"
        labelledBy="build-heading"
        containerClassName="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="build-heading"
            eyebrow="The build, end to end"
            title="Six stages,"
            accent="and what to check at each."
            lede="Every air conditioner passes through these stages somewhere. The question for a buyer is how many of them the manufacturer controls."
          />
          <Link
            href="/about/manufacturing"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            How Ezentech Runs Them
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <NumberedPanel
          label="Production stages"
          unit="stages"
          as="ol"
          items={lineStages.map((s) => ({
            id: s.id,
            title: s.title,
            body: s.explainer,
            meta: (
              <p className="text-sm leading-6 text-foreground">
                <span className="font-semibold">What to check: </span>
                {s.checkpoint}
              </p>
            ),
          }))}
        />
      </Section>

      <Reveal as="section" id="glossary" ariaLabelledBy="glossary-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="glossary-heading"
              eyebrow="Glossary"
              title="The words"
              accent="on the sheet."
              lede="Ten terms, defined once, each with a stable anchor so they can be linked and cited."
            />
          </div>
          <div data-reveal="">
            <NumberedPanel
              label="Specification glossary"
              unit="terms"
              items={glossary.map((g) => ({
                id: g.id,
                title: g.term,
                body: g.definition,
                meta: g.seeAlso ? (
                  <FeatureRail label={`${g.term} see also`} items={[{ label: "See also →", href: g.seeAlso }]} />
                ) : undefined,
              }))}
            />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="explainers" ariaLabelledBy="explainers-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="explainers-heading" eyebrow="Explainers" title="Go deeper," accent="one topic at a time." />
          </div>
          <div data-reveal="">
            <LinkLedger
              label="Technical explainers"
              unit="articles"
              items={technical.map((a) => ({
                href: `/insights/${a.slug}`,
                title: `${a.title}${a.accent ? ` ${a.accent}` : ""}`,
                description: a.excerpt,
                meta: `${kindLabel[a.kind]} · ${a.readingMinutes} min`,
              }))}
            />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="faq" ariaLabelledBy="faq-heading" className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="faq-heading" eyebrow="Questions" title="Asked" accent="most often." />
          </div>
          <div data-reveal="">
            <FaqList label="Questions" items={faq} />
          </div>
        </div>
      </Reveal>

      <Cta />
    </BasicLayout>
  );
}
