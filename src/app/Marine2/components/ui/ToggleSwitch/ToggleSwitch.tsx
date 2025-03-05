import React from "react"

interface Props {
  id: string
  selected?: boolean
  disabled?: boolean
  color?: string
  onChange: () => void
}

const ToggleSwitch: React.FC<Props> = ({ id, onChange, selected, disabled }) => {
  return (
    <span className="relative">
      <input
        id={id}
        type="checkbox"
        className="hidden peer"
        onChange={onChange}
        checked={selected}
        disabled={disabled}
      />
      <div className="w-px-36 h-px-16 sm-l:w-px-44 sm-l:h-px-20 rounded-full shadow border-victron-gray border-px-2 peer-checked:bg-victron-blue peer-checked:border-victron-blue bg-victron-gray-600 dark:bg-transparent"></div>
      <div className="absolute left-0 w-px-20 h-px-20 sm-l:w-px-24 sm-l:h-px-24 rounded-full shadow -inset-y-px-2 bg-white peer-checked:right-0 peer-checked:left-auto"></div>
    </span>
  )
}

export default ToggleSwitch
