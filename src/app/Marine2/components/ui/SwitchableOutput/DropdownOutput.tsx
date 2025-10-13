import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

interface DropdownOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

// TODO: this needs work

const DropdownOutput = observer((props: DropdownOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const parsedLabels = switchableOutput.labels ? JSON.parse(switchableOutput.labels) : "[]"
  const labels = Array.isArray(parsedLabels) ? parsedLabels : []
  const selectedLabelIndex = switchableOutput.dimming || 0
  const label = labels.length > selectedLabelIndex ? labels[selectedLabelIndex] : ""

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      {/* Border */}
      <div className="h-px-44 rounded-md bg-surface-victronBlue border-2 border-content-victronBlue">
        {/* Container */}
        <div className="h-full rounded-sm flex overflow-hidden items-center">
          <div className="px-2 whitespace-nowrap cursor-pointer text-sm">{label}</div>
        </div>
      </div>
    </div>
  )
})

export default DropdownOutput
