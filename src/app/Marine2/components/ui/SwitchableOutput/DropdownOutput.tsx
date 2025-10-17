import React, { useEffect, useRef, useState } from "react"
import {
  getSwitchableOutputNameForDisplay,
  SwitchableOutputId,
  SwitchingDeviceInstanceId,
  useSwitchableOutput,
} from "@victronenergy/mfd-modules"
import classnames from "classnames"
import { observer } from "mobx-react"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"

interface DropdownOutputProps {
  key: string
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const DropdownOutput = observer((props: DropdownOutputProps) => {
  const switchableOutput = useSwitchableOutput(props.deviceId, props.outputId)
  const outputName = getSwitchableOutputNameForDisplay(switchableOutput, props.parentDeviceName)

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
    <div className={classnames("mt-4", props.className)}>
      <div>{outputName}</div>
      {/* Container */}
      <div
        className="relative h-px-44 rounded-md bg-surface-victronBlue"
        ref={dropdownRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Selected Option */}
        <div className="h-full rounded-sm flex overflow-hidden items-center">
          <div className="px-4 flex-1 whitespace-nowrap cursor-pointer text-sm select-none">{selectedOption}</div>
          <ArrowRightIcon className="h-full py-3 px-4 text-content-victronBlue cursor-pointer outline-none rotate-90" />
        </div>
        {/* Dropdown */}
        {isOpen && (
          <>
            <div className="absolute w-full rounded-md bg-surface-secondary overflow-hidden">
              <div className="rounded-md w-full py-px-1 max-h-[calc(5*44px*var(--uix))] bg-surface-victronBlue overflow-y-auto">
                {options.map((option, index) => (
                  <div
                    key={index}
                    onClick={(event: any) => handleSelect(event, index)}
                    className={classnames(
                      "px-4 h-px-44 flex items-center cursor-pointer text-sm select-none hover:bg-content-victronBlue hover:text-content-onVictronBlue text-content-primary",
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
        <div className="absolute inset-0 h-px-44 rounded-md border-2 border-content-victronBlue pointer-events-none" />
      </div>
    </div>
  )
})

export default DropdownOutput
