"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useInViewReveal } from "@/hooks/use-in-view-reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const certifications = [
  { label: "NABL", detail: "Accredited psychrometric lab" },
  { label: "ISO 9001", detail: "Quality management" },
  { label: "ISO 14001", detail: "Environmental management" },
  { label: "BIS", detail: "Certified product ranges" },
];

/**
 * Quality & trust: the white sheet that slides up over the zooming-out
 * product stage (overlap margin applied by the capabilities pin). Content
 * staggers in once it's on screen. Desktop (lg) only — below lg the sheet
 * flows naturally and content rises in once on entry (useInViewReveal).
 */
export default function Quality() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const inView = useInViewReveal(sectionRef);

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

      // Scroll-driven work at lg only, same gate as the hero; matchMedia
      // reverts it all on breakpoint change.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
            defaults: { ease: "power3.out" },
          })
          .from(".quality-heading > *", {
            y: 44,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.09,
          })
          .from(
            ".quality-card",
            { y: 28, autoAlpha: 0, duration: 0.55, stagger: 0.07 },
            "-=0.35",
          );

        // Viewing hold: pin the sheet for ~100svh of dead scroll after it
        // arrives, the progress line filling 1:1 with scroll and the content
        // drifting up a touch — same affordance as the capabilities hold.
        // Pins .quality-pin (not the section) so the -100svh overlap margin
        // the capabilities pin puts on #quality stays out of the pin math.
        // (The hint's class has opacity-0, so no-JS and reduced-motion users
        // never see it.)
        gsap.set(".quality-scroll-hint", { autoAlpha: 1 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              pin: ".quality-pin",
              start: "top top",
              end: "+=100%",
              scrub: 0.4,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            ".quality-scroll-hint-fill",
            { scaleY: 0 },
            { scaleY: 1, duration: 0.9, ease: "none" },
            0,
          )
          .to(".quality-inner", { y: -14, duration: 0.9, ease: "none" }, 0)
          .to(".quality-scroll-hint", { autoAlpha: 0, duration: 0.1 }, 0.9);
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="quality"
      className="relative z-30"
      aria-label="Quality, certifications and trust"
      data-inview={inView}
    >
      {/* Pinned as one unit for the viewing hold — backdrop included, so the
          rounded-corner notches never expose the white spacer mid-pin. */}
      <div className="quality-pin relative">
      {/* Dark backdrop behind the rounded top: the corner notches would
          otherwise expose the white pin-spacer area after release. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-16 bg-[#05080f]"
      />
      <div className="cap-bg relative flex min-h-svh flex-col justify-center rounded-t-[3rem] shadow-[0_-24px_80px_rgba(3,8,20,0.45)]">
        <div className="quality-inner mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="quality-heading">
              <p className="inview-reveal flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Quality &amp; certifications
              </p>
              <h2 className="inview-reveal reveal-delay-1 mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
                Tested like it ships.
                <br />
                <span className="text-accent">Certified like it matters.</span>
              </h2>
              <p className="inview-reveal reveal-delay-2 mt-3 max-w-xl text-base leading-7 text-muted">
                Every unit passes through our{" "}
                <span className="font-semibold text-foreground">
                  NABL-accredited psychrometric lab
                </span>{" "}
                — the de-risking a procurement head needs, on paper and on
                camera.
              </p>
            </div>

            {/* Featured proof stats */}
            <div className="quality-card inview-reveal reveal-delay-3 rounded-3xl border border-border bg-background/70 p-5 backdrop-blur">
              {[
                { value: "100%", label: "Units through the psychrometric lab" },
                { value: "1M+", label: "Annual unit capacity, four plants" },
                { value: "20+ yrs", label: "OEM / ODM manufacturing legacy" },
              ].map((stat, i) => (
                <div
                  key={stat.value}
                  className={`flex items-baseline gap-5 py-2.5 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <p className="w-24 shrink-0 text-2xl font-semibold tracking-tight text-accent">
                    {stat.value}
                  </p>
                  <p className="text-sm leading-6 text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((certification, i) => (
              // Outer element is the entrance target only (GSAP at lg, CSS
              // in-view below); the hover transition lives on the inner
              // wrapper so entrance and hover never animate the same element.
              <div
                key={certification.label}
                className={`quality-card inview-reveal reveal-delay-${i + 1} group`}
              >
                <div className="rounded-2xl border border-border bg-background/70 p-4 backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1.5l5.5 2v4c0 3.2-2.3 5.6-5.5 7-3.2-1.4-5.5-3.8-5.5-7v-4l5.5-2z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.5 8l1.8 1.8L10.8 6.4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {certification.label}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {certification.detail}
                </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust band — inverted navy */}
          <div className="quality-card inview-reveal reveal-delay-2 mt-7 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-linear-to-r from-accent to-[#1c2666] p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Recognised by the brands we build for
              </p>
              <p className="mt-1.5 text-lg font-semibold text-white sm:text-xl">
                LG{" "}
                <span className="underline decoration-white/40 underline-offset-4">
                  “Role Model Supplier”
                </span>{" "}
                — earned on the line, not the letterhead.
              </p>
            </div>
            <Link
              href="/about/quality"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-accent transition-opacity hover:opacity-90"
            >
              Our Quality Process
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Scroll-progress hint: the accent line fills during the pinned
            hold, then fades as the pin releases. GSAP-driven. */}
        <div className="quality-scroll-hint pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Scroll
          </span>
          <span className="relative h-8 w-px overflow-hidden rounded-full bg-border">
            <span className="quality-scroll-hint-fill absolute inset-0 origin-top bg-accent" />
          </span>
        </div>
      </div>
      </div>
    </section>
  );
}
