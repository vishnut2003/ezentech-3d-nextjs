import Link from "next/link";
import NumberedPanel from "@/components/ui/numbered-panel";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import StatTiles from "@/components/ui/stat-tiles";
import type { ServiceEntry } from "@/data/services/types";

/** First band under the hero: sticky heading + stats | numbered panel. */
export default function ServiceIntro({ service }: { service: ServiceEntry }) {
  const { intro } = service;
  return (
    <Section
      id="intro"
      labelledBy="intro-heading"
      containerClassName="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
    >
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          id="intro-heading"
          eyebrow={intro.eyebrow}
          title={intro.title}
          accent={intro.accent}
        />
        {intro.body.map((p) => (
          <p key={p} className="mt-5 max-w-xl text-base leading-7 text-muted">
            {p}
          </p>
        ))}
        <StatTiles items={intro.stats} className="mt-8" />
      </div>
      <NumberedPanel
        label={intro.panel.heading}
        unit={intro.panel.unit}
        items={intro.panel.items.map((item) => ({
          title: item.term,
          body: item.detail,
          meta: item.href ? (
            <Link
              href={item.href}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-80"
            >
              Learn more
              <span aria-hidden="true">→</span>
            </Link>
          ) : undefined,
        }))}
      />
    </Section>
  );
}
