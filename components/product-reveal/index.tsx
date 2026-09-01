"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

// Heavy 3D loads lazily; it must never block the page.
const ProductScene = dynamic(() => import("./scene"), { ssr: false });

/**
 * Dark stage revealed from behind the capabilities sheet as its columns
 * split apart. Positioning (absolute, behind) is applied by the parent's
 * GSAP setup so no-JS and reduced-motion users see it as a normal section.
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
      <div className="hero-floor" aria-hidden="true" />

      <div className="reveal-inner absolute inset-0">
        <div className="absolute inset-0">
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
                view products
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
