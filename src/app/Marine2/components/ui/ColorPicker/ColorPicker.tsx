/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import {
  createColorTemperature,
  createHue,
  createPercentage,
  emptyHSVWColor,
  emptyHSVWColorPresets,
  HSVWColor,
  HSVWColorPresets,
  isValidHSVWColorPreset,
  setHSVWColorPreset,
} from "@victronenergy/mfd-modules/dist/src/utils/hsvw"
import {
  angleToColorHue,
  angleToColorTemperature,
  colorHueToAngle,
  colorTemperatureToAngle,
} from "app/Marine2/utils/helpers/color-conversion-routines"
import { describeArc, polarToCartesian } from "app/Marine2/utils/helpers/svg-routines"
import { SWITCHABLE_OUTPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import classNames from "classnames"
import useSize from "@react-hook/size"

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
  onModeChange?: (mode: ColorPickerMode) => void
  rgbColorPresets: HSVWColorPresets
  rgbwColorPresets: HSVWColorPresets
  cctColorPresets: HSVWColorPresets
  onRGBColorPresetsChange?: (presets: HSVWColorPresets) => void
  onRGBWColorPresetsChange?: (presets: HSVWColorPresets) => void
  onCCTColorPresetsChange?: (presets: HSVWColorPresets) => void
  className?: string
}

