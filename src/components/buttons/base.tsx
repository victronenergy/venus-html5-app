import React from 'react'
import classNames from 'classnames'

interface Props {
  selected?: boolean
  disabled?: boolean
  color?: string
  onChange: () => void
}

export const RadioButton: React.FC<Props> = ({ selected, onChange, disabled }) => {
  return (
    <div>
      <div onClick={() => !disabled && onChange()} className={classNames('w-6 h-6 bg-inherit rounded-full border-2', {
        'border-victron-gray': !selected,
        'border-victron-blue': selected,
      })}>
        {selected && <div className='w-4 h-4 mt-[2px] ml-[2px] rounded-full bg-victron-blue'></div>}
      </div>
    </div>
  )
}

export const ToggleSwitch: React.FC<Props> = ({ onChange, selected, disabled }) => {
  return (
    <span className='relative'>
      <input
        id='Toggle2'
        type='checkbox'
        className='hidden peer'
        onChange={onChange}
        checked={selected}
        disabled={disabled}
      />
      <div className='w-11 h-5 rounded-full shadow border-victron-gray border-2 peer-checked:bg-victron-blue peer-checked:border-victron-blue'></div>
      <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-[2px] bg-victron-blue peer-checked:right-0 peer-checked:left-auto peer-checked:bg-white'></div>
    </span>
  )
}
