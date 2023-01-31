import React from 'react'
import classNames from 'classnames'

const Container = ({ children, className }: Props) => {
  return <div className={classNames('w-full h-full min-h-0', className)}>{children}</div>
}

interface Props {
  children: JSX.Element | string
  onClick?: () => void
  className?: string
}

export default Container
