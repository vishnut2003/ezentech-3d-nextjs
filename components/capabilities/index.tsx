"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProductReveal from "@/components/product-reveal";
import { useInViewReveal } from "@/hooks/use-in-view-reveal";

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
 * Capabilities sheet (curtains over the hero video), then its own exit:
 * pinned while the two columns split left/right, the white sheet fades,
 * and the dark product stage behind scales up from depth. No-JS and
 * reduced-motion users get both sections in normal flow.
 *
 * Desktop (lg) only: below lg there is no scroll-driven motion — the sheet
 * and the product stage flow naturally and content rises in once on entry
 * (useInViewReveal + .inview-reveal).
 */
export default function Capabilities() {
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

      // Every scroll-driven piece lives at lg only (64rem = Tailwind's lg),
      // same gate as the hero. matchMedia reverts all of it — tweens,
      // triggers and the layout `gsap.set`s — on breakpoint change, so
      // below lg the section is plain flow with the CSS in-view entrance.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        // Entrance: heading block, then capability rows, then the 3D panel.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            defaults: { ease: "power3.out" },
          })
          .from(".cap-heading > *", {
            y: 44,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.09,
          })
          .from(
            ".cap-card",
            { y: 28, autoAlpha: 0, duration: 0.55, stagger: 0.07 },
            "-=0.35",
          )
          // Fade only — no scale/position change, so the 3D panel never
          // appears to relocate as it enters.
          .from(".cap-scene", { autoAlpha: 0, duration: 0.8 }, "-=0.5");

        // The scroll hint only exists when the pin does (class has opacity-0,
        // so no-JS and reduced-motion users never see it).
        gsap.set(".cap-scroll-hint", { autoAlpha: 1 });

        // The product stage sits BEHIND the sheet during the exit sequence.
        // Applied here (not CSS) so no-JS/reduced-motion keep normal flow.
        gsap.set(".product-reveal", {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
        });

        // Slides 2 and 3 wait below the frame; shown here so no-JS and
        // reduced-motion users are never left with overlapping slides.
        gsap.set(".pr-slide-2", { display: "block", yPercent: 110 });
        gsap.set(".pr-slide-3", { display: "block", yPercent: 110 });

        // Slide rail: armed only when the pinned story runs (class has
        // opacity-0). The active number/tick animates on each swap.
        gsap.set(".pr-slide-rail", { autoAlpha: 1 });
        const setActiveSlide = (n: number) => {
          for (let i = 1; i <= 3; i++) {
            const active = i === n;
            gsap.to(`.pr-dot-${i} .pr-dot-num`, {
              opacity: active ? 1 : 0.3,
              duration: 0.3,
              overwrite: "auto",
            });
            gsap.to(`.pr-dot-${i} .pr-dot-line`, {
              scaleX: active ? 1.8 : 1,
              backgroundColor: active ? "#4074e0" : "rgba(255,255,255,0.2)",
              duration: 0.3,
              overwrite: "auto",
            });
          }
        };
        let activeSlide = 0;
        const syncActiveSlide = (progress: number) => {
          const n = progress > 0.68 ? 3 : progress > 0.51 ? 2 : 1;
          if (n !== activeSlide) {
            activeSlide = n;
            setActiveSlide(n);
          }
        };
        syncActiveSlide(0);

        // The stage's arrival is time-based, not scrubbed. The stage itself
        // FADES only (scaling the wrapper would zoom the live canvas and read
        // as the model jumping); the zoom-from-depth lives on the copy alone.
        // Plays once past the reveal point and holds; scrolling back above
        // the point reverses it.
        gsap.set(".reveal-inner", { autoAlpha: 0 });
        gsap.set(".reveal-copy", { scale: 0.88 });
        const revealTl = gsap
          .timeline({ paused: true })
          .to(".reveal-inner", {
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
          })
          .to(
            ".reveal-copy",
            { scale: 1, duration: 0.7, ease: "power2.out" },
            0,
          );
        let revealShown = false;

        // Slides 2 and 3 copy zooms in the same way, one-shot, as each swap
        // lands.
        gsap.set(".pr-copy-2", { scale: 0.88, autoAlpha: 0 });
        const slide2Tl = gsap
          .timeline({ paused: true })
          .to(".pr-copy-2", {
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
          });
        let slide2Shown = false;

        gsap.set(".pr-copy-3", { scale: 0.88, autoAlpha: 0 });
        const slide3Tl = gsap
          .timeline({ paused: true })
          .to(".pr-copy-3", {
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
          });
        let slide3Shown = false;

        // Master pin, now spanning two acts: the curtain exit revealing the
        // stage, then the slide swap — slide 1 (copy, indoor unit, floor)
        // rides up and out while slide 2 rides up into its place.
        //
        // HOLD: dead scroll at the start of the pin (~185svh) so the sheet stays
        // readable after arriving, instead of splitting apart on the first
        // scroll tick. Every act position shifts by HOLD; the pin distance
        // grows by the matching 180svh (620% → 800%) so pacing is unchanged.
        const HOLD = 0.3;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=800%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Thresholds are timeline-time / total duration (1.3).
                const shouldShow = self.progress > 0.3;
                if (shouldShow !== revealShown) {
                  revealShown = shouldShow;
                  if (shouldShow) revealTl.play();
                  else revealTl.reverse();
                }
                const showSlide2 = self.progress > 0.51;
                if (showSlide2 !== slide2Shown) {
                  slide2Shown = showSlide2;
                  if (showSlide2) slide2Tl.play();
                  else slide2Tl.reverse();
                }
                const showSlide3 = self.progress > 0.68;
                if (showSlide3 !== slide3Shown) {
                  slide3Shown = showSlide3;
                  if (showSlide3) slide3Tl.play();
                  else slide3Tl.reverse();
                }
                syncActiveSlide(self.progress);
              },
            },
          })
          // During the hold: the progress line fills 1:1 with scroll and both
          // columns drift up at slightly different rates, so every scroll tick
          // gets visible feedback while the sheet stays put.
          .fromTo(
            ".cap-scroll-hint-fill",
            { scaleY: 0 },
            { scaleY: 1, duration: HOLD, ease: "none" },
            0,
          )
          .to(".cap-left", { y: -12, duration: HOLD, ease: "none" }, 0)
          .to(".cap-scene-exit", { y: -22, duration: HOLD, ease: "none" }, 0)
          .to(".cap-scroll-hint", { autoAlpha: 0, duration: 0.04 }, HOLD)
          // Act 1: split the columns, fade the sheet.
          .to(
            ".cap-left",
            { xPercent: -70, autoAlpha: 0, duration: 0.1, ease: "power2.in" },
            HOLD,
          )
          .to(
            ".cap-scene-exit",
            { xPercent: 70, autoAlpha: 0, duration: 0.1, ease: "power2.in" },
            HOLD,
          )
          .to(".cap-sheet", { autoAlpha: 0, duration: 0.07 }, HOLD + 0.07)
          // Act 2: first swap — indoor unit out, outdoor unit in.
          // Depth split: the outgoing copy leads the ride out while its scene
          // lags behind; the incoming copy and scene settle in sequence.
          // Translations only — scaling a canvas ancestor would shift models.
          .to(
            ".pr-slide-1",
            { yPercent: -110, duration: 0.13, ease: "power2.inOut" },
            HOLD + 0.3,
          )
          .to(
            ".reveal-copy",
            { yPercent: -35, duration: 0.13, ease: "power2.in" },
            HOLD + 0.3,
          )
          .to(
            ".pr-scene-1",
            { yPercent: 18, duration: 0.13, ease: "power2.inOut" },
            HOLD + 0.3,
          )
          .to(
            ".pr-slide-2",
            { yPercent: 0, duration: 0.13, ease: "power2.inOut" },
            HOLD + 0.3,
          )
          .fromTo(
            ".pr-copy-2",
            { yPercent: 30 },
            { yPercent: 0, duration: 0.15, ease: "power2.out" },
            HOLD + 0.31,
          )
          .fromTo(
            ".pr-scene-2",
            { yPercent: 12 },
            { yPercent: 0, duration: 0.16, ease: "power2.out" },
            HOLD + 0.31,
          )
          // Accent sheen sweeps through the frame with the swap.
          .fromTo(
            ".pr-wipe",
            { yPercent: 130, autoAlpha: 1 },
            { yPercent: -130, duration: 0.17, ease: "power2.inOut" },
            HOLD + 0.28,
          )
          // Act 3: second swap — outdoor unit out, window unit in.
          .to(
            ".pr-slide-2",
            { yPercent: -110, duration: 0.13, ease: "power2.inOut" },
            HOLD + 0.51,
          )
          .to(
            ".pr-copy-2",
            { yPercent: -35, duration: 0.13, ease: "power2.in" },
            HOLD + 0.51,
          )
          .to(
            ".pr-scene-2",
            { yPercent: 18, duration: 0.13, ease: "power2.inOut" },
            HOLD + 0.51,
          )
          .to(
            ".pr-slide-3",
            { yPercent: 0, duration: 0.13, ease: "power2.inOut" },
            HOLD + 0.51,
          )
          .fromTo(
            ".pr-copy-3",
            { yPercent: 30 },
            { yPercent: 0, duration: 0.15, ease: "power2.out" },
            HOLD + 0.52,
          )
          .fromTo(
            ".pr-scene-3",
            { yPercent: 12 },
            { yPercent: 0, duration: 0.16, ease: "power2.out" },
            HOLD + 0.52,
          )
          .fromTo(
            ".pr-wipe",
            { yPercent: 130, autoAlpha: 1 },
            {
              yPercent: -130,
              duration: 0.17,
              ease: "power2.inOut",
              immediateRender: false,
            },
            HOLD + 0.49,
          )
          // Long viewing hold on the window unit, then
          // Act 4: recede into depth while the quality sheet (margin overlap
          // below) slides up over it. The stage only DIMS — scaling it would
          // shift the model toward the viewport centre (any ancestor scale
          // moves the canvas); the zoom-out lives on the copy alone.
          .to(
            ".reveal-inner",
            { autoAlpha: 0.45, duration: 0.1, ease: "power2.in" },
            HOLD + 0.85,
          )
          .to(
            ".pr-copy-3",
            { scale: 0.9, duration: 0.1, ease: "power2.in" },
            HOLD + 0.85,
          )
          .to({}, { duration: 0.05 });

        // The quality section rides up OVER the receding stage during the
        // last 100svh of the pin (same curtain mechanism as hero→sheet).
        gsap.set("#quality", { marginTop: "-100svh" });

        ScrollTrigger.refresh();
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative z-20"
      aria-label="In-house manufacturing capabilities"
      data-inview={inView}
    >
      <div className="cap-sheet relative z-10 flex min-h-svh flex-col">
        {/* Dark backdrop behind the rounded top: the corner notches would
            otherwise expose the white pin-spacer area as the hero releases. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-16 bg-[#05080f]"
        />
        <div className="cap-bg relative flex flex-1 items-center rounded-t-[3rem] shadow-[0_-24px_80px_rgba(3,8,20,0.45)]">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:py-24 short:lg:py-10">
            <div className="cap-left">
              <div className="cap-heading">
                <p className="inview-reveal flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  <span aria-hidden="true" className="h-px w-8 bg-accent" />
                  In-house manufacturing
                </p>
                <h2 className="inview-reveal reveal-delay-1 mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                  Every core component,
                  <br />
                  <span className="text-accent">under one roof.</span>
                </h2>
                <p className="inview-reveal reveal-delay-2 mt-4 max-w-md text-base leading-7 text-muted">
                  Backward integration is{" "}
                  <span className="font-semibold text-foreground">
                    the Ezentech difference
                  </span>{" "}
                  — coil, chassis, fascia and copper line all made on our own
                  lines.
                </p>
              </div>

              <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2 short:lg:mt-6">
                {capabilities.map((capability, i) => (
                  <div
                    key={capability.title}
                    className={`cap-card inview-reveal reveal-delay-${i + 1} group -m-2 flex gap-4 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-surface`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold transition-colors group-hover:text-accent">
                        {capability.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {capability.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cap-card inview-reveal reveal-delay-4 mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 short:lg:mt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
                >
                  Explore Capabilities
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  NABL-accredited lab · 1M+ units / yr
                </p>
              </div>
            </div>

            {/* Exit wrapper: the split-apart tween owns THIS element, while the
                entrance fade owns .cap-scene inside — one owner per property. */}
            <div className="cap-scene-exit inview-reveal reveal-delay-2">
              <div className="cap-scene relative h-105 overflow-hidden rounded-4xl border border-border bg-surface lg:h-130 short:lg:h-[min(32.5rem,calc(100svh-8.5rem))]">
              {/* Engineering-grid stage + soft navy glow behind the model */}
              <div aria-hidden="true" className="stage-grid absolute inset-0" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_42%,rgba(44,56,138,0.1),transparent_70%)]"
              />
              <CoilScene reducedMotion={reducedMotion} />

              {/* Caption pill */}
              <p className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
                <span className="rounded-full border border-border bg-background/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted shadow-sm backdrop-blur">
                  Fin-and-tube coil block · built on our lines
                </span>
              </p>
            </div>
            </div>
          </div>

          {/* Scroll-progress hint: the accent line fills during the HOLD
              dead-scroll, then fades as the split begins. GSAP-driven. */}
          <div className="cap-scroll-hint pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              Scroll
            </span>
            <span className="relative h-8 w-px overflow-hidden rounded-full bg-border">
              <span className="cap-scroll-hint-fill absolute inset-0 origin-top bg-accent" />
            </span>
          </div>
        </div>
      </div>

      <ProductReveal />
    </section>
  );
}
