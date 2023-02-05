import React from 'react'

interface Props {
  text: string
}

const Divider = ({ text }: Props) => {
  return (
    <div className='flex flex-row justify-between'>
      <p className='text-base text-victron-gray2 dark:text-victron-gray2-dark'>{(text)}</p>
      <div className='w-full ml-2 mb-2 border-b border-victron-gray2 dark:border-victron-gray2-dark' />
    </div>
  )
}

export default Divider