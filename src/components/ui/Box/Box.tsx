import React from 'react'
import classNames from 'classnames'

const Box = ({ children, icon, title, className, headerActions }: Props) => {
  return (
    <div
      className={classNames('w-full h-full p-4 flex flex-col bg-neutral-100 dark:bg-neutral-900 rounded-md', className)}
    >
      <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row items-center justify-start text-neutral-600 dark:text-neutral-400'}>
          {icon}
          <span className={'text-2xl ml-1'}>{title}</span>
        </div>
        {headerActions}
      </div>
      <div className={'w-full h-full pt-2'}>{children}</div>
    </div>
  )
}

interface Props {
  children: JSX.Element | string
  icon?: JSX.Element
  title?: string
  onClick?: () => void
  className?: string
  headerActions?: JSX.Element
}

export default Box
