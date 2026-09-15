import Reveal from "@/components/motion/reveal";
import NumberedPanel from "@/components/ui/numbered-panel";
import SectionHeading from "@/components/ui/section-heading";
import type { ServiceEntry } from "@/data/services/types";

/** Ordered process ledger with a sticky heading column. */
export default function ServiceProcessSteps({ service }: { service: ServiceEntry }) {
  const { process } = service;
  return (
    <Reveal as="section" id="process" ariaLabelledBy="process-heading" className="border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8 lg:py-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="process-heading"
            eyebrow={process.eyebrow}
            title={process.title}
            accent={process.accent}
          />
        </div>
        <div data-reveal="">
          <NumberedPanel
            label="Process"
            unit="steps"
            as="ol"
            items={process.steps.map((s) => ({ title: s.title, body: s.body }))}
          />
        </div>
      </div>
    </Reveal>
  );
}
