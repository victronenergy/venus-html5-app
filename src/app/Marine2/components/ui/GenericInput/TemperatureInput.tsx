import React from "react"
import {
  getSwitchingPaneItemNameForDisplay,
  SwitchableOutputTree,
  SwitchingDeviceInstanceId,
  GenericInputId,
  useGenericInput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import StatusPill from "../StatusPill"
import { getValueOrDefault, useValueFormatter } from "../SwitchableOutput/helpers"
import { getStatusLabel } from "./helpers"

interface TemperatureInputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  inputId: GenericInputId
  parentDeviceName: string
  className?: string
}

const TemperatureInput = observer((props: TemperatureInputProps) => {
  const genericInput = useGenericInput(props.tree, props.deviceId, props.inputId)
  const inputName = getSwitchingPaneItemNameForDisplay(genericInput, props.parentDeviceName)

  const unit = "/Temperature"
  const decimals = getValueOrDefault(genericInput.decimals, 0)
  const formatValueAndUnit = useValueFormatter({ decimals })

  const value = genericInput.value
  const min = getValueOrDefault(genericInput.rangeMin, 0)
  const max = getValueOrDefault(genericInput.rangeMax, 100)
  const ratio =
    value !== undefined && value !== null && max !== min
      ? Math.max(0, Math.min(100, Math.round(((value - min) / (max - min)) * 100)))
      : 0
  const formattedValue = value !== undefined && value !== null ? formatValueAndUnit(value, unit, false) : "--"
  const formattedUnit =
    value !== undefined && value !== null ? formatValueAndUnit(value, unit).slice(formattedValue.length) : ""
  const statusLabel = getStatusLabel(genericInput.status)

  return (
    <div className={classnames("mt-4", props.className)}>
      <div className="flex">
        <div className="flex-1">{inputName}</div>
        {statusLabel && (
          <div className="flex py-1">
            <StatusPill label={statusLabel} variant="red" />
          </div>
        )}
      </div>
      <div className="h-px-44 rounded-md bg-surface-tertiary flex items-center px-4">
        <div className="flex-1 h-px-8 rounded-full bg-gradient-to-r from-gradient-victronBlue to-gradient-victronRed overflow-hidden relative mr-4">
          <div
            className="absolute h-full flex items-center"
            style={{ left: `${ratio}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-px-8 h-[150%] rounded-full bg-surface-primary flex items-center justify-center">
              <div className="w-px-4 h-full rounded-full bg-content-primary" />
            </div>
          </div>
        </div>
        <span className="text-base text-content-primary">{formattedValue}</span>
        <span className="text-base text-content-tertiary">{formattedUnit}</span>
      </div>
    </div>
  )
})

export default TemperatureInput
