import React, { useEffect, useRef, useState } from "react"
import Grid, { GridProps } from "../Grid"
import range from "lodash-es/range"
import classnames from "classnames"
import PageFlipper from "../PageFlipper"
import { PageSelectorProps } from "../PageSelector"
import { boxBreakpoints } from "../../../utils/media"
import useSize from "@react-hook/size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

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
  const [width, height] = useSize(gridPaginatorRef)

  const childrenArray = Array.isArray(children) ? children : [children]
  const pages = Math.ceil(childrenArray.length / childrenPerPage)
  const [fixedFlow, setFixedFlow] = useState<"row" | "col">()

  // automatically change perPage if grid size is too small
  useEffect(() => {
    if (!width || !height) {
      return
    }

    setFixedFlow("col")
    let forcePerPage = perPage

    if (width / perPage < boxBreakpoints["md-l"].width && height < boxBreakpoints["md-l"].height) {
      forcePerPage = 3
    }

    if ((width < 800 && height < boxBreakpoints["lg-l"].height) || width < boxBreakpoints["lg-l"].width) {
      forcePerPage = 2
    }

    if (width < boxBreakpoints["md-l"].width) {
      forcePerPage = 2
      if (height < boxBreakpoints["lg-m"].height) {
        forcePerPage = 1
      }
    }

    if (width < boxBreakpoints["lg-l"].width && height < boxBreakpoints["lg-m"].height) {
      forcePerPage = 1
    }

    if (width < 800 && width > boxBreakpoints["md-l"].width && height < boxBreakpoints["lg-m"].height) {
      setFixedFlow("row")
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
  }, [width, height, childrenPerPage, perPage, childrenArray.length, pageSelectorPropsSetter])

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
                key={page + "gridPage"}
                className={className}
                childClassName={childClassName}
                flow={fixedFlow ?? flow}
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
  orientation?: ScreenOrientation
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default GridPaginator
