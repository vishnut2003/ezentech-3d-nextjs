import StatTiles from "@/components/ui/stat-tiles";
import type { Block } from "@/data/insights/articles";

/** Renders article blocks with fixed classes — no typography plugin. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="mt-5 text-base leading-7 text-muted">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div key={i} className="mt-8 rounded-2xl border border-border bg-surface px-6 py-5">
                <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  <span aria-hidden="true" className="h-px w-5 bg-accent" />
                  {block.label}
                </p>
                <p className="mt-2 text-base font-medium leading-7 text-foreground">{block.text}</p>
              </div>
            );
          case "stats":
            return <StatTiles key={i} className="mt-8" items={block.items} />;
          case "table":
            return (
              <div key={i} className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
                <table className="w-full border-collapse text-sm">
                  <caption className="border-b border-border px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {block.caption}
                  </caption>
                  <tbody>
                    {block.rows.map(([k, v]) => (
                      <tr key={k} className="border-t border-border first:border-t-0 even:bg-surface/60">
                        <th scope="row" className="w-1/2 px-4 py-2.5 text-left font-medium text-foreground">
                          {k}
                        </th>
                        <td className="px-4 py-2.5 font-mono text-[13px] text-muted">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
