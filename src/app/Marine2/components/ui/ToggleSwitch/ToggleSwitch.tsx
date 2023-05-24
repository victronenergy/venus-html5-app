import React from "react"

interface Props {
  selected?: boolean
  disabled?: boolean
  color?: string
  onChange: () => void
}

const ToggleSwitch: React.FC<Props> = ({ onChange, selected, disabled }) => {
  return (
    <span className="relative">
      <input
        id="Toggle2"
        type="checkbox"
        className="hidden peer"
        onChange={onChange}
        checked={selected}
        disabled={disabled}
      />
      <div className="w-[36px] h-[16px] sm-l:w-[44px] sm-l:h-[20px] rounded-full shadow border-victron-gray border-[2px] peer-checked:bg-victron-blue peer-checked:border-victron-blue bg-victron-gray-600 dark:bg-transparent"></div>
      <div className="absolute left-0 w-[20px] h-[20px] sm-l:w-[24px] sm-l:h-[24px] rounded-full shadow -inset-y-[2px] bg-white peer-checked:right-0 peer-checked:left-auto"></div>
    </span>
  )
}

export default ToggleSwitch
