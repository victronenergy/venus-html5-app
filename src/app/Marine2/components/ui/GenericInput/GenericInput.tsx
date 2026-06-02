import React from "react"
import { GenericInputId, SwitchableOutputTree, SwitchingDeviceInstanceId } from "@victronenergy/mfd-modules"
import { GenericInputType, GENERIC_INPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import { observer } from "mobx-react"
import DiscreteInput from "./DiscreteInput"
import ValueNoRangeInput from "./ValueNoRangeInput"
import ValueWithRangeInput from "./ValueWithRangeInput"
import TemperatureInput from "./TemperatureInput"

interface GenericInputProps {
  key: string
  tree: SwitchableOutputTree
  type: GenericInputType
  deviceId: SwitchingDeviceInstanceId
  inputId: GenericInputId
  parentDeviceName: string
  className?: string
}

const GenericInput = observer((props: GenericInputProps) => {
  const key = `${props.deviceId}_${props.inputId}`
  switch (props.type) {
    case GENERIC_INPUT_TYPE.DISCRETE:
      return (
        <DiscreteInput
          key={key}
          tree={props.tree}
          deviceId={props.deviceId}
          inputId={props.inputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case GENERIC_INPUT_TYPE.VALUE_NO_RANGE:
      return (
        <ValueNoRangeInput
          key={key}
          tree={props.tree}
          deviceId={props.deviceId}
          inputId={props.inputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case GENERIC_INPUT_TYPE.VALUE_WITH_RANGE:
      return (
        <ValueWithRangeInput
          key={key}
          tree={props.tree}
          deviceId={props.deviceId}
          inputId={props.inputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case GENERIC_INPUT_TYPE.TEMPERATURE:
      return (
        <TemperatureInput
          key={key}
          tree={props.tree}
          deviceId={props.deviceId}
          inputId={props.inputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
  }
})

export default GenericInput
