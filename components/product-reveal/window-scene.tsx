"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";

/* Clean white body with silver louvres — matches the ODU family look. */
const BODY = "#f5f6f7";
const BODY_SOFT = "#e9ebed";
const BARS = "#dde0e4";
const SCREW = "#8b8f94";

/* Fascia front plane. */
const FACE = 1.0;

type WindowUnitProps = {
  compact: boolean;
};

/** Procedural window AC: chassis, oversized fascia flange, recessed louvre
 *  grille with dark depth behind, control column with display and knobs,
 *  side case ribs. Held perfectly still. */
function WindowUnit({ compact }: WindowUnitProps) {
  const louvres = useMemo(
    () => Array.from({ length: 15 }, (_, i) => -0.82 + i * 0.117),
    [],
  );
  const ribs = useMemo(
    () => Array.from({ length: 5 }, (_, i) => -0.7 + i * 0.35),
    [],
  );

  return (
    <group
      position={compact ? [0, 0.55, 0] : [1.75, 0.1, 0]}
      scale={compact ? 0.46 : 0.72}
      rotation={[0.14, 0.58, 0]}
    >
      {/* Chassis */}
      <RoundedBox args={[3.1, 2.1, 1.9]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial
          color={BODY_SOFT}
          roughness={0.45}
          metalness={0.05}
          clearcoat={0.25}
          clearcoatRoughness={0.4}
        />
      </RoundedBox>

      {/* Fascia flange, proud of the chassis */}
      <RoundedBox
        args={[3.34, 2.34, 0.1]}
        radius={0.06}
        smoothness={4}
        position={[0, 0, 0.95]}
      >
        <meshPhysicalMaterial
          color={BODY}
          roughness={0.42}
          metalness={0.05}
          clearcoat={0.35}
          clearcoatRoughness={0.35}
        />
      </RoundedBox>

      {/* Recessed dark depth behind the grille */}
      <mesh position={[-0.42, 0, FACE - 0.012]}>
        <boxGeometry args={[2.06, 1.86, 0.02]} />
        <meshStandardMaterial color="#222831" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Louvre grille */}
      {louvres.map((y) => (
        <mesh key={y} position={[-0.42, y, FACE + 0.02]}>
          <boxGeometry args={[2.0, 0.055, 0.02]} />
          <meshStandardMaterial color={BARS} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
      {/* Grille frame uprights */}
      {[-1.46, 0.62].map((x) => (
        <mesh key={x} position={[x, 0, FACE + 0.016]}>
          <boxGeometry args={[0.06, 1.92, 0.03]} />
          <meshStandardMaterial color={BARS} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}

      {/* Control column: panel, display, knobs */}
      <mesh position={[1.06, 0, FACE + 0.004]}>
        <boxGeometry args={[0.78, 1.92, 0.015]} />
        <meshStandardMaterial color={BODY_SOFT} metalness={0.05} roughness={0.5} />
      </mesh>
      <RoundedBox
        args={[0.52, 0.3, 0.02]}
        radius={0.04}
        smoothness={3}
        position={[1.06, 0.62, FACE + 0.02]}
      >
        <meshPhysicalMaterial
          color="#101726"
          metalness={0.2}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>
      <mesh position={[0.95, 0.62, FACE + 0.035]}>
        <boxGeometry args={[0.14, 0.08, 0.006]} />
        <meshStandardMaterial
          color="#2c388a"
          emissive="#2c388a"
          emissiveIntensity={0.5}
        />
      </mesh>
      {[0.05, -0.5].map((y) => (
        <group key={y} position={[1.06, y, FACE + 0.02]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.07, 24]} />
            <meshPhysicalMaterial
              color={BODY}
              roughness={0.4}
              metalness={0.05}
              clearcoat={0.3}
              clearcoatRoughness={0.35}
            />
          </mesh>
          <mesh position={[0, 0.06, 0.04]}>
            <boxGeometry args={[0.02, 0.08, 0.012]} />
            <meshStandardMaterial color={SCREW} metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Fascia corner screws */}
      {[
        [-1.5, 1.02],
        [1.5, 1.02],
        [-1.5, -1.02],
        [1.5, -1.02],
      ].map(([x, y]) => (
        <mesh
          key={`${x}-${y}`}
          position={[x, y, FACE + 0.008]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.022, 0.022, 0.012, 12]} />
          <meshStandardMaterial color={SCREW} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Case ribs along both sides */}
      {ribs.map((y) =>
        [-1.56, 1.56].map((x) => (
          <mesh key={`${x}-${y}`} position={[x, y, -0.1]}>
            <boxGeometry args={[0.02, 0.07, 1.55]} />
            <meshStandardMaterial
              color="#d3d7db"
              metalness={0.1}
              roughness={0.55}
            />
          </mesh>
        )),
      )}

      {/* Bottom tray lip */}
      <mesh position={[0, -1.2, 0.9]}>
        <boxGeometry args={[3.36, 0.08, 0.08]} />
        <meshStandardMaterial color={BODY_SOFT} metalness={0.05} roughness={0.55} />
      </mesh>
    </group>
  );
}

type WindowSceneProps = {
  compact: boolean;
};

export default function WindowScene({ compact }: WindowSceneProps) {
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

      <WindowUnit compact={compact} />

      <ContactShadows
        position={[0, -0.95, 0]}
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
