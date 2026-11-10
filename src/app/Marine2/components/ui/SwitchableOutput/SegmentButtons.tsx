import React from "react"
import classnames from "classnames"
import { segmentButtonClassName } from "./useLabelsFit"

interface SegmentButtonsProps {
  texts: string[]
  /** Index of the highlighted segment, or -1 for none */
  selected: number
  disabled: boolean
  /** Highlight the selected segment in the off colour (the preselected step of an off switch) */
  dimmed?: boolean
  /** Segment that represents an off state: highlighted in the off colour when selected */
  offIndex?: number
  onSelect: (index: number) => void
}

/** A row of equal segments with (at most) one highlighted, as used by the stepped switch. */
const SegmentButtons = ({
  texts,
  selected,
  disabled,
  dimmed = false,
  offIndex = -1,
  onSelect,
}: SegmentButtonsProps) => (
  <>
    {texts.map((text, index) => {
      const isSelected = index === selected
      const offColour = dimmed || index === offIndex
      return (
        <button
          key={index}
          className={classnames(segmentButtonClassName, {
            "text-content-victronGray": disabled,
            "bg-content-victronGray50": disabled && isSelected,
            "text-content-onVictronBlue": !disabled && isSelected,
            "bg-content-victronBlue": !disabled && isSelected && !offColour,
            "bg-content-victronBlue50": !disabled && isSelected && offColour,
          })}
          disabled={disabled}
          onClick={() => onSelect(index)}
        >
          {text}
        </button>
      )
    })}
  </>
)

export default SegmentButtons
