import React from "react"
import classNames from "classnames"

interface Props {
  selected?: boolean
  disabled?: boolean
  color?: string
  onChange: () => void
}

const RadioButton: React.FC<Props> = ({ selected, onChange, disabled }) => {
  return (
    <div>
      <div
        onClick={() => !disabled && onChange()}
        className={classNames(
          "w-[16px] h-[16px] border-[1px] bg-inherit rounded-full flex items-center justify-center",
          {
            "border-victron-gray": !selected,
            "border-victron-blue": selected,
            "md-m:w-[24px] md-m:h-[24px] md-m:border-[2px]": true, // large
            "sm-s:w-[16px] sm-s:h-[16px] sm-s:border-[1px]": true, // small
          }
        )}
      >
        {selected && (
          <div
            className={classNames("w-[8px] h-[8px] rounded-full bg-victron-blue", {
              "md-m:w-[16px] md-m:h-[16px]": true, // large
              "sm-s:w-[8px] sm-s:h-[8px]": true, // small
            })}
          ></div>
        )}
      </div>
    </div>
  )
}

export default RadioButton
