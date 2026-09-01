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
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/assets/business-logos/ezentech-logo-hrz.png"
            alt="Ezentech India"
            width={1088}
            height={330}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            OEM / ODM air-conditioner manufacturing — four plants, 1M-unit
            capacity, NABL-accredited testing, and in-house components from
            coil to chassis.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {column.heading}
            </h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Ezentech India Pvt. Ltd. All rights reserved.</p>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Enquire — Get a Quote
          </Link>
        </div>
      </div>
    </footer>
  );
}
