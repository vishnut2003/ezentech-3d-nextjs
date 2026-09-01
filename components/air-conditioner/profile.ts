import * as THREE from 'three';
import {
  D,
  FASCIA,
  H,
  HALF_D,
  HALF_H,
  HALF_W,
  INTAKE,
  LOUVER_CHORD,
  OUTLET,
  PLAN,
  W,
} from './dimensions';

/**
 * The side profile of the unit, authored once and swept along the width.
 *
 * Every reference unit is, structurally, an extrusion: a single constant
 * cross-section from one end to the other with the ends rounded off. Modelling
 * it that way means the silhouette is correct from the front, the side, the top
 * and every angle in between, and it lets the air outlet and the intake trough
 * be *carved volumes* rather than surface decoration.
 *
 * Shape notes taken straight off the reference side view, because this is what
 * separates an AC from a rounded box:
 *
 *   - the widest point sits HIGH, around 60% of the height, not at mid-height
 *   - below that the front tapers back steadily, so the underside is only about
 *     half as deep as the body at its widest
 *   - the top is a shallow dome, not a flat lid
 *   - the outlet mouth is a wide diagonal opening facing forward and down
 *
 * Walking the outline anticlockwise from the bottom of the rear face:
 *   rear -> underside -> front lip -> OUTLET CAVITY -> front bulge ->
 *   shoulder -> deck -> INTAKE TROUGH -> deck -> back to the rear face
 */
export function createBodyProfile(solid = false): THREE.Shape {
  const s = new THREE.Shape();

  // --- rear face, then the underside running forward -----------------------
  s.moveTo(0.0, 0.14);
  s.quadraticCurveTo(0.0, 0.015, 0.1, 0.012);
  s.lineTo(0.52, 0.0);

  // --- front lip, curling up to a chisel tip -------------------------------
  s.quadraticCurveTo(0.665, 0.005, 0.715, 0.075);
  s.lineTo(OUTLET.mouthBottom.d, OUTLET.mouthBottom.h);

  if (solid) {
    // End segment: the shell wraps straight across where the slot would be.
    s.quadraticCurveTo(0.812, 0.26, OUTLET.mouthTop.d, OUTLET.mouthTop.h);
  } else {
    // --- into the outlet cavity --------------------------------------------
    // The outline dives back in at the lip tip, loops around the inside of the
    // cavity, and comes back out at the bottom edge of the front panel. The gap
    // between those two points is the mouth: a real, forward-and-down facing
    // opening a little under 0.29 across.
    s.lineTo(0.7, 0.205);
    s.lineTo(OUTLET.dCavityBack + 0.02, OUTLET.hCavityFloor);
    s.lineTo(OUTLET.dCavityBack, OUTLET.hCavityRoof - 0.055);
    s.lineTo(OUTLET.dCavityFront, OUTLET.hCavityRoof);
    s.lineTo(OUTLET.mouthTop.d, OUTLET.mouthTop.h);
  }

  // --- front bulge, widest at ~60% height ----------------------------------
  s.bezierCurveTo(0.945, 0.68, 0.935, 0.98, 0.845, FASCIA.hTop);

  // --- shoulder rolling over into the deck ---------------------------------
  s.quadraticCurveTo(0.78, 1.28, 0.655, 1.325);

  if (!solid) {
    // --- top intake trough --------------------------------------------------
    s.lineTo(INTAKE.dFront + 0.025, INTAKE.hDeck);
    s.lineTo(INTAKE.dFront, INTAKE.hFloor);
    s.lineTo(INTAKE.dBack, INTAKE.hFloor - 0.01);
    s.lineTo(INTAKE.dBack - 0.025, INTAKE.hDeck);
  }

  // --- rear of the deck, radius down onto the wall face --------------------
  s.lineTo(0.075, 1.33);
  s.quadraticCurveTo(0.0, 1.312, 0.0, 1.2);
  s.closePath();

  return s;
}

/**
 * Front fascia cross-section: a thin curved shell tracing the front bulge of
 * the body, drawn as an outer curve and an inner curve offset behind it.
 *
 * It runs from the bottom edge of the panel — which is also the top edge of the
 * outlet mouth — up to just below the shoulder, so it stays near-vertical over
 * its whole height and can be floated forward with a plain translation.
 */
export function createFasciaProfile(): THREE.Shape {
  const t = FASCIA.thickness;
  const s = new THREE.Shape();

  s.moveTo(OUTLET.mouthTop.d, FASCIA.hBottom);
  s.bezierCurveTo(0.945, 0.68, 0.935, 0.98, 0.845, FASCIA.hTop);
  s.lineTo(0.845 - t * 0.9, FASCIA.hTop + 0.009);
  s.bezierCurveTo(0.935 - t, 0.98, 0.945 - t, 0.68, OUTLET.mouthTop.d - t, FASCIA.hBottom + 0.018);
  s.closePath();

  return s;
}

