"use client";

import { useEffect, useState, type RefObject } from "react";

export type InViewState = "pending" | "true" | undefined;

/**
 * One-shot viewport entrance for the mobile homepage (no scroll-driven
 * motion below lg). Returns `undefined` on the server and before hydration
 * (content fully visible, so no-JS users lose nothing), `"pending"` once
 * armed, and `"true"` the first time the root intersects — after which the
 * observer disconnects. Spread the value as `data-inview` on the root; the
 * CSS in globals.css does the hiding and the reveal-up animation.
 */
export function useInViewReveal(ref: RefObject<Element | null>): InViewState {
  const [state, setState] = useState<InViewState>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setState("pending");
    // Fires once the root's leading edge is 12% up from the viewport bottom
    // (an area threshold would make tall sections wait far too long).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("true");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return state;
}
