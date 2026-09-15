import { PanelHeader, PanelShell } from "@/components/ui/panel";
import { CONTACT, ORG } from "@/lib/site";

/** Registered office as an engineered card; map links need no API key or iframe. */
export default function LocationCard() {
  const a = ORG.address;
  const full = `${ORG.legalName}, ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India`;
  const q = encodeURIComponent(full);
  const pill =
    "rounded-full border border-foreground/25 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground";

  return (
    <PanelShell>
      <PanelHeader label="Registered office" right={<p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">01 location</p>} />
      <div className="px-6 py-6">
        <p className="text-lg font-semibold tracking-tight">{ORG.legalName}</p>
        <address className="mt-3 text-sm not-italic leading-6 text-muted">
          {a.streetAddress}
          <br />
          {a.addressLocality}, {a.addressRegion}
          <br />
          India
        </address>
        <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
          PIN {a.postalCode}
        </p>

        {CONTACT.email || CONTACT.phone ? (
          <dl className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
            {CONTACT.email ? (
              <div className="flex gap-3">
                <dt className="w-16 text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`} className="text-accent hover:underline">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
            ) : null}
            {CONTACT.phone ? (
              <div className="flex gap-3">
                <dt className="w-16 text-muted">Phone</dt>
                <dd>
                  <a href={`tel:${CONTACT.phone}`} className="text-accent hover:underline">
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className={pill}
          >
            Open in Google Maps
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className={pill}
          >
            Directions
          </a>
        </div>
      </div>
    </PanelShell>
  );
}
