"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  // Transparent while at the top (over the hero), frosted once scrolled.
  const [scrolled, setScrolled] = useState(false);
  // The light-on-video treatment only applies over the homepage hero;
  // inner pages have white backgrounds where it would be invisible.
  const isHome = usePathname() === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid/dark treatment whenever frosted or off the homepage.
  const solid = scrolled || !isHome;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-background/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="Ezentech India — Home">
          {/* Both variants stay mounted so the swap never flashes */}
          <Image
            src="/assets/business-logos/ezentech-logo-hrz.png"
            alt="Ezentech India"
            width={1088}
            height={330}
            priority
            className={solid ? "h-10 w-auto" : "hidden"}
          />
          <Image
            src="/assets/business-logos/ezentech-logo-hrz-white.png"
            alt="Ezentech India"
            width={1632}
            height={495}
            priority
            className={solid ? "hidden" : "h-10 w-auto"}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm lowercase tracking-wide transition-colors ${
                solid
                  ? "text-muted hover:text-foreground"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/services"
            className={`hidden rounded-full border px-5 py-2.5 text-sm font-medium transition-colors sm:block ${
              solid
                ? "border-foreground/25 text-foreground hover:border-foreground"
                : "border-white/40 text-white hover:border-white"
            }`}
          >
            our capabilities
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
