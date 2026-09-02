"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

// Heavy 3D loads lazily; it must never block the page.
const ProductScene = dynamic(() => import("./scene"), { ssr: false });
const OduScene = dynamic(() => import("./odu-scene"), { ssr: false });
const WindowScene = dynamic(() => import("./window-scene"), { ssr: false });

/**
 * Dark stage revealed from behind the capabilities sheet, holding TWO
 * slides. During the extended pin, slide 1 (copy + indoor unit + floor)
 * rides up and out while slide 2 (copy + outdoor unit + its own floor)
 * rides up into place — the slide swap is driven by the parent's scrubbed
 * timeline. Slide 2 starts hidden (shown by GSAP), so no-JS and
 * reduced-motion users simply get slide 1 as a normal section.
 */
export default function ProductReveal() {
  // Model staging follows the CSS breakpoint, not canvas measurement.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div
      className="product-reveal hero-bg relative h-svh overflow-hidden"
      aria-label="From component to finished unit"
    >
      <div className="hero-grid-fine absolute inset-0" aria-hidden="true" />

      <div className="reveal-inner absolute inset-0">
        {/* Slide 1 — the finished indoor unit */}
        <div className="pr-slide-1 absolute inset-0">
          <div className="hero-floor" aria-hidden="true" />
          <div className="pr-scene-1 absolute inset-0">
            <ProductScene compact={compact} />
          </div>

          <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-14 lg:justify-center lg:pb-0 lg:px-8">
            <div className="reveal-copy max-w-sm lg:max-w-md">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                <span aria-hidden="true" className="h-px w-8 bg-white/40" />
                From component to finished unit
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Built complete.
                <br />
                Shipped ready.
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-white/60">
                Split, window, inverter and IDU/ODU ranges — assembled, tested
                and boxed on the same lines that make their parts.
              </p>
              <div className="pointer-events-auto mt-7">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
                >
                  View Products
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Caption pill */}
          <p className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50 backdrop-blur">
              01 — Split indoor unit · assembled on our lines
            </span>
          </p>
        </div>

        {/* Slide 2 — the outdoor unit; hidden until GSAP arms the swap */}
        <div className="pr-slide-2 absolute inset-0 hidden">
          <div className="hero-floor" aria-hidden="true" />
          <div className="pr-scene-2 absolute inset-0">
            <OduScene compact={compact} />
          </div>

          <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-14 lg:justify-center lg:pb-0 lg:px-8">
            <div className="pr-copy-2 max-w-sm lg:max-w-md">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                <span aria-hidden="true" className="h-px w-8 bg-white/40" />
                Engineered as a pair
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                One system.
                <br />
                Both sides.
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-white/60">
                IDU and ODU chassis developed together — matched airflow,
                refrigerant line and mounting, ready to carry your brand.
              </p>
              <div className="pointer-events-auto mt-7">
                <Link
                  href="/products/idu-odu"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
                >
                  Explore IDU / ODU
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Caption pill */}
          <p className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50 backdrop-blur">
              02 — Outdoor unit · engineered as a matched pair
            </span>
          </p>
        </div>

        {/* Slide 3 — the window unit; hidden until GSAP arms the swap */}
        <div className="pr-slide-3 absolute inset-0 hidden">
          <div className="hero-floor" aria-hidden="true" />
          <div className="pr-scene-3 absolute inset-0">
            <WindowScene compact={compact} />
          </div>

          <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-14 lg:justify-center lg:pb-0 lg:px-8">
            <div className="pr-copy-3 max-w-sm lg:max-w-md">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                <span aria-hidden="true" className="h-px w-8 bg-white/40" />
                The full range
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Window. Inverter.
                <br />
                Every format.
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-white/60">
                From compact window units to high-efficiency inverter ranges —
                one manufacturing partner across every format your market asks
                for.
              </p>
              <div className="pointer-events-auto mt-7">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
                >
                  See the Full Range
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Caption pill */}
          <p className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50 backdrop-blur">
              03 — Window unit · the compact format
            </span>
          </p>
        </div>

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
