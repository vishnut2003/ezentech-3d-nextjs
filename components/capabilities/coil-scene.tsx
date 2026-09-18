"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Instance,
  Instances,
  Lightformer,
} from "@react-three/drei";
import { CatmullRomCurve3, Vector3, type Group } from "three";
import { COMPACT_QUERY, useMediaQuery } from "@/hooks/use-media-query";

/* --------------------------------------------------------- model layout */

const FIN_COUNT = 56;
const FIN_SPAN = 2.36; // fins run along X between the end plates
const TUBE_LEN = 2.44;
const ROWS = 8;
const ROW_STEP = 0.24;
const ROW_Y0 = -0.84;
const COLS = [-0.22, 0.22]; // two tube columns in Z, second one staggered
const STAGGER = 0.12;
const END_X = 1.22; // tube ends / U-bend centres
const BEND_R = ROW_STEP / 2;
const TUBE_R = 0.055;

const rowsY = (col: number) =>
  Array.from({ length: ROWS }, (_, i) => ROW_Y0 + i * ROW_STEP + col * STAGGER);

type HeatExchangerProps = {
  reducedMotion: boolean;
  compact: boolean;
};

/** Detailed procedural fin-and-tube heat-exchanger block: instanced fin
 *  pack, staggered copper circuit with serpentine U-bends, header manifold
 *  with curved line-set, steel end plates and feet. `compact` scales the
 *  block down for the narrow, near-square phone canvases (vertical fov)
 *  so the U-bends and line-set aren't cropped at the sides. */
