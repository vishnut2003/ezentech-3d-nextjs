import Link from "next/link";

/** Light inline enquiry strip — keeps the RFQ one click away mid-page. */
export default function SectionCta({
  text,
  cta,
  secondary,
  className = "",
  ...rest
}: {
  text: React.ReactNode;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
  "data-reveal"?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-border bg-surface px-6 py-5 ${className}`}
      {...rest}
    >
      <p className="max-w-xl text-sm leading-6 text-muted">{text}</p>
      <div className="flex flex-wrap items-center gap-3">
        {secondary ? (
          <Link
            href={secondary.href}
            className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            {secondary.label}
          </Link>
        ) : null}
        <Link
          href={cta.href}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
        >
          {cta.label}
        </Link>
      </div>
    </div>
  );
}
