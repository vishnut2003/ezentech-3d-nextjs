"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV, PRIMARY_ACTIONS, type NavSection, type NavSectionKey } from "@/lib/nav";

const HOVER_OPEN_MS = 90;
const HOVER_CLOSE_MS = 180;

export interface SpotlightArticle {
  href: string;
  title: string;
  meta: string;
  excerpt: string;
}

/**
 * Theme tokens. The homepage header sits over the midnight hero, so its
 * menu is the dark studio sheet; inner pages get the light engineered one.
 */
const tones = {
  light: {
    panel: "border-border bg-background shadow-[0_32px_80px_rgba(20,24,31,0.12)]",
    backdrop: "",
    accent: "text-accent",
    accentRule: "bg-accent",
    heading: "text-foreground",
    body: "text-muted",
    faint: "text-muted/70",
    hairline: "border-border",
    card: "border-border bg-surface",
    rowHover: "hover:bg-surface/70",
    pill: "border-border bg-background text-muted",
    index: "text-accent/70 group-hover:text-accent",
    primary: "bg-accent text-surface hover:opacity-90",
    secondary: "border-foreground/25 text-foreground hover:border-foreground",
    tile: "bg-background/80",
    tileGrid: "border-border bg-border",
    band: "from-accent to-[#1c2666]",
    frame: "border-border bg-white",
    navText: "text-muted hover:text-foreground",
    navActive: "text-foreground",
    underline: "bg-accent",
    rowTitle: "text-foreground group-hover:text-accent",
  },
  dark: {
    panel: "hero-bg border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.55)]",
    backdrop: "hero-grid-fine",
    accent: "text-[#8fb0ff]",
    accentRule: "bg-[#8fb0ff]",
    heading: "text-white",
    body: "text-white/60",
    faint: "text-white/40",
    hairline: "border-white/10",
    card: "border-white/10 bg-white/[0.04]",
    rowHover: "hover:bg-white/[0.05]",
    pill: "border-white/15 bg-white/[0.04] text-white/70",
    index: "text-[#8fb0ff]/60 group-hover:text-[#8fb0ff]",
    primary: "bg-white text-foreground hover:opacity-90",
    secondary: "border-white/40 text-white hover:border-white",
    tile: "bg-white/[0.04]",
    tileGrid: "border-white/10 bg-white/10",
    band: "from-[#2c388a] to-[#101a3f]",
    frame: "border-white/10 bg-white/[0.06]",
    navText: "text-white/85 hover:text-white",
    navActive: "text-white",
    underline: "bg-white",
    rowTitle: "text-white group-hover:text-[#8fb0ff]",
  },
} as const;

type Tone = (typeof tones)[keyof typeof tones];

/**
 * Desktop navigation with a full-width mega menu. Sections with children
 * open a panel (hover, click or keyboard); Contact is a plain link.
 */
