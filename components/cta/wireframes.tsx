"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Group } from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Blueprint-style wireframe primitives floating behind the RFQ copy —
 * abstractions of what the plants make (coil block, chassis, compressor
 * drum, fin pack). Each drifts vertically at its own rate as the section
 * scrolls past (parallax) plus a slow idle turn. Purely decorative:
 * aria-hidden, pointer-events-none, static under reduced motion.
 */

const ACCENT = "#4074e0";

type DrifterProps = {
  progress: RefObject<number>;
  reducedMotion: boolean;
  base: [number, number, number];
  /** Vertical world-units travelled across the section's full scroll. */
  speed: number;
  /** Idle rotation, rad/s. */
  spin: number;
  children: ReactNode;
};

function Drifter({
  progress,
  reducedMotion,
  base,
  speed,
  spin,
  children,
}: DrifterProps) {
  const ref = useRef<Group>(null);
  // Smoothed local progress so the drift lags the scroll a touch.
  const eased = useRef(0.5);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group || reducedMotion) return;
    eased.current += (progress.current - eased.current) * Math.min(1, delta * 5);
    group.position.y = base[1] + (eased.current - 0.5) * speed;
    group.rotation.y += delta * spin;
    group.rotation.x += delta * spin * 0.35;
  });

  return (
    <group ref={ref} position={base} rotation={[0.4, 0.7, 0]}>
      {children}
    </group>
  );
}

export default function CtaWireframes({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0.5);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const wrap = wrapRef.current;
      if (!wrap) return;

      // Scroll-linked drift at lg only; below lg the progress stays at its
      // 0.5 rest value, so the primitives hold position and just idle-turn.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        ScrollTrigger.create({
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        });
        return () => {
          progress.current = 0.5;
        };
      });
    },
    { scope: wrapRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        resize={{ scroll: false }}
      >
        {/* Coil block — segmented so the wireframe reads as a fin grid */}
        <Drifter
          progress={progress}
          reducedMotion={reducedMotion}
          base={[-4.2, 0.7, -2]}
          speed={1.8}
          spin={0.1}
        >
          <mesh>
            <boxGeometry args={[1.7, 1.15, 0.7, 6, 1, 1]} />
            <meshBasicMaterial wireframe transparent color={ACCENT} opacity={0.32} />
          </mesh>
        </Drifter>

        {/* Copper line — torus loop */}
        <Drifter
          progress={progress}
          reducedMotion={reducedMotion}
          base={[4.4, -0.5, -1.5]}
          speed={2.6}
          spin={0.14}
        >
          <mesh>
            <torusGeometry args={[0.85, 0.28, 8, 22]} />
            <meshBasicMaterial wireframe transparent color={ACCENT} opacity={0.28} />
          </mesh>
        </Drifter>

        {/* Compressor drum */}
        <Drifter
          progress={progress}
          reducedMotion={reducedMotion}
          base={[3.7, 1.9, -3]}
          speed={1.1}
          spin={0.08}
        >
          <mesh>
            <cylinderGeometry args={[0.42, 0.42, 1.05, 12, 2]} />
            <meshBasicMaterial wireframe transparent color="#ffffff" opacity={0.14} />
          </mesh>
        </Drifter>

        {/* Fin pack — small, deepest, slowest */}
        <Drifter
          progress={progress}
          reducedMotion={reducedMotion}
          base={[-3.6, -1.7, -3.5]}
          speed={0.9}
          spin={0.06}
        >
          <mesh>
            <boxGeometry args={[0.95, 0.7, 0.45, 4, 2, 1]} />
            <meshBasicMaterial wireframe transparent color="#ffffff" opacity={0.12} />
          </mesh>
        </Drifter>
      </Canvas>
    </div>
  );
}
