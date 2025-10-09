import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

interface SteppedSwitchOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const SteppedSwitchOutput = observer((props: SteppedSwitchOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = switchableOutput.state === 1 ? "on" : "off"
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
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      {/* Border */}
      <div className="h-px-44 rounded-md bg-surface-victronBlue border-2 border-content-victronBlue">
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
                {
                  "text-content-primary": true, // variant === "off",
                  // "text-content-onVictronBlue": variant === "on",
                },
              )}
              onClick={handleClickOnOff}
            >
              {variant === "on" ? "On" : "Off"}
            </button>
            {/* Separator */}
            <div className="w-px-2 h-[80%] rounded-sm bg-content-lightGray"></div>
          </div>
          <div className="flex-1 flex h-full w-full">
            {buttons.map((index) => (
              <button
                key={index}
                className={classnames("flex-1", {
                  "text-content-onVictronBlue": index === selected,
                  "bg-content-victronBlue": index === selected && variant === "on",
                  "bg-content-victronBlue50": index === selected && variant === "off",
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
