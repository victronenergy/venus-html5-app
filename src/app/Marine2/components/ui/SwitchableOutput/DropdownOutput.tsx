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
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"

interface DropdownOutputProps {
  key: string
  tree: SwitchableOutputTree
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const DropdownOutput = observer((props: DropdownOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.tree, props.deviceId, props.outputId)
  const outputName = getSwitchingPaneItemNameForDisplay(switchableOutput, props.parentDeviceName)

  const disabled = isSwitchableOutputDisabled(switchableOutput.status)
  const statusPill = getSwitchableOutputStatusPill(switchableOutput.status, switchableOutput.type)
  const options = Array.isArray(switchableOutput.labels) ? switchableOutput.labels : []
  // TODO: this should be a number but as of today we sometimes receive a string
  const selectedOptionIndex = Number(switchableOutput.dimming)
  const selectedOption =
    options.length > selectedOptionIndex ? options[selectedOptionIndex] : options.length > 0 ? options[0] : ""

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        ref={dropdownRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Selected Option */}
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
        {/* Dropdown */}
        {isOpen && (
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
