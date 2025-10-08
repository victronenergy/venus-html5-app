import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId, useSwitchableOutput } from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"

interface MomentaryOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const MomentaryOutput = observer((props: MomentaryOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)

  const variant = switchableOutput.state === 1 ? "on" : "off"

  const handlePress = () => {
    switchableOutput.updateState(1)
  }

  const handleRelease = () => {
    switchableOutput.updateState(0)
  }

  return (
    <div className={classnames("mt-4", props.className)}>
      <div>{switchableOutput.customName || switchableOutput.name}</div>
      <button
        className={classnames(
          "h-px-44 px-4 py-1.5 whitespace-nowrap",
          "border-2 border-content-victronBlue cursor-pointer",
          "text-sm min-h-[2.375rem]",
          "rounded-md",
          {
            "bg-surface-victronBlue text-content-primary": variant === "off",
            "bg-content-victronBlue text-content-onVictronBlue": variant === "on",
          },
          props.className,
        )}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        onTouchCancel={handleRelease}
      >
        Press
      </button>
    </div>
  )
})

export default MomentaryOutput
