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

interface ValueWithRangeInputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  inputId: GenericInputId
  parentDeviceName: string
  className?: string
}

const ValueWithRangeInput = observer((props: ValueWithRangeInputProps) => {
  const genericInput = useGenericInput(props.tree, props.deviceId, props.inputId)
  const inputName = getSwitchingPaneItemNameForDisplay(genericInput, props.parentDeviceName)

  const unit = getValueOrDefault(genericInput.unit, "")
  const decimals = getValueOrDefault(genericInput.decimals, 0)
  const formatValueAndUnit = useValueFormatter({ decimals })

  const value = genericInput.value
  const min = getValueOrDefault(genericInput.rangeMin, 0)
  const max = getValueOrDefault(genericInput.rangeMax, 100)
  const ratio =
    value !== undefined && value !== null && max !== min ? Math.round(((value - min) / (max - min)) * 100) : 0
  const formattedValue = value !== undefined && value !== null ? formatValueAndUnit(value, unit, false) : "--"
  const formattedUnit =
    value !== undefined && value !== null ? formatValueAndUnit(value, unit).slice(formattedValue.length) : ""

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{inputName}</div>
      <div className="h-px-44 rounded-md bg-surface-tertiary flex items-center px-4">
        <div className="flex-1 h-px-8 rounded-full bg-surface-victronBlue overflow-hidden mr-4">
          <div className="h-full bg-content-victronBlue rounded-full" style={{ width: `${ratio}%` }} />
        </div>
        <span className="text-base text-content-primary">{formattedValue}</span>
        <span className="text-base text-content-tertiary">{formattedUnit}</span>
      </div>
    </div>
  )
})

export default ValueWithRangeInput
