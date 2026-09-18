"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToElement } from "@/lib/lenis";
import type { SpecType, StarRating } from "@/data/products/specs";

export interface ModelSummary {
  slug: string;
  sheetName: string;
  capacityClass: string;
  type: SpecType;
  stars: StarRating;
}

type TypeFilter = "all" | SpecType;
type StarFilter = "all" | `${StarRating}`;

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "split", label: "Split" },
  { value: "window", label: "Window" },
];

const starOptions: { value: StarFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "3", label: "3-Star" },
  { value: "5", label: "5-Star" },
];

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Caption hidden on phones so both groups share one 272px line; the
          group keeps its aria-label and the options are self-explanatory. */}
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:inline">
        {label}
      </span>
      <div
        role="group"
        aria-label={`Filter by ${label.toLowerCase()}`}
        className="inline-flex rounded-full border border-border bg-surface p-0.5"
      >
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`rounded-full px-2 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors sm:px-3 sm:text-xs ${
                active
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Sticky filter + jump bar. Filters are written as data attributes onto
 * #spec-models and CSS does the hiding, so the server-rendered tables are
 * never duplicated into the client payload and the page works without JS.
 */
export default function ModelSelector({ models }: { models: ModelSummary[] }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<TypeFilter>("all");
  const [stars, setStars] = useState<StarFilter>("all");

  useEffect(() => {
    const target = document.getElementById("spec-models");
    if (!target) return;
    target.dataset.filterType = type;
    target.dataset.filterStars = stars;
    // Hidden articles change the document height; keep GSAP's triggers honest.
    ScrollTrigger.refresh();
  }, [type, stars]);

  const visible = models.filter(
    (m) =>
      (type === "all" || m.type === type) &&
      (stars === "all" || String(m.stars) === stars),
  );

  const jump = (slug: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(slug);
    if (!el) return;
    event.preventDefault();
    const offset = -((barRef.current?.offsetHeight ?? 0) + 16);
    scrollToElement(el, offset);
    history.replaceState(null, "", `#${slug}`);
  };

  return (
    <div
      ref={barRef}
      className="print-hidden sticky top-0 z-40 border-b border-border bg-background/90 shadow-[0_8px_30px_rgba(20,24,31,0.05)] backdrop-blur"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Row 1 — filters + live count. On phones the two groups sit on one
            line and the count is dropped, so the bar is two short rows. */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 py-2.5 sm:gap-x-6 sm:py-3">
          <Segmented label="Type" options={typeOptions} value={type} onChange={setType} />
          <Segmented label="Rating" options={starOptions} value={stars} onChange={setStars} />
          <p
            className="ml-auto hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:block"
            aria-live="polite"
          >
            <span className="text-foreground">{visible.length}</span> of{" "}
            {models.length} models
          </p>
        </div>

        {/* Row 2 — jump pills: wrap on tablet+, scroll (no bar) on phones.
            The strip fades out at its right edge on phones so it reads as
            scrollable; data-lenis-prevent keeps wheel input inside it. */}
        <nav
          aria-label="Jump to model"
          className="flex items-center gap-3 border-t border-border/70 py-2.5"
        >
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Jump to
          </span>
          <ul
            data-lenis-prevent
            className="no-scrollbar -mr-6 flex gap-1.5 overflow-x-auto pr-10 mask-[linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)] sm:mr-0 sm:flex-wrap sm:overflow-visible sm:pr-0 sm:mask-none"
          >
            {visible.map((m) => (
              <li key={m.slug} className="shrink-0">
                <a
                  href={`#${m.slug}`}
                  onClick={jump(m.slug)}
                  title={m.sheetName}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
                >
                  <span className="font-semibold">{m.capacityClass}</span>
                  <span aria-hidden="true" className="text-border">
                    |
                  </span>
                  <span>{m.stars}★</span>
                  {m.type === "window" ? (
                    <span className="rounded-full bg-surface px-1.5 text-[9px] uppercase tracking-[0.12em] text-muted">
                      Window
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
