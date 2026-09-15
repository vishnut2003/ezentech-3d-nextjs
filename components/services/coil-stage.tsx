"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// The three.js chunk is only requested once the stage nears the viewport.
const CoilScene = dynamic(() => import("@/components/capabilities/coil-scene"), {
  ssr: false,
});

/**
 * The homepage's procedural fin-and-tube coil, staged for the coils page.
 * Fixed-height shell (no layout shift), IntersectionObserver-gated mount,
 * static under reduced motion.
 */
export default function CoilStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[22rem] overflow-hidden rounded-3xl border border-border bg-surface sm:h-[26rem] lg:h-[30rem]"
      role="img"
      aria-label="Procedural model of a fin-and-tube heat-exchanger coil: aluminium fin pack, copper tube circuit with serpentine U-bends, header manifold and end plates"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_42%,rgba(44,56,138,0.1),transparent_70%)]"
      />
      {near ? (
        <div className="absolute inset-0">
          <CoilScene reducedMotion={reducedMotion} />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <p className="rounded-full border border-border bg-background/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted backdrop-blur">
          Fin-and-tube coil · 2-row slit-fin, 7 mm tube
        </p>
      </div>
    </div>
  );
}
