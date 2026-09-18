"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, type ComponentType } from "react";
import { useInViewReveal } from "@/hooks/use-in-view-reveal";
import { COMPACT_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { useNearViewport } from "@/hooks/use-near-viewport";
import type { StageSceneProps } from "./scene";

// Heavy 3D loads lazily; it must never block the page.
const ProductScene = dynamic(() => import("./scene"), { ssr: false });
const OduScene = dynamic(() => import("./odu-scene"), { ssr: false });
const WindowScene = dynamic(() => import("./window-scene"), { ssr: false });

type Slide = {
  n: 1 | 2 | 3;
  /** Copy-block class the capabilities master timeline targets. */
  copyClass: string;
  eyebrow: string;
  title: [string, string];
  body: string;
  cta: { href: string; label: string };
  caption: string;
  /** Phone-width caption — the full one wraps into a two-line pill. */
  captionShort: string;
  Scene: ComponentType<StageSceneProps>;
};

const slides: Slide[] = [
  {
    n: 1,
    copyClass: "reveal-copy",
    eyebrow: "From component to finished unit",
    title: ["Built complete.", "Shipped ready."],
    body: "Split, window, inverter and IDU/ODU ranges — assembled, tested and boxed on the same lines that make their parts.",
    cta: { href: "/products", label: "View Products" },
    caption: "01 — Split indoor unit · assembled on our lines",
    captionShort: "01 — Split indoor unit",
    Scene: ProductScene,
  },
  {
    n: 2,
    copyClass: "pr-copy-2",
    eyebrow: "Engineered as a pair",
    title: ["One system.", "Both sides."],
    body: "IDU and ODU chassis developed together — matched airflow, refrigerant line and mounting, ready to carry your brand.",
    cta: { href: "/products/idu-odu", label: "Explore IDU / ODU" },
    caption: "02 — Outdoor unit · engineered as a matched pair",
    captionShort: "02 — Outdoor unit",
    Scene: OduScene,
  },
  {
    n: 3,
    copyClass: "pr-copy-3",
    eyebrow: "The full range",
    title: ["Window. Inverter.", "Every format."],
    body: "From compact window units to high-efficiency inverter ranges — one manufacturing partner across every format your market asks for.",
    cta: { href: "/products", label: "See the Full Range" },
    caption: "03 — Window unit · the compact format",
    captionShort: "03 — Window unit",
    Scene: WindowScene,
  },
];

/**
 * Dark stage revealed from behind the capabilities sheet, holding THREE
 * slides.
 *
 * Desktop (lg): the slides are stacked absolutely in one viewport-height
 * frame; slides 2 and 3 start hidden and the parent's scrubbed timeline
 * shows and swaps them. No-JS and reduced-motion users at lg simply get
 * slide 1 as a normal section.
 *
 * Below lg: no scroll-driven motion at all — the three slides are ordinary
 * full-height sections in flow, each with its own copy and model. Canvases
 * mount only when near and pause while scrolled past; copy rises in once
 * on entry (useInViewReveal).
 */
export default function ProductReveal() {
  // Model staging follows the CSS breakpoint, not canvas measurement.
  // `null` until measured so nothing mounts on a guess.
  const compact = useMediaQuery(COMPACT_QUERY);

  return (
    <div
      className="product-reveal hero-bg relative overflow-hidden lg:h-svh"
      aria-label="From component to finished unit"
    >
      <div className="hero-grid-fine absolute inset-0" aria-hidden="true" />

      <div className="reveal-inner relative lg:absolute lg:inset-0">
        {slides.map((slide) => (
          <ProductSlide key={slide.n} slide={slide} compact={compact} />
        ))}

        {/* Accent sheen that sweeps through the frame during each slide
            swap — armed and driven by the capabilities master timeline. */}
        <div
          aria-hidden="true"
          className="pr-wipe pointer-events-none absolute inset-0 z-20 opacity-0 bg-[linear-gradient(to_top,transparent,rgba(64,116,224,0.10)_38%,rgba(255,255,255,0.05)_50%,rgba(64,116,224,0.10)_62%,transparent)]"
        />

        {/* Slide rail — 01/02/03 with an animated active tick; revealed and
            driven by GSAP only, so no-JS and reduced-motion users never see
            a dead control. */}
        <div
          aria-hidden="true"
          className="pr-slide-rail pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-6 opacity-0 lg:right-10 lg:flex"
        >
          {[1, 2, 3].map((n) => (
            <div key={n} className={`pr-dot-${n} flex items-center gap-3`}>
              <span className="pr-dot-num font-mono text-[11px] font-semibold tracking-[0.16em] text-white">
                0{n}
              </span>
              <span className="pr-dot-line h-px w-6 origin-right bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductSlide({
  slide,
  compact,
}: {
  slide: Slide;
  compact: boolean | null;
}) {
  const { n, copyClass, eyebrow, title, body, cta, caption, captionShort, Scene } =
    slide;
  const slideRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const { near, visible } = useNearViewport(slideRef);
  // Observe the copy block (it sits at the bottom of the slide on mobile),
  // so the entrance fires when the words arrive, not the slide's top edge.
  const inView = useInViewReveal(copyRef);

  // Desktop keeps its behaviour: canvases mount as soon as the breakpoint
  // is known and always render. Below lg each slide is its own full-height
  // block, so its canvas mounts only when near and pauses while scrolled
  // past — three live canvases on a phone would otherwise render forever.
  const mountScene = compact === false || (compact === true && near);
  const frameloop = compact && !visible ? "never" : "always";

  return (
    <div
      ref={slideRef}
      className={`pr-slide-${n} relative flex min-h-svh flex-col lg:absolute lg:inset-0 lg:min-h-0 ${
        n === 1 ? "lg:block" : "lg:hidden"
      }`}
    >
      <div className="hero-floor" aria-hidden="true" />
      {/* Below lg the scene is its own block above the copy (never behind
          it), so model and words can't collide; at lg it fills the frame. */}
      <div
        className={`pr-scene-${n} relative h-[50svh] shrink-0 lg:absolute lg:inset-0 lg:h-auto`}
      >
        {mountScene ? (
          <Scene compact={compact === true} frameloop={frameloop} />
        ) : null}
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start px-6 pb-8 lg:h-full lg:flex-none lg:justify-center lg:px-8 lg:pb-0">
        <div
          ref={copyRef}
          className={`${copyClass} max-w-sm lg:max-w-md`}
          data-inview={inView}
        >
          <p className="inview-reveal flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            <span aria-hidden="true" className="h-px w-8 bg-white/40" />
            {eyebrow}
          </p>
          <h2 className="inview-reveal reveal-delay-1 mt-3 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title[0]}
            <br />
            {title[1]}
          </h2>
          <p className="inview-reveal reveal-delay-2 mt-4 max-w-sm text-base leading-7 text-white/60">
            {body}
          </p>
          <div className="inview-reveal reveal-delay-3 pointer-events-auto mt-7">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Caption pill — in flow under the copy below lg, pinned to the
          frame's bottom edge at lg. */}
      <p className="pointer-events-none relative z-10 flex justify-center px-6 pb-6 lg:absolute lg:inset-x-0 lg:bottom-6 lg:px-0 lg:pb-0">
        <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-center text-[11px] font-medium uppercase tracking-[0.16em] whitespace-nowrap text-white/50 backdrop-blur">
          <span className="sm:hidden">{captionShort}</span>
          <span className="hidden sm:inline">{caption}</span>
        </span>
      </p>
    </div>
  );
}
