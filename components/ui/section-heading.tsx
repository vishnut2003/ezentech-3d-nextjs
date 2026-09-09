/**
 * Light-section heading block: accent-rule eyebrow, large statement, lede.
 * Class strings match the homepage sections so inner pages read as one system.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  lede,
  as: Heading = "h2",
  id,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  /** Optional second line rendered in the accent colour. */
  accent?: React.ReactNode;
  lede?: React.ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}
        {accent ? (
          <>
            <br />
            <span className="text-accent">{accent}</span>
          </>
        ) : null}
      </Heading>
      {lede ? (
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">{lede}</p>
      ) : null}
    </div>
  );
}
