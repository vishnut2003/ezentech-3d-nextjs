import FeatureRail from "@/components/ui/feature-rail";
import { PanelShell } from "@/components/ui/panel";
import StatTiles from "@/components/ui/stat-tiles";
import type { CaseStudy } from "@/data/insights/case-studies";
import { getSpecModel } from "@/data/products/specs";
import { specAnchor } from "@/lib/links";

/** One anonymised capability story as an engineered panel. */
export default function CaseStudyPanel({ study, index }: { study: CaseStudy; index: number }) {
  const models = study.relatedModels
    .map((slug) => getSpecModel(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <PanelShell id={study.slug} className="scroll-mt-28">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface px-6 py-4">
        <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          <span aria-hidden="true" className="h-px w-5 bg-accent" />
          Programme {String(index).padStart(2, "0")} · {study.segment}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
          {study.engagement}
        </p>
      </div>

      <div className="px-6 pt-6">
        <h3 className="text-2xl font-semibold leading-[1.05] tracking-tight sm:text-3xl">
          {study.title}
          {study.accent ? (
            <>
              <br />
              <span className="text-accent">{study.accent}</span>
            </>
          ) : null}
        </h3>
      </div>

      <dl className="mt-6 grid gap-px border-t border-border bg-border md:grid-cols-3">
        {[
          ["The brief", study.brief],
          ["What we did", study.approach],
          ["What it proves", study.proves],
        ].map(([k, v]) => (
          <div key={k} className="bg-background/80 p-6 backdrop-blur">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{k}</dt>
            <dd className="mt-2 text-sm leading-6 text-muted">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 border-t border-border p-6 md:grid-cols-[1fr_auto] md:items-center">
        <StatTiles items={study.facts} />
        {models.length ? (
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              On the sheet
            </p>
            <FeatureRail
              label="Related models"
              items={models.map((m) => ({
                label: `${m.capacityClass} ${m.stars}★${m.type === "window" ? " window" : ""}`,
                href: specAnchor(m.slug),
              }))}
            />
          </div>
        ) : null}
      </div>
    </PanelShell>
  );
}
