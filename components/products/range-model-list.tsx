import Image from "next/image";
import Link from "next/link";
import { PanelHeader, PanelShell } from "@/components/ui/panel";
import { specFeatures } from "@/data/products/spec-features";
import { modelImageList, type SpecModel } from "@/data/products/specs";
import { rfqHref, specAnchor } from "@/lib/links";

/**
 * Server-rendered model rows in the engineered panel — every figure is in
 * the HTML, every row links to its full sheet and to an RFQ for that model.
 */
export default function RangeModelList({
  models,
  variant = "full",
  groupBy,
  label = "Models on the sheet",
  id,
  thumbnails = "first",
}: {
  models: SpecModel[];
  variant?: "full" | "compact";
  groupBy?: "stars";
  label?: string;
  id?: string;
  /** Show the IDU only, or both IDU and ODU renders. */
  thumbnails?: "first" | "all";
}) {
  const groups: { heading?: string; models: SpecModel[] }[] = groupBy
    ? ([3, 5] as const).map((stars) => ({
        heading: `${stars}-Star · ${models.filter((m) => m.stars === stars).length} models`,
        models: models.filter((m) => m.stars === stars),
      }))
    : [{ models }];

  return (
    <PanelShell id={id}>
      <PanelHeader label={label} count={models.length} unit="models" />
      {groups.map((group, gi) => (
        <div key={group.heading ?? gi}>
          {group.heading ? (
            <p className="bg-accent px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              {group.heading}
            </p>
          ) : null}
          {group.models.map((m) => (
            <ModelRow key={m.slug} model={m} variant={variant} thumbnails={thumbnails} />
          ))}
        </div>
      ))}
    </PanelShell>
  );
}

function ModelRow({
  model: m,
  variant,
  thumbnails,
}: {
  model: SpecModel;
  variant: "full" | "compact";
  thumbnails: "first" | "all";
}) {
  const images = thumbnails === "all" ? modelImageList(m) : modelImageList(m).slice(0, 1);
  const s = m.sheet;
  const metrics = [
    { label: "Cooling", value: `${s.general.coolingCapacityW.toLocaleString("en-IN")} W` },
    { label: "ISEER", value: s.general.iseer.toFixed(2) },
    { label: "Air flow", value: `${s.indoorUnit.airflowM3h.toLocaleString("en-IN")} m³/h` },
    { label: "Expansion", value: s.condenser.expansionType },
  ];

  return (
    <article
      id={`row-${m.slug}`}
      aria-labelledby={`row-${m.slug}-title`}
      className="grid gap-5 border-t border-border px-6 py-6 transition-colors first:border-t-0 hover:bg-surface/50 lg:grid-cols-[auto_1fr_auto] lg:items-center"
    >
      <div className={`grid gap-3 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {images.map((img) => (
          <div
            key={img.src}
            className="relative aspect-[4/3] w-28 overflow-hidden rounded-xl border border-border bg-white"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="112px"
              className="object-contain p-2"
            />
          </div>
        ))}
      </div>

      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {m.capacityClass} · {m.stars}★ · {m.tonnageTr.toFixed(1)} TR class · {s.general.chassis}
          {m.type === "window" ? "" : " chassis"}
        </p>
        <h3 id={`row-${m.slug}-title`} className="mt-1 text-lg font-semibold tracking-tight">
          {m.name}
        </h3>
        <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {metrics.map((x) => (
            <div key={x.label} className="flex items-baseline gap-1.5">
              <dt className="text-muted">{x.label}</dt>
              <dd className="font-mono text-[13px] text-accent">{x.value}</dd>
            </div>
          ))}
        </dl>
        {variant === "full" ? (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Key features">
            {m.features.map((id) => {
              const f = specFeatures[id];
              return (
                <li
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    {f.icon}
                  </svg>
                  {f.label(m.stars)}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
        <Link
          href={specAnchor(m.slug)}
          className="rounded-full border border-foreground/25 px-4 py-2 text-center text-xs font-medium text-foreground transition-colors hover:border-foreground"
        >
          Full sheet
        </Link>
        <Link
          href={rfqHref({ model: m.slug })}
          className="rounded-full bg-accent px-4 py-2 text-center text-xs font-medium text-surface transition-opacity hover:opacity-90"
        >
          Request a Quote
        </Link>
      </div>
    </article>
  );
}
