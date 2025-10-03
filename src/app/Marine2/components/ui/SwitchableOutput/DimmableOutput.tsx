import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
// import ArrowLeftIcon from "../../../images/icons/arrow-left.svg"
// import ArrowRightIcon from "../../../images/icons/arrow-right.svg"

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

  // const handleClickLess = () => {
  //   var dimming = switchableOutput.dimming || 0
  //   dimming -= 5
  //   if (dimming < 0) {
  //     dimming = 0
  //   }
  //   switchableOutput.updateDimming(dimming)
  // }

  // const handleClickMore = () => {
  //   var dimming = switchableOutput.dimming || 0
  //   dimming += 5
  //   if (dimming > 100) {
  //     dimming = 0
  //   }
  //   switchableOutput.updateDimming(dimming)
  // }

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      {/* Background */}
      <div
        className={classnames("h-px-44 rounded-md border-2 border-content-victronBlue", {
          // "bg-surface-victronBlue": true,
          // "bg-content-victronBlue": variant === "on",
        })}
      >
        <div className={classnames("h-full rounded-sm flex overflow-hidden", {})}>
          <div
            className={classnames("h-full flex items-center", {
              "bg-content-victronBlue50": variant === "off",
              "bg-content-victronBlue": variant === "on",
            })}
          >
            <button
              className={classnames(
                "h-full px-2 whitespace-nowrap",
                "cursor-pointer",
                "text-sm min-h-[2.375rem]",
                "text-content-primary",
                {},
              )}
              onClick={handleClickOnOff}
            >
              {variant === "on" ? "On" : "Off"}
            </button>
            <div className="w-px-2 h-[75%] rounded-sm bg-content-primary"></div>
          </div>
          <div className="flex-1">
            <div className="flex h-full">
              {/* Color A section */}
              <div
                className={classnames("", {
                  "bg-content-victronBlue": variant === "on",
                  "bg-content-victronBlue50": variant === "off",
                })}
                style={{ width: `${ratio}%` }}
              />
              {/* Color B section */}
              <div
                className={classnames("flex-1", {
                  "bg-surface-victronBlue": true,
                })}
                style={{ width: `${100 - ratio}%` }}
              />
            </div>
          </div>
        </div>
        {/* <div className="relative z-10 flex">
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
              className={classnames("w-px-44 h-px-44 -m-0.5 object-contain justify-center px-3 cursor-pointer", {
                "text-content-primary": ratio < 98,
                "text-content-onVictronBlue": ratio >= 98,
              })}
              onClick={handleClickMore}
            >
              <ArrowRightIcon />
            </button>
          </div> */}
      </div>
    </div>
  )
})

export default DimmableOutput
