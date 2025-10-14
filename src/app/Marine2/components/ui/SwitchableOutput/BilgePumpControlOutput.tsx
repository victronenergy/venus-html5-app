import React from "react"
import {
  getSwitchableOutputNameForDisplay,
  SwitchableOutputId,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"

interface BilgePumpControlOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const BilgePumpControlOutput = observer((props: BilgePumpControlOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)
  const outputName = getSwitchableOutputNameForDisplay(switchableOutput, props.parentDeviceName)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const statusLabel =
    switchableOutput.status === 0
      ? translate("switches.notRunning")
      : switchableOutput.status === 0x9
        ? translate("switches.running")
        : translate("switches.fault")

  const handleClickOn = () => {
    switchableOutput.updateState(1)
  }

  const handleClickAuto = () => {
    switchableOutput.updateState(0)
  }

  return (
    <div className={classnames("mt-4", props.className)}>
      <div className="flex">
        <div className="flex-1">{outputName}</div>
        <div className="flex py-1">
          <span
            className={classnames("px-2 text-2xs rounded-md", {
              "bg-surface-victronGray": switchableOutput.status === 0x0,
              "bg-surface-victronYello": switchableOutput.status === 0x9,
              "bg-surface-victronRed": switchableOutput.status !== 0x9 && switchableOutput.status !== 0x0,
            })}
          >
            {statusLabel}
          </span>
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
          {translate("switches.auto")}
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
          {translate("switches.on")}
        </button>
      </div>
    </div>
  )
})

export default BilgePumpControlOutput
