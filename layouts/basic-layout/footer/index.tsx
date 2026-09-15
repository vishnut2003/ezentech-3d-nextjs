import Image from "next/image";
import Link from "next/link";
import { getSection } from "@/lib/nav";

const about = getSection("about");
const services = getSection("services");
const products = getSection("products");
const insights = getSection("insights");

/** Columns derive from lib/nav.ts so the footer can never drift from the sitemap. */
const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: about.label, href: about.href },
      ...about.children.map((c) => ({ label: c.short ?? c.label, href: c.href })),
      ...insights.children.map((c) => ({ label: c.short ?? c.label, href: c.href })),
    ],
  },
  {
    heading: "Capabilities",
    links: [
      { label: services.label, href: services.href },
      ...services.children.map((c) => ({ label: c.short ?? c.label, href: c.href })),
    ],
  },
  {
    heading: "Products",
    links: [
      { label: products.label, href: products.href },
      ...products.children.map((c) => ({ label: c.short ?? c.label, href: c.href })),
    ],
  },
];

const certifications = ["NABL Lab", "ISO 9001", "ISO 14001", "BIS"];

/**
 * Light engineered close: white sheet with a faint drafting grid and a
 * ghost wordmark half-clipped by the footer's own overflow.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="footer-grid-light absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/assets/business-logos/ezentech-logo-hrz.png"
              alt="Ezentech India"
              width={1088}
              height={330}
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
              OEM / ODM air-conditioner manufacturing — four plants, 1M-unit
              capacity, NABL-accredited testing, and in-house components from
              coil to chassis.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Certifications">
              {certifications.map((certification) => (
                <li
                  key={certification}
                  className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  {certification}
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h3 className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                <span aria-hidden="true" className="h-px w-5 bg-accent" />
                {column.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} Ezentech India Pvt. Ltd. All rights
            reserved.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            Enquire — Get a Quote
          </Link>
        </div>
      </div>

      {/* Ghost wordmark, half-clipped by the footer's overflow — the
          negative bottom margin trims its reserved height so the visible
          strip stays shallow. */}
      <p
        aria-hidden="true"
        className="pointer-events-none relative z-0 mb-[-0.34em] select-none whitespace-nowrap text-center text-[11.5vw] font-bold leading-none tracking-tight text-foreground/4"
      >
        EZENTECH
      </p>
    </footer>
  );
}
