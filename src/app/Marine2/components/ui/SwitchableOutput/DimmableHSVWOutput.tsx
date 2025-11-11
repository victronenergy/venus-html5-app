import React, { useCallback, useEffect, useRef, useState } from "react"
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
import CloseIcon from "../../../images/icons/close.svg"
import FadedText from "../FadedText"
import ColorPicker from "../ColorPicker/ColorPicker"

interface DimmableHSVWOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

// TODO: Add prop for color mode selection
// TODO: Add conversion to display selected color in color square
// TODO: Open/Close color selection popup when square is tapped
// TODO: Send changed values from color selection popup to MQTT
// TODO: Implement popup: center wheel, brightness, saturation, white level

const DimmableHSVWOutput = observer((props: DimmableHSVWOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const [color, setColor] = useState<HSVWColor>(arrayToHSVW([0, 0, 0, 0, 0]))

  useEffect(() => {
    setColor(arrayToHSVW(getValueOrDefault(switchableOutput.lightControls, [0, 0, 0, 0, 0]) as HSVWColorArray))
  }, [switchableOutput.lightControls])

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

  const isInCCTMode = switchableOutput.type === SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL
  const [isColorWheelOpen, setIsColorWheelOpen] = useState(false)

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
        {/* Color Square */}
        <div
          className="w-px-44 h-px-44 rounded-md ml-2"
          style={{
            backgroundColor: isInCCTMode
              ? colorTemperatureToDisplayColor(color.colorTemperature)
              : colorHueToDisplayColor(color.hue, color.saturation, 100),
          }}
          onClick={() => setIsColorWheelOpen(true)}
        />
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
          <Modal.Body variant="popUp" className="h-full bg-surface-primary flex flex-col">
            {/* Title with close button */}
            <div className="flex">
              <FadedText text={outputName} className="flex-1" />
              <CloseIcon
                className="w-5 text-content-victronBlue cursor-pointer outline-none"
                alt="Close"
                onClick={() => setIsColorWheelOpen(false)}
              />
            </div>
            {/* Controls */}
            <div className="relative flex-1 w-full mt-2 mb-2">
              <div className="absolute inset-0 border-2 border-blue-500">
                <ColorPicker
                  className="h-full w-full"
                  color={color}
                  onColorChange={(color) => {
                    setColor(color)
                    switchableOutput.updateLightControls(hsvwToArray(color))
                  }}
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
