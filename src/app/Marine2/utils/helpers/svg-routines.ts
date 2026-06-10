export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

/**
 * Describe a thick ring arc with optionally integrated circular caps as a single closed path.
 *
 * - cx, cy          center of circle
 * - innerR, outerR  inner and outer radius (outerR > innerR)
 * - startAngle/endAngle in degrees (0 = top, increases clockwise in this helper)
 * - includeCaps.    to round the arc with half circles
 *
 * Returns an SVG path "d" string.
 */
export function describeArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
  includeCaps: boolean,
) {
  // normalize and compute delta in (0, 360]
  let delta = (endAngle - startAngle) % 360
  if (delta < 0) delta += 360
  // degenerate or full circle guard
  if (delta === 0) delta = 360

  const largeArcFlag = delta > 180 ? 1 : 0
  const capR = (outerR - innerR) / 2

  const startOuter = polarToCartesian(cx, cy, outerR, startAngle)
  const endOuter = polarToCartesian(cx, cy, outerR, endAngle)
  const endInner = polarToCartesian(cx, cy, innerR, endAngle)
  const startInner = polarToCartesian(cx, cy, innerR, startAngle)

  // Path:
  // 1) Move to startOuter
  // 2) Outer arc: startOuter -> endOuter (sweep = 1)
  // 3) End cap: arc of radius capR from endOuter -> endInner (half-circle)
  // 4) Inner arc: endInner -> startInner (sweep = 0, reverse direction)
  // 5) Start cap: arc of radius capR from startInner -> startOuter (half-circle)
  let d = undefined
  if (includeCaps) {
    d = [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `A ${capR} ${capR} 0 0 1 ${endInner.x} ${endInner.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      `A ${capR} ${capR} 0 0 1 ${startOuter.x} ${startOuter.y}`,
      "Z",
    ].join(" ")
  } else {
    d = [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      "Z",
    ].join(" ")
  }

  return d
}
