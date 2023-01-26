import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { useComponentSize } from '~/utils/hooks'

const Grid = ({ children, className, flow = 'row', forceOneDimensionRatio = 3 }: Props) => {
  const childrenCount = Array.isArray(children) ? children.length : 1

  const gridRef = useRef<HTMLDivElement>(null)
  const gridSize = useComponentSize(gridRef)

  const [gridFlow, setGridFlow] = useState<'row' | 'col'>(flow)
  const [forceOneDimension, setForceOneDimension] = useState(false)

  useEffect(() => {
    if (!gridSize.width || !gridSize.height || forceOneDimensionRatio <= 0) {
      return
    }

    const ratio = gridSize.width / gridSize.height

    const isOneDimension = ratio > 1 ? ratio > forceOneDimensionRatio : 1 - 1 / forceOneDimensionRatio > ratio
    setForceOneDimension(isOneDimension)

    if (isOneDimension) {
      setGridFlow(ratio > 1 ? 'col' : 'row')
    }
  }, [gridSize])

  return (
    <div
      ref={gridRef}
      className={classnames(
        'h-full w-full grid auto-rows-fr auto-cols-fr',
        {
          // base direction
          'grid-flow-col': gridFlow === 'col',
          'grid-flow-row': gridFlow === 'row',
          // columns
          'grid-cols-1': gridFlow === 'row' && childrenCount <= 1,
          'grid-rows-1': gridFlow === 'col' && childrenCount <= 1,
          // use only 1 row or column if proportion is too high
          'grid-cols-2': !forceOneDimension && gridFlow === 'row' && childrenCount > 1,
          'grid-rows-2': !forceOneDimension && gridFlow === 'col' && childrenCount > 1,
        },
        className
      )}
    >
      {Array.isArray(children) ? (
        // TODO: display max 4 children and show navigation element for rest
        children.map((child, i) => (
          <div
            className={classnames('w-full h-full', {
              'col-span-2': !forceOneDimension && gridFlow === 'row' && childrenCount === 3 && i === childrenCount - 1,
              'row-span-2': !forceOneDimension && gridFlow === 'col' && childrenCount === 3 && i === childrenCount - 1,
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
  /** Force the grid to use only 1 row or column if the ratio of the grid is higher than this value */
  forceOneDimensionRatio?: number
}

export default Grid
