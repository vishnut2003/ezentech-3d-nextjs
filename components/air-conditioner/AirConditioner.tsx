import { AirOutlet } from './AirOutlet';
import { Controls } from './Controls';
import { FrontPanel } from './FrontPanel';
import { Housing } from './Housing';
import { IntakeGrille } from './IntakeGrille';
import { Louvers } from './Louvers';
import { RearMount } from './RearMount';
import { useACMaterials, type PresentationMode } from './materials';

export type AirConditionerProps = {
  mode: PresentationMode;
  louverOpen: boolean;
  wireframe: boolean;
};

/**
 * AirConditioner — assembly root.
 *
 * The hierarchy is kept flat and named so every major component shows up
 * individually in the scene graph and can be inspected on its own.
 */
export function AirConditioner({ mode, louverOpen, wireframe }: AirConditionerProps) {
  const materials = useACMaterials(mode, wireframe);
  const technical = mode === 'technical';

  return (
    <group name="AirConditioner">
      <Housing materials={materials} technical={technical} />
      <FrontPanel materials={materials} technical={technical} />
      <IntakeGrille materials={materials} />
      <AirOutlet materials={materials} />
      <Louvers materials={materials} open={louverOpen} technical={technical} />
      <Controls materials={materials} />
      <RearMount materials={materials} />
    </group>
  );
}
