import React, { useCallback, useMemo } from "react"
import {
  SwitchableOutputId,
  SwitchingDeviceInstanceId,
  useAppStore,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import { temperatureValueFor } from "app/Marine2/utils/formatters/temperature/temperature-value-for"

interface UnrangedSetpointOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

// TODO: add prpoper color for disabled state on left/right
// TODO: handle special case of Unit to format properly /T /S /V

const UnrangedSetpointOutput = observer((props: UnrangedSetpointOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const { temperatureUnitToHumanReadable, temperatureUnit } = useAppStore()

  const min = switchableOutput.dimmingMin || 0
  const max = switchableOutput.dimmingMax || 100
  const step = switchableOutput.stepSize || 1
  const stepDecimals = (step.toString().split(".")[1] || "").length
  const value = switchableOutput.dimming || 1
  const unit = switchableOutput.unit

  const formattedValueAndUnit = useCallback(
    (value: number, unit: string | "/S" | "/T" | "/V"): string => {
      if (unit === "/S") {
        return `TODO: ${value} in units of speed`
      } else if (unit === "/V") {
        return `TODO: ${value} in units of volume`
      } else if (unit === "/T") {
        return `${temperatureValueFor(value, temperatureUnit).toFixed(stepDecimals)}${temperatureUnitToHumanReadable}`
      }
      return `${value.toFixed(stepDecimals)}${unit}`
    },
    [stepDecimals, temperatureUnit, temperatureUnitToHumanReadable],
  )

  const minusEnabled = useMemo(() => {
    return value - step >= min
  }, [value, step, min])

  const plusEnabled = useMemo(() => {
    return value + step <= max
  }, [value, step, max])

  const handleClickPlus = () => {
    const newValue = value + step
    if (newValue > max) {
      return
    }
    switchableOutput.updateDimming(newValue)
  }

  const handleClickMinus = () => {
    const newValue = value - step
    if (newValue < min) {
      return
    }
    switchableOutput.updateDimming(newValue)
  }

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      {/* Container */}
      <div className="flex h-px-44">
        {/* Minus */}
        <div
          className={classnames("h-full flex items-center px-4 rounded-l-md border-2", {
            "bg-surface-victronGray border-content-victronGray": !minusEnabled,
            "bg-surface-victronBlue border-content-victronBlue ": minusEnabled,
          })}
          onClick={handleClickMinus}
        >
          <button
            className="h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem] text-content-primary select-none"
            onClick={handleClickMinus}
          >
            -
          </button>
        </div>
        {/* Value */}
        <div className="flex-1 h-full flex items-center justify-center text-sm min-h-[2.375rem] whitespace-nowrap border-t-2 border-b-2 border-content-victronBlue">
          {formattedValueAndUnit(value, unit)}
        </div>
        {/* Plus */}
        <div
          className={classnames("h-full flex items-center px-4 rounded-r-md border-2", {
            "bg-surface-victronGray border-content-victronGray": !plusEnabled,
            "bg-surface-victronBlue border-content-victronBlue": plusEnabled,
          })}
          onClick={handleClickPlus}
        >
          <button
            className="h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem] text-content-primary select-none"
            onClick={handleClickPlus}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
})

export default UnrangedSetpointOutput
