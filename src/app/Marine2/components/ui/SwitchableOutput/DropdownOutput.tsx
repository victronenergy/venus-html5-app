import React, { useEffect, useRef, useState } from "react"
import {
  getSwitchingPaneItemNameForDisplay,
  SwitchableOutputId,
  SwitchableOutputTree,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react-lite"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"
import StatusPill from "../StatusPill"
import { getLocalizedOrDefault } from "../GenericInput/helpers"
import SegmentButtons from "./SegmentButtons"
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"
import useLabelsFit from "./useLabelsFit"

interface DropdownOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

// Up to this many options the dropdown is shown inline as segments, provided every label fits
const MAX_SEGMENTED_OPTIONS = 5

const DropdownOutput = observer((props: DropdownOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const rawOptions: unknown[] = Array.isArray(switchableOutput.labels) ? switchableOutput.labels : []
  const options = rawOptions.map((option) => (typeof option === "string" ? getLocalizedOrDefault(option.trim()) : ""))
  // TODO: this should be a number but as of today we sometimes receive a string
  const selectedOptionIndex = Number(switchableOutput.dimming)
  const selectedOption =
    options.length > selectedOptionIndex ? options[selectedOptionIndex] : options.length > 0 ? options[0] : ""

  // A few short options are shown inline as a segmented control, otherwise as a dropdown list.
  // A first option that is the reserved "/off" is highlighted in the off colour.
  const controlRef = useRef<HTMLDivElement>(null)
  const segmentable =
    options.length >= 1 && options.length <= MAX_SEGMENTED_OPTIONS && options.every((option) => option !== "")
  const { fits, measureRow } = useLabelsFit(controlRef, segmentable ? options : [])
  const segmented = segmentable && fits
  const offIndex = rawOptions[0] === "/off" ? 0 : -1

  const [isOpen, setIsOpen] = useState(false)

  // The list cannot stay open behind the segments, nor reopen by itself when they go away again
  useEffect(() => {
    if (segmented) setIsOpen(false)
  }, [segmented])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (controlRef.current && !controlRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleSelect = (event: any, index: number) => {
    event.stopPropagation()
    setIsOpen(false)
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
      {/* Container */}
      <div
        className={classnames("relative h-px-44 rounded-md", {
          "bg-surface-victronGray pointer-events-none": disabled,
          "bg-surface-victronBlue": !disabled,
        })}
        ref={controlRef}
        onClick={segmented ? undefined : () => setIsOpen(!isOpen)}
      >
        {segmented ? (
          /* Segments */
          <div className="h-full rounded-md flex overflow-hidden text-sm" data-testid="dropdown-segments">
            <SegmentButtons
              texts={options}
              selected={selectedOptionIndex}
              disabled={disabled}
              offIndex={offIndex}
              onSelect={(index) => switchableOutput.updateDimming(index)}
            />
          </div>
        ) : (
          /* Selected Option */
          <div className="h-full rounded-sm flex overflow-hidden items-center">
            <div
              className={classnames("px-4 flex-1 whitespace-nowrap cursor-pointer text-sm", {
                "text-content-victronGray": disabled,
              })}
            >
              {selectedOption}
            </div>
            <ArrowRightIcon
              className={classnames(
                "h-full py-3 px-4 cursor-pointer outline-none rotate-90",
                disabled ? "text-content-victronGray" : "text-content-victronBlue",
              )}
            />
          </div>
        )}
        {/* Measurement row for the segments, kept while the dropdown list is shown so it can switch back */}
        {measureRow}
        {/* Dropdown */}
        {!segmented && isOpen && (
          <>
            <div className="absolute z-10 w-full rounded-md bg-surface-secondary overflow-hidden">
              <div className="rounded-md w-full py-px-1 max-h-[calc(5*44px*var(--uix))] bg-surface-victronBlue overflow-y-auto">
                {options.map((option, index) => (
                  <div
                    key={index}
                    onClick={(event: any) => handleSelect(event, index)}
                    className={classnames(
                      "px-4 h-px-44 flex items-center cursor-pointer text-sm hover:bg-content-victronBlue hover:text-content-onVictronBlue text-content-primary",
                      {
                        "bg-content-victronBlue50 ": index === selectedOptionIndex,
                      },
                    )}
                  >
                    {option}
                  </div>
                ))}
              </div>
              {/* Dropdown Border */}
              <div className="absolute inset-0 rounded-md border-2 border-content-victronBlue pointer-events-none" />
            </div>
          </>
        )}
        {/* Selected Option Border */}
        <div
          className={classnames(
            "absolute inset-0 h-px-44 rounded-md border-2 pointer-events-none",
            disabled ? "border-content-victronGray" : "border-content-victronBlue",
          )}
        />
      </div>
    </div>
  )
})

export default DropdownOutput