function HeatExchanger({ reducedMotion, compact }: HeatExchangerProps) {
  const group = useRef<Group>(null);

  const fins = useMemo(
    () =>
      Array.from(
        { length: FIN_COUNT },
        (_, i) => -FIN_SPAN / 2 + i * (FIN_SPAN / (FIN_COUNT - 1)),
      ),
    [],
  );

  // Straight tube runs: every row in both columns.
  const tubes = useMemo(
    () =>
      COLS.flatMap((_, col) =>
        rowsY(col).map((y) => ({ y, z: COLS[col] })),
      ),
    [],
  );

  // Serpentine: pairs (0,1)(2,3)… bend on the right; (1,2)(3,4)… on the left.
  const bends = useMemo(() => {
    const list: { x: number; y: number; z: number; left: boolean }[] = [];
    COLS.forEach((z, col) => {
      const ys = rowsY(col);
      for (let i = 0; i + 1 < ROWS; i += 2)
        list.push({ x: END_X, y: (ys[i] + ys[i + 1]) / 2, z, left: false });
      for (let i = 1; i + 1 < ROWS; i += 2)
        list.push({ x: -END_X, y: (ys[i] + ys[i + 1]) / 2, z, left: true });
    });
    return list;
  }, []);

  // Header manifold line-set: curved inlet/outlet leaving the block.
  const [outletCurve, inletCurve] = useMemo(
    () => [
      new CatmullRomCurve3([
        new Vector3(1.42, 0.9, 0),
        new Vector3(1.42, 1.12, 0),
        new Vector3(1.62, 1.22, 0.12),
        new Vector3(1.95, 1.24, 0.3),
      ]),
      new CatmullRomCurve3([
        new Vector3(1.42, -0.9, 0),
        new Vector3(1.42, -1.12, 0),
        new Vector3(1.62, -1.22, -0.12),
        new Vector3(1.95, -1.24, -0.3),
      ]),
    ],
    [],
  );

  // Gentle sway around a fixed 3/4 hero angle — the fin pack and copper
  // circuit stay presented; the model never turns to a dull face-on view.
  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y =
      -0.55 + Math.sin(state.clock.elapsedTime * 0.35) * 0.3;
  });

  return (
    <group ref={group} rotation={[0.16, -0.55, 0]} scale={compact ? 0.72 : 1.02}>
      {/* Aluminium fin pack */}
      <Instances limit={FIN_COUNT}>
        <boxGeometry args={[0.02, 2.16, 0.98]} />
        <meshStandardMaterial color="#c9d2da" metalness={0.85} roughness={0.45} />
        {fins.map((x) => (
          <Instance key={x} position={[x, 0, 0]} />
        ))}
      </Instances>

      {/* Copper tube runs through the pack */}
      <Instances limit={tubes.length}>
        <cylinderGeometry args={[TUBE_R, TUBE_R, TUBE_LEN, 14]} />
        <meshStandardMaterial color="#b06a2f" metalness={1} roughness={0.3} />
        {tubes.map(({ y, z }) => (
          <Instance
            key={`${y}-${z}`}
            position={[0, y, z]}
            rotation={[0, 0, Math.PI / 2]}
          />
        ))}
      </Instances>

      {/* Serpentine U-bends outside the end plates */}
      <Instances limit={bends.length}>
        <torusGeometry args={[BEND_R, TUBE_R, 10, 18, Math.PI]} />
        <meshStandardMaterial color="#b06a2f" metalness={1} roughness={0.3} />
        {bends.map(({ x, y, z, left }) => (
          <Instance
            key={`${x}-${y}-${z}`}
            position={[x, y, z]}
            rotation={[0, 0, left ? Math.PI / 2 : -Math.PI / 2]}
          />
        ))}
      </Instances>

      {/* Galvanised end plates */}
      {[-1.21, 1.21].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.025, 2.24, 1.04]} />
          <meshStandardMaterial color="#aeb6bf" metalness={0.9} roughness={0.35} />
        </mesh>
      ))}

      {/* Header manifold + curved inlet/outlet line-set */}
      <mesh position={[1.42, 0, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 1.85, 16]} />
        <meshStandardMaterial color="#b06a2f" metalness={1} roughness={0.3} />
      </mesh>
      <mesh>
        <tubeGeometry args={[outletCurve, 32, 0.07, 12, false]} />
        <meshStandardMaterial color="#b06a2f" metalness={1} roughness={0.3} />
      </mesh>
      <mesh>
        <tubeGeometry args={[inletCurve, 32, 0.07, 12, false]} />
        <meshStandardMaterial color="#b06a2f" metalness={1} roughness={0.3} />
      </mesh>

      {/* Mounting feet */}
      {[-0.85, 0.85].map((x) => (
        <mesh key={x} position={[x, -1.16, 0]}>
          <boxGeometry args={[0.5, 0.08, 1.0]} />
          <meshStandardMaterial color="#3a4149" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}

      {/* Spec label on the end plate */}
      <mesh position={[1.226, 0.62, 0.28]}>
        <boxGeometry args={[0.006, 0.15, 0.38]} />
        <meshStandardMaterial color="#2c388a" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------------- scene */

type CoilSceneProps = {
  reducedMotion: boolean;
};

export default function CoilScene({ reducedMotion }: CoilSceneProps) {
  // Staging follows the CSS breakpoint, not canvas measurement (a late
  // canvas measure would re-stage the model after it is already in view).
  const compact = useMediaQuery(COMPACT_QUERY) === true;
  return (
    <Canvas
      camera={{ position: [0, 0.35, 7], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      {/* Procedural studio environment — metals need reflections, and this
          avoids a remotely hosted HDR. */}
      <Environment resolution={64} frames={1}>
        <Lightformer position={[0, 4, 3]} scale={[7, 4, 1]} intensity={2.4} />
        <Lightformer position={[-4, 1, 2]} scale={[3, 3, 1]} intensity={1.2} />
        <Lightformer
          position={[5, 0, -2]}
          rotation-y={Math.PI / 2}
          scale={[4, 3, 1]}
          intensity={1.6}
        />
      </Environment>

      <Float
        speed={reducedMotion ? 0 : 1}
        rotationIntensity={0.15}
        floatIntensity={0.4}
      >
        <HeatExchanger reducedMotion={reducedMotion} compact={compact} />
      </Float>

      <ContactShadows
        position={[0, -1.35, 0]}
        scale={12}
        blur={2.4}
        opacity={0.16}
        far={3.5}
        resolution={256}
        color="#1a2340"
      />
    </Canvas>
  );
}
