import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { HALF_W, INTAKE, toY, toZ } from './dimensions';
import { END_SEGMENT } from './Housing';
import type { ACMaterials } from './materials';

type Props = {
  materials: ACMaterials;
};

/**
 * TopIntake — the recessed grille in the top deck.
 *
 * The trough is carved into the body profile, so the recess is real. Inside it:
 *
 *   IntakeCavity - the dark space below the slats (filter and coil territory),
 *                  an open BackSide box whose inner floor sits just above the
 *                  shell floor so you actually see black down there.
 *   IntakeSlats  - 30 bars running parallel to the width at the ~8 mm pitch the
 *                  reference top view shows. One shared geometry, one
 *                  InstancedMesh, one draw call.
 *   IntakeRibs   - the vertical dividers that split the grille into sections.
 * The trough is closed off at both ends by the housing's own solid end
 * segments (see Housing.tsx), so it never breaks the side silhouette.
 */
export function IntakeGrille({ materials }: Props) {
  const slatsRef = useRef<THREE.InstancedMesh>(null);

  const troughDepth = INTAKE.dFront - INTAKE.dBack;
  // matches the middle segment of the housing, so the slats fill the trough
  // exactly and stop where the solid end caps begin
  const openSpan = HALF_W * 2 - END_SEGMENT * 2 - 0.03;

  const slatGeometry = useMemo(
    () => new THREE.BoxGeometry(openSpan, 0.038, 0.0085),
    [openSpan],
  );

  useLayoutEffect(() => {
    const mesh = slatsRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const usable = troughDepth - 0.025;
    const step = usable / (INTAKE.slats - 1);

    for (let i = 0; i < INTAKE.slats; i++) {
      const t = i / (INTAKE.slats - 1);
      // Slats tilt back, and sit a touch lower toward the front of the trough,
      // following the deck rather than lying in one flat plane.
      dummy.position.set(0, -t * 0.012, -usable / 2 + i * step);
      dummy.rotation.set(0.25, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    // slatGeometry is in the deps because a new geometry means R3F rebuilt the
    // InstancedMesh, and a rebuilt one starts with identity matrices.
  }, [troughDepth, slatGeometry]);

  const centerZ = toZ((INTAKE.dBack + INTAKE.dFront) / 2);

  return (
    <group name="TopIntake">
      {/* Dark cavity below the slats */}
      <mesh
        name="IntakeCavity"
        position={[0, toY(1.235), centerZ]}
        material={materials.cavity}
      >
        <boxGeometry args={[openSpan + 0.03, 0.18, troughDepth - 0.01]} />
      </mesh>

      {/* IntakeSlats */}
      <instancedMesh
        name="IntakeSlats"
        ref={slatsRef}
        args={[slatGeometry, undefined, INTAKE.slats]}
        material={materials.grille}
        position={[0, toY(INTAKE.hDeck - 0.042), centerZ]}
      />

      {/* IntakeRibs — vertical dividers */}
      <group name="IntakeRibs">
        {INTAKE.ribs.map((x) => (
          <mesh
            key={x}
            position={[x, toY(INTAKE.hDeck - 0.075), centerZ]}
            material={materials.grille}
          >
            <boxGeometry args={[0.013, 0.09, troughDepth - 0.03]} />
          </mesh>
        ))}
      </group>

    </group>
  );
}
