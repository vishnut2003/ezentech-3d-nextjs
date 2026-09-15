import SectionHeading from "@/components/ui/section-heading";
import Section from "@/components/ui/section";
import StatTiles, { type Stat } from "@/components/ui/stat-tiles";
import { rangeStats } from "@/data/products/derived";
import type { SpecModel } from "@/data/products/specs";

/**
 * The opening band of every range page: a heading column beside the four
 * sheet-derived headline figures. Pass `stats` to override the defaults.
 */
export default function RangeStats({
  models,
  stats,
  eyebrow = "The range",
  title,
  accent,
  lede,
  id = "range-stats",
}: {
  models: SpecModel[];
  stats?: Stat[];
  eyebrow?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  lede: React.ReactNode;
  id?: string;
}) {
  return (
    <Section
      id={id}
      labelledBy={`${id}-heading`}
      containerClassName="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:items-center"
    >
      <SectionHeading
        id={`${id}-heading`}
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        lede={lede}
      />
      <StatTiles items={stats ?? rangeStats(models)} />
    </Section>
  );
}
