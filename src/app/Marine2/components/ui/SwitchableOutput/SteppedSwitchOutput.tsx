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

  const variant = switchableOutput.state === 1 ? "on" : "off"
  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const buttons = Array.from({ length: switchableOutput.dimmingMax || 1 }, (_, i) => i + 1)
  // TODO: this should be a number but as of today we sometimes receive a string
  const selected = Number(switchableOutput.dimming) || 1

  // Optional /Settings/Labels, indexed by dimming value (1..dimmingMax) like every other Labels consumer.
  // labels[0] would describe the off state, which is rendered by the hardcoded On/Off button instead.
  const labels: unknown[] = Array.isArray(switchableOutput.labels) ? switchableOutput.labels : []
  const labelFor = (index: number): string | undefined => {
    const label = labels[index]
    return typeof label === "string" && label.trim() !== "" ? getLocalizedOrDefault(label) : undefined
  }
  const stepLabels = buttons.map((index) => labelFor(index))
  const hasLabels = stepLabels.some((label) => label !== undefined)

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
          <div ref={stepAreaRef} className="relative flex-1 flex h-full w-full">
            {buttons.map((index) => (
              <button
                key={index}
                className={classnames(stepButtonClassName, {
                  "text-content-victronGray": disabled,
                  "bg-content-victronGray50": disabled && index === selected,
                  "text-content-onVictronBlue": !disabled && index === selected,
                  "bg-content-victronBlue": !disabled && index === selected && variant === "on",
                  "bg-content-victronBlue50": !disabled && index === selected && variant === "off",
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
