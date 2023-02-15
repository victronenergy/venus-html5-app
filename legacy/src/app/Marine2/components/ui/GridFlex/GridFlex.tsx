import React, { useEffect, useMemo, useRef, useState } from "react"
import classnames from "classnames"
import { useComponentSize } from "../../../utils/hooks"

const GridFlex = ({ children, className, childClassName, flow = "row", forceOneDimensionRatio = 3 }: Props) => {
  const childrenCount = Array.isArray(children) ? children.length : 1

  const gridRef = useRef<HTMLDivElement>(null)
  const gridSize = useComponentSize(gridRef)

  const [width, setWidth] = useState(gridSize.width)
  const [height, setHeight] = useState(gridSize.height)

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

  useEffect(() => {
    setWidth(gridSize.width)
    setHeight(gridSize.height)
  }, [gridSize])

  return (
    <div ref={gridRef} className={classnames("w-full h-full", className)}>
      <div
        className={classnames("flex", {
          "flex-col": gridFlow === "col",
          "flex-row": gridFlow === "row",
          "flex-wrap": !forceOneDimension,
        })}
        style={{ width, height }}
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
                width:
                  gridFlow === "row" || !forceOneDimension
                    ? `${100 / (forceOneDimension ? childrenCount : elementsInRow)}%`
                    : undefined,
                height:
                  gridFlow === "col" && forceOneDimension
                    ? `${100 / (forceOneDimension ? childrenCount : elementsInRow)}%`
                    : undefined,
                flexBasis: `${
                  100 /
                  (!forceOneDimension &&
                  childrenCount > elementsInRow &&
                  childrenCount % elementsInRow &&
                  i === childrenCount - 1
                    ? 1
                    : forceOneDimension
                    ? childrenCount
                    : elementsInRow)
                }%`,
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