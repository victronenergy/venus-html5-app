import React, { useRef, useState, useCallback, useMemo, useLayoutEffect, useEffect } from "react"
import classnames from "classnames"
import { SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react"
import PageFlipper from "../PageFlipper"
import useSize from "@react-hook/size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import OffscreenPageSplitter, { Children, Pages } from "../OffscreenPageSplitter"
import { boxBreakpoints } from "../../../utils/media"

/// Split `children` contained in `childrenGroups` laid out in given `orientation` into pages
/// and allow flipping through them using `PageSelector` positioned in `selectorLocation`.
/// Pages always contain only `children` from one group, and new page is open for children
/// from next group. Notify parent about scrolling via `currentPageSetter`.
const GroupPaginator = <T extends React.JSX.Element>({
  children,
  childrenGroups,
  orientation = "horizontal",
  selectorLocation = "bottom-center",
  currentPageSetter = (_currentPage, _pageCount) => {},
}: Props<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(wrapperRef)
  const [availableSpace, setAvailableSpace] = useState(0)
  const [columnsPerPage, setColumnsPerPage] = useState(1)

  const [pagingResults, setPagingResults] = useState<Pages<T>[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [pagesElement, setPagesElement] = useState<React.JSX.Element>()

  // Layout children horizontally or vertically with min-[wh]-fit to measure thir size
  // to compute pages
  const groupsOfChildrenToMeasure = useMemo(() => {
    // Reset paging results
    setPagingResults([])

    // Prepare children to measure
    return childrenGroups.map((group) => {
      return group.map((child, i) => (
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
    })
  }, [childrenGroups, orientation])

  const setStartingPage = useCallback(
    (startingPage: number) => {
      if (!!currentPage && startingPage !== pageCount && currentPage >= startingPage) {
        setCurrentPage(startingPage - 1)
      }
    },
    [currentPage, pageCount],
  )

  // Compare two pages referening to their children by their index
  const arePagesEqual = useCallback((a: Pages<T>, b: Pages<T>) => {
    if (a === b) return true
    if (a.length !== b.length) return false
    return a.every((pageA, i) => {
      const pageB = b[i]
      if (!pageB || pageA.indexes.length !== pageB.indexes.length) return false
      return pageA.indexes.every((item, j) => item === pageB.indexes[j])
    })
  }, [])

  // Collect paging results for all groups. Each group is referenced by index
  // representing its position within sorted list of groups.
  const onPagesForGroupCalculated = useCallback(
    (index: number, pages: Pages<T>, _orientation: ScreenOrientation, _selectorSize: number) => {
      setPagingResults((prev) => {
        if (prev.length > index) {
          if (arePagesEqual(prev[index], pages)) {
            return prev
          }
        }
        return [...prev.slice(0, index), pages, ...prev.slice(index + 1)]
      })
    },
    [arePagesEqual],
  )

  useLayoutEffect(() => {
    // each column must have at least ld-s width
    if (width / 3 >= boxBreakpoints["lg-s"].width) {
      setColumnsPerPage(3)
    } else if (width / 2 >= boxBreakpoints["lg-s"].width) {
      setColumnsPerPage(2)
    } else {
      setColumnsPerPage(1)
    }
  }, [width, height])

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

  useLayoutEffect(() => {
    const columnCount = pagingResults.reduce((total, group) => {
      return total + group.length
    }, 0)

    const effectiveColumnsPerPage = columnCount >= columnsPerPage ? columnsPerPage : columnCount > 0 ? columnCount : 1

    const pageCount = Math.ceil(columnCount / effectiveColumnsPerPage)
    const fullWidthPct = (100.0 / effectiveColumnsPerPage) * columnCount

    if (columnCount === 0) {
      return
    }

    if (orientation === "vertical") {
      var columnIndex = 0
      const pagesEl = (
        <div
          style={{
            width: `${fullWidthPct}%`,
          }}
          className="h-full flex"
        >
          {pagingResults.flatMap((group, groupIndex) => {
            const groupColumnCount = group.length
            return group.map((column, groupColumnIndex) => {
              const result = (
                <div
                  key={`columnEl${groupIndex}${groupColumnIndex}`}
                  style={{
                    width: `calc(100% / ${effectiveColumnsPerPage})`,
                  }}
                >
                  {children({
                    columnIndex: columnIndex,
                    columnCount: columnCount,
                    columnsPerPage: effectiveColumnsPerPage,
                    columnChildren: column.children,
                    groupIndex: groupIndex,
                    groupColumnIndex: groupColumnIndex,
                    groupColumnCount: groupColumnCount,
                    isFirstColumnOnPage: isFirstColumnOnPage(columnIndex, columnCount, effectiveColumnsPerPage),
                    isFirstColumnOnLastPage: isFirstColumnOnLastPage(columnIndex, columnCount, effectiveColumnsPerPage),
                  })}
                </div>
              )
              columnIndex += 1
              return result
            })
          })}
        </div>
      )

      setPagesElement(pagesEl)
    } else {
      // TODO: add support for horizontal children paging and test it
      //   const pagesEl = <div className="h-full w-fit w-min-full">{childrenArray}</div>
      //   setPagesElement(pagesEl)
    }
    setPageCount(pageCount)
    setStartingPage(pageCount)
  }, [children, columnsPerPage, orientation, pagingResults, setStartingPage, availableSpace])

  useEffect(() => {
    currentPageSetter(currentPage, pageCount)
  }, [currentPage, currentPageSetter, pageCount])

  useEffect(() => {
    currentPageSetter(currentPage, pageCount)
  }, [currentPage, currentPageSetter, pageCount])

  return (
    <>
      <div>
        {groupsOfChildrenToMeasure.map((group, index) => (
          <div key={`splitter_${index}`}>
            <OffscreenPageSplitter
              orientation={orientation}
              availableSpace={availableSpace - 40} // TODO: subtract Box title height properly
              selectorLocation={selectorLocation}
              isSelectorAlwaysDisplayed={groupsOfChildrenToMeasure.length > 1}
              identifier={index}
              onPagesCalculated={onPagesForGroupCalculated}
            >
              {groupsOfChildrenToMeasure[index]}
            </OffscreenPageSplitter>
          </div>
        ))}
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

function isFirstColumnOnPage(columnIndex: number, totalColumns: number, columnsPerPage: number) {
  if (totalColumns <= columnsPerPage) {
    return columnIndex === 0
  }

  if (columnIndex % columnsPerPage === 0 && columnIndex < totalColumns - columnsPerPage) {
    return true
  }

  return false
}

function isFirstColumnOnLastPage(columnIndex: number, totalColumns: number, columnsPerPage: number) {
  const lastPageStart = totalColumns - columnsPerPage
  return columnIndex === lastPageStart
}

interface PaginationState<T extends React.JSX.Element = React.JSX.Element> {
  columnIndex: number
  columnCount: number
  columnsPerPage: number
  columnChildren: Children<T>
  groupIndex: number
  groupColumnIndex: number
  groupColumnCount: number
  isFirstColumnOnPage: boolean
  isFirstColumnOnLastPage: boolean
}

type PaginationRenderer<T extends React.JSX.Element = React.JSX.Element> = (
  state: PaginationState<T>,
) => React.JSX.Element

interface Props<T extends React.JSX.Element = React.JSX.Element> {
  children: PaginationRenderer<T>
  childrenGroups: Children<T>[]
  orientation?: ScreenOrientation
  pageNumber?: number
  selectorLocation?: SelectorLocation
  currentPageSetter?: (currentPage: number, pageCount: number) => void
}

export default observer(GroupPaginator)
