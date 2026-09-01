"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { AirConditioner } from "@/components/air-conditioner/AirConditioner";

type StagedUnitProps = {
  compact: boolean;
};

/** The finished split AC (realistic product materials), held perfectly
 *  still on a 3/4 hero angle — the reveal's scale-up is the only motion,
 *  so the model never appears to move on its own when it comes into view.
 *  Staged right of the copy on desktop, centred above it on small screens.
 *  `compact` comes from a CSS breakpoint (matchMedia), NOT from canvas
 *  viewport measurement — a late canvas measure was flipping the layout
 *  and teleporting the model after it came into view. */
function StagedUnit({ compact }: StagedUnitProps) {
  return (
    <group
      position={compact ? [0, 0.5, 0] : [1.7, -0.05, 0]}
      scale={compact ? 0.55 : 0.85}
      rotation={[0.18, -0.7, 0]}
    >
      <AirConditioner mode="product" louverOpen wireframe={false} />
    </group>
  );
}

type ProductSceneProps = {
  compact: boolean;
};

export default function ProductScene({ compact }: ProductSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 7.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4.2, 6.5, 5.5]} intensity={1.5} />
      <directionalLight position={[-6, 2.2, 4]} intensity={0.4} color="#eef2f7" />
      <directionalLight position={[-2.5, 3.5, -6.5]} intensity={0.8} />
      {/* Procedural studio environment — shapes the fascia clearcoat
          reflections without a remote HDR fetch. */}
      <Environment resolution={128} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.4}
          position={[0, 5, 2]}
          scale={[9, 4, 1]}
          rotation-x={-Math.PI / 2}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[-5, 1, 3]}
          scale={[3, 5, 1]}
          rotation-y={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          position={[5, 1, 3]}
          scale={[3, 5, 1]}
          rotation-y={-Math.PI / 2}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[0, 1, -6]}
          scale={[8, 3, 1]}
        />
      </Environment>

      <StagedUnit compact={compact} />

      <ContactShadows
        position={[0, -0.85, 0]}
        scale={11}
        blur={2.4}
        opacity={0.4}
        far={2.2}
        resolution={512}
        color="#000814"
      />
    </Canvas>
  );
}
