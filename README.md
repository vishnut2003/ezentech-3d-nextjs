# Ezentech India — 3D Corporate Platform

A world-class digital presence for **Ezentech India Pvt. Ltd.**, an OEM/ODM air-conditioner manufacturer. This is a complete website rebuild — a focused **22-page corporate platform** modelled on the clean, premium architecture of [nibe.eu](https://www.nibe.eu/), delivered with **award-grade (Awwwards-level) craft, Locomotive-style scroll-driven motion, and interactive 3D**.

> Built by WebSpider Solutions · Delhi NCR

## Built in 3D

This site is designed as a **3D-first experience**, not a flat corporate brochure. The signature interactions:

- **The exploded AC unit** — a scroll-driven 3D animation that pulls a split AC apart mid-air (chassis, heat-exchanger coil, copper tubing, moulded fascia), each part labelled "made in-house." The hero moment that tells Ezentech's backward-integration story without a word of copy.
- **The line, in motion** — cinematic factory footage as a scroll-driven sequence: sheet metal in, finished unit out.
- **Interactive capability map** — an India map with the four plants; hover to reveal capacity, capabilities and certifications.
- **The lab, on camera** — the NABL-accredited psychrometric lab presented as a genuine differentiator.
- **Live trust wall** — LG "Role Model Supplier" recognition and blue-chip partner proof.
- **Frictionless RFQ** — a structured enquiry engine that stays one click away throughout.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| 3D engine | Three.js via `@react-three/fiber` + `@react-three/drei` |
| 3D post-processing | `@react-three/postprocessing` (bloom, DoF polish) |
| Motion | GSAP + ScrollTrigger (`gsap`, `@gsap/react`) |
| Smooth scroll | Lenis (`lenis`) — the Locomotive-style feel |

## Site Structure — 22 pages, 6 sections

### 1. Homepage (1 page)
- Bespoke, cinematic motion-led hero (exploded 3D AC unit), capability snapshot, trust proof, clear enquiry path

### 2. About Ezentech (4 pages)
- Get to Know Ezentech — company story, 20-year legacy, scale, vision
- Manufacturing & Infrastructure — four plants, 1M-unit capacity, smart-factory capability
- Quality, Certifications & Sustainability
- Leadership & Our Journey

### 3. Services & Capabilities (8 pages)
- Services Overview
- OEM, ODM, Private Label & Contract Manufacturing
- Heat Exchanger Coils
- Sheet Metal Fabrication
- Plastic Injection Moulding
- Copper Tubing & Tooling
- R&D & Product Development
- Testing & Quality Assurance (NABL-accredited psychrometric lab)

### 4. Products (5 pages)
- Products Overview
- Split Air Conditioners (1.0–2.5 TR, fixed & inverter)
- Window Air Conditioners
- Inverter AC Range
- Indoor & Outdoor Units (IDU/ODU)

### 5. Knowledge & Insights (3 pages)
- Insights, Blog & News (SEO/GEO content hub)
- Technical Knowledge — How AC Manufacturing Works
- Case Studies

### 6. Contact (1 page)
- Contact Us — locations, map, routing, enquiry form

## Design Direction

- **Light, engineered palette** — clean white base with a single confident accent. NIBE-style calm and restraint; reads as precision engineering. (White-only — no dark mode.)
- **Large, confident typography** — big statements, generous whitespace, nothing crowded.
- **Real photography, not stock** — the plants, the lines, the lab, the chassis.
- **Motion with intent** — scroll-driven reveals and micro-interactions that guide attention. Never motion for its own sake.
- **Performance budget** — cinematic on the homepage where the emotional job is credibility; fast and frictionless on product, component and RFQ pages where the commercial job is conversion. Core Web Vitals discipline is designed in, not bolted on.

## SEO & GEO/AEO Foundation

- Clean technical build with schema (JSON-LD), metadata and AI-answer readiness on every page
- Built to surface in both traditional Google search and AI answer engines (AI Overviews, ChatGPT, Perplexity)
- Structured RFQ/enquiry engine that turns visits into qualified, sales-ready leads

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint
```

## Project Reference

Full scope, sitemap and approved design direction live in [project-details/](project-details/):

- `development-details.pdf` — the website revamp proposal (scope, sitemap, timeline)
- `design-client-approve.pdf` — the approved design direction & reference board
