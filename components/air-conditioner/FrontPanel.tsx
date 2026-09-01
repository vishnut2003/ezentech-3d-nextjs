import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import { FASCIA, HALF_W, W } from './dimensions';
import { createFasciaProfile, shapeAcrossWidth, sweepProfile } from './profile';
import type { ACMaterials } from './materials';

type Props = {
  materials: ACMaterials;
  technical: boolean;
};

/**
 * FrontPanel — the clip-on fascia.
 *
 * On a real unit this is a separate moulding that snaps over the body, and the
 * gap around its edge is where every visible seam line comes from. So it is a
 * separate curved shell here too: it traces the same front bulge as the body,
 * has real wall thickness, is inset from both ends, and floats a few
 * millimetres proud. The seams are therefore physical gaps that catch a shadow,
 * with no lines drawn anywhere.
 *
 * It is shaped with the body's own half-width so its curvature matches the
 * housing exactly rather than bowing on its own shorter span.
 */
export function FrontPanel({ materials, technical }: Props) {
  const geometry = useMemo(() => {
    const geo = sweepProfile(createFasciaProfile(), {
      width: W - FASCIA.inset * 2,
      bevelSize: 0.012,
      bevelThickness: 0.018,
      bevelSegments: 2,
      steps: 24,
    });
    geo.translate(0, 0, FASCIA.standoff);
    return shapeAcrossWidth(geo, { halfWidth: HALF_W });
  }, []);

  return (
    <mesh
      name="FrontPanel"
      geometry={geometry}
      material={materials.fascia}
      castShadow
      receiveShadow
    >
      {technical && (
        <Edges threshold={34} color="#63b3e0" transparent opacity={0.4} />
      )}
    </mesh>
  );
}
