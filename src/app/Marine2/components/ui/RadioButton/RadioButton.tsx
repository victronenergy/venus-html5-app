import React from "react"
import classNames from "classnames"

interface Props {
  selected?: boolean
  disabled?: boolean
  color?: string
  size?: "lg"
  onChange: () => void
}

const RadioButton: React.FC<Props> = ({ selected, onChange, disabled, size }) => {
  return (
    <div>
      <div
        onClick={() => !disabled && onChange()}
        className={classNames(" bg-inherit rounded-full", {
          "border-victron-gray": !selected,
          "border-victron-blue": selected,
          "w-4 h-4 border-[1px]": !size, //default
          "md-l:w-6 md-l:h-6 md-l:border-2": !size, // large
          "sm-s:w-4 sm-s:h-4 :border-[1px]": !size, // small
          "w-8 h-8 border-[2px]": size === "lg",
        })}
      >
        {selected && (
          <div
            className={classNames(" rounded-full bg-victron-blue", {
              "w-2 h-2 mt-[3px] ml-[3px]": !size, //default
              "md-l:w-4 md-l:h-4 md-l:mt-[2px] md-l:ml-[2px]": !size, // large
              "sm-s:w-2 sm-s:h-2 sm-s:mt-[3px] sm-s:ml-[3px]": !size, // small
              "w-[22px] h-[22px] mt-[3px] ml-[3px]": size === "lg",
            })}
          ></div>
        )}
      </div>
    </div>
  )
}

export default RadioButton
