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

const DropdownOutput = observer((props: DropdownOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = "off"

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      <button
        className={classnames(
          "h-px-44 px-4 py-1.5 whitespace-nowrap",
          "border-2 border-content-victronBlue cursor-pointer",
          "text-sm min-h-[2.375rem]",
          "rounded-md",
          {
            "bg-surface-victronBlue text-content-primary": variant === "off",
            // "bg-content-victronBlue text-content-onVictronBlue": variant === "on",
          },
          props.className,
        )}
      >
        DropdownOutput
      </button>
    </div>
  )
})

export default DropdownOutput
