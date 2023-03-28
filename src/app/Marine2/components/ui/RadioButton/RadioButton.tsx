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
          "w-[24px] h-[24px] border-[2px] bg-inherit rounded-full flex items-center justify-center",
          {
            "border-victron-gray": !selected,
            "border-victron-blue": selected,
            "md-m:w-[24px] md-m:h-[24px] md-m:border-[2px]": true, // large
            "sm-s:w-[16px] sm-s:h-[16px] sm-s:border-[1px]": responsive, // small
          }
        )}
      >
        {selected && (
          <div
            className={classNames("w-[16px] h-[16px] rounded-full bg-victron-blue", {
              "md-m:w-[16px] md-m:h-[16px]": true, // large
              "sm-s:w-[8px] sm-s:h-[8px]": responsive, // small
            })}
          ></div>
        )}
      </div>
    </div>
  )
}

export default RadioButton
