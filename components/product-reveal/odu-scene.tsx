"use client";

import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import { ExtrudeGeometry, Shape } from "three";

/* Clean white body plastic; grille bars a light silver. */
const BODY = "#f5f6f7";
const BODY_SOFT = "#e9ebed";
const SEAM = "#d9dcdf";
const BARS = "#dde0e4";
const SCREW = "#8b8f94";

/* Reference proportions (Daikin 675×550×284): W 3.4, H 2.6, D 1.4. */
const SHELL_W = 3.4;
const SHELL_H = 2.6;
const SHELL_D = 1.4;
const FACE = SHELL_D / 2 + 0.035; // front plane incl. bevel

/** Shell cross-section: rounded-corner plan swept vertically with a small
 *  bevel — reads as wrapped sheet metal, not a box. */
function useShellGeometry() {
  const geometry = useMemo(() => {
    const r = 0.16;
    const hw = SHELL_W / 2;
    const hd = SHELL_D / 2;
    const s = new Shape();
    s.moveTo(-hw + r, -hd);
    s.lineTo(hw - r, -hd);
    s.quadraticCurveTo(hw, -hd, hw, -hd + r);
    s.lineTo(hw, hd - r);
    s.quadraticCurveTo(hw, hd, hw - r, hd);
    s.lineTo(-hw + r, hd);
    s.quadraticCurveTo(-hw, hd, -hw, hd - r);
    s.lineTo(-hw, -hd + r);
    s.quadraticCurveTo(-hw, -hd, -hw + r, -hd);

    const geo = new ExtrudeGeometry(s, {
      depth: SHELL_H,
      bevelEnabled: true,
      bevelSize: 0.035,
      bevelThickness: 0.05,
      bevelSegments: 3,
      curveSegments: 14,
    });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -SHELL_H / 2, 0);
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

/* The big circular grille: horizontal bars clipped to the circle — each
 * bar's width is the chord length at its height. */
const GRILLE_R = 1.08;
const GRILLE_X = -0.5;

type OduUnitProps = {
  compact: boolean;
};

function OduUnit({ compact }: OduUnitProps) {
  const shellGeometry = useShellGeometry();

  const bars = useMemo(() => {
    const list: { y: number; width: number }[] = [];
    const step = 0.062;
    for (let y = -GRILLE_R + step; y < GRILLE_R - 0.02; y += step) {
      const halfChord = Math.sqrt(Math.max(0, GRILLE_R ** 2 - y ** 2));
      if (halfChord > 0.06) list.push({ y, width: halfChord * 2 - 0.02 });
    }
    return list;
  }, []);

  const blades = useMemo(
    () => Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2),
    [],
  );

  return (
    <group
      position={compact ? [0, 0.55, 0] : [1.75, 0.15, 0]}
      scale={compact ? 0.46 : 0.72}
      rotation={[0.14, 0.58, 0]}
    >
      {/* Wrapped-metal shell with clearcoat */}
      <mesh geometry={shellGeometry}>
        <meshPhysicalMaterial
          color={BODY}
          roughness={0.42}
          metalness={0.05}
          clearcoat={0.35}
          clearcoatRoughness={0.35}
        />
      </mesh>

      {/* Slim lid plate */}
      <RoundedBox
        args={[3.32, 0.045, 1.34]}
        radius={0.02}
        smoothness={2}
        position={[0, SHELL_H / 2 + 0.04, 0]}
      >
        <meshPhysicalMaterial
          color={BODY_SOFT}
          roughness={0.45}
          metalness={0.05}
          clearcoat={0.25}
          clearcoatRoughness={0.4}
        />
      </RoundedBox>

      {/* Moulded ring around the grille + vertical panel seam */}
      <mesh position={[GRILLE_X, 0, FACE + 0.015]}>
        <torusGeometry args={[GRILLE_R + 0.06, 0.03, 10, 64]} />
        <meshPhysicalMaterial
          color={BODY}
          roughness={0.42}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.35}
        />
      </mesh>
      <mesh position={[0.78, 0, FACE + 0.006]}>
        <boxGeometry args={[0.016, SHELL_H - 0.12, 0.012]} />
        <meshStandardMaterial color={SEAM} metalness={0.1} roughness={0.6} />
      </mesh>

      {/* Fan set deep in the aperture — blade tips (pitched, so they sweep
          forward) must never reach the grille bars' plane. */}
      <group position={[GRILLE_X, 0, 0]}>
        <mesh position={[0, 0, FACE - 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[GRILLE_R + 0.02, GRILLE_R + 0.02, 0.03, 56]} />
          <meshStandardMaterial color="#191e24" metalness={0.1} roughness={0.9} />
        </mesh>
        <group position={[0, 0, FACE - 0.17]}>
          {blades.map((angle) => (
            <mesh key={angle} rotation={[0, 0.35, angle]}>
              <boxGeometry args={[0.85, 0.34, 0.03]} />
              <meshStandardMaterial
                color="#2f3b47"
                metalness={0.25}
                roughness={0.55}
              />
            </mesh>
          ))}
        </group>

        {/* Circular grille bars (chord-clipped) */}
        {bars.map(({ y, width }) => (
          <mesh key={y} position={[0, y, FACE + 0.045]}>
            <boxGeometry args={[width, 0.028, 0.02]} />
            <meshStandardMaterial color={BARS} metalness={0.4} roughness={0.4} />
          </mesh>
        ))}
        {/* Centre hub cap + screw */}
        <mesh position={[0, 0, FACE + 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.03, 28]} />
          <meshStandardMaterial color={BODY} metalness={0.1} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, FACE + 0.078]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.012, 12]} />
          <meshStandardMaterial color={SCREW} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Brand badge (top-right) + refrigerant label */}
      <RoundedBox
        args={[0.5, 0.24, 0.016]}
        radius={0.05}
        smoothness={3}
        position={[1.12, 0.95, FACE + 0.01]}
      >
        <meshPhysicalMaterial
          color="#2c388a"
          metalness={0.2}
          roughness={0.35}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>
      <mesh position={[1.12, 0.55, FACE + 0.008]}>
        <boxGeometry args={[0.26, 0.12, 0.006]} />
        <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.65} />
      </mesh>

      {/* Right-panel fixing screws */}
      {[
        [0.95, 1.16],
        [1.55, 1.16],
        [0.95, -1.16],
        [1.55, -1.16],
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

      {/* Spec sticker (lower right) */}
      <mesh position={[1.2, -0.8, FACE + 0.008]}>
        <boxGeometry args={[0.36, 0.2, 0.006]} />
        <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.7} />
      </mesh>

      {/* Side vent slits (right face, toward the back) */}
      {[-0.5, -0.36, -0.22, -0.08].map((z) => (
        <mesh key={z} position={[SHELL_W / 2, 0.3, z]}>
          <boxGeometry args={[0.02, 0.7, 0.05]} />
          <meshStandardMaterial color="#d3d7db" metalness={0.1} roughness={0.55} />
        </mesh>
      ))}

      {/* Side service cover + brass valves below it */}
      <RoundedBox
        args={[0.06, 0.62, 0.36]}
        radius={0.02}
        smoothness={2}
        position={[SHELL_W / 2 + 0.01, -0.35, 0.25]}
      >
        <meshPhysicalMaterial
          color={BODY_SOFT}
          roughness={0.45}
          metalness={0.05}
          clearcoat={0.25}
          clearcoatRoughness={0.4}
        />
      </RoundedBox>
      {[0.18, 0.34].map((z) => (
        <mesh
          key={z}
          position={[SHELL_W / 2 + 0.03, -0.95, z]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.045, 0.045, 0.12, 12]} />
          <meshStandardMaterial color="#b06a2f" metalness={1} roughness={0.35} />
        </mesh>
      ))}

      {/* Moulded corner feet + rubber pads */}
      {[-1.3, 1.3].map((x) => (
        <group key={x}>
          <RoundedBox
            args={[0.5, 0.18, 1.44]}
            radius={0.04}
            smoothness={2}
            position={[x, -SHELL_H / 2 - 0.08, 0]}
          >
            <meshStandardMaterial
              color={BODY_SOFT}
              metalness={0.05}
              roughness={0.6}
            />
          </RoundedBox>
          <mesh position={[x, -SHELL_H / 2 - 0.19, 0]}>
            <boxGeometry args={[0.52, 0.05, 1.46]} />
            <meshStandardMaterial color="#5a5f66" metalness={0.2} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

type OduSceneProps = {
  compact: boolean;
};

export default function OduScene({ compact }: OduSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 7.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      // No scroll re-measure — see scene.tsx: prevents the exit scale on
      // .reveal-inner from resizing the GL viewport mid-tween.
      resize={{ scroll: false }}
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

      <OduUnit compact={compact} />

      <ContactShadows
        position={[0, -1.1, 0]}
        scale={11}
        blur={2.4}
        opacity={0.4}
        far={2.4}
        resolution={512}
        color="#000814"
      />
    </Canvas>
  );
}