export default function MegaMenu({
  solid,
  latestArticle,
}: {
  solid: boolean;
  latestArticle?: SpotlightArticle;
}) {
  const [openKey, setOpenKey] = useState<NavSectionKey | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const pathname = usePathname();
  const panelId = useId();
  const t = solid ? tones.light : tones.dark;

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

  const open = openKey ? NAV.find((s) => s.key === openKey) : undefined;

  return (
    <div ref={rootRef} className="hidden md:contents">
      <nav
        className="hidden h-16 items-stretch gap-1 md:flex"
        aria-label="Main"
        onMouseLeave={scheduleClose}
      >
        {NAV.map((section) => {
          const hasPanel = section.children.length > 0;
          const isOpen = openKey === section.key;
          const active = isActive(section.href);
          const label = section.short ?? section.label;
          const itemClass = `relative flex items-center gap-1.5 px-3 text-sm font-medium tracking-wide transition-colors ${
            isOpen || active ? t.navActive : t.navText
          }`;
          const underline = (
            <span
              aria-hidden="true"
              className={`absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full transition-transform duration-300 ${t.underline} ${
                isOpen || active ? "scale-x-100" : "scale-x-0"
              }`}
            />
          );

          if (!hasPanel) {
            return (
              <Link
                key={section.href}
                href={section.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={scheduleClose}
                onFocus={close}
                className={itemClass}
              >
                {label}
                {underline}
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
              className={itemClass}
            >
              {label}
              <svg
                className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {underline}
            </button>
          );
        })}
      </nav>

      {open ? (
        <div
          id={panelId}
          onMouseEnter={clearTimer}
          onMouseLeave={scheduleClose}
          className={`reveal-up absolute inset-x-0 top-16 z-50 hidden max-h-[calc(100svh-4rem)] overflow-y-auto border-y md:block ${t.panel}`}
        >
          {t.backdrop ? <div className={`${t.backdrop} absolute inset-0`} aria-hidden="true" /> : null}
          <Panel key={open.key} section={open} tone={t} onNavigate={close} latestArticle={latestArticle} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ panel */

function Panel({
  section,
  tone: t,
  onNavigate,
  latestArticle,
}: {
  section: NavSection;
  tone: Tone;
  onNavigate: () => void;
  latestArticle?: SpotlightArticle;
}) {
  const twoCol = section.children.length > 4;
  // Services and Products give the ledger the full width instead of a
  // spotlight so their panels stay within one view.
  const hasSpotlight = section.key !== "services" && section.key !== "products";
  return (
    <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
      {/* Two columns from md, spotlight joins at xl; short viewports drop
          the row descriptions so every section fits in one view. */}
      <div
        className={`grid gap-6 py-6 md:grid-cols-[0.85fr_1.4fr] xl:gap-10 short:gap-5 short:py-4 ${
          hasSpotlight ? "xl:grid-cols-[0.9fr_1.35fr_0.85fr]" : "xl:grid-cols-[0.8fr_1.7fr]"
        }`}
      >
        {/* Featured column */}
        <div
          className={`reveal-up flex flex-col justify-between rounded-3xl border p-6 short:p-5 ${t.card}`}
          style={{ animationDelay: "0.04s" }}
        >
          <div>
            <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${t.accent}`}>
              <span aria-hidden="true" className={`h-px w-8 ${t.accentRule}`} />
              {section.eyebrow}
            </p>
            <p className={`mt-3 text-2xl font-semibold leading-[1.02] tracking-tight xl:text-3xl ${t.heading}`}>
              {section.label}
            </p>
            <p className={`mt-3 max-w-sm text-sm leading-6 short:hidden ${t.body}`}>{section.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2 short:mt-3" aria-label="Highlights">
              {section.highlights.map((h) => (
                <li
                  key={h}
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${t.pill}`}
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 short:mt-4">
            <Link
              href={section.href}
              onClick={onNavigate}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity ${t.primary}`}
            >
              {section.overviewLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Page ledger */}
        <div className="min-w-0">
          <div className={`flex items-center justify-between border-b pb-3 ${t.hairline}`}>
            <p className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${t.body}`}>
              <span aria-hidden="true" className={`h-px w-5 ${t.accentRule}`} />
              In this section
            </p>
            <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${t.faint}`}>
              {String(section.children.length).padStart(2, "0")} pages
            </p>
          </div>
          <ul className={`grid gap-x-6 ${twoCol ? "md:grid-cols-2" : ""}`}>
            {section.children.map((child, i) => (
              <li
                key={child.href}
                className="reveal-up"
                style={{ animationDelay: `${0.08 + i * 0.045}s` }}
              >
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className={`group grid grid-cols-[2.25rem_1fr_auto] items-start gap-3 rounded-xl border-b px-2 py-3 transition-colors short:py-2 ${t.hairline} ${t.rowHover}`}
                >
                  <span
                    aria-hidden="true"
                    className={`pt-0.5 font-mono text-[12px] font-medium tracking-wider transition-colors ${t.index}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[15px] font-semibold tracking-tight transition-colors ${t.rowTitle}`}>
                      {child.label}
                    </span>
                    <span className={`mt-1 line-clamp-2 block text-[13px] leading-5 short:hidden ${t.body}`}>
                      {child.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pt-0.5 transition-transform group-hover:translate-x-1 ${t.accent}`}
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Spotlight — wide screens only, so the panel never outgrows the viewport */}
        {hasSpotlight ? (
          <div className="reveal-up hidden xl:block" style={{ animationDelay: "0.16s" }}>
            <Spotlight section={section} tone={t} onNavigate={onNavigate} latestArticle={latestArticle} />
          </div>
        ) : null}
      </div>

      {/* Bottom strip */}
      <div className={`flex flex-wrap items-center justify-between gap-4 border-t py-3 short:py-2.5 ${t.hairline}`}>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${t.faint}`}>
          OEM / ODM · Private label · Contract manufacturing
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={PRIMARY_ACTIONS.specs.href}
            onClick={onNavigate}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${t.secondary}`}
          >
            {PRIMARY_ACTIONS.specs.label}
          </Link>
          <Link
            href={PRIMARY_ACTIONS.quote.href}
            onClick={onNavigate}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-opacity ${t.primary}`}
          >
            {PRIMARY_ACTIONS.quote.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- spotlight */

function SpotlightLabel({ tone: t, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <p className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${t.body}`}>
      <span aria-hidden="true" className={`h-px w-5 ${t.accentRule}`} />
      {children}
    </p>
  );
}

