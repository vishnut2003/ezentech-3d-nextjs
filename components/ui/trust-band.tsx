import Link from "next/link";

/** Inverted navy band — the homepage's LG "Role Model Supplier" recipe. */
export default function TrustBand({
  eyebrow = "Recognised by the brands we build for",
  title,
  cta,
  className = "",
  ...rest
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  cta: { label: string; href: string };
  className?: string;
  "data-reveal"?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-linear-to-r from-accent to-[#1c2666] p-6 ${className}`}
      {...rest}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          {eyebrow}
        </p>
        <p className="mt-1.5 text-lg font-semibold text-white sm:text-xl">
          {title ?? (
            <>
              LG{" "}
              <span className="underline decoration-white/40 underline-offset-4">
                “Role Model Supplier”
              </span>{" "}
              — earned on the line, not the letterhead.
            </>
          )}
        </p>
      </div>
      <Link
        href={cta.href}
        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-accent transition-opacity hover:opacity-90"
      >
        {cta.label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
