import React from "react"
import classNames from "classnames"

interface Props {
  selected?: boolean
  disabled?: boolean
  responsive?: boolean
  color?: string
  onChange: () => void
}

const RadioButton: React.FC<Props> = ({ selected, onChange, disabled, responsive = true }) => {
  return (
    <div>
      <div
        onClick={() => !disabled && onChange()}
        className={classNames(
          // we especially use `px` here to avoid UI issues on some MFD screens
          "w-px-24 h-px-24 border-px-2 bg-inherit rounded-full flex items-center justify-center",
          {
            "border-victron-gray": !selected,
            "border-victron-blue": selected,
            "md-m:w-px-24 md-m:h-px-24 md-m:border-px-2": true, // large
            "sm-s:w-px-16 sm-s:h-px-16 sm-s:border-px-1": responsive, // small
          }
        )}
      >
        {selected && (
          <div
            className={classNames("w-px-16 h-px-16 rounded-full bg-victron-blue", {
              "md-m:w-px-16 md-m:h-px-16": true, // large
              "sm-s:w-px-8 sm-s:h-px-8": responsive, // small
            })}
          ></div>
        )}
      </div>
    </div>
  )
}

export default RadioButton
