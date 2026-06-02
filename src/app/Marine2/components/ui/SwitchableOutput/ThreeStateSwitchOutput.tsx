import React from "react"
import {
  getSwitchingPaneItemNameForDisplay,
  SwitchableOutputId,
  SwitchableOutputTree,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"
import StatusPill from "../StatusPill"
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"

interface ThreeStateSwitchOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const ThreeStateSwitchOutput = observer((props: ThreeStateSwitchOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
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
    <div className={classnames("mt-4 select-none", props.className)}>
      <div className="flex">
        <div className="flex-1">{outputName}</div>
        {statusPill && (
          <div className="flex py-1">
            <StatusPill label={statusPill.label} variant={statusPill.variant} />
          </div>
        )}
      </div>
      <div className={classnames("flex", { "pointer-events-none": disabled })}>
        <button
          className={classnames(
            "h-px-44 px-4 py-1.5 whitespace-nowrap",
            "border-2 border-r-0",
            disabled ? "border-content-victronGray" : "border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-l-md",
            {
              "bg-content-victronGray50 text-content-victronGray": disabled && variant === "off",
              "bg-surface-victronGray text-content-victronGray": disabled && variant === "on",
              "bg-content-victronBlue50 text-content-onVictronBlue": !disabled && variant === "off",
              "bg-surface-victronBlue text-content-primary": !disabled && variant === "on",
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
            "border-2 border-l-0",
            disabled ? "border-content-victronGray" : "border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-r-md",
            {
              "bg-content-victronGray text-content-victronGray": disabled && variant === "on",
              "bg-surface-victronGray text-content-victronGray": disabled && variant === "off",
              "bg-content-victronBlue text-content-onVictronBlue": !disabled && variant === "on",
              "bg-surface-victronBlue text-content-primary": !disabled && variant === "off",
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
            "border-2",
            disabled ? "border-content-victronGray" : "border-content-victronBlue cursor-pointer",
            "text-sm min-h-[2.375rem]",
            "rounded-md",
            {
              "bg-surface-victronGray text-content-victronGray": disabled && auto === "off",
              "bg-content-victronGray text-content-victronGray": disabled && auto === "on",
              "bg-surface-victronBlue text-content-primary": !disabled && auto === "off",
              "bg-content-victronBlue text-content-onVictronBlue": !disabled && auto === "on",
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
