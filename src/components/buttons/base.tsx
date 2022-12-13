import React from 'react'

interface Props {
  selected?: boolean
  disabled?: boolean
  color?: string
  onChange: () => void

}

export const RadioButton:React.FC<Props> = ({selected, onChange, disabled}) => {
  return (
    <input type="radio" value="auto" checked={selected} onChange={onChange} disabled={disabled}/>
  )
}

export const ToggleSwitch:React.FC<Props> = ({onChange, selected, disabled}) => {
  return (
    <span className="relative">
      <input id="Toggle2" type="checkbox" className="hidden peer" onChange={onChange} checked={selected} disabled={disabled}/>
      <div className="w-10 h-4 rounded-full shadow bg-gray-600 peer-checked:bg-blue-400"></div>
      <div className="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-blue-400"></div>
    </span>
  )
}
