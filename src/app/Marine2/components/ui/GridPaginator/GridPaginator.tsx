import React, { useRef, useEffect, useState } from "react"
import classnames from "classnames"
import { useComponentSize } from "../../../utils/hooks"
import PageSelector, { SelectorLocation } from "../PageSelector"
import Grid from "../Grid"
import Paginator from "../Paginator"
import { range } from "lodash-es"

const GridPaginator = ({
  children,
  className,
  childClassName,
  flow,
  forceOneDimensionRatio,
  onClick,
  childrenPerPage,
  orientation = "horizontal",
  selectorLocation = "bottom-full",
}: Props) => {
  const childrenArray = Array.isArray(children) ? children : [children]

  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<Array<Array<number>>>([])

  if (pages.length === 1) {
    return (
      <Grid childClassName={"p-1"} flow={"col"}>
        {childrenArray.map((child, key) => child)}
      </Grid>
    )
  }
  return (
    <div className={"h-full w-full h-min-0"}>
      <Paginator orientation={orientation} selectorLocation={selectorLocation}>
        <div ref={pageRef} className={`flex flex-none flex-row w-[300%] h-full`}>
          {range(Math.ceil(childrenArray.length / childrenPerPage)).map((page) => {
            return (
              <Grid
                key={page}
                className={className}
                childClassName={childClassName}
                flow={flow}
                forceOneDimensionRatio={forceOneDimensionRatio}
                onClick={onClick}
              >
                {childrenArray.slice(page * childrenPerPage, (page + 1) * childrenPerPage).map((el, key) => el)}
              </Grid>
            )
          })}
        </div>
      </Paginator>
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
  childrenPerPage: number
  orientation?: "vertical" | "horizontal"
  selectorLocation?: SelectorLocation
}

export default GridPaginator
