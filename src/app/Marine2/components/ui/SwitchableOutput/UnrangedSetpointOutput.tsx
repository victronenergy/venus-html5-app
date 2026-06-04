import React, { useCallback, useMemo, useRef } from "react"
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

interface UnrangedSetpointOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const UnrangedSetpointOutput = observer((props: UnrangedSetpointOutputProps) => {
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
  const formatValueAndUnit = useValueFormatter({ decimals })

  const repeatTimerRef = useRef<number | null>(null)
  const initialDelayTimerRef = useRef<number | null>(null)
  const updateValueRef = useRef<(delta: number) => void>(null)

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
    <div className={classnames("mt-4 select-none", props.className)}>
      <div className="flex">
        <div className="flex-1">{outputName}</div>
        {statusPill && (
          <div className="flex py-1">
            <StatusPill label={statusPill.label} variant={statusPill.variant} />
          </div>
        )}
      </div>
      {/* Container */}
      <div className={classnames("flex h-px-44", { "pointer-events-none": disabled })}>
        {/* Minus */}
        <div
          className={classnames("h-full flex items-center px-4 rounded-l-md border-2", {
            "bg-surface-victronGray border-content-victronGray": disabled || !minusEnabled,
            "bg-surface-victronBlue border-content-victronBlue ": !disabled && minusEnabled,
          })}
          onMouseDown={() => minusEnabled && handleMouseDown(-step)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => minusEnabled && handleMouseDown(-step)}
          onTouchEnd={handleMouseUp}
        >
          <button
            className={classnames(
              "h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem]",
              disabled ? "text-content-victronGray" : "text-content-primary",
            )}
          >
            -
          </button>
        </div>
        {/* Value */}
        <div
          className={classnames(
            "flex-1 h-full flex items-center justify-center text-sm min-h-[2.375rem] whitespace-nowrap border-t-2 border-b-2",
            disabled
              ? "border-content-victronGray bg-surface-victronGray text-content-victronGray"
              : "border-content-victronBlue",
          )}
        >
          {formatValueAndUnit(value, unit)}
        </div>
        {/* Plus */}
        <div
          className={classnames("h-full flex items-center px-4 rounded-r-md border-2", {
            "bg-surface-victronGray border-content-victronGray": disabled || !plusEnabled,
            "bg-surface-victronBlue border-content-victronBlue": !disabled && plusEnabled,
          })}
          onMouseDown={() => plusEnabled && handleMouseDown(+step)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => plusEnabled && handleMouseDown(+step)}
          onTouchEnd={handleMouseUp}
        >
          <button
            className={classnames(
              "h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem]",
              disabled ? "text-content-victronGray" : "text-content-primary",
            )}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
})

export default UnrangedSetpointOutput
