import React, { useCallback, useRef, useState } from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

interface SliderOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

// TODO: handle special case of Unit to format properly /T /S /V

const SliderOutput = observer((props: SliderOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const min = switchableOutput.dimmingMin || 0
  const max = switchableOutput.dimmingMax || 100
  const step = switchableOutput.stepSize || 1
  const value = switchableOutput.dimming || 0
  const unit = switchableOutput.unit
  const ratio = Math.round((value / (max - min)) * 100)

  const [isDragging, setIsDragging] = useState(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  const calculateNewValue = (
    clientX: number,
    element: HTMLDivElement,
    min: number,
    max: number,
    step: number,
  ): number => {
    const rect = element.getBoundingClientRect()
    const relativeX = clientX - rect.left
    const percentageX = Math.max(0, Math.min(100, (relativeX / rect.width) * 100))
    const newValue = min + percentageX / (max - min)
    return Math.round(newValue / step) * step
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
    <div className={classnames("mt-4", props.className)}>
      <div className="flex">
        <div className="flex-1">{switchableOutput.customName || switchableOutput.name}</div>
        <div className="flex py-1">
          {value}&nbsp;
          {unit}
        </div>
      </div>
      {/* Border */}
      <div className="h-px-44 rounded-md bg-surface-victronBlue border-2 border-content-victronBlue">
        {/* Container */}
        <div className="h-full rounded-sm flex overflow-hidden">
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
                className="h-full bg-content-victronBlue transition-all duration-100 ease-out"
                style={{ width: `${ratio}%` }}
              />
              {/* Handle Background */}
              <div className="h-full flex items-center px-1 bg-content-victronBlue">
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
