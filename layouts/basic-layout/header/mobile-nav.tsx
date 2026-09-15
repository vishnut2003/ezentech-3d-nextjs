"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV, PRIMARY_ACTIONS } from "@/lib/nav";

/**
 * Disclosure menu for phones and small tablets listing every page: each
 * section expands to its child pages. Top-anchored panel (not a full-screen
 * overlay) so it never fights Lenis; closes on link click, Escape, outside
 * click, or when the viewport grows past `md`.
 */
export default function MobileNav({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 48rem)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          solid
            ? "border-foreground/25 text-foreground hover:border-foreground"
            : "border-white/40 text-white hover:border-white"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          {open ? (
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          ) : (
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open ? (
        <nav
          id={panelId}
          aria-label="Main"
          className="reveal-up absolute inset-x-0 top-16 z-50 max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-border bg-background shadow-[0_24px_80px_rgba(44,56,138,0.08)]"
        >
          <ul className="divide-y divide-border px-6">
            {NAV.map((section) => {
              const active = isActive(section.href);
              if (section.children.length === 0) {
                return (
                  <li key={section.href}>
                    <Link
                      href={section.href}
                      aria-current={active ? "page" : undefined}
                      onClick={close}
                      className={`flex items-center justify-between gap-4 py-4 text-base font-medium ${
                        active ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {section.short ?? section.label}
                      <span aria-hidden="true" className="text-accent">
                        →
                      </span>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={section.href}>
                  <details className="group" open={active}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                      <span
                        className={`text-base font-medium ${active ? "text-accent" : "text-foreground"}`}
                      >
                        {section.short ?? section.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-lg leading-none text-accent transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <ul className="mb-4 overflow-hidden rounded-2xl border border-border bg-surface">
                      <li>
                        <Link
                          href={section.href}
                          onClick={close}
                          className="flex items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-foreground"
                        >
                          {section.overviewLabel}
                          <span aria-hidden="true" className="text-accent">
                            →
                          </span>
                        </Link>
                      </li>
                      {section.children.map((child, i) => (
                        <li key={child.href} className="border-t border-border">
                          <Link
                            href={child.href}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            onClick={close}
                            className="grid grid-cols-[2rem_1fr] gap-2 px-4 py-3 text-sm"
                          >
                            <span
                              aria-hidden="true"
                              className="font-mono text-[11px] font-medium tracking-wider text-accent/70"
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={isActive(child.href) ? "text-accent" : "text-muted"}
                            >
                              {child.short ?? child.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-2 border-t border-border px-6 py-4">
            <Link
              href={PRIMARY_ACTIONS.quote.href}
              onClick={close}
              className="rounded-full bg-accent px-6 py-2.5 text-center text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              {PRIMARY_ACTIONS.quote.label}
            </Link>
            <Link
              href={PRIMARY_ACTIONS.specs.href}
              onClick={close}
              className="rounded-full border border-foreground/25 px-6 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              {PRIMARY_ACTIONS.specs.label}
            </Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
