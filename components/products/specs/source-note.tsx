import Container from "@/components/ui/container";
import { specModels } from "@/data/products/specs";
import { ORG } from "@/lib/site";

/** Provenance line + transcription caveats, so citations stay faithful. */
export default function SourceNote() {
  const notes = Array.from(
    new Set(specModels.flatMap((m) => m.notes ?? [])),
  );
  const a = ORG.address;

  return (
    <section aria-label="Source and notes" className="border-t border-border bg-surface">
      <Container className="grid gap-8 py-10 text-sm leading-6 text-muted lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Source
          </p>
          <p className="mt-2">
            Transcribed from the {ORG.legalName} technical specification sheets
            ({specModels.length} models). Values are reproduced as printed; the
            tonnage class and BTU figures are industry equivalents added for
            comparison and are not on the sheets. Specifications may change
            with production revisions — confirm against the current sheet in
            your RFQ.
          </p>
          <p className="mt-3">
            {a.streetAddress}, {a.addressLocality}, {a.addressRegion}{" "}
            {a.postalCode}, India.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Transcription notes
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
