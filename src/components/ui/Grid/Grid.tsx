import React from 'react'
import classnames from 'classnames'

const Grid = ({ children, className, flow = 'row', gapWidth = 'small' }: Props) => {
  const childrenCount = Array.isArray(children) ? children.length : 1

  return (
    <div
      className={classnames(
        'h-full w-full grid auto-rows-fr auto-cols-fr',
        {
          'grid-flow-col': flow === 'col',
          'grid-flow-row': flow === 'row',
          'gap-2': gapWidth === 'small',
          'gap-4': gapWidth === 'medium',
          'gap-8': gapWidth === 'large',
          'grid-cols-2': flow === 'row' && childrenCount > 1,
          'grid-cols-1': flow === 'row' && childrenCount <= 1,
          'grid-rows-2': flow === 'col' && childrenCount > 1,
          'grid-rows-1': flow === 'col' && childrenCount <= 1,
        },
        className
      )}
    >
      {Array.isArray(children) ? (
        // TODO: display max 4 children and show navigation element for rest
        children.map((child, i) => (
          <div
            className={classnames('w-full h-full', {
              'col-span-2': flow === 'row' && childrenCount === 3 && i === childrenCount - 1,
              'row-span-2': flow === 'col' && childrenCount === 3 && i === childrenCount - 1,
            })}
            key={child.key || i}
          >
            {child}
          </div>
        ))
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element
  onClick?: () => void
  className?: string
  flow?: 'row' | 'col'
  gapWidth?: 'none' | 'small' | 'medium' | 'large'
}

export default Grid
