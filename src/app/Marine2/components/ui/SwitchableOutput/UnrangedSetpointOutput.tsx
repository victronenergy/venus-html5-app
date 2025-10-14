import React, { useMemo } from "react"
import {
  getSwitchableOutputNameForDisplay,
  SwitchableOutputId,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import { getValueOrDefault, useValueFormatter } from "./helpers"

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
  const step = getValueOrDefault(switchableOutput.stepSize, 1)
  const decimals = (step.toString().split(".")[1] || "").length
  const value = getValueOrDefault(switchableOutput.dimming, 1)
  const unit = getValueOrDefault(switchableOutput.unit, "")

  const formatValueAndUnit = useValueFormatter({ decimals })

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
      <div>{outputName}</div>
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
          {formatValueAndUnit(value, unit)}
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