function MiniTiles({ tone: t, items }: { tone: Tone; items: { value: string; label: string }[] }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border ${t.tileGrid}`}>
      {items.map((s) => (
        <div key={s.label} className={`flex flex-col-reverse p-4 backdrop-blur ${t.tile}`}>
          <dt className={`mt-1 text-[11px] leading-4 ${t.body}`}>{s.label}</dt>
          <dd className={`text-xl font-semibold tracking-tight ${t.accent}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Spotlight({
  section,
  tone: t,
  onNavigate,
  latestArticle,
}: {
  section: NavSection;
  tone: Tone;
  onNavigate: () => void;
  latestArticle?: SpotlightArticle;
}) {
  switch (section.key) {
    case "products":
      return (
        <div className="space-y-3">
          <SpotlightLabel tone={t}>On the sheet</SpotlightLabel>
          <Link
            href="/products/technical-specifications#18k-5-star-inverter-split"
            onClick={onNavigate}
            className={`group block overflow-hidden rounded-3xl border transition-colors ${t.frame}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/products/specs/18k-5-star-inverter-split-idu.png"
                alt="18K 5-Star inverter split AC indoor unit"
                fill
                sizes="320px"
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className={`border-t px-5 py-4 ${t.hairline}`}>
              <p className={`text-sm font-semibold tracking-tight ${t.heading}`}>18K 5-Star Inverter Split</p>
              <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.14em] ${t.body}`}>
                ISEER 5.65 · 930-22&quot; chassis · R32
              </p>
            </div>
          </Link>
        </div>
      );
    case "services":
      return (
        <div className="space-y-3">
          <SpotlightLabel tone={t}>Under one roof</SpotlightLabel>
          <MiniTiles
            tone={t}
            items={[
              { value: "04", label: "Manufacturing plants" },
              { value: "1M+", label: "Units / year" },
              { value: "04", label: "Components in-house" },
              { value: "NABL", label: "Accredited lab" },
            ]}
          />
          <Link
            href="/services/oem-odm"
            onClick={onNavigate}
            className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${t.accent}`}
          >
            Compare engagement models
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      );
    case "about":
      return (
        <div className="space-y-3">
          <SpotlightLabel tone={t}>Recognised by the brands we build for</SpotlightLabel>
          <Link
            href="/about/quality"
            onClick={onNavigate}
            className={`block rounded-3xl bg-linear-to-br p-6 transition-opacity hover:opacity-95 ${t.band}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">LG</p>
            <p className="mt-2 text-2xl font-semibold leading-tight text-white">
              “Role Model Supplier”
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Earned on the line, not the letterhead.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-accent">
              Quality & Certifications
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      );
    case "insights":
      return latestArticle ? (
        <div className="space-y-3">
          <SpotlightLabel tone={t}>Latest</SpotlightLabel>
          <Link
            href={latestArticle.href}
            onClick={onNavigate}
            className={`group block rounded-3xl border p-6 transition-colors ${t.card}`}
          >
            <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${t.faint}`}>{latestArticle.meta}</p>
            <p className={`mt-3 text-xl font-semibold leading-tight tracking-tight ${t.heading}`}>
              {latestArticle.title}
            </p>
            <p className={`mt-3 line-clamp-3 text-sm leading-6 ${t.body}`}>{latestArticle.excerpt}</p>
            <span className={`mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${t.accent}`}>
              Read the article
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      ) : null;
    default:
      return null;
  }
}
