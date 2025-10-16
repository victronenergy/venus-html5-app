import React, { useCallback, useMemo, useRef } from "react"
import {
  getSwitchableOutputNameForDisplay,
  SwitchableOutputId,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import { getDecimalPlaces, getValueOrDefault, useValueFormatter } from "./helpers"

interface UnrangedSetpointOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const UnrangedSetpointOutput = observer((props: UnrangedSetpointOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)
  const outputName = getSwitchableOutputNameForDisplay(switchableOutput, props.parentDeviceName)

  const min = getValueOrDefault(switchableOutput.dimmingMin, 0)
  const max = getValueOrDefault(switchableOutput.dimmingMax, 100)
  const step = parseFloat(getValueOrDefault(switchableOutput.stepSize, 1).toPrecision(6))
  const decimals = getDecimalPlaces(step)
  const value = getValueOrDefault(switchableOutput.dimming, 1)
  const unit = getValueOrDefault(switchableOutput.unit, "")

  const formatValueAndUnit = useValueFormatter({ decimals })

  const repeatTimerRef = useRef<number | null>(null)
  const initialDelayTimerRef = useRef<number | null>(null)
  const updateValueRef = useRef<(delta: number) => void>()

  const minusEnabled = useMemo(() => {
    return value - step >= min
  }, [value, step, min])

  const plusEnabled = useMemo(() => {
    return value + step <= max
  }, [value, step, max])

  const updateValue = useCallback(
    (delta: number) => {
      const newValue = value + delta
      if (newValue >= min && newValue <= max) {
        switchableOutput.updateDimming(newValue)
      }
    },
    [value, min, max, switchableOutput],
  )
  updateValueRef.current = updateValue

  const clearTimers = useCallback(() => {
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current)
      repeatTimerRef.current = null
    }
    if (initialDelayTimerRef.current) {
      clearTimeout(initialDelayTimerRef.current)
      initialDelayTimerRef.current = null
    }
  }, [])

  const startAutorepeat = useCallback(
    (delta: number) => {
      clearTimers()

      // Immediate update
      updateValueRef.current!!(delta)

      // Wait 300ms before starting autorepeat
      initialDelayTimerRef.current = window.setTimeout(() => {
        // Start 100ms autorepeat
        repeatTimerRef.current = window.setInterval(() => {
          updateValueRef.current!!(delta)
        }, 100)
      }, 300)
    },
    [clearTimers],
  )

  const handleMouseDown = useCallback(
    (delta: number) => {
      startAutorepeat(delta)
    },
    [startAutorepeat],
  )

  const handleMouseUp = useCallback(() => {
    clearTimers()
  }, [clearTimers])

  // cleanup
  React.useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [clearTimers])

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{outputName}</div>
      {/* Container */}
      <div className="flex h-px-44">
        {/* Minus */}
        <div
          className={classnames("h-full flex items-center px-4 rounded-l-md border-2", {
            "bg-surface-victronGray border-content-victronGray": !minusEnabled,
            "bg-surface-victronBlue border-content-victronBlue ": minusEnabled,
          })}
          onMouseDown={() => minusEnabled && handleMouseDown(-step)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => minusEnabled && handleMouseDown(-step)}
          onTouchEnd={handleMouseUp}
        >
          <button className="h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem] text-content-primary select-none">
            -
          </button>
        </div>
        {/* Value */}
        <div className="flex-1 h-full flex items-center justify-center text-sm min-h-[2.375rem] whitespace-nowrap border-t-2 border-b-2 border-content-victronBlue">
          {formatValueAndUnit(value, unit)}
        </div>
        {/* Plus */}
        <div
          className={classnames("h-full flex items-center px-4 rounded-r-md border-2", {
            "bg-surface-victronGray border-content-victronGray": !plusEnabled,
            "bg-surface-victronBlue border-content-victronBlue": plusEnabled,
          })}
          onMouseDown={() => plusEnabled && handleMouseDown(+step)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => plusEnabled && handleMouseDown(+step)}
          onTouchEnd={handleMouseUp}
        >
          <button className="h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem] text-content-primary select-none">
            +
          </button>
        </div>
      </div>
    </div>
  )
})

export default UnrangedSetpointOutput
