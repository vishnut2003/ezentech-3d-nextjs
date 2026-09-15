import Container from "./container";

/**
 * Standard inner-page content band: bordered, generous vertical rhythm,
 * plain white or the surface tint. Never carries a decorative backdrop —
 * those live on PageHero only.
 */
export default function Section({
  id,
  labelledBy,
  label,
  tone = "background",
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  labelledBy?: string;
  /** Fallback accessible name when there is no visible heading to point at. */
  label?: string;
  tone?: "background" | "surface";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={`border-b border-border ${tone === "surface" ? "bg-surface" : ""} ${className}`}
    >
      <Container className={`py-16 lg:py-24 ${containerClassName}`}>
        {children}
      </Container>
    </section>
  );
}
