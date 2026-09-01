"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroVideo from "./hero-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Full-viewport hero on a CSS midnight-navy studio backdrop.
 *
 * Scroll story (pinned, scrubbed): the copy slides out left while the framed
 * video panel scales up — uniformly, so the footage never distorts — until it
 * covers the viewport; after a short full-bleed hold the pin releases and the
 * page continues to the next section.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReady(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const section = sectionRef.current;
      const box = boxRef.current;
      const copy = copyRef.current;
      if (!section || !box || !copy) return;

      // Uniform cover scale + centre delta, measured fresh on every refresh
      // (invalidateOnRefresh reverts the tween first, so rects are natural).
      const coverScale = () => {
        const s = section.getBoundingClientRect();
        const b = box.getBoundingClientRect();
        return Math.max(s.width / b.width, s.height / b.height) * 1.02;
      };
      const dx = () => {
        const s = section.getBoundingClientRect();
        const b = box.getBoundingClientRect();
        return s.left + s.width / 2 - (b.left + b.width / 2);
      };
      const dy = () => {
        const s = section.getBoundingClientRect();
        const b = box.getBoundingClientRect();
        return s.top + s.height / 2 - (b.top + b.height / 2);
      };

      // Timing: expansion completes at exactly 55% of the 200% pin — the same
      // moment the overlap window (last 90/200) begins. Section arrival and
      // blur start together, right as the video reaches fullscreen.
      const OVERLAP_START = 0.55;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const o = Math.max(
              0,
              (self.progress - OVERLAP_START) / (1 - OVERLAP_START),
            );
            // Filter fully removed at rest — even blur(0px) rasterizes the
            // video layer and softens it everywhere.
            box.style.filter =
              o > 0.001
                ? `blur(${(o * 26).toFixed(1)}px) brightness(${(1 - 0.35 * o).toFixed(3)})`
                : "";
          },
        },
      });

      tl.to(copy, { x: -90, autoAlpha: 0, duration: 0.2, ease: "power1.in" }, 0)
        .to(
          box,
          {
            x: dx,
            y: dy,
            scale: coverScale,
            borderRadius: 0,
            borderColor: "rgba(255,255,255,0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.05,
        )
        // Full-bleed exactly at 0.55 of the timeline; the overlap + blur
        // phase fills the remainder.
        .to({}, { duration: 0.45 });

      // The next section rides up OVER the pinned full-bleed video during the
      // last 90svh of the pin. Applied AFTER the pin exists, followed by a
      // synchronous refresh, so margin + spacer land in the same tick —
      // otherwise the section flashes over the hero for a frame on reload.
      // (Set via GSAP, not CSS, so no-JS/reduced-motion keep normal flow.)
      gsap.set("#capabilities", { marginTop: "-90svh" });
      ScrollTrigger.refresh();

    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  const reveal = (delay: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delay} ${
      ready ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
    }`;

  return (
    <section
      ref={sectionRef}
      className="hero-bg relative -mt-16 h-svh overflow-hidden"
      aria-label="Ezentech manufacturing hero"
    >
      <div className="hero-grid-fine absolute inset-0" aria-hidden="true" />
      <div className="hero-floor" aria-hidden="true" />

      <div className="absolute inset-0 z-10 flex items-end pb-14 lg:pb-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-end gap-10 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          {/* Framed video panel, floating upper-right of the copy */}
          <div
            className={`relative z-20 order-first w-full lg:order-last lg:mb-40 lg:w-[55%] ${reveal("delay-150")}`}
          >
            <div
              ref={boxRef}
              className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_80px_rgba(64,116,224,0.18)]"
            >
              <HeroVideo />
            </div>
          </div>

          <div ref={copyRef} className="max-w-xs shrink-0 sm:max-w-sm lg:max-w-md">
            <h1
              className={`text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl ${reveal("delay-0")}`}
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
                className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-foreground transition-opacity hover:opacity-90"
              >
                get a quote
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/40 px-8 py-3.5 text-base font-bold text-white transition-colors hover:border-white"
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
