import { DISPLAY, toY, toZ } from './dimensions';
import { planOffsetAt } from './profile';
import type { ACMaterials } from './materials';

type Props = {
  materials: ACMaterials;
};

const MODULE_W = DISPLAY.xMax - DISPLAY.xMin;
const CENTER_X = (DISPLAY.xMax + DISPLAY.xMin) / 2;
const MODULE_H = 0.24;
const CENTER_H = 0.28;
const MODULE_D = 0.16;
/** Front face of the module, on the bowed surface but set back inside the mouth. */
const FACE_Z = toZ(0.845) + planOffsetAt(CENTER_X);

/**
 * ControlArea — the display module at the right-hand end of the outlet band.
 *
 * On the references this is not a badge stuck on the middle of the fascia: the
 * outlet slot stops short on the right and a glossy black module fills the rest
 * of the band, carrying the segment readout, two status LEDs and the IR
 * receiver. It is small, recessed behind the lip of the front panel, and easy
 * to miss at product distance — which is the point.
 */
export function Controls({ materials }: Props) {
  return (
    <group name="ControlArea" position={[CENTER_X, toY(CENTER_H), FACE_Z]}>
      {/* Glossy black module filling the band */}
      <mesh name="Display" position={[0, 0, -MODULE_D / 2]} material={materials.display}>
        <boxGeometry args={[MODULE_W, MODULE_H, MODULE_D]} />
      </mesh>

      {/* Segment readout — a pair of faint emissive bars, not a UI */}
      <group name="Readout" position={[-0.075, 0.028, 0.003]}>
        {[-0.034, 0.034].map((x) => (
          <mesh key={x} position={[x, 0, 0]} material={materials.indicatorIdle}>
            <boxGeometry args={[0.04, 0.058, 0.006]} />
          </mesh>
        ))}
      </group>

      {/* Indicators */}
      <group name="Indicators" position={[0.105, -0.05, 0.003]}>
        {[
          { x: 0, mat: materials.indicatorOn },
          { x: 0.068, mat: materials.indicatorIdle },
        ].map(({ x, mat }) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={mat}>
            <cylinderGeometry args={[0.013, 0.013, 0.008, 12]} />
          </mesh>
        ))}
      </group>

      {/* IR receiver */}
      <mesh
        name="IRReceiver"
        position={[0.105, 0.045, 0.002]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.insulation}
      >
        <cylinderGeometry args={[0.021, 0.021, 0.006, 16]} />
      </mesh>
    </group>
  );
}
