"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_ACTIONS } from "@/lib/nav";
import MegaMenu, { type SpotlightArticle } from "./mega-menu";
import MobileNav from "./mobile-nav";

export default function Header({ latestArticle }: { latestArticle?: SpotlightArticle }) {
  // Light-on-dark treatment over the homepage hero; solid on inner pages,
  // where white backgrounds would make it invisible.
  const pathname = usePathname();
  const isHome = pathname === "/";
  const solid = !isHome;

  return (
    <header
      className={`relative z-50 ${solid ? "bg-background" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="Ezentech India — Home">
          <Image
            src="/assets/business-logos/ezentech-logo-hrz.png"
            alt="Ezentech India"
            width={1088}
            height={330}
            priority
            className={solid ? "h-8 w-auto sm:h-10" : "hidden"}
          />
          <Image
            src="/assets/business-logos/ezentech-logo-hrz-white.png"
            alt="Ezentech India"
            width={1632}
            height={495}
            priority
            className={solid ? "hidden" : "h-8 w-auto sm:h-10"}
          />
        </Link>

        <MegaMenu solid={solid} latestArticle={latestArticle} />

        {/* Logo + RFQ pill + burger must share 272px at 320 — the pill and
            logo step down there so the RFQ CTA stays one tap away. */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={PRIMARY_ACTIONS.specs.href}
            className={`hidden rounded-full border px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:block ${
              solid
                ? "border-foreground/25 text-foreground hover:border-foreground"
                : "border-white/40 text-white hover:border-white"
            }`}
          >
            {PRIMARY_ACTIONS.specs.label}
          </Link>
          <Link
            href={PRIMARY_ACTIONS.quote.href}
            className="rounded-full bg-accent px-4 py-2.5 text-xs font-medium whitespace-nowrap text-surface transition-opacity hover:opacity-90 sm:px-5 sm:text-sm"
          >
            {PRIMARY_ACTIONS.quote.label}
          </Link>
          <MobileNav solid={solid} />
        </div>
      </div>
    </header>
  );
}
