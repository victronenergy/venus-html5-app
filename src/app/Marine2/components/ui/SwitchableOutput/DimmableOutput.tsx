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

interface DimmableOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const DimmableOutput = observer((props: DimmableOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const ratio = getValueOrDefault(switchableOutput.dimming, 0)
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

  const updateDimmingValueImmediately = useCallback(
    (percentage: number) => {
      switchableOutput.updateDimming(percentage)
    },
    [switchableOutput],
  )

  const updateDimmingValueDebounced = useCallback(
    (percentage: number) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
        updateTimeoutRef.current = null
      }

      updateTimeoutRef.current = setTimeout(() => {
        switchableOutput.updateDimming(percentage)
      }, 50)
    },
    [switchableOutput],
  )

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  const handlePress = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const percentageX = calculateNewValue(clientX, e.currentTarget)

    updateDimmingValueImmediately(percentageX)
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const newValue = calculateNewValue(clientX, e.currentTarget)

    updateDimmingValueDebounced(newValue)
  }

  const handleRelease = () => {
    setIsDragging(false)

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
      updateTimeoutRef.current = null
    }
  }

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
      {/* Border */}
      <div
        className={classnames("h-px-44 rounded-md border-2", {
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
    </div>
  )
})

export default DimmableOutput
