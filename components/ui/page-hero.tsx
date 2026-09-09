import Breadcrumbs, { type Crumb } from "./breadcrumbs";
import Container from "./container";

/**
 * Compact light hero for inner pages. Animates with CSS only (`.reveal-up`)
 * so the h1 paints on the first frame — no hydration gate, no GSAP.
 */
export default function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  accent,
  lede,
  actions,
}: {
  breadcrumbs?: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="cap-bg relative border-b border-border">
      <div className="stage-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative py-14 lg:py-20 short:lg:py-12">
        {breadcrumbs ? (
          <div className="reveal-up">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}
        <p className="reveal-up reveal-delay-1 mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
        <h1 className="reveal-up reveal-delay-2 mt-3 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
          {accent ? (
            <>
              <br />
              <span className="text-accent">{accent}</span>
            </>
          ) : null}
        </h1>
        {lede ? (
          <p className="reveal-up reveal-delay-3 mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {lede}
          </p>
        ) : null}
        {actions ? (
          <div className="reveal-up reveal-delay-4 mt-8 flex flex-wrap items-center gap-3">
            {actions}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
