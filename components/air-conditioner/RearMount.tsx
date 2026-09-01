import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { HALF_D, HALF_H } from './dimensions';
import type { ACMaterials } from './materials';

type Props = {
  materials: ACMaterials;
};

/** Rear face of the shell. Everything here stands proud of it, as the real
 *  mouldings do — the chassis hangs off a bracket screwed to the wall. */
const REAR = -HALF_D;
const RIB_COUNT = 11;

/**
 * Mounting / rear housing.
 *
 * A model that is only detailed at the front falls apart the moment you orbit
 * behind it, and a single flat plate across the back just looks like a picture
 * frame. The real thing is a moulded pan carrying vertical stiffening ribs, two
 * narrow rails that hook over the wall bracket, a pipe knockout at one corner,
 * and the insulated line-set and condensate drain leaving through it.
 *
 * Layer order matters here: the pan sits nearest the shell, the ribs stand
 * proud of the pan, and the rails stand proud of the ribs. Anything large and
 * flat placed behind them just hides the detail from a rear camera.
 *
 * Total stand-off is about 0.03, so it reads as depth from behind without
 * spoiling the side silhouette.
 */
export function RearMount({ materials }: Props) {
  const ribsRef = useRef<THREE.InstancedMesh>(null);

  const ribGeometry = useMemo(() => new THREE.BoxGeometry(0.03, 0.78, 0.014), []);

  useLayoutEffect(() => {
    const mesh = ribsRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const span = 3.15;
    const step = span / (RIB_COUNT - 1);
    for (let i = 0; i < RIB_COUNT; i++) {
      dummy.position.set(-span / 2 + i * step, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    // see IntakeGrille: a rebuilt InstancedMesh starts with identity matrices
  }, [ribGeometry]);

  const pipeCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.34, -HALF_H + 0.19, REAR + 0.03),
        new THREE.Vector3(-1.37, -HALF_H + 0.02, REAR - 0.03),
        new THREE.Vector3(-1.43, -HALF_H - 0.2, REAR - 0.06),
        new THREE.Vector3(-1.46, -HALF_H - 0.42, REAR - 0.065),
      ]),
    [],
  );

  return (
    <group name="RearMount">
      {/* Moulded rear pan */}
      <mesh
        name="RearPan"
        position={[0, 0.02, REAR - 0.007]}
        material={materials.backplate}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.48, 0.9, 0.014]} />
      </mesh>

      {/* Vertical stiffening ribs, standing proud of the pan */}
      <instancedMesh
        name="RearRibs"
        ref={ribsRef}
        args={[ribGeometry, undefined, RIB_COUNT]}
        material={materials.shell}
        position={[0, 0.02, REAR - 0.019]}
        castShadow
      />

      {/* Rails that hook over the wall bracket */}
      {[0.4, -0.34].map((y) => (
        <mesh
          key={y}
          position={[0, y, REAR - 0.026]}
          material={materials.shell}
          castShadow
        >
          <boxGeometry args={[3.22, 0.06, 0.026]} />
        </mesh>
      ))}

      {/* Bracket hook — narrow, so it does not mask the mouldings */}
      <mesh name="WallBracket" position={[0, 0.06, REAR - 0.036]} material={materials.metal}>
        <boxGeometry args={[2.7, 0.09, 0.016]} />
      </mesh>

      {/* Pipe knockout the lines leave through, with its collar */}
      <mesh
        name="PipePort"
        position={[-1.34, -0.3, REAR - 0.034]}
        material={materials.insulation}
      >
        <boxGeometry args={[0.32, 0.3, 0.016]} />
      </mesh>
      <mesh position={[-1.34, -0.3, REAR - 0.028]} material={materials.shell}>
        <boxGeometry args={[0.38, 0.36, 0.014]} />
      </mesh>

      {/* Service label */}
      <mesh position={[1.02, -0.16, REAR - 0.034]} material={materials.grille}>
        <boxGeometry args={[0.56, 0.28, 0.008]} />
      </mesh>

      {/* Insulated refrigerant line-set with the condensate drain inside it */}
      <mesh name="LineSet" material={materials.insulation} castShadow>
        <tubeGeometry args={[pipeCurve, 26, 0.055, 12, false]} />
      </mesh>
      <mesh name="DrainHose" position={[0.06, -0.02, 0.03]} material={materials.metal} castShadow>
        <tubeGeometry args={[pipeCurve, 26, 0.022, 10, false]} />
      </mesh>
    </group>
  );
}
