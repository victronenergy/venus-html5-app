import React, { useEffect, useMemo, useRef, useState } from "react"
import classnames from "classnames"
import useSize from "@react-hook/size"

const Grid = ({
  children,
  className,
  childClassName,
  flow = "row",
  forceOneDimensionRatio = 2.5,
  forceFirstOrLastChild = "first",
}: GridProps) => {
  const childrenCount = Array.isArray(children) ? children.length : 1

  const gridRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(gridRef)

  const [gridFlow, setGridFlow] = useState<"row" | "col">(flow)
  const [forceOneDimension, setForceOneDimension] = useState(false)

  const elementsInRow = useMemo(() => {
    return Math.ceil(Math.sqrt(childrenCount))
  }, [childrenCount])

  const getChildWidth = () => {
    if (forceOneDimension || childrenCount === elementsInRow) {
      return `100%`
    }
    return `${100 / elementsInRow}%`
  }

  const getChildHeight = () => {
    if (forceOneDimension || childrenCount === elementsInRow) {
      return `100%`
    }
    return `${100 / elementsInRow}%`
  }

  const getChildFlexBasis = (i: number) => {
    if (forceOneDimension) {
      return `${100 / childrenCount}%`
    }
    const forceIndex = forceFirstOrLastChild === "first" ? 0 : childrenCount - 1
    if (childrenCount > elementsInRow && childrenCount % elementsInRow && i === forceIndex) {
      return `100%`
    }
    return `${100 / elementsInRow}%`
  }

  useEffect(() => {
    const gridSize = { width, height }
    if (!gridSize.width || !gridSize.height || forceOneDimensionRatio <= 0) {
      return
    }

    const ratio = gridSize.width / gridSize.height
    const isOneDimension = ratio > 1 ? ratio > forceOneDimensionRatio : 1 - 1 / forceOneDimensionRatio > ratio

    setForceOneDimension(isOneDimension)
    setGridFlow(isOneDimension ? (ratio > 1 ? "row" : "col") : flow)
  }, [width, height, forceOneDimensionRatio, flow])

  return (
    <div ref={gridRef} className={classnames("w-full h-full min-w-0 min-h-0", className)}>
      <div
        className={classnames("flex", {
          "flex-col": gridFlow === "col",
          "flex-row": gridFlow === "row",
          "flex-wrap": !forceOneDimension,
        })}
        style={{ width: width || undefined, height: height || undefined }}
      >
        {Array.isArray(children) ? (
          children.map((child, i) => (
            <div
              className={classnames(childClassName)}
              /* 
                We have to use native styles here, because Tailwind can't do JIT css styles compilation for dynamic values:
                https://stackoverflow.com/questions/69687530/dynamically-build-classnames-in-tailwindcss
              */
              style={{
                width: gridFlow === "col" ? getChildWidth() : getChildFlexBasis(i),
                maxWidth: gridFlow === "col" ? getChildWidth() : getChildFlexBasis(i),
                height: gridFlow === "row" ? getChildHeight() : getChildFlexBasis(i),
                maxHeight: gridFlow === "row" ? getChildHeight() : getChildFlexBasis(i),
                flexBasis: getChildFlexBasis(i),
              }}
              key={child.key || i}
            >
              {child}
            </div>
          ))
        ) : (
          <div className={classnames("basis-full", childClassName)}>{children}</div>
        )}
      </div>
    </div>
  )
}

export interface GridProps {
  children: JSX.Element[] | JSX.Element
  onClick?: () => void
  className?: string
  childClassName?: string
  flow?: "row" | "col"
  /** Force the grid to use only 1 row or column if the width/height ratio of the grid is higher than this value */
  forceOneDimensionRatio?: number
  /** In the case of even number of children, force the first or last child to take the whole row/column */
  forceFirstOrLastChild?: "first" | "last"
}

export default Grid
