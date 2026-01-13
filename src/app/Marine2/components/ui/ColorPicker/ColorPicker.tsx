import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import {
  createColorTemperature,
  createHue,
  createPercentage,
  HSVWColor,
} from "@victronenergy/mfd-modules/dist/src/utils/hsvw"
import {
  angleToColorHue,
  angleToColorTemperature,
  cctColorFunction,
  colorHueToAngle,
  colorHueToDisplayColor,
  colorTemperatureToAngle,
  colorTemperatureToDisplayColor,
  rgbColorFunction,
} from "app/Marine2/utils/helpers/color-conversion-routines"
import { describeArc } from "app/Marine2/utils/helpers/svg-routines"
import { SWITCHABLE_OUTPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"

export type ColorPickerMode =
  | typeof SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL
  | typeof SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL
  | typeof SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL

export const COLOR_PICKER_MODE_BITMASK = {
  RGB: 1 << SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL,
  CCT: 1 << SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL,
  RGBW: 1 << SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL,
}

export type ColorPickerValidModes = (typeof COLOR_PICKER_MODE_BITMASK)[keyof typeof COLOR_PICKER_MODE_BITMASK]

interface ColorPickerProps {
  color: HSVWColor
  mode: ColorPickerMode
  validModes: ColorPickerValidModes
  onColorChange?: (color: HSVWColor) => void
  className?: string
}

const ColorPicker = observer(({ color, mode, validModes, onColorChange, className = "" }: ColorPickerProps) => {
  // Cache color prop for local re-rendering
  const [localColor, setLocalColor] = useState(color)
  // Cache color picker modep prop for local re-rendering
  const [localMode, setLocalMode] = useState<ColorPickerMode>(mode)
  // Cache angle on CCT/RGB selection ring when dragging around to know where to place incoming CCT values
  const [mainHandleAngle, setMainHandleAngle] = useState(0)

  useLayoutEffect(() => {
    setLocalColor(color)
  }, [color])

  useLayoutEffect(() => {
    setLocalMode(mode)
  }, [mode])

  const showsModeSwitcher =
    ((validModes & COLOR_PICKER_MODE_BITMASK.RGB) !== 0 || (validModes & COLOR_PICKER_MODE_BITMASK.RGBW) !== 0) &&
    (validModes & COLOR_PICKER_MODE_BITMASK.CCT) !== 0
  const showsWhiteLevelSlider = localMode === SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL
  const isInCCTMode = localMode === SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL
  const isInRGBMode =
    localMode === SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL || localMode === SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL

  // Prepare canvas
  const width = 200
  const height = 200
  const cX = width / 2
  const cY = height / 2
  const maxRadius = Math.min(width, height) / 2

  // Derive sizes from the canvas size to fit the whole picker without any padding/margin
  const mainRingThickness = maxRadius * 0.27
  const spacing = mainRingThickness * 0.5
  const arcThickness = mainRingThickness * 0.7
  const handleBorderSize = spacing * 0.2
  const arcBorderSize = handleBorderSize * 0.5

  const centerCircleRadius = maxRadius * 0.25
  const mainRingInnerRadius = centerCircleRadius + spacing
  const mainRingRadius = mainRingInnerRadius + mainRingThickness / 2
  const mainRingOuterRadius = mainRingInnerRadius + mainRingThickness

  const arcInnerR = mainRingOuterRadius + spacing
  const arcOuterR = arcInnerR + arcThickness
  const arcR = arcInnerR + arcThickness / 2
  const angularOffset = Math.atan2(arcThickness / 2, (arcInnerR + arcOuterR) / 2) * (180 / Math.PI)

  const bArcStartAngle = 180 + 54
  const bArcEndAngle = 360 - 54
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

  const sArcStartAngle = 0 + 54
  const sArcEndAngle = 180 - 54
  const sArcStartAngleHT = sArcStartAngle - angularOffset
  const sArcEndAngleHT = sArcEndAngle + angularOffset
  const saturationArcPath = describeArc(cX, cY, arcInnerR, arcOuterR, sArcStartAngle, sArcEndAngle, true)

  const wArcStartAngle = 180 - 30
  const wArcEndAngle = 180 + 30
  const wArcStartAngleHT = wArcStartAngle - angularOffset
  const wArcEndAngleHT = wArcEndAngle + angularOffset
  const whiteLevelArcPath = describeArc(cX, cY, arcInnerR, arcOuterR, wArcStartAngle, wArcEndAngle, true)

  // Calculate handle position on the main ring
  const mainRingHandleSize = mainRingThickness / 2
  let mainRingHandleAngle
  if (isInCCTMode) {
    mainRingHandleAngle = colorTemperatureToAngle(localColor.colorTemperature, mainHandleAngle) * (Math.PI / 180)
  } else {
    mainRingHandleAngle = colorHueToAngle(localColor.hue) * (Math.PI / 180)
  }
  const mainHandleX = cX + mainRingRadius * Math.cos(mainRingHandleAngle)
  const mainHandleY = cY + mainRingRadius * Math.sin(mainRingHandleAngle)

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

  // Calculate rgb / cct switch position
  const modeSwitchHandleSize = mainRingHandleSize
  const modeSwitchRadius = arcOuterR - modeSwitchHandleSize
  const rgbwModeSwitchAngle = (-90 - 15) * (Math.PI / 180)
  const cctModeSwitchAngle = (-90 + 15) * (Math.PI / 180)
  const rgbwModeHandleX = cX + modeSwitchRadius * Math.cos(rgbwModeSwitchAngle)
  const rgbwModeHandleY = cY + modeSwitchRadius * Math.sin(rgbwModeSwitchAngle)
  const cctModeHandleX = cX + modeSwitchRadius * Math.cos(cctModeSwitchAngle)
  const cctModeHandleY = cY + modeSwitchRadius * Math.sin(cctModeSwitchAngle)

  const svgRef = useRef<SVGSVGElement>(null)
  const isDraggingHueRef = useRef(false)
  const isDraggingBrightnessRef = useRef(false)
  const isDraggingSaturationRef = useRef(false)
  const isDraggingWhiteLevelRef = useRef(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  const gradientDegreesPerStep = 1

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
      const inHueRing = distance >= mainRingInnerRadius && distance <= mainRingOuterRadius + mainRingHandleSize
      const inArcRange = distance >= arcInnerR && distance <= arcOuterR
      const inBrightnessArc = inArcRange && angle >= bArcStartAngleHT && angle <= bArcEndAngleHT
      const inSaturationArc = inArcRange && angle >= sArcStartAngleHT && angle <= sArcEndAngleHT
      const inWhiteLevelArc = inArcRange && angle >= wArcStartAngleHT && angle <= wArcEndAngleHT
      return { inHueRing, inBrightnessArc, inSaturationArc, inWhiteLevelArc, angle }
    },
    [
      cX,
      cY,
      mainRingInnerRadius,
      mainRingOuterRadius,
      mainRingHandleSize,
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
    return Math.round(angleToColorHue(angle))
  }, [])

  const calculateColorTemperature = useCallback((angle: number) => {
    return Math.round(angleToColorTemperature(angle))
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
        setMainHandleAngle(angle)
        if (isInCCTMode) {
          isDraggingHueRef.current = true
          const newTemperature = calculateColorTemperature(angle)
          updateColorImmediately({ ...localColor, colorTemperature: createColorTemperature(newTemperature) })
          event.preventDefault()
        }
        if (isInRGBMode) {
          isDraggingHueRef.current = true
          const newHue = calculateHue(angle)
          updateColorImmediately({ ...localColor, hue: createHue(newHue) })
          event.preventDefault()
        }
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
      isInCCTMode,
      isInRGBMode,
      calculateColorTemperature,
      updateColorImmediately,
      localColor,
      calculateHue,
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
        setMainHandleAngle(angle)
        if (isInCCTMode) {
          const newTemperature = calculateColorTemperature(angle)
          updateColorDebounced({ ...localColor, colorTemperature: createColorTemperature(newTemperature) })
          event.preventDefault()
        }
        if (isInRGBMode) {
          const newHue = calculateHue(angle)
          updateColorDebounced({ ...color, hue: createHue(newHue) })
          event.preventDefault()
        }
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
      isInCCTMode,
      isInRGBMode,
      calculateColorTemperature,
      updateColorDebounced,
      localColor,
      calculateHue,
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

  const switchToRGBWMode = useCallback(() => {
    if (validModes & COLOR_PICKER_MODE_BITMASK.RGBW) {
      setLocalMode(SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL)
    } else {
      setLocalMode(SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL)
    }
  }, [validModes])

  const switchToCCTMode = useCallback(() => {
    if (validModes & COLOR_PICKER_MODE_BITMASK.CCT) {
      setLocalMode(SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL)
    }
  }, [validModes])

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
        {/* RGBW Mode Switch Gradient */}
        {showsModeSwitcher &&
          generateGradientRing(
            rgbwModeHandleX,
            rgbwModeHandleY,
            modeSwitchHandleSize * 0.5,
            modeSwitchHandleSize * 0.9,
            180,
            rgbColorFunction,
          )}
        {/* RGB Mode Switch Selection Ring */}
        {showsModeSwitcher && (
          <circle
            cx={rgbwModeHandleX}
            cy={rgbwModeHandleY}
            r={modeSwitchHandleSize}
            fill="transparent"
            stroke="rgba(var(--c-victron-blue-rgb), 1.0)"
            strokeWidth={isInRGBMode ? arcBorderSize : 0}
            onMouseDown={switchToRGBWMode}
            onTouchStart={switchToRGBWMode}
            pointerEvents="all"
          />
        )}
        {/* RGBW Mode Switch Gradient */}
        {showsModeSwitcher &&
          generateGradientRing(
            cctModeHandleX,
            cctModeHandleY,
            modeSwitchHandleSize * 0.5,
            modeSwitchHandleSize * 0.9,
            180,
            cctColorFunction,
          )}
        {/* CCT Mode Switch Selection Ring */}
        {showsModeSwitcher && (
          <circle
            cx={cctModeHandleX}
            cy={cctModeHandleY}
            r={modeSwitchHandleSize}
            fill="transparent"
            stroke="rgba(var(--c-victron-blue-rgb), 1.0)"
            strokeWidth={isInCCTMode ? arcBorderSize : 0}
            onMouseDown={switchToCCTMode}
            onTouchStart={switchToCCTMode}
            pointerEvents="all"
          />
        )}
        {/* Selected Color Circle */}
        <circle
          cx={cX}
          cy={cY}
          r={centerCircleRadius}
          fill={
            isInCCTMode
              ? colorTemperatureToDisplayColor(localColor.colorTemperature)
              : colorHueToDisplayColor(localColor.hue, localColor.saturation, 100)
          }
        />
        {/* Main Ring Gradient */}
        {generateGradientRing(
          cX,
          cY,
          mainRingInnerRadius,
          mainRingOuterRadius,
          360 / gradientDegreesPerStep,
          isInRGBMode ? rgbColorFunction : cctColorFunction,
        )}
        {/* Main Ring Handle */}
        <circle
          cx={cX}
          cy={cY}
          r={mainRingRadius}
          fill="none"
          stroke="none"
          strokeWidth={mainRingOuterRadius - mainRingInnerRadius}
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          pointerEvents="all"
        />
        {/* Left Arc - Brightness Background with Touch */}
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
        {/* Left Arc - Brightness with Touch */}
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
        {/* Right Arc Gradient Caps */}
        {isInRGBMode &&
          (() => {
            const startCapX = cX + arcR * Math.sin((sArcStartAngle * Math.PI) / 180)
            const startCapY = cY + arcR * Math.cos((sArcStartAngle * Math.PI) / 180)
            const endCapX = cX + arcR * Math.sin((sArcEndAngle * Math.PI) / 180)
            const endCapY = cY + arcR * Math.cos((sArcEndAngle * Math.PI) / 180)
            const capRadius = (arcOuterR - arcInnerR) / 2
            return (
              <>
                <circle
                  cx={startCapX}
                  cy={startCapY}
                  r={capRadius}
                  fill={colorHueToDisplayColor(localColor.hue, 0, 100)}
                />
                <circle
                  cx={endCapX}
                  cy={endCapY}
                  r={capRadius}
                  fill={colorHueToDisplayColor(localColor.hue, 100, 100)}
                />
              </>
            )
          })()}
        {/* Right Arc Gradient Background */}
        {isInRGBMode &&
          generateGradientArc(
            cX,
            cY,
            arcInnerR,
            arcOuterR,
            sArcStartAngle,
            sArcEndAngle,
            gradientDegreesPerStep,
            (t: number) => colorHueToDisplayColor(localColor.hue, 100 - t * 100, 100),
          )}
        {/* Right Arc - Saturation Touch Area */}
        {isInRGBMode &&
          (() => {
            return (
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
            )
          })()}
        {/* Bottom Arc Gradient Caps */}
        {showsWhiteLevelSlider &&
          (() => {
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
        {/* Bottom Arc Gradient Background */}
        {showsWhiteLevelSlider &&
          generateGradientArc(
            cX,
            cY,
            arcInnerR,
            arcOuterR,
            wArcStartAngle,
            wArcEndAngle,
            gradientDegreesPerStep,
            (t: number) => colorHueToDisplayColor(0, 0, t * 100),
          )}
        {/* Bottom Arc - White Level */}
        {showsWhiteLevelSlider &&
          (() => (
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
          ))()}
        {/* Main Handle */}
        <circle
          cx={mainHandleX}
          cy={mainHandleY}
          r={mainRingHandleSize - 3}
          fill="transparent"
          stroke="white"
          strokeWidth={handleBorderSize}
          pointerEvents="none"
        />
        {/* Brightness Handle */}
        <circle
          cx={brightnessHandleX}
          cy={brightnessHandleY}
          r={brightnessHandleSize - handleBorderSize}
          // TODO: this is a super hacky way to directly refer to the theme color, simplify
          fill="rgba(var(--c-victron-blue-rgb), 1.0)"
          stroke="white"
          strokeWidth={handleBorderSize}
          pointerEvents="none"
        />
        {/* Saturation Handle */}
        {isInRGBMode &&
          (() => {
            return (
              <circle
                cx={saturationHandleX}
                cy={saturationHandleY}
                r={saturationHandleSize - handleBorderSize}
                fill="transparent"
                stroke="white"
                strokeWidth={handleBorderSize}
                pointerEvents="none"
              />
            )
          })()}
        {/* White level Handle */}
        {showsWhiteLevelSlider &&
          (() => (
            <circle
              cx={whiteLevelHandleX}
              cy={whiteLevelHandleY}
              r={whiteLevelHandleSize - handleBorderSize}
              // TODO: this is a super hacky way to directly refer to the theme color, simplify
              fill="rgba(var(--c-victron-blue-rgb), 1.0)"
              stroke="white"
              strokeWidth={handleBorderSize}
              pointerEvents="none"
            />
          ))()}
      </svg>
    </div>
  )
})

function generateGradientArc(
  cX: number,
  cY: number,
  arcInnerR: number,
  arcOuterR: number,
  arcStartAngle: number,
  arcEndAngle: number,
  gradientDegreesPerStep: number,
  colorFunction: (t: number) => string,
) {
  const steps = (arcEndAngle - arcStartAngle) / gradientDegreesPerStep
  return Array.from({ length: steps }, (_, i) => {
    const startAngle = arcStartAngle + i * gradientDegreesPerStep
    const endAngle = Math.min(startAngle + gradientDegreesPerStep, arcEndAngle)
    const t = (startAngle - arcStartAngle) / (arcEndAngle - arcStartAngle)

    return (
      <path
        key={`x-${i}`}
        d={describeArc(cX, cY, arcInnerR, arcOuterR, startAngle, endAngle + gradientDegreesPerStep / 2, false)}
        fill={colorFunction(t)}
      />
    )
  })
}

function generateGradientRing(
  cX: number,
  cY: number,
  innerR: number,
  outerR: number,
  steps: number,
  colorFunction: (i: number, steps: number) => string,
) {
  const degreesPerStep = 360 / steps
  return Array.from({ length: steps }, (_, i) => {
    const stepValue = i * degreesPerStep
    const displayAngle = (-stepValue - 35 + 90 + 360) % 360
    const arcSpan = degreesPerStep / 2
    return (
      <path
        key={`x-${stepValue}`}
        d={describeArc(
          cX,
          cY,
          innerR,
          outerR,
          displayAngle - arcSpan,
          displayAngle + arcSpan + degreesPerStep / 2,
          false,
        )}
        fill={colorFunction(i, steps)}
      />
    )
  })
}

export default ColorPicker