/**
 * Louver blade cross-section, authored with the hinge at the origin and the
 * chord running UPWARD, because the blade is hinged along the bottom edge of
 * the mouth and swings its top edge forward and out.
 *
 * At the closed angle it lies in the plane of the mouth and continues the front
 * surface — the closed-when-off look every modern unit has. A shallow crescent
 * section gives it real thickness and a gentle curve.
 */
export function createLouverProfile(): THREE.Shape {
  const c = LOUVER_CHORD;
  const s = new THREE.Shape();

  // outer (forward-facing) face, bowed very slightly out
  s.moveTo(0.014, 0.0);
  s.quadraticCurveTo(0.035, c * 0.5, 0.006, c);
  // tip
  s.lineTo(-0.013, c - 0.005);
  // inner (cavity-facing) face
  s.quadraticCurveTo(0.009, c * 0.5, -0.014, 0.0);
  s.closePath();

  return s;
}

type SweepOptions = {
  /** width to sweep across */
  width: number;
  bevelSize?: number;
  bevelThickness?: number;
  bevelSegments?: number;
  /** subdivisions along the width — needed for the plan-view bow to be smooth */
  steps?: number;
  curveSegments?: number;
  /** shift the swept part along the width before it is shaped */
  offsetX?: number;
  /** interior segment joins want flat ends, not bevelled ones */
  bevel?: boolean;
};

/**
 * Sweep a profile-space shape along the width axis and move it into world
 * space: X across the width and centred, Y height and centred, Z depth with the
 * rear at -D/2.
 *
 * ExtrudeGeometry always extrudes along its own +Z, so the result is rotated a
 * quarter turn about Y to put the sweep on the X axis.
 *
 * The bevel is kept small (~0.025) on purpose. It is there to break the edges,
 * not to round the ends — a bevel large enough to read as a corner radius would
 * self-intersect inside the outlet lip and the intake trough. The end radius
 * comes from shapeAcrossWidth instead.
 */
export function sweepProfile(shape: THREE.Shape, opts: SweepOptions): THREE.BufferGeometry {
  const {
    width,
    bevelSize = 0.025,
    bevelThickness = 0.04,
    bevelSegments = 3,
    steps = 26,
    curveSegments = 20,
    offsetX = 0,
    bevel = true,
  } = opts;

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    steps,
    curveSegments,
    bevelEnabled: bevel,
    bevelSize,
    bevelThickness,
    bevelOffset: 0,
    bevelSegments,
  });

  // profile x (depth) -> world Z, extrusion -> world X
  geometry.rotateY(-Math.PI / 2);
  geometry.translate(width / 2 + offsetX, -HALF_H, -HALF_D);

  return geometry;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Shape the swept body across its width.
 *
 * A straight extrusion has a flat front face and square plan corners, which is
 * the single biggest giveaway that something was modelled rather than moulded.
 * Real units are gently bowed — deeper at the centre — and their ends curve
 * away. Both come from displacing the forward vertices in Z:
 *
 *   bow    grows toward the centre  (1 - t^2)
 *   corner grows toward the ends    (pull the front back)
 *
 * weighted by how far forward the vertex already is, so the flat rear face that
 * has to sit against a wall is left untouched.
 *
 * Every swept part runs through this with the same parameters, which is what
 * keeps the fascia, the end caps and the body on one continuous surface.
 */
export function shapeAcrossWidth(
  geometry: THREE.BufferGeometry,
  { bow = PLAN.bow, corner = PLAN.corner, halfWidth = HALF_W } = {},
): THREE.BufferGeometry {
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const zRear = -HALF_D;
  const zFront = HALF_D;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);

    const t = Math.min(1, Math.abs(x) / halfWidth);
    // 0 at the rear third, ramping to 1 at the front face
    const forward = THREE.MathUtils.smoothstep(z, zRear + 0.2, zFront);
    const cornerT = clamp01((t - PLAN.cornerStart) / (1 - PLAN.cornerStart));

    const delta = bow * (1 - t * t) - corner * Math.pow(cornerT, 1.5);
    position.setZ(i, z + delta * forward);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return geometry;
}

/**
 * The plan-view Z offset shapeAcrossWidth applies at a given x, for a vertex
 * fully at the front. Non-swept parts (the display module, the louver hinge
 * bosses) use it to sit on the bowed surface instead of floating off it.
 */
export function planOffsetAt(x: number, halfWidth = HALF_W): number {
  const t = Math.min(1, Math.abs(x) / halfWidth);
  const cornerT = clamp01((t - PLAN.cornerStart) / (1 - PLAN.cornerStart));
  return PLAN.bow * (1 - t * t) - PLAN.corner * Math.pow(cornerT, 1.5);
}

/** Re-exported so components can talk in whole-unit terms without importing both modules. */
export { D, H, W };
