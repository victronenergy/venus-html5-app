import React, { useCallback, useRef } from "react"
import { observer } from "mobx-react"
import { createHue, HSVWColor } from "@victronenergy/mfd-modules/dist/src/utils/hsvw"
import { hsvToHsl } from "app/Marine2/utils/helpers/color-conversion-routines"

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

/**
 * Describe a thick ring arc with integrated circular caps as a single closed path.
 *
 * - cx, cy          center of circle
 * - innerR, outerR  inner and outer radius (outerR > innerR)
 * - startAngle/endAngle in degrees (0 = top, increases clockwise in this helper)
 *
 * Returns an SVG path "d" string.
 */
function describeRoundedArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
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
  const d = [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
    `A ${capR} ${capR} 0 0 1 ${endInner.x} ${endInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
    `A ${capR} ${capR} 0 0 1 ${startOuter.x} ${startOuter.y}`,
    "Z",
  ].join(" ")

  return d
}

interface ColorPickerProps {
  color: HSVWColor
  onColorChange?: (color: HSVWColor) => void
  className?: string
}

const ColorPicker = observer(({ color, onColorChange, className = "" }: ColorPickerProps) => {
  // Prepare canvas
  const width = 200
  const height = 200
  const cX = width / 2
  const cY = height / 2
  const maxRadius = Math.min(width, height) / 2

  // Derive sizes from the canvas size
  const hueRingThickness = maxRadius * 0.28
  const spacing = hueRingThickness * 0.5
  const arcThickness = hueRingThickness * 0.7
  const handleBorderSize = spacing * 0.2
  const arcBorderSize = handleBorderSize * 0.5

  const centerCircleRadius = maxRadius * 0.2
  const hueRingInnerRadius = centerCircleRadius + spacing
  const hueRingRadius = hueRingInnerRadius + hueRingThickness / 2
  const hueRingOuterRadius = hueRingInnerRadius + hueRingThickness

  const arcInnerR = hueRingOuterRadius + spacing
  const arcOuterR = arcInnerR + arcThickness
  const bArcStartAngle = 180 + 50
  const bArcEndAngle = 360 - 50
  const brightnessArcPath = describeRoundedArc(cX, cY, arcInnerR, arcOuterR, bArcStartAngle, bArcEndAngle)
  const brightnessFillArcPath = describeRoundedArc(
    cX,
    cY,
    arcInnerR,
    arcOuterR,
    bArcStartAngle,
    bArcStartAngle + (color.brightness / 100) * (bArcEndAngle - bArcStartAngle),
  )
  const sArcStartAngle = 0 + 50
  const sArcEndAngle = 180 - 50
  const saturationArcPath = describeRoundedArc(cX, cY, arcInnerR, arcOuterR, sArcStartAngle, sArcEndAngle)
  const wArcStartAngle = 180 - 30
  const wArcEndAngle = 180 + 30
  const whiteLevelArcPath = describeRoundedArc(cX, cY, arcInnerR, arcOuterR, wArcStartAngle, wArcEndAngle)

  // Calculate handle position on the hue ring
  const hueRingHandleSize = hueRingThickness / 2
  const hueRingHandleAngle = -(color.hue + 35) * (Math.PI / 180)
  const hueHandleX = cX + hueRingRadius * Math.cos(hueRingHandleAngle)
  const hueHandleY = cY + hueRingRadius * Math.sin(hueRingHandleAngle)

  // Calculate handle position on the brightness arc
  const brightnessHandleSize = arcThickness / 2
  const brightnessHandleAngle =
    (bArcStartAngle - 90 + (color.brightness / 100) * (bArcEndAngle - bArcStartAngle)) * (Math.PI / 180)
  const brightnessHandleX = cX + (arcInnerR + arcThickness / 2) * Math.cos(brightnessHandleAngle)
  const brightnessHandleY = cY + (arcInnerR + arcThickness / 2) * Math.sin(brightnessHandleAngle)

  // Calculate handle position on the saturation arc
  const saturationHandleSize = arcThickness / 2
  const saturationHandleAngle =
    (sArcStartAngle - 90 + ((100 - color.saturation) / 100) * (sArcEndAngle - sArcStartAngle)) * (Math.PI / 180)
  const saturationHandleX = cX + (arcInnerR + arcThickness / 2) * Math.cos(saturationHandleAngle)
  const saturationHandleY = cY + (arcInnerR + arcThickness / 2) * Math.sin(saturationHandleAngle)

  // Calculate handle position on the white level arc
  const whiteLevelHandleSize = arcThickness / 2
  const whiteLevelHandleAngle =
    (wArcStartAngle - 90 + ((100 - color.white) / 100) * (wArcEndAngle - wArcStartAngle)) * (Math.PI / 180)
  const whiteLevelHandleX = cX + (arcInnerR + arcThickness / 2) * Math.cos(whiteLevelHandleAngle)
  const whiteLevelHandleY = cY + (arcInnerR + arcThickness / 2) * Math.sin(whiteLevelHandleAngle)

  const svgRef = useRef<SVGSVGElement>(null)
  const isDraggingRef = useRef(false)

  // Check if point is within the hue ring
  const isPointInHueRing = useCallback(
    (x: number, y: number) => {
      const dx = x - cX
      const dy = y - cY
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance >= hueRingInnerRadius && distance <= hueRingOuterRadius + hueRingHandleSize
    },
    [cX, cY, hueRingInnerRadius, hueRingOuterRadius, hueRingHandleSize],
  )

  // Calculate hue from mouse position
  const calculateHue = useCallback(
    (x: number, y: number) => {
      const dx = x - cX
      const dy = y - cY
      let angle = Math.atan2(dy, dx) * (180 / Math.PI)
      // Convert to hue (0-360), accounting for rotation offset
      let hue = -angle - 35
      // Normalize to 0-360
      hue = ((hue % 360) + 360) % 360
      return hue
    },
    [cX, cY],
  )

  // Get SVG coordinates from mouse event
  const getSVGCoordinates = useCallback(
    (event: React.MouseEvent<SVGElement> | MouseEvent) => {
      if (!svgRef.current) return null
      console.log(`DEBUG: getSVGCoordinates`)
      const svg = svgRef.current
      const rect = svg.getBoundingClientRect()
      const scaleX = width / rect.width
      const scaleY = height / rect.height
      const x = (event.clientX - rect.left) * scaleX
      const y = (event.clientY - rect.top) * scaleY
      return { x, y }
    },
    [width, height],
  )

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      console.log(`DEBUG: handleMouseDown`)
      const coords = getSVGCoordinates(event)
      if (!coords) return

      if (isPointInHueRing(coords.x, coords.y)) {
        isDraggingRef.current = true
        const newHue = calculateHue(coords.x, coords.y)
        // onHueChange?.(newHue)
        console.log(`DEBUG: newHue: ${newHue}`)
        onColorChange?.({ ...color, hue: createHue(newHue) })
        event.preventDefault()
      }
    },
    [getSVGCoordinates, isPointInHueRing, calculateHue, onColorChange, color],
  )

  // const handleMouseMove = useCallback(
  //   (event: MouseEvent) => {
  //     console.log(`DEBUG: handleMouseMove`)
  //     if (!isDraggingRef.current) return

  //     const coords = getSVGCoordinates(event)
  //     if (!coords) return

  //     const newHue = calculateHue(coords.x, coords.y)
  //     // onHueChange?.(newHue)
  //     console.log(`DEBUG: newHue: ${newHue}`)
  //     event.preventDefault()
  //   },
  //   [getSVGCoordinates, calculateHue],
  // )

  // const handleMouseUp = useCallback(() => {
  //   console.log(`DEBUG: handleMouseUp`)
  //   isDraggingRef.current = false
  // }, [])

  // Add/remove global mouse listeners for dragging
  // React.useEffect(() => {
  //   window.addEventListener("mousemove", handleMouseMove)
  //   window.addEventListener("mouseup", handleMouseUp)
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove)
  //     window.removeEventListener("mouseup", handleMouseUp)
  //   }
  // }, [handleMouseMove, handleMouseUp])

  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
      >
        {/* Selected color circle */}
        <circle cx={cX} cy={cY} r={centerCircleRadius} fill={hsvToHsl(color.hue, color.saturation, 100)} />
        {/* Hue ring */}
        <circle
          cx={cX}
          cy={cY}
          r={hueRingRadius}
          fill="none"
          stroke="tomato"
          strokeWidth={hueRingOuterRadius - hueRingInnerRadius}
          onMouseDown={handleMouseDown}
          pointerEvents="all"
        />
        {/* Left arc - Brightness */}
        <path
          d={brightnessArcPath}
          // TODO: this is a super hacky way to directly refer to the theme color, simplify
          fill="rgba(var(--c-victron-blue-rgb), 0.3)"
          stroke="rgba(var(--c-victron-blue-rgb), 1.0)"
          strokeWidth={arcBorderSize}
          strokeLinejoin="round"
        />
        {/* Left arc - Brightness Fill */}
        <path
          d={brightnessFillArcPath}
          // TODO: this is a super hacky way to directly refer to the theme color, simplify
          fill="rgba(var(--c-victron-blue-rgb), 1.0)"
          stroke="rgba(var(--c-victron-blue-rgb), 1.0)"
          strokeWidth={arcBorderSize}
          strokeLinejoin="round"
        />
        {/* Right arc - Saturation */}
        <path d={saturationArcPath} fill="tomato" stroke="black" strokeWidth={0} strokeLinejoin="round" />
        {/* Bottom arc - White level */}
        <path d={whiteLevelArcPath} fill="tomato" stroke="black" strokeWidth="black" strokeLinejoin="round" />
        {/* Hue handle */}
        <circle
          cx={hueHandleX}
          cy={hueHandleY}
          r={hueRingHandleSize - 3}
          // fill={hsvToHsl(color.hue, 100, 100)} // TODO: show selected color
          fill="transparent"
          stroke="white" // TODO: use theme color??
          strokeWidth={handleBorderSize}
        />
        {/* Brightness handle */}
        <circle
          cx={brightnessHandleX}
          cy={brightnessHandleY}
          r={brightnessHandleSize - handleBorderSize}
          // TODO: this is a super hacky way to directly refer to the theme color, simplify
          fill="rgba(var(--c-victron-blue-rgb), 1.0)"
          stroke="white" // TODO: use theme color??
          strokeWidth={handleBorderSize}
        />
        {/* Saturation handle */}
        <circle
          cx={saturationHandleX}
          cy={saturationHandleY}
          r={saturationHandleSize - handleBorderSize}
          // fill={hsvToHsl(color.hue, color.saturation, 100)} // TODO: show selected color
          fill="transparent" // TODO: or derive color from the bg?
          stroke="white" // TODO: use theme color??
          strokeWidth={handleBorderSize}
        />
        {/* White level handle */}
        <circle
          cx={whiteLevelHandleX}
          cy={whiteLevelHandleY}
          r={whiteLevelHandleSize - handleBorderSize}
          // TODO: this is a super hacky way to directly refer to the theme color, simplify
          fill="rgba(var(--c-victron-blue-rgb), 1.0)"
          stroke="white" // TODO: use theme color??
          strokeWidth={handleBorderSize}
        />
      </svg>
    </div>
  )
})

export default ColorPicker
