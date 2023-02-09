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
      <div
        onClick={() => !disabled && onChange()}
        className={classNames('w-4 h-4 border-[1px] bg-inherit rounded-full', {
          'border-victron-gray': !selected,
          'border-victron-blue': selected,
          'md-m:w-6 md-m:h-6 md-m:border-2': true, // large
          'md-s:w-5 md-s:h-5 md-s:border-[1.5px]': true, // medium
          'sm-s:w-4 sm-s:h-4 :border-[1px]': true, // small
        })}
      >
        {selected && (
          <div
            className={classNames('w-2 h-2 mt-[3px] ml-[3px] rounded-full bg-victron-blue', {
              'md-m:w-4 md-m:h-4 md-m:mt-[2px] md-m:ml-[2px]': true, // large
              'md-s:w-3 md-s:h-3 md-s:mt-[3px] md-s:ml-[3px]': true, // medium
              'sm-s:w-2 sm-s:h-2 sm-s:mt-[3px] sm-s:ml-[3px]': true, // small
            })}
          ></div>
        )}
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
      <div className='w-9 h-4 sm-l:w-11 sm-l:h-5 rounded-full shadow border-victron-gray border-2 peer-checked:bg-victron-blue peer-checked:border-victron-blue'></div>
      <div className='absolute left-0 w-5 h-5 sm-l:w-6 sm-l:h-6 rounded-full shadow -inset-y-[2px] bg-victron-blue peer-checked:right-0 peer-checked:left-auto peer-checked:bg-white'></div>
    </span>
  )
}
