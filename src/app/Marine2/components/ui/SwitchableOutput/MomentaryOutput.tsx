import React from "react"
import {
  getSwitchingPaneItemNameForDisplay,
  SwitchableOutputId,
  SwitchableOutputTree,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import StatusPill from "../StatusPill"
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"

interface MomentaryOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const MomentaryOutput = observer((props: MomentaryOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)

  const handlePress = () => {
    switchableOutput.updateState(1)
  }

  const handleRelease = () => {
    switchableOutput.updateState(0)
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
      <button
        className={classnames(
          "h-px-44 px-4 py-1.5 whitespace-nowrap",
          "border-2",
          disabled ? "border-content-victronGray" : "border-content-victronBlue cursor-pointer",
          "text-sm min-h-[2.375rem]",
          "rounded-md",
          {
            "bg-surface-victronGray text-content-victronGray": disabled && variant === "off",
            "bg-content-victronGray text-content-victronGray": disabled && variant === "on",
            "bg-surface-victronBlue text-content-primary": !disabled && variant === "off",
            "bg-content-victronBlue text-content-onVictronBlue": !disabled && variant === "on",
          },
          { "pointer-events-none": disabled },
          props.className,
        )}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        onTouchCancel={handleRelease}
      >
        {variant === "on" ? translate("switches.on") : translate("switches.press")}
      </button>
    </div>
  )
})

export default MomentaryOutput
