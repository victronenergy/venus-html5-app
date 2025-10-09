import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

interface BilgePumpControlOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const BilgePumpControlOutput = observer((props: BilgePumpControlOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = switchableOutput.state === 1 ? "on" : "off"

  // TODO: Where to get Bilge Pump Control Status string from?
  // TODO: What is the behavior of tapping On, vs. tapping Auto
  // TODO: What colors to use, what font size to use for Status

  const handleClickOn = () => {
    switchableOutput.updateAuto(0)
    switchableOutput.updateState(1)
  }

  const handleClickAuto = () => {
    switchableOutput.updateAuto(1)
    switchableOutput.updateState(0)
  }
  return (
    <div className={classnames("mt-4", props.className)}>
      <div className="flex">
        <div className="flex-1">{switchableOutput.customName || switchableOutput.name}</div>
        <div className="flex py-1">
          <span className="px-2 text-2xs rounded-md bg-red-500">TODO: {switchableOutput.status}</span>
        </div>
      </div>
      <div className="flex">
        <button
          className={classnames(
            "h-px-44 px-4 py-1.5 whitespace-nowrap",
            "border-2 border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-l-md",
            {
              "bg-surface-victronBlue text-content-primary": variant === "on",
              "bg-content-victronBlue text-content-onVictronBlue": variant === "off",
            },
            props.className,
          )}
          onClick={handleClickAuto}
        >
          Auto
        </button>
        <button
          className={classnames(
            "h-px-44 px-4 py-1.5 whitespace-nowrap",
            "border-2 border-content-victronBlue cursor-pointer",
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

export default BilgePumpControlOutput
