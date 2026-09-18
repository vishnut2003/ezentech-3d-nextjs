import Image from "next/image";
import Link from "next/link";
import SpecTable from "@/components/ui/spec-table";
import { specFeatures } from "@/data/products/spec-features";
import {
  modelImageList,
  toSpecGroups,
  type SpecModel,
} from "@/data/products/specs";

/**
 * One model's full sheet. Server-rendered so every value is in the HTML;
 * `data-type` / `data-stars` let the selector's CSS filter hide it.
 */
export default function ModelDetail({ model }: { model: SpecModel }) {
  const images = modelImageList(model);
  const metrics = [
    { value: `${model.sheet.general.coolingCapacityW.toLocaleString("en-IN")} W`, label: "Cooling capacity" },
    { value: model.sheet.general.iseer.toFixed(2), label: "Rated ISEER" },
    { value: `${model.sheet.indoorUnit.airflowM3h.toLocaleString("en-IN")} m³/h`, label: "Indoor air flow" },
  ];

  return (
    <article
      id={model.slug}
      data-type={model.type}
      data-stars={model.stars}
      aria-labelledby={`${model.slug}-title`}
      // Clears the sticky selector bar: two rows (~90px) on phones, where
      // the filter row can still wrap once at 320px; one row less from sm.
      className="scroll-mt-36 border-t border-border py-12 first:border-t-0 sm:scroll-mt-28 lg:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Identity, renders, headline metrics — sticks while the table scrolls */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {model.type === "split" ? "Inverter split" : "Inverter window"} ·{" "}
            {model.stars}-Star · {model.tonnageTr.toFixed(1)} TR class
          </p>
          <h3
            id={`${model.slug}-title`}
            className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl"
          >
            {model.name}
          </h3>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
            Sheet: {model.sheetName} · {model.sheet.general.chassis} chassis
          </p>

          <div
            className={`mt-6 grid gap-4 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-[320px]"}`}
          >
            {images.map((img) => (
              <figure
                key={img.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 40vw, 90vw"
                  className="object-contain p-3"
                />
                <figcaption className="absolute bottom-2 left-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {img.alt.split("— ")[1]}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur">
            {metrics.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-baseline gap-5 py-2 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <p className="w-32 shrink-0 text-lg font-semibold tracking-tight text-accent sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-sm leading-6 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key features">
            {model.features.map((id) => {
              const feature = specFeatures[id];
              return (
                <li
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    {feature.icon}
                  </svg>
                  {feature.label(model.stars)}
                </li>
              );
            })}
          </ul>

          <Link
            href={`/contact?model=${model.slug}`}
            className="print-hidden mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            Request a quote for this model
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <SpecTable
          caption={`${model.name} — full specification`}
          groups={toSpecGroups(model)}
        />
      </div>
    </article>
  );
}
