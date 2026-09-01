import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import {
  LOUVER_HINGE,
  LOUVER_OPEN_ANGLE,
  MOUTH_TILT,
  OUTLET_CENTER_X,
  OUTLET_SPAN,
  louverAngle,
  toY,
  toZ,
} from './dimensions';
import { createLouverProfile, planOffsetAt } from './profile';
import type { ACMaterials } from './materials';

type Props = {
  materials: ACMaterials;
  open: boolean;
  technical: boolean;
};

const BLADE_WIDTH = OUTLET_SPAN - 0.05;

/**
 * MainLouver — the blade in the outlet, as an independent 3D component.
 *
 * Genuinely separate geometry with real thickness and a shallow crescent
 * section, hinged along the LOWER edge of the mouth exactly where the real part
 * pivots. Closed, it lies in the plane of the mouth and continues the front
 * surface. Opening rotates the top edge forward and down, which is what
 * uncovers the dark cavity above it — the detail that makes the outlet read as
 * an opening rather than a painted stripe.
 *
 * Because the hinge is the group origin, all of that is one rotation about X.
 * Rest and open angles live in dimensions.ts (`louverAngle`,
 * LOUVER_OPEN_ANGLE) so they stay tunable for later animation.
 *
 * The blade is bowed across its width using the same plan-view curve as the
 * body, so it sits in the recess as a fitted part rather than cutting a
 * straight chord across a curved opening.
 */
export function Louvers({ materials, open, technical }: Props) {
  const pivot = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(createLouverProfile(), {
      depth: BLADE_WIDTH,
      steps: 16,
      curveSegments: 12,
      bevelEnabled: true,
      bevelSize: 0.005,
      bevelThickness: 0.005,
      bevelOffset: 0,
      bevelSegments: 2,
    });
    geo.rotateY(-Math.PI / 2);
    geo.translate(BLADE_WIDTH / 2, 0, 0);

    // Follow the body's bow. Referenced to the hinge so the blade keeps the
    // same relationship to the shell all the way along.
    const hingeOffset = planOffsetAt(OUTLET_CENTER_X);
    const position = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < position.count; i++) {
      const worldX = position.getX(i) + OUTLET_CENTER_X;
      position.setZ(i, position.getZ(i) + (planOffsetAt(worldX) - hingeOffset));
    }
    position.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    return geo;
  }, []);

  const target = MOUTH_TILT + (open ? LOUVER_OPEN_ANGLE : louverAngle);

  useFrame((_, delta) => {
    const group = pivot.current;
    if (!group) return;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, target, 6, delta);
  });

  return (
    <group
      name="MainLouver"
      ref={pivot}
      position={[
        OUTLET_CENTER_X,
        toY(LOUVER_HINGE.h),
        toZ(LOUVER_HINGE.d) + planOffsetAt(OUTLET_CENTER_X),
      ]}
      rotation={[MOUTH_TILT + louverAngle, 0, 0]}
    >
      <mesh geometry={geometry} material={materials.louver} castShadow receiveShadow>
        {technical && <Edges threshold={30} color="#63b3e0" transparent opacity={0.4} />}
      </mesh>

      {/* Hinge bosses at each end — small, but they sell the blade as a part
          that is actually mounted rather than floating in the recess. */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (BLADE_WIDTH / 2 + 0.012), 0.014, -0.008]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.grille}
        >
          <cylinderGeometry args={[0.016, 0.016, 0.024, 12]} />
        </mesh>
      ))}
    </group>
  );
}