const ColorPicker = observer(
  ({
    color,
    mode,
    validModes,
    onColorChange,
    onModeChange,
    rgbColorPresets,
    rgbwColorPresets,
    cctColorPresets,
    onRGBColorPresetsChange,
    onRGBWColorPresetsChange,
    onCCTColorPresetsChange,
    className = "",
  }: ColorPickerProps) => {
    // Cache color prop for local re-rendering
    const [localColor, setLocalColor] = useState(color)
    // Cache color picker modep prop for local re-rendering
    const [localMode, setLocalMode] = useState<ColorPickerMode>(mode)
    // Cache angle on CCT/RGB selection ring when dragging around to know where to place incoming CCT values
    const [mainHandleAngle, setMainHandleAngle] = useState(0)
    // Cache presets
    const [localColorPresets, setLocalColorPresets] = useState<HSVWColorPresets>(emptyHSVWColorPresets)

    useLayoutEffect(() => {
      setLocalColor(color)
    }, [color])

    useLayoutEffect(() => {
      setLocalMode(mode)
      if (mode === SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL) {
        setLocalColorPresets(rgbColorPresets)
      }
      if (mode === SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL) {
        setLocalColorPresets(rgbwColorPresets)
      }
      if (mode === SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL) {
        setLocalColorPresets(cctColorPresets)
      }
    }, [cctColorPresets, mode, rgbColorPresets, rgbwColorPresets])

    const showsModeSwitcher =
      ((validModes & COLOR_PICKER_MODE_BITMASK.RGB) !== 0 || (validModes & COLOR_PICKER_MODE_BITMASK.RGBW) !== 0) &&
      (validModes & COLOR_PICKER_MODE_BITMASK.CCT) !== 0
    const showsWhiteLevelSlider = localMode === SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL
    const isInCCTMode = localMode === SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL
    const isInRGBMode =
      localMode === SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL || localMode === SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL

    // Prepare canvas
    const width = 1500
    const height = 1500
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
      bArcStartAngle + ((0.01 + localColor.brightness) / 100) * (bArcEndAngle - bArcStartAngle),
      true,
    )
    const bIconPosition = polarToCartesian(cX, cY, (arcInnerR + arcOuterR) / 2, bArcEndAngle)
    const bIconSize = (arcOuterR - arcInnerR) / 1.5

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
        if (!isValidHSVWColorPreset(color)) {
          return
        }
        setLocalColor(color)
        onColorChange?.(color)
      },
      [onColorChange],
    )

    const updateColorDebounced = useCallback(
      (color: HSVWColor) => {
        if (!isValidHSVWColorPreset(color)) {
          return
        }
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

    const _handleRelease = useCallback(() => {
      isDraggingHueRef.current = false
      isDraggingBrightnessRef.current = false
      isDraggingSaturationRef.current = false
      isDraggingWhiteLevelRef.current = false
    }, [])

    const _switchToRGBWMode = useCallback(() => {
      if (validModes & COLOR_PICKER_MODE_BITMASK.RGBW) {
        setLocalMode(SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL)
        setLocalColorPresets(rgbwColorPresets)
        onModeChange?.(SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL)
      } else {
        setLocalMode(SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL)
        setLocalColorPresets(rgbColorPresets)
        onModeChange?.(SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL)
      }
    }, [onModeChange, rgbColorPresets, rgbwColorPresets, validModes])

    const _switchToCCTMode = useCallback(() => {
      if (validModes & COLOR_PICKER_MODE_BITMASK.CCT) {
        setLocalMode(SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL)
        setLocalColorPresets(cctColorPresets)
        onModeChange?.(SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL)
      }
    }, [cctColorPresets, onModeChange, validModes])

    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, containerHeight] = useSize(containerRef)
    const [useHorizontalLayout, setUseHorizontalLayout] = useState(false)
    const [useHorizontalFill, setUseHorizontalFill] = useState(false)
    const [squareSize, setSquareSize] = useState(0)

    useLayoutEffect(() => {
      const containerRatio = containerWidth / containerHeight
      if (containerRatio >= 1) {
        setUseHorizontalLayout(true)
        setUseHorizontalFill(containerRatio < 2 / 1)
        setSquareSize(containerRatio >= 2 ? containerHeight : containerWidth / 2)
      } else {
        setUseHorizontalLayout(false)
        setUseHorizontalFill(containerRatio < 1 / 2)
        setSquareSize(containerRatio <= 0.5 ? containerWidth : containerHeight / 2)
      }
    }, [containerWidth, containerHeight])

    const [isEditingPresets, setIsEditingPresets] = useState(false)

    const _toggleIsEdittingPresets = useCallback(() => {
      setIsEditingPresets(!isEditingPresets)
    }, [isEditingPresets])

    const _handleColorPresetClicked = useCallback(
      (index: number, color: HSVWColor) => {
        var notifyParent = false
        var newPresets = [...localColorPresets] as HSVWColorPresets
        if (isEditingPresets) {
          if (isValidHSVWColorPreset(color)) {
            // Remove color
            setHSVWColorPreset(newPresets, emptyHSVWColor, index)
            notifyParent = true
          }
        } else {
          if (isValidHSVWColorPreset(color)) {
            // Change color
            updateColorImmediately(color)
          } else {
            // Add color
            newPresets = [...localColorPresets] as HSVWColorPresets
            setHSVWColorPreset(newPresets, localColor, index)
            notifyParent = true
          }
        }
        if (notifyParent) {
          if (mode === SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL) {
            onRGBColorPresetsChange?.(newPresets)
          }
          if (mode === SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL) {
            onRGBWColorPresetsChange?.(newPresets)
          }
          if (mode === SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL) {
            onCCTColorPresetsChange?.(newPresets)
          }
        }
      },
      [
        isEditingPresets,
        localColor,
        localColorPresets,
        mode,
        onCCTColorPresetsChange,
        onRGBColorPresetsChange,
        onRGBWColorPresetsChange,
        updateColorImmediately,
      ],
    )

    return (
      <div ref={containerRef} className={classNames(className, "border-2 border-blue-500")}>
        <div
          className={classNames("grid border-2 border-green-500", {
            "h-full": !useHorizontalFill,
            "w-full": useHorizontalFill,
          })}
          style={{
            gridTemplateColumns: useHorizontalLayout ? `${squareSize}px ${squareSize}px` : `${squareSize}px`,
            gridTemplateRows: useHorizontalLayout ? `${squareSize}px` : `${squareSize}px ${squareSize}px`,
          }}
        >
          <div
            className={classNames("border-2 border-red-500 text-left", { "": useHorizontalLayout })}
            style={{
              width: squareSize,
              height: squareSize,
            }}
          >
            AAA
          </div>
          <div
            className={classNames("border-2 border-red-500 text-right", { "": useHorizontalLayout })}
            style={{
              width: squareSize,
              height: squareSize,
            }}
          >
            BBB
          </div>
        </div>
      </div>
    )
  },
)

