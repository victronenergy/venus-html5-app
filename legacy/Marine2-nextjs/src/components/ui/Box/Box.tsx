import React from 'react'
import classNames from 'classnames'
import ArrowRightIcon from '~/public/icons/arrow-right.svg'
import Link from '~/components/ui/Link'

const Box = ({ children, icon, title, className, onExpandHref }: Props) => {
  return (
    <div
      className={classNames(
        'w-full h-full min-h-0 p-4 flex flex-col bg-victron-lightGray dark:bg-victron-darkGray rounded-md',
        className
      )}
      role={'container'}
    >
      <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row items-center justify-start text-victron-gray dark:text-victron-gray-dark'}>
          {icon && (
            <span className={'mr-1'} role={'img'}>
              {icon}
            </span>
          )}
          {/* TODO: replace with semantic header */}
          <span className={'text-2xl'} role={'heading'}>
            {title}
          </span>
        </div>
        {onExpandHref && (
          <Link href={onExpandHref} shallow={true}>
            <ArrowRightIcon className={'w-6 text-victron-blue dark:text-victron-blue-dark cursor-pointer'} />
          </Link>
        )}
      </div>
      <div className={'w-full min-h-0 h-full pt-2'}>{children}</div>
    </div>
  )
}

interface Props {
  children: JSX.Element | string
  icon?: JSX.Element
  title: string
  onExpandHref?: string
  className?: string
}

export default Box
