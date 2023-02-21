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
      <div className="w-9 h-4 sm-l:w-11 sm-l:h-5 rounded-full shadow border-victron-gray border-2 peer-checked:bg-victron-blue peer-checked:border-victron-blue"></div>
      <div className="absolute left-0 w-5 h-5 sm-l:w-6 sm-l:h-6 rounded-full shadow -inset-y-[2px] bg-victron-blue peer-checked:right-0 peer-checked:left-auto peer-checked:bg-white"></div>
    </span>
  )
}

export default ToggleSwitch
