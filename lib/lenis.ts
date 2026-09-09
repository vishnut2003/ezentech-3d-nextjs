import type Lenis from "lenis";

/**
 * Module-level handle on the site's Lenis instance so client islands can
 * scroll programmatically. SmoothScroll registers it after construction and
 * clears it on cleanup; under prefers-reduced-motion Lenis is never created,
 * so callers fall back to a native jump.
 */
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToElement(el: HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1 });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "auto" });
}
