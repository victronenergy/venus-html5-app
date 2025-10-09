import React, { useCallback, useRef, useState } from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

interface DimmableOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const DimmableOutput = observer((props: DimmableOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const ratio = switchableOutput.dimming || 0

  const handleClickOnOff = () => {
    switchableOutput.updateState(switchableOutput.state === 1 ? 0 : 1)
  }

  const [isDragging, setIsDragging] = useState(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  const calculatePercentage = (clientX: number, element: HTMLDivElement): number => {
    const rect = element.getBoundingClientRect()
    const relativeX = clientX - rect.left
    const percentageX = Math.round(Math.max(0, Math.min(100, (relativeX / rect.width) * 100)))
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
    const percentageX = calculatePercentage(clientX, e.currentTarget)

    updateDimmingValueImmediately(percentageX)
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const percentageX = calculatePercentage(clientX, e.currentTarget)

    updateDimmingValueDebounced(percentageX)
  }

  const handleRelease = () => {
    setIsDragging(false)

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
      updateTimeoutRef.current = undefined
    }
  }

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      {/* Border */}
      <div className="h-px-44 rounded-md bg-surface-victronBlue border-2 border-content-victronBlue">
        {/* Container */}
        <div className="h-full rounded-sm flex overflow-hidden">
          {/* On/Off Background */}
          <div
            className={classnames("h-full flex items-center", {
              "bg-content-victronBlue50": variant === "off",
              "bg-content-victronBlue": variant === "on",
            })}
          >
            {/* On/Off Button */}
            <button
              className={classnames(
                "h-full px-2 whitespace-nowrap cursor-pointer text-sm min-h-[2.375rem] min-w-[3rem]",
                {
                  "text-content-white": variant === "off",
                  "text-content-onVictronBlue": variant === "on",
                },
              )}
              onClick={handleClickOnOff}
            >
              {variant === "on" ? "On" : "Off"}
            </button>
            {/* Separator */}
            <div className="w-px-2 h-[80%] rounded-sm bg-content-lightGray"></div>
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
                  "bg-content-victronBlue": variant === "on",
                  "bg-content-victronBlue50": variant === "off",
                })}
                style={{ width: `${ratio}%` }}
              />
              {/* Handle Background */}
              <div
                className={classnames("h-full flex items-center px-1", {
                  "bg-content-victronBlue": variant === "on",
                  "bg-content-victronBlue50": variant === "off",
                })}
              >
                {/* Handle */}
                <div
                  className={classnames("w-px-4 h-[70%] rounded-sm", {
                    "bg-content-white": variant === "off",
                    "bg-content-onVictronBlue": variant === "on",
                  })}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default DimmableOutput
