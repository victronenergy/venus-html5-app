import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import ArrowLeftIcon from "../../../images/icons/arrow-left.svg"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"

interface DimmableOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const DimmableOutput = observer((props: DimmableOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const ratio = switchableOutput.dimming || 0

  const handleClickOnOff = () => {
    switchableOutput.updateState(switchableOutput.state === 1 ? 0 : 1)
  }

  const handleClickLess = () => {
    var dimming = switchableOutput.dimming || 0
    dimming -= 5
    if (dimming < 0) {
      dimming = 0
    }
    switchableOutput.updateDimming(dimming)
  }

  const handleClickMore = () => {
    var dimming = switchableOutput.dimming || 0
    dimming += 5
    if (dimming > 100) {
      dimming = 0
    }
    switchableOutput.updateDimming(dimming)
  }

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      <div
        className={classnames(
          "relative inline-block h-px-44 rounded-md border-2 border-content-victronBlue",
          props.className,
        )}
      >
        {/* Background */}
        <div className="absolute inset-0 rounded-sm flex overflow-hidden">
          {/* Color A section */}
          <div
            className={classnames("transition-all duration-300 ease-in-out", {
              "bg-content-victronBlue": variant === "on",
              "bg-content-victronBlue50": variant === "off",
            })}
            style={{ width: `${ratio}%` }}
          />
          {/* Color B section */}
          <div
            className="bg-surface-victronBlue transition-all duration-300 ease-in-out"
            style={{ width: `${100 - ratio}%` }}
          />
        </div>
        <div className="relative z-10 flex">
          <button
            className={classnames("w-px-44 h-px-44 -m-0.5 object-contain justify-center px-3 cursor-pointer", {
              "text-content-primary": ratio <= 2,
              "text-content-onVictronBlue": ratio > 2,
            })}
            onClick={handleClickLess}
          >
            <ArrowLeftIcon />
          </button>
          <button
            className={classnames(
              "flex-1",
              "h-px-44 -m-0.5 px-4 whitespace-nowrap",
              "cursor-pointer",
              "text-sm min-h-[2.375rem]",
              {
                "text-content-primary": ratio < 50,
                "text-content-onVictronBlue": ratio >= 50,
              },
            )}
            onClick={handleClickOnOff}
          >
            {variant === "on" ? "On" : "Off"}
          </button>
          <button
            className={classnames("w-px-44 h-px-44 -m-0.5 object-contain justify-center px-3 cursor-pointer", {
              "text-content-primary": ratio < 98,
              "text-content-onVictronBlue": ratio >= 98,
            })}
            onClick={handleClickMore}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
})

export default DimmableOutput
