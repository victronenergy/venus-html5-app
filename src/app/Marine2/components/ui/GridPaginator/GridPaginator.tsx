import React from "react"
import { SelectorLocation } from "../PageSelector"
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
  const pages = Math.ceil(childrenArray.length / childrenPerPage)

  if (pages === 1) {
    return (
      <Grid childClassName={"p-1"} flow={"col"}>
        {childrenArray}
      </Grid>
    )
  }
  return (
    <div className={"h-full w-full h-min-0"}>
      <Paginator orientation={orientation} selectorLocation={selectorLocation} pageNumber={pages}>
        <div className={`flex flex-row w-[${Math.ceil(childrenArray.length / childrenPerPage)}00%] h-full`}>
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
                {childrenArray.slice(page * childrenPerPage, (page + 1) * childrenPerPage)}
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
