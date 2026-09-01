import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import { HALF_W } from './dimensions';
import { createBodyProfile, shapeAcrossWidth, sweepProfile } from './profile';
import type { ACMaterials } from './materials';

type Props = {
  materials: ACMaterials;
  technical: boolean;
};

/** How far in from each end the outlet slot and the intake trough begin. */
export const END_SEGMENT = 0.235;
const MIDDLE_WIDTH = HALF_W * 2 - END_SEGMENT * 2;

/**
 * MainHousing — the swept body that carries the whole silhouette.
 *
 * FrontShell / TopShell / BottomShell / LeftSide / RightSide are one continuous
 * moulding here rather than five boxes, which is both how the real part is made
 * and the only way to get clean transitions between them. The air outlet and
 * the intake trough are carved into the profile, so they are genuine volumes.
 *
 * WHY THREE SEGMENTS
 * ------------------
 * An extrusion's end face is its profile. Carve the trough and the outlet into
 * one full-width profile and both show up as square bites in the side
 * silhouette — which is exactly what the first pass did. So the body is swept
 * as three segments off the same profile function:
 *
 *   left cap   | middle (trough + outlet carved) | right cap
 *
 * The caps use the solid variant, where the deck runs straight across and the
 * shell wraps over the slot. They are bevelled, so the visible end faces are
 * smooth and rounded; the middle is not, so it butts flush against them. The
 * joins land where the grille surround and the slot end anyway.
 *
 * All three run through shapeAcrossWidth with identical parameters, which is
 * what keeps them on one continuous bowed surface.
 */
export function Housing({ materials, technical }: Props) {
  const segments = useMemo(() => {
    const middle = shapeAcrossWidth(
      sweepProfile(createBodyProfile(false), {
        width: MIDDLE_WIDTH + 0.03,
        bevel: false,
        steps: 26,
      }),
    );

    const caps = [-1, 1].map((side) =>
      shapeAcrossWidth(
        sweepProfile(createBodyProfile(true), {
          width: END_SEGMENT,
          steps: 5,
          offsetX: side * (HALF_W - END_SEGMENT / 2),
        }),
      ),
    );

    return { middle, caps };
  }, []);

  return (
    <group name="MainHousing">
      <mesh
        name="BodyMiddle"
        geometry={segments.middle}
        material={materials.shell}
        castShadow
        receiveShadow
      >
        {technical && <Edges threshold={34} color="#4f9ecf" transparent opacity={0.32} />}
      </mesh>

      {segments.caps.map((geometry, i) => (
        <mesh
          key={i}
          name={i === 0 ? 'LeftSide' : 'RightSide'}
          geometry={geometry}
          material={materials.shell}
          castShadow
          receiveShadow
        >
          {technical && <Edges threshold={34} color="#4f9ecf" transparent opacity={0.32} />}
        </mesh>
      ))}
    </group>
  );
}
