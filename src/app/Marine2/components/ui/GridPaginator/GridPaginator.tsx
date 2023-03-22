import React, { useEffect, useRef, useState } from "react"
import Grid, { GridProps } from "../Grid"
import range from "lodash-es/range"
import classnames from "classnames"
import PageFlipper from "../PageFlipper"
import { PageSelectorProps } from "../PageSelector"
import { useComponentSize } from "../../../utils/hooks"
import { boxBreakpoints } from "../../../utils/media"

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
  const [childrenPerPage, setChildrenPerPage] = useState(perPage)

  const gridPaginatorRef = useRef<HTMLDivElement>(null)
  const gridPaginatorSize = useComponentSize(gridPaginatorRef)

  const childrenArray = Array.isArray(children) ? children : [children]
  const pages = Math.ceil(childrenArray.length / childrenPerPage)

  // automatically change perPage if grid size is too small
  useEffect(() => {
    if (!gridPaginatorSize.width || !gridPaginatorSize.height) {
      return
    }

    let forcePerPage = perPage

    if (gridPaginatorSize.width < boxBreakpoints["lg-s"].width) {
      forcePerPage = 2
    }

    if (gridPaginatorSize.width < boxBreakpoints["md-s"].width) {
      forcePerPage = 1
    }

    if (forcePerPage !== childrenPerPage) {
      setChildrenPerPage(forcePerPage)
    }

    // We need to reset pagination if there is only one page
    // TODO: remake this to use store states instead of props down the tree
    if (Math.ceil(childrenArray.length / forcePerPage) === 1) {
      pageSelectorPropsSetter &&
        pageSelectorPropsSetter({
          currentPage: 0,
          maxPages: 0,
        })
    }
  }, [gridPaginatorSize, childrenPerPage, perPage, childrenArray.length, pageSelectorPropsSetter])

  if (pages === 1) {
    return (
      <div className={"h-full w-full min-h-0 min-w-0"} ref={gridPaginatorRef}>
        <Grid childClassName={childClassName} flow={flow} className={className}>
          {childrenArray}
        </Grid>
      </div>
    )
  }

  return (
    <div className={"h-full w-full min-h-0 min-w-0"} ref={gridPaginatorRef}>
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
