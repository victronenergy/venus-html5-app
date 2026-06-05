import React, { useEffect, useMemo, useRef } from "react"
import Grid, { GridProps } from "../Grid"
import range from "lodash-es/range"
import classnames from "classnames"
import PageFlipper from "../PageFlipper"
import { PageSelectorProps } from "../PageSelector"
import { boxBreakpoints } from "../../../utils/media"
import useSize from "app/Marine2/utils/hooks/use-size"
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
  const gridPaginatorRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(gridPaginatorRef)

  const childrenArray = Array.isArray(children) ? children : [children]

  const { childrenPerPage, fixedFlow } = useMemo(() => {
    if (!width || !height) {
      return { childrenPerPage: perPage, fixedFlow: undefined as "row" | "col" | undefined }
    }

    let computedFlow: "row" | "col" = "col"
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

    if (width < 800 && width > boxBreakpoints["md-l"].width && height < boxBreakpoints["lg-l"].height) {
      computedFlow = "row"
    }

    return { childrenPerPage: forcePerPage, fixedFlow: computedFlow }
  }, [width, height, perPage])

  const pages = Math.ceil(childrenArray.length / childrenPerPage)

  useEffect(() => {
    if (pages === 1) {
      pageSelectorPropsSetter?.({ currentPage: 0, maxPages: 0 })
    }
  }, [pages, pageSelectorPropsSetter])

  if (pages === 1) {
    return (
      <div className={"h-full w-full min-h-0 min-w-0"} data-testid="grid-paginator" ref={gridPaginatorRef}>
        <Grid
          childClassName={childClassName}
          flow={flow}
          className={className}
          forceOneDimensionRatio={forceOneDimensionRatio}
        >
          {childrenArray}
        </Grid>
      </div>
    )
  }

  return (
    <div className={"h-full w-full min-h-0 min-w-0"} data-testid="grid-paginator" ref={gridPaginatorRef}>
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
