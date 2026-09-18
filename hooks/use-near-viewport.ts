"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Proximity gates for heavy 3D canvases.
 *
 * `near` flips to true once and stays — mount the canvas then, so pages
 * never pay for WebGL before the section is within `rootMargin` of the
 * viewport. `visible` tracks actual intersection live — pause the render
 * loop (`frameloop="never"`) while the canvas is scrolled out of view.
 */
export function useNearViewport(
  ref: RefObject<Element | null>,
  rootMargin = "400px 0px",
) {
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearIo = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          nearIo.disconnect();
        }
      },
      { rootMargin },
    );
    const visibleIo = new IntersectionObserver((entries) => {
      setVisible(entries.some((e) => e.isIntersecting));
    });
    nearIo.observe(el);
    visibleIo.observe(el);
    return () => {
      nearIo.disconnect();
      visibleIo.disconnect();
    };
  }, [ref, rootMargin]);

  return { near, visible };
}
