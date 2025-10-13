import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"

interface ThreeStateSwitchOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const ThreeStateSwitchOutput = observer((props: ThreeStateSwitchOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const auto = switchableOutput.auto === 1 ? "on" : "off"

  const handleClickOn = () => {
    if (switchableOutput.auto === 1) {
      return
    }
    switchableOutput.updateState(1)
  }

  const handleClickOff = () => {
    if (switchableOutput.auto === 1) {
      return
    }
    switchableOutput.updateState(0)
  }

  const handleClickAuto = () => {
    switchableOutput.updateAuto(switchableOutput.auto ? 0 : 1)
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
              "bg-content-victronBlue50 text-content-onVictronBlue": variant === "off",
              "bg-surface-victronBlue text-content-primary": variant === "on",
            },
            props.className,
          )}
          onClick={handleClickOff}
        >
          {translate("switches.off")}
        </button>
        <button
          className={classnames(
            "h-px-44 px-4 py-1.5 whitespace-nowrap",
            "border-2 border-l-0 border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-r-md",
            {
              "bg-content-victronBlue text-content-onVictronBlue": variant === "on",
              "bg-surface-victronBlue text-content-primary": variant === "off",
            },
            props.className,
          )}
          onClick={handleClickOn}
        >
          {translate("switches.on")}
        </button>
        <button
          className={classnames(
            "ml-2",
            "h-px-44 px-4 py-1.5 whitespace-nowrap",
            "border-2 border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-md",
            {
              "bg-surface-victronBlue text-content-primary": auto === "off",
              "bg-content-victronBlue text-content-onVictronBlue": auto === "on",
            },
            props.className,
          )}
          onClick={handleClickAuto}
        >
          {translate("switches.auto")}
        </button>
      </div>
    </div>
  )
})

export default ThreeStateSwitchOutput
