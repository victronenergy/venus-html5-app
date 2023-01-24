import React from 'react'
import classNames from 'classnames'
import ArrowRightIcon from '~/public/icons/arrow-right.svg'

const Box = ({ children, icon, title, className, onExpandClick }: Props) => {
  return (
    <div
      className={classNames(
        'w-full h-full p-4 flex flex-col bg-victron-lightGray dark:bg-victron-heavyBlack rounded-md',
        className
      )}
    >
      <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row items-center justify-start text-black dark:text-white'}>
          {icon && <span className={'mr-1'}>{icon}</span>}
          <span className={'text-2xl'}>{title}</span>
        </div>
        {onExpandClick && (
          <div onClick={onExpandClick}>
            <ArrowRightIcon className={'w-6 text-victron-blue dark:text-victron-blue-dark cursor-pointer'} />
          </div>
        )}
      </div>
      <div className={'w-full h-full pt-2'}>{children}</div>
    </div>
  )
}

interface Props {
  children: JSX.Element | string
  icon?: JSX.Element
  title: string
  onExpandClick?: () => void
  className?: string
  headerActions?: JSX.Element
}

export default Box
