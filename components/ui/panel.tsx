/**
 * The engineered panel shell shared by NumberedPanel, LinkLedger, FaqList
 * and LedgerTable: soft-shadowed rounded card with a surface-tinted header
 * strip (small uppercase label left, mono count right).
 */
export function PanelShell({
  id,
  className = "",
  children,
  ...rest
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  "data-reveal"?: string;
}) {
  return (
    <div
      id={id}
      className={`overflow-hidden rounded-3xl border border-border bg-background/80 shadow-[0_24px_80px_rgba(44,56,138,0.08)] backdrop-blur ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  label,
  count,
  unit,
  right,
}: {
  label: string;
  count?: number;
  unit?: string;
  /** Overrides the "05 terms" mono index. */
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border bg-surface px-6 py-4">
      <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        <span aria-hidden="true" className="h-px w-5 bg-accent" />
        {label}
      </p>
      {right ?? (count !== undefined ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
          {String(count).padStart(2, "0")} {unit}
        </p>
      ) : null)}
    </div>
  );
}

export const panelRowClass =
  "group grid grid-cols-[2.75rem_1fr] gap-4 border-t border-border px-6 py-5 transition-colors first:border-t-0 hover:bg-surface/70";

export const panelIndexClass =
  "pt-0.5 font-mono text-[12px] font-medium tracking-wider text-accent/70 transition-colors group-hover:text-accent";

export function PanelIndex({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className={panelIndexClass}>
      {String(n).padStart(2, "0")}
    </span>
  );
}
