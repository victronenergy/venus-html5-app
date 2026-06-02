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
import { translate } from "react-i18nify"
import { getValueOrDefault } from "../SwitchableOutput/helpers"
import { getLocalizedOrDefault } from "./helpers"

interface DiscreteInputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  inputId: GenericInputId
  parentDeviceName: string
  className?: string
}

const DiscreteInput = observer((props: DiscreteInputProps) => {
  const genericInput = useGenericInput(props.tree, props.deviceId, props.inputId)
  const inputName = getSwitchingPaneItemNameForDisplay(genericInput, props.parentDeviceName)

  const label = getValueOrDefault(genericInput.primaryLabel, translate("switches.state"))
  const options = Array.isArray(genericInput.labels) ? genericInput.labels : []
  const selectedIndex = Number(getValueOrDefault(genericInput.value, 0))
  const selectedLabel = options.length > selectedIndex ? options[selectedIndex] : options.length > 0 ? options[0] : "--"

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{inputName}</div>
      <div className="h-px-44 rounded-md bg-surface-tertiary flex items-center px-4">
        <span className="flex-1 text-base text-content-secondary">{label}</span>
        <span className="text-base text-content-primary">{getLocalizedOrDefault(selectedLabel)}</span>
      </div>
    </div>
  )
})

export default DiscreteInput
