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

interface SteppedSwitchOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const SteppedSwitchOutput = observer((props: SteppedSwitchOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const buttons = Array.from({ length: switchableOutput.dimmingMax || 1 }, (_, i) => i + 1)
  const selected = switchableOutput.dimming || 1

  const handleClickOnOff = () => {
    switchableOutput.updateState(switchableOutput.state === 1 ? 0 : 1)
  }

  const handleClickButton = (index: number) => {
    if (switchableOutput.state === 0) {
      return
    }
    switchableOutput.updateDimming(index)
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
      {/* Border */}
      <div
        className={classnames("h-px-44 rounded-md border-2", {
          "bg-surface-victronGray border-content-victronGray pointer-events-none": disabled,
          "bg-surface-victronBlue border-content-victronBlue": !disabled,
        })}
      >
        {/* Container */}
        <div className="h-full rounded-sm flex overflow-hidden">
          {/* On/Off Background */}
          <div
            className={classnames("h-full flex items-center", {
              // "bg-surface-victronBlue": true, // variant === "off",
              // "bg-content-victronBlue": variant === "on",
            })}
          >
            {/* On/Off Button */}
            <button
              className={classnames(
                "h-full px-2 whitespace-nowrap cursor-pointer text-sm min-h-[2.375rem] min-w-[3rem]",
                disabled ? "text-content-victronGray" : "text-content-primary",
              )}
              onClick={handleClickOnOff}
            >
              {variant === "on" ? translate("switches.on") : translate("switches.off")}
            </button>
            {/* Separator */}
            <div
              className={classnames(
                "w-px-2 h-[80%] rounded-sm",
                disabled ? "bg-content-victronGray" : "bg-content-lightBlue",
              )}
            ></div>
          </div>
          <div className="flex-1 flex h-full w-full">
            {buttons.map((index) => (
              <button
                key={index}
                className={classnames("flex-1", {
                  "text-content-victronGray": disabled,
                  "bg-content-victronGray50": disabled && index === selected,
                  "text-content-onVictronBlue": !disabled && index === selected,
                  "bg-content-victronBlue": !disabled && index === selected && variant === "on",
                  "bg-content-victronBlue50": !disabled && index === selected && variant === "off",
                })}
                onClick={() => handleClickButton(index)}
              >
                {`${index}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default SteppedSwitchOutput
