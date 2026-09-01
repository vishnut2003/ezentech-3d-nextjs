/**
 * Dimensions for the AC indoor unit.
 *
 * Driven by references/NOTES.md and by the supplied reference sheet, which
 * gives 870-950 mm wide, 290-320 mm high, 190-230 mm deep. Taking the midpoints
 * (910 x 305 x 210) and normalising to a width of 4.0 model units:
 *
 *   W : H : D  =  1 : 0.335 : 0.231  ->  4.00 x 1.35 x 0.93
 *
 * PROFILE SPACE vs WORLD SPACE
 * ----------------------------
 * The whole body is one side profile swept along the width. The profile is
 * authored in "profile space":
 *
 *   d = depth,  0 at the wall  -> D at the front
 *   h = height, 0 at the base  -> H at the top deck
 *
 * The finished model is centred on the origin, so use toZ()/toY() to place any
 * additional part against a landmark taken from the profile.
 */

/** Overall width (X). */
export const W = 4.0;
/** Overall height (Y). */
export const H = 1.35;
/** Overall depth (Z), wall to front. */
export const D = 0.93;

export const HALF_W = W / 2;
export const HALF_H = H / 2;
export const HALF_D = D / 2;

/** profile depth -> world Z (rear is negative, front is positive) */
export const toZ = (d: number) => d - HALF_D;
/** profile height -> world Y (base is negative, top is positive) */
export const toY = (h: number) => h - HALF_H;

/* ------------------------------------------------------------------ *
 * Landmarks. Every sub-component positions itself from these so the
 * profile and the details can never drift apart.
 * ------------------------------------------------------------------ */

/**
 * Air outlet. Not a slot in the underside — on the references the mouth faces
 * forward AND down, which is why the dark band is clearly visible in a straight
 * front elevation. It is a diagonal opening between the bottom edge of the
 * front panel and a lip that curls forward underneath it.
 */
export const OUTLET = {
  /** upper edge of the mouth = bottom edge of the front panel */
  mouthTop: { d: 0.86, h: 0.4 },
  /** lower edge of the mouth = tip of the front lip */
  mouthBottom: { d: 0.745, h: 0.135 },
  /** interior of the cavity behind the mouth */
  dCavityBack: 0.555,
  dCavityFront: 0.79,
  hCavityFloor: 0.2,
  hCavityRoof: 0.455,
  /**
   * The slot does not run the full width: it stops short on the right, and the
   * display module fills the rest of the band. Straight off the reference sheet.
   * Both ends are kept well inside the shell so nothing breaks the silhouette.
   */
  xMin: -1.75,
  xMax: 1.16,
} as const;

export const OUTLET_SPAN = OUTLET.xMax - OUTLET.xMin;
export const OUTLET_CENTER_X = (OUTLET.xMax + OUTLET.xMin) / 2;

/** Display module — occupies the right-hand end of the outlet band. */
export const DISPLAY = {
  xMin: 1.2,
  xMax: 1.75,
} as const;

/**
 * Top intake. A recess in the top deck, closed off at both ends by solid caps.
 *
 * The ends are closed by the housing's own solid end segments (Housing.tsx),
 * not by a patch laid over the trough — see the note there on why the body is
 * swept in three pieces.
 */
export const INTAKE = {
  dBack: 0.145,
  dFront: 0.63,
  /** floor of the trough */
  hFloor: 1.135,
  /** top deck level over the grille */
  hDeck: 1.335,
  /** reference top view shows a dense grille — ~8 mm pitch on a 200 mm deck */
  slats: 30,
  /** vertical divider ribs visible in the reference top view */
  ribs: [-1.16, 0, 1.16],
} as const;

/** Front fascia panel — a separate clip-on shell floated ahead of the body. */
export const FASCIA = {
  /** how far the panel stands proud of the body surface */
  standoff: 0.016,
  /** panel wall thickness */
  thickness: 0.032,
  /** inset from each end of the body, which is what creates the side seam */
  inset: 0.045,
  /** bottom edge of the panel is the top edge of the outlet mouth */
  hBottom: 0.4,
  hTop: 1.155,
} as const;

/**
 * Louver.
 *
 * The blade hinges along the LOWER edge of the mouth and swings its far edge
 * forward and down, which is the mechanism on the references — and the reason
 * an open louver shows a dark slot ABOVE it rather than below. Hinging it at
 * the top instead makes the blade permanently cover the cavity, so the outlet
 * never reads as an opening from the front.
 *
 * MOUTH_TILT is the closed position: the blade lying in the plane of the mouth,
 * continuing the front surface. Angles below are measured from there.
 * `louverAngle` is exposed as the tunable rest angle exactly as the brief asks.
 */
export const MOUTH_TILT = Math.atan2(
  OUTLET.mouthTop.d - OUTLET.mouthBottom.d,
  OUTLET.mouthTop.h - OUTLET.mouthBottom.h,
);
export const louverAngle = 0.18;
export const LOUVER_OPEN_ANGLE = 0.62;
/** blade chord, a little under the 0.29 mouth so it never quite seals */
export const LOUVER_CHORD = 0.25;
/** hinge sits just inside the lower lip of the mouth */
export const LOUVER_HINGE = { d: 0.752, h: 0.152 } as const;

/**
 * Plan-view shaping applied to the swept body (see profile.ts#shapeAcrossWidth).
 * bow    - how much deeper the front is at the centre than at the ends
 * corner - how far the front is pulled back at the very ends, which is what
 *          actually rounds the plan corners. The extrude bevel alone is far too
 *          small to read as a corner radius.
 */
export const PLAN = {
  bow: 0.03,
  corner: 0.085,
  /** normalised |x| at which the corner pull-back starts */
  cornerStart: 0.8,
} as const;
