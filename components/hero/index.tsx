"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Full-viewport hero on a CSS-built midnight-navy studio backdrop (blue glow,
 * faint graph grid, receding floor grid). Copy reveals staggered on load.
 */
export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const reveal = (delay: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delay} ${
      ready ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
    }`;

  return (
    <section
      className="hero-bg relative -mt-16 h-svh overflow-hidden"
      aria-label="Ezentech manufacturing hero"
    >
      <div className="hero-grid-fine absolute inset-0" aria-hidden="true" />
      <div className="hero-floor" aria-hidden="true" />

      <div className="absolute inset-0 z-10 flex items-end pb-14 lg:pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-xs sm:max-w-sm lg:max-w-md">
            <h1
              className={`text-4xl font-semibold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl ${reveal("delay-0")}`}
            >
              Engineered
              <br />
              in-house.
            </h1>
            <p
              className={`mt-5 text-base font-medium leading-snug text-white/60 sm:text-lg ${reveal("delay-200")}`}
            >
              Four plants, one-million-unit capacity — chassis, coil, copper
              tubing and fascia, under one roof.
            </p>
            <div className={`mt-7 flex flex-wrap gap-3 ${reveal("delay-350")}`}>
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
              >
                get a quote
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/40 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white"
              >
                our capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
