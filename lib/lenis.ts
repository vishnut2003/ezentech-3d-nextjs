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

/**
 * Freeze page scrolling while an overlay (mobile nav) is open. Lenis's
 * `stop()` also adds `.lenis-stopped { overflow: hidden }` on <html>; without
 * Lenis (reduced motion) the body is locked directly. Returns the undo.
 */
export function lockScroll(): () => void {
  if (instance) {
    instance.stop();
    return () => instance?.start();
  }
  const previous = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = previous;
  };
}

export function scrollToElement(el: HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1 });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "auto" });
}
