import React from "react"
import { SelectorLocation } from "../PageSelector"
import Grid, { GridProps } from "../Grid"
import Paginator from "../Paginator"
import range from "lodash-es/range"
import classnames from "classnames"

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
    <div className={"h-full w-full min-h-0 min-w-0"}>
      <Paginator orientation={orientation} selectorLocation={selectorLocation} pageNumber={pages}>
        <div
          className={classnames(`flex`, {
            "flex-row": orientation === "horizontal",
            "flex-col": orientation === "vertical",
          })}
          style={{
            width: orientation === "horizontal" ? `${pages}00%` : "100%",
            height: orientation === "vertical" ? `${pages}00%` : "100%",
          }}
        >
          {range(pages).map((page) => {
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

interface Props extends GridProps {
  childrenPerPage: number
  orientation?: "vertical" | "horizontal"
  selectorLocation?: SelectorLocation
}

export default GridPaginator
