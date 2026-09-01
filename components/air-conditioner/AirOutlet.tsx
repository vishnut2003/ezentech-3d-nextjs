import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OUTLET, OUTLET_CENTER_X, OUTLET_SPAN, toY, toZ } from './dimensions';
import type { ACMaterials } from './materials';

type Props = {
  materials: ACMaterials;
};

const VANE_COUNT = 11;

/**
 * AirOutlet — the recessed opening in the lower front.
 *
 * The opening itself is carved into the swept body profile (see profile.ts), so
 * it is a real void with real walls, facing forward and down exactly as it does
 * on the references. What lives in here is what you actually see when you look
 * into it:
 *
 *   Recess        - an open-ended box rendered BackSide. Because the face
 *                   nearest the camera is culled you look straight through it
 *                   into a matte-black interior, which costs twelve triangles
 *                   instead of a modelled duct.
 *   FanBarrel     - a hint of the cross-flow fan deep in the throat. Barely lit,
 *                   but it stops the cavity reading as an empty black slot.
 *   VerticalVanes - the left/right direction blades, set back from the mouth.
 *
 * All of it stops short on the right, where the display module takes over the
 * band.
 */
export function AirOutlet({ materials }: Props) {
  const vanesRef = useRef<THREE.InstancedMesh>(null);

  const vaneGeometry = useMemo(() => {
    // A vane is a thin plate with a slight S to it, not a flat card.
    const shape = new THREE.Shape();
    shape.moveTo(-0.065, -0.075);
    shape.quadraticCurveTo(-0.014, 0, -0.05, 0.075);
    shape.lineTo(0.05, 0.075);
    shape.quadraticCurveTo(0.014, 0, 0.065, -0.075);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.011,
      bevelEnabled: false,
      curveSegments: 4,
    });
    geo.translate(0, 0, -0.0055);
    geo.rotateY(Math.PI / 2);
    return geo;
  }, []);

  useLayoutEffect(() => {
    const mesh = vanesRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const span = OUTLET_SPAN - 0.3;
    const step = span / (VANE_COUNT - 1);

    for (let i = 0; i < VANE_COUNT; i++) {
      dummy.position.set(-span / 2 + i * step, 0, 0);
      // Vanes fan very slightly outward from the centre, as they sit at rest.
      dummy.rotation.set(0, ((i - (VANE_COUNT - 1) / 2) / VANE_COUNT) * 0.2, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    // see IntakeGrille: a rebuilt InstancedMesh starts with identity matrices
  }, [vaneGeometry]);

  const cavityCenterD = (OUTLET.dCavityBack + OUTLET.dCavityFront) / 2;
  const cavityCenterH = (OUTLET.hCavityFloor + OUTLET.hCavityRoof) / 2;

  return (
    <group name="AirOutlet" position={[OUTLET_CENTER_X, 0, 0]}>
      {/* Recess — the dark cavity you see into */}
      <mesh
        name="Recess"
        position={[0, toY(cavityCenterH), toZ(cavityCenterD + 0.02)]}
        material={materials.cavity}
      >
        <boxGeometry
          args={[
            OUTLET_SPAN,
            OUTLET.hCavityRoof - OUTLET.hCavityFloor + 0.06,
            OUTLET.dCavityFront - OUTLET.dCavityBack + 0.02,
          ]}
        />
      </mesh>

      {/* FanBarrel — cross-flow fan glimpsed at the back of the throat */}
      <mesh
        name="FanBarrel"
        position={[0, toY(cavityCenterH + 0.02), toZ(OUTLET.dCavityBack + 0.055)]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.insulation}
      >
        <cylinderGeometry args={[0.085, 0.085, OUTLET_SPAN - 0.1, 20, 1, true]} />
      </mesh>

      {/* VerticalVanes — left/right direction blades */}
      <instancedMesh
        name="VerticalVanes"
        ref={vanesRef}
        args={[vaneGeometry, undefined, VANE_COUNT]}
        material={materials.vane}
        position={[0, toY(cavityCenterH), toZ(OUTLET.dCavityFront - 0.075)]}
      />
    </group>
  );
}
