import React, { useRef, useState, useCallback, useMemo, useLayoutEffect } from "react"
import classnames from "classnames"
import { PageSelectorProps, SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react"
import PageFlipper from "../PageFlipper"
import useSize from "@react-hook/size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import OffscreenPageSplitter, { Children, Pages } from "../OffscreenPageSplitter"

/// Split `children` laid out in given `orientation` into pages and allow flipping through them
/// using `PageSelector` positioned in `selectorLocation`
const Paginator = <T extends React.JSX.Element>({
  children,
  orientation = "horizontal",
  selectorLocation = "bottom-full",
}: Props<T>) => {
  const childrenArray = useMemo(() => {
    return Array.isArray(children) ? children : [children]
  }, [children])

  // Layout children horizontally or vertically with min-[wh]-fit to measure thir size
  // to compute pages
  const childrenToMeasure = useMemo(() => {
    const x = Array.isArray(children) ? children : [children]
    return x.map((child, i) => (
      <div
        className={classnames("", {
          "h-full min-w-fit": orientation === "horizontal",
          "w-full min-h-fit": orientation === "vertical",
        })}
        key={i}
      >
        {child}
      </div>
    )) as Children<T>
  }, [children, orientation])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(wrapperRef)
  const [availableSpace, setAvailableSpace] = useState(0)

  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [pagesElement, setPagesElement] = useState<React.JSX.Element>()

  const setStartingPage = useCallback(
    (startingPage: number) => {
      if (!!currentPage && startingPage !== pageCount && currentPage >= startingPage) {
        setCurrentPage(startingPage - 1)
      }
    },
    [currentPage, pageCount],
  )

  const onPagesCalculated = useCallback(
    (identifier: any, pages: Pages<T>, orientation: ScreenOrientation, _selectorSize: number) => {
      if (orientation === "vertical") {
        const pagesEl = (
          <div
            style={{
              width: `${pages.length}00%`,
            }}
            className="h-full flex"
          >
            {pages.map((page, i) => (
              <div
                className="h-fit min-h-full"
                style={{
                  width: `calc(100% / ${pages.length})`,
                }}
                key={`pageEl${i}`}
              >
                {page.children}
              </div>
            ))}
          </div>
        )
        setPagesElement(pagesEl)
      } else {
        const pagesEl = <div className="h-full w-fit w-min-full">{childrenArray}</div>
        setPagesElement(pagesEl)
      }
      setStartingPage(pages.length)
      setPageCount(pages.length)
    },
    [childrenArray, setStartingPage],
  )

  useLayoutEffect(() => {
    if (orientation === "horizontal") {
      setPagesElement(undefined)
      setAvailableSpace(width)
    }
  }, [width, orientation])

  useLayoutEffect(() => {
    if (orientation === "vertical") {
      setPagesElement(undefined)
      setAvailableSpace(height)
    }
  }, [height, orientation])

  return (
    <>
      <div>
        <OffscreenPageSplitter
          orientation={orientation}
          availableSpace={availableSpace}
          selectorLocation={selectorLocation}
          identifier={undefined}
          onPagesCalculated={onPagesCalculated}
        >
          {childrenToMeasure}
        </OffscreenPageSplitter>
      </div>
      <div ref={wrapperRef} className="w-full h-full">
        {!!pagesElement && pageCount && (
          <PageFlipper
            pages={pageCount}
            currentPageSetter={setCurrentPage}
            startingPage={currentPage}
            selectorLocation={selectorLocation}
          >
            {pagesElement}
          </PageFlipper>
        )}
      </div>
    </>
  )
}

interface Props<T extends React.JSX.Element = React.JSX.Element> {
  children: Children<T> | T | string
  orientation?: ScreenOrientation
  pageNumber?: number
  selectorLocation?: SelectorLocation
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default observer(Paginator)
