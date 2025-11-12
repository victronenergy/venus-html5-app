import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import { createHue, createPercentage, HSVWColor } from "@victronenergy/mfd-modules/dist/src/utils/hsvw"
import { hsvToHsl } from "app/Marine2/utils/helpers/color-conversion-routines"

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
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
function describeArc(
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

interface ColorPickerProps {
  color: HSVWColor
  onColorChange?: (color: HSVWColor) => void
  className?: string
}

const ColorPicker = observer(({ color, onColorChange, className = "" }: ColorPickerProps) => {
  // Cache color prop for local re-rendering, notify parent only when ready
  const [localColor, setLocalColor] = useState(color)

  useLayoutEffect(() => {
    setLocalColor(color)
  }, [color])

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
  const arcR = arcInnerR + arcThickness / 2
  const angularOffset = Math.atan2(arcThickness / 2, (arcInnerR + arcOuterR) / 2) * (180 / Math.PI)

  const bArcStartAngle = 180 + 50
  const bArcEndAngle = 360 - 50
  const bArcStartAngleHT = bArcStartAngle - angularOffset
  const bArcEndAngleHT = bArcEndAngle + angularOffset
  const brightnessArcPath = describeArc(cX, cY, arcInnerR, arcOuterR, bArcStartAngle, bArcEndAngle, true)
  const brightnessFillArcPath = describeArc(
    cX,
    cY,
    arcInnerR,
    arcOuterR,
    bArcStartAngle,
    bArcStartAngle + (localColor.brightness / 100) * (bArcEndAngle - bArcStartAngle),
    true,
  )

  const sArcStartAngle = 0 + 50
  const sArcEndAngle = 180 - 50
  const sArcStartAngleHT = sArcStartAngle - angularOffset
  const sArcEndAngleHT = sArcEndAngle + angularOffset
  const saturationArcPath = describeArc(cX, cY, arcInnerR, arcOuterR, sArcStartAngle, sArcEndAngle, true)

  const wArcStartAngle = 180 - 30
  const wArcEndAngle = 180 + 30
  const wArcStartAngleHT = wArcStartAngle - angularOffset
  const wArcEndAngleHT = wArcEndAngle + angularOffset
  const whiteLevelArcPath = describeArc(cX, cY, arcInnerR, arcOuterR, wArcStartAngle, wArcEndAngle, true)

  // Calculate handle position on the hue ring
  const hueRingHandleSize = hueRingThickness / 2
  const hueRingHandleAngle = -(localColor.hue + 35) * (Math.PI / 180)
  const hueHandleX = cX + hueRingRadius * Math.cos(hueRingHandleAngle)
  const hueHandleY = cY + hueRingRadius * Math.sin(hueRingHandleAngle)

  // Calculate handle position on the brightness arc
  const brightnessHandleSize = arcThickness / 2
  const brightnessHandleAngle =
    (bArcStartAngle - 90 + (localColor.brightness / 100) * (bArcEndAngle - bArcStartAngle)) * (Math.PI / 180)
  const brightnessHandleX = cX + arcR * Math.cos(brightnessHandleAngle)
  const brightnessHandleY = cY + arcR * Math.sin(brightnessHandleAngle)

  // Calculate handle position on the saturation arc
  const saturationHandleSize = arcThickness / 2
  const saturationHandleAngle =
    (sArcStartAngle - 90 + ((100 - localColor.saturation) / 100) * (sArcEndAngle - sArcStartAngle)) * (Math.PI / 180)
  const saturationHandleX = cX + arcR * Math.cos(saturationHandleAngle)
  const saturationHandleY = cY + arcR * Math.sin(saturationHandleAngle)

  // Calculate handle position on the white level arc
  const whiteLevelHandleSize = arcThickness / 2
  const whiteLevelHandleAngle =
    (wArcStartAngle - 90 + ((100 - localColor.white) / 100) * (wArcEndAngle - wArcStartAngle)) * (Math.PI / 180)
  const whiteLevelHandleX = cX + arcR * Math.cos(whiteLevelHandleAngle)
  const whiteLevelHandleY = cY + arcR * Math.sin(whiteLevelHandleAngle)

  const svgRef = useRef<SVGSVGElement>(null)
  const isDraggingHueRef = useRef(false)
  const isDraggingBrightnessRef = useRef(false)
  const isDraggingSaturationRef = useRef(false)
  const isDraggingWhiteLevelRef = useRef(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  const updateColorImmediately = useCallback(
    (color: HSVWColor) => {
      setLocalColor(color)
      onColorChange?.(color)
    },
    [onColorChange],
  )

  const updateColorDebounced = useCallback(
    (color: HSVWColor) => {
      setLocalColor(color)
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
        updateTimeoutRef.current = undefined
      }

      updateTimeoutRef.current = setTimeout(() => {
        onColorChange?.(color)
      }, 50)
    },
    [onColorChange],
  )

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  // Check if point is within the hue ring or one of the arcs
  const hitTest = useCallback(
    (x: number, y: number) => {
      const dx = x - cX
      const dy = y - cY
      // Compute distance from the center
      const distance = Math.sqrt(dx * dx + dy * dy)
      // Compute angle, 0 degrees on 12 hours, clockwise rotation
      const angle = (Math.atan2(dx, -dy) * (180 / Math.PI) + 360) % 360
      const inHueRing = distance >= hueRingInnerRadius && distance <= hueRingOuterRadius + hueRingHandleSize
      const inArcRange = distance >= arcInnerR && distance <= arcOuterR
      const inBrightnessArc = inArcRange && angle >= bArcStartAngleHT && angle <= bArcEndAngleHT
      const inSaturationArc = inArcRange && angle >= sArcStartAngleHT && angle <= sArcEndAngleHT
      const inWhiteLevelArc = inArcRange && angle >= wArcStartAngleHT && angle <= wArcEndAngleHT
      return { inHueRing, inBrightnessArc, inSaturationArc, inWhiteLevelArc, angle }
    },
    [
      cX,
      cY,
      hueRingInnerRadius,
      hueRingOuterRadius,
      hueRingHandleSize,
      arcInnerR,
      arcOuterR,
      bArcStartAngleHT,
      bArcEndAngleHT,
      sArcStartAngleHT,
      sArcEndAngleHT,
      wArcStartAngleHT,
      wArcEndAngleHT,
    ],
  )

  const calculateHue = useCallback((angle: number) => {
    // Convert to hue (0-360), accounting for rotation offset
    let hue = -angle - 35 + 90
    // Normalize to 0-360
    hue = ((hue % 360) + 360) % 360
    return Math.round(hue)
  }, [])

  const calculateBrightness = useCallback(
    (angle: number) => {
      const result = ((angle - bArcStartAngleHT) / (bArcEndAngleHT - bArcStartAngleHT)) * 100
      return Math.round(Math.max(0, Math.min(100, result)))
    },
    [bArcEndAngleHT, bArcStartAngleHT],
  )

  const calculateSaturation = useCallback(
    (angle: number) => {
      const result = ((angle - sArcStartAngleHT) / (sArcEndAngleHT - sArcStartAngleHT)) * 100
      return Math.round(100 - Math.max(0, Math.min(100, result)))
    },
    [sArcEndAngleHT, sArcStartAngleHT],
  )

  const calculateWhiteLevel = useCallback(
    (angle: number) => {
      const result = ((angle - wArcStartAngleHT) / (wArcEndAngleHT - wArcStartAngleHT)) * 100
      return Math.round(100 - Math.max(0, Math.min(100, result)))
    },
    [wArcEndAngleHT, wArcStartAngleHT],
  )

  // Get mouse event coordinates in the SVG view box coodinate system
  const getSVGCoordinates = useCallback((event: React.MouseEvent<SVGElement> | React.TouchEvent<SVGElement>) => {
    if (!svgRef.current) return null
    const svg = svgRef.current

    const pt = svg.createSVGPoint()
    if ("touches" in event) {
      pt.x = event.touches[0].clientX
      pt.y = event.touches[0].clientY
    } else {
      pt.x = event.clientX
      pt.y = event.clientY
    }

    const ctm = svg.getScreenCTM()
    if (!ctm) return null

    const svgP = pt.matrixTransform(ctm.inverse())

    return { x: svgP.x, y: svgP.y }
  }, [])

  const handlePress = useCallback(
    (event: React.MouseEvent<SVGElement> | React.TouchEvent<SVGElement>) => {
      const coords = getSVGCoordinates(event)
      if (!coords) return

      const { inHueRing, inBrightnessArc, inSaturationArc, inWhiteLevelArc, angle } = hitTest(coords.x, coords.y)

      if (inHueRing) {
        isDraggingHueRef.current = true
        const newHue = calculateHue(angle)
        updateColorImmediately({ ...localColor, hue: createHue(newHue) })
        event.preventDefault()
      }
      if (inBrightnessArc) {
        isDraggingBrightnessRef.current = true
        const newBrightness = calculateBrightness(angle)
        updateColorImmediately({ ...localColor, brightness: createPercentage(newBrightness) })
        event.preventDefault()
      }
      if (inSaturationArc) {
        isDraggingSaturationRef.current = true
        const newSaturation = calculateSaturation(angle)
        updateColorImmediately({ ...localColor, saturation: createPercentage(newSaturation) })
        event.preventDefault()
      }
      if (inWhiteLevelArc) {
        isDraggingWhiteLevelRef.current = true
        const newWhiteLevel = calculateWhiteLevel(angle)
        updateColorImmediately({ ...localColor, white: createPercentage(newWhiteLevel) })
        event.preventDefault()
      }
    },
    [
      getSVGCoordinates,
      hitTest,
      calculateHue,
      updateColorImmediately,
      localColor,
      calculateBrightness,
      calculateSaturation,
      calculateWhiteLevel,
    ],
  )

  const handleMove = useCallback(
    (event: React.MouseEvent<SVGElement> | React.TouchEvent<SVGElement>) => {
      const coords = getSVGCoordinates(event)
      if (!coords) return

      const { angle } = hitTest(coords.x, coords.y)

      if (isDraggingHueRef.current) {
        const newHue = calculateHue(angle)
        updateColorDebounced({ ...color, hue: createHue(newHue) })
        event.preventDefault()
      }
      if (isDraggingBrightnessRef.current) {
        const newBrightness = calculateBrightness(angle)
        updateColorDebounced({ ...color, brightness: createPercentage(newBrightness) })
        event.preventDefault()
      }
      if (isDraggingSaturationRef.current) {
        const newSaturation = calculateSaturation(angle)
        updateColorDebounced({ ...color, saturation: createPercentage(newSaturation) })
        event.preventDefault()
      }
      if (isDraggingWhiteLevelRef.current) {
        const newWhiteLevel = calculateWhiteLevel(angle)
        updateColorDebounced({ ...color, white: createPercentage(newWhiteLevel) })
        event.preventDefault()
      }
    },
    [
      getSVGCoordinates,
      hitTest,
      calculateHue,
      updateColorDebounced,
      color,
      calculateBrightness,
      calculateSaturation,
      calculateWhiteLevel,
    ],
  )

  const handleRelease = useCallback(() => {
    isDraggingHueRef.current = false
    isDraggingBrightnessRef.current = false
    isDraggingSaturationRef.current = false
    isDraggingWhiteLevelRef.current = false
  }, [])

  // console.log(`DEBUG: render ${JSON.stringify(localColor.brightness)}`)

  const gradientDegreesPerStep = 1

  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
        onMouseMove={handleMove}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchMove={handleMove}
        onTouchEnd={handleRelease}
        onTouchCancel={handleRelease}
      >
        {/* Selected color circle */}
        <circle cx={cX} cy={cY} r={centerCircleRadius} fill={hsvToHsl(localColor.hue, localColor.saturation, 100)} />
        {/* Hue ring gradient */}
        {Array.from({ length: 360 / gradientDegreesPerStep }, (_, i) => {
          const hue = i * gradientDegreesPerStep
          const displayAngle = (-hue - 35 + 90 + 360) % 360
          const arcSpan = gradientDegreesPerStep / 2
          return (
            <path
              key={`hue-${hue}`}
              d={describeArc(
                cX,
                cY,
                hueRingInnerRadius,
                hueRingOuterRadius,
                displayAngle - arcSpan,
                displayAngle + arcSpan + gradientDegreesPerStep / 2,
                false,
              )}
              fill={`hsl(${hue}, 100%, 50%)`}
            />
          )
        })}
        {/* Hue ring */}
        <circle
          cx={cX}
          cy={cY}
          r={hueRingRadius}
          fill="none"
          stroke="none"
          strokeWidth={hueRingOuterRadius - hueRingInnerRadius}
          onMouseDown={handlePress}
          onTouchStart={handlePress}
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
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          pointerEvents="all"
        />
        {/* Left arc - Brightness Fill */}
        <path
          d={brightnessFillArcPath}
          // TODO: this is a super hacky way to directly refer to the theme color, simplify
          fill="rgba(var(--c-victron-blue-rgb), 1.0)"
          stroke="rgba(var(--c-victron-blue-rgb), 1.0)"
          strokeWidth={arcBorderSize}
          strokeLinejoin="round"
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          pointerEvents="all"
        />
        {/* Right arc gradient caps */}
        {(() => {
          const startCapX = cX + arcR * Math.sin((sArcStartAngle * Math.PI) / 180)
          const startCapY = cY + arcR * Math.cos((sArcStartAngle * Math.PI) / 180)
          const endCapX = cX + arcR * Math.sin((sArcEndAngle * Math.PI) / 180)
          const endCapY = cY + arcR * Math.cos((sArcEndAngle * Math.PI) / 180)
          const capRadius = (arcOuterR - arcInnerR) / 2
          return (
            <>
              <circle cx={startCapX} cy={startCapY} r={capRadius} fill={hsvToHsl(localColor.hue, 0, 100)} />
              <circle cx={endCapX} cy={endCapY} r={capRadius} fill={hsvToHsl(localColor.hue, 100, 100)} />
            </>
          )
        })()}
        {/* Right arc gradient background */}
        {(() => {
          const totalAngle = sArcEndAngle - sArcStartAngle
          const segmentCount = Math.ceil(totalAngle / gradientDegreesPerStep)

          return Array.from({ length: segmentCount }, (_, i) => {
            const startAngle = sArcStartAngle + i * gradientDegreesPerStep
            const endAngle = Math.min(startAngle + gradientDegreesPerStep, sArcEndAngle)
            const t = (startAngle - sArcStartAngle) / totalAngle
            const saturation = 100 - t * 100

            return (
              <path
                key={`sat-${i}`}
                d={describeArc(cX, cY, arcInnerR, arcOuterR, startAngle, endAngle + gradientDegreesPerStep / 2, false)}
                fill={hsvToHsl(localColor.hue, saturation, 100)}
              />
            )
          })
        })()}
        {/* Right arc - Saturation */}
        <path
          d={saturationArcPath}
          fill="none"
          stroke="none"
          strokeWidth={0}
          strokeLinejoin="round"
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          pointerEvents="all"
        />
        {/* Bottom arc gradient caps */}
        {(() => {
          const startCapX = cX + arcR * Math.sin((wArcStartAngle * Math.PI) / 180)
          const startCapY = cY - arcR * Math.cos((wArcStartAngle * Math.PI) / 180)
          const endCapX = cX + arcR * Math.sin((wArcEndAngle * Math.PI) / 180)
          const endCapY = cY - arcR * Math.cos((wArcEndAngle * Math.PI) / 180)
          const capRadius = (arcOuterR - arcInnerR) / 2
          return (
            <>
              <circle cx={startCapX} cy={startCapY} r={capRadius} fill={"black"} />
              <circle cx={endCapX} cy={endCapY} r={capRadius} fill={"white"} />
            </>
          )
        })()}
        {/* Bottom arc gradient background */}
        {(() => {
          const totalAngle = wArcEndAngle - wArcStartAngle
          const segmentCount = Math.ceil(totalAngle / gradientDegreesPerStep)

          return Array.from({ length: segmentCount }, (_, i) => {
            const startAngle = wArcStartAngle + i * gradientDegreesPerStep
            const endAngle = Math.min(startAngle + gradientDegreesPerStep, wArcEndAngle)
            const t = (startAngle - wArcStartAngle) / totalAngle
            const white = t * 100

            return (
              <path
                key={`white-${i}`}
                d={describeArc(cX, cY, arcInnerR, arcOuterR, startAngle, endAngle + gradientDegreesPerStep / 2, false)}
                fill={hsvToHsl(0, 0, white)}
              />
            )
          })
        })()}
        {/* Bottom arc - White level */}
        <path
          d={whiteLevelArcPath}
          fill="none"
          stroke="black"
          strokeWidth={arcBorderSize}
          strokeLinejoin="round"
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          pointerEvents="all"
        />
        {/* Hue handle */}
        <circle
          cx={hueHandleX}
          cy={hueHandleY}
          r={hueRingHandleSize - 3}
          // fill={hsvToHsl(localColor.hue, 100, 100)} // TODO: show selected color
          fill="transparent"
          stroke="white" // TODO: use theme color??
          strokeWidth={handleBorderSize}
          pointerEvents="none"
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
          pointerEvents="none"
        />
        {/* Saturation handle */}
        <circle
          cx={saturationHandleX}
          cy={saturationHandleY}
          r={saturationHandleSize - handleBorderSize}
          // fill={hsvToHsl(localColor.hue, localColor.saturation, 100)} // TODO: show selected color
          fill="transparent" // TODO: or derive color from the bg?
          stroke="white" // TODO: use theme color??
          strokeWidth={handleBorderSize}
          pointerEvents="none"
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
          pointerEvents="none"
        />
      </svg>
    </div>
  )
})

export default ColorPicker
