import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "Get to Know Ezentech", href: "/about" },
      { label: "Manufacturing & Infrastructure", href: "/about/manufacturing" },
      { label: "Quality & Certifications", href: "/about/quality" },
      { label: "Leadership & Journey", href: "/about/leadership" },
    ],
  },
  {
    heading: "Capabilities",
    links: [
      { label: "OEM / ODM Manufacturing", href: "/services/oem-odm" },
      { label: "Heat Exchanger Coils", href: "/services/heat-exchanger-coils" },
      { label: "Sheet Metal Fabrication", href: "/services/sheet-metal" },
      { label: "Testing & Quality Assurance", href: "/services/testing" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Split Air Conditioners", href: "/products/split-ac" },
      { label: "Window Air Conditioners", href: "/products/window-ac" },
      { label: "Inverter AC Range", href: "/products/inverter-ac" },
      { label: "IDU / ODU Units", href: "/products/idu-odu" },
      {
        label: "Technical Specifications",
        href: "/products/technical-specifications",
      },
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
