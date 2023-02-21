import classNames from 'classnames'
import React from 'react'

interface Props {
  open?: boolean
  onClose: () => void
  children: React.ReactNode
}

const Frame: React.FC<Props> = ({ children, open = true, onClose }) => {
  return (
    <div
      className={classNames(
        'fixed inset-0 z-10 p-8 text-neutral-600 bg-neutral-100/70 dark:text-white dark:bg-victron-darkGray/70 ',
        `${open ? 'block' : 'hidden'}` // control visibility via `open` attribute (or render conditionally)
      )}
      onClick={onClose}
    >
      <div className='absolute w-full max-w-sm mb-20 mr-6 bottom-0 right-0' onClick={(e) => e.stopPropagation()}>
        <div className='overflow-hidden p-4 bg-white dark:bg-victron-darkGray rounded-md shadow-[0_8px_24px_-15px_rgba(0,0,0,0.75)]'>
          {children}
        </div>
      </div>
    </div>
  )
}

const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className='block p-4'>{children}</div>

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>

export const Modal = { Frame, Head, Body }
