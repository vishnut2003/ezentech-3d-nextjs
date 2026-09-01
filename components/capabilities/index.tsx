"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Heavy 3D loads lazily; it must never block the page.
const CoilScene = dynamic(() => import("./coil-scene"), { ssr: false });

const capabilities = [
  {
    title: "Heat-exchanger coils",
    body: "Fin-and-tube coils specced, built and tested in-house.",
  },
  {
    title: "Sheet metal fabrication",
    body: "Precision chassis and panels straight off our own lines.",
  },
  {
    title: "Plastic injection moulding",
    body: "Fascias and structural parts moulded under the same roof.",
  },
  {
    title: "Copper tubing & tooling",
    body: "Tube, tool and die capability that keeps quality ours.",
  },
];

/**
 * Section after the hero's full-bleed video: a white sheet that curtains up
 * over the footage (rounded top, negative margin), content staggering in as
 * it enters. The copper coil on the right is R3F, rotating with scroll.
 */
export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Coil rotation tracks the section's full journey through the viewport
      // (created regardless of motion preference — it only writes a scalar).
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      if (reducedMotion) return;

      // Entrance: heading block, then cards, then the 3D panel.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });
      tl.from(".cap-heading > *", {
        y: 44,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.09,
      })
        .from(
          ".cap-card",
          { y: 36, autoAlpha: 0, duration: 0.6, stagger: 0.08 },
          "-=0.35",
        )
        .from(
          ".cap-scene",
          { scale: 0.92, autoAlpha: 0, duration: 0.8 },
          "-=0.6",
        );
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative z-20 -mt-10 rounded-t-[3rem] bg-background shadow-[0_-24px_80px_rgba(3,8,20,0.45)]"
      aria-label="In-house manufacturing capabilities"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-32">
        <div>
          <div className="cap-heading">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              In-house manufacturing
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Every core component,
              <br />
              under one roof.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
              Backward integration is the Ezentech difference — coil, chassis,
              fascia and copper line all made on our own lines, so quality and
              lead times stay ours to promise.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="cap-card rounded-2xl border border-border bg-surface p-5"
              >
                <h3 className="font-semibold">{capability.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">
                  {capability.body}
                </p>
              </div>
            ))}
          </div>

          <div className="cap-card mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-medium text-surface transition-opacity hover:opacity-90"
            >
              explore capabilities
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="cap-scene h-[420px] lg:h-[540px]">
          <CoilScene progressRef={progressRef} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
