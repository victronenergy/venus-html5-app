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
import { getValueOrDefault, useValueFormatter } from "../SwitchableOutput/helpers"
import { defaultLabelForUnit } from "./helpers"

interface ValueNoRangeInputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  inputId: GenericInputId
  parentDeviceName: string
  className?: string
}

const ValueNoRangeInput = observer((props: ValueNoRangeInputProps) => {
  const genericInput = useGenericInput(props.tree, props.deviceId, props.inputId)
  const inputName = getSwitchingPaneItemNameForDisplay(genericInput, props.parentDeviceName)

  const unit = getValueOrDefault(genericInput.unit, "")
  const decimals = getValueOrDefault(genericInput.decimals, 0)
  const formatValueAndUnit = useValueFormatter({ decimals })

  const label = getValueOrDefault(genericInput.primaryLabel, defaultLabelForUnit(unit))
  const value = genericInput.value
  const formattedValue = value !== undefined && value !== null ? formatValueAndUnit(value, unit, false) : "--"
  const formattedUnit =
    value !== undefined && value !== null ? formatValueAndUnit(value, unit).slice(formattedValue.length) : ""

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{inputName}</div>
      <div className="h-px-44 rounded-md bg-surface-tertiary flex items-center px-4">
        <span className="flex-1 text-base text-content-secondary">{label}</span>
        <span className="text-base text-content-primary">{formattedValue}</span>
        <span className="text-base text-content-tertiary">{formattedUnit}</span>
      </div>
    </div>
  )
})

export default ValueNoRangeInput
