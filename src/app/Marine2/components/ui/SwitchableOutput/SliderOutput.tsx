import React, { useCallback, useRef, useState } from "react"
import {
  getSwitchingPaneItemNameForDisplay,
  SwitchableOutputId,
  SwitchableOutputTree,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import StatusPill from "../StatusPill"
import { getDecimalPlaces, getValueOrDefault, useValueFormatter } from "./helpers"
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"

interface SliderOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const SliderOutput = observer((props: SliderOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const min = getValueOrDefault(switchableOutput.dimmingMin, 0)
  const max = getValueOrDefault(switchableOutput.dimmingMax, 100)
  const step = parseFloat(getValueOrDefault(switchableOutput.stepSize, 1).toPrecision(6))
  const decimals = getValueOrDefault(switchableOutput.decimals, getDecimalPlaces(step))
  const value = getValueOrDefault(switchableOutput.dimming, 1)
  const unit = getValueOrDefault(switchableOutput.unit, "")
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const ratio = Math.round(((value - min) / (max - min)) * 100)

  const [isDragging, setIsDragging] = useState(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  const formatValueAndUnit = useValueFormatter({ decimals })

  const calculateNewValue = (
    clientX: number,
    element: HTMLDivElement,
    min: number,
    max: number,
    step: number,
  ): number => {
    const rect = element.getBoundingClientRect()
    const relativeX = clientX - Math.ceil(rect.left)
    const width = Math.floor(rect.right) - Math.ceil(rect.left)
    const percentageX = Math.max(0, Math.min(100, (relativeX / width) * 100))
    const newValue = (percentageX / 100) * (max - min)
    return min + Math.round(newValue / step) * step
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
        updateTimeoutRef.current = undefined
      }

      updateTimeoutRef.current = setTimeout(() => {
        switchableOutput.updateDimming(percentage)
      }, 10)
    },
    [switchableOutput],
  )

  const handlePress = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const newValue = calculateNewValue(clientX, e.currentTarget, min, max, step)

    updateDimmingValueImmediately(newValue)
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const newValue = calculateNewValue(clientX, e.currentTarget, min, max, step)

    updateDimmingValueDebounced(newValue)
  }

  const handleRelease = () => {
    setIsDragging(false)

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
      updateTimeoutRef.current = undefined
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
          <div className="flex text-content-secondary">{formatValueAndUnit(value, unit)}</div>
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
          {/* Slider Container */}
          <div
            className="flex-1"
            onMouseDown={handlePress}
            onMouseMove={handleMove}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            onTouchStart={handlePress}
            onTouchMove={handleMove}
            onTouchEnd={handleRelease}
            onTouchCancel={handleRelease}
          >
            {/* Slider */}
            <div className="flex h-full">
              {/* Percent area */}
              <div
                className={classnames(
                  "h-full transition-all duration-100 ease-out",
                  disabled ? "bg-content-victronGray50" : "bg-content-victronBlue",
                )}
                style={{ width: `${ratio}%` }}
              />
              {/* Handle Background */}
              <div
                className={classnames(
                  "h-full flex items-center px-1",
                  disabled ? "bg-content-victronGray50" : "bg-content-victronBlue",
                )}
              >
                {/* Handle */}
                <div className="w-px-4 h-[70%] rounded-sm bg-content-onVictronBlue"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default SliderOutput
