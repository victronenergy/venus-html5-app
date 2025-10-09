import React, { useMemo } from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

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

  const min = switchableOutput.dimmingMin || 0
  const max = switchableOutput.dimmingMax || 100
  const step = switchableOutput.stepSize || 1
  const value = switchableOutput.dimming || 1
  const unit = switchableOutput.unit

  const minusEnabled = useMemo(() => {
    return value - step > min
  }, [value, step, min])

  const plusEnabled = useMemo(() => {
    return value + step < max
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
      {/* Border */}
      <div className="h-px-44 rounded-md border-2 border-content-victronBlue">
        {/* Container */}
        <div className="flex h-full">
          <div
            className={classnames("h-full flex items-center px-4", {
              "bg-content-victronBlue50": !minusEnabled,
              "bg-surface-victronBlue": minusEnabled,
            })}
          >
            <button
              className="h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem] text-content-primary"
              onClick={handleClickMinus}
            >
              -
            </button>
          </div>
          <div className="flex-1 h-full flex items-center justify-center text-sm min-h-[2.375rem] whitespace-nowrap">
            {value}&nbsp;
            {unit}
          </div>
          <div
            className={classnames("h-full flex items-center px-4", {
              "bg-content-victronBlue50": !plusEnabled,
              "bg-surface-victronBlue": plusEnabled,
            })}
          >
            <button
              className="h-px-44 px-4 py-1.5 cursor-pointer text-sm min-h-[2.375rem] text-content-primary"
              onClick={handleClickPlus}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default UnrangedSetpointOutput
