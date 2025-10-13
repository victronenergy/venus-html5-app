import React, { useCallback, useRef, useState } from "react"
import {
  SwitchableOutputId,
  SwitchingDeviceInstanceId,
  useAppStore,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import { temperatureValueFor } from "app/Marine2/utils/formatters/temperature/temperature-value-for"
import { translate } from "react-i18nify"

interface TemperatureSetpointOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const TemperatureSetpointOutput = observer((props: TemperatureSetpointOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const { temperatureUnitToHumanReadable, temperatureUnit } = useAppStore()

  const min = switchableOutput.dimmingMin || 0
  const max = switchableOutput.dimmingMax || 100
  const step = switchableOutput.stepSize || 1
  const stepDecimals = (step.toString().split(".")[1] || "").length
  const setpoint = switchableOutput.dimming || 0
  const measurement = switchableOutput.measurement || setpoint
  const ratio = Math.round(((setpoint - min) / (max - min)) * 100)
  const tick = Math.round((setpoint - min) / step)

  const [isDragging, setIsDragging] = useState(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  const formattedValue = useCallback(
    (measurement: number, includeUnit: boolean): string => {
      return `${temperatureValueFor(measurement, temperatureUnit).toFixed(stepDecimals)}${includeUnit ? temperatureUnitToHumanReadable : "°"}`
    },
    [stepDecimals, temperatureUnit, temperatureUnitToHumanReadable],
  )

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
    <div className={classnames("mt-4", props.className)}>
      <div className="flex">
        <div className="flex-1">{switchableOutput.customName || switchableOutput.name}</div>
        {setpoint !== measurement && (
          <div className="flex py-1 text-content-victronGray">{formattedValue(setpoint, false)}/</div>
        )}
        <div className="flex py-1">{formattedValue(measurement, true)}</div>
      </div>
      {/* Border */}
      <div className="h-px-44 rounded-md bg-content-victronBlue50 border-2 border-content-victronBlue bg-gradient-to-r from-content-victronBlue to-content-victronRed">
        {/* Container */}
        <div className="h-full rounded-sm flex overflow-visible">
          <div className="h-full flex items-center pl-2 pr-4 text-content-white">{translate("switches.min")}</div>
          {/* Slider Container */}
          <div
            className="flex-1 relative"
            onMouseDown={handlePress}
            onMouseMove={handleMove}
            onMouseUp={handleRelease}
            onTouchStart={handlePress}
            onTouchMove={handleMove}
            onTouchEnd={handleRelease}
            onTouchCancel={handleRelease}
          >
            {/* Slider */}
            <div className="absolute inset-0 flex h-full">
              {/* Percent area */}
              <div className="h-full transition-all duration-100 ease-out" style={{ width: `${ratio}%` }} />
            </div>
            {/* Marks */}
            <div className="absolute inset-0 flex justify-between items-center">
              {[...Array(1 + Math.round(max - min) / step)].map((_, i) => (
                <div
                  key={`mark_${i}`}
                  className={classnames("relative w-px-4 rounded-sm bg-content-white", {
                    "h-px-4": i !== tick,
                    "h-[70%]": i === tick,
                  })}
                >
                  {i === tick && isDragging && (
                    <>
                      <div
                        key={`arrow`}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-content-victronBlue pointer-events-none"
                      />
                      <div
                        key={`popup`}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 px-3 rounded text-xxl bg-content-victronBlue text-content-onVictronBlue pointer-events-none select-none"
                      >
                        {formattedValue(measurement, false)}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>{" "}
          </div>
          <div className="h-full flex items-center pl-4 pr-2 text-content-white">{translate("switches.max")}</div>
        </div>
      </div>
    </div>
  )
})

export default TemperatureSetpointOutput
