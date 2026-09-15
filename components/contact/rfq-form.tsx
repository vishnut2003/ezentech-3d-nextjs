"use client";

import { useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { PanelHeader, PanelShell } from "@/components/ui/panel";

export interface RfqModel {
  slug: string;
  name: string;
  type: "split" | "window";
}

export const productTypes = [
  "Split AC",
  "Window AC",
  "Inverter range",
  "IDU / ODU units",
  "Heat-exchanger coils",
  "Sheet metal",
  "Injection moulding",
  "Copper tubing & tooling",
  "Product development",
  "Testing & QA",
  "Other",
] as const;

/** Maps ?range= / ?service= query values to a product type. */
const typeByRef: Record<string, (typeof productTypes)[number]> = {
  "split-ac": "Split AC",
  "window-ac": "Window AC",
  "inverter-ac": "Inverter range",
  "idu-odu": "IDU / ODU units",
  "heat-exchanger-coils": "Heat-exchanger coils",
  "sheet-metal": "Sheet metal",
  "injection-moulding": "Injection moulding",
  "copper-tubing": "Copper tubing & tooling",
  "product-development": "Product development",
  testing: "Testing & QA",
  "oem-odm": "Other",
};

/** Form choices only — not company facts. */
const volumes = [
  "Not yet known",
  "Under 10,000 units",
  "10,000–50,000 units",
  "50,000–200,000 units",
  "200,000+ units",
];

const input =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 user-invalid:border-red-400";
const label = "block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted";

/**
 * Structured RFQ form. UI only by decision: submission is not wired to a
 * backend yet — the submit handler announces a pending status instead.
 * Query-param prefill is read on the client so the page stays static.
 */
const noopSubscribe = () => () => {};

/** Query-param prefill, derived from the URL rather than stored in state. */
function parsePrefill(search: string, models: RfqModel[]) {
  const params = new URLSearchParams(search);
  const m = params.get("model");
  const ref = params.get("range") ?? params.get("service");
  const found = m ? models.find((x) => x.slug === m) : undefined;
  if (found) {
    return {
      label: found.name,
      model: found.slug,
      productType: found.type === "split" ? "Split AC" : "Window AC",
    };
  }
  if (ref && typeByRef[ref]) {
    return { label: typeByRef[ref], model: "", productType: typeByRef[ref] };
  }
  return null;
}

export default function RfqForm({ models }: { models: RfqModel[] }) {
  const id = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);
  // Server snapshot is "" so the static HTML never depends on the query;
  // the client re-renders once with the real search string after hydration.
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  const derived = useMemo(() => parsePrefill(search, models), [search, models]);
  // null = follow the URL-derived value; a string = the user's own choice.
  const [productTypeChoice, setProductTypeChoice] = useState<string | null>(null);
  const [modelChoice, setModelChoice] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending">("idle");

  const prefill = cleared ? null : derived?.label ?? null;
  const productType = productTypeChoice ?? (cleared ? "" : derived?.productType ?? "");
  const model = modelChoice ?? (cleared ? "" : derived?.model ?? "");
  const setProductType = setProductTypeChoice;
  const setModel = setModelChoice;

  const clearPrefill = () => {
    setCleared(true);
    setModelChoice(null);
    setProductTypeChoice(null);
  };

  return (
    <PanelShell id="rfq" className="scroll-mt-28">
      <PanelHeader label="Request for quotation" count={8} unit="fields" />
      <form
        data-integration="pending"
        className="px-6 py-6"
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("pending");
          requestAnimationFrame(() => statusRef.current?.focus());
        }}
      >
        {prefill ? (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-2.5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Prefilled · {prefill}
            </p>
            <button
              type="button"
              onClick={clearPrefill}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
            >
              Clear
            </button>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-company`} className={label}>
              Company *
            </label>
            <input id={`${id}-company`} name="company" required autoComplete="organization" className={`mt-2 ${input}`} />
          </div>
          <div>
            <label htmlFor={`${id}-name`} className={label}>
              Your name *
            </label>
            <input id={`${id}-name`} name="name" required autoComplete="name" className={`mt-2 ${input}`} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={label}>
              Work email *
            </label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={`mt-2 ${input}`} />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={label}>
              Phone
            </label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={`mt-2 ${input}`} />
          </div>
          <div>
            <label htmlFor={`${id}-type`} className={label}>
              Product type
            </label>
            <select
              id={`${id}-type`}
              name="productType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className={`mt-2 ${input}`}
            >
              <option value="">Select</option>
              {productTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-model`} className={label}>
              Model of interest
            </label>
            <select
              id={`${id}-model`}
              name="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={`mt-2 ${input}`}
            >
              <option value="">Any / not sure</option>
              <optgroup label="Split">
                {models.filter((m) => m.type === "split").map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Window">
                {models.filter((m) => m.type === "window").map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-volume`} className={label}>
              Annual volume
            </label>
            <select id={`${id}-volume`} name="volume" className={`mt-2 ${input}`} defaultValue="">
              <option value="">Select</option>
              {volumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-timeline`} className={label}>
              Target timeline
            </label>
            <input
              id={`${id}-timeline`}
              name="timeline"
              placeholder="e.g. next season"
              className={`mt-2 ${input}`}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-message`} className={label}>
              Requirement
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={5}
              aria-describedby={`${id}-hint`}
              placeholder="Capacities, star target, chassis preference, fascia, market…"
              className={`mt-2 ${input}`}
            />
            <p id={`${id}-hint`} className="mt-2 text-[12px] leading-5 text-muted">
              The more of the sheet you can reference, the faster the quote.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            aria-describedby={`${id}-status`}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            Send Enquiry
          </button>
          <p
            id={`${id}-status`}
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={`text-sm leading-6 ${status === "pending" ? "text-foreground" : "text-muted"}`}
          >
            {status === "pending"
              ? "This form is being connected to our enquiry desk — nothing was sent yet. Please use the registered-office details on this page in the meantime."
              : "We reply with a structured, engineering-backed response."}
          </p>
        </div>
      </form>
    </PanelShell>
  );
}
