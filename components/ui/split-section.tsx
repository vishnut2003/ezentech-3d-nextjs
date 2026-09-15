import Section from "./section";

const ratios = {
  even: "lg:grid-cols-[1fr_1.05fr]",
  "heading-wide": "lg:grid-cols-[1.1fr_0.9fr]",
  "panel-wide": "lg:grid-cols-[0.85fr_1.15fr]",
} as const;

/**
 * Heading column beside a panel column — the spec-intro layout. `sticky`
 * pins the heading column while a tall panel scrolls (the model-detail
 * recipe). `reverse` puts the panel first on desktop.
 */
export default function SplitSection({
  id,
  labelledBy,
  heading,
  panel,
  ratio = "even",
  sticky = false,
  reverse = false,
  tone,
  align = "start",
}: {
  id?: string;
  labelledBy?: string;
  heading: React.ReactNode;
  panel: React.ReactNode;
  ratio?: keyof typeof ratios;
  sticky?: boolean;
  reverse?: boolean;
  tone?: "background" | "surface";
  align?: "start" | "center";
}) {
  return (
    <Section
      id={id}
      labelledBy={labelledBy}
      tone={tone}
      containerClassName={`grid gap-12 ${ratios[ratio]} lg:gap-16 ${
        align === "center" ? "lg:items-center" : ""
      }`}
    >
      <div
        className={`${sticky ? "lg:sticky lg:top-32 lg:self-start" : ""} ${
          reverse ? "lg:order-last" : ""
        }`}
      >
        {heading}
      </div>
      <div className="min-w-0">{panel}</div>
    </Section>
  );
}
