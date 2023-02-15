import React, { useEffect, useMemo, useRef, useState } from "react"
import classnames from "classnames"
import { useComponentSize } from "../../../utils/hooks"

const GridFlex = ({ children, className, childClassName, flow = "row", forceOneDimensionRatio = 3 }: Props) => {
  const childrenCount = Array.isArray(children) ? children.length : 1

  const gridRef = useRef<HTMLDivElement>(null)
  const gridSize = useComponentSize(gridRef)

  const [gridFlow, setGridFlow] = useState<"row" | "col">(flow)
  const [forceOneDimension, setForceOneDimension] = useState(false)

  const elementsInRow = useMemo(() => {
    return Math.ceil(Math.sqrt(childrenCount))
  }, [childrenCount])

  useEffect(() => {
    if (!gridSize.width || !gridSize.height || forceOneDimensionRatio <= 0) {
      return
    }

    const ratio = gridSize.width / gridSize.height
    const isOneDimension = ratio > 1 ? ratio > forceOneDimensionRatio : 1 - 1 / forceOneDimensionRatio > ratio

    setForceOneDimension(isOneDimension)
    setGridFlow(isOneDimension ? (ratio > 1 ? "row" : "col") : flow)
  }, [gridSize, forceOneDimensionRatio])

  return (
    <div
      ref={gridRef}
      className={classnames(
        `w-full h-full min-h-0 flex${forceOneDimension ? "" : " flex-wrap"} flex-${gridFlow === "col" ? "col" : "row"}`,
        className
      )}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <div
            className={classnames(
              `basis-${
                !forceOneDimension &&
                childrenCount > elementsInRow &&
                childrenCount % elementsInRow &&
                i === childrenCount - 1
                  ? "full"
                  : `1/${elementsInRow}`
              }`,
              childClassName
            )}
            key={child.key || i}
          >
            {child}
          </div>
        ))
      ) : (
        <div className={classnames("basis-full", childClassName)}>{children}</div>
      )}
    </div>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element
  onClick?: () => void
  className?: string
  childClassName?: string
  flow?: "row" | "col"
  /** Force the grid to use only 1 row or column if the ratio of the grid is higher than this value */
  forceOneDimensionRatio?: number
}

export default GridFlex
