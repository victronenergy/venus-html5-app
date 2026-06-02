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

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{inputName}</div>
      <div className="h-px-44 rounded-md bg-surface-tertiary flex items-center px-4">
        <span className="text-sm text-content-primary">--</span>
      </div>
    </div>
  )
})

export default ValueWithRangeInput
