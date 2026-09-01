@AGENTS.md

# Ezentech India — 3D Corporate Platform

## Project Overview

Corporate website for **Ezentech India Pvt. Ltd.** — an OEM/ODM air-conditioner manufacturer (4 plants, 1M-unit capacity, NABL-accredited psychrometric lab, in-house components: heat-exchanger coils, sheet metal, injection moulding, copper tubing & tooling).

- **Scope:** 22 pages across 6 sections — Homepage (1), About (4), Services & Capabilities (8), Products (5), Knowledge & Insights (3), Contact (1).
- **Architecture reference:** nibe.eu — calm, premium, uncluttered, capability-led.
- **Craft bar:** Awwwards-level design with Locomotive-style scroll-driven motion.
- **Source of truth:** the PDFs in `project-details/` (`development-details.pdf` for scope/sitemap, `design-client-approve.pdf` for the approved design direction).

## This is a 3D website

The design is **3D/motion-first**. Signature interactions to build:

1. **Exploded AC unit hero** — scroll-driven 3D animation pulling a split AC apart (chassis, coil, copper tubing, fascia), each part labelled "made in-house."
2. **Factory line in motion** — cinematic scroll-driven footage sequences.
3. **Interactive India capability map** — four plants, hover reveals capacity/certifications.
4. **Frictionless RFQ** — enquiry CTA one click away on every page.

Build hero/feature sections with **React Three Fiber + drei** (3D), **GSAP + ScrollTrigger** (scroll storytelling), and **Lenis** (smooth scroll). Do not add a second animation library (no framer-motion) — GSAP covers all motion needs.

## Stack Conventions

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.
- 3D scenes and GSAP-animated sections are **client components** (`"use client"`); load heavy 3D scenes with `next/dynamic` so they never block initial paint.
- Keep content/SEO pages as **server components** — 3D/motion is layered in via isolated client islands.
- 3D deps: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`. Motion: `gsap`, `@gsap/react`. Scroll: `lenis`.

## Design System Rules

- **Light, engineered palette** — clean white base with a single confident accent colour (NIBE-style restraint). The design PDF proposed a dark palette, but the direction was changed to white-only — do not switch back to dark. No dark mode.
- **Large, confident typography** — big statements, generous whitespace.
- **Real photography only** — plants, lines, lab, chassis. No generic stock.
- **Motion with intent** — scroll-driven reveals that guide attention; never decorative motion for its own sake.
- Respect `prefers-reduced-motion` in every animated section.

## Performance Budget (non-negotiable, from the approved design doc)

- Cinematic on the **homepage** (the emotional job is credibility).
- **Fast and frictionless** on product, component and RFQ pages (the commercial job is conversion).
- Core Web Vitals matter directly for SEO and AI-search citation — performance is designed in from day one, not bolted on.

## SEO & GEO/AEO Requirements

- Schema.org structured data (JSON-LD) and complete metadata on every page.
- AI-answer readiness (GEO/AEO): clean semantic HTML, citable passages, authority content.
- Every service and in-house component gets its own indexable page.
- Site ships in English.
