import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

interface ToggleOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const ToggleOutput = observer((props: ToggleOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = switchableOutput.state === 1 ? "on" : "off"

  const handleClickOn = () => {
    switchableOutput.updateState(1)
  }

  const handleClickOff = () => {
    switchableOutput.updateState(0)
  }
  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      <div className="flex">
        <button
          className={classnames(
            "h-px-44 px-4 py-1.5 whitespace-nowrap",
            "border-2 border-r-0 border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-l-md",
            {
              "bg-surface-victronBlue text-content-primary": variant === "on",
              "bg-content-victronBlue50 text-content-onVictronBlue": variant === "off",
            },
            props.className,
          )}
          onClick={handleClickOff}
        >
          Off
        </button>
        <button
          className={classnames(
            "h-px-44 px-4 py-1.5 whitespace-nowrap",
            "border-2 border-l-0 border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-r-md",
            {
              "bg-surface-victronBlue text-content-primary": variant === "off",
              "bg-content-victronBlue text-content-onVictronBlue": variant === "on",
            },
            props.className,
          )}
          onClick={handleClickOn}
        >
          On
        </button>
      </div>
    </div>
  )
})

export default ToggleOutput