function _generateGradientArc(
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

function _generateGradientRing(
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

function _generateBrigthtnessIcon(cX: number, cY: number, w: number, h: number, fill: string) {
  // Adopted by copy/pasting sunny.png below
  // Calculate scale to match requested size from original 17x17
  const scaleX = w / 17
  const scaleY = h / 17

  // Center the icon at (cX, cY) accounting for the scaling
  // Since the original viewBox is 0 0 17 17, we need to offset by half the original size
  const translateX = cX - (17 * scaleX) / 2
  const translateY = cY - (17 * scaleY) / 2
  return (
    <>
      {/* <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
      <g transform={`translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`}>
        <path
          d="M8.2205 3.96057C5.8284 3.96057 3.88203 5.94649 3.88203 8.38719C3.88203 10.8279 5.8284 12.8138 8.2205 12.8138C10.6126 12.8138 12.559 10.8279 12.559 8.38719C12.559 5.94649 10.6126 3.96057 8.2205 3.96057ZM8.2205 11.5713C6.49973 11.5713 5.09985 10.1429 5.09985 8.38719C5.09985 6.63208 6.49973 5.20313 8.2205 5.20313C9.94128 5.20313 11.3412 6.63208 11.3412 8.38719C11.3412 10.1429 9.94128 11.5713 8.2205 11.5713Z"
          fill={`${fill}`}
        />
        <path
          d="M8.22028 3.05453C8.5564 3.05453 8.82919 2.7762 8.82919 2.43325V0.621282C8.82919 0.278335 8.5564 0 8.22028 0C7.88386 0 7.61137 0.278335 7.61137 0.621282V2.43325C7.61137 2.77651 7.88386 3.05453 8.22028 3.05453Z"
          fill={`${fill}`}
        />
        <path
          d="M8.22028 13.72C7.88386 13.72 7.61137 13.9983 7.61137 14.3413V16.1535C7.61137 16.4965 7.88386 16.7748 8.22028 16.7748C8.5564 16.7748 8.82919 16.4965 8.82919 16.1535V14.3413C8.82919 13.9986 8.5564 13.72 8.22028 13.72Z"
          fill={`${fill}`}
        />
        <path
          d="M15.8325 7.76611H14.0566C13.7205 7.76611 13.4477 8.04414 13.4477 8.38739C13.4477 8.73034 13.7205 9.00867 14.0566 9.00867H15.8325C16.1686 9.00867 16.4414 8.73034 16.4414 8.38739C16.4414 8.04414 16.1686 7.76611 15.8325 7.76611Z"
          fill={`${fill}`}
        />
        <path
          d="M2.99401 8.38739C2.99401 8.04414 2.72152 7.76611 2.3851 7.76611H0.60891C0.272792 7.76611 0 8.04414 0 8.38739C0 8.73034 0.272792 9.00867 0.60891 9.00867H2.3851C2.72152 9.00867 2.99401 8.73034 2.99401 8.38739Z"
          fill={`${fill}`}
        />
        <path
          d="M12.7771 4.61673L14.0327 3.33534C14.2705 3.09273 14.2702 2.69915 14.0327 2.45685C13.7949 2.21393 13.4095 2.21424 13.1717 2.45685L11.9161 3.73793C11.6783 3.98054 11.678 4.37381 11.9161 4.61673C12.1536 4.85934 12.5393 4.85934 12.7771 4.61673Z"
          fill={`${fill}`}
        />
        <path
          d="M3.6633 12.158L2.40742 13.4394C2.16995 13.682 2.16934 14.0753 2.40742 14.3179C2.6449 14.5605 3.03095 14.5605 3.26842 14.3179L4.5243 13.0371C4.76208 12.7945 4.76178 12.4006 4.5243 12.158C4.28652 11.9151 3.90108 11.9157 3.6633 12.158Z"
          fill={`${fill}`}
        />
        <path
          d="M12.7779 12.1589C12.5401 11.9163 12.1547 11.9163 11.9166 12.1589C11.6791 12.4009 11.6791 12.7948 11.9166 13.0374L13.1725 14.3181C13.4102 14.5608 13.796 14.5608 14.0335 14.3181C14.2715 14.0755 14.2712 13.6823 14.0335 13.4397L12.7779 12.1589Z"
          fill={`${fill}`}
        />
        <path
          d="M3.66307 4.61645C3.90085 4.85906 4.2866 4.85875 4.52407 4.61645C4.76216 4.37353 4.76216 3.98057 4.52407 3.73765L3.26819 2.45626C3.03072 2.21396 2.64497 2.21364 2.40719 2.45626C2.16972 2.69856 2.16972 3.09245 2.40719 3.33475L3.66307 4.61645Z"
          fill={`${fill}`}
        />
        {/* </svg> */}
      </g>
    </>
  )
}

export default ColorPicker
