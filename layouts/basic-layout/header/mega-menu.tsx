"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV, PRIMARY_ACTIONS, type NavSection, type NavSectionKey } from "@/lib/nav";

const HOVER_OPEN_MS = 90;
const HOVER_CLOSE_MS = 160;

/**
 * Desktop navigation with a full-width mega menu. Sections with children
 * open a panel (hover, click or keyboard); Contact is a plain link. The
 * panel is a white engineered sheet whatever the header treatment, so it
 * reads correctly over the dark homepage hero too.
 */
export default function MegaMenu({ solid }: { solid: boolean }) {
  const [openKey, setOpenKey] = useState<NavSectionKey | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const pathname = usePathname();
  const panelId = useId();

  const clearTimer = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const scheduleOpen = (key: NavSectionKey) => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpenKey(key), HOVER_OPEN_MS);
  };
  const scheduleClose = () => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpenKey(null), HOVER_CLOSE_MS);
  };
  const close = () => {
    clearTimer();
    setOpenKey(null);
  };

  useEffect(() => {
    if (!openKey) return;
    const closeNow = () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = null;
      setOpenKey(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closeNow();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openKey]);

  useEffect(() => clearTimer, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string, open: boolean) =>
    `flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
      solid
        ? open || isActive(href)
          ? "text-foreground"
          : "text-muted hover:text-foreground"
        : open || isActive(href)
          ? "text-white"
          : "text-white/85 hover:text-white"
    }`;

  const open = openKey ? NAV.find((s) => s.key === openKey) : undefined;

  return (
    <div ref={rootRef} className="hidden md:contents">
      <nav
        className="hidden items-center gap-1 md:flex"
        aria-label="Main"
        onMouseLeave={scheduleClose}
      >
        {NAV.map((section) => {
          const hasPanel = section.children.length > 0;
          const isOpen = openKey === section.key;
          const label = section.short ?? section.label;

          if (!hasPanel) {
            return (
              <Link
                key={section.href}
                href={section.href}
                aria-current={isActive(section.href) ? "page" : undefined}
                onMouseEnter={scheduleClose}
                onFocus={close}
                className={linkClass(section.href, false)}
              >
                {label}
              </Link>
            );
          }

          return (
            <button
              key={section.href}
              type="button"
              aria-expanded={isOpen}
              aria-controls={isOpen ? panelId : undefined}
              aria-haspopup="true"
              onMouseEnter={() => scheduleOpen(section.key)}
              onFocus={() => {
                clearTimer();
                setOpenKey(section.key);
              }}
              onClick={() => (isOpen ? close() : (clearTimer(), setOpenKey(section.key)))}
              className={linkClass(section.href, isOpen)}
            >
              {label}
              <svg
                className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </nav>

      {open ? (
        <div
          id={panelId}
          onMouseEnter={clearTimer}
          onMouseLeave={scheduleClose}
          className="reveal-up absolute inset-x-0 top-16 z-50 hidden border-y border-border bg-background shadow-[0_32px_80px_rgba(20,24,31,0.12)] md:block"
        >
          <Panel section={open} onNavigate={close} />
        </div>
      ) : null}
    </div>
  );
}

function Panel({
  section,
  onNavigate,
}: {
  section: NavSection;
  onNavigate: () => void;
}) {
  const columns = section.children.length > 4 ? "lg:grid-cols-2" : "lg:grid-cols-1";
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:px-8">
      {/* Featured column */}
      <div className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-6">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {section.eyebrow}
          </p>
          <p className="mt-3 text-2xl font-semibold leading-[1.05] tracking-tight sm:text-3xl">
            {section.label}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{section.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
            {section.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={section.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            {section.overviewLabel}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={PRIMARY_ACTIONS.quote.href}
            onClick={onNavigate}
            className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            {PRIMARY_ACTIONS.quote.label}
          </Link>
        </div>
      </div>

      {/* Page ledger */}
      <div>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            <span aria-hidden="true" className="h-px w-5 bg-accent" />
            In this section
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
            {String(section.children.length).padStart(2, "0")} pages
          </p>
        </div>
        <ul className={`grid gap-x-8 ${columns}`}>
          {section.children.map((child, i) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="group grid grid-cols-[2.25rem_1fr_auto] items-start gap-3 border-b border-border py-3.5 transition-colors hover:bg-surface/70"
              >
                <span
                  aria-hidden="true"
                  className="pt-0.5 font-mono text-[12px] font-medium tracking-wider text-accent/70 transition-colors group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                    {child.label}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-[13px] leading-5 text-muted">
                    {child.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="pt-0.5 text-accent transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
