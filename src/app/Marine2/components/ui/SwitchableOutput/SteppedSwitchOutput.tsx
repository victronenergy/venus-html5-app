import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
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
import useSize from "app/Marine2/utils/hooks/use-size"
import StatusPill from "../StatusPill"
import { getLocalizedOrDefault } from "../GenericInput/helpers"
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"

interface SteppedSwitchOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const stepButtonClassName = "flex-1 truncate px-1"

const SteppedSwitchOutput = observer((props: SteppedSwitchOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const isOn = switchableOutput.state === 1
  const variant = isOn ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const buttons = Array.from({ length: switchableOutput.dimmingMax || 1 }, (_, i) => i + 1)
  // TODO: this should be a number but as of today we sometimes receive a string
  const selected = Number(switchableOutput.dimming) || 1

  // Optional /Settings/Labels, indexed by dimming value (1..dimmingMax) like every other Labels consumer.
  const labels: unknown[] = Array.isArray(switchableOutput.labels) ? switchableOutput.labels : []
  const labelFor = (index: number): string | undefined => {
    const label = labels[index]
    return typeof label === "string" && label.trim() !== "" ? getLocalizedOrDefault(label) : undefined
  }
  const stepLabels = buttons.map((index) => labelFor(index))
  const hasLabels = stepLabels.some((label) => label !== undefined)

  // When the device names the off state (labels[0]) the control becomes a single-choice group: the
  // highlighted segment is always what is active. The off segment is highlighted while off and only
  // switches off; tapping a step switches on at that level. Without labels[0] the first segment is
  // the classic On/Off toggle and the selected step stays (dimmed) while off.
  const offLabel = labelFor(0)
  const exclusive = offLabel !== undefined
  const offSelected = exclusive && !isOn

  // Labels are only used when every one of them fits its button, otherwise all steps fall back to numbers.
  // An invisible copy of the step row carrying the labels is measured whenever the row width or the labels change.
  const stepAreaRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [stepAreaWidth] = useSize(stepAreaRef)
  const [labelsFit, setLabelsFit] = useState(true)
  const stepLabelsKey = JSON.stringify(stepLabels)

  // Re-measure once web fonts have loaded: a cold start measures with the fallback font metrics
  const [fontsReady, setFontsReady] = useState(false)
  useEffect(() => {
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) setFontsReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return
    const overflows = Array.from(el.children).some((child) => child.scrollWidth > child.clientWidth)
    setLabelsFit(!overflows)
  }, [stepAreaWidth, stepLabelsKey, fontsReady])

  const useLabels = hasLabels && labelsFit

  const handleClickOnOff = () => {
    if (exclusive) {
      if (isOn) switchableOutput.updateState(0)
      return
    }
    switchableOutput.updateState(isOn ? 0 : 1)
  }

  const handleClickButton = (index: number) => {
    if (exclusive) {
      switchableOutput.updateDimming(index)
      if (!isOn) switchableOutput.updateState(1)
      return
    }
    if (!isOn) {
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
          {/* On/Off Background. In single-choice mode the off segment is one of the equal segments. */}
          <div
            className={classnames("h-full flex items-center", { "min-w-0": exclusive })}
            style={exclusive ? { flex: "1 1 0%" } : undefined}
          >
            {/* On/Off Button */}
            <button
              className={classnames("h-full whitespace-nowrap truncate cursor-pointer text-sm min-h-[2.375rem]", {
                "w-full px-1": exclusive,
                "px-2 min-w-[3rem]": !exclusive,
                "text-content-victronGray": disabled,
                "text-content-primary": !disabled && !offSelected,
                "bg-content-victronGray50": disabled && offSelected,
                // the off state uses the same colour as an off toggle / the preselected step of an off switch
                "bg-content-victronBlue50 text-content-onVictronBlue": !disabled && offSelected,
              })}
              onClick={handleClickOnOff}
            >
              {exclusive ? offLabel : variant === "on" ? translate("switches.on") : translate("switches.off")}
            </button>
            {/* Separator */}
            {!exclusive && (
              <div
                className={classnames(
                  "w-px-2 h-[80%] rounded-sm",
                  disabled ? "bg-content-victronGray" : "bg-content-lightBlue",
                )}
                data-testid="stepped-switch-separator"
              ></div>
            )}
          </div>
          <div
            ref={stepAreaRef}
            className={classnames("relative flex h-full w-full", { "flex-1": !exclusive })}
            style={exclusive ? { flex: `${buttons.length} 1 0%` } : undefined}
          >
            {buttons.map((index) => (
              <button
                key={index}
                className={classnames(stepButtonClassName, {
                  "text-content-victronGray": disabled,
                  "bg-content-victronGray50": disabled && index === selected && !offSelected,
                  "text-content-onVictronBlue": !disabled && index === selected && !offSelected,
                  "bg-content-victronBlue": !disabled && index === selected && isOn,
                  "bg-content-victronBlue50": !disabled && index === selected && !isOn && !exclusive,
                })}
                onClick={() => handleClickButton(index)}
              >
                {useLabels ? (stepLabels[index - 1] ?? `${index}`) : `${index}`}
              </button>
            ))}
            {/* Measurement row: same layout as the step buttons, always carrying the labels */}
            {hasLabels && (
              <div ref={measureRef} className="absolute inset-0 flex invisible pointer-events-none" aria-hidden="true">
                {buttons.map((index) => (
                  <span key={index} className={stepButtonClassName} data-testid="stepped-switch-measure">
                    {stepLabels[index - 1] ?? `${index}`}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default SteppedSwitchOutput
