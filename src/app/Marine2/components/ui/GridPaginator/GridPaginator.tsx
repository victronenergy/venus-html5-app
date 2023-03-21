import React from "react"
import Grid, { GridProps } from "../Grid"
import range from "lodash-es/range"
import classnames from "classnames"
import PageFlipper from "../PageFlipper"
import { PageSelectorProps } from "../PageSelector"

const GridPaginator = ({
  children,
  className,
  childClassName,
  flow,
  forceOneDimensionRatio,
  onClick,
  perPage,
  orientation = "horizontal",
  pageSelectorPropsSetter,
}: Props) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const pages = Math.ceil(childrenArray.length / childrenPerPage)

  if (pages === 1) {
    return (
      <Grid childClassName={childClassName} flow={flow} className={className}>
        {childrenArray}
      </Grid>
    )
  }
  return (
    <div className={"h-full w-full min-h-0 min-w-0"}>
      <PageFlipper pages={pages} pageSelectorPropsSetter={pageSelectorPropsSetter}>
        <div
          className={classnames(`flex`, {
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
      </PageFlipper>
    </div>
  )
}

interface Props extends GridProps {
  perPage: number
  orientation?: "vertical" | "horizontal"
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default GridPaginator
