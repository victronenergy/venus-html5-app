import React, { useCallback, useMemo, useRef, useState } from "react"
import {
  getSwitchingPaneItemNameForDisplay,
  SwitchableOutputId,
  SwitchableOutputTree,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import StatusPill from "../StatusPill"
import { getValueOrDefault, useValueFormatter } from "./helpers"
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"
import {
  arrayToHSVW,
  createPercentage,
  HSVWColor,
  HSVWColorArray,
  hsvwToArray,
} from "@victronenergy/mfd-modules/dist/src/utils/hsvw"
import {
  colorTemperatureToDisplayColor,
  colorHueToDisplayColor,
} from "app/Marine2/utils/helpers/color-conversion-routines"
import { SWITCHABLE_OUTPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import { Modal } from "../Modal"
// import CloseIcon from "../../../images/icons/close.svg"
import FadedText from "../FadedText"
import ColorPicker, { ColorPickerMode, ColorPickerValidModes } from "../ColorPicker/ColorPicker"

interface DimmableHSVWOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const DimmableHSVWOutput = observer((props: DimmableHSVWOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const color = useMemo(
    () => arrayToHSVW(getValueOrDefault(switchableOutput.lightControls, [0, 0, 0, 0, 0]) as HSVWColorArray),
    [switchableOutput.lightControls],
  )

  const ratio = color.brightness
  const formatValueAndUnit = useValueFormatter({ decimals: 0 })

  const handleClickOnOff = () => {
    switchableOutput.updateState(switchableOutput.state === 1 ? 0 : 1)
  }

  const [isDragging, setIsDragging] = useState(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const calculateNewValue = (clientX: number, element: HTMLDivElement): number => {
    const rect = element.getBoundingClientRect()
    const relativeX = clientX - Math.ceil(rect.left)
    const width = Math.floor(rect.right) - Math.ceil(rect.left)
    const percentageX = Math.round(Math.max(0, Math.min(100, (relativeX / width) * 100)))
    return percentageX
  }

  const updateBrightnessValueImmediately = useCallback(
    (percentage: number) => {
      switchableOutput.updateLightControls(hsvwToArray({ ...color, brightness: createPercentage(percentage) }))
    },
    [color, switchableOutput],
  )

  const updateBrightnessValueDebounced = useCallback(
    (percentage: number) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
        updateTimeoutRef.current = null
      }

      updateTimeoutRef.current = setTimeout(() => {
        switchableOutput.updateLightControls(hsvwToArray({ ...color, brightness: createPercentage(percentage) }))
      }, 10)
    },
    [color, switchableOutput],
  )

  const handlePress = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const percentageX = calculateNewValue(clientX, e.currentTarget)

    updateBrightnessValueImmediately(percentageX)
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const newValue = calculateNewValue(clientX, e.currentTarget)

    updateBrightnessValueDebounced(newValue)
  }

  const handleRelease = () => {
    setIsDragging(false)

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
      updateTimeoutRef.current = null
    }
  }

  const handleColorChange = useCallback(
    (color: HSVWColor) => {
      switchableOutput.updateLightControls(hsvwToArray(color))
    },
    [switchableOutput],
  )

  const handleModeChange = useCallback(
    (mode: ColorPickerMode) => {
      switchableOutput.updateType(mode)
    },
    [switchableOutput],
  )

  const [isColorWheelOpen, setIsColorWheelOpen] = useState(false)

  const isInCCTMode = switchableOutput.type === SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL

  return (
    <div className={classnames("mt-4 select-none", props.className)}>
      <div className="flex">
        <div className="flex-1">{outputName}</div>
        {statusPill ? (
          <div className="flex py-1">
            <StatusPill label={statusPill.label} variant={statusPill.variant} />
          </div>
        ) : (
          <div className={classnames("flex", variant === "on" ? "text-content-primary" : "text-content-secondary")}>
            {formatValueAndUnit(ratio, "%")}
          </div>
        )}
      </div>
      <div className="flex">
        {/* Border */}
        <div
          className={classnames("flex-1 h-px-44 rounded-md border-2", {
            "bg-surface-victronGray border-content-victronGray pointer-events-none": disabled,
            "bg-surface-victronBlue border-content-victronBlue": !disabled,
          })}
        >
          {/* Container */}
          <div className="h-full rounded-sm flex overflow-hidden">
            {/* On/Off Background */}
            <div
              className={classnames("h-full flex items-center", {
                "bg-content-victronGray50": disabled,
                "bg-content-victronBlue50": !disabled && variant === "off",
                "bg-content-victronBlue": !disabled && variant === "on",
              })}
            >
              {/* On/Off Button */}
              <button
                className={classnames(
                  "h-full px-2 whitespace-nowrap cursor-pointer text-sm min-h-[2.375rem] min-w-[3rem]",
                  disabled ? "text-content-victronGray" : "text-content-onVictronBlue",
                )}
                onClick={handleClickOnOff}
              >
                {variant === "on" ? translate("switches.on") : translate("switches.off")}
              </button>
              {/* Separator */}
              <div
                className={classnames(
                  "w-px-2 h-[80%] rounded-sm",
                  disabled ? "bg-content-victronGray" : "bg-content-lightBlue",
                )}
              ></div>
            </div>
            {/* Slider Container */}
            <div
              className="flex-1"
              onMouseDown={handlePress}
              onMouseMove={handleMove}
              onMouseUp={handleRelease}
              onTouchStart={handlePress}
              onTouchMove={handleMove}
              onTouchEnd={handleRelease}
              onTouchCancel={handleRelease}
            >
              {/* Slider */}
              <div className="flex h-full">
                {/* Percent area */}
                <div
                  className={classnames("h-full transition-all duration-100 ease-out", {
                    "bg-content-victronGray50": disabled,
                    "bg-content-victronBlue": !disabled && variant === "on",
                    "bg-content-victronBlue50": !disabled && variant === "off",
                  })}
                  style={{ width: `${ratio}%` }}
                />
                {/* Handle Background */}
                <div
                  className={classnames("h-full flex items-center px-1", {
                    "bg-content-victronGray50": disabled,
                    "bg-content-victronBlue": !disabled && variant === "on",
                    "bg-content-victronBlue50": !disabled && variant === "off",
                  })}
                >
                  {/* Handle */}
                  <div className={classnames("w-px-4 h-[70%] rounded-sm", "bg-content-onVictronBlue")}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Border */}
        <div className="w-px-44 h-px-44 ml-2 p-px-2 rounded-md border-2 border-content-victronBlue">
          {/* Color Square */}
          <div
            className="w-full h-full rounded-sm"
            style={{
              backgroundColor: isInCCTMode
                ? colorTemperatureToDisplayColor(color.colorTemperature)
                : colorHueToDisplayColor(color.hue, color.saturation, 100),
            }}
            onClick={() => setIsColorWheelOpen(true)}
          />
        </div>
      </div>
      {/* Color Wheel Popup */}
      <div>
        <Modal.Frame
          open={isColorWheelOpen}
          onClose={() => {
            setIsColorWheelOpen(false)
          }}
          className={classnames("w-4/6 max-w-4/6 h-4/6 max-h-4/6")}
        >
          <Modal.Body variant="popUp" className="h-full bg-surface-primary">
            <div className="h-full flex flex-col">
              {/* Title with close button */}
              <div className="flex shrink-0">
                <FadedText className="flex-1 border-2 border-red-400" text={outputName} />
                {/* TODO: CloseIcon breaks layout on Garmin - broken flex-col implementation */}
                {/* <CloseIcon
                  className="w-5 text-content-victronBlue cursor-pointer outline-none"
                  alt="Close"
                  onClick={() => setIsColorWheelOpen(false)}
                /> */}
              </div>
              {/* Color Mode Label */}
              <div className="flex shrink-0">
                <FadedText
                  className="flex-1 border-2 border-red-400"
                  text={isInCCTMode ? translate("switches.temperature") : translate("switches.color")}
                />
              </div>
              {/* Controls */}
              <div className="flex-1 min-h-0 flex items-center justify-center border-2 border-yellow-500">
                <ColorPicker
                  className="border-2 border-green-500 max-w-full max-h-full"
                  color={color}
                  mode={switchableOutput.type as ColorPickerMode}
                  validModes={switchableOutput.validTypes as ColorPickerValidModes}
                  onColorChange={handleColorChange}
                  onModeChange={handleModeChange}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal.Frame>
      </div>
    </div>
  )
})

export default DimmableHSVWOutput
