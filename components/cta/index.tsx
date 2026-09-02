"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Decorative 3D loads lazily; it must never block the page.
const CtaWireframes = dynamic(() => import("./wireframes"), { ssr: false });

/**
 * Final RFQ close on the midnight stage. Transition: under-reveal parallax —
 * the content starts shifted up and scrubs to rest as the section scrolls
 * in, so the dark stage reads as having been waiting beneath the quality
 * sheet. Content then staggers in one-shot.
 */
export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
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
      if (reducedMotion) return;

      // Under-reveal parallax: content lags the scroll while entering.
      // One-way only — `once` kills the trigger the first time the section
      // settles, so scrolling back up never reverses the shift (reversed, the
      // copy rides along with the viewport instead of resting in the section).
      gsap.fromTo(
        ".cta-inner",
        { yPercent: -35 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 0.4,
            invalidateOnRefresh: true,
            once: true,
            // The scrubbed tween lags (0.4s); pin the exact rest position
            // before the kill so it can't freeze a few percent short.
            onLeave: () => gsap.set(".cta-inner", { yPercent: 0 }),
          },
        },
      );

      // One-shot stagger once the section is well on screen.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 45%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        })
        .from(".cta-stagger > *", {
          y: 40,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.09,
        });
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      className="hero-bg relative z-10 overflow-hidden"
      aria-label="Start your enquiry"
    >
      <div className="hero-grid-fine absolute inset-0" aria-hidden="true" />
      <div className="hero-floor" aria-hidden="true" />
      <CtaWireframes reducedMotion={reducedMotion} />

      <div className="cta-inner relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        <div className="cta-stagger flex flex-col items-center">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            <span aria-hidden="true" className="h-px w-8 bg-white/40" />
            Start the conversation
            <span aria-hidden="true" className="h-px w-8 bg-white/40" />
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let&rsquo;s build
            <br />
            your next range.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/60 sm:text-lg">
            From spec to shipped — send us your requirement and get a
            structured, engineering-backed quote.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-foreground transition-opacity hover:opacity-90"
            >
              Get a Quote
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/40 px-8 py-3.5 text-base font-bold text-white transition-colors hover:border-white"
            >
              Our Capabilities
            </Link>
          </div>
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
            OEM / ODM · Private label · Contract manufacturing
          </p>
        </div>
      </div>
    </section>
  );
}
