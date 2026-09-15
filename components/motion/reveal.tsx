"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * One-shot entrance stagger for server-rendered children. Every descendant
 * carrying `data-reveal` rises in when the wrapper reaches the viewport.
 * Children stay in normal flow (and fully visible) with no JS or under
 * prefers-reduced-motion — GSAP only ever animates *from* a hidden state.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  id,
  ariaLabelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  ariaLabelledBy?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reducedMotion) return;
      const targets = root.querySelectorAll("[data-reveal]");
      if (!targets.length) return;

      gsap.from(targets, {
        y: 28,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} className={className} id={id} aria-labelledby={ariaLabelledBy}>
      {children}
    </Tag>
  );
}
