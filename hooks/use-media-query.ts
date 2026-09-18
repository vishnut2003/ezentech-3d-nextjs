"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query, updating live. `null` until measured on the
 * client so callers can avoid acting on a guess before hydration.
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [query]);

  return matches;
}

/** Below Tailwind's `lg` (64rem) — the site's layout/motion breakpoint. */
export const COMPACT_QUERY = "(max-width: 1023px)";
